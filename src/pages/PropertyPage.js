import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePropertyContext } from "../hooks/usePropertyContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import { PiHouse, PiMapPin, PiMapTrifold, PiBed } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { TbChartArea } from "react-icons/tb";
import {
  MdOutlineEdit,
  MdOutlineDeleteForever,
  MdOutlineBalcony,
  MdElevator,
  MdOutlineLocalLaundryService,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { LuTreePine } from "react-icons/lu";
import Navbar from "../components/Navbar";
import { images } from "../constants/constants";
import Footer from "../components/Footer";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { properties, dispatch } = usePropertyContext();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [showContact, setShowContact] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const property = properties.find((p) => p._id === id) || {};

  useEffect(() => {
    const fetchUser = async () => {
      if (!property.user_id) {
        return;
      }
      try {
        const response = await axios.get(
          `https://real-estate-server-b8bv.onrender.com/api/user/${property.user_id}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [property.user_id]);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await axios.delete(
        `https://real-estate-server-b8bv.onrender.com/api/properties/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const jsonData = response.data;
      dispatch({ type: "DELETE_PROPERTY", payload: jsonData });
      navigate(`/user/${user._id}`);
    } catch (error) {
      console.log("An error occurred while deleting the property:", error);
    }
  };

  return (
    <section>
      <Navbar />

      <div className=" m-auto max-w-4xl pt-40 max-sm:pt-24 p-b flexCenter flex-col">
        <div className="flexBetween w-full p-8">
          {userProfile && (
            <div className="flexCenterCol gap-1">
              <img
                src={
                  userProfile.logo
                    ? `https://real-estate-server-b8bv.onrender.com/images/${userProfile.logo}`
                    : images.user
                }
                alt="user"
                className=" w-20 h-20 rounded-full object-cover border-2 border-white"
              />
              <p
                className=" font-semibold p1 cursor-pointer"
                onClick={() => {
                  navigate(`/user/${userProfile._id}`);
                }}>
                {userProfile.username}
              </p>
            </div>
          )}
          {user && property.user_id === user._id && (
            <div className="flexCenter gap-5">
              <span
                onClick={() => {
                  navigate(`/properties/edit/${property._id}`);
                }}
                className="h2 text-white hover:text-primary-orange duration-300 cursor-pointer flexCenterCol">
                <MdOutlineEdit />
                <p className="p2 font-semibold">Edit</p>
              </span>
              <span
                onClick={() => setShowDelete(true)}
                className="h2 text-white hover:text-primary-orange duration-300 cursor-pointer flexCenterCol">
                <MdOutlineDeleteForever />
                <p className="p2 font-semibold">Delete</p>
              </span>
              {showDelete && (
                <div className=" h-screen w-screen fixed top-0 left-0 flexCenter">
                  <div
                    className=" h-screen w-screen absolute top-0 left-0  bg-primary-black bg-opacity-30"
                    onClick={() => setShowDelete(false)}></div>
                  <div className=" w-lg max-sm:w-80 max-sm:px-8 max-sm:py-5 bg-primary-black py-8 px-12 z-10 flexCenterCol gap-5 rounded-lg shadow-xl border-2 border-white">
                    <h4 className="p1 font-medium">
                      Do you want to delete this property?
                    </h4>
                    <div className="flexCenter gap-5">
                      <button
                        onClick={() => setShowDelete(false)}
                        className="btn-white">
                        Cancel
                      </button>
                      <button onClick={handleDelete} className="btn-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {user && property.user_id !== user._id && (
            <div className="flexCenterCol gap-1">
              <p
                className=" bg-primary-orange rounded-lg shadow-lg px-4 py-2 p4 font-semibold text-white cursor-pointer"
                onClick={() => setShowContact(!showContact)}>
                {showContact ? "Hide Contact" : "Show Contact"}
              </p>

              <a
                href={`tel:${property.contact}`}
                className={
                  showContact
                    ? "opacity-100  duration-200"
                    : "p3 opacity-0 duration-200"
                }>
                {property.contact}
              </a>
            </div>
          )}

          {!user && (
            <Link
              to={`/login`}
              className=" bg-primary-orange rounded-lg shadow-lg px-4 py-2 p4 font-semibold text-white cursor-pointer">
              Contact
            </Link>
          )}
        </div>
        {property.image && (
          <img
            src={`https://real-estate-server-b8bv.onrender.com/images/${property.image}`}
            alt="Property"
            className="w-[95%] border-4 rounded-2xl border-white shadow-lg"
          />
        )}
        <div className=" flexBetween w-full p-8 ">
          <p className="h4 font-semibold">{property.price} DZD</p>
          <div className="flexCenter gap-3 max-xs:flex-col-reverse">
            {property.createdAt && (
              <p className=" p4">
                {formatDistanceToNow(new Date(property.createdAt), {
                  addSuffix: true,
                })}
              </p>
            )}
            {property.statu === "Sale" && (
              <p className=" px-4 py-1 bg-green-600 text-white p3 font-semibold rounded-lg">
                For Sale
              </p>
            )}
            {property.statu === "Rent" && (
              <p className=" px-2 py-1 bg-yellow-500 text-white  p3 font-semibold rounded-lg">
                For Rent
              </p>
            )}
            {property.statu === "Sold" && (
              <p className=" px-4 py-1 bg-red-500 text-white p3 font-semibold rounded-lg">
                Sold
              </p>
            )}
            {property.statu === "Rented" && (
              <p className=" px-2 py-1 bg-red-500 text-white  p3 font-semibold rounded-lg">
                Rented
              </p>
            )}
            {property.statu === "Unavailable" && (
              <p className=" px-2 py-1 bg-red-500 text-white  p3 font-semibold rounded-lg">
                Unavailable
              </p>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-3 w-full p-8 p2 text-center gap-5 max-sm:grid-cols-2">
          <p className="flex justify-start items-center flex-col p-2">
            <PiHouse className="h2 max-sm:h1" /> Type:
            <span className=" px-2 capitalize font-semibold">
              {property.type}
            </span>
          </p>

          <p className="flex justify-start items-center flex-col p-2">
            <PiMapPin className="h2" />
            Location:
            <span className=" px-2 font-semibold"> {property.location}</span>
          </p>

          <p className="flex justify-start items-center flex-col p-2">
            <PiMapTrifold className="h2" />
            Address:
            <span className=" px-2 font-semibold"> {property.address}</span>
          </p>

          <p className="flex justify-start items-center flex-col p-2">
            <LiaBedSolid className="h2" /> Rooms:
            <span className=" px-2 font-semibold">{property.rooms}</span>
          </p>

          <p className="flex justify-start items-center flex-col p-2">
            <PiBed className="h2" /> Beds:
            <span className=" px-2 font-semibold">{property.beds}</span>
          </p>

          <p className="flex justify-start items-center flex-col p-2">
            <TbChartArea className="h2" /> Area:
            <span className=" px-2 font-semibold">{property.area} m2</span>
          </p>
        </div>

        {property.features &&
          property.features.length > 0 &&
          property.features[0] !== "" && (
            <div className="flexCenterCol w-full p-8 gap-6">
              <h2 className=" text-primary-orange h3 font-semibold">
                Features
              </h2>
              <div className=" flexCenter w-full p2 gap-14">
                {property.features.map((feature, index) => {
                  switch (feature) {
                    case "Poll":
                      return (
                        <div key={index} className="flexCenterCol">
                          <FaSwimmingPool className="h1" /> Poll
                        </div>
                      );
                    case "Garden":
                      return (
                        <div key={index} className="flexCenterCol">
                          <LuTreePine className="h1" /> Garden
                        </div>
                      );
                    case "Balcony":
                      return (
                        <div key={index} className="flexCenterCol">
                          <MdOutlineBalcony className="h1" /> Balcony
                        </div>
                      );
                    case "Elevator":
                      return (
                        <div key={index} className="flexCenterCol">
                          <MdElevator className="h1" /> Elevator
                        </div>
                      );
                    case "Laundry Facilities":
                      return (
                        <div key={index} className="flexCenterCol">
                          <MdOutlineLocalLaundryService className="h1" />{" "}
                          Laundry
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          )}
      </div>

      <Footer />
    </section>
  );
};

export default PropertyPage;
