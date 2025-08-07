import Button from "./ui/Button";
import { useSelector } from "react-redux";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  MessageSquare,
  Globe,
  MoreHorizontal,
  ExternalLink,
  Trash2,
  User,
} from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
  id?: string;
  madeBy?: string;
}

function Card({ title, link, type, id, madeBy }: CardProps) {
  const userId = useSelector((state: any) => state.app.user?._id);
  const mode = useSelector((state: any) => state.app.mode);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  const getTypeIcon = () => {
    switch (type) {
      case "Image":
        return <ImageIcon size={20} className="text-green-600" />;
      case "Video":
        return <VideoIcon size={20} className="text-red-600" />;
      case "Tweet":
        return <MessageSquare size={20} className="text-blue-600" />;
      case "WebSite":
        return <Globe size={20} className="text-purple-600" />;
      case "Miscellaneous":
      default:
        return <MoreHorizontal size={20} className="text-gray-600" />;
    }
  };

  const getTypeColor = () => {
    const base = {
      Image: ["bg-green-100", "text-green-800"],
      Video: ["bg-red-100", "text-red-800"],
      Tweet: ["bg-blue-100", "text-blue-800"],
      WebSite: ["bg-purple-100", "text-purple-800"],
      Miscellaneous: ["bg-gray-100", "text-gray-800"],
    }[type] || ["bg-gray-100", "text-gray-800"];

    const dark = {
      Image: ["bg-green-900", "text-green-300"],
      Video: ["bg-red-900", "text-red-300"],
      Tweet: ["bg-blue-900", "text-blue-300"],
      WebSite: ["bg-purple-900", "text-purple-300"],
      Miscellaneous: ["bg-gray-700", "text-gray-300"],
    }[type] || ["bg-gray-700", "text-gray-300"];

    return `${mode === "dark" ? `${dark[0]} ${dark[1]}` : `${base[0]} ${base[1]}`}`;
  };

  async function handleDelete() {
    if (!id || !userId) return;

    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const response = await fetch(`${apiUrl}/content?id=${id}&userId=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete content");

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  }

  function handleLinkClick() {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }

  const renderEmbed = () => {
    if (!link) return null;

    try {
      const url = new URL(link);

      // YouTube embed
      if (type === "Video" && (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be"))) {
        let videoId = "";
        if (url.hostname.includes("youtu.be")) {
          videoId = url.pathname.slice(1);
        } else if (url.searchParams.get("v")) {
          videoId = url.searchParams.get("v")!;
        }

        if (videoId) {
          return (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={title}
              />
            </div>
          );
        }
      }

      // Twitter embed
      if (type === "Tweet" && url.hostname.includes("twitter.com")) {
        return (
          <div
            className={`rounded-lg p-4 border ${mode === "dark"
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-gray-50"
              }`}
          >
            <div className={`text-sm mb-2 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Twitter Post
            </div>
            <button
              onClick={handleLinkClick}
              className={`text-sm hover:text-blue-700 flex items-center ${mode === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600"
                }`}
            >
              View on Twitter →
            </button>
          </div>
        );
      }

      // Image embed
      if (type === "Image") {
        return (
          <div className="w-full">
            <img
              src={link}
              alt={title}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        );
      }

      // Website embed
      if (type === "WebSite") {
        return (
          <div
            className={`rounded-lg p-4 border ${mode === "dark"
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-gray-50"
              }`}
          >
            <div className={`text-sm mb-2 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Website: {url.hostname}
            </div>
            <button
              onClick={handleLinkClick}
              className={`text-sm flex items-center hover:text-blue-700 ${mode === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600"
                }`}
            >
              Visit Website <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
        );
      }
    } catch (error) {
      return (
        <div
          className={`rounded-lg p-4 border ${mode === "dark"
              ? "border-gray-600 bg-gray-800"
              : "border-gray-300 bg-gray-50"
            }`}
        >
          <button
            onClick={handleLinkClick}
            className={`text-sm flex items-center hover:text-blue-700 ${mode === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600"
              }`}
          >
            Open Link <ExternalLink size={14} className="ml-1" />
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border ${mode === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
        }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          {getTypeIcon()}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold truncate ${mode === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              {title || "Untitled"}
            </h3>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor()}`}
              >
                {type}
              </span>
            </div>
          </div>
        </div>

        {userId && madeBy && userId === madeBy && (
          <Button

            variant={mode === "dark" ? "secondary" : "primary"}
            size="sm"
            text=""
            startIcon={<Trash2 size={16} />}
            onClick={handleDelete}
          />
        )}
      </div>

      {/* Content embed */}
      {renderEmbed()}

      {/* Footer */}
      {madeBy && (
        <div
          className={`mt-4 pt-4 border-t ${mode === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
        >
          <div
            className={`flex items-center text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
          >
            <User size={14} className="mr-1" />
            <span>Created by: {madeBy}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
