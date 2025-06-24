// src/components/Toolbar.tsx
'use client';

import { type Editor } from '@tiptap/react';
import React, { useRef, useState } from 'react';
import {
  Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Underline, Quote, Code, 
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
} from 'lucide-react';

type Props = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // ... (This function is fine)
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).updateAttributes('image', { 'data-align': 'center', 'data-size': 'medium' }).run();
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed!');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        {/* --- ADD type="button" TO ALL TOOLBAR BUTTONS --- */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}><Bold className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}><Underline className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}><Italic className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}><Strikethrough className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}><Heading2 className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}><List className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}><ListOrdered className="w-5 h-5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}><Quote className="w-5 h-5" /></button>
        
        {editor.isActive('image') ? (
          <>
            <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'left' }).run()} className={editor.isActive('image', { 'data-align': 'left' }) ? 'is-active' : ''}><AlignLeft className="w-5 h-5" /></button>
            <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'center' }).run()} className={editor.isActive('image', { 'data-align': 'center' }) ? 'is-active' : ''}><AlignCenter className="w-5 h-5" /></button>
            <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'right' }).run()} className={editor.isActive('image', { 'data-align': 'right' }) ? 'is-active' : ''}><AlignRight className="w-5 h-5" /></button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}><AlignLeft className="w-5 h-5" /></button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}><AlignCenter className="w-5 h-5" /></button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}><AlignRight className="w-5 h-5" /></button>
          </>
        )}

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
        <button type="button" onClick={triggerFileSelect} disabled={isUploading}>{isUploading ? 'Uploading...' : <ImageIcon className="w-5 h-5" />}</button>

        {editor.isActive('image') && (
            <div className="flex gap-2">
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-size': 'small' }).run()} className={editor.isActive('image', { 'data-size': 'small' }) ? 'is-active' : ''}>S</button>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-size': 'medium' }).run()} className={editor.isActive('image', { 'data-size': 'medium' }) ? 'is-active' : ''}>M</button>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { 'data-size': 'large' }).run()} className={editor.isActive('image', { 'data-size': 'large' }) ? 'is-active' : ''}>L</button>
            </div>
        )}
      </div>
    </div>
  );
};