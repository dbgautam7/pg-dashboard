import { useState } from "react";
import { ImageOutlineSvg, UploadSvg } from "../../icons/AllSvgs";

interface Props {
  className?: string;
}

export default function ImageInput({ className = "" }: Props) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div className="flex flex-grow items-center justify-center rounded border border-secondary shadow">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="event"
            className="h-full w-full rounded object-cover"
          />
        ) : (
          <ImageOutlineSvg className="h-10 text-secondary" />
        )}
      </div>
      <label
        htmlFor="identity"
        className="btn-secondary peer flex cursor-pointer items-center justify-center gap-2 py-2 px-4"
      >
        <UploadSvg className="h-6" />
        <span>{image ? "Change Image" : "Select Image"}</span>
      </label>
      <input
        id="identity"
        type="file"
        name="identity"
        className="hidden"
        onChange={(e) => setImage(e.target.files![0])}
      />
    </div>
  );
}
