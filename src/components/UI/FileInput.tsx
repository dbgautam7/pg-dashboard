import { type ChangeEvent, useState } from "react";
import { UploadSvg } from "../../icons/AllSvgs";

interface Props {
  label: string;
  placeholder: string;
  multiple?: boolean;
}

export default function FileInput({
  label,
  placeholder,
  multiple = false,
}: Props) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFileNames(fileNames);
    }
  };

  return (
    <div className="relative flex items-center gap-4">
      <div className="flex flex-row-reverse items-center gap-4">
        <label
          htmlFor="identity"
          className="btn-secondary peer flex cursor-pointer items-center justify-center gap-2 py-2 px-4"
        >
          <UploadSvg className="h-6" />
          <span>{placeholder}</span>
        </label>
        <input
          id="identity"
          type="file"
          multiple={multiple}
          name="identity"
          className="hidden"
          required
          onChange={handleFileChange}
        />
        <label className="font-medium text-grayTextDark peer-hover:text-blackText">
          {label}
        </label>
      </div>

      {fileNames.length > 0 ? (
        <div className="absolute left-full -top-3 ml-4 space-y-1">
          <span className="text-sm font-medium text-primary">
            {fileNames.length} Files Selected
          </span>
          <div className="flex gap-2 text-xs font-medium text-grayHeading">
            {fileNames.map((fileName) => (
              <span
                key={fileName}
                className="max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap rounded bg-primaryHover px-3 py-1.5"
              >
                {fileName}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <span className="text-[14.5px] italic text-grayText">
          No files selected currently
        </span>
      )}
    </div>
  );
}
