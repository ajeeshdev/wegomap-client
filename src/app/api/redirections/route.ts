import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_PATH = join(process.cwd(), 'src', 'data', 'redirections.json');

function readRedirections() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeRedirections(data: any[]) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET — fetch all redirections
export async function GET() {
  const redirections = readRedirections();
  return NextResponse.json({ success: true, data: redirections });
}

// POST — add a new redirection
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from, to, type = '301', active = true } = body;

    if (!from || !to) {
      return NextResponse.json({ success: false, error: 'From and To URLs are required' }, { status: 400 });
    }

    const redirections = readRedirections();

    // Check for duplicate
    const exists = redirections.find((r: any) => r.from === from);
    if (exists) {
      return NextResponse.json({ success: false, error: `A redirect from "${from}" already exists` }, { status: 409 });
    }

    const newRedirect = {
      id: Date.now().toString(),
      from,
      to,
      type,
      active,
      createdAt: new Date().toISOString(),
    };

    redirections.push(newRedirect);
    writeRedirections(redirections);

    return NextResponse.json({ success: true, data: newRedirect });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT — update a redirection
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, from, to, type, active } = body;

    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const redirections = readRedirections();
    const idx = redirections.findIndex((r: any) => r.id === id);
    if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    redirections[idx] = { ...redirections[idx], from, to, type, active, updatedAt: new Date().toISOString() };
    writeRedirections(redirections);

    return NextResponse.json({ success: true, data: redirections[idx] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE — remove a redirection
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    let redirections = readRedirections();
    redirections = redirections.filter((r: any) => r.id !== id);
    writeRedirections(redirections);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
