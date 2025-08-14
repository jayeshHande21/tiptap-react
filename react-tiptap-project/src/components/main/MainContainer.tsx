import ReportPage from "./home/ReportPage";
import ToggleLeftbar from "./sidebar/ToggleLeftbar";

const MainContainer = () => {
  return (
    <div className="main-container flex flex-row h-screen w-full p-5">
      {/* Sidebar fixed width, full height */}
      <div className="mr-4">
        <ToggleLeftbar />
      </div>

      {/* Main content area scrollable */}
      <div className="w-full">
        <ReportPage />
      </div>
    </div>
  );
};

export default MainContainer;
