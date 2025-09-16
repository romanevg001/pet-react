import { PanelMenu } from "primereact/panelmenu";
import { NavLink, Outlet, useNavigation } from "react-router-dom";

import logo from "@/brands/hanab/images/logo_header.svg";
import {LayoutMessages} from "./LayoutMessages";
import TodoStat from "../TodoPage/TodoStat";
import Cart from "../Cart/Cart";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Layout(props) {
  const navigation = useNavigation();
  
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
    {
      label: 'Excel',
      to: 'excel',
      template: itemRenderer,
      
    },
    
    

  ];
  return (<>
        { navigation.state == 'loading' && <div className="absolute right-0 top-0 left-0 bottom-0 flex justify-content-center align-items-center"> <ProgressSpinner /> 1</div>}
        <div className="absolute right-0 p-5"> <LayoutMessages /> </div>

        <div><img src={'/brands/' + import.meta.env.VITE_BRAND + '/images/logo_header.svg'} />  <img src={logo} /></div>
        <div className="card flex justify-content-between gap-5">
          <div>
            <PanelMenu model={items} className="w-full md:w-20rem" />
            <menu>
              <li><NavLink to='/' end className={({isActive}) => isActive ? 'active' : ''} >Home</NavLink></li>
              <li><NavLink to='systree'  className={({isActive}) => isActive ? 'active' : ''} >Systree</NavLink></li>
              <li><NavLink to='systree-query'  className={({isActive}) => isActive ? 'active' : ''} >SystreeQuery</NavLink></li>
              <li><NavLink to='todo'  className={({isActive}) => isActive ? 'active' : ''} >Todo</NavLink></li>
              <li><NavLink to='todo-redux'  className={({isActive}) => isActive ? 'active' : ''} >TodoRedux</NavLink></li>
              <li><NavLink to='search'  className={({isActive}) => isActive ? 'active' : ''} >search</NavLink></li>
              <li><NavLink to='tic-tac'  className={({isActive}) => isActive ? 'active' : ''} >tic-tac</NavLink></li>
              <li><NavLink to='excel'  className={({isActive}) => isActive ? 'active' : ''} >Excel</NavLink></li>
            </menu>
          </div>
          <div className="flex-grow-1"><Outlet /></div>
          <aside>
            <div className="mb-3"><TodoStat >Out</TodoStat></div>
            <Cart />
          </aside>
      </div>

  </>);
}