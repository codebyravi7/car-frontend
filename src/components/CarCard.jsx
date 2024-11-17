import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const truncatedDescription =
    car?.description?.length > 200
      ? car.description.substring(0, 200) + "..."
      : car?.description;

  return (
    <div className="border p-4">
      <Link to={`/cars/${car?._id}`}>
        <h2 className="text-lg">{car.title}</h2>
        <p>{truncatedDescription}</p>
        <div className="flex flex-wrap">
          {car?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img?.url}
              alt={car.title}
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
