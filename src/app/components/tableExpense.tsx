"use client";
import Swal from "sweetalert2";
import { Expense } from "../types/Global.d.";
import { useEffect } from "react";

interface TableExpenseProps {
  expenses: Expense[];
  fetchExpenses: () => void;
}
const TableExpense: React.FC<TableExpenseProps> = ({
  expenses,
  fetchExpenses,
}) => {
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "จะลบจริงดิ?",
      text: "ลบแล้วหายเลยนะเว้ยย",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ไม่ลบละ",
      confirmButtonText: "ลบดิรอไร!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/expense/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Unknown error");
        }
        Swal.fire({
          title: "เย้ตังกลับมาแล้ววววว",
          text: "ใช้ต่อดิรอไรรร",
          backdrop: `
                        rgba(105, 105, 105, 0.8)
                        url("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTh1bXV1Nm9sMHp4MjZtZTJscTVhZWdkZnZmOWJmYWl3NDk5c3NtNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4Ztytt2s2Cr7XyTI1z/giphy.gif") 
                        center top 
                        no-repeat 
                    `,
          showConfirmButton: false,
          timer: 2000,
          icon: "success",
          timerProgressBar: true,
        });
        fetchExpenses();
      } catch (err: unknown) {
        if (err instanceof Error) {
          Swal.fire("พลาดได้ไง", `ไม่น่าเชื่ออ ${err.message}`, "error");
        } else {
          Swal.fire("พลาดได้ไง", "ไม่น่าเชื่ออ เกิดข้อผิดพลาด", "error");
        }
      }
    }
  }

  return (
      <table className="border rounded-md text-sm min-h-[382px]">
        <thead>
          <tr className="bg-gray-200 dark:dark:bg-neutral-600">
            <th className="border px-2 py-1">วันที่</th>
            <th className="border px-2 py-1">รายการ</th>
            <th className="border px-2 py-1">ราคา</th>
            <th className="border px-2 py-1">เวลา</th>
            <th className="border px-2 py-1">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 py-2 dark:text-black"
              >
                รวยแล้วรึไง ไม่มีรายจ่าย เพิ่มดิรอไร
              </td>
            </tr>
          ) : (
            expenses.map((exp, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">
                  {new Date(exp.date).toLocaleDateString("en-GB")}
                </td>
                <td className="border px-2 py-1">{exp.detail}</td>
                <td className="border px-2 py-1">{exp.price}</td>
                <td className="border px-2 py-1">
                  {new Date(exp.date).toLocaleTimeString("en-US", {
                    hour12: false,
                  })}
                </td>
                <td className="border px-2 py-1">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(exp.id)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
  );
};
export default TableExpense;
