"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
  
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
  ];

  return (
    <div className={cn("rich-text-editor-wrapper", className)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background rounded-md border shadow-sm focus-within:ring-2 focus-within:ring-[var(--brand-green-500)] focus-within:ring-offset-2"
      />
      <style jsx global>{`
        /* ============ BASE LAYOUT ============ */
        .rich-text-editor-wrapper .quill {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* ============ TOOLBAR ============ */
        .rich-text-editor-wrapper .ql-toolbar {
          border: 1px solid var(--border);
          border-bottom: none;
          border-top-left-radius: var(--radius);
          border-top-right-radius: var(--radius);
          background: linear-gradient(
            to right,
            var(--brand-green-300),
            var(--brand-light-green)
          );
          box-shadow: var(--shadow-sm);
          padding: 0.5rem 0.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .rich-text-editor-wrapper .ql-toolbar button {
          transition: all 0.2s ease;
          border-radius: 4px;
          padding: 4px;
        }

        .rich-text-editor-wrapper .ql-toolbar button:hover {
          background-color: var(--brand-green-500);
        }

        .rich-text-editor-wrapper .ql-toolbar button.ql-active {
          background-color: var(--brand-green-700);
          color: var(--white);
        }

        /* ============ EDITOR ============ */
        .rich-text-editor-wrapper .ql-container {
          border: 1px solid var(--border);
          border-top: none;
          border-bottom-left-radius: var(--radius);
          border-bottom-right-radius: var(--radius);
          background: var(--background);
          box-shadow: var(--shadow-md);
          font-size: var(--text-base);
          line-height: 1.6;
          min-height: 350px;
          padding: 0.5rem;
        }

        .rich-text-editor-wrapper .ql-editor {
          font-family: var(--font-inter), sans-serif;
          color: var(--grey-900);
          min-height: 350px;
          line-height: 1.65;
        }

        .rich-text-editor-wrapper .ql-editor p {
          margin: 0.4rem 0;
        }

        .rich-text-editor-wrapper .ql-editor strong {
          color: var(--brand-green-700);
        }

        .rich-text-editor-wrapper .ql-editor a {
          color: var(--brand-green-500);
          text-decoration: underline;
        }

        /* ============ PLACEHOLDER ============ */
        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: var(--grey-500);
          opacity: 0.8;
          font-style: normal;
        }

        /* ============ ICONS ============ */
        .rich-text-editor-wrapper .ql-snow .ql-stroke {
          stroke: var(--grey-700);
        }

        .rich-text-editor-wrapper .ql-snow .ql-fill {
          fill: var(--grey-700);
        }

        /* ============ PICKERS & LABELS ============ */
        .rich-text-editor-wrapper .ql-snow .ql-picker {
          color: var(--grey-900);
        }

        .rich-text-editor-wrapper .ql-snow .ql-picker-label:hover {
          background-color: var(--brand-green-300);
          border-radius: 4px;
        }

        /* ============ FOCUS STATE ============ */
        .rich-text-editor-wrapper:focus-within .ql-container {
          border-color: var(--brand-green-500);
          box-shadow: 0 0 0 3px var(--brand-green-300);
        }

        /* ============ DARK MODE ============ */
        .dark .rich-text-editor-wrapper .ql-toolbar {
          background: linear-gradient(
            to right,
            var(--brand-green-900),
            var(--brand-green-700)
          );
        }

        .dark .rich-text-editor-wrapper .ql-editor {
          color: var(--white);
        }

        .dark .rich-text-editor-wrapper .ql-toolbar button:hover {
          background-color: var(--brand-green-500);
        }

        .dark .rich-text-editor-wrapper .ql-toolbar button.ql-active {
          background-color: var(--brand-green-300);
          color: var(--black);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
