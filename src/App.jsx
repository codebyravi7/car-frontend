import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import CreateCar from "./pages/CreateCar";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";
import UpdateCar from "./pages/Carupdate";
import { useContext } from "react";
import SearchPage from "./pages/SearchPage";
import Browsecars from "./pages/Browsecars";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
      <>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/search"
            element={user ? <SearchPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/cars"
            element={user ? <Browsecars /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/create"
            element={user ? <CreateCar /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/cars/:id"
            element={user ? <CarDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/cars/update/:id"
            element={user ? <UpdateCar /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </>
  );
};

export default App;
