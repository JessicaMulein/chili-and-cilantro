import { DefaultIdType } from '../shared-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHasSoftDeleter<I = DefaultIdType> {
  /**
   * The MongoDB unique identifier for the user who deleted the object.
   */
  deletedBy?: I;
}
