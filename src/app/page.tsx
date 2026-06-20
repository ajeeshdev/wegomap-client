import HomeClient from './HomeClient';
import parse from 'html-react-parser';
import { API_URL, getImageUrl } from '@/config';

export default async function HomePage() {
  let homePage = null;
  let firstSliderImage = null;
  let initialSlides = null;

  try {
    const [pageRes, sliderRes] = await Promise.all([
      fetch(`${API_URL}/pages?slug=home`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/sliders`, { next: { revalidate: 60 } })
    ]);

    if (pageRes.ok) {
      const json = await pageRes.json();
      if (json.success && json.data) {
        homePage = json.data.find((p: any) => p.slug === 'home');
      }
    }

    if (sliderRes.ok) {
      const json = await sliderRes.json();
      if (json.success && json.data && json.data.length > 0) {
        initialSlides = json.data.map((s: any) => ({
            title: s.title || '',
            subtitle: s.subtitle || "Explore the world with WEGOMAP",
            buttonText: "Discover Now",
            buttonHref: s.link || s.btnurl || '/packages',
            imgDesktop: getImageUrl(s.image),
            imgMobile: getImageUrl(s.image),
            imgPortrait: getImageUrl(s.image),
            imageAlt: s.imageAlt
        }));
        firstSliderImage = getImageUrl(json.data[0].image);
      }
    }
  } catch (e) {}

  return (
    <>
      {firstSliderImage && (
        <link rel="preload" href={firstSliderImage} as="image" fetchPriority="high" />
      )}
      {homePage?.seo_meta && parse(homePage.seo_meta)}
      <HomeClient initialSlides={initialSlides} />
    </>
  );
}
