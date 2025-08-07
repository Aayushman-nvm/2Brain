import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { Search, Users, Sparkles } from "lucide-react";

function Discover() {
  type ContentItem = {
    title: string;
    link: string;
    type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
    _id?: string;
    madeBy?: string;
  };

  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const mode = useSelector((state: any) => state.app.mode);

  return (
    <div className={`min-h-screen p-6 ${mode === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`${mode === "dark" ? "bg-purple-900" : "bg-purple-100"} p-2 rounded-lg`}>
              <Search className={`h-6 w-6 ${mode === "dark" ? "text-purple-400" : "text-purple-600"}`} />
            </div>
            <h1 className={`text-2xl font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              Discover Content
            </h1>
          </div>
          <p className={`${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Explore content shared by other users using their share links.
          </p>
        </div>

        {/* Search Section */}
        <div className={`rounded-lg p-6 mb-8 border ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center space-x-3 mb-4">
            <Users className={`h-5 w-5 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <h2 className={`text-lg font-semibold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              Search Shared Content
            </h2>
          </div>
          <SearchBar setContent={setContent} setLoading={setLoading} />
        </div>

        {/* Content Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className={`${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>Searching...</span>
            </div>
          </div>
        ) : content.length > 0 ? (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h2 className={`text-lg font-semibold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                Discovered Content ({content.length} items)
              </h2>
            </div>
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
          </div>
        ) : (
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${mode === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              Start Discovering
            </h3>
            <p className={`max-w-md mx-auto ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Paste a share link above to discover content from other 2Brain users. 
              Ask friends to share their 2Brain links with you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
