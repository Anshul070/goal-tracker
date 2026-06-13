import React, { useState, useRef } from "react";

interface NotesEditorProps {
  noteText: string;
  onSave: (text: string) => void;
}

export default function NotesEditor({ noteText, onSave }: NotesEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(noteText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleEditClick = () => {
    setTempText(noteText);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(tempText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const insertFormat = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selected = text.substring(start, end);
    const replacement = before + selected + after;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setTempText(newText);

    // Focus back on the textarea and select the formatted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  return (
    <div className="notes-wrapper">
      <div className="notes-header">
        <span className="notes-title">Notes</span>
        {!isEditing && (
          <button className="notes-edit-btn" onClick={handleEditClick} title="Edit Notes">
            ✏️
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="notes-edit-area">
          <div className="notes-toolbar">
            <button
              type="button"
              className="notes-tool-btn"
              onClick={() => insertFormat("### ")}
              title="Heading"
            >
              H3
            </button>
            <button
              type="button"
              className="notes-tool-btn"
              onClick={() => insertFormat("**", "**")}
              title="Bold"
              style={{ fontWeight: "bold" }}
            >
              B
            </button>
            <button
              type="button"
              className="notes-tool-btn"
              onClick={() => insertFormat("- ")}
              title="Bullet List"
            >
              List
            </button>
            <button
              type="button"
              className="notes-tool-btn"
              onClick={() => insertFormat("```js\n", "\n```")}
              title="Code Block"
            >
              Code
            </button>
            <button
              type="button"
              className="notes-tool-btn"
              onClick={() => insertFormat("`", "`")}
              title="Inline Code"
            >
              Inline
            </button>
          </div>
          <textarea
            ref={textareaRef}
            className="notes-textarea"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            placeholder="Write markdown here... e.g. ### Approach \n- Use a map.\n```js\nconst map = new Map();\n```"
            rows={5}
          />
          <div className="notes-actions">
            <button className="notes-btn-save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="notes-btn-cancel" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="notes-preview">{parseMarkdown(noteText)}</div>
      )}
    </div>
  );
}

function parseMarkdown(text: string) {
  if (!text || text.trim() === "") {
    return <p className="notes-placeholder">No notes added. Click the pencil icon to add notes (supports code, bulletpoints, headings).</p>;
  }

  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="notes-ul">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="notes-code-block">
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList(index);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    if (line.startsWith("# ")) {
      flushList(index);
      elements.push(<h1 key={`h1-${index}`} className="notes-h1">{line.slice(2)}</h1>);
      return;
    }
    if (line.startsWith("## ")) {
      flushList(index);
      elements.push(<h2 key={`h2-${index}`} className="notes-h2">{line.slice(3)}</h2>);
      return;
    }
    if (line.startsWith("### ")) {
      flushList(index);
      elements.push(<h3 key={`h3-${index}`} className="notes-h3">{line.slice(4)}</h3>);
      return;
    }

    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      inList = true;
      const cleanText = line.trim().substring(2);
      listItems.push(
        <li key={`li-${index}`} className="notes-li">
          {renderInlineCode(cleanText)}
        </li>
      );
      return;
    }

    if (line.trim() === "") {
      flushList(index);
      return;
    }

    flushList(index);
    elements.push(
      <p key={`p-${index}`} className="notes-p">
        {renderInlineCode(line)}
      </p>
    );
  });

  flushList(lines.length);
  return elements;
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="notes-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
