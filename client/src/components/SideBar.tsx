import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../states/slice";
import {
  Home,
  Search,
  Image as ImageIcon,
  Video as VideoIcon,
  MessageSquare,
  Globe,
  MoreHorizontal,
  X
} from "lucide-react";

function SideBar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: any) => state.app?.sideBar || false);
  const mode = useSelector((state: any) => state.app.mode);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Discover", href: "/discover" },
    { icon: ImageIcon, label: "Images", href: "/images" },
    { icon: VideoIcon, label: "Videos", href: "/videos" },
    { icon: MessageSquare, label: "Tweets", href: "/tweets" },
    { icon: Globe, label: "Websites", href: "/websites" },
    { icon: MoreHorizontal, label: "Miscellaneous", href: "/miscellaneous" },
  ];

  const isDark = mode === 'dark';
  const bgClass = isDark ? 'bg-gray-800' : 'bg-white';
  const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const navItemText = isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100';
  const activeBg = isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700';
  const footerText = isDark ? 'text-gray-400' : 'text-gray-500';

  function handleNavigation(href: string) {
    window.location.href = href;
    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar());
    }
  }

  function handleCloseSidebar() {
    dispatch(toggleSidebar());
  }

  return (
    <>
      {/* Overlay only visible on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 
          ${bgClass} ${borderClass}
          border-r transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:pt-20
        `}
      >
        {/* Header (mobile only) */}
        <div className={`flex items-center justify-between p-4 border-b ${borderClass} lg:hidden`}>
          <h2 className={`text-lg font-semibold ${textColor}`}>Menu</h2>
          <button
            onClick={handleCloseSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`
                  w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors duration-200
                  ${isActive ? activeBg : navItemText}
                `}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t ${borderClass}`}>
          <div className={`text-xs ${footerText}`}>
            2Brain - Your Second Brain
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
