import Button from "./ui/Button";
import { togglePopup, setShare, setMode, toggleSidebar } from "../states/slice";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Plus, Share2, Menu } from "lucide-react";

function NavBar() {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const userId = useSelector((state: any) => state.app.user?._id);
  const isShare = useSelector((state: any) => state.app.share);
  const mode = useSelector((state: any) => state.app.mode);
  const currentMode = useSelector((state: any) => state.app.mode);

  async function handleShare() {
    if (!userId) return;

    try {
      dispatch(setShare());
      const response = await fetch(`${apiUrl}/sharelink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ share: !isShare, id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update share link");
      }

      const data = await response.json();
      console.log(data);

      if (!isShare === true) {
        alert(`Share link: ${apiUrl}${data.link}`);
      } else {
        alert(`Share link: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating share link:", error);
      alert("Failed to update share link. Please try again.");
    }
  }

  function handlePopUp() {
    dispatch(togglePopup());
  }

  function handleModeToggle() {
    console.log("Current mode: ", currentMode);
    const newMode = currentMode === "dark" ? "light" : "dark";
    console.log("New mode: ", newMode);
    dispatch(setMode(newMode));
  }

  function handleSidebarToggle() {
    dispatch(toggleSidebar());
  }

  const navBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-200";
  const textColor = mode === "dark" ? "text-white" : "text-gray-900";
  const iconColor = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const iconHoverText = mode === "dark" ? "hover:text-white" : "hover:text-gray-900";
  const iconHoverBg = mode === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b ${borderColor} transition-colors duration-200`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Mobile sidebar toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={handleSidebarToggle}
              className={`p-2 rounded-md ${iconColor} ${iconHoverText} ${iconHoverBg} transition-colors duration-200`}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-xl lg:text-2xl font-bold ${textColor}`}>
              2Brain
            </h1>
          </div>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleModeToggle}
              className={`p-2 rounded-md ${iconColor} ${iconHoverText} ${iconHoverBg} transition-colors duration-200`}
            >
              {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Button
              variant="primary"
              size="md"
              text="Create"
              startIcon={<Plus size={18} />}
              onClick={handlePopUp}
            />

            <Button
              variant="primary"
              size="md"
              text="Share"
              startIcon={<Share2 size={18} />}
              onClick={handleShare}
            />
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={handleModeToggle}
              className={`p-2 rounded-md ${iconColor} ${iconHoverText} ${iconHoverBg} transition-colors duration-200`}
            >
              {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={handlePopUp}
              className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={20} />
            </button>

            <button
              onClick={handleShare}
              className={`p-2 rounded-md ${iconColor} ${iconHoverText} ${iconHoverBg} transition-colors duration-200`}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
