import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../states/slice";
import { useState } from "react";

function PopUp() {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state: any) => state.modal.isOpen);
  const userId = useSelector((state: any) => state.app.user._id);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const [content, setContent] = useState({
    title: "",
    type: "",
    link: "",
    tags: "",
  });

  async function handleCreate() {
    try {
      const response = await fetch(`${apiUrl}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.title,
          type: content.type,
          userID: userId,
          link: content.link,
          tags: content.tags,
        }),
      });
      const data = await response.json();
      if(data){
        alert(`"${content.title}" posted as content in your dashboard successfully!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isOpen) return null;
  return (
    <div>
      <input
        placeholder="Enter post title"
        onChange={(e) => setContent({ ...content, title: e.target.value })}
      />
      <br />

      <input
        placeholder="Enter post link"
        onChange={(e) => setContent({ ...content, link: e.target.value })}
      />
      <br />

      <select
        onChange={(e) => setContent({ ...content, type: e.target.value })}
      >
        <option value="">Select type</option>
        <option value="Video">Video</option>
        <option value="article">Article</option>
        <option value="image">Image</option>
      </select>
      <br />

      <label>Select Tags (hold Ctrl/Cmd to select multiple):</label>
      <br />
      <select
        multiple
        value={content.tags.split(",")}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          setContent({ ...content, tags: selected.join(",") });
        }}
      >
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Node.js">Node.js</option>
        <option value="CSS">CSS</option>
        <option value="WebDev">WebDev</option>
      </select>
      <br />
      <br />

      <button onClick={handleCreate}>Create</button>
      <button onClick={() => dispatch(closePopup())}>Close</button>
    </div>
  );
}

export default PopUp;
