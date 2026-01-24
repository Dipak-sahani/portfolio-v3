import { useEffect, useState } from "react";

const ImagePreview = ({ src, alt, className }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!src) return null;

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`${className} cursor-pointer`}
      />

      {/* Fullscreen Preview */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>

            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
