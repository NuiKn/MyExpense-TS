import { neon } from '@neondatabase/serverless';
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    
    return NextResponse.json( "test" , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const comment = data.get('comment');

    if (!comment || typeof comment !== 'string') {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
    }

    await sql`INSERT INTO comments (comment) VALUES (${comment})`;

    return NextResponse.json({ message: 'Comment saved successfully' });
  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}