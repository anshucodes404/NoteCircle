import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Chat from "./pages/chat";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {path: "chat", Component: Chat}
    ]
  },
]);

export default router;
