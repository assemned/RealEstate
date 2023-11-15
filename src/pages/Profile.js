import { useParams } from "react-router-dom";
import { usePropertyContext } from "../hooks/usePropertyContext";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { images } from "../constants/constants";

const Profile = () => {
  const { properties } = usePropertyContext();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const userProperties = properties.filter((p) => p.user_id === id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <section>
      <Navbar />
      <div className=" m-auto max-w-5xl p-x p-y flexCol gap-8 max-sm:gap-5">
        {user && (
          <div className=" pt-10 max-sm:pt-16 px-8 flex justify-start items-center gap-5">
            <img
              src={
                user.logo
                  ? `http://localhost:4000/images/${user.logo}`
                  : images.user
              }
              alt="Profile"
              className=" rounded-full w-24 h-24 object-cover  border-2 border-white max-sm:w-20 max-sm:h-20"
            />
            <h2 className="p1 font-semibold">{user.username}</h2>
          </div>
        )}
        <div className=" grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3">
          {userProperties &&
            userProperties.map((userProperty) => (
              <PropertyCard key={userProperty._id} property={userProperty} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
