import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiEdit3,
  FiBookOpen,
  FiGlobe,
  FiType,
  FiFileText,
  FiBookmark,
  FiMessageSquare,
} from "react-icons/fi";

const ToggleLeftbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-close on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);


  
  return (
    <div
      className={`h-screen bg-[#2d1b3f] rounded-xl text-white flex flex-col transition-all duration-300 
      ${isOpen ? "w-50" : "w-16"} 
      ${isMobile && "fixed top-0 left-0 z-50"} 
      
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-2 border-gray-700">
        {isOpen && <h2 className="px-4 text-lg font-bold">Vettam.AI</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-[#3a2550] focus:outline-none p-2 rounded"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Only show rest if open */}
      {isOpen && (
        <>
          <button className="bg-orange-400 hover:bg-orange-500 text-xs p-2 text-white rounded-lg mx-4 mb-2">
            New Chat
          </button>

          {/* Middle Section */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {/* Features */}
            <div className="p-1 bg-[#4d3d5e] rounded-md text-xs">
              <p className="px-4 text-[10px]  uppercase text-gray-400">Features</p>
              <ul>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiBookOpen /> Workspace
                </li>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiGlobe /> Research
                </li>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiType /> Translate
                </li>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiEdit3 /> Write
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div className="bg-[#4d3d5e] rounded-md text-xs">
              <p className="px-4 text-[10px]  uppercase text-gray-400">Tools</p>
              <ul>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiFileText /> Editor
                </li>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#3a2550]">
                  <FiBookmark /> Bookmarks
                </li>
              </ul>
            </div>

            {/* Chat History */}
            <div className="rounded-md flex-1 text-xs overflow-hidden">
              <div className="justify-center flex items-center  bg-[#4d3d5e]">
                <p className="text-[10px] uppercase text-gray-200">Chat History</p>
              </div>
              <ul>
                <li className="flex items-center gap-3 px-3 py-2 hover:bg-[#3a2550]">
                  <FiMessageSquare /> Lorem ipsum dolor sit amet
                </li>
                <li className="flex items-center gap-3 px-3 py-2 hover:bg-[#3a2550]">
                  <FiMessageSquare /> Lorem ipsum dolor sit amet
                </li>
                <li className="flex items-center gap-3 px-3  hover:bg-[#3a2550]">
                  <FiMessageSquare /> Lorem ipsum dolor sit amet
                </li>
                <li className="px-4 py-2 text-purple-400 hover:underline cursor-pointer">
                  View more
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="">
            {/* Avatars */}
            <div className=" bg-[#4d3d5e] flex items-center justify-between">
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/30?img=1"
                  alt="user1"
                  className="w-6 h-6 rounded-full border border-[#2d1b3f]"
                />
                <img
                  src="https://i.pravatar.cc/30?img=5"
                  alt="user2"
                  className="w-6 h-6 rounded-full border border-[#2d1b3f]"
                />
                <img
                  src="https://i.pravatar.cc/30?img=3"
                  alt="user3"
                  className="w-6 h-6 rounded-full border border-[#2d1b3f]"
                />
              </div>
              <button className="relative">
                <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405C18.158 14.79 18 14.42 18 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3c0 .42-.158.79-.595 1.595L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="p-2 bg-[#4d3d5e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/30?img=2"
                  alt="user2"
                  className="w-6 h-6 rounded-full border border-[#2d1b3f]"
                />
                <span className="text-xs font-medium">Jayesh Hande</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ToggleLeftbar;
