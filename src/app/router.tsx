import { createBrowserRouter, Link, redirect } from "react-router-dom";

//import { store } from "../store";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home";
import { useAuthStore } from "../store/useAuthStore";
import { useModulesStore } from "../store/useModulesStore";
import SearchPage from "@/pages/SearchPage/SearchPage";
import TaskPage from "@/pages/TodoPage/TaskPage/TaskPage";
import TaskPageFormCustom from "@/pages/TodoPage/TaskPage/TaskPageFormCustom";
import { TaskReduxForm, taskReduxFormAction } from "@/pages/TodoReduxPage/TaskReduxForm";
import { getTaskAction } from "@/reduxstore/task-slice";
import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "../reduxstore";
import { httpCallJson } from "@/api/commonApi";
import { TaskActionForm, taskActionFormAction } from "@/pages/TodoReduxPage/TaskActionForm";
import { lazy, Suspense } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

 const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(reduxStore), 0);
  });

const TodoReduxPage = lazy(()=>import("@/pages/TodoReduxPage/TodoReduxPage"));
const TodoPage = lazy(()=>import("@/pages/TodoPage/TodoPage"));
const TicTacPage = lazy(()=>import("@/pages/TicTacPage/TicTacPage"));
const SystreePage = lazy(()=>import("@/pages/SystreePage/SystreePage"));
const SystreeQueryPage = lazy(()=>import("@/pages/SystreePageQuery/SystreePageQuery"));


export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />
    }, {
        path: '*',
        element: <div>404 page <Link to={'/'}>go to Home</Link></div>
    }, {
        path: '/',
       
        loader: () => {
            if(!useAuthStore.getState().user?.k) {
              return redirect("login");
            }
        }, 
       // errorElement:  <LoginPage />,
       
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Home />,
            },
            {
                path: "systree",
                element: <SystreePage />,
                loader: () => {
                  useModulesStore.getState().getModulesAsync();
                }
            },
            {
                path: "systree-query",
                element: <SystreeQueryPage />,
            },
            {
                path: "todo",
                element: <TodoPage />,
            },
            {
                path: "todo/task/:taskId",
                element: <TaskPage />,
            },
            {
                path: "todo/task_fc/:taskId",
                element: <TaskPageFormCustom />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "tic-tac",
                element: <TicTacPage />,
                loader: () => import("../pages/TicTacPage/TicTacPage").then(m=>m.ticTacPageLoader()) //ticTacPageLoader
            },
            {
                path: "todo-redux",
                element: <Suspense fallback={<div className="absolute right-0 top-0 left-0 bottom-0 flex justify-content-center align-items-center"> <ProgressSpinner strokeWidth="4" /> </div>}>
                  <TodoReduxPage />
                </Suspense>,
            },
            {
                path: "todo-redux/task/:taskId",
                element: <TaskReduxForm />,
                action: taskReduxFormAction,
                loader: ({params})=>{
                  loadStore().then(async () => {
                    reduxStore.dispatch(getTaskAction(params.taskId || ''));
                  });
                }
            },
            {
                path: "todo-redux/todo-add",
                element: <TaskActionForm />,
                action: taskActionFormAction
            },
            
            
            
        ]
    }
            
      /* {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "users",
        element: <UsersList />,
        loader: () => {
          loadStore().then(async () => {
            store.dispatch(usersApi.util.prefetch("getUsers", undefined, {}));
          });
          return null;
        },
      },
      {
        path: "users/:id",
        element: <UserInfo />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(
              usersApi.util.prefetch("getUser", params.id ?? "", {})
            );
          });
          return null;
        },
      },
      {
        path: "counters",
        element: <Counters />,
      }, */
   
]);
