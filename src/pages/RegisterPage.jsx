import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import LoadingPage from "../components/Loading";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { signup } = useContext(AuthContext)
  const [loading,setLoading]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await signup(form)
      navigate("/login");
    } catch (err) {
      console.log("Error during registration", err);
    }
  };

  return (
    <>{loading ? <LoadingPage />: <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-sm mx-auto p-4"
    >
      <h1 className="text-xl mb-4">Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Register
      </button>
    </form>}</>
  );
};

export default RegisterPage;
