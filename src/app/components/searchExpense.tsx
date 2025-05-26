interface SearchExpenseProps {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchExpense: React.FC<SearchExpenseProps> = ({
  setSortOrder,
  setSearch,
}) => {
  return (
    <div>
      <div className="grid sm:flex sm:justify-between gap-2">
        <div className="flex gap-2">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">จากน้อยไปมาก</option>
            <option value="desc">จากมากไปน้อย</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="ค้นหาวันที่หรือรายการ"
          className="border px-2 py-1 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
export default SearchExpense;
