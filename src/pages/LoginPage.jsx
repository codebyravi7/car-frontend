import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email,password)
      navigate("/");
    } catch (err) {
      console.log("Invalid credentials", err);
    }
  };

  return (
    <>
      {
        loading ? <LoadingPage /> : <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-sm mx-auto p-4"
    >
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
    }
    </>
  );
};

export default LoginPage;
