import React from "react";
import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="w-full bg-white  shadow-sm px-4 py-1  flex flex-wrap items-center gap-8">
   
      <select
            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
            className="toolbar-select cursor-pointer border-r pr-4 text-xs"
            >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Inter">Inter</option>
      </select>

      <button
        onClick={() => editor.chain().toggleBold().run()}
        className={`toolbar-btn text-xs  cursor-pointer ${editor.isActive("bold") ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaBold />
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().toggleItalic().run()}
        className={`toolbar-btn cursor-pointer text-xs ${editor.isActive("italic") ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaItalic />
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().toggleUnderline().run()}
        className={`toolbar-btn text-xs cursor-pointer ${editor.isActive("underline") ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaUnderline />
      </button>

      {/* Heading Dropdown */}
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (!value) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 }).run();
          }
        }}
        className="toolbar-select cursor-pointer text-xs"
      >
        <option value="">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`toolbar-btn cursor-pointer ${editor.isActive({ textAlign: "left" }) ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`toolbar-btn cursor-pointer ${editor.isActive({ textAlign: "center" }) ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`toolbar-btn cursor-pointer ${editor.isActive({ textAlign: "right" }) ? "bg-purple-100 text-purple-700" : ""}`}
      >
        <FaAlignRight />
      </button>
    </div>
  );
};

export default Toolbar;
