import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutingController from "@/utils/RoutingController.jsx";
import SideNav from "@/components/Nav/SideNav/SideNav.jsx";
import { AuthProvider, AuthContext } from "@/context/authContext.jsx"; // ⬅ Pfad ggf. anpassen
import { useContext } from "react";

//Import Variablen-,Fonts-,Clearing- & Main-CSS
import "./styles/variables.css";
import "./styles/fonts.css";
import "./styles/clearing.css";
import "./app.css";

const AppContent = () => {
  const { token, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && <SideNav />}
      <RoutingController token={token} isAuthenticated={isAuthenticated} />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div id="App">
          <AppContent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
