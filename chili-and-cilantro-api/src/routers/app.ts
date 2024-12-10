import { handleError } from '@chili-and-cilantro/chili-and-cilantro-node-lib';
import { Application, static as expressStatic } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { ApiRouter } from './api';

/**
 * Application router
 * Sets up the API and static file serving
 */
export class AppRouter {
  private static readonly distPath = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'chili-and-cilantro-react',
  );
  private static readonly indexPath = join(AppRouter.distPath, 'index.html');
  private readonly apiRouter: ApiRouter;

  constructor(apiRouter: ApiRouter) {
    this.apiRouter = apiRouter;
  }

  /**
   * Initialize the application router
   * @param app The application
   * @param debugRoutes Whether to log routes to the console
   */
  public init(app: Application, debugRoutes: boolean) {
    if (!AppRouter.distPath.includes('/dist/')) {
      throw new Error(
        `App does not appear to be running within dist: ${AppRouter.distPath}`,
      );
    }
    if (!existsSync(AppRouter.indexPath)) {
      throw new Error(`Index file not found: ${AppRouter.indexPath}`);
    }

    if (debugRoutes) {
      app.use((req, res, next) => {
        console.log(`Serving route: ${req.method} ${req.url}`);
        next();
      });
    }

    app.use('/api', this.apiRouter.router);

    // Serve static files from the React app build directory
    // app.use(express.static(path.join(__dirname, '..', '..', '..', 'chili-and-cilantro-react')));
    const serveStaticWithLogging = expressStatic(AppRouter.distPath);
    app.use((req, res, next) => {
      if (debugRoutes) {
        console.log(`Trying to serve static for ${req.url}`);
      }
      serveStaticWithLogging(req, res, (err) => {
        if (err) {
          console.error('Error serving static file:', err);
          handleError(err, res, next);
          return;
        }
        next();
      });
    });

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname,'..', '..', '..', 'chili-and-cilantro-react', 'index.html'));
    // });
    app.get('*', (req, res) => {
      if (debugRoutes) {
        console.log(`Attempting to serve: ${AppRouter.indexPath}`);
      }
      res.sendFile(AppRouter.indexPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          if (!res.headersSent) {
            res.status(500).send('Error serving the page');
          }
        }
      });
    });
  }
}
