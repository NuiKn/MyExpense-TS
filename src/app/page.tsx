"use client";
import React, { useCallback, useEffect, useState } from "react";
import TableExpense from "./components/tableExpense";
import SearchExpense from "./components/searchExpense";
import Paginage from "./components/pagination";
import AddExpense from "./components/addExpense";
import { Expense } from "./types/Global.d.";
import Swal from "sweetalert2";
import { useTheme } from "next-themes";
import Summary from "./components/summary";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const { setTheme, resolvedTheme } = useTheme();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/expense?search=${search}&sortOrder=${sortOrder}&page=${page}&limit=${10}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
      const data = await response.json();
      setExpenses(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire("พลาดได้ไง", `ไม่น่าเชื่ออ ${err.message}`, "error");
      } else {
        Swal.fire("พลาดได้ไง", "ไม่น่าเชื่ออ เกิดข้อผิดพลาด", "error");
      }
    }
  }, [search, sortOrder, page]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-5xl mt-2 p-2">
        <div className="grid text-center">
          <p className="text-purple-500 text-3xl font-bold">บันทึกดิวะ</p>
          <p className="text-lg font-bold dark:text-white">
            ดูดิว่าตังหายไปไหน?
          </p>
        </div>
        <div className="grid md:flex gap-2">
          <div className="md:w-1/3">
            <div className="flex justify-center">
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className=" bg-purple-500 mt-2 hover:bg-purple-400 rounded-md p-2 text-center"
              >
                {resolvedTheme === "dark"
                  ? "มืดเกินไปรึป่าว?"
                  : "แสบตาเกินไปป่าว?"}
              </button>
            </div>
            <Summary></Summary>
            <AddExpense fetchExpenses={fetchExpenses}></AddExpense>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="grid bg-neutral-300 dark:bg-neutral-500 dark:text-black rounded-md gap-3 p-2 mt-2 overflow-x-auto">
              <label className="text-lg font-bold border-b">
                มีไรบ้างวะรายงานดิ
              </label>
              <SearchExpense
                setSortOrder={setSortOrder}
                setSearch={setSearch}
              ></SearchExpense>
              <TableExpense
                expenses={expenses}
                fetchExpenses={fetchExpenses}
              ></TableExpense>
              <Paginage page={page} setPage={setPage}></Paginage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
