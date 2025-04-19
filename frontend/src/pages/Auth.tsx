import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (isLogin) {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem(
          "tokenChess",
          (response.data.token as string | undefined) || ""
        );
        navigate("/game");
      } else {
        alert(response.statusText);
      }
    } else {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem(
          "tokenChess",
          (response.data.token as string | undefined) || ""
        );
        navigate("/game");
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <div className="grid grid-cols-21 h-screen">
      <div className=" col-span-1">
        <Navbar />
      </div>
      <div className="flex items-center justify-center h-full bg-background col-span-20">
        <div className="bg-card p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            {isLogin ? "Login" : "Register"}
          </h2>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-placeholder">
                Name
              </label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mt-1 bg-input placeholder:text-placeholder text-white "
                placeholder="name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-placeholder">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-1 bg-input placeholder:text-placeholder text-white"
              placeholder="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-placeholder">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1  bg-input placeholder:text-placeholder text-white"
              placeholder="password"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-placeholder">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1 placeholder:text-placeholder text-white"
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-button text-white text-xl font-bold py-2 rounded-lg hover:bg-green-button-hover transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <p className="mt-4 text-center text-sm text-white">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-button hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
