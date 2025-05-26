import { Expense } from "@/app/types/Global.d.";
import { NextResponse } from "next/server";

const expenses: Expense = {
    id: 999,
    detail: "testData",
    price: 999,
    date: new Date("2025-05-03T14:30:00Z"),
  };
  
const expenseData: Expense[] = [expenses];

let currentId = 1; 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const sortKey = searchParams.get("sortKey") as keyof Expense;
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    let filtered : Expense[] = expenseData;

    // Filtering based on search parameter
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.detail.includes(search) ||
          item.date.toLocaleDateString().includes(search)
      );
    }

    // Sorting based on sortKey
    if (sortKey) {
      filtered.sort((a, b) => {
        let aVal, bVal;

        if (sortKey === "price") {
          aVal = a[sortKey];
          bVal = b[sortKey];
        } else if (sortKey === "date") {
          aVal = a.date.getTime();
          bVal = b.date.getTime();
        } else {
          aVal = a[sortKey];
          bVal = b[sortKey];
        }

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const paginated = filtered.slice(start, end);

    return NextResponse.json( paginated , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error },
      { status: 500 }
    );
  }
}

 export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { detail, price } = body;

    if (!detail || price === "0") {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const newExpense: Expense = {
      id: currentId++,
      detail,
      price,
      date: new Date(),
    };

    expenseData.push(newExpense);
    currentId++;

    return NextResponse.json( newExpense ,{ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save expense", error },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
    try {
      const { id } = await request.json();
      const index = expenseData.findIndex((item) => item.id === id);
  
      if (index !== -1) {
        expenseData.splice(index, 1);
        return NextResponse.json(
          { message: "Deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Expense not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Delete failed", error },
        { status: 500 }
      );
    }
  }