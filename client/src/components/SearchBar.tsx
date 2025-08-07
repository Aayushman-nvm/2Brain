import { useState } from "react";
import { useSelector } from "react-redux";
import { Search, ExternalLink, AlertCircle } from "lucide-react";

interface SearchBarProps {
  setContent: (content: any) => void;
  setLoading?: (loading: boolean) => void;
}

function SearchBar({ setContent, setLoading }: SearchBarProps) {
  const mode = useSelector((state: any) => state.app.mode);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a share link");
      return;
    }

    try {
      new URL(input.trim());
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    if (setLoading) setLoading(true);
    setError("");

    try {
      const response = await fetch(input.trim());

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setContent(data);
      setError("");

      if (data.length === 0) {
        setError("No content found at this link");
      }
    } catch (err) {
      console.error("Search error:", err);
      setContent([]);

      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("Unable to connect to the share link. Please check the URL and try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching content. Please try again.");
      }
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setError("");
    setContent([]);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="Paste share link here (e.g., https://example.com/share/abc123)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            className={`block w-full pl-10 pr-12 py-3 rounded-lg border 
              ${
                mode === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          />
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span
                className={`h-5 w-5 cursor-pointer ${
                  mode === "dark"
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                ×
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg 
              hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed 
              transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Search Content</span>
          </button>

          <button
            type="button"
            onClick={() => window.open("https://docs.example.com/sharing", "_blank")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 
              ${
                mode === "dark"
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">How to get share links</span>
            <span className="sm:hidden">Help</span>
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div
          className={`mt-4 p-3 rounded-lg flex items-start space-x-2 border 
            ${
              mode === "dark"
                ? "bg-red-900/50 border-red-800"
                : "bg-red-50 border-red-200"
            }`}
        >
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p
              className={`text-sm font-medium ${
                mode === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              Search Error
            </p>
            <p
              className={`text-sm mt-1 ${
                mode === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div
        className={`mt-4 p-3 rounded-lg border ${
          mode === "dark"
            ? "bg-blue-900/50 border-blue-800"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <p className={`text-sm ${mode === "dark" ? "text-blue-300" : "text-blue-700"}`}>
          <strong>Tip:</strong> Ask other 2Brain users to share their content links with you.
          You can generate your own share link using the "Share" button in the navigation bar.
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
