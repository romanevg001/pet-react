import { StrictMode } from 'react';
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


const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
    
         <StrictMode>
    
          <PrimeReactProvider >
            <I18nextProvider i18n={i18next}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </I18nextProvider>
          </PrimeReactProvider>
        </StrictMode>


 
)
