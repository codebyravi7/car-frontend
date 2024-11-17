import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../components/Loading";

const CreateCar = () => {
  const { user,createCar } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", tags: "" });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  const validFormats = ["image/jpeg", "image/jpg", "image/png"];
  const invalidFiles = selectedFiles.filter(
    (file) => !validFormats.includes(file.type)
  );

  if (invalidFiles.length > 0) {
    alert("Please upload images in JPEG, JPG, or PNG formats only.");
    e.target.value = ""; // Reset the file input
    return;
  }

  setImages(selectedFiles);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tags", form.tags);
    for (const image of images) {
      formData.append("images", image);
    }

    try {
      await createCar(formData)
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-lg mx-auto p-4"
        >
          <h1 className="text-xl mb-4">Create Car</h1>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 mb-2"
            required
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="border p-2 mb-2"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Create
          </button>
        </form>
      )}
    </>
  );
};

export default CreateCar
