"use client";

import CreateHotelLandingPage from '../../create/page';

export default async function EditHotelLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return <CreateHotelLandingPage params={p} />;
}
