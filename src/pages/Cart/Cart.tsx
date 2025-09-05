import { Card } from "primereact/card";
import { use } from "react";
import { CartContext } from "./CartCtx";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";


export default function Cart() {
    const {t, i18n} = useTranslation();

    const formatterUSD = new Intl.NumberFormat(i18n.language, { style: 'currency', currency: i18n.language == 'en' ? 'USD' : 'RUB' });
    const { cartState, removeFromCart, addToCart} = use(CartContext);

    console.log('<Cart /> rerender', i18n.language)

  return (
    <Card title={"My Cart: " + cartState.items.reduce((res,item)=>res + item.quantity,0)}>
        {cartState.items.map(item=>(
            <div className="flex justify-content-between">
                <span className="flex-grow-1 m-3">{item.item.name}</span>                        
                <span className="m-3">{ formatterUSD.format(item.item.price)}</span>
            
                <div className="flex gap-1">
                    <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();addToCart(item.item) }} />

                    <div className="m-3">{item.quantity}</div>
                    <Button icon='pi pi-minus' text onClick={(e)=>{ e.preventDefault();removeFromCart(item.item) }} />

                </div>
            </div>
        ))}
    </Card>
  );
}
