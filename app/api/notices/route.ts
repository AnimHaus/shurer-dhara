import { NextResponse } from "next/server";

const DASHBOARD = process.env.BACKEND_API_URL ?? "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${DASHBOARD}/api/news?active=true`, {
      next: { revalidate: 60 }, // revalidate every 60s
    });
    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
