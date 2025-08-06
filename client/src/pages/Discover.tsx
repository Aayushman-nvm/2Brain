import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
function Discover() {
  type ContentItem = {
    title: string;
    link: string;
    type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
  };
  const [content, setContent] = useState<ContentItem[]>([]);
  return (
    <div>
      Discover
      <SearchBar setContent={setContent} />
      {content &&
        content.map((item) => (
          <Card title={item.title} link={item.link} type={item.type} />
        ))}
    </div>
  );
}

export default Discover;
