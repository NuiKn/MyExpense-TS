import { neon } from '@neondatabase/serverless';
import { NextResponse } from "next/server";
import { Expense } from "@/app/types/Global.d.";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sortOrderRaw = searchParams.get('sortOrder')?.toLowerCase();
    const sortOrder = sortOrderRaw === 'asc' ? 'ASC' : 'DESC';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    const searchPattern = `%${search}%`;
    if (!['ASC', 'DESC'].includes(sortOrder)) {
      return NextResponse.json({ error: 'Invalid sortOrder' }, { status: 400 });
    }

    const result = await sql`
      SELECT * FROM expenses
      WHERE detail ILIKE ${searchPattern}
        OR TO_CHAR(date, 'DD-MM-YYYY') ILIKE ${searchPattern}
      ORDER BY date ${sql.unsafe(sortOrder)}
      LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { detail, price } = body as Partial<Expense>;

    if (!detail || !price ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO expenses (detail, price, date)
      VALUES (${detail}, ${price}, ${new Date()});
    `;

    return NextResponse.json({ message: 'Expense saved' }, { status: 200 });

  } catch (error) {
    console.error('Error saving expense:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}