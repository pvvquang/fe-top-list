"use-client";

import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import ConditionalRender from "../ConditionalRender";
import Image from "next/image";
import Button from "../buttons";

interface UploadFileProps {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  onDeleteFile?: () => void;
}

const UploadFile = forwardRef<
  HTMLInputElement,
  UploadFileProps & ReturnType<UseFormRegister<{ [key: string]: string }>>
>(function UploadFile(
  { label, name, onChange, onBlur, error, errorMessage, onDeleteFile },
  ref
) {
  const [files, setFiles] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(e.target.files[0]);
    onChange(e);
  };

  useEffect(() => {
    if (!files) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(files);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  return (
    <div className="w-full">
      <ConditionalRender conditional={!!label}>
        <p className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </p>
      </ConditionalRender>

      <ConditionalRender
        conditional={!files}
        fallback={
          <CardImage
            title={files?.name || ""}
            imageLink={preview}
            onDelete={() => {
              setFiles(null);
              onDeleteFile && onDeleteFile();
            }}
          />
        }>
        <label
          htmlFor={`dropzone-file-${name}`}
          className={`mt-2 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ${
            !!errorMessage ? "border-red-300" : "border-gray-300"
          }`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
          </div>
          <input
            id={`dropzone-file-${name}`}
            ref={ref}
            name={name}
            type="file"
            className="hidden"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
      </ConditionalRender>
      {!!errorMessage && (
        <p className="text-xs mt-2 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
});

interface CardImageProps {
  title: string;
  imageLink: string;
  onDelete: () => void;
}

export function CardImage({ title, imageLink, onDelete }: CardImageProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-md w-max">
      <div className="flex items-center justify-between gap-2 max-w-[400px]">
        <h4 className="truncate flex-1" title={title}>
          {title}
        </h4>
        <Button
          classNameProps="shrink-0"
          label="Remove"
          variant="contained"
          color="error"
          onClick={onDelete}
        />
      </div>
      <ConditionalRender conditional={!!imageLink}>
        <Image
          className="mt-2"
          src={imageLink}
          alt={title}
          width={400}
          height={400}
        />
      </ConditionalRender>
    </div>
  );
}

export default UploadFile;
