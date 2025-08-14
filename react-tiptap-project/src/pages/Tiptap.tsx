import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontFamily, TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "../components/main/common/Toolbar";
import olgaTellisContent from "../data/olgaTellisContent";

const PAGE_HEIGHT_PX = 1123; // A4 height in px
const PAGE_WIDTH_PX = 594;   // A4 width in px

const Tiptap: React.FC = () => {
  const [pages, setPages] = useState<HTMLElement[][]>([]);
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const measureRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontFamily.configure({ types: ["textStyle"] }),
    ],
    content: `<p>${olgaTellisContent.replace(/\n/g, "</p><p>")}</p>`,
  });

  // Automatic pagination logic
  useEffect(() => {
    if (!measureRef.current || !editor) return;
    const proseMirrorRoot = measureRef.current.querySelector(".ProseMirror");
    if (!proseMirrorRoot) return;

    const nodes = Array.from(proseMirrorRoot.childNodes) as HTMLElement[];

    let currentPage: HTMLElement[] = [];
    let currentHeight = 0;
    const newPages: HTMLElement[][] = [];

    nodes.forEach((node) => {
      const nodeHeight = (node as HTMLElement).offsetHeight;

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
  }, [editor?.getHTML(), mode]);

  if (!editor) return null;

  return (
    <div className="flex flex-col items-center bg-gray-100">
      {/* Top toolbar */}
      <div className="sticky top-0 z-50 w-full ">
        <div className="flex justify-between items-center">
          <Toolbar editor={editor as Editor} />
          <button
            onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded"
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
        </div>
      </div>

      {/* Hidden measuring container */}
      <div
        ref={measureRef}
        className="invisible absolute top-0 left-0"
        style={{ width: `${PAGE_WIDTH_PX}px` }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Modes */}
      {mode === "edit" && (
        <div className="page w-[210mm] min-h-[297mm] text-xs bg-white shadow-md p-8 mt-8">
          <EditorContent editor={editor} />
        </div>
      )}

      {mode === "preview" && (
        <div className="flex flex-col items-center w-full mt-8 text-xs">
          {pages.map((nodes, i) => (
            <div
              key={i}
              className="bg-white shadow-md flex flex-col mb-8 print:mb-0"
              style={{
                width: `${PAGE_WIDTH_PX}px`,
                height: `${PAGE_HEIGHT_PX}px`,
                pageBreakAfter: "always",
              }}
            >
              <div className="flex-1 p-8 overflow-hidden">
                {nodes.map((node, idx) => (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: node.outerHTML }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tiptap;
