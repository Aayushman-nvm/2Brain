import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import Card from "../components/Card";

function Home() {
  type ContentItem = {
    title: string;
    link: string;
    type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous";
  };

  const [content, setContent] = useState<ContentItem[]>([]);
  const userId = useSelector((state: any) => state.app.user._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  async function getContent() {
    const response = await fetch(`${apiUrl}/content?userId=${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setContent(data);
  }

  useEffect(() => {
    getContent();
  }, [])
  return (
    <div>Home
      {content.map((item) => <Card title={item.title} link={item.link} type={item.type} />)}
    </div>
  )
}

export default Home