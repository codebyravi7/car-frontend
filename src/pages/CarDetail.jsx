import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Trash2, Edit, ChevronLeft } from "lucide-react";
import LoadingPage from "../components/Loading";

const CarDetail = () => {
  const { user,fetchCar,deleteCar } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Define currentImageIndex state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      let data =  await fetchCar(id)
      setCar(data)
    };
    fetchdata();
  }, [id, user]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCar(id)
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Cars
          </Link>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{car?.title}</h2>
            </div>

            {/* Image Carousel */}
            <div className="relative mb-6">
              <div className="w-full h-96 overflow-hidden rounded-lg shadow-md">
                <img
                  src={car?.images[currentImageIndex]?.url}
                  alt={`${car?.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
              >
                &lt;
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
              >
                &gt;
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {car?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="inline-flex items-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Car
              </button>

              {/* Update Button */}
              <Link to={`/cars/update/${car?._id}`}>
                <button className="inline-flex items-center bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Car
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetail;
