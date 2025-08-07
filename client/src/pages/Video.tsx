import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Video as VideoIcon, Loader, AlertCircle, Clapperboard } from "lucide-react";

function Video() {
  interface ContentItem {
    title: string;
    link: string;
    type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
    _id: string;
    madeBy: string;
  }

  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useSelector((state: any) => state.app.user?._id);
  const mode = useSelector((state: any) => state.app.mode);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

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
      setContent(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load videos. Please try again.");
      setContent([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContent();
  }, [userId]);

  const videoContent = content.filter((item) => item.type === "Video");

  const backgroundClass = mode === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textClass = mode === "dark" ? "text-white" : "text-gray-900";
  const subTextClass = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBgClass = mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const emptyStateBg = mode === "dark" ? "bg-gray-800" : "bg-gray-100";

  if (loading) {
    return (
      <div className={`min-h-screen ${backgroundClass} p-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <Loader className="animate-spin h-6 w-6 text-red-600" />
              <span className={subTextClass}>Loading videos...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${backgroundClass} p-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold ${textClass} mb-2`}>
                Error Loading Videos
              </h3>
              <p className={`${subTextClass} mb-4`}>{error}</p>
              <button
                onClick={getContent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
    <div className={`min-h-screen ${backgroundClass} p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg" style={mode === "dark" ? { backgroundColor: "#7f1d1d" } : {}}>
              <VideoIcon className="h-6 w-6 text-red-600" />
            </div>
            <h1 className={`text-2xl font-bold ${textClass}`}>Videos</h1>
          </div>
          <p className={subTextClass}>
            Your saved video content and clips.
          </p>
        </div>

        {/* Stats */}
        <div className={`${cardBgClass} rounded-lg p-6 border mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl font-bold ${textClass}`}>
                {videoContent.length}
              </div>
              <div className={`text-sm ${subTextClass}`}>Total Videos</div>
            </div>
            <Clapperboard className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Content */}
        {videoContent.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto mb-6 ${emptyStateBg} rounded-full flex items-center justify-center`}>
              <VideoIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className={`text-lg font-semibold ${textClass} mb-2`}>
              No videos saved yet
            </h3>
            <p className={`${subTextClass} mb-6`}>
              Start building your video collection by saving one now.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openCreateModal"))}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Clapperboard className="h-5 w-5" />
              <span>Add Video</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoContent.map((item) => (
              <Card
                key={item._id}
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

export default Video;
