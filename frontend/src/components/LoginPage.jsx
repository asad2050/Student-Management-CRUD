import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter Correct details")
      return
    }
    try {
      const data = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const finalData = data.data;
      dispatch(login(finalData.accessToken));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-32">
      <div className="w-full max-w-md bg-amber-100 p-8 rounded-md ">
        <h2 className="text-3xl font-bold mb-4 text-center text-red-600">
          Login
        </h2>
        <form >
          <div className="mb-4">
            <label className="text-red-600 font-bold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border-2 border-red-300 rounded-md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-red-600 font-bold">Password</label>
            <input
              type="text"
              name="password"
              className="w-full px-4 py-2 border-2 border-red-300 rounded-md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="pt-2 mt-8">
            <button
              className="w-full  py-2 px-4  bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-bold rounded-md"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
