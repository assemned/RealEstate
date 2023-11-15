import { images } from "../constants/constants";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { PiInstagramLogo } from "react-icons/pi";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer>
      <div className="bg-primary-black">
        <div className="flexStart w-full gap-6 max-c p-x py-16 max-sm:py-6 max-sm:flex-col">
          <div className="flex-[200%] p3 flexCol gap-4">
            <img src={images.logo} alt="logo" className="w-36 max-md:w-24" />
            <p className=" text-gray-300">
              Dream Home is a gated community with a great
              <br /> location. Located algeria, you’re within walking
              <br />
              distance of Parks, and other great places.
            </p>
          </div>
          <div className="flex-[100%] p3 flexCol text-gray-300 gap-3">
            <h3 className="h4 font-semibold mb-3 text-white">Contact Us</h3>
            <a href="/">Deam home Setif, Algeria</a>
            <a href="/" className="flex gap-2">
              <FiPhoneCall className="h4" />
              025-777-3067
            </a>
            <a href="/" className="flex gap-2">
              <HiOutlineMail className="h4" />
              info@dreamhome.com
            </a>
          </div>
          <div className="flex-[100%] p3 flexCol text-gray-300 gap-3">
            <h3 className="h4 font-semibold mb-3 text-white">Follow Us</h3>
            <div className="flexStart gap-5">
              <PiInstagramLogo className=" text-4xl bg-primary-dark p-[6px] shadow-xl rounded-lg cursor-pointer duration-200 hover:text-[42px]" />
              <AiOutlineYoutube className=" text-4xl bg-primary-dark p-[6px] shadow-xl rounded-lg cursor-pointer duration-200 hover:text-[42px]" />
              <RiTwitterXLine className=" text-4xl bg-primary-dark p-[6px] shadow-xl rounded-lg cursor-pointer duration-200 hover:text-[42px]" />
            </div>
          </div>
        </div>
        <div className=" w-full border-t-2 border-gray-300 text-gray-300 p-x py-10 max-lg:py-4 flexCenter">
          <p className="p3">© 2023 AssemNed | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
