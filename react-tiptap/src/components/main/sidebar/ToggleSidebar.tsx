import React, { useState } from "react";
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
import "./ToggleSidebar.css"; 

const ToggleSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={20} />
      </button>

      {/* Logo / Title */}
      {isOpen && <h2 className="sidebar-title">Vettam.AI</h2>}

      {/* New Chat Button */}
      {isOpen && <button className="new-chat-btn">New Chat</button>}

      {/* Features */}
      <div className="section">
        {isOpen && <p className="section-title">Features</p>}
        <ul className="list">
          <li className="list-item">
            <FiBookOpen /> {isOpen && "Workspace"}
          </li>
          <li className="list-item">
            <FiGlobe /> {isOpen && "Research"}
          </li>
          <li className="list-item">
            <FiType /> {isOpen && "Translate"}
          </li>
          <li className="list-item">
            <FiEdit3 /> {isOpen && "Write"}
          </li>
        </ul>
      </div>

      {/* Tools */}
      <div className="section">
        {isOpen && <p className="section-title">Tools</p>}
        <ul className="list">
          <li className="list-item">
            <FiFileText /> {isOpen && "Editor"}
          </li>
          <li className="list-item">
            <FiBookmark /> {isOpen && "Bookmarks"}
          </li>
        </ul>
      </div>

      {/* Chat History */}
      <div className="section chat-history">
        {isOpen && <p className="section-title">Chat History</p>}
        <ul className="list">
          <li className="list-item">
            <FiMessageSquare /> {isOpen && "Lorem ipsum dolor sit amet"}
          </li>
          <li className="list-item">
            <FiMessageSquare /> {isOpen && "Lorem ipsum dolor sit amet"}
          </li>
          {isOpen && (
            <li className="view-more">View more</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ToggleSidebar;
