import { neon } from '@neondatabase/serverless';
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function PUT(request: Request,{ params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const body = await request.json();
    const { detail, price } = body;

    if (!detail || !price) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await sql`
      UPDATE expenses
      SET detail = ${detail}, price = ${price}, date = ${new Date()}
      WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Expense updated' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_request: Request ,{ params }: { params: { id: string } }) {
  try {
    const { id } = await params

    await sql`
      DELETE FROM expenses WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Expense deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
