import { useState } from "react";
import { Editor } from "@tiptap/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface ToolbarPageProps {
  editor: Editor;
  showHeaderFooter: boolean;
  setShowHeaderFooter: (value: boolean) => void;
  showRulers: boolean;
  setShowRulers: (value: boolean) => void;
  zoom: number;
  setZoom: (value: number) => void;
  characterCount: number;
}

const ToolbarPage: React.FC<ToolbarPageProps> = ({
  editor,
  showHeaderFooter,
  setShowHeaderFooter,
  showRulers,
  setShowRulers,
  zoom,
  setZoom,
  characterCount,
}) => {
  const [showCharacterCount, setShowCharacterCount] = useState(false);
  if (!editor) return null;

  const iconStyle = "w-5 h-5 text-gray-600";

  return (
    <div className="w-full bg-white shadow-sm px-4 mb-2 py-1 flex flex-wrap items-center gap-8">
      {/* Header/Footer Toggle */}
      <button
        className="toolbar-btn flex text-xs items-center gap-2 pr-4 border-r cursor-pointer"
        onClick={() => setShowHeaderFooter(!showHeaderFooter)}
      >
        Header & Footer
        {showHeaderFooter ? (
          <EyeIcon className={iconStyle} />
        ) : (
          <EyeSlashIcon className={iconStyle} />
        )}
      </button>

      {/* Margin Toggle */}
      <button className="toolbar-btn pr-4 border-r text-xs">Margins</button>

      {/* Rulers Toggle */}
      <button
        className="toolbar-btn flex items-center text-xs gap-2 pr-4 border-r cursor-pointer"
        onClick={() => setShowRulers(!showRulers)}
      >
        Rulers
        {showRulers ? (
          <EyeIcon className={iconStyle} />
        ) : (
          <EyeSlashIcon className={iconStyle} />
        )}
      </button>

      {/* Watermark Toggle */}
      <button className="toolbar-btn pr-4 border-r text-xs cursor-pointer">Watermark</button>

      {/* Zoom */}
      <div className="flex items-center gap-2 pr-4 border-r text-xs">
        <label htmlFor="zoom" className="text-gray-600">Zoom:</label>
        <select
          id="zoom"
          className="border rounded px-2 py-1"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        >
          <option value={100}>100%</option>
          <option value={75}>75%</option>
        </select>
      </div>

      {/* Character Count Toggle */}
      <button
        className="toolbar-btn flex items-center text-xs gap-2 pr-4 border-r cursor-pointer"
        onClick={() => setShowCharacterCount(!showCharacterCount)}
      >
        Character Count
        {showCharacterCount ? (
          <EyeIcon className={iconStyle} />
        ) : (
          <EyeSlashIcon className={iconStyle} />
        )}
      </button>

      {/* Character Count Display */}
      {showCharacterCount && (
        <div className="ml-auto text-gray-500 cursor-pointer">{characterCount} characters</div>
      )}
    </div>
  );
};

export default ToolbarPage;
