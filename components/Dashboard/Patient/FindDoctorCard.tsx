import React from "react";
import Image from "next/image";

export default function FindDoctorCard() {
  return (
    <div className="bg-white rounded-2xl mt-2 -ml-4 shadow-sm p-6  w-[1064px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Find a Doctor</h2>

      <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
        <input
          type="text"
          placeholder="Dr. Emily ..."
          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
        <button className="flex items-center justify-center  rounded-full hover:opacity-90 transition-all">
          <Image
            src="/images/mynaui_search.png"
            alt="Search"
            width={35}
            height={35}
          />
        </button>
      </div>
    </div>
  );
}
