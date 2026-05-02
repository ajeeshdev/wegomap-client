import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api').replace(/\/+$/, '');

// GET — fetch all from backend
export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API}/redirections`, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// POST — create in backend
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Forward auth header
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND_API}/redirections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// PUT — update in backend
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND_API}/redirections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify(rest),
    });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// DELETE — remove from backend
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${BACKEND_API}/redirections/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
    });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
