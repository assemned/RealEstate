import { useState, useRef } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { images } from "../constants/constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const { signup, isLoading, error } = useSignup();

  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("file", file);

    await signup(formData);
  };

  return (
    <section>
      <div className="flexEnd min-h-screen relative">
        <div className="bg-signup bg-cover bg-center opacity-90 h-full  w-3/5 left-0 top-0 absolute"></div>
        <Link to="/" className=" absolute top-4 p-x left-0 max-sm:hidden">
          <img src={images.logo} alt="logo" className="w-24 drop-shadow-2xl" />
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" w-1/2 max-md:min-w-[400px] bg-primary-black rounded-tl-[50px] rounded-bl-[50px] p-x p-y flexCenter relative min-h-screen shadow-2xl">
          <div className=" max-w-lg flex justify-center flex-col">
            <Link to="/" className=" mb-8 sm:hidden w-full flexCenter">
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
              <div className=" flexCol">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div className=" flexCol">
                <label>username</label>
                <input
                  type="username"
                  placeholder="Min. 3 character"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  className="input"
                />
              </div>
              <div className=" flexCol">
                <label>password</label>
                <input
                  type="password"
                  placeholder="Min. 8 character"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className=" flexCol max-w-xs">
                <label>Personal Picture (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="input "
                />
              </div>
              {image && (
                <div className="flexCenter flex-col gap-2">
                  <img
                    src={image}
                    alt="input"
                    className=" w-20 h-20 rounded-full object-cover"
                  />
                  <span
                    className="cursor-pointer bg-red-600 rounded-lg text-white px-2 py-1 p4 "
                    onClick={() => {
                      setFile();
                      setImage();
                      fileInputRef.current.value = "";
                    }}>
                    remove
                  </span>
                </div>
              )}
            </div>
            <button className="btn-white cursor-pointer" disabled={isLoading}>
              Sign Up
            </button>
            <div className="p4 flex gap-2 mt-2 text-primary-gray">
              <p>Already have an account? </p>
              <Link to="/login" className=" font-semibold">
                Sign In here
              </Link>
            </div>
            {error && <p className="p3 text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
