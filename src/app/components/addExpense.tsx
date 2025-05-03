"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { ExpenseAdd } from "../types/Global.d.";

interface AddExpenseProps {
  fetchExpenses: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ fetchExpenses }) => {
  const [expenses, setExpenses] = useState<ExpenseAdd>({
    detail: "",
    price: 0,
  });

  async function HadleAddExpense() {
    if (expenses.detail === "" || expenses.price === 0) return;
    try {
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenses),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
      Swal.fire({
        title: "ไม่น้าตังกำลังปลิวออกไปปป",
        text: "ตังกำลังจะหมดแล้วนะเว้ยยย",
        backdrop: `
                rgba(105, 105, 105, 0.8)
                url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTI0cm1qbXR2Y2ZiZzg1Y2pwNTJxYWk0YTE4OGhnZjg1dmZpcG8waCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/14SGx6CtrLrj7dvOa3/giphy.gif") 
                center top 
                no-repeat 
            `,
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        timerProgressBar: true,
      });
      setExpenses({ detail: "", price: 0 });
      fetchExpenses();
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire("พลาดได้ไง", `ไม่น่าเชื่ออ ${err.message}`, "error");
      } else {
        Swal.fire("พลาดได้ไง", "ไม่น่าเชื่ออ เกิดข้อผิดพลาด", "error");
      }
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HadleAddExpense();
        }}
      >
        <div className="grid bg-neutral-300 dark:bg-neutral-500 dark:text-black rounded-md gap-4 p-2 mt-2">
          <label className="text-lg font-bold border-b">
            เพิ่มรายจ่ายดิรออะไร
          </label>
          <label>รายจ่ายค่าไรวะ?</label>
          <input
            className="border-2 rounded-md text-black"
            value={expenses?.detail}
            onChange={(e) =>
              setExpenses({ ...expenses, detail: e.target.value })
            }
            placeholder="ข้อความเท่านั้น!!!"
            required
            type="text"
          />
          <label>เท่าไหร่วะ?</label>
          <input
            className="border-2 rounded-md text-black"
            value={expenses.price}
            onChange={(e) =>
              setExpenses({ ...expenses, price: +e.target.value })
            }
            placeholder="ตัวเลขเท่านั้น!!!"
            type="number"
            required
            min={1}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-400 rounded-md dark:text-white"
          >
            บันทึกโว้ยยย
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddExpense;

