import { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface DailySummary {
  day: string;
  total: number;
}

interface MonthlySummary {
  month: string;
  total: number;
}

export default function Summary() {
  const [daily, setDaily] = useState<DailySummary[]>([]);
  const [monthly, setMonthly] = useState<MonthlySummary[]>([]);


  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch('/api/summary');
      if (res.ok) {
        const data = await res.json();
        setDaily(data.daily);
        setMonthly(data.monthly);
      } else {
        Swal.fire("พลาดได้ไง", "ไม่น่าเชื่ออ เกิดข้อผิดพลาด", "error");
      }
    }

    fetchSummary();
  }, []);

  return (
    <div className="grid bg-neutral-300 dark:bg-neutral-500 dark:text-black rounded-md gap-5 p-2 mt-2">
      <label className="text-lg font-bold border-b ">สรุปยอดหน่อยดิ</label>
      <label>
        ยอดรายวัน{" "}
        {daily.map(({ day, total }) => (
          <li key={day}>
            {day}: {total} บาท
          </li>
        ))}
      </label>
      <label>
        ยอดรายเดือน{" "}
        {monthly.map(({ month, total }) => (
          <li key={month}>
            {month}: {total} บาท
          </li>
        ))}
      </label>
    </div>
  );
}