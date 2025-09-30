import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { RouterProvider } from "react-router/dom";
import router from './route.ts';
import { Provider } from 'react-redux';
import { SocketProvider } from './context/SocketProvider.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SocketProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </SocketProvider>
  </Provider>
);
