import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { handleSearch } = useContext(AuthContext);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (query.trim() === "") {
      alert("Please enter a search query");
      return;
    }
    await handleSearch(query);
    setQuery("");
    navigate("/search");
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Search cars..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 flex-grow"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
