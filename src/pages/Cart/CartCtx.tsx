import type { ITask } from "@/models/todo.model";
import { createContext, useReducer } from "react";

export interface ICartState {
  items: {item:ITask, quantity: number}[];
}
export class  CartState implements ICartState {
  items = [];
}
export interface ICartContext {
  cartState: ICartState;
  addToCart(item: ITask): void;
  removeFromCart(item: ITask): void;
}

export const CartContext = createContext<ICartContext>({
  cartState: new CartState(),
  addToCart: () => {},
  removeFromCart: () => {},
});

function cartReducer(state: ICartState, action:{ type: "ADD_ITEM" | "REMOVE_ITEM", item: ITask }): ICartState {
    const newState = structuredClone(state);

  if (action.type == "ADD_ITEM") {
    const ind = state.items.findIndex((i) => i.item.id === action.item.id);
    if (ind > -1) {
       newState.items[ind].quantity += 1; 
    } else {
        newState.items.push({item:action.item, quantity: 1})
    }
    return newState;
  }

  if (action.type == "REMOVE_ITEM") {
    const ind = state.items.findIndex((i) => i.item.id === action.item.id);
    if (ind > -1) {
        if (newState.items[ind].quantity > 1) {
          newState.items[ind].quantity -= 1; 
        } else {
          newState.items.splice(ind,1);
        }
    }
    return newState;
  }

  return newState;
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, new CartState());


  function addToCart(item: ITask) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeFromCart(item: ITask) {
    dispatch({ type: "REMOVE_ITEM", item });
  }

  return (
    <CartContext value={{
        cartState: state,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext>
  );
}


