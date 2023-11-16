import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { PiHouse, PiMapPin } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { TbChartArea } from "react-icons/tb";

const PropertyCard = ({ property }) => {
  return (
    <div className=" rounded-lg bg-primary-dark shadow-xl">
      <img
        src={`https://real-estate-server-b8bv.onrender.com/images/${property.image}`}
        alt="Property"
        className="w-full h-72 rounded-lg object-cover"
      />
      <div className="flexCol p-3 gap-3">
        <div className="flexBetween font-semibold ">
          <div className="p2">
            <p>{property.price} DZD</p>
          </div>

          <Link to={`/properties/${property._id}`} className="btn-white p4">
            View Details
          </Link>
        </div>

        <div className=" border-[1px] rounded-lg border-primary-text border-opacity-60 p4 grid grid-cols-2">
          <p className="flexStart p-2 border-b-[1px] border-primary-text border-opacity-60">
            <PiMapPin className="p1" />
            <span className=" px-1 font-semibold"> {property.location}</span>
          </p>

          <p className="flexStart p-2 border-l-[1px] border-b-[1px] border-primary-text border-opacity-60">
            <PiHouse className="p1 mr-1" /> Type:
            <span className=" px-1 capitalize font-semibold">
              {property.type}
            </span>
          </p>

          <p className="flexStart p-2  border-r-[1px] border-primary-text border-opacity-60">
            <LiaBedSolid className="p1 mr-1" /> Rooms:
            <span className=" px-1 font-semibold">{property.rooms}</span>
          </p>

          <p className="flexStart p-2">
            <TbChartArea className="p1 mr-1" /> Area:
            <span className=" px-1 font-semibold"> {property.area} </span> m2
          </p>
        </div>

        <div className=" flexBetween">
          <p className=" p4">
            {formatDistanceToNow(new Date(property.createdAt), {
              addSuffix: true,
            })}
          </p>
          <p className=" p3">
            {property.statu === "Rent" || property.statu === "Sale" ? (
              <span>
                For
                <span className=" font-semibold uppercase ml-1">
                  {property.statu}
                </span>
              </span>
            ) : (
              <span className=" font-semibold uppercase ml-1">
                {property.statu}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
