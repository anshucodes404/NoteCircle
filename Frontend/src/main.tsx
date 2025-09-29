import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { RouterProvider } from "react-router/dom";
import router from './route.ts';
import { Providers } from './components/Providers.tsx';
import { SocketProvider } from './context/SocketProvider.tsx';

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <Providers>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Providers>
  </SocketProvider>
);
