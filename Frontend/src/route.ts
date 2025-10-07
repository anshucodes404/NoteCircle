import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "chat", Component: Chat },
      { path: "signup", Component: Signup },
      { path: "login", Component: Login },
      
    ]
  },
]);

export default router;
 