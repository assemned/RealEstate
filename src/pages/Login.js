import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { images } from "../constants/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <section>
      <div className="flexEnd min-h-screen relative">
        <div className="bg-login bg-cover bg-center opacity-90 h-full  w-3/5 left-0 top-0 absolute"></div>
        <Link to="/" className=" absolute top-4 p-x left-0 max-sm:hidden">
          <img src={images.logo} alt="logo" className="w-24 drop-shadow-2xl" />
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" w-1/2 max-md:min-w-[400px] bg-primary-black rounded-tl-[50px] rounded-bl-[50px] p-x p-y flexCenter relative min-h-screen shadow-2xl">
          <div className=" max-w-lg flex justify-center flex-col ">
            <Link to="/" className=" mb-10 sm:hidden w-full flexCenter">
              <img
                src={images.logo}
                alt="logo"
                className="w-28 drop-shadow-2xl"
              />
            </Link>
            <h3 className="h2">Welcome</h3>
            <p className=" p3 text-primary-gray">
              Login or create an account to continue
            </p>
            <div className="p3 py-6 flexCol gap-3">
              <div className="flexCol">
                <label>Email:</label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <div className="flexCol">
                <label>password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <button className="btn-white cursor-pointer" disabled={isLoading}>
              Login
            </button>
            <div className="p4 flex gap-2 mt-2 text-primary-gray">
              <p>Do not have an account? </p>
              <Link to="/signup" className=" font-semibold">
                Sign Up here
              </Link>
            </div>
            {error && <p className="p3 text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
