import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import CarCard from '../components/CarCard';
function SearchPage() {
    const {searchedcars} = useContext(AuthContext)
  return (
      <div className="p-4">
          <h1 className='text-4xl text-center m-2 text-red-600'>Your searched Cars are here</h1>
      <div className="grid grid-cols-3 gap-4">
        {searchedcars?.length > 0 ? (
          searchedcars?.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <h1>No searchedcars found</h1>
        )}
      </div>
    </div>
  );
}

export default SearchPage