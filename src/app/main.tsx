import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { PrimeReactProvider } from 'primereact/api';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import "../i18n/index.ts";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CartContextProvider } from '@/pages/Cart/CartCtx.tsx';
import { TodoProvider } from '@/query/TodoProvider.tsx';
import { Provider } from 'react-redux';
import { reduxStore } from '../reduxstore';
import { ProgressSpinner } from 'primereact/progressspinner';

const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
    
         <StrictMode>
          <Suspense fallback={<div className="absolute right-0 top-0 left-0 bottom-0 flex justify-content-center align-items-center"> <ProgressSpinner strokeWidth="8" /> </div>}>
          <Provider store={reduxStore}>
            <TodoProvider>
              <CartContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <PrimeReactProvider >
                    <I18nextProvider i18n={i18next}>
                      <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </QueryClientProvider>
                    </I18nextProvider>
                  </PrimeReactProvider>
                </LocalizationProvider>
              </CartContextProvider>
            </TodoProvider>
          </Provider>
          </Suspense>
        </StrictMode>


 
)
