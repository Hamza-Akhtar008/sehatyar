import React from "react";
import { Play } from "lucide-react";

const TutorialCard = () => {
  return (
    <div className=" flex -mt-4 -ml-4 items-center justify-between bg-[#FBFBFB] rounded-[22px] px-6 py-6 shadow-sm w-[1064px]">
      {/* Left section */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
          Getting Started Tutorial
        </h3>
        <p className="text-sm text-gray-500 mt-1 ">
          Learn how to navigate your patient dashboard and make the most of our
          healthcare platform features.
        </p>
        <button className="mt-2 flex w-50 items-center gap-2  bg-[#2BD47C] text-white font-medium text-sm px-4 py-2 rounded-[20px] transition-all duration-200 hover:opacity-90">
         <img src="/images/play.png" alt="playimage" />
          Watch Tutorials
        </button>
      </div>

      {/* Right section */}
      <div className="w-[220px] h-[100px] bg-[#D1F4F4] rounded-[12px] flex items-center justify-center overflow-hidden relative">
       
        <img
          src="/images/turotial.png"
          alt="Tutorial preview"
          className="w-full h-full object-cover rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default TutorialCard;
