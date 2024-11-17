import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const truncatedDescription =
    car?.description?.length > 200
      ? car.description.substring(0, 200) + "..."
      : car?.description;

  return (
    <div className="border-2 p-4 border-l-red-300 border-r-blue-300 shadow-lg ">
      <Link to={`/cars/${car?._id}`}>
        <h2 className="text-lg font-bold mb-2">{car.title}</h2>
        <hr />
        <p>{truncatedDescription}</p>
        <div className="flex flex-wrap">
          <img
            src={car?.images[0]?.url}
            alt={car.title}
            className="w-200 object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
