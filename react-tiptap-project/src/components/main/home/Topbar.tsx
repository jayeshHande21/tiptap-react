const Topbar = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between px-4 border-b border-gray-200 bg-white shadow-sm">
      {/* Document title */}
      <h2 className="text-md font-medium text-gray-800 truncate">
        Olga Tellis v. Bombay Municipal Corporation (1985).docx
      </h2>

      {/* Right-side actions (placeholder) */}
      {/* <div className="flex items-center gap-4">
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Save
        </button>
        <button className="px-3 py-1 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md">
          Export
        </button>
      </div> */}
    </div>
  );
};

export default Topbar;
