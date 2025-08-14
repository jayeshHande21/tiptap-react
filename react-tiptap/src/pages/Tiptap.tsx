import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const Tiptap: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Hello! Start typing to see multiple pages.</p>`,
  });

  if (!editor) return null;

  return (
    <div className="editor-container">
      {/* Page 1 */}
      <div className="page">
        <EditorContent editor={editor} />
      </div>

      {/* Page 2 - placeholder for now */}
      <div className="page">
        <p>Page 2 content here</p>
      </div>
    </div>
  );
};

export default Tiptap;
