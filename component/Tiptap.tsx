// src/components/Tiptap.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import BaseImage from '@tiptap/extension-image';
import { Toolbar } from './Toolbar';

// --- MOVE THESE DEFINITIONS OUTSIDE THE COMPONENT ---

// 1. Custom Image extension
const CustomImage = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-size': {
        default: 'medium',
        renderHTML: (attributes) => ({ 'data-size': attributes['data-size'] }),
      },
      'data-align': {
        default: 'center',
        renderHTML: (attributes) => ({ 'data-align': attributes['data-align'] }),
      },
    };
  },
});

// 2. The extensions array itself
const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
  Underline,
  CustomImage, // Use our custom image extension
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

// --- END OF MOVED DEFINITIONS ---


// The component itself is now much cleaner
const Tiptap = ({ content, onChange }: { content: string; onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: editorExtensions, // Use the constant array
    content: content,
    editorProps: {
      attributes: {
        class: 'rounded-bl-md rounded-br-md p-4 w-full min-h-[300px] border border-gray-700 focus:outline-none focus:border-blue-500 prose prose-invert max-w-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;