import { useState } from "react";
import Tiptap from "../../../pages/Tiptap";
import Topbar from "./Topbar";
import EditorArea from "../../../pages/EditorArea";

const ReportPage = () => {
  const [mode, setMode] = useState<"text" | "page">("text");

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar - fixed height */}
      <Topbar />

      {/* Tabs - fixed height */}
      <div className="flex items-center gap-2 px-4 py-1 bg-white  text-xs border-gray-200 flex-shrink-0">
        {["Text", "Page"].map((tab) => {
          const isActive = mode === tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => setMode(tab.toLowerCase() as "text" | "page")}
              className={`px-4 py-1 rounded-md text-sm font-medium focus:outline-none ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Scrollable editor area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 ">
        {mode === "text" && <Tiptap />}
        {mode === "page" && <EditorArea />}
      </div>

      
    </div>
  );
};

export default ReportPage;
