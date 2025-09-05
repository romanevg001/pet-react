import { PanelMenu } from "primereact/panelmenu";
import { NavLink, Outlet } from "react-router-dom";

import logo from "@/brands/hanab/images/logo_header.svg";
import {LayoutMessages} from "./LayoutMessages";
import TodoStat from "../TodoPage/TodoStat";
import Cart from "../Cart/Cart";

export default function Layout(props) {
  
  console.log('--------------Layout----------------')
             
  const itemRenderer = (item) => (
       <NavLink to={item.to} className={({isActive})=> isActive ? 'text-primary' : ''}>{item.label}</NavLink>
    );

  const items =[
    {
      label: 'Home',
      to: '/',
      template: itemRenderer
    },
    {
        label: 'Systree',
        to: 'systree',
        template: itemRenderer
    },
    {
        label: 'SystreeQuery',
        to: 'systree-query',
        template: itemRenderer
    },
     {
        label: 'Todo',
        to: 'todo',
        template: itemRenderer
    },
    {
      label: 'TodoRedux',
      to: 'todo-redux',
      template: itemRenderer,
      
    },
    {
        label: 'search',
        to: 'search',
        template: itemRenderer
    },
    {
      label: 'tic-tac',
      to: 'tic-tac',
      template: itemRenderer
    },
    {
      label: 'projects',
      to: 'projects',
      template: itemRenderer,
      
    },
    

  ];
  return (<>
        <div className="absolute right-0 p-5"> <LayoutMessages /> </div>

        <div><img src={'/brands/' + import.meta.env.VITE_BRAND + '/images/logo_header.svg'} />  <img src={logo} /></div>
        <div className="card flex justify-content-between gap-5">
          <PanelMenu model={items} className="w-full md:w-20rem" />
          <div className="flex-grow-1"><Outlet /></div>
          <aside>
            <div className="mb-3"><TodoStat >Out</TodoStat></div>
            <Cart />
          </aside>
      </div>

  </>);
}