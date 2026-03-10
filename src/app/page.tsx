"use client";

import {
  Heart,
  Search,
  Star,
  ChevronRight,
  MapPin,
  Package,
  Plane,
  Building2,
  Ship,
  FileCheck,
  Car,
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileText,
  Phone,
  Info,
  Users,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import Hero from "@/components/Hero";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function WishlistButton() {
  const [selected, setSelected] = useState(false);
  return (
    <button
      className={`wishlistBtn ${selected ? 'selected' : ''}`}
      aria-label="Add to wishlist"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelected(!selected);
      }}
    >
      <Heart size={18} fill={selected ? "currentColor" : "none"} />
    </button>
  );
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const services = [
    { name: "Services", icon: Info, active: false, href: "/services" },
    { name: "Tours", icon: MapPin, active: true, href: "/tours" },
    { name: "Events", icon: Calendar, active: false, href: "/events" },
    { name: "Cruises", icon: Ship, active: false, href: "/cruise-packages" },
    { name: "Blogs", icon: FileText, active: false, href: "/blogs" },
    { name: "Contact", icon: Phone, active: false, href: "/contact" },
  ];

  const firstMinuteOffers = [
    {
      title: "Singapore",
      price: "₹ 57999",
      oldPrice: "₹ 63000",
      duration: "~4N Singapore",
      image: "https://www.wegomap.com/uploads/packages/OTjBGqS0xBCOI56684Km9l8U9dDL3iREc709JrNC221107123611.jpg"
    },
    {
      title: "Dubai",
      price: "₹ 38900",
      oldPrice: "₹ 53200",
      duration: "~3N Dubai",
      image: "https://www.wegomap.com/uploads/packages/3yngixh95sghzyzg1ohbiacvmi1uygketv25zb4e220424115201.jpg"
    },
    {
      title: "Gangtok Darjeeling",
      price: "₹ 23999",
      oldPrice: "₹ 26500",
      duration: "~2N Gangtok / 2N Darjeeling",
      image: "https://www.wegomap.com/uploads/packages/eyclyJYpPSt9S1s3jrz52KXBd3i84loz4g9TRuOJ220425115126.jpg"
    },
  ];

  const domesticPackages = [
    {
      title: "Goa Tour Package",
      price: "₹ 8,499",
      oldPrice: "₹ 10,500",
      duration: "2 Nights 3 Days ~ 1N South Goa / 1N North Goa",
      image: "https://www.wegomap.com/uploads/packages/zzgxrdjxnq0idmh5x2eypanfj6cpoqfz5dz1jntu220406041956.jpg"
    },
    {
      title: "Kodaikanal Tour Package",
      price: "₹ 8,999",
      oldPrice: "₹ 10,600",
      duration: "2 Nights 3 Days ~ 2N Kodaikanal",
      image: "https://www.wegomap.com/uploads/packages/zz78tl2qmhwn8woqay4nx44kn3c6nj9bdbfqq11u240906103238.jpg"
    },
    {
      title: "Coorg Tour Package",
      price: "₹ 11,999",
      oldPrice: "₹ 12,900",
      duration: "2 Nights 3 Days ~ 2N Coorg",
      image: "https://www.wegomap.com/uploads/packages/mksp2z9emdc8ymkinijvjc85atc6cbl6wzpq1pam240906105051.jpg"
    },
    {
      title: "Goa Tour Package (Premium)",
      price: "₹ 12,899",
      oldPrice: "₹ 15,000",
      duration: "3 Nights 4 Days ~ 1N South Goa / 2N North Goa",
      image: "https://www.wegomap.com/uploads/packages/3fb0vs45lzgs7p2uxdksfennausfud9ktfpzy1lv240905105628.jpg"
    },
    {
      title: "Ooty Tour Packages",
      price: "₹ 14,599",
      oldPrice: "₹ 16,500",
      duration: "2 Nights 3 Days ~ 2N Ooty",
      image: "https://www.wegomap.com/uploads/packages/8zogew9nlpyyvhabbux8k4nomjvcwhbxul19urz9240905041659.jpg"
    },
    {
      title: "Coorg - Mysore",
      price: "₹ 14,999",
      oldPrice: "₹ 15,800",
      duration: "3 Nights 4 Days ~ 2N Coorg / 1N Mysore",
      image: "https://www.wegomap.com/uploads/packages/uczkmux2qyzzobrnbbgyaty8vldnpkx9izdegbb0240905031606.jpg"
    },
    {
      title: "Ooty Kodaikanal Package",
      price: "₹ 15,999",
      oldPrice: "₹ 19,000",
      duration: "4 Nights 5 Days ~ 2N Ooty / 2N Kodaikanal",
      image: "https://www.wegomap.com/uploads/packages/ilprye3rqzkqmd7ruvf8uvu2xqgj6p92iwuhnbeh240905040700.jpg"
    },
    {
      title: "Leh Ladakh Tour Package",
      price: "₹ 16,999",
      oldPrice: "₹ 22,000",
      duration: "5 Nights 6 Days ~ 3N Leh 2N Ladakh",
      image: "https://www.wegomap.com/uploads/packages/k7ksmqay9clwp5rfdoeab7b3ucmsrsijxaxstr6d240904032017.png"
    },
    {
      title: "Shimla Manali Package",
      price: "₹ 18,999",
      oldPrice: "₹ 22,000",
      duration: "5 Nights 6 Days ~ 3N Manali / 2 Shimla",
      image: "https://www.wegomap.com/uploads/packages/wushxjjxw6lplnqh61wesqoeyvkawbkph3pxpylf220406075733.jpg"
    },
    {
      title: "Rajasthan Tour Package",
      price: "₹ 21,999",
      oldPrice: "₹ 29,000",
      duration: "5 Nights 6 Days ~ 2N JAIPUR / 1N JODHPUR / 2N UDAIPUR",
      image: "https://www.wegomap.com/uploads/packages/pxckp21pd9jsmx7demeb2jbi7zgowvjuac5dbkys240904024249.png"
    },
    {
      title: "Kashmir Holiday",
      price: "₹ 21,999",
      oldPrice: "₹ 25,000",
      duration: "4 Nights 5 Days ~ 4N SRINAGAR",
      image: "https://www.wegomap.com/uploads/packages/ujztwngbfjmhebzweiqwdeoaqrbbnix7wrswsbc7240829021419.jpg"
    },
    {
      title: "Varanasi Package",
      price: "₹ 21,999",
      oldPrice: "₹ 23,900",
      duration: "3 Nights 4 Days ~ 2N Varanasi / 1N Ayodya",
      image: "https://www.wegomap.com/uploads/packages/qi7pkr3vs0suxdbur0ua8iidcuqzfurzuls3ugyb240904042707.jpg"
    },
    {
      title: "Lakshadweep Package",
      price: "₹ 22,999",
      oldPrice: "₹ 24,500",
      duration: "3 Nights 4 Days ~ 3N Agatti island",
      image: "https://www.wegomap.com/uploads/packages/rqeuFriCXbjmlMkRh6UmXGJka06Jt1bLAWQFexJD240821035047.jpeg"
    },
    {
      title: "Golden Triangle Package",
      price: "₹ 23,999",
      oldPrice: "₹ 25,950",
      duration: "5 Nights 6 Days ~ 2N Delhi / 1N Agra / 2N Jaipur",
      image: "https://www.wegomap.com/uploads/packages/aiwgy8tafcpau9dgatsmnlnk1yfvugillle8yzbh240905024128.png"
    },
    {
      title: "Gangtok Darjeeling Package",
      price: "₹ 23,999",
      oldPrice: "₹ 26,500",
      duration: "4 Nights 5 Days ~ 2N GANGTOK / 2N DARJEELING",
      image: "https://www.wegomap.com/uploads/packages/klidzvonwfqlp6nyvhmnkkon6g6cobwkxaxxloxn240904040120.png"
    },
    {
      title: "Assam Meghalaya Tour",
      price: "₹ 26,999",
      oldPrice: "₹ 29,500",
      duration: "4 Nights 5 Days ~ 3N SHILLONG / 1N GUWAHATI",
      image: "https://www.wegomap.com/uploads/packages/7zw7tf5mlcanzfebdwxti9b3pmhjvoteniv5cozl240904043422.jpg"
    },
    {
      title: "Andaman Packages",
      price: "₹ 30,999",
      oldPrice: "₹ 34,000",
      duration: "6 Nights 7 Days ~ 6N Andaman",
      image: "https://www.wegomap.com/uploads/packages/sn5u9loaltgduhnit3mwbvi9j6kqwztfark0i6zp240904050028.jpg"
    },
  ];

  const internationalPackages = [
    {
      title: "Bali Budget Tour Plan",
      price: "₹ 16,999",
      oldPrice: "₹ 19,000",
      duration: "3 Nights 4 Days ~ 3N Bali",
      image: "https://www.wegomap.com/uploads/packages/xe9jtsf7cqwsux9oqjjcp5btcdtpwcyduqxksib9240827103944.jpg"
    },
    {
      title: "Malaysia Tour Package",
      price: "₹ 19,499",
      oldPrice: "₹ 22,500",
      duration: "3 Nights 4 Days ~ 3N Malaysia",
      image: "https://www.wegomap.com/uploads/packages/sc3sabi8yshgcivodgcqgboalmhdvwdanrukaopu240904025152.png"
    },
    {
      title: "Bali Tour Package",
      price: "₹ 21,999",
      oldPrice: "₹ 25,000",
      duration: "4 Nights 5 Days ~ 4N Bali",
      image: "https://www.wegomap.com/uploads/packages/scjv80siga8jttcsryrjx5hfckuzsflpd6ten4ld240827103913.jpg"
    },
    {
      title: "Thailand Delight",
      price: "₹ 22,000",
      oldPrice: "₹ 24,500",
      duration: "3 Nights 4 Days ~ 2N Pattaya / 1N Bangkok",
      image: "https://www.wegomap.com/uploads/packages/U58KmFr2waHgoZCqz2YiipHY43bHX1lDH2R4cWqg240822120232.jpg"
    },
    {
      title: "Nepal Tour Package",
      price: "₹ 23,999",
      oldPrice: "₹ 26,000",
      duration: "4 Nights 5 Days ~ 1N Kathmandu / 2N Pokhra / 1N Kathmandu",
      image: "https://www.wegomap.com/uploads/packages/vb1q7giz8knrotcrratjypfxzoti0rjraf4quymy220406072547.jpg"
    },
    {
      title: "Amazing Thailand",
      price: "₹ 24,400",
      oldPrice: "₹ 28,000",
      duration: "3 Nights 4 Days ~ 2N Pattaya / 1N Bangkok",
      image: "https://www.wegomap.com/uploads/packages/zxlqmhgq71iv3xvevzebzywogiwwt6uv7zm2mgos220406082237.jpg"
    },
    {
      title: "Maldives Tour Package",
      price: "₹ 26,999",
      oldPrice: "₹ 29,000",
      duration: "3 Nights 4 Days ~ 3Night Maldives",
      image: "https://www.wegomap.com/uploads/packages/4thguktpn5o2ucp34ebcjxknujlhwn4h13ncv7sz240905033236.jpg"
    },
    {
      title: "Bali Standard tour",
      price: "₹ 27,999",
      oldPrice: "₹ 32,000",
      duration: "5 Nights 6 Days ~ 5N Bali",
      image: "https://www.wegomap.com/uploads/packages/firux1ir0nnix84mzytacsprhbo120ca8u6wgi8p240827103800.jpg"
    },
    {
      title: "Thailand Phuket & Krabi",
      price: "₹ 29,999",
      oldPrice: "₹ 34,000",
      duration: "4 Nights 5 Days ~ 2N Phuket / 2N Krabi",
      image: "https://www.wegomap.com/uploads/packages/Uzi8MYAjx3MwWWmNS2soW9x9IzESbmt0I4wN42Xx240822120635.jpg"
    },
    {
      title: "Malaysia with Penang",
      price: "₹ 32,999",
      oldPrice: "₹ 36,000",
      duration: "5 Nights 6 Days ~ 3N Kuala Lampur / 2N Penang",
      image: "https://www.wegomap.com/uploads/packages/0ati8uaniug6kxou673hhovknfvootd18qawatkt240821040447.jpg"
    },
    {
      title: "Bali Premium Package",
      price: "₹ 33,999",
      oldPrice: "₹ 36,300",
      duration: "5 Nights 6 Days ~ 5N Bali",
      image: "https://www.wegomap.com/uploads/packages/wwm9ddc5cqusj4gix2j2fbfzbmcl2t6m0po7pone240827103732.jpg"
    },
    {
      title: "Singapore Tour Package",
      price: "₹ 40,999",
      oldPrice: "₹ 45,000",
      duration: "3 Nights 4 Days ~ 3N Singapore",
      image: "https://www.wegomap.com/uploads/packages/UyAaRcBgpPlkxEK3RrWnka7GXHewlsUUSR01LFce240827051128.jpg"
    },
    {
      title: "Bhutan Package",
      price: "₹ 44,999",
      oldPrice: "₹ 48,000",
      duration: "6 Nights 7 Days ~ 2N PHUENTSHOLING / 1N THIMPHU/ 1N PUNAKHA / 2N PARO",
      image: "https://www.wegomap.com/uploads/packages/lsmdanwguapamdapyzttjtog1a5wl6tawqdpxz0o240904035156.png"
    },
    {
      title: "Dubai Package (Ultimate)",
      price: "₹ 50,400",
      oldPrice: "₹ 65,100",
      duration: "6 Nights 7 Days ~ 6N Dubai",
      image: "https://www.wegomap.com/uploads/packages/kbtqjlCKQNNuhMP0GPgbaNNl1ewhvNSCNEVgh0Vm260130012049.jpg"
    },
    {
      title: "Thailand Tour Package",
      price: "₹ 52,999",
      oldPrice: "₹ 56,000",
      duration: "6 Nights 7 Days ~ 2N Phuket / 2N Pattaya / 2N Bangkok",
      image: "https://www.wegomap.com/uploads/packages/ItyyJiyjRVdzXZVfc8LFGxEVs3MYHasDqQdY48Ff240822120710.jpg"
    },
    {
      title: "Sri Lanka Package",
      price: "₹ 53,999",
      oldPrice: "₹ 57,200",
      duration: "4 Nights 5 Days ~ 1N Kandy / 1N Nuwara Eliya / 1N Bentota / Kosgoda",
      image: "https://www.wegomap.com/uploads/packages/7mCmQivsI7l0TYGuG2vOOJ6dBjrrM5TevOHyvtq1240820125113.jpg"
    },
  ];

  const keralaPackages = [
    {
      title: "2N3D Alleppey & Wonderla",
      price: "₹ 9,799",
      oldPrice: "₹ 11,200",
      duration: "2 Nights 3 Days ~ 1N Aleppey Backwaters/ 1N Kochi",
      image: "https://www.wegomap.com/uploads/packages/abkbjEzdDJ9VLYaQ5MT3iV5OvTvb2psVAaJYe1hy240907044413.jpg"
    },
    {
      title: "4N5D Kerala Romantic Honeymoon",
      price: "₹ 17,999",
      oldPrice: "₹ 20,000",
      duration: "4 Nights 5 Days ~ 2N Munnar Hillstations/ 1N Thekkady Wildlife / 1N Houseboat",
      image: "https://www.wegomap.com/uploads/packages/nmnnyxi7pbaiwzcutnk9fyulcamz2filjxbt2j2k220406045909.jpg"
    },
    {
      title: "3N4D Kerala Budget Honeymoon",
      price: "₹ 11,999",
      oldPrice: "₹ 13,500",
      duration: "3 Nights 4 Days ~ 2N Munnar Hillstations /1N Houseboat",
      image: "https://www.wegomap.com/uploads/packages/fwmmj9yj7optu1hsaosbrtbjdarcwgvoe9wp5acc220406045952.jpg"
    },
    {
      title: "Premium Kerala Hills & Backwater Resort",
      price: "₹ 15,999",
      oldPrice: "₹ 17,800",
      duration: "4 Nights 5 Days ~ 2N Munnar Hillstations/1N Thekkady Wildlife/1N Aleppey Backwaters",
      image: "https://www.wegomap.com/uploads/packages/OTjBGqS0xBCOI56684Km9l8U9dDL3iREc709JrNC221107123611.jpg"
    },
    {
      title: "2N3D Kerala Budget Package",
      price: "₹ 5,999",
      oldPrice: "₹ 7,500",
      duration: "2 Nights 3 Days ~ 2N Munnar Hillstations",
      image: "https://www.wegomap.com/uploads/packages/kzjuwvmnhygemcaefnxrya48l51pto5rxpxo7gvs220406050027.jpg"
    },
    {
      title: "6N7D Kerala Complete plan",
      price: "₹ 21,899",
      oldPrice: "₹ 24,500",
      duration: "6 Nights 7 Days ~ 2N Munnar Hill stations/ 1N Thekkady Wildlife / 2N Kovalam Beach/ 1N Houseboat",
      image: "https://www.wegomap.com/uploads/packages/zja1pt0i2lbcucy9tznq16bfyowcqhnwcidjs5mo220406045725.jpg"
    },
    {
      title: "5N6D Kerala Plan with Waterfalls",
      price: "₹ 18,999",
      oldPrice: "₹ 21,500",
      duration: "5 Nights 6 Days ~ 1N Athirapilly Waterfalls / 2N Munnar Hillstations/ 1N Thekkady Wildlife / 1N Boat",
      image: "https://www.wegomap.com/uploads/packages/batvwtb8nluzpz5vmpkoyax96caq7y0ot5tbkpr5220406045801.jpg"
    },
    {
      title: "6N7D Kerala Standard Holiday",
      price: "₹ 22,999",
      oldPrice: "₹ 25,700",
      duration: "6 Nights 7 Days ~ 2N Munnar Hillstations/ 1N Thekkady Wildlife / 2NKovalam Beach/ 1N Houseboat",
      image: "https://www.wegomap.com/uploads/packages/tjuvehl1nqbrldkbvtm7eub4jcyaaad5ikxxibdt220409120211.jpg"
    },
    {
      title: "2N3D Backwater & Waterfalls",
      price: "₹ 7,299",
      oldPrice: "₹ 7,800",
      duration: "2 Nights 3 Days ~ 1N Athirapilly Waterfalls/ 1N Aleppey Backwaters",
      image: "https://www.wegomap.com/uploads/packages/3yngixh95sghzyzg1ohbiacvmi1uygketv25zb4e220424115201.jpg"
    },
    {
      title: "2N3D Luxury Hill station Plan",
      price: "₹ 9,999",
      oldPrice: "₹ 11,700",
      duration: "2 Nights 3 Days ~ 2N Munnar Hillstations",
      image: "https://www.wegomap.com/uploads/packages/aVs4UMTkFpPAH1pP4ozfKuEfYnuBD5fV7ZcWlcGR220424075049.jpg"
    }
  ];

  const kochiExperiences = [
    { title: "Kerala Food", image: "https://www.wegomap.com/uploads/destinations/54c1yzegz8yndi3wr4aedkrdcvrapspxzn02zeyd220406045151.jpg" },
    { title: "Festivals", image: "https://www.wegomap.com/uploads/destinations/zr4z4uhg1xdf34rgd8ccwdysgry0fy0tlweh2dch220406045218.jpg" },
    { title: "Theyyam", image: "https://www.wegomap.com/uploads/destinations/iq1hpx7ojqzean478ysmsj4dwhsalpaqm9hnfaxf220406045238.jpg" },
    { title: "Kathakali", image: "https://www.wegomap.com/uploads/destinations/plcpazhr52apoikmimeh6phatkg5ostf3j62wb8w220406045259.jpg" },
  ];

  const testimonials = [
    {
      name: "Imran Shariff",
      role: "Verified Traveler",
      avatar: "https://www.wegomap.com/uploads/testimonials/lECdwnqz0sFj4Pcwi4IenLB5m6kVr82TaOfU35Ib260228022926.png",
      quote: "Exploring munnar without wegomap was impossible... It was great experience to share everything was awesome service provided by them and specially tempo traveler driver binu bhai was very honest and humble in whole trip and made it true ... I recommend to everyone.."
    },
    {
      name: "Sumit Kumar Sinha",
      role: "Family Trip",
      avatar: "https://www.wegomap.com/uploads/testimonials/e9LVL1MpqxfB7dYYZjbfgT9c6PctXAF277MdMGPt260228022430.png",
      quote: "Wegomaps provided an outstanding Kerala experience, surpassing expectations. From well-curated itineraries showcasing diverse landscapes to impeccable accommodations, every detail was meticulously planned. Cultural experiences in Munnar and Kumarkom houseboat was great. Knowledgeable and friendly driver Mr Prajeesh added delight to the journey, and seamless logistics ensured a worry-free trip. He exactly knew just when and where to stop and where not to. For an extraordinary and hassle-free Kerala adventure, I highly recommend Wegomap."
    },
    {
      name: "Komanpally Ravindra",
      role: "Verified Traveler",
      avatar: "https://www.wegomap.com/uploads/testimonials/qX82Z9vyeZBLSPm0L3VseevrrkLdPtcQSaNC8sHj260228021643.png",
      quote: "That was an awesome trip to Kerala with WEGOMAP fathima really helped us a lot in every aspect….and the driver Ajmal was too friendly and made our journey with comfort and safety….one thing I can assure about wegomap is safety is there first priority….thank you wegomap….The journey not over yet …..The journey just started with you"
    },
    {
      name: "Suresh K",
      role: "Group Trip",
      avatar: "https://www.wegomap.com/uploads/testimonials/5KYj0KGZVjbwoQFwps9kcGMQLjyZkW0s6IMbzUrN260228021237.png",
      quote: "wegompa tour and events was very well organized our trip, very good hotel,boathouse and trip route map in kerala we enjoy very well thanks to team and special thanks to fathim, she supporting well and continuously follow up with our group in trip.."
    },
    {
      name: "V T Vishwanath",
      role: "Honeymoon Trip",
      avatar: "https://www.wegomap.com/uploads/testimonials/GMzo4CeZOh1IOz5n8gGAor2nPKlQCqURaIoTsyyE260226040945.png",
      quote: "Really good travel service by WEGOMAP. Athira from WEGOMAP helped us to plan Munnar and Thekkady Kerala honeymoon trip. It was a really good experience. Nice driver come tour guide. Good accommodation and car has been provided for the trip. Thanks 😊. Go for it. Few of the photos has been added here."
    },
    {
      name: "Pooja Singh",
      role: "Verified Traveler",
      avatar: "https://www.wegomap.com/uploads/testimonials/ZRyfMmqrgi6Hd4QW1Pv2Op6vPqTeAC5qhuJQOUuw260226035449.png",
      quote: "Had a fabulous experience, the itinerary was well planned. The hotels were located at best places. Fathima was amazing the way she explained the package. We have not faced any issues in any way in our entire trip. Thanks Wegomap for planning this amazing experience and i have already suggested a few of my friends to plan their trips with you. Much appreciated👍👌"
    },
    {
      name: "Ravina Vaishnav",
      role: "Verified Traveler",
      avatar: "https://www.wegomap.com/uploads/testimonials/58IAT9y5Gjf79jB6uTSuvSgQI7aaPZ4XYnWaoasI260226035056.png",
      quote: "Whole trip was good and our driver jithin methew was too good and friendly and our advisers miss fatima will very coperative. Best service ever.. we will enjoy too much very memorable trip for us ..."
    },
    {
      name: "Prakash Kamath",
      role: "Group Trip",
      avatar: "https://www.wegomap.com/uploads/testimonials/jjL4Qm93bdEIbxXgHnPCGtrz6Gx9LS6N8QU3hvEj260226034728.png",
      quote: "Tour was very fantastic and wego tour advisor was easily approachable whenever required. Daily feedback calls were given by Mr Jithin from wegomap and the car vehicle arranged was also superb and Cab driver Mr Jahfar (Bro) was very innocent and humble person with nature and had safe ride."
    },
    {
      name: "Vishesh Maity",
      role: "Family Trip",
      avatar: "https://www.wegomap.com/uploads/testimonials/5gx8E8RQimgCGiohTY51b6YPb7vd4CWNYgn13X7A260226033830.jpg",
      quote: "We booked a 6N/7D package with Wegomap Tour, and it was an absolutely amazing experience! Everything — from the stay, food, and transportation to the overall planning — was perfectly organized. It truly turned out to be a memorable trip for our family. And our travel advisor (alen) was very friendly."
    },
    {
      name: "Suri Tiruvayipati",
      role: "Budget Traveler",
      avatar: "https://www.wegomap.com/uploads/testimonials/AYOZ4IhehTkYEFUq8Bx46q3ATXhnyjikDOiKzbyb260226033444.jpg",
      quote: "Hi, This is Surya, from Visakhapatnam, AP,.... in Pongal Holidays we went kerala Trip Through Wegomap Tours and Traves... Our Travel Agent Fathima Madam Given best plan with budget Friendly Package for 4 days and 3 night Package.... She Fallow us every day and given perfect planning for Visit of Sight seens and Alloted best hotels... Especially The House boat Facilities is Good.... Thanks to Wegomap and Fathima Garu.."
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <Hero />

      {/* Secondary Sticky Navigation Strip */}
      <div className="secondaryStickyNav">
        <div className="homeContainer">
          <div className="navInner">
            <div className="brandTag">
              <span>Your way</span>
              <strong>Your world</strong>
            </div>

            <nav className="quickNav">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    href={service.href}
                    className={`navItem ${service.active ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{service.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Kerala Tour Operator Section */}
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-between">
            <div className="titleArea">
              <span className="sectionSubtitle">Explore Our Best</span>
              <h1 className="sliderTitle mb-2">
                Kerala Tour Operator
              </h1>
              <p className="sectionHeaderDescription px-0 mb-8 max-w-2xl">
                Experience the beauty of God&apos;s Own Country with Kerala&apos;s best tour operator. As a trusted Kerala travel agency, we specialize in crafting unforgettable journeys.
              </p>
            </div>
            <Link href="/kerala-tour-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.15}
            navigation={{
              prevEl: '.kerala-prev',
              nextEl: '.kerala-next',
            }}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{
              el: '.kerala-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              // Forced update to ensure dynamic elements are picked up
              setTimeout(() => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = '.kerala-prev';
                  swiper.params.navigation.nextEl = '.kerala-next';
                }
                if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                  swiper.params.pagination.el = '.kerala-pagination';
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.update();
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {keralaPackages.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="packageCardKerala group">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="overlay"></div>
                  <div className="cardContent">
                    <div className="topSection">
                      <h4 className="packageTitle">{item.title.replace(/ Package$/i, '')}</h4>
                      <p className="packageSubtitle">Package</p>
                    </div>
                    <div className="bottomSection">
                      <span className="oldPrice">{item.oldPrice}</span>
                      <span className="currentPrice">{item.price}<small> / Person</small></span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="kerala-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn kerala-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn kerala-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/kerala-tour-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* First Minute Offers */}


      {/* Domestic Packages Slider */}
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-between mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">Incredible India</span>
              <h2 className="sliderTitle">Domestic Packages</h2>
            </div>
            <Link href="/domestic-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.15}
            navigation={{
              prevEl: '.domestic-prev',
              nextEl: '.domestic-next',
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              el: '.domestic-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = '.domestic-prev';
                  swiper.params.navigation.nextEl = '.domestic-next';
                }
                if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                  swiper.params.pagination.el = '.domestic-pagination';
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.update();
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {domesticPackages.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="packageCardSmall group">
                  <div className="imageWrapper">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="priceTag">
                      <span className="oldPrice">{item.oldPrice}</span>
                      <span className="currentPrice">{item.price}<small>/ PERSON</small></span>
                    </div>
                    <WishlistButton />
                  </div>
                  <div className="cardContent">
                    <h4 className="packageTitle">{item.title}</h4>
                    <div className="actionIcon"><ChevronRight size={20} /></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="domestic-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn domestic-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn domestic-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/domestic-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* International Packages Slider */}
      <section className="sectionPadding bg-slate-50">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-between mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">Explore The World</span>
              <h2 className="sliderTitle">International Packages</h2>
            </div>
            <Link href="/international-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.15}
            navigation={{
              prevEl: '.intl-prev',
              nextEl: '.intl-next',
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              el: '.intl-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = '.intl-prev';
                  swiper.params.navigation.nextEl = '.intl-next';
                }
                if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                  swiper.params.pagination.el = '.intl-pagination';
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.update();
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {internationalPackages.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="packageCardSmall group">
                  <div className="imageWrapper">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="priceTag">
                      <span className="oldPrice">{item.oldPrice}</span>
                      <span className="currentPrice">{item.price}<small>/ PERSON</small></span>
                    </div>
                    <WishlistButton />
                  </div>
                  <div className="cardContent">
                    <h4 className="packageTitle">{item.title}</h4>
                    <div className="actionIcon"><ChevronRight size={20} /></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="intl-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn intl-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn intl-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/international-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Kochi Based Travel Agency Section */}
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-between">
            <div className="titleArea">
              <span className="sectionSubtitle">Local Expertise</span>
              <h2 className="sliderTitle mb-2">
                Kochi Based Travel Agency
              </h2>
              <p className="sectionHeaderDescription px-0 mb-8 max-w-4xl">
                As a premier travel agency in Kerala, we craft personalized tours that immerse you in the cultural and natural wonders of the region. Discover Kerala&apos;s vibrant festivals, rich cuisine, and stunning destinations with your expert travel agency in Kochi - Wegomap.
              </p>
            </div>
            <Link href="/tours" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.15}
            navigation={{
              prevEl: '.kochi-prev',
              nextEl: '.kochi-next',
            }}
            loop={false}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{
              el: '.kochi-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = '.kochi-prev';
                  swiper.params.navigation.nextEl = '.kochi-next';
                }
                if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                  swiper.params.pagination.el = '.kochi-pagination';
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.update();
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {kochiExperiences.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="packageCardLocation group">
                  <div className="imageWrapper">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="cardContent">
                    <h4 className="locationTitle">{item.title}</h4>
                    <div className="actionIcon">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="kochi-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn kochi-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn kochi-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/tours" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>



      {/* Refined Corporate Events Section */}
      <section className="corporateModernSection sectionPadding">
        <div className="homeContainer">
          <div className="sectionHeader">
            <span className="sectionSubtitle">MICE & Events</span>
            <h2 className="sliderTitle">Redefining Corporate Experiences</h2>
            <p className="leadDescription">
              Wegomap delivers world-class event management. We curate bespoke experiences that define your business legacy in Kochi and beyond.
            </p>
          </div>

          <div className="corporateFeatureGrid">
            <div className="featureCard">
              <div className="imageBox">
                <Image
                  src="https://www.wegomap.com/assests/site/assets/images/event.jpg"
                  alt="Corporate Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="cardInfo">
                <div className="icon"><Building2 size={24} /></div>
                <h4>MICE & Conferences</h4>
                <p>Sophisticated infrastructure & logistics managed by experts.</p>
              </div>
            </div>

            <div className="featureCard featured">
              <div className="imageBox">
                <Image
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                  alt="Grand Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="cardInfo">
                <div className="icon"><Star size={24} /></div>
                <h4>Gala Celebrations</h4>
                <p>Elegantly crafted award nights and grand corporate galas.</p>
              </div>
            </div>

            <div className="featureCard">
              <div className="imageBox">
                <Image
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200"
                  alt="Business Retreat"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="cardInfo">
                <div className="icon"><Users size={24} /></div>
                <h4>Business Retreats</h4>
                <p>Exclusive team building experiences in serene Kerala backwaters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Luxe Modern Strip Testimonial */}
      <section className="testimonialLuxeStrip bg-slate-50 sectionPadding">
        <div className="homeContainer">
          <div className="sectionHeader">
            <span className="sectionSubtitle">Review</span>
            <h2 className="sliderTitle">
              What our clients say
            </h2>
          </div>
          <div className="stripCard">
            <div className="travelerSide">
              <div className="avatar">
                <Image
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#8CC647" color="#8CC647" />
                ))}
              </div>
              <div className="clientDetails">
                <h4>{testimonials[activeTestimonial].name}</h4>
                <p>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>

            <div className="divider"></div>

            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveTestimonial(swiper.realIndex)}
              className="testimonialSwiper"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="reviewText">
                    {t.quote}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="navigation">
              <div
                className="navBtn prev"
                onClick={() => {
                  const swiper = (document.querySelector('.testimonialSwiper') as any)?.swiper;
                  if (swiper) swiper.slidePrev();
                }}
              >
                <ArrowLeft size={16} />
              </div>
              <div
                className="navBtn next"
                onClick={() => {
                  const swiper = (document.querySelector('.testimonialSwiper') as any)?.swiper;
                  if (swiper) swiper.slideNext();
                }}
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Requested Kerala Specialist Thin Section */}
      <section className="services-list readmore-section set-padding-md pb-5 bg-white">
        <div className="homeContainer">
          <div className="row">
            <div className="col-xl-12 mx-auto">
              <div className="sectionHeader">
                <span className="sectionSubtitle">Kerala Specialist</span>
                <h2 className="sliderTitle mb-8">Best Tour Operator in Kerala</h2>
              </div>
              <div className="readMoreWrapper text-center">
                <div className={`readmore-content ${showMore ? 'is-expanded' : ''}`}>
                  <p className="mb-4">
                    Experience the magic of God&apos;s Own Country with Wegomap, your reliable Kerala travel partner. Based in Kochi, we are a premier Kerala tour operator dedicated to crafting unforgettable travel experiences. Whether you dream of serene backwaters, lush tea gardens, or pristine beaches, we ensure your journey is as beautiful as the destination.
                  </p>
                  <div className="extraText">
                    <p>
                      At Wegomap, we pride ourselves on being the best travel agency for personalized tours that cater to your interests. Our packages include everything from romantic honeymoons and adventurous treks to relaxing family vacations and rejuvenating wellness retreats. As a Kochi-based tour operator, we have in-depth local knowledge to provide you with the most authentic experiences. We offer a range of services to make your trip seamless, including transportation, accommodation, and guided tours. Our team of experts is here to ensure every detail is taken care of, so you can focus on making memories. Whether you&apos;re exploring Kerala for the first time or revisiting its wonders, we strive to make your journey seamless and unforgettable. With Wegomap, you&apos;re not just booking a trip; you&apos;re investing in a lifetime of memories. Contact us today and let the best Kerala travel agency plan your perfect getaway. Explore Kerala with Wegomap and see why we&apos;re recognized as a leading Kerala tour operator!
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <span
                    className="read-more-btn"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Read Less' : 'Read More'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
