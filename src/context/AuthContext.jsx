import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [searchedcars, setSearchedCars] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(storedUser); // Set user token from localStorage
    }
  }, []);

  useEffect(() => {
    // Only fetch cars if `user` is set
    if (user) {
      fetchCars();
    }
  }, [user]); // This effect will run whenever `user` changes
  const signup = async (form) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APIURL}/api/auth/register`,
        form
      );
    } catch (err) {
      console.error(err);
    }
  };
  const login = async (email,password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APIURL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.token); // Set the user token to the state
    } catch (err) {
      console.log("Invalid credentials", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the user state when logged out
  };

  const fetchCars = async () => {
    if (!user) return; // Guard clause to avoid making API call if user is not set

    try {
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/api/cars`, {
        headers: { Authorization: `Bearer ${user}` },
      });
      setCars(res.data); // Set the cars data
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (query) => {
    if (!user) return; // Guard clause to avoid making API call if user is not set

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/api/cars/search?keyword=${query}`,
        {
          headers: { Authorization: `Bearer ${user}` },
        }
      );
      console.log("search", res?.data?.cars);
      setSearchedCars(res?.data?.cars);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCar = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/api/cars/${id}`,
        {
          headers: { Authorization: `Bearer ${user}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  const deleteCar = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APIURL}/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${user}` },
      });
      setCars(cars.filter((car) => car._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const updateCar = async (id, formData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APIURL}/api/cars/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCars(
        cars.map((car) =>
          car._id === res?.data?.updatedCar._id ? res?.data?.updatedCar : car
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  const createCar = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APIURL}/api/cars`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCars([...cars, res?.data?.car]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        login,
        logout,
        cars,
        searchedcars,
        createCar,
        updateCar,
        deleteCar,
        handleSearch,
        fetchCar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
