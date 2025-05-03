interface PaginageProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>; 
}

const Paginage: React.FC<PaginageProps> = ({ page, setPage }) => {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <div className="flex justify-center items-center text-sm mt-1">
        {/* Previous Page */}
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-purple-500 dark:text-white px-4 py-2 rounded disabled:bg-gray-500 dark:disabled:bg-gray-600"
        >
          ก่อนหน้า
        </button>

        {/* Page Numbers */}
        <div className="text-center p-2">
          <span className="font-semibold">{page}</span>
        </div>

        {/* Next Page */}
        <button
          onClick={handleNextPage}
          className="bg-purple-500 dark:text-white px-4 py-2 rounded"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};
export default Paginage;
