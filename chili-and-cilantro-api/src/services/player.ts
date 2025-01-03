import {
  DefaultIdType,
  GamePhase,
  IGameDocument,
  IUserDocument,
  ModelName,
} from '@chili-and-cilantro/chili-and-cilantro-lib';
import { Schema } from '@chili-and-cilantro/chili-and-cilantro-node-lib';
import { BaseService } from './base';

export class PlayerService extends BaseService {
  /**
   * Returns whether the specified user is the host of the specified game
   * @param userId
   * @param gameId
   * @returns boolean
   */
  public async isMasterChefAsync(
    userId: DefaultIdType,
    gameId: DefaultIdType,
  ): Promise<boolean> {
    const GameModel = this.application.getModel<IGameDocument>(ModelName.Game);
    try {
      const count = await GameModel.countDocuments({
        _id: gameId,
        masterChefUserId: userId,
      });

      return count > 0;
    } catch (err) {
      console.error('Error checking if user is host of game:', err);
      throw err;
    }
  }

  /**
   * Returns whether the specified user is in any active game
   * @param user The user document
   * @returns boolean
   */
  public async userIsInAnyActiveGameAsync(
    user: IUserDocument,
  ): Promise<boolean> {
    const GameModel = this.application.getModel<IGameDocument>(ModelName.Game);
    try {
      const result = await GameModel.aggregate([
        {
          $match: {
            currentPhase: { $ne: GamePhase.GAME_OVER },
          },
        },
        {
          $lookup: {
            from: Schema.Chef.collection,
            localField: 'chefIds',
            foreignField: '_id',
            as: 'chefDetails',
          },
        },
        {
          $unwind: '$chefDetails',
        },
        {
          $match: {
            'chefDetails.userId': user._id,
          },
        },
        {
          $count: 'activeGamesCount',
        },
      ]);

      // If the aggregation result is empty, count is 0, otherwise, it's the returned count
      const count = result.length > 0 ? result[0].activeGamesCount : 0;
      return count > 0;
    } catch (err) {
      // Handle the error appropriately
      console.error('Error checking if user is in game:', err);
      throw err;
    }
  }

  /**
   * Returns whether the user is in the specified game, regardless of game state
   * @param userId The user id
   * @param gameId The game id
   * @param active Whether the game must be active
   * @returns boolean
   */
  public async userIsInGameAsync(
    userId: DefaultIdType,
    gameId: DefaultIdType,
    active = false,
  ): Promise<boolean> {
    const GameModel = this.application.getModel<IGameDocument>(ModelName.Game);
    try {
      const result = await GameModel.aggregate([
        {
          $match: {
            _id: gameId,
            ...(active ? { currentPhase: { $ne: GamePhase.GAME_OVER } } : {}),
          },
        },
        {
          $lookup: {
            from: Schema.Chef.collection,
            localField: 'chefIds',
            foreignField: '_id',
            as: 'chefDetails',
          },
        },
        {
          $unwind: '$chefDetails',
        },
        {
          $match: {
            'chefDetails.userId': userId, // Match specific userId
          },
        },
        {
          $count: 'activeGamesCount',
        },
      ]);

      // If the aggregation result is empty, count is 0, otherwise, it's the returned count
      const count = result.length > 0 ? result[0].activeGamesCount : 0;
      return count > 0;
    } catch (err) {
      // Handle the error appropriately
      console.error('Error checking if user is in the specified game:', err);
      throw err; // Or you might want to return false or handle this differently
    }
  }
}
