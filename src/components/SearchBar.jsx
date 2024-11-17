import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const SearchBar = () => {
  const {handleSearch} = useContext(AuthContext);
  const [query, setQuery] = useState("");
  

  const handleSubmit = async () => {
    await handleSearch(query);
    setQuery("")
  } 
  
 

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
