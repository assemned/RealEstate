import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { usePropertyContext } from "../hooks/usePropertyContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { wilaya } from "../constants/constants";
import Navbar from "../components/Navbar";

const PropertyForm = () => {
  const { dispatch } = usePropertyContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [type, setType] = useState("House");
  const [location, setLocation] = useState("01 - Adrar");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [beds, setBeds] = useState("");
  const [statu, setStatu] = useState("Sale");
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [contact, setContact] = useState("");
  const [features, setFeatures] = useState([]);

  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const fileInputRef = useRef();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleCheckboxChange = (option) => {
    if (features.includes(option)) {
      setFeatures(features.filter((item) => item !== option));
    } else {
      setFeatures([...features, option]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You Must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("area", area);
    formData.append("rooms", rooms);
    formData.append("beds", beds);
    formData.append("statu", statu);
    formData.append("contact", contact);
    features.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/properties",
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.status === 200) {
        // Request was successful
        const json = response.data;

        setType("house");
        setLocation("01 - Adrar");
        setAddress("");
        setPrice("");
        setArea("");
        setRooms("");
        setBeds("");
        setStatu("sale");
        setImage("");
        setContact("");
        setFeatures([]);
        setError(null);
        setEmptyFields([]);

        dispatch({ type: "CREATE_PROPERTY", payload: json });

        console.log("New Property added", json);
        navigate(`/properties/${json._id}`);
      }
    } catch (error) {
      console.error("Error adding property:", error);
      const errorData = error.response ? error.response.data : {};
      setError(errorData.error || "An error occurred");
      setEmptyFields(errorData.emptyFields || []);
    }
  };

  return (
    <section>
      <Navbar />
      <div className=" m-auto max-w-4xl pt-40 p-b flexCenter flex-col gap-10">
        <h3 className=" font-bold text-3xl">
          Add a <span className=" text-primary-orange"> New Property</span>
        </h3>
        <form className="flexCenterCol gap-10" onSubmit={handleSubmit}>
          <div className=" grid grid-cols-3 gap-5 max-md:grid-cols-2 p2 max-md:gap-3 max-md:px-3">
            <div className="flexCenterCol w-full">
              <label>Property type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`input border-2 ${
                  emptyFields.includes("type")
                    ? "border-red-500"
                    : "border-black"
                }`}>
                <option value="House">House</option>
                <option value="Appartement">Appartement</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="flexCenterCol w-full">
              <label>Property location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`input border-2 ${
                  emptyFields.includes("type")
                    ? "border-red-500"
                    : "border-black"
                }`}>
                {wilaya.map((w, index) => (
                  <option value={w} key={index}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div className="flexCenterCol w-full">
              <label>Property address</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className={`input border-2 ${
                  emptyFields.includes("address")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>

            <div className="flexCenterCol w-full">
              <label>Property For</label>
              <select
                value={statu}
                onChange={(e) => setStatu(e.target.value)}
                className={`input border-2 ${
                  emptyFields.includes("statu")
                    ? "border-red-500"
                    : "border-white"
                }`}>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            <div className="flexCenterCol w-full">
              <label>Property {statu} price</label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={`input border-2 ${
                  emptyFields.includes("price")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>

            <div className="flexCenterCol w-full">
              <label>Property Area (m2)</label>
              <input
                type="number"
                onChange={(e) => setArea(e.target.value)}
                value={area}
                className={`input border-2 ${
                  emptyFields.includes("area")
                    ? "border-red-500"
                    : "border-black"
                }`}
              />
            </div>

            <div className="flexCenterCol w-full">
              <label>Number of Rooms</label>
              <input
                type="number"
                onChange={(e) => setRooms(e.target.value)}
                value={rooms}
                className={`input border-2 ${
                  emptyFields.includes("rooms")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>

            <div className="flexCenterCol w-full">
              <label>Number of Beds </label>
              <input
                type="number"
                onChange={(e) => setBeds(e.target.value)}
                value={beds}
                className={`input border-2 ${
                  emptyFields.includes("beds")
                    ? "border-red-500"
                    : "border-black"
                }`}
              />
            </div>

            <div className="flexCenterCol w-full relative">
              <label>Property Features </label>
              <input
                type="text"
                placeholder="Select options"
                onClick={() => {
                  setDropdownOpen(!isDropdownOpen);
                }}
                readOnly
                className="cursor-pointer input"
              />

              <div
                className={`flexCenterCol w-full absolute rounded-lg left-0 bg-primary-gray text-primary-black duration-300 ${
                  isDropdownOpen ? " top-[110%]" : " scale-y-0 -top-[50%]"
                }`}>
                {[
                  "Poll",
                  "Garden",
                  "Balcony",
                  "Elevator",
                  "Laundry Facilities",
                ].map((feature) => (
                  <label key={feature} className=" input flexBetween px-2">
                    {feature}
                    <input
                      type="checkbox"
                      value={feature}
                      checked={features.includes(feature)}
                      onChange={() => handleCheckboxChange(feature)}
                      className="form-checkbox h-4 w-4 cursor-pointer accent-primary-orange"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flexCol justify-start items-center w-full">
              <label>Contact Number</label>
              <input
                type="text"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className={`input border-2 ${
                  emptyFields.includes("contact")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>

            <div className="flexCol justify-start items-center max-w-xs">
              <label>Property Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setImage(URL.createObjectURL(e.target.files[0]));
                }}
                className={`input border-2 ${
                  emptyFields.includes("image")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>
            {image && (
              <div className="flexCenter flex-col gap-1">
                <img
                  src={image}
                  alt="input"
                  className=" w-full h-full object-contain rounded-lg"
                />
                <span
                  className="cursor-pointer bg-red-600 rounded-lg text-white px-2 py-1 p4"
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

          <button className="btn-white">Add Property</button>
          {error && <p className="p3 text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default PropertyForm;
