"use client";

import CreateLandingPage from '../create/page';

export default function EditLandingPage({ params }: { params: { id: string } }) {
  return <CreateLandingPage params={params} />;
}
