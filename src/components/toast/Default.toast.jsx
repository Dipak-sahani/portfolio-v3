const DefaultToast=({ message, show, onClose }) =>{
  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className="flex items-center w-full max-w-xs p-4 text-body bg-neutral-primary-soft
        rounded-base shadow-xs border border-default"
        role="alert"
      >
        <svg
          className="w-6 h-6 text-fg-brand"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.122 17.645..."
          />
        </svg>

        <div className="ms-2.5 text-sm border-s border-default ps-3.5">
          {message}
        </div>

        <button
          onClick={onClose}
          className="ms-auto h-8 w-8 flex items-center justify-center hover:bg-neutral-secondary-medium rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
}



export default DefaultToast;