import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextEditor({
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-grow flex-col-reverse gap-2">
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["link", "image", "video"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
        className="peer mb-11 h-full"
      />
      <label
        className={`font-medium ${
          isFocused
            ? "text-primary"
            : "text-grayTextDark peer-hover:text-blackText"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
