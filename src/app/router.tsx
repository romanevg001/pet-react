import { createBrowserRouter, Link, redirect } from "react-router-dom";

//import { store } from "../store";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home";
import { useAuthStore } from "../store/useAuthStore";
import SystreePage from "../pages/SystreePage/SystreePage";
import SystreeQueryPage from "../pages/SystreePageQuery/SystreePageQuery";
import { useModulesStore } from "../store/useModulesStore";
import TodoPage from "@/pages/TodoPage/TodoPage";
import SearchPage from "@/pages/SearchPage/SearchPage";
import { TicTacPage } from "@/pages/TicTacPage/TicTacPage";
import ProjectsPage from "@/pages/ProjectsPage/ProjectsPage";
import CreateEditProject from "@/pages/ProjectsPage/CreateEditProject";
import TasksList from "@/pages/ProjectsPage/TasksList";

/* const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });
 */



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
                loader: () => {
                
                }
            },
            {
                path: "todo",
                element: <TodoPage />,
                loader: () => {
                
                }
            },
            {
                path: "search",
                element: <SearchPage />,
                loader: () => {
                
                }
            },
            {
                path: "tic-tac",
                element: <TicTacPage />,
                loader: () => {
                
                }
            },
            {
                path: "projects",
                element: <ProjectsPage />,
                children: [
                  {
                      path: "add",
                      element: <CreateEditProject />,
                  },
                  {
                      path: "edit",
                      element: <CreateEditProject />,
                  },
                  {
                      path: ":id/tasks",
                      element: <TasksList />,
                  },
                ]
            }
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