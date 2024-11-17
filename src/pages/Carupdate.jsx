import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../components/Loading";

const UpdateCar = () => {
  const { user, updateCar } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "", tags: "" });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APIURL}/api/cars/${id}`,
          {
            headers: { Authorization: `Bearer ${user}` },
          }
        );
        const { title, description, tags, images } = res.data;
        setForm({ title, description, tags: tags.join(", ") });
        setExistingImages(images);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [id, user]);

  // Remove an image from existing images
  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Add new images
  const handleFileChange = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  // Remove a new image from the new images list
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Add text fields
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tags", form.tags);

    // Add remaining old images
    formData.append("remainingImages", JSON.stringify(existingImages));

    // Add new images
    for (const file of newImages) {
      formData.append("images", file);
    }

    try {
     
      await updateCar(id,formData);
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
          <h1 className="text-xl mb-4">Update Car</h1>
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

          {/* Existing Images */}
          <div className="mb-4">
            <h2 className="text-lg mb-2">Existing Images</h2>
            <div className="flex flex-wrap">
              {existingImages.map((img, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={img.url}
                    alt="Car"
                    className="w-32 h-32 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Images */}
          <div className="mb-4">
            <h2 className="text-lg mb-2">Add New Images</h2>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2"
            />
            <div className="flex flex-wrap">
              {Array.from(newImages).map((file, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-32 h-32 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2">
            Update Car
          </button>
        </form>
      )}
    </>
  );
};

export default UpdateCar;
