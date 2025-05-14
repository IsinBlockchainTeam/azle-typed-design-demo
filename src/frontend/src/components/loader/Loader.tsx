import React from "react";

export interface LoaderProps {
  text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 border-4 rounded-full border-gray-300 border-t-blue-600 animate-spin"
          role="status"
          aria-label="loading"
        />
        {text && <p className="mt-2 text-md text-white">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
