
export enum Actions {
    'CART_ADD' = 'CART_ADD',
    'CART_REMOVE' = 'CART_REMOVE',
}
export interface IAction<T> {
    type: Actions,
    action: T
}


export interface IStoreStateModel {
    counter: number;
}
export class StoreStateModel implements IStoreStateModel {
    counter = 0;
}