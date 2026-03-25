"use client";

import { use } from 'react';
import CreateHotelLandingPage from '../../create/page';

export default function EditHotelLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const p = use(params);
  return <CreateHotelLandingPage params={p} />;
}
