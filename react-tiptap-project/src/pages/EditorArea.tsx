import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import ToolbarPage from "../components/main/common/ToolbarPage";
import olgaTellisContent from "../data/olgaTellisContent";
import ToggleRightbar from "../components/main/sidebar/ToggleRightbar";

// const PAGE_HEIGHT_PX = 900; // A4 height in px
// const PAGE_WIDTH_PX = 594;   // A4 width in px
const PAGE_HEIGHT_PX = 1123; // A4 height in px
const PAGE_WIDTH_PX = 594;   // A4 width in px

const EditorArea = () => {
  const [pages, setPages] = useState<HTMLElement[][]>([]);
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [zoom, setZoom] = useState(100);

  const measureRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({ limit: null }),
    ],
    content: `<p>${olgaTellisContent.replace(/\n/g, "</p><p>")}</p>`,
  });

  // Pagination logic: split based on real heights inside `.ProseMirror`
  useEffect(() => {
    if (!measureRef.current) return;
    const proseMirrorRoot = measureRef.current.querySelector(".ProseMirror");
    if (!proseMirrorRoot) return;

    const nodes = Array.from(proseMirrorRoot.childNodes) as HTMLElement[];

    let currentPage: HTMLElement[] = [];
    let currentHeight = 0;
    const newPages: HTMLElement[][] = [];

    nodes.forEach(node => {
      const nodeHeight = (node as HTMLElement).offsetHeight;

      // If adding this node exceeds page limit, start a new page
      if (currentHeight + nodeHeight > PAGE_HEIGHT_PX - 150) {
        newPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push(node);
      currentHeight += nodeHeight;
    });

    if (currentPage.length > 0) newPages.push(currentPage);

    setPages(newPages);
  }, [editor?.getHTML()]);

  return (
    <div className="flex-1  bg-gray-100">
   <div className="sticky top-0 z-50 bg-white shadow">
        {editor && (
        <ToolbarPage
          editor={editor as Editor}
          showHeaderFooter={showHeaderFooter}
          setShowHeaderFooter={setShowHeaderFooter}
          showRulers={showRulers}
          setShowRulers={setShowRulers}
          zoom={zoom}
          setZoom={setZoom}
          characterCount={editor.storage.characterCount.characters()}
        />
      )}
    </div>

      <div className="relative flex justify-center pt-8">
      <div>
         {showRulers && (
          <div className="absolute top-0 left-0 bg-gray-100 border-r border-gray-300 text-[10px] text-gray-500 w-6 flex flex-col items-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ height: "40px" }}>
                {i}
              </div>
            ))}
          </div>
        )}

        {/* Top Ruler */}
        {showRulers && (
          <div className="absolute top-0 left-6 right-0 bg-gray-100 border-b border-gray-300 text-[10px] text-gray-500 h-6 flex">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} style={{ width: "40px" }} className="text-center">
                {i}
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Hidden measuring container */}
        <div
          ref={measureRef}
          className="invisible absolute top-0 left-0"
          style={{ width: `${PAGE_WIDTH_PX * (zoom / 100)}px` }}
        >
          <EditorContent editor={editor} />
        </div>

        <div className="flex   w-full bg-gray-200">
          {/* Render actual paginated pages */}
        <div className="flex flex-col items-center w-full text-xs">
          {pages.map((nodes, i) => (
            <div
              key={i}
              className="bg-white shadow-md flex flex-col mb-8 print:mb-0 relative"
              style={{
                width: `${PAGE_WIDTH_PX * (zoom / 100)}px`,
                height: `${PAGE_HEIGHT_PX * (zoom / 100)}px`,
                pageBreakAfter: "always",
              }}
            >
              {showHeaderFooter && (
                <div className="w-full border-b border-gray-300 p-6 text-xs text-gray-500 text-right">
                  Header — Page {i + 1}
                </div>
              )}

              <div className="flex-1 p-4 overflow-hidden">
                {nodes.map((node, idx) => (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  />
                ))}
              </div>

              {showHeaderFooter && (
                <div className="w-full border-t border-gray-300 p-6 text-xs text-gray-500 text-right">
                  Footer — Page {i + 1}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <ToggleRightbar/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
