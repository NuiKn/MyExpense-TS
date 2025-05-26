import { neon } from '@neondatabase/serverless';
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);


export async function GET() {
  const daily = await sql`
    SELECT
      TO_CHAR(date, 'DD-MM-YYYY') AS day,
      SUM(price) AS total
    FROM expenses
    WHERE date >= CURRENT_DATE - INTERVAL '2 days'
    GROUP BY day
    ORDER BY day DESC
  `;

  const monthly = await sql`
    SELECT
      TO_CHAR(DATE_TRUNC('month', date), 'MM-YYYY') AS month,
      SUM(price) AS total
    FROM expenses
    WHERE date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '2 months'
    GROUP BY month
    ORDER BY month DESC
  `;

  return NextResponse.json({ daily, monthly });
}