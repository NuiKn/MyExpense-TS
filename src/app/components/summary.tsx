/* import { useEffect, useState } from "react";

export default function Summary() {
  const [daily, setDaily] = useState({});
  const [monthly, setMonthly] = useState({});

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch("/api/summary");
      const data = await res.json();
      setDaily(data.daily || {});
      setMonthly(data.monthly || {});
    }
    fetchSummary();
  }, []);

  return (
    <div className="grid bg-neutral-300 dark:bg-neutral-500 dark:text-black rounded-md gap-5 p-2 mt-2">
      <label className="text-lg font-bold border-b ">สรุปยอดหน่อยดิ</label>
      <label>
        ยอดรายวัน{" "}
        {Object.entries(daily).map(([date, total]) => (
          <li key={date}>
            {date} — {total.toLocaleString()} ฿
          </li>
        ))}
      </label>
      <label>
        ยอดรายเดือน{" "}
        {Object.entries(monthly).map(([month, total]) => (
          <li key={month}>
            เดือน {month} — {total.toLocaleString()} ฿
          </li>
        ))}
      </label>
    </div>
  );
}
 */