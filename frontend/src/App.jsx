import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Prescription from "./pages/Prescription";
import Meeting from "./pages/Meeting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: '/meet/*',
    element: <Meeting />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/appointments",
    element: <Appointments />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/prescription",
    element: <Prescription />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
