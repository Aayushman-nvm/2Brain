import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { store } from "./states/store";

import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Image from "./pages/Image";
import Login from "./pages/Login";
import Miscellaneous from "./pages/Miscellaneous";
import Tweet from "./pages/Tweet";
import Video from "./pages/Video";
import WebSite from "./pages/WebSite";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import PopUp from "./components/PopUp";

function App() {
  type RootState = ReturnType<typeof store.getState>;
  const token = useSelector((state: RootState) => state.app.token);

  return (
    <div className="bg-red-500 min-h-screen">
      <NavBar />
      <SideBar />
      <PopUp />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/discover"
            element={<Discover />}
          />
          <Route
            path="/images"
            element={token ? <Image /> : <Navigate to="/login" />}
          />
          <Route
            path="/videos"
            element={token ? <Video /> : <Navigate to="/login" />}
          />
          <Route
            path="/tweets"
            element={token ? <Tweet /> : <Navigate to="/login" />}
          />
          <Route
            path="/websites"
            element={token ? <WebSite /> : <Navigate to="/login" />}
          />
          <Route
            path="/miscellaneous"
            element={token ? <Miscellaneous /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
