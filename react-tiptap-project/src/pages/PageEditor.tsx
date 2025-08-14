import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';

export default function PageEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle, 
      FontFamily.configure({
        types: ['textStyle', 'heading'], 
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Start writing here...</p>',
  });

  return (
    <div className="w-full h-full p-8">
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
}

