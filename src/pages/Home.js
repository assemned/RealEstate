import PropertyCard from "../components/PropertyCard";
import { usePropertyContext } from "../hooks/usePropertyContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { properties } = usePropertyContext();
  const { user } = useAuthContext();

  return (
    <section className="">
      <Navbar />

      <div className="bg-bg bg-cover bg-no-repeat flexCenter min-h-[60vh] lg:h-screen w-full relative ">
        <div className="bg-gradient-to-b from-primary-black to-transparent absolute top-0 h-1/6 w-full"></div>
        <div className="bg-gradient-to-t from-primary-black to-transparent absolute bottom-0 h-1/6 w-full"></div>
        <div className="max-cp flex justify-start items-center h-full">
          <h1 className="h1">
            Find Your <span className="text-primary-orange">Dream Home</span>
            <br />
            <br />
            In the Heart of
            <span className="text-primary-orange"> Algeria's Beauty.</span>
          </h1>
        </div>
      </div>

      <div className="flexCenterCol max-cp gap-12 ">
        <h2 className="h2 font-semibold">
          Last Add <span className=" text-primary-orange ">Properties</span>
        </h2>

        <div className=" grid gap-5 p-x grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {properties &&
            properties
              .filter((p) => p.statu === "Sale" || p.statu === "Rent")
              .slice(0, 6)
              .map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>
        <Link to="/properties" className="btn-white">
          View More
        </Link>
      </div>

      <div className="bg-about bg-no-repeat bg-cover bg-center max-cp flexCenter max-sm:flex-col max-sm:gap-16 gap-[6%]">
        <div className="flexStartCol gap-5 h-full flex-[150%]">
          <h3 className=" text-primary-orange h2 font-bold">About Us</h3>
          <p className="p3">
            Dream Home is a gated community with a great location. Located
            downtown, you’re within walking distance of Parks, and the best
            shopping, dining and entertainment Getting around is a breeze, with
            easy access to freeways, buses and trolleys. . Laundry is available
            on premises.
          </p>
          <Link to="/" className="btn-white">
            Read More
          </Link>
        </div>
        <div className="flexCenterCol text-center px-4 flex-[50%] gap-14 max-sm:gap-6">
          <div className="flexCenterCol ">
            <h3 className=" text-primary-orange h3 font-semibold">500+</h3>
            <h2 className=" p2 text-gray-200 font-semibold">Projects</h2>
            <p className="p4 text-gray-300 mt-2">
              Over 500 lexury villas for“Home Away From Home” experience
            </p>
          </div>
          <div className="flexCenterCol ">
            <h3 className=" text-primary-orange h3 font-semibold">40+</h3>
            <h2 className=" p2 text-gray-200 font-semibold">Locations</h2>
            <p className="p4 text-gray-300 mt-2">
              luxury villas and private holiday homes, from all across
            </p>
          </div>
          <div className="flexCenterCol ">
            <h3 className=" text-primary-orange h3 font-semibold">24/7</h3>
            <h2 className=" p2 text-gray-200 font-semibold">Help</h2>
            <p className="p4 text-gray-300 mt-2">
              24/7 Help service for all customers to guide and support
            </p>
          </div>
        </div>
      </div>

      <div className="bg-cta bg-cover min-h-[40vh] md:min-h-[80vh] flexCenter ">
        <div className=" max-cp flexCenter max-sm:flex-col max-sm:gap-8">
          <div className=" flexStartCol h-full gap-8 flex-[130%]">
            <h2 className="h1">
              Did You Find Your <br />
              <span className=" text-primary-orange">Dream Home?</span>
            </h2>
            <p className="h3 text-gray-400">
              Thank you for getting in touch! if you find your dream home
              connect with us
            </p>
          </div>

          {!user ? (
            <div className=" flexCenterCol gap-4 flex-[70%]">
              <Link
                to="/signup"
                className="btn-white w-44 text-center
            ">
                Sign Up
              </Link>
              <p className="p2">Or</p>
              <Link to="/login" className="btn-white w-44 text-center">
                Login
              </Link>
            </div>
          ) : (
            <div className=" flexCenterCol gap-4 flex-[70%]">
              <Link
                to="/properties"
                className="btn-white w-44 text-center
            ">
                See Properties
              </Link>
              <p className="p2">Or</p>
              <Link to="/AddProperty" className="btn-white w-44 text-center">
                Add Property
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Home;
