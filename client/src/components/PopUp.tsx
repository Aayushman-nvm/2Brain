import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../states/slice";
import { useState } from "react";
import { X, Plus, Link as LinkIcon, Tag, Type } from "lucide-react";
import clsx from "clsx";

function PopUp() {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state: any) => state.modal?.isOpen || false);
  const userId = useSelector((state: any) => state.app.user?._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const mode = useSelector((state: any) => state.app.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [content, setContent] = useState({
    title: "",
    type: "",
    link: "",
    tags: "",
  });

  const availableTags = [
    "Smart Notes",
    "Productivity",
    "AI",
    "Projects",
    "Learning Strategies",
    "Books",
    "Evergreen Notes",
    "Coding",
    "Ideas",
    "Time Management"
  ];

  async function handleCreate() {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    if (!content.title.trim() || !content.type || !content.link.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.title.trim(),
          type: content.type,
          userID: userId,
          link: content.link.trim(),
          tags: content.tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create content");
      }

      const data = await response.json();

      if (data) {
        alert(`"${content.title}" posted successfully!`);
        setContent({ title: "", type: "", link: "", tags: "" });
        dispatch(closePopup());
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating content:", error);
      setError("Failed to create content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setContent({ title: "", type: "", link: "", tags: "" });
    setError("");
    dispatch(closePopup());
  }

  if (!isOpen) return null;

  const isDark = mode === "dark";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Outer Blur Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={clsx(
            "relative w-full max-w-md transform overflow-hidden rounded-2xl shadow-2xl transition-all",
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          )}
        >
          {/* Header */}
          <div
            className={clsx(
              "flex items-center justify-between p-6 border-b",
              isDark ? "border-gray-700" : "border-gray-200"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={clsx("p-2 rounded-lg", isDark ? "bg-blue-900" : "bg-blue-100")}>
                <Plus className={clsx("h-5 w-5", isDark ? "text-blue-400" : "text-blue-600")} />
              </div>
              <h3 className="text-lg font-semibold">Create New Content</h3>
            </div>
            <button
              onClick={handleClose}
              className={clsx(
                "p-2 rounded-lg transition-colors",
                isDark
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-100 text-gray-500"
              )}
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {error && (
              <div
                className={clsx(
                  "p-3 border rounded-lg",
                  isDark
                    ? "bg-red-900/50 border-red-800 text-red-400"
                    : "bg-red-50 border-red-200 text-red-600"
                )}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Input Fields */}
            {[
              {
                label: "Title *",
                icon: <Type className="inline h-4 w-4 mr-1" />,
                type: "text",
                name: "title",
                placeholder: "Enter content title",
                value: content.title,
              },
              {
                label: "Link *",
                icon: <LinkIcon className="inline h-4 w-4 mr-1" />,
                type: "url",
                name: "link",
                placeholder: "https://example.com",
                value: content.link,
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">
                  {field.icon}
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) =>
                    setContent({ ...content, [field.name]: e.target.value })
                  }
                  disabled={isLoading}
                  className={clsx(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                />
              </div>
            ))}

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Content Type *</label>
              <select
                value={content.type}
                onChange={(e) => setContent({ ...content, type: e.target.value })}
                disabled={isLoading}
                className={clsx(
                  "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                <option value="">Select content type</option>
                <option value="Image">📷 Image</option>
                <option value="Video">🎥 Video</option>
                <option value="Tweet">🐦 Tweet</option>
                <option value="WebSite">🌐 Website</option>
                <option value="Miscellaneous">📄 Miscellaneous</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags (Ctrl/Cmd to select multiple)
              </label>
              <select
                multiple
                value={content.tags.split(",").filter((tag) => tag.trim())}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                  setContent({ ...content, tags: selected.join(",") });
                }}
                disabled={isLoading}
                className={clsx(
                  "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <p className={clsx("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple tags
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className={clsx(
              "flex items-center justify-end space-x-3 p-6 border-t",
              isDark ? "border-gray-700" : "border-gray-200"
            )}
          >
            <button
              onClick={handleClose}
              disabled={isLoading}
              className={clsx(
                "px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                isDark
                  ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={
                isLoading || !content.title.trim() || !content.type || !content.link.trim()
              }
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Create Content</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
