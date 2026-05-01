import HomeClient from './HomeClient';
import parse from 'html-react-parser';
import { API_URL } from '@/config';

export default async function HomePage() {
  let homePage = null;
  try {
    const res = await fetch(`${API_URL}/pages?slug=home`, { next: { revalidate: 60 } });
    const json = await res.json();
    if (json.success && json.data) {
      homePage = json.data.find((p: any) => p.slug === 'home');
    }
  } catch (e) {}

  return (
    <>
      {homePage?.seo_meta && parse(homePage.seo_meta)}
      <HomeClient />
    </>
  );
}
