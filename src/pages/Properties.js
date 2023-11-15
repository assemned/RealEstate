import PropertyCard from "../components/PropertyCard";
import { usePropertyContext } from "../hooks/usePropertyContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { wilaya } from "../constants/constants";
import { useLocation } from "react-router-dom";

const Properties = (props) => {
  const { properties } = usePropertyContext();
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const [statu, setStatu] = useState("Sale");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const locationQuery = new URLSearchParams(useLocation().search);
  const statuFromQuery = locationQuery.get("statu");
  useEffect(() => {
    if (statuFromQuery) {
      setStatu(statuFromQuery);
    }
  }, [statuFromQuery]);

  return (
    <section className="">
      <Navbar />

      <div className="max-cp flexCenterCol gap-12">
        <div className="p-x p-t w-full flexCenter gap-5 p2 max-lg:flex-wrap max-sm:gap-2">
          <div className="flexCenterCol w-full max-lg:w-52 max-md:w-44 max-sm:w-32">
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="filter">
              <option value="All">All</option>
              <option value="House">House</option>
              <option value="Appartement">Appartement</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="flexCenterCol w-full max-lg:w-52 max-md:w-44 max-sm:w-32">
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="filter">
              <option value="All">All</option>
              {wilaya.map((w, index) => (
                <option value={w} key={index}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="flexCenterCol w-full max-lg:w-52 max-md:w-44 max-sm:w-32">
            <label>Status</label>
            <select
              value={statu}
              onChange={(e) => setStatu(e.target.value)}
              className="filter">
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div className="flexCenterCol w-full max-lg:w-52 max-md:w-44 max-sm:w-32">
            <label>Min Price:</label>
            <input
              type="number"
              value={minPrice}
              className="filter"
              onChange={handleMinPriceChange}
            />
          </div>

          <div className="flexCenterCol w-full max-lg:w-52 max-md:w-44 max-sm:w-32">
            <label>Max Price:</label>
            <input
              type="number"
              className="filter"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties &&
            properties
              .filter((p) => type === "All" || p.type === type)
              .filter((p) => location === "All" || p.location === location)
              .filter((p) => p.statu === statu)
              .filter((p) => !minPrice || p.price >= minPrice)
              .filter((p) => !maxPrice || p.price <= maxPrice)
              .map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Properties;
