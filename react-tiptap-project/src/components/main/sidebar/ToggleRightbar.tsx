import olgaTellisLongText from "../../../data/olgaTellisContent";

const ToggleRightbar = () => {
  // Split text into "pages" — keep full content for each page
  const pages = olgaTellisLongText.match(/.{1,800}(\s|$)/gs) || [];

  // Only show short snippet for preview
interface PreviewSnippetProps {
    text: string;
}

const getPreviewSnippet = (text: PreviewSnippetProps["text"]): string => {
    // Take the first ~50 characters but allow multiple words
    const snippet = text.trim().split(/\s+/).slice(0, 22).join(" ");
    return snippet + (text.length > snippet.length ? "..." : "");
};

  return (
    <div
      className="
        h-screen w-50 
        flex flex-col border-l border-gray-300
        overflow-y-auto
        items-center
        bg-white
      "
    >
      {/* Header */}
      <div className="p-2 text-xs w-full border-b border-gray-300 flex justify-between bg-white font-semibold">
        <p>Thumbnail</p>
        <p>Index</p>
        <p>Search</p>
      </div>

      {/* Page thumbnails */}
      <div className="flex-1 space-y-4 items-center">
        {pages.map((pageText, index) => (
          <div
            key={index}
            className="
              bg-white text-black 
              rounded-md shadow-sm 
              w-40 h-52 
              mt-2
              p-3 
              overflow-hidden 
              flex flex-col justify-between
            "
          >
            {/* Short preview text */}
            <div className="text-xs leading-snug">
              {getPreviewSnippet(pageText)}
            </div>

            {/* Page number */}
            <p className="text-[10px] text-gray-500 text-center mt-2">
              Page {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleRightbar;
