import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const {cars } = useContext(AuthContext);
  return (
    <div className="p-4">
      <SearchBar  />
      <div className="grid grid-cols-3 gap-4">
        {cars?.length > 0 ? (
          cars?.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <h1>No cars found</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
