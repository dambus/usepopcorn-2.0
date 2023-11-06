export default function Modal({
  open,
  onClose,
  btnContent,
  children,
  movieIsLoading,
}) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="overlay fixed top-0 left-0 right-0 w-full min-h-[100vh] flex content-center items-center bg-black bg-opacity-60 z-10"
      >
        {/* {isLoading && <Loader />} */}
        {!movieIsLoading && (
          <div
            className="modal-container max-w-[95vw] justify-center m-auto p-4 bg-gray-700 rounded-xl overflow-auto z-20 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal right-[-83%] md:right-[-85%] relative py-1 px-3 text-gray-500 text-sm border-none outline-none rounded-lg shadow-sm cursor-pointer bg-gray-300"
              onClick={onClose}
            >
              {btnContent}
            </button>
            {children}
          </div>
        )}
      </div>
    </>
  );
}
