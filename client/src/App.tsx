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
  const mode = useSelector((state: RootState) => state.app.mode);

  return (
    <div className="min-h-screen">
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
        {token && (
          <>
            <NavBar />
            <div className="flex">
              <SideBar />
              <div className="flex-1 lg:ml-64 pt-16 lg:pt-20">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/images" element={<Image />} />
                    <Route path="/videos" element={<Video />} />
                    <Route path="/tweets" element={<Tweet />} />
                    <Route path="/websites" element={<WebSite />} />
                    <Route path="/miscellaneous" element={<Miscellaneous />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
            <PopUp />
          </>
        )}
        {!token && (
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;