import { useState } from "react";

function SearchBar({setContent}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${input}`);
      const data=await response.json();
      console.log(data);
      setContent(data);
      setError("");
    } catch (err) {
      console.error(err);
      setContent(null);
      setError("Error fetching content");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste your share link here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SearchBar;
