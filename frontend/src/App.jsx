import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Prescription from "./pages/Prescription";
import DoctorPage from "./pages/DoctorPage";
import AppointmentBooking from "./pages/AppointmentBooking";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/prescription/:prescId",
    element: <Prescription />,
  },
  {
    path: "/doctor/:name",
    element: <DoctorPage />,
  },
  {
    path: "/booking",
    element: <AppointmentBooking />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
