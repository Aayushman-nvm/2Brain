import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Home as HomeIcon, Loader, AlertCircle } from "lucide-react";
import { store } from "../states/store";

function Home() {
  interface ContentItem {
    title: string;
    link: string;
    type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
    _id: string;
    madeBy: string;
  }

  type RootState = ReturnType<typeof store.getState>;

  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useSelector((state: any) => state.app.user?._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const mode = useSelector((state: RootState) => state.app.mode);

  async function getContent() {
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${apiUrl}/content?userId=${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setContent(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load content. Please try again.");
      setContent([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContent();
  }, [userId]);

  const bgClass = mode === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textPrimary = mode === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-200";
  const iconBg = mode === "dark" ? "bg-blue-900" : "bg-blue-100";
  const iconColor = mode === "dark" ? "text-blue-400" : "text-blue-600";
  const emptyIconBg = mode === "dark" ? "bg-gray-800" : "bg-gray-100";

  if (loading) {
    return (
      <div className={`min-h-screen ${bgClass} p-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <Loader className="animate-spin h-6 w-6 text-blue-600" />
              <span className={`${textSecondary}`}>Loading your content...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgClass} p-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>
                Error Loading Content
              </h3>
              <p className={`${textSecondary} mb-4`}>{error}</p>
              <button
                onClick={getContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 ${iconBg} rounded-lg`}>
              <HomeIcon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>
              Your Dashboard
            </h1>
          </div>
          <p className={`${textSecondary}`}>
            Welcome back! Here's all your saved content.
          </p>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {["Image", "Video", "Tweet", "WebSite", "Miscellaneous"].map((type) => {
            const count = content.filter((item) => item.type === type).length;
            return (
              <div
                key={type}
                className={`${cardBg} ${borderColor} rounded-lg p-4 border`}
              >
                <div className={`text-2xl font-bold ${textPrimary}`}>
                  {count}
                </div>
                <div className={`text-sm ${textSecondary}`}>
                  {type}
                  {count !== 1 ? "s" : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        {content.length === 0 ? (
          <div className="text-center py-12">
            <div
              className={`w-24 h-24 mx-auto mb-6 ${emptyIconBg} rounded-full flex items-center justify-center`}
            >
              <HomeIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>
              No content yet
            </h3>
            <p className={`${textSecondary} mb-6`}>
              Start building your second brain by creating your first piece of
              content.
            </p>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openCreateModal"))
              }
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Content
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item, index) => (
              <Card
                key={item._id || index}
                title={item.title}
                link={item.link}
                type={item.type}
                id={item._id}
                madeBy={item.madeBy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
