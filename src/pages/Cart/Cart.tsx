import { Card } from "primereact/card";
import { use } from "react";
import { CartContext } from "./CartCtx";
import { Button } from "primereact/button";


export default function Cart() {
  const { cartState, removeFromCart, addToCart} = use(CartContext);

  console.log('<Cart /> rerender')

  return (
    <Card title={"My Cart: " + cartState.items.reduce((res,item)=>res + item.quantity,0)}>
        {cartState.items.map(item=>(
            <div className="flex justify-content-between">
                <span>{item.item.name}</span>                        
            
                <div>
                    <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();addToCart(item.item) }} />

                    <span>{item.quantity}</span>
                    <Button icon='pi pi-minus' text onClick={(e)=>{ e.preventDefault();removeFromCart(item.item) }} />

                </div>
            </div>
        ))}
    </Card>
  );
}
