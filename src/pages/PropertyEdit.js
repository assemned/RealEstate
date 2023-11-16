import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePropertyContext } from "../hooks/usePropertyContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { wilaya } from "../constants/constants";
import Navbar from "../components/Navbar";

const PropertyEdit = () => {
  const { properties, dispatch } = usePropertyContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const [property, setProperty] = useState({
    type: "House",
    location: "01 - Adrar",
    address: "",
    price: 0,
    area: 0,
    rooms: 0,
    beds: 0,
    statu: "Sale",
    file: null,
    image: "",
    contact: "",
    features: [],
  });

  const fileInputRef = useRef();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleCheckboxChange = (option) => {
    if (property.features.includes(option)) {
      setProperty({
        ...property,
        features: property.features.filter((item) => item !== option),
      });
    } else {
      setProperty({
        ...property,
        features: [...property.features, option],
      });
    }
  };

  useEffect(() => {
    const selectedProperty = properties.find((p) => p._id === id);

    if (selectedProperty) {
      setProperty(selectedProperty);
    }
  }, [id, properties]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You Must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("file", property.file);
    formData.append("type", property.type);
    formData.append("location", property.location);
    formData.append("address", property.address);
    formData.append("price", property.price);
    formData.append("area", property.area);
    formData.append("rooms", property.rooms);
    formData.append("beds", property.beds);
    formData.append("statu", property.statu);
    formData.append("contact", property.contact);
    if (property.features.length > 0) {
      property.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
    } else {
      formData.append("features", []);
    }

    try {
      const response = await axios.patch(
        `https://real-estate-server-b8bv.onrender.com/api/properties/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.status === 200) {
        // Request was successful
        const json = response.data;

        dispatch({ type: "UPDATE_PROPERTY", payload: json });

        setProperty({
          type: "House",
          location: "01 - Adrar",
          address: "",
          price: 0,
          area: 0,
          rooms: 0,
          beds: 0,
          statu: "Sale",
          file: null,
          image: "",
          contact: "",
          features: [],
        });
        setError(null);
        setEmptyFields([]);

        console.log("Property updated", json);
        navigate(`/properties/${id}`);
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
          Edit <span className=" text-primary-orange"> Property</span>
        </h3>
        <form className="flexCenterCol gap-10" onSubmit={handleSubmit}>
          <div className=" grid grid-cols-3 gap-5 max-md:grid-cols-2 p2 max-md:gap-3 max-md:px-3">
            <div className="flexCenterCol w-full">
              <label>Property type</label>
              <select
                value={property.type}
                onChange={(e) =>
                  setProperty({ ...property, type: e.target.value })
                }
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
                value={property.location}
                onChange={(e) =>
                  setProperty({ ...property, location: e.target.value })
                }
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
                value={property.address}
                onChange={(e) =>
                  setProperty({ ...property, address: e.target.value })
                }
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
                value={property.statu}
                onChange={(e) =>
                  setProperty({ ...property, statu: e.target.value })
                }
                className={`input border-2 ${
                  emptyFields.includes("statu")
                    ? "border-red-500"
                    : "border-white"
                }`}>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flexCenterCol w-full">
              {property.statu === "Rent" || property.statu === "Sale" ? (
                <label>Property {property.statu} price</label>
              ) : (
                <label>Property price</label>
              )}
              <input
                type="number"
                value={property.price}
                onChange={(e) =>
                  setProperty({ ...property, price: e.target.value })
                }
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
                value={property.area}
                onChange={(e) =>
                  setProperty({ ...property, area: e.target.value })
                }
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
                value={property.rooms}
                onChange={(e) =>
                  setProperty({ ...property, rooms: e.target.value })
                }
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
                value={property.beds}
                onChange={(e) =>
                  setProperty({ ...property, beds: e.target.value })
                }
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
                      checked={property.features.includes(feature)}
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
                value={property.contact}
                onChange={(e) =>
                  setProperty({ ...property, type: e.target.value })
                }
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
                  setProperty({
                    ...property,
                    file: e.target.files[0],
                    image: URL.createObjectURL(e.target.files[0]),
                  });
                }}
                className={`input border-2 ${
                  emptyFields.includes("image")
                    ? "border-red-500"
                    : "border-white"
                }`}
              />
            </div>
            {property.image && (
              <div className="flexCenter flex-col gap-1">
                <img
                  src={
                    property.file
                      ? URL.createObjectURL(property.file)
                      : `https://real-estate-server-b8bv.onrender.com/images/${property.image}`
                  }
                  alt="input"
                  className=" w-full h-full object-contain rounded-lg"
                />
                <span
                  className="cursor-pointer bg-red-600 rounded-lg text-white px-2 py-1 p4"
                  onClick={() => {
                    setProperty({ ...property, file: null, image: "" });
                    fileInputRef.current.value = "";
                  }}>
                  remove
                </span>
              </div>
            )}
          </div>

          <button className="btn-white">Edit Property</button>
          {error && <p className="p3 text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default PropertyEdit;
