import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";

import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";
import PropertyForm from "./pages/PropertyForm";
import PropertyEdit from "./pages/PropertyEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Properties from "./pages/Properties";

function App() {
  const { user } = useAuthContext();

  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/AddProperty"
              element={user ? <PropertyForm /> : <Navigate to="/login" />}
            />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyPage />} />
            <Route
              path="/properties/edit/:id"
              element={user ? <PropertyEdit /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/user/:id" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
