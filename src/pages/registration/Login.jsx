import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireabase/FirebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("User does not exist. Please sign up now.");
      setLoading(loading);
    }
  };

  return (
    <Layout>
 <div className=" bg-gray-900 flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Welcome Back
          </h1>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg  placeholder:   text-white outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-1 px-2 py-2 w-full lg:w-[20em] rounded-lg  placeholder:   text-white outline-none"
            placeholder="Password"
          />
          <h1 className="text-white  text-xs mb-4 text-right">
            {" "}
            <Link to={"/resetpassword"} className="text-gray-400 font-bold">
              Forgot Password?
            </Link>
          </h1>
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={login}
            className=" bg-cyan-400 hover:bg-violet-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div className="text-xs justify-center flex ">
          <h1 className="text-white m-2">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-700 font-bold">
              Signup
            </Link>
          </h1>
        </div>
      </div>
    </div>
    </Layout>
   
  );
}

export default Login;
