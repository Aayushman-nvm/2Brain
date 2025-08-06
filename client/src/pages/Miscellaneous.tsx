import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "../components/Card";

function Miscellaneous() {
  interface ContentItem {
  title: string,
  link: string,
  type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous",
  _id: string,
  madeBy: string
}

  const [content, setContent] = useState<ContentItem[]>([]);
  const userId = useSelector((state: any) => state.app.user._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  async function getContent() {
    try {
      const response = await fetch(`${apiUrl}/content?userId=${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setContent(data);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  }

  useEffect(() => {
    getContent();
  }, []);
  return (
    <div>Miscellaneous
      {content
        .filter((item) => item.type === "Miscellaneous")
        .map((item, index) => (
          <Card key={index} title={item.title} link={item.link} type={item.type} id={item._id} madeBy={item.madeBy}/>
        ))}
    </div>
  )
}

export default Miscellaneous