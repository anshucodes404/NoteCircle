import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}

export default App;
