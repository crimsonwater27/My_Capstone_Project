import { useState } from "react";
import { useArtStore } from "../store/useArtStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useArtStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e1e1e] p-8 rounded space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {error && <p className="text-red-400">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}