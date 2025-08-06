import Button from "./ui/Button"
import { useSelector } from "react-redux";

interface CardProps {
  title: string,
  link: string,
  type: "Image" | "Video" | "Tweet" | "WebSite" | "Miscellaneous",
  id: string,
  madeBy: string
}

function Card({ title, link, type, id, madeBy }: CardProps) {
  const userId = useSelector((state: any) => state.app.user._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  async function handleDelete() {
    const response = await fetch(`${apiUrl}/content?id=${id}&userId=${userId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>Card
      <p>some buttons and file type {type}</p>
      <p>title {title}</p>
      <p>Embeddings {link}</p>
      {userId === madeBy ? <Button
        variant="primary"
        size="lg"
        text="Delete"
        startIcon=""
        onClick={handleDelete}
      /> : null}
    </div>
  )
}

export default Card