export interface ItineraryDay {
    day: string;
    activity: string;
    image?: string | null;
}

export interface TourPackageDetail {
    id: string;
    slug: string;
    title: string;
    location: string;
    duration: string;
    price: string;
    oldPrice?: string;
    image: string;
    images?: string[];
    description: string;
    highlights: string[];
    itinerary: ItineraryDay[];
    inclusions: string[];
    exclusions: string[];
    averageRating?: number;
    reviewCount?: number;
}

export const packagesData: Record<string, TourPackageDetail> = {
    "3-days-2-night-kerala-package": {
        "id": "1",
        "slug": "3-days-2-night-kerala-package",
        "title": "2N3D Kerala Budget Package",
        "location": "2N Munnar Hillstations",
        "duration": "",
        "price": "\u20b9 5999",
        "oldPrice": "\u20b9 7500",
        "image": "/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg",
        "description": "3 DAYS PACKAGE",
        "highlights": [
                "Explore the breathtaking Valara and Cheeyapara waterfalls as you unwind in Kerala nature&rsquo;s pristine beauty.",
                "Walk through green tea gardens and enjoy the cool, fresh air high up at 6000 feet.",
                "Experience thrilling activities like speed boating at Mattupetty Dam and Shikkara boating at the serene Kundala Lake.",
                "Discover the wonders of Eravikulam National Park, the enchanting Eco Point, and the scenic Top Station for unforgettable views."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Cochin - Munnar",
                        "activity": "Arrive at the gate way of Kerala, Cochin where our cab and driver will there to meet and greet you and proceed to Munnar This incredibly beautiful hill station is positioned at a height of 6000ft. Valara waterfalls, Cheeyapara waterfalls, Tea gardens. Check into the resort and overnight stay in Munnar.",
                        "image": "/uploads/packages/day-images/gve1bh6zvswws6zmjxzrilcntr4o0mfszjjnhlc7241025025037.jpg"
                },
                {
                        "day": "Day 2: Munnar Sightseeing",
                        "activity": "This days sightseeing starts after the breakfast. Sightseeing includes:  Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating), Eco point, Top station or Eravikulam (Rajmala) National Park (based on the availability of time), Evening is optional to visit Blossom Park & tea museum. Return to the hotel for overnight stay",
                        "image": "/uploads/packages/day-images/ml4zssdc71pispf9jmznzcorjoykxkfkrpzndrnq240809010824.jpg"
                },
                {
                        "day": "Day 3: Departure",
                        "activity": "After breakfast you can check out and proceed for departure. On the way you can enjoy Cochin sightseeing which includes: Fort Cochin Mattanchetry, Jew town, local shopping based upon your flight timings. Our Cab will drop you at the Airport. Fly back to your hometown with good memories of Kerala trip.",
                        "image": null
                }
        ]
},
    "4-days-3-night-kerala-package": {
        "id": "2",
        "slug": "4-days-3-night-kerala-package",
        "title": "3N4D Kerala Budget Honeymoon",
        "location": "2N Munnar Hillstations /1N Houseboat",
        "duration": "",
        "price": "\u20b9 11999",
        "oldPrice": "\u20b9 13500",
        "image": "/uploads/packages/rsz2kjlf4gfysupoyaqzjgsug665nqxnjcgapu71220406030620.jpg",
        "description": "4 DAYS PACKAGE",
        "highlights": [
                "3 Star Hotel",
                "Breakfast",
                "All sightseeing",
                "Private Houseboat"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "CP plans don\u2019t have Lunch and Dinner."
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN ARRIVALE TO MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will there to meet and greet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens Check into the resort and overnight stay",
                        "image": "/uploads/packages/day-images/nyt662btr9qai93gnvd44qtrlk1neihil1ho7cmq241025031101.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/fkdb8e4z7gqsk8xtnmvl2xhqqe4ao2s1cmewa1jg241025031112.jpg"
                },
                {
                        "day": "Day 3: MUNNAR TO ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/uqvawyf2zstuewnlunkadegog1g8ttsayofyxbc8241025031138.jpg"
                },
                {
                        "day": "Day 4: ALLEPPEY TO COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattanchetry, Jew town and local shopping based upon your return timings Our Cab will drop you Return back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "5-days-4-night-kerala-package": {
        "id": "3",
        "slug": "5-days-4-night-kerala-package",
        "title": "4N5D Kerala Romantic Honeymoon",
        "location": "2N Munnar Hillstations/ 1N Thekkady Wildlife  / 1N Houseboat",
        "duration": "",
        "price": "\u20b9 17999",
        "oldPrice": "\u20b9 20000",
        "image": "/uploads/packages/cyf2pdk4hgscfe1ycccv9vomyxa2ouxijfumcvet220406031111.jpg",
        "description": "5 DAYS PACKAGE",
        "highlights": [
                "3 Star Hotels",
                "All sightseeing",
                "Breakfast",
                "Private Houseboat"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Flight Tickets"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN TO MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay",
                        "image": "/uploads/packages/day-images/b7mnu2maxzrkpsjzzezavnfcjqinqeabgzsrj6yu241025034617.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/rmni4eoohxro0zssc9a6yrieavimx0ig5xk8jiv4241025034815.jpg"
                },
                {
                        "day": "Day 3: MUNNAR TO THEKKADY",
                        "activity": "morning after breakfast drive from Munnar to Thekkady Afternoon boating in Periyar Lake. During the boat ride spot the wildlife animals Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay",
                        "image": "/uploads/packages/day-images/qj5vyqthkq2obbxjh6dipfzocmlivrca4fiv2rys241025034858.jpg"
                },
                {
                        "day": "Day 4: THEKKADY TO ALLEPPEY",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam backwater cruise in traditional Kerala Houseboat Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/lqsevfqfqtpwr4oq64ong0tkozl9xaz9gyuftcbb241025034950.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY TO COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings. Our Cab will drop you. Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "goa-package-3-days-2-night": {
        "id": "4",
        "slug": "goa-package-3-days-2-night",
        "title": "Goa Tour Package",
        "location": "1N South Goa / 1N North Goa",
        "duration": "2 Nights 3 Days",
        "price": "\u20b9 8499",
        "oldPrice": "\u20b9 10500",
        "image": "/uploads/packages/zzgxrdjxnq0idmh5x2eypanfj6cpoqfz5dz1jntu220406041956.jpg",
        "description": "2N3D Goa Package",
        "highlights": [
                "3 star Hotel",
                "All Sightseeing",
                "Breakfast"
        ],
        "inclusions": [
                "Buffet Breakfast",
                "Complimentary two bottles of packaged drinking water placed once during the day",
                "Stay in a well-appointed Air-Conditioned accommodation for 3 nights and 4 days",
                "Welcome drink on arrival"
        ],
        "exclusions": [
                "All beverages at hotels, restaurants must be pay direct by client on consumption",
                "Lunch and Dinner for except mentioned",
                "Tip to local guide, ground porter and hotel porter",
                "Other than not mentioned in the above inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Goa Arrival",
                        "activity": "Our Cab driver pick you Check in to the hotel Relax at Beach",
                        "image": "/uploads/packages/day-images/lkif8oj3npgypirolcyenvcvw5bypbwq4u1zelbb241028035744.jpg"
                },
                {
                        "day": "Day 2: Goa Sightseeing",
                        "activity": "After breakfast checkout from hotel Local Goa Sightseeing overnight stay at hotel",
                        "image": "/uploads/packages/day-images/zepppmnaoqwoi30ni3zxw24y7pfoqbec4jkw49wd241028035801.jpg"
                },
                {
                        "day": "Day 3: Goa Departure",
                        "activity": "After brekfast checkout from hotel Proceed for departure Sightseeing based on your return timing Return to hometown with good Goa memories",
                        "image": null
                }
        ]
},
    "malaysia-3-nights-4-days": {
        "id": "5",
        "slug": "malaysia-3-nights-4-days",
        "title": "Maldives Tour Package",
        "location": "3Night Maldives",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 26999",
        "oldPrice": "\u20b9 29000",
        "image": "/uploads/packages/4thguktpn5o2ucp34ebcjxknujlhwn4h13ncv7sz240905033236.jpg",
        "description": "",
        "highlights": [
                "breakfast",
                "transfers",
                "stay"
        ],
        "inclusions": [
                "3 Nights accommodation in Maldives",
                "Airport Transfers on SIC basis",
                "Candle Light Dinner",
                "Dolphin Cruise with Picnic Lunch",
                "Sandbank and Snorkeling",
                "Underwater Photography"
        ],
        "exclusions": [
                "All personal expenses",
                "The itinerary shared is tentative and subject to change at the time of booking"
        ],
        "itinerary": [
                {
                        "day": "Day 1: ARRIVE IN  MALDIVES",
                        "activity": "Arrival at Airport meet and greet by our representative, transfer to Hotel by Car. Enjoy the beach and explore the local Island. Feel the Blues. overnight stay",
                        "image": "/uploads/packages/day-images/gdrhsbhk27z92f50fltvfu7r56ocbzvpfb3bor3m241029112930.jpg"
                },
                {
                        "day": "Day 2: Full day Adventure",
                        "activity": "After Breakfast get ready for your Maldives Adventure Sea Trip boat ride to Sandbank, Snorkeling, Dolphin Cruise, underwater Photography with Picnic Lunch on the boat.",
                        "image": "/uploads/packages/day-images/3zefvnc3rwrepky4s0zksdnu9ozf7zd3li3hb2am241029112947.jpg"
                },
                {
                        "day": "Day 3: Day at Leisure",
                        "activity": "After Breakfast, Spend leisure time on the beach. Evening romantic Dinner on roof top with sparkling wine (Non-Alcoholic) at the hotel.",
                        "image": "/uploads/packages/day-images/ko7ynpl07katsexkf5irr2dffj7patv6ychzeboz241029113020.jpg"
                },
                {
                        "day": "Day 4: DEPARTURE",
                        "activity": "After breakfast, check out of the hotel Proceed for departure Return to homwtown with good Memories",
                        "image": null
                }
        ]
},
    "5n6d-kerala-budget-package": {
        "id": "8",
        "slug": "5n6d-kerala-budget-package",
        "title": "5N6D Kerala Plan with Waterfalls",
        "location": "1N Athirapilly Waterfalls / 2N Munnar Hillstations/ 1N Thekkady Wildlife  / 1N Boat",
        "duration": "",
        "price": "\u20b9 18999",
        "oldPrice": "\u20b9 21500",
        "image": "/uploads/packages/gbsrcdvxwaqpatszs6dsbenonmiotyxsrvvuq0mn220406031359.jpg",
        "description": "",
        "highlights": [
                "3 Star hotel",
                "Breakfast",
                "Sightseeing",
                "Houseboat"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c ATHIRAPILLY",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet and greet you. Vazhachal Waterfalls \u2013 7 Km From Athirapally Waterfalls Thumboormuzhi Dam \u2013 14 Km From Athirapally Waterfalls Largest waterfall in Kerala Overnight stay",
                        "image": "/uploads/packages/day-images/yweejmlcihik0frkexkxnehh7qly9dfilakxzudl241025035104.jpg"
                },
                {
                        "day": "Day 2: ATHIRAPILLY - MUNNAR",
                        "activity": "After breakfast proceed to Munnar start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/xbtilsy16ohlfxnkd7ab8bv9rsxiellfzi7xojci241025035115.jpg"
                },
                {
                        "day": "Day 3: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/6vfqqcev7gwfxhtlf5swx0verhpiwny85mctieln241025035128.jpg"
                },
                {
                        "day": "Day 4: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c THEKKADY",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel",
                        "image": "/uploads/packages/day-images/fgpdfqdodbjtdfu2ijncvyhlqvwfqvx7b8symmab241025035146.jpg"
                },
                {
                        "day": "Day 5: THEKKADY \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/ijuarydsiittumoi5oigapqi1tadu9cvbjuj3do8241025035210.jpg"
                },
                {
                        "day": "Day 6: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing \u2022\tFort Cochin, Mattancherry, Jew town and local shopping based upon your flight timings Our Cab will drop you Back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "6n7d-kerala-budget-tour-package": {
        "id": "9",
        "slug": "6n7d-kerala-budget-tour-package",
        "title": "6N7D Kerala Complete plan",
        "location": "2N Munnar Hill stations/ 1N Thekkady Wildlife / 2N Kovalam Beach/ 1N Houseboat",
        "duration": "",
        "price": "\u20b9 21899",
        "oldPrice": "\u20b9 24500",
        "image": "/uploads/packages/tctld65d4pjbk5tipatqzm302pzzgx9l6vbxqf5v220406034142.jpg",
        "description": "",
        "highlights": [
                "Start your Kerala tour with a peaceful journey to Munnar, visiting breathtaking waterfalls, tea gardens, and enjoying boating activities at Mattupetty Dam and Kundala Lake.",
                "Explore Kerala&rsquo;s natural wonders with an afternoon visit to Top Station or Eravikulam National Park, and a wildlife boat ride on Periyar Lake to spot elephants, monkeys, and more.",
                "Experience the unique beauty of Kovalam&rsquo;s beach and Poovar, where the lake, river, sea, and beach converge in a stunning natural setting.",
                "Conclude your Kerala tour with a stay at a serene backwater resort, enjoying nearby activities like fishing, small boat cruises, and sightseeing in Cochin, including Fort Cochin and Mattancherry."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay",
                        "image": "/uploads/packages/day-images/wxxn0rb0ml7vgn3exvb8ykukeacmk39tbaoawwpp241025035542.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/40zuzluvsav9iezutjzvn6njxaqldppxdld7e7fp241025035600.jpg"
                },
                {
                        "day": "Day 3: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c THEKKADY",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel in Thekkady.",
                        "image": "/uploads/packages/day-images/y2clukerbsl725ryhmhfcyvn6qtveguaxeifc6q7241025035616.jpg"
                },
                {
                        "day": "Day 4: THEKKADY \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c KOVALAM",
                        "activity": "After breakfast, checkout from the houseboat and proceed to Kovalam. Kovalam is one of the best beaches in India because of its natural location, a rocky promontory jutting into the sea and a beach that is rendered safe for sea bathing. Check-in at the hotel and enjoy the pristine beaches. Overnight stay in the Kovalam hotel.",
                        "image": "/uploads/packages/day-images/yerdon8u9efe5uqmcohqmkddotjri2lzjcduikaj241025035629.jpg"
                },
                {
                        "day": "Day 5: KOVALAM POOVAR VISIT",
                        "activity": "Poovar is one among the natural wonders where the Lake, River, Sea and Beach meet the land. Poovar is unspoilt and unexplored, enveloped by the most serene backwaters and opening out to the sea and a dream golden sand beach. After breakfast, proceed to Poovar and do sightseeing in the village which is embraced by a beautiful beach on one side and the backwaters on the other.",
                        "image": "/uploads/packages/day-images/a5lpryp23bepe0l9sumhsg5pj1ptzmmndewletjs241025035642.jpg"
                },
                {
                        "day": "Day 6: KOVALAM - ALEPPY HOUSEBOAT",
                        "activity": "After breakfast proceeds to Kerala backwaters. Check in to the backwater resort. Activities around your cottage can include, fishing & Small boat cruises can be chosen as optional activities Overnight Stay in the Houseboat",
                        "image": "/uploads/packages/day-images/m4m9hwx2ub4rmu0wgvse6gbwrz6xqrv8aaqhogzs241025035746.jpg"
                },
                {
                        "day": "Day 7: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure On the way, you can enjoy Cochin sightseeing \u2022\tFort Cochin, Mattancherry, Jew town and local shopping Our Cab will drop you \u2022\tFly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "7n8d-kerala-tour-package": {
        "id": "10",
        "slug": "7n8d-kerala-tour-package",
        "title": "7N8D Kerala Premium Holiday Package",
        "location": "1N Athirapilly Waterfalls /2N Munnar Hillstations/1N Thekkady Wildlife /2N Kovalam Beach",
        "duration": "",
        "price": "\u20b9 43999",
        "oldPrice": "\u20b9 46000",
        "image": "/uploads/packages/jnjaha72rrtbo4dafxxt9gftp2nsqoaecncm136c220406035704.jpg",
        "description": "",
        "highlights": [
                "Breakfast",
                "Private Houseboat",
                "Sightseeing",
                "5 Star Hotels"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN TO ATHIRAPALLY",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet and greet you. 1. Vazhachal Waterfalls \u2013 7 Km From Athirapally Waterfalls Thumboormuzhi Dam \u2013 14 Km From Athirapally Waterfalls Overnight stay will be arranged in the resort/hotel.",
                        "image": "/uploads/packages/day-images/c5z5vzb8zgk5yk3bqrusdbtqpemldffx7tah1pf0241025041641.jpg"
                },
                {
                        "day": "Day 2: ATHIRAPALLY - MUNNAR",
                        "activity": "After breakfast proceed to Munnar start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/xfpxsefyuzaukrwhv7du1a3ezu9pl3ujmn25dhwi241025042118.jpg"
                },
                {
                        "day": "Day 3: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/hk2ze7muztw0acontbdkbiiqt8sgju7xvbzdh3yk241025042130.jpg"
                },
                {
                        "day": "Day 4: Munnar - Thekkady",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel in Thekkady.",
                        "image": "/uploads/packages/day-images/r0xdf8wksmqal7zgknlvn865wlvce6dqsbsn1mrf241025042148.jpg"
                },
                {
                        "day": "Day 5: THEKKADY - KOVALAM",
                        "activity": "Proceed to Kovalam Kovalam is one of the best beaches in India because of its natural location, a rocky promontory jutting into the sea and a beach that is rendered safe for sea bathing. Check-in at the hotel and enjoy the pristine beaches. Overnight stay in the Kovalam hotel.",
                        "image": "/uploads/packages/day-images/v6q7t5bsbfpci67ggh2wu0p63iaswmtb646hzz5b241025042204.jpg"
                },
                {
                        "day": "Day 6: KOVALAM POOVAR VISIT",
                        "activity": "Poovar is one among the natural wonders where the Lake, River, Sea and Beach meet the land. sightseeing in the village which is embraced by a beautiful beach on one side and the backwaters on the other. Explore serene backwaters and opening out to the sea and a dream golden sand beach. Return to Kovalam for overnight stay.",
                        "image": "/uploads/packages/day-images/bez69p9kkxrvjmkobndrd9wimgplbgrpw0yvu3o9241025042223.jpg"
                },
                {
                        "day": "Day 7: KOVALAM - HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat",
                        "image": "/uploads/packages/day-images/sqnstxnt7ko1l8ic1b2cilfrs6ijd7jp4jmm17qi241025042235.jpg"
                },
                {
                        "day": "Day 8: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing which includes: \u2022\tFort Cochin, Mattancherry, Jew town and local shopping based upon your return timings. Our Cab will drop you \u2022\tFly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "3n4d-kerala-honeymoon-package": {
        "id": "11",
        "slug": "3n4d-kerala-honeymoon-package",
        "title": "3N4D Kerala Standard Honeymoon Package",
        "location": "2N Munnar Hill stations / 1N Houseboat",
        "duration": "",
        "price": "\u20b9 13999",
        "oldPrice": "\u20b9 14500",
        "image": "/uploads/packages/sy0vagizrdt3llotbebojqwemftmafovkq0umv8s220406032045.jpg",
        "description": "",
        "highlights": [
                "3 Star hotel",
                "Private houseboat",
                "All sightseeing",
                "Honeymoon Delights"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Gala Dinner on New year & Xmas"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will there to meet and greet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. overnight stay will be arranged in the Munnar resort",
                        "image": "/uploads/packages/day-images/8ziac4gkbei7kuavj4vngczfldfxgfdstuygscyd241025031902.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/n4alfqojy1zovyyggk7goc06oyr7arecjedytlsn241025031914.jpg"
                },
                {
                        "day": "Day 3: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009cALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/d8fnxwgwfwwnhfidoa75c1uy9sgdja0nkcspesyf241025031934.jpg"
                },
                {
                        "day": "Day 4: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing which includes: Fort Cochin, Mattanchetry, Jew town and local shopping based upon your return timings Our Cab will drop you Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "4n5d-kerala-honeymoon-package": {
        "id": "12",
        "slug": "4n5d-kerala-honeymoon-package",
        "title": "4N5D kerala Standard Family Package",
        "location": "2NMunnar Hill stations / 1N Thekkady Wildlife  / 1N Houseboat",
        "duration": "",
        "price": "\u20b9 19799",
        "oldPrice": "\u20b9 21700",
        "image": "/uploads/packages/fSnLayTQ1YB5D7Ck3niehLa1sCzpIy14fKxPs2OS220405083229.jpg",
        "description": "",
        "highlights": [
                "Begin your Kerala tour with a warm welcome at Cochin, followed by a scenic drive to Munnar, passing stunning waterfalls and tea gardens along the way.",
                "Enjoy adventure at Mattupetty Dam with speed boating, or take in the serene beauty of Kundala Lake with pedal and Shikkara boating.",
                "Set out for an afternoon boat ride on Periyar Lake, where you may spot local wildlife, including elephants, monkeys, and spotted deer.",
                "Experience the charm of Kerala&rsquo;s countryside with an enchanting overnight cruise on a traditional houseboat, complete with a delicious Kerala lunch on board."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Any portage at airports and hotels, tips, all items of personal nature."
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/absyqntrkycybjxfka9v9dr0fivp86bdacemdhjj241025035321.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/dyqu611msdh6ljweq4ia4dy3truavuxzkpxl84gm241025035333.jpg"
                },
                {
                        "day": "Day 3: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c THEKKADY",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel in Thekkady.",
                        "image": "/uploads/packages/day-images/bzlicyovfp2jhlvnwpaxewi00zjwy8dekmptumfa241025035349.jpg"
                },
                {
                        "day": "Day 4: THEKKADY \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009cALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/adtivkzbtb7salcdellv6xecxw9pkcabralq1ukv241025035403.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattanchetry, Jew town and local shopping based upon your flight timings. Our Cab will drop you at the Airport. Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "5n6d-kerala-honeymoon-pacakge": {
        "id": "13",
        "slug": "5n6d-kerala-honeymoon-pacakge",
        "title": "5N6D Kerala Beach Plan",
        "location": "1N Cherai / 2N Munnar Hill stations / 1N Thekkady Wildlife",
        "duration": "",
        "price": "\u20b9 14999",
        "oldPrice": "\u20b9 17000",
        "image": "/uploads/packages/qfhrulmsizm7j0pr8zsw7moxvjs7kcerxcppvmll220406033026.jpg",
        "description": "",
        "highlights": [
                "3 star Hotel",
                "Honeymoon Delights",
                "Sightseeing",
                "Breakfast"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Services not mentioned in the inclusions"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Gala Dinner on New year & Xmas"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c CHERAI",
                        "activity": "Arrive at the gateway of Kerala, Cochin where our cab and driver will be there to meet and greet you beautiful stretches of lovely golden beaches of soft sand facing the Arabian Sea. Check in to the Resort Relax and enjoy the day on the beach. Overnight stay at Cherai.",
                        "image": "/uploads/packages/day-images/2nrfamufuzxemn9euh7bo1geoqzositiistse6ff241025032805.jpg"
                },
                {
                        "day": "Day 2: CHERAI - MUNNAR",
                        "activity": "Morning after breakfast proceed to Munnar. Start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/olwofiydpqat2ffizeyjz24azg3xahhryrowvazq241025032819.jpg"
                },
                {
                        "day": "Day 3: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/rfeufqvo5lqq3l3wsmjf5g7ckegqxiazo9pitfw6241025033053.jpg"
                },
                {
                        "day": "Day 4: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c THEKKADY",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel in Thekkady.",
                        "image": "/uploads/packages/day-images/mnn73yq9lbyl1uzfpoy6cv2q8b2bqx2n6cuvxnle241025033114.jpg"
                },
                {
                        "day": "Day 5: THEKKADY \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakom. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/usbtpwytvem3kpwzs06ioshjnvskizrkixnd1uus241025033128.jpg"
                },
                {
                        "day": "Day 6: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings Our Cab will drop you Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "6n7d-kerala-honeymoon-package": {
        "id": "14",
        "slug": "6n7d-kerala-honeymoon-package",
        "title": "6N7D Kerala Standard Holiday",
        "location": "2N Munnar Hillstations/ 1N Thekkady Wildlife / 2NKovalam Beach/ 1N Houseboat",
        "duration": "",
        "price": "\u20b9 22999",
        "oldPrice": "\u20b9 25700",
        "image": "/uploads/packages/7wxbtmbp1micveswedvlymwnxygu1anvyti9xxg8220409120211.jpg",
        "description": "",
        "highlights": [
                "Begin your Kerala tour with a warm welcome in Cochin, followed by a scenic drive to Munnar with stops at Valara and Cheeyapara waterfalls and tea gardens.",
                "Discover Munnar&rsquo;s beauty with a visit to Mattupetty Dam for boating, explore Eco Point, and enjoy panoramic views from Top Station or Eravikulam National Park.",
                "Continue your Kerala tour with an afternoon boat ride on Periyar Lake to spot wildlife, and relax on the sandy shores of Kovalam and the untouched beaches of Poovar.",
                "Complete your Kerala tour with a traditional houseboat cruise through the serene backwaters of Alleppey, experiencing Kerala&rsquo;s countryside and vibrant culture with stops in historic Fort Cochin and Mattancherry for shopping and sightseeing."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast."
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner."
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN TO  MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar",
                        "image": "/uploads/packages/day-images/4r3fwr02p4spubn5yndek5yi8i9seliu2ztxyq9k241025035852.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/md0ddochje1tipbps9sy9mwu3i4zbueziavfj1oz241025035902.jpg"
                },
                {
                        "day": "Day 3: MUNNAR to  THEKKADY",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities.",
                        "image": "/uploads/packages/day-images/4it4kncb6t9ox2hfmpfuffddrdcqyhmoq7mppefo241025035912.jpg"
                },
                {
                        "day": "Day 4: THEKKADY to  KOVALAM",
                        "activity": "After breakfast, checkout from the resort and proceed to Kovalam. Kovalam is one of the best beaches in India because of its natural location rocky promontory jutting into the sea and a beach that is rendered safe for sea bathing. Overnight stay in the Kovalam hotel.",
                        "image": "/uploads/packages/day-images/ergwqteqfsxrfwnroyosznqchzodjigvxru1tbtb241025035926.jpg"
                },
                {
                        "day": "Day 5: KOVALAM POOVAR VISIT",
                        "activity": "Poovar is one among the natural wonders where the Lake, River, Sea and Beach meet the land. Poovar is unspoilt and unexplored, enveloped by the most serene backwaters opening out to the sea and a dream golden sand beach. After breakfast, proceed to Poovar and do sightseeing in the village which is embraced by a beautiful beach",
                        "image": "/uploads/packages/day-images/8rmpp5voo6qdp7uwcfw2e2lwda2trh88rktataca241025035940.jpg"
                },
                {
                        "day": "Day 6: KOVALAM TO ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/ruzxsyofh5mjsg4bu2uu1kux8xgzgrtiufe1ikut241025040045.jpg"
                },
                {
                        "day": "Day 7: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings. Our Cab will drop you Back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "kerala-budget-package": {
        "id": "15",
        "slug": "kerala-budget-package",
        "title": "3N4D  Hills & Backwater",
        "location": "2N Munnar Hillstations/ 1N Aleppey Backwaters",
        "duration": "",
        "price": "\u20b9 8499",
        "oldPrice": "\u20b9 9100",
        "image": "/uploads/packages/y5pbsir3pv4dxogna9t60r6ugqmzr3mipbkobzcn220406011017.jpg",
        "description": "",
        "highlights": [
                "Begin your Kerala holiday trip in the tranquil hills of Munnar, a true haven of peace and harmony.",
                "Enjoy scenic stops at Valara and Cheeyapara waterfalls and explore the lush tea gardens on the way.",
                "Experience thrilling activities at Mattupetty Dam, Kundala Lake, and the scenic Eco Point.",
                "Unwind at a serene backwater resort with options for fishing and small boat cruises in the evening."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast."
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN to  MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will there to meet and greet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/k4nhxsydcywq3d2hakqjxxmsrbuqy2sblxhosnmq241025025555.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/4ecwykut76sb2dniud2m9jhkbd2taq7bylisbde3241025025608.jpg"
                },
                {
                        "day": "Day 3: MUNNAR  to ALLEPPEY",
                        "activity": "After breakfast proceeds to Kerala backwaters. Check in to the backwater resort. fishing & Small boat cruises can be chosen as optional activities Overnight Stay in the resort",
                        "image": "/uploads/packages/day-images/qk6q9cxqr6sheu1vquyvozmfnhhgcb5f7joqqm7g241025025620.jpg"
                },
                {
                        "day": "Day 4: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattanchetry, Jew town and local shopping based upon your return timings. Our Cab will drop you Return to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "4n5d-nepal-tour-package": {
        "id": "16",
        "slug": "4n5d-nepal-tour-package",
        "title": "Nepal Tour Package",
        "location": "1N Kathmandu /2N Pokhra /1N Kathmandu",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 23999",
        "oldPrice": "\u20b9 26000",
        "image": "/uploads/packages/vb1q7giz8knrotcrratjypfxzoti0rjraf4quymy220406072547.jpg",
        "description": "Twenty Five Thousand Five Hundred only",
        "highlights": [
                "Hotel",
                "Breakfast",
                "Sightseeing",
                "Cab",
                "Dinner",
                "Daily water bottle"
        ],
        "inclusions": [
                "02 airport transfers by a A/c vehicle exclusively",
                "Accommodation in mentioned or similar hotels",
                "Transportation Kathmandu / Pokhara/ Kathmandu by A/c vehicle exclusively",
                "Sightseeing as per the itinerary in Kathmandu and Pokhara by A/c vehicle exclusively",
                "MAPAI (04 Breakfast + 04 Dinner)"
        ],
        "exclusions": [
                "Expenses caused by factors beyond our control like rail and flight delays, roadblocks, vehicle mal-functions, political disturbances etc.",
                "Entrance fees to monuments and museum",
                "Camera fee",
                "Any air / train fare",
                "Guide during the sightseeing",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrive at Kathmandu",
                        "activity": "Upon arrival at Kathmandu airport you will be met by our representative he will transfer you to the hotel, as reach check in to the hotel. Evening is free for leisure. Overnight stay at the hotel in Kathmandu.",
                        "image": "/uploads/packages/day-images/kquzt9vymumx7l9kacx6zy7ttljndb5712amnvzn241029111112.jpg"
                },
                {
                        "day": "Day 2: KATHMANDU - POKHARA",
                        "activity": "Morning after breakfast, check out from the hotel and proceed to visit Swayambhunath, Pashupatinath & Guheshwori (Shakti Peeth), after sightseeing drive to Pokhara. Upon arrival at Pokhara; check in at the hotel. From the Pokhara valley, you can see one of the most beautiful Himalayan Panoramas in the world. The Annapurna and famous \u201cFishtail\u201d mountain peak of Machhapuchhre tower over the tropical setting of Pokhara and you spend there will be the scenic highlight of your trip. You will have plenty of free time in Pokhara Valley, also called the \u201cMagic Land '' or Dreamland '' of Nepal, to explore various interesting places. In the evening enjoy yourself in the lake side area. Overnight stay at the hotel in Pokhara.",
                        "image": "/uploads/packages/day-images/r83z5i0vyy2dep9z5exhkvd3uw8ngjcajsenz5gv241029111338.jpg"
                },
                {
                        "day": "Day 3: POKHARA DAY",
                        "activity": "Early in the morning around 05:00 am you will be taken to Sarangkot to see the beautiful view of Sunrise after exploring the Sunrise from Sarangkot return to the hotel. After breakfast, you will proceed for sightseeing of Pokhara city (Gupteshwor Mahadev cave, Davi\u2019s fall, Phewa Lake, Bindabasini temple and International Mountain museum). Remaining leisure time, which you may enjoy walking around the lakeside. Overnight stay at the hotel in Pokhara.",
                        "image": "/uploads/packages/day-images/kr7jgfv2se3rxvbvupnt4zydkwyychumvg82ouuh241029111351.jpg"
                },
                {
                        "day": "Day 4: POKHARA - KATHMANDU",
                        "activity": "After breakfast transfer back to Kathmandu. On the way, enjoy the Cable Car ride while going to Manakamana Temple. Evening reach to your hotel, rest of the time free for personal activities, Overnight stay at the hotel in Kathmandu.",
                        "image": "/uploads/packages/day-images/zjhz6ffispbbf0j6xfrezfs7akjrqsaec1uizmj2241029111415.jpg"
                },
                {
                        "day": "Day 5: KATHMANDU (SIGHTSEEING & DEPARTURE)",
                        "activity": "Morning after breakfast check out from the hotel and transfer to Airport as per yourflight schedule, Tour end with sweet memories.",
                        "image": null
                }
        ]
},
    "5n6d-manali-package": {
        "id": "17",
        "slug": "5n6d-manali-package",
        "title": "Shimla Manali Package",
        "location": "3N Manali / 2 Shimla",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 18999",
        "oldPrice": "\u20b9 22000",
        "image": "/uploads/packages/wushxjjxw6lplnqh61wesqoeyvkawbkph3pxpylf220406075733.jpg",
        "description": "",
        "highlights": [
                "Transfers",
                "Breakfast & Dinner",
                "Sightseeing",
                "Hotel"
        ],
        "inclusions": [
                "Transport services by an exclusive vehicle as per itinerary{Volvo \\ Swift Desire",
                "Assistance on arrival.",
                "(Parking, Toll Tax, Luxury Tax, Green Tax , Fuel Exp., and Driver Exp.",
                "MAPAI (05 Breakfast + 05 Dinner)"
        ],
        "exclusions": [
                "Heater charge will be extra.",
                "Any monument entry fees / camera fees \u00d8 Any meal,",
                "which is not mentioned above. \u00d8 Any guide charges.",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Chandigarh to Shimla",
                        "activity": "Namaste and Welcome to Chandigarh Railway Station / Airport you will get a warm welcome and proceed to Shimla, by road. Fondly referred to as the \u201cQueen of Hills\u201d, Shimla is a very popular hill town of Himachal Pradesh. On arrival check in at the hotel and overnight stay at the hotel In Shimla.",
                        "image": "/uploads/packages/day-images/n1hirupdbyuibrugjqaq6nhbgvfvwiz0kgpmxgha241029101412.jpg"
                },
                {
                        "day": "Day 2: Shimla \u00e2\u0080\u0093 Kufri \u00e2\u0080\u0093 Shimla:-",
                        "activity": "Mahasu Peak, Chini Bunglow, Indira Tourist Park, visit Christ Church, Town Hall, Scandal Point.",
                        "image": "/uploads/packages/day-images/erxnimq3wd2acjdnecjn8jthndzj9wzgn1fnlbyu241029101433.jpg"
                },
                {
                        "day": "Day 3: 03: Shimla \u00e2\u0080\u0093 Kullu \u00e2\u0080\u0093 Manali",
                        "activity": "Sunder Nagar Lake, Pandoh Dam, Ooth Tunnel and Kullu Valley hotel. Overnight stay at the hotel in Manali.",
                        "image": "/uploads/packages/day-images/ocvdbod5krilvdj0iui8fow2zj8ymri6j8dxwi5n241029101447.jpg"
                },
                {
                        "day": "Day 4: Manali Sightseeing:-",
                        "activity": "Hadimba Devi Temple, Vashisht Temple, Vashisht Hot Water Springs and Van Vihar. After shopping, transfer to hotel, and overnight stay at hotel Manali.",
                        "image": "/uploads/packages/day-images/qinop7krqx5rsjfkxxqzltkuwecfihbkap1sx1yc241029101549.jpg"
                },
                {
                        "day": "Day 5: Solang Valley:-",
                        "activity": "of Solang Valley. Get enjoy in snow and enjoy Skiing, Snow Bike, Paragliding etc. overnight stay at hotel in Manali.",
                        "image": "/uploads/packages/day-images/7w7xvgnl03x60ro2pqol6xxhnpncffbtpqmjm3yc241029101628.jpg"
                },
                {
                        "day": "Day 6: Manali \u00e2\u0080\u0093 Chandigarh Departure",
                        "activity": "Morning after breakfast check out from the hotel and transfer to Chandigarh",
                        "image": null
                }
        ]
},
    "3n4d-thailand-package": {
        "id": "18",
        "slug": "3n4d-thailand-package",
        "title": "Amazing Thailand",
        "location": "2N Pattaya / 1N Bangkok",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 24400",
        "oldPrice": "\u20b9 28000",
        "image": "/uploads/packages/zxlqmhgq71iv3xvevzebzywogiwwt6uv7zm2mgos220406082237.jpg",
        "description": "",
        "highlights": [
                "Embark on a thrilling Thailand trip by visiting the Sri Racha Tiger Zoo, where you can get up close with amazing animals and enjoy exciting animal shows.",
                "Enjoy the spectacular Alcazar Show, a dazzling performance filled with vibrant costumes and impressive choreography.",
                "Take an exciting Coral Island tour by speed boat, exploring crystal-clear waters and stunning beaches.",
                "Discover Bangkok&rsquo;s rich culture on a memorable temple tour, visiting the city's famous landmarks and marveling at their stunning beauty."
        ],
        "inclusions": [
                "3 Nights hotel accomadtion",
                "04 breakfasts + 02 Lunches + 4 Dinners",
                "Sriracha tiger zoo entrance with arrival breakfast",
                "Alcazar show",
                "Coral Island tour by speed boat",
                "Safari world and marine park",
                "Bangkok Temple tour",
                "Sightseeing on private vehicle",
                "All airport & hotel transfers"
        ],
        "exclusions": [
                "Visa",
                "Early check-in & late check-out.",
                "Lunch and Dinner for except mentioned.",
                "Any drinks & personal expenses",
                "Phone Call, Laundry, Mini Bar, Room Services",
                "Travel insurance",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bangkok-Pattaya",
                        "activity": "After arrival, transfer you to the Hotel in Pattaya Visit Sri Racha Tiger Zoo Hotel check in at 14.00 Evening Alcazar Show",
                        "image": "/uploads/packages/day-images/Xg7UrSBtqIldlxzzRxNxqbmDoRIUP4VJHz04WtEF240823102917.jpg"
                },
                {
                        "day": "Day 2: Pattaya",
                        "activity": "Coral Island Tour by Speed Boat Pattaya Floating Market",
                        "image": "/uploads/packages/day-images/OclkQqAKfTnZ5EvJ4ipm5VvdkzJpZLmSVGiL33Gk240823102938.jpg"
                },
                {
                        "day": "Day 3: Pattaya-Bangkok",
                        "activity": "Safari World with Marine Park",
                        "image": "/uploads/packages/day-images/tMXROZ7SzCabipFEAWlWOzWmZb6h5hQ0rP6hntjK240823103029.jpg"
                },
                {
                        "day": "Day 4: Bangkok Departure",
                        "activity": "After breakfast check out from Hotel Bangkok Temple Tour Transfer to DMK Airport & Fly to Cochin",
                        "image": "/uploads/packages/day-images/m2oG32IIv9gLwpx1IjAGmiZWGQLxGLiThPMFgOLE240823103057.jpg"
                }
        ]
},
    "2n3d-kerala-standard-package": {
        "id": "19",
        "slug": "2n3d-kerala-standard-package",
        "title": "Kerala Standard Beach & Houseboat Plan",
        "location": "1N Cherai Beach/ 1N Houseboat",
        "duration": "",
        "price": "\u20b9 12999",
        "oldPrice": "\u20b9 14150",
        "image": "/uploads/packages/zghmnaohkngpzisdeoffkgyescgmxmzzeymhixt1220424093908.jpg",
        "description": "",
        "highlights": [
                "Start your Kerala trip with a day of relaxation on golden, soft sandy beaches along the Arabian Sea.",
                "Unwind on the beach and soak up the sun as you take in the beautiful coastal views.",
                "After a delicious traditional Kerala lunch, embark on a memorable overnight backwater cruise in a traditional houseboat.",
                "While cruising in this floating luxury vessel, enjoy picturesque views of Kerala&rsquo;s charming countryside."
        ],
        "inclusions": [
                "3 Star Hotel accommodation",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN TO CHERAI",
                        "activity": "Arrive at the gateway of Kerala Our cab and driver will be there to meet and greet you Enjoy beautiful stretches of lovely golden beaches of soft sand facing the Arabian Sea. Check in to the Resort Relax and enjoy the day on the beach. Overnight stay at Cherai.",
                        "image": "/uploads/packages/day-images/hrjvqnxhz20s01o2mkpiwvut78ctmu1qjxy1pxem241025031727.jpg"
                },
                {
                        "day": "Day 2: CHERAI TO ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakom. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/rmjieiif2yrz3wazgtryrxtc5boviejlhal4xxtv241025031740.jpg"
                },
                {
                        "day": "Day 3: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings Our Cab will drop you Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "2n3d-kerala-budget-package": {
        "id": "20",
        "slug": "2n3d-kerala-budget-package",
        "title": "2N3D Backwater & Waterfalls",
        "location": "1N Athirapilly Waterfalls/ 1N Aleppey Backwaters",
        "duration": "",
        "price": "\u20b9 7299",
        "oldPrice": "\u20b9 7800",
        "image": "/uploads/packages/omdijhppsytnyos9dzbgrdsw4psir2y12qnt0udf220424115201.jpg",
        "description": "Ten Thousand",
        "highlights": [
                "Enhance your Kerala trip with a visit to the stunning Vazhachal Waterfalls.",
                "Discover the serene beauty of Thumboormuzhi Dam, a perfect spot for relaxation.",
                "Experience the charm of a tranquil backwater resort nestled in nature.",
                "Enjoy fishing and a peaceful small boat cruise for a memorable getaway."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN to ATHIRAPILLY",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet and greet you. Vazhachal Waterfalls \u2013 7 Km From Athirapally Waterfalls Thumboormuzhi Dam \u2013 14 Km From Athirapally Waterfalls Enjoy Largest waterfall in Kerala Overnight stay",
                        "image": "/uploads/packages/day-images/qow7wb6euwmbnivaewxoidmgnftcoqodrec0kuxl241025025310.jpg"
                },
                {
                        "day": "Day 2: ATHIRAPILLY  to ALLEPPEY Backwaters",
                        "activity": "After breakfast proceeds to Kerala backwaters. Check in to the backwater resort. Fishing & Small boat cruises can be chosen as optional activities Overnight Stay in the resort",
                        "image": "/uploads/packages/day-images/eweqedbl3crjf7ch0k9zmdt53afv4hj7ttduvzn6241025025323.jpg"
                },
                {
                        "day": "Day 3: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattancherry, Jew town and local shopping based upon your flight timings Our Cab will drop you Back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "4n5d-kerala-tree-house-package": {
        "id": "21",
        "slug": "4n5d-kerala-tree-house-package",
        "title": "4N5D Kerala Tree House Package",
        "location": "2N Munnar Hillstations/ 1N Thekkady Wildlife/ 1N Houseboat",
        "duration": "",
        "price": "\u20b9 16999",
        "oldPrice": "\u20b9 18200",
        "image": "/uploads/packages/IArNz4dI24ALqJ1jtPVDl4LjCoYB1h3Dpceafydo220424051742.jpg",
        "description": "",
        "highlights": [
                "Tree House Stay",
                "All sightseeing",
                "Breakfast",
                "Private Houseboat"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Flight Tickets"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN to  MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Overnight stay",
                        "image": "/uploads/packages/day-images/wi3g0ry5rz4u69olbszxb6ynyzvez3jmaxceobwg241025033530.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/oyuovydob1yrudgcss88c6qfr1ogigpvtfdrql0i241025033542.jpg"
                },
                {
                        "day": "Day 3: MUNNAR to  THEKKADY",
                        "activity": "morning after breakfast drive from Munnar to Thekkady Afternoon boating in Periyar Lake. During the boat ride spot the wildlife animals Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay",
                        "image": "/uploads/packages/day-images/oxmffsblj09evwlfevecnemzgo6hnpi1feirpgyw241025033602.jpg"
                },
                {
                        "day": "Day 4: THEKKADY  to  ALLEPPEY",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam backwater cruise in traditional Kerala Houseboat Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/vjcdy1amyikztluvl4w1hw4rysewuw7p4g0y4npd241025033644.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings. Our Cab will drop you. Fly back to your hometown with good memories of the Kerala trip.",
                        "image": "/uploads/packages/day-images/f3tf1odki1lapnswikfcxnxdf07lftwg4c9swhv0241105014252.jpg"
                }
        ]
},
    "4n5d-kerala-premium-private-pool-package": {
        "id": "22",
        "slug": "4n5d-kerala-premium-private-pool-package",
        "title": "4N5D Kerala Premium Private Pool Package",
        "location": "2N Munnar Hillstations/ 1N Thekkady Wildlife / 1N Houseboat",
        "duration": "",
        "price": "\u20b9 23899",
        "oldPrice": "\u20b9 25700",
        "image": "/uploads/packages/657PzD4Ep4XTD8TNBzFh8jUTBGH6x68KQeNBpzJ2220425115126.jpg",
        "description": "",
        "highlights": [
                "Start your Kerala tour in Cochin, where our friendly driver will greet you before heading to Munnar, a haven of peace and harmony.",
                "Enjoy thrilling activities such as speed boating at Mattupetty Dam and pedal boating on Kundala Lake, and take in the stunning views at Eco Point.",
                "Experience the beauty of Thekkady with an afternoon boat ride on Periyar Lake, where you can spot a variety of wildlife including elephants and deer.",
                "Conclude your Kerala tour with a traditional houseboat cruise in Alleppey, savoring local cuisine while cruising through the picturesque backwaters and exploring Fort Cochin and Mattancherry for local shopping."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Flight Tickets"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN to  MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay",
                        "image": "/uploads/packages/day-images/th0izy8w2wmdtktmtu6z9zpcbszjst9uqgkblqmh241025040402.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point Top station or Eravikulam (Rajmala) National Park Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/eu1eb3ajjhscgzplytksclnvvtqgq6tgt1xnfx06241025040417.jpg"
                },
                {
                        "day": "Day 3: MUNNAR to  THEKKADY",
                        "activity": "morning after breakfast drive from Munnar to Thekkady Afternoon boating in Periyar Lake. During the boat ride spot the wildlife animals Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay",
                        "image": "/uploads/packages/day-images/4dleiqc5tnypvrqkiwogwaep9dajdnrffkvfdgod241025040436.jpg"
                },
                {
                        "day": "Day 4: THEKKADY to  ALLEPPEY",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam backwater cruise in traditional Kerala Houseboat Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/rygcokffnl8bpmmbw51mi3fokzixzzvd2dzdkggy241025040506.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure Fort Cochin, Mattancherry, Jew town and local shopping based upon your return timings. Our Cab will drop you. Fly back to your hometown with good memories of the Kerala trip.",
                        "image": "/uploads/packages/day-images/yvuisencct5apmlwzwh1c2e0xt7h0mtkuvfezjgv241105035715.jpg"
                }
        ]
},
    "2n3d-kerala-luxury-package": {
        "id": "23",
        "slug": "2n3d-kerala-luxury-package",
        "title": "2N3D  Luxury Hill station Plan",
        "location": "2N Munnar Hillstations",
        "duration": "",
        "price": "\u20b9 9999",
        "oldPrice": "\u20b9 11700",
        "image": "/uploads/packages/MzlR1uv61m71SqSnCHr0TwWzuqFcsHjdMRKWFQw5220424075049.jpg",
        "description": "",
        "highlights": [
                "Make the most of your Kerala trip by visiting the stunning Valara and Cheeyapara waterfalls, along with picturesque tea gardens.",
                "Experience thrilling activities at Mattupetty Dam with speed boating and pedal boating at Kundala Lake.",
                "Discover breathtaking views at Eco Point and, time permitting, explore Top Station or Eravikulam (Rajmala) National Park.",
                "In the evening, enjoy an optional visit to Blossom Park and the tea museum for a delightful experience."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Cochin \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c Munnar",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will there to meet and greet you. Proceed to Munnar visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay",
                        "image": "/uploads/packages/day-images/6skbhivwf9cejtrhmjpbpwmaqw8zim9xcao2ned3241025030420.jpg"
                },
                {
                        "day": "Day 2: Munnar Sightseeing",
                        "activity": "This days sightseeing starts after the breakfast. Sightseeing includes: Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) Eco point, Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for overnight stay",
                        "image": "/uploads/packages/day-images/nwsfink3h8er6qtve5tb1olljikzzc9o2usrbreo241025030432.jpg"
                },
                {
                        "day": "Day 3: Cochin Departure",
                        "activity": "After breakfast you can check out and proceed for departure. Cochin sightseeing which includes: Fort Cochin Mattanchetry, Jew town, local shopping based upon your flight timings Fly back to your hometown with good memories of Kerala trip.",
                        "image": null
                }
        ]
},
    "4n5d-kerala-budget-package": {
        "id": "24",
        "slug": "4n5d-kerala-budget-package",
        "title": "4N5D Kerala Budget Package with Waterfalls",
        "location": "1N Athirapilly Waterfalls  / 2N Munnar Hillstation",
        "duration": "",
        "price": "\u20b9 14299",
        "oldPrice": "\u20b9 15450",
        "image": "/uploads/packages/dfmuxmrfkxgur0buh17uge6d1hv5eacndlpvo7g1220426013030.jpg",
        "description": "",
        "highlights": [
                "Athirapilly Waterfalls",
                "All Sightseeing",
                "Houseboat",
                "3 Star Hotels"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "Exclusive Houseboat with all meals"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c ATHIRAPILLY",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet and greet you. Vazhachal Waterfalls \u2013 7 Km From Athirapally Waterfalls Thumboormuzhi Dam \u2013 14 Km From Athirapally Waterfalls Enjoy Largest waterfall in Kerala Overnight stay",
                        "image": "/uploads/packages/day-images/posdhihhxxomw7dok2bgmdgwwbtmdudvyxk3lq6n241025032252.jpg"
                },
                {
                        "day": "Day 2: ATHIRAPILLY - MUNNAR",
                        "activity": "After breakfast proceed to Munnar start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/x2el1ehyd1d9rkcbaw4f8do5snii9occc8l07w0x241025032310.jpg"
                },
                {
                        "day": "Day 3: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes, Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Afternoon visit to Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/1fb3eyuixlpeah8w2x0z9n9rhf24vjkq0biwb0gq241025032331.jpg"
                },
                {
                        "day": "Day 4: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c ALLEPPEY HOUSEBOAT",
                        "activity": "After breakfast, proceed to Alleppey/Kumarakam. Set out on an enchanting overnight backwater cruise in traditional Kerala Houseboat after Traditional Kerala lunch. While cruising in these floating luxury vessels, let your eyes enjoy the scenes in the Kerala countryside. All meals including tea and snacks will be served on board. Overnight stay in the houseboat.",
                        "image": "/uploads/packages/day-images/c4xlv27ls3dl4ftphgoopigqm188y8vxb6qiihbr241025032343.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattancherry, Jew town and local shopping based upon your flight timings Our Cab will drop you Back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "4n5k-kerala-hills-backwater-wb": {
        "id": "25",
        "slug": "4n5k-kerala-hills-backwater-wb",
        "title": "Premium Kerala Hills & Backwater Resort",
        "location": "2N Munnar Hillstations/1N Thekkady Wildlife/1N Aleppey Backwaters",
        "duration": "",
        "price": "\u20b9 15999",
        "oldPrice": "\u20b9 17800",
        "image": "/uploads/packages/7nWKrBwDBqIXkw48wXQviMPO7pRzAGXCAeTpM9ed221107123610.jpg",
        "description": "",
        "highlights": [
                "3 Star Hotels",
                "Breakfast",
                "All Sightseeing"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "CP plans don\u2019t have Lunch and Dinner."
        ],
        "itinerary": [
                {
                        "day": "Day 1: COCHIN ARRIVAL\u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c MUNNAR",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will there to meet and greet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens",
                        "image": "/uploads/packages/day-images/lfel1sw8sncdnjkdcozu8aqxxsgwlfil97p9qciq241025033324.jpg"
                },
                {
                        "day": "Day 2: MUNNAR SIGHTSEEING",
                        "activity": "This day sightseeing starts after breakfast. Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point Top station or Eravikulam (Rajmala) National Park (based on the availability of time) Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/zdgvil2unuxlyqtxkaln6wcouuhjlyz5vxaorbsl241025033335.jpg"
                },
                {
                        "day": "Day 3: MUNNAR \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009c THEKKADY",
                        "activity": "Morning after breakfast drive from Munnar to Thekkady Afternoon boating in Periyar Lake. During the boat ride spot the wildlife animals Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay",
                        "image": "/uploads/packages/day-images/2isujjov4lqpioedugneoheh3gsz6dtdd1djplsm241025033347.jpg"
                },
                {
                        "day": "Day 4: THEKKADY \u00c3\u00a2\u00e2\u0082\u00ac\u00e2\u0080\u009cALLEPPEY",
                        "activity": "After breakfast proceeds to Kerala backwaters. Check in to the backwater resort. Fishing & Small boat cruises can be chosen as optional activities Overnight Stay in the resort",
                        "image": "/uploads/packages/day-images/ach9fmqfyz4pnoqiehvzc1dewxhmkrawbk2jgyn8241025033427.jpg"
                },
                {
                        "day": "Day 5: ALLEPPEY - COCHIN DEPARTURE",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattanchetry, Jew town and local shopping based upon your return timings. Our Cab will drop you Return to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "kerala-season-plan": {
        "id": "26",
        "slug": "kerala-season-plan",
        "title": "Kerala Season Plan",
        "location": "2N Munnar Hillstations/ 1N Thekkady Wildlife  / 1N Aleppey Backwaters",
        "duration": "",
        "price": "\u20b9 10999",
        "oldPrice": "\u20b9 12550",
        "image": "/uploads/packages/rTyOuCPG9NxzaC3QrYXuqrJ6EE1uxfPijXWaXQyX221128120851.jpg",
        "description": "",
        "highlights": [
                "Embark on your Kerala trip and discover the serene beauty of Munnar, a true paradise of peace and harmony.",
                "Enjoy scenic stops at Valara and Cheeyapara waterfalls, and explore the picturesque tea gardens along the way.",
                "Experience thrilling speed boating at Mattupetty Dam and pedal boating on Kundala Lake, along with a visit to Eco Point.",
                "Take a boat ride on Periyar Lake to spot wildlife like elephants and deer, enjoy the beautiful viewpoints in Thekkady and consider experiencing traditional Kathakali or Kalaripayattu (Martial Arts) performances.",
                "Enjoy a peaceful stay at a backwater resort in Alleppey, where you can indulge in activities like fishing right from your cottage."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Any portage at airports and hotels, tips, all items of personal nature."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Cochin to Munnar",
                        "activity": "Arrive at Cochin, the gateway of Kerala, our cab and driver will be there to meet you. Proceed to Munnar to start your Kerala holiday in the heaven of peace and harmony. On the way visit Valara, Cheeyapara waterfalls and tea gardens. Check into the resort and overnight stay will be arranged in the Munnar resort/hotel.",
                        "image": "/uploads/packages/day-images/2oblzs3agl2sytdfruscovmpwnn1ufcy0pi8q7iv241025030910.jpg"
                },
                {
                        "day": "Day 2: Munnar Sightseeing",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes Mattupetty Dam (speed boating), Kundala lake (Pedal & Shikkara boating) and Eco point. Evening is optional to visit Blossom Park & tea museum. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/ihfkceiyrd7qbaklieyhcbp15a3wmotjvixkzlmx241025030926.jpg"
                },
                {
                        "day": "Day 3: Munnar To Thekkady",
                        "activity": "The morning after breakfast drive from Munnar to Thekkady. Enjoy the beautiful viewpoints on the way and check in to the hotel. Afternoon boating in Periyar Lake. During the boat ride spot the wildlife (elephants, Indian Gaur, Monkeys, Spotted deer etc. Kathakali , Kalaripayattu(Martial Arts) are optional activities. Overnight stay at the hotel in Thekkady.",
                        "image": "/uploads/packages/day-images/gilnhteaj4wgxrdtubunykun00hr3n2stjci9xwy241025030939.jpg"
                },
                {
                        "day": "Day 4: Thekkady to Aleppey",
                        "activity": "After breakfast, proceed to Kerala Backwaters. Check in to the backwater resort Activities around cottage can include, Fishing Small boat cruise can be chosen as optional activities Overnight stay at the Resort.",
                        "image": "/uploads/packages/day-images/c0emslrfn0fzmvr17tbxuks1xusvcg2rq7ufgmvq241025030953.jpg"
                },
                {
                        "day": "Day 5: Aleppey To Cochin",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way, you can enjoy Cochin sightseeing Fort Cochin, Mattanchetry, Jew town and local shopping based upon your flight timings. Our Cab will drop you at the Airport. Fly back to your hometown with good memories of the Kerala trip.",
                        "image": null
                }
        ]
},
    "kodaikanal-tour-package": {
        "id": "28",
        "slug": "kodaikanal-tour-package",
        "title": "Kodaikanal Tour Package",
        "location": "2N Kodaikanal",
        "duration": "2 Nights 3 Days",
        "price": "\u20b9 8999",
        "oldPrice": "\u20b9 10600",
        "image": "/uploads/packages/zz78tl2qmhwn8woqay4nx44kn3c6nj9bdbfqq11u240906103238.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "CAB",
                "Base category twin room price valid for 2 people staying togethe",
                "Bed and Breakfast",
                "Children below 5 years will be complimentary.",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Madurai to Kodaikanal",
                        "activity": "Pick Up From Madurai Overnight stay",
                        "image": "/uploads/packages/day-images/7ychfd4hr6qgbgbvxkcguvz2mf0uz6ju1kanlft7241028035940.jpg"
                },
                {
                        "day": "Day 2: Kodaikanal Sightseeing's",
                        "activity": "Sightseeing  including Coaker's Walk, Pine forest and Guna Cave Enjoy a boat ride in the serene Kodaikanal Lake local markets for shopping Overnight stay in Kodaikanal",
                        "image": "/uploads/packages/day-images/gus0edr2kaucpo8cw4nk62n7xzbctbihb5ubvbvz241028035955.jpg"
                },
                {
                        "day": "Day 3: Madurai Drop",
                        "activity": "After breakfast, check-out from the hotel On the way, you can enjoy sightseeing & Local shopping Return back to your hometown with good memories of your trip.",
                        "image": null
                }
        ]
},
    "ooty-tour-packages": {
        "id": "29",
        "slug": "ooty-tour-packages",
        "title": "Ooty Tour Packages",
        "location": "2N Ooty",
        "duration": "2 Nights 3 Days",
        "price": "\u20b9 14599",
        "oldPrice": "\u20b9 16500",
        "image": "/uploads/packages/8zogew9nlpyyvhabbux8k4nomjvcwhbxul19urz9240905041659.jpg",
        "description": "",
        "highlights": [
                "Ooty , The Queen Of Hill Station, is a charming retreat in the Nilgiri Hills.\u00a0 Rolling Hills, Tea Plantation and eucalypyus forest creat a serene atmosphere.\u00a0 Explore scenic lakes, waterfalls and winding road, and visit ooty lake",
                "Botanical Gardens, and Doddabetta Peak for panoramic views. A perfect getaway for nature lovers\u00a0and\u00a0families."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "CP plans don\u2019t have Lunch and Dinner.",
                "5% GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Coimbatore Arrival to Ooty",
                        "activity": "Ooty Lake and Botanical Garden Dolphin Nose and Ketti Valley Check in to the Resort, Overnight stay",
                        "image": "/uploads/packages/day-images/sl01fizhfkmml4a4hnudjtq2tg2bhxugdsc9dehl241028040540.jpg"
                },
                {
                        "day": "Day 2: Ooty Sightseeing",
                        "activity": "Tea factory, Tea Museum Doddabetta Peak Toy train",
                        "image": "/uploads/packages/day-images/oklmvxgkebzjb5iaoofiyqp2wu2udekxyl98ossy241028040609.jpg"
                },
                {
                        "day": "Day 3: Ooty to Coimbatore Departure",
                        "activity": "Isha Yoga Local sightseeings Local Shopping",
                        "image": null
                }
        ]
},
    "coorg-tour-package": {
        "id": "30",
        "slug": "coorg-tour-package",
        "title": "Coorg Tour Package",
        "location": "2N Coorg",
        "duration": "2 Nights 3 Days",
        "price": "\u20b9 11999",
        "oldPrice": "\u20b9 12900",
        "image": "/uploads/packages/mksp2z9emdc8ymkinijvjc85atc6cbl6wzpq1pam240906105051.jpg",
        "description": "",
        "highlights": [
                "Coorg, also known as Kodagu, is a rural district in the state of Karnataka, India. It's a scenic hill station famous for its: - Lush green forests - Rolling hills - Sparkling waterfalls - Coffee plantations - Rich cultural heritage - Delicious local cuisine (especially non-veg dishes like pandi curry!) Coorg is often called the "
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Banglore Airport, Railway, Bus stand Pickup and Drop",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Any portage at airports and hotels, tips, all items of personal nature."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Banglore To Coorg",
                        "activity": "Start early from Bangalore ,where our cab and driver will be there to meet and greet you and proceed to  Coorg enjoy the scenic beauty Explore the coffee plantations and learn about the coffee-making process Explore the local markets and indulge in some shopping for spices, coffee, and traditional Coorg handicrafts. Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/xczp8bljymqhlvgrz1re6u3uwzk4wwgvzrqbszi9241028040033.jpg"
                },
                {
                        "day": "Day 2: Coorg Sightseeing",
                        "activity": "This day sightseeing starts after breakfast,Sightseeing includes, Dubare Elephant Camp a unique experience of interacting with elephantsvisit the famous origin of the Cauvery River. Explore the Bhagamandala Temple, located nearby, which is known for its religious significance. Enjoy a scenic drive through the winding roads of Coorg and soak in the natural beauty. Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/jmckgrmgiov1sphjbcpyy7j1t4cqtci0mhqhqswp241028040050.jpg"
                },
                {
                        "day": "Day 3: Coorg To Bangalore Departure",
                        "activity": "After breakfast, you can check out and proceed for departure. On the way visit famous Places like Daria Daulat Bagh , Srirangapatna, Channapatna Ramadevara Betta Vulture Sanctuary, Head back to Bangalore  with beautiful memories of your Coorg trip.",
                        "image": "/uploads/packages/day-images/21577n8ui7urfp0mul3bp75uuewjpsad5ivbpdoo241108124315.jpg"
                }
        ]
},
    "ooty-kodaikanal-tour-package": {
        "id": "31",
        "slug": "ooty-kodaikanal-tour-package",
        "title": "Ooty Kodaikanal  Package",
        "location": "2N Ooty / 2N Kodaikanal",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 15999",
        "oldPrice": "\u20b9 19000",
        "image": "/uploads/packages/ilprye3rqzkqmd7ruvf8uvu2xqgj6p92iwuhnbeh240905040700.jpg",
        "description": "",
        "highlights": [
                "Start your Ooty-Kodaikanal tour with a visit to the famous Ooty Botanical Garden, Government Rose Garden, and tranquil Ooty Lake, then explore the scenic hill station of Coonoor in the Nilgiris.",
                "Take in the stunning views at Sim's Park and Dolphin Nose, tour lush tea estates and Doddabetta Park, and enjoy a charming toy train ride from Coonoor to Ooty (based on availability).",
                "Experience the serene beauty of Kodaikanal by visiting Coaker&rsquo;s Walk, Bryant Park, Pillar Rocks, and Green Valley View Point.",
                "Conclude your journey with a relaxing boat ride on Kodaikanal Lake and some shopping in the local markets for unique souvenirs and local treats."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi/Tamil speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Gala Dinner on New year & Xmas"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Coimbatore to Ooty",
                        "activity": "Arrive at Coimbatore visit Bandipur visit Queen of Hills , Ooty Botanical Garden ,        Government Rose Garden and Ooty Lake",
                        "image": "/uploads/packages/day-images/uet6cthauplmxzb591zrog6hmaqy5etantbttkt5241028040915.jpg"
                },
                {
                        "day": "Day 2: Ooty Sight Seeing",
                        "activity": "Coonoor - famous hill station of Nilgiri Hills Sim's Park  and Dolphin Nose Tea Estates and Doddabetta park Toy train ( Coonoor to ooty ) Subject to availability",
                        "image": "/uploads/packages/day-images/zc5calx2iucrifbmlqqwvaqwn6kp0a1ioqbnyibu241028040929.jpg"
                },
                {
                        "day": "Day 3: Ooty to Kodaikanal",
                        "activity": "visit the beautiful Pine Forest and Silver Cascade Waterfall enroute Spend the evening exploring the local markets",
                        "image": "/uploads/packages/day-images/w8v92uwmmbecfdl8gwekxty34jsh42x7giogrrei241028041029.jpg"
                },
                {
                        "day": "Day 4: Kodaikanal Sight Seeing",
                        "activity": "Coaker's Walk, Bryant Park, Pillar Rocks, and Green Valley View Point Enjoy a boat ride in the serene Kodaikanal Lake visit the local markets",
                        "image": "/uploads/packages/day-images/pdc7tnzhepzbinejt2u9th0vppklbobly7k3ktna241028041020.jpg"
                },
                {
                        "day": "Day 5: Departure - Coimbatore",
                        "activity": "After breakfast, check-out from the hotel Transfer to Coimbatore Airport or Railway Station for your onward journey",
                        "image": "/uploads/packages/day-images/kjwx3dw2zc259aawcd8cqwlsvliwbkr6ohcbgsvr241108122141.jpg"
                }
        ]
},
    "maldives-tour-package": {
        "id": "32",
        "slug": "maldives-tour-package",
        "title": "Maldives Tour Package",
        "location": "4N Maldives",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 73999",
        "oldPrice": "\u20b9 80000",
        "image": "/uploads/packages/h1xw5ekx8qsl0hyos8pethtm6u8fjkbjksewkdyd240905033121.jpg",
        "description": "",
        "highlights": [
                "Maldives: Crystal-clear waters, pristine beaches, and coral reefs create a tropical paradise.",
                "Luxurious resorts, overwater villas, and stunning sunsets make it a dream destination.",
                "Snorkel or dive with manta rays and whale sharks, or simply relax in a beachside hammock.",
                "A perfect haven for relaxation and unforgettable\u00a0experiences."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Airport Pickup and Drop"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "5% GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival At Maldives",
                        "activity": "Stay at Beach Villa",
                        "image": "/uploads/packages/day-images/jychcpsmz6kkndjdg38kei31tmfad7gfw6bts90t241029122702.jpg"
                },
                {
                        "day": "Day 2: Island Exploration",
                        "activity": "Over night stay at Beach Villa",
                        "image": "/uploads/packages/day-images/6b25lktybqhqhkyevkxfegpzdappzozlz70my5rd241029122716.jpg"
                },
                {
                        "day": "Day 3: Island Exploration",
                        "activity": "Overnight Stay at WaterVilla",
                        "image": "/uploads/packages/day-images/go54udzsnbxjo36ptatuw79qbgrsogogt6nvcya3241029122730.jpg"
                },
                {
                        "day": "Day 4: Island Exploration",
                        "activity": "Overnight stay at Watervilla",
                        "image": "/uploads/packages/day-images/gmgysqx9fw72f2goudmdbhdg72hmzuwjrn2fprzr241029122759.jpg"
                },
                {
                        "day": "Day 5: Departure",
                        "activity": "Departure in Speedboats",
                        "image": "/uploads/packages/day-images/bofvbiwi30ecpntllmtouqcmatm1kjrksqhj56yp241029122810.jpg"
                }
        ]
},
    "coorg-mysore": {
        "id": "33",
        "slug": "coorg-mysore",
        "title": "Coorg - Mysore",
        "location": "2N Coorg / 1N Mysore",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 14999",
        "oldPrice": "\u20b9 15800",
        "image": "/uploads/packages/uczkmux2qyzzobrnbbgyaty8vldnpkx9izdegbb0240905031606.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Banglore Airport, Railway, Bus stand Pickup and Drop",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "Optional activities in your trip like boating charges and entry tickets"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bangalore To  Coorge",
                        "activity": "Arrive at the gateway of Banglore Explore the local markets and indulge in some shopping for spices, coffee, and traditional Coorg handicrafts. Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/q8xtljxcurknztseo2ixghghfnobwibv9xvvdm0s241028040654.jpg"
                },
                {
                        "day": "Day 2: Coorge Sightseeing",
                        "activity": "Sightseeing includes, Dubare Elephant Camp a unique experience of interacting with elephants Enjoy a scenic drive through the winding roads of Coorg and soak in the natural beauty.   Visit the famous origin of the Cauvery River. Bhagamandala Temple, located nearby, which is known for its religious significance. Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/fzcgrxhhu5qiayqepvpwnybmrhbmqqzbyfmuatie241028040710.jpg"
                },
                {
                        "day": "Day 3: Coorg - Mysore",
                        "activity": "proceed to visit Mysore palace and   Brindavan Gardens, Jaganmohan Palace ,Lalitha Mahal Palace , Mysore Zoo , Krishnaraja Sagar Dam , Melody World Wax Museum Overnight stay at the hotel",
                        "image": "/uploads/packages/day-images/v6l6nxqgq1hbc4gklcvlad0wavemuj3mxmr39gkv241028040738.jpg"
                },
                {
                        "day": "Day 4: Bangalore To Mysore",
                        "activity": "After breakfast check out and proceed to Bangalore Bangalore the sightseeing  Church street , commercial street and local shopping based upon you departure timing    Return back to your hometown with good memories of you mysore / ooty trip",
                        "image": null
                }
        ]
},
    "coorg-mysore-ooty-package": {
        "id": "34",
        "slug": "coorg-mysore-ooty-package",
        "title": "Coorg Mysore Ooty Package",
        "location": "2N Coorg / 1N Mysore / 2N Ooty",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 23999",
        "oldPrice": "\u20b9 25700",
        "image": "/uploads/packages/vbpwushzobsqylb8s1z1uhvlgken5enhwzdly3x5240905024552.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Banglore Airport, Railway, Bus stand Pickup and Drop",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions",
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bangalore To Coorg",
                        "activity": "Arrive at the gateway of Banglore, our cab and driver will meet and proceed to  Coorg enjoy the scenic beauty Explore the coffee plantations and learn about the coffee-making process Explore the local markets and indulge in some shopping for spices, coffee, and traditional Coorg handicrafts.",
                        "image": "/uploads/packages/day-images/1awf9meqpvdrmfx2swctbxrmu00cwnpenlk5nrov241029112521.jpg"
                },
                {
                        "day": "Day 2: Coorg Sightseeing",
                        "activity": "This day sightseeing starts after breakfast,Sightseeing includes, Dubare Elephant Camp a unique experience of interacting with elephants Enjoy a scenic drive through the winding roads of Coorg and soak in the natural beauty.   Visit the famous origin of the Cauvery River. Explore the Bhagamandala Temple, located nearby, which is known for its religious significance. Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/h7xuv9anzykdalfbw9hs86rwkmbx28foreddtaia241029112539.jpg"
                },
                {
                        "day": "Day 3: Coorg To Mysore",
                        "activity": "This  day after Breakfast   proceed to Mysore On the way visit Vidhana Soudha,and Tipu sultan's summer palace After check in at the hotel and proceed to visit Mysore palace and   Brindavan Gardens, Jaganmohan Palace ,Lalitha Mahal Palace , Mysore Zoo , Krishnaraja Sagar Dam , Melody World Wax Museum \u00b7  Overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/fzwmceg2bip3nk7va029x1y3tkvmgigwtao090ha241029112600.jpg"
                },
                {
                        "day": "Day 4: Mysore To Ooty",
                        "activity": "The morning after breakfast proceed to Ooty Enjoy the beautiful viewpoints on the way, visit Bandipur and check in to the hotel On the day visit Queen of Hills , Ooty Botanical Garden ,        Government Rose Garden and Ooty Lake (Paddle boating ) \u00b7Overnight stay at the hotel",
                        "image": "/uploads/packages/day-images/onj1agnmggykiaw4bk3kxznxvvssiykclktagsmb241029112611.jpg"
                },
                {
                        "day": "Day 5: Ooty Cooner Sightseeing",
                        "activity": "This day sightseeing starts after breakfast. Sightseeing includes,     Coonoor is the most famous hill station of Nilgiri Hills Sim's Park  and Dolphin Nose , Tea Estates and Doddabetta park it's a highest mountain in the Nilgiri Mountains    Toy train ( Coonoor to ooty ) Subject to availability Overnight stay at the hotel",
                        "image": "/uploads/packages/day-images/mfdzzupmxibabq9kq8jep73nu7calcbfhvhjn7oi241029112627.jpg"
                },
                {
                        "day": "Day 6: Bangalore Departure",
                        "activity": "After breakfast check out and proceed to Bangalore . On the way, you can enjoy Bangalore the sightseeing  Church street , commercial street and local shopping based upon you departure timing",
                        "image": "/uploads/packages/day-images/hogzcgf6klznl9vtjozpnv4tzvn4s8uleji7rrka241108124802.jpg"
                }
        ]
},
    "goa-tour-package": {
        "id": "35",
        "slug": "goa-tour-package",
        "title": "Goa Tour Package",
        "location": "2N South Goa / 2N North Goa",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 13999",
        "oldPrice": "\u20b9 15000",
        "image": "/uploads/packages/q2zgcmko8vaz9urxqizdz53eyfbc8vnjxe2uis9a240905105822.jpg",
        "description": "",
        "highlights": [
                "1. Beaches: Relax on Palolem, Baga, Calangute, or Anjuna beaches, each with its unique charm.  2. Water Sports: Enjoy snorkeling, scuba diving, parasailing, or kayaking in the Arabian Sea.  3. Historical Landmarks: Explore the UNESCO-listed Old Goa churches (Basilica of Bom Jesus, Se Cathedral), Fort Aguada, and Chapora Fort.  4. Cultural Experiences: Visit local markets, take a cooking class, or attend a traditional Goan festival.  5. Wildlife: Spot dolphins, crocodiles, or exotic birds in the Bhagwan Mahaveer Sanctuary and Mollem National Park.  6. Nightlife: Dance the night away at beach shacks, clubs, or casinos.  7. Food: Savor Goan cuisine, a blend of Indian and Portuguese flavors, with popular dishes like fish curry, vindaloo, and bebinca"
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Goa Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast.",
                "Children below 5 years will be complimentary."
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Gala Dinner on New year & Xmas",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: ARRIVAL AT GOA",
                        "activity": "Railway station/ Airport -  our cab and driver will be there to meet and greet you Start your Goan holiday with local Sight Seeing and relax on the Beach",
                        "image": "/uploads/packages/day-images/jkyfzeozau7njk3jv3n6kqsvexamfk10ijvg8dmv241028040332.jpg"
                },
                {
                        "day": "Day 2: SOUTH GOA SIGHTSEEING",
                        "activity": "Spend the day exploring the vibrant beaches of Baga and Calangute Enjoy the buzzing nightlife and try some local Goan cuisine",
                        "image": "/uploads/packages/day-images/mrppdkz7jykr3h7z5f4dt1q4pzsyklgaqvek1aef241028040343.jpg"
                },
                {
                        "day": "Day 3: SOUTH GOA TO NORTH GOA",
                        "activity": "This Day we shall spend in local Shopping and Beach Night Life",
                        "image": "/uploads/packages/day-images/fyowzjudwq9nprp8fqdkwzgggghr9aevq2uqzuys241028040353.jpg"
                },
                {
                        "day": "Day 4: NORTH GOA SIGHTSEEING",
                        "activity": "historic and cultural attractions of South Goa Visit UNESCO world heritage site, Basilica of Bom Jesus in Old Goa xplore stunning churches & colonial architecture min Panaji, the capital of Goa",
                        "image": "/uploads/packages/day-images/2bf9vpu7bw9wmhhkiokyblf2jhnc4optwq7yi6xx241028040404.jpg"
                },
                {
                        "day": "Day 5: GOA DEPARTURE DAY",
                        "activity": "Enjoy some leisure time on beaches and do some water activities Local shopping and sightseeing based on return timing",
                        "image": "/uploads/packages/day-images/kox2wmakoxg3nsb2euuvpfaxp2b0as8wrq6bts3r241108110942.jpg"
                }
        ]
},
    "thailand-phuket-krabi": {
        "id": "36",
        "slug": "thailand-phuket-krabi",
        "title": "Thailand Phuket & Krabi",
        "location": "2NPhuket / 2N Krabi",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 29999",
        "oldPrice": "\u20b9 34000",
        "image": "/uploads/packages/Uzi8MYAjx3MwWWmNS2soW9x9IzESbmt0I4wN42Xx240822120635.jpg",
        "description": "",
        "highlights": [
                "Kick off your Thailand trip with a scenic Phuket City Tour, including a visit to the iconic Big Buddha for breathtaking views.",
                "Experience the stunning Phi Phi Islands on a Big Boa tour, exploring crystal-clear waters and dramatic landscapes.",
                "Dive into adventure with the Krabi Rainforest Tour, where you&rsquo;ll discover lush greenery and vibrant wildlife.",
                "Explore the beauty of the Andaman Sea with the 04 Island Tour by speed boat, visiting pristine beaches and secluded islands."
        ],
        "inclusions": [
                "4 Nights hotel accomadtion",
                "Half Day Phuket City Tour With Big Buddha",
                "Phi Phi Island Tour By Big Boat With Lunch",
                "Krabi Rainforest Tour",
                "4 Island Tour By Speed Boat With Lunch"
        ],
        "exclusions": [
                "Visa",
                "Early check-in & late check-out.",
                "Lunch and Dinner for except mentioned.",
                "Any drinks & personal expenses",
                "Phone Call, Laundry, Mini Bar, Room Services",
                "Travel insurance",
                "GST",
                "Bank Charges"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival Phuket",
                        "activity": "After arrival, transfer you to the Hotel in Phuket Half Day Phuket City Tour With Big Buddha",
                        "image": "/uploads/packages/day-images/TzzjaA9GXPpi5gsO99pGQpyb9jrZsjFmDTiYxmOY240823103407.jpg"
                },
                {
                        "day": "Day 2: Phuket Sightseeing's",
                        "activity": "Phi Phi Island Tour By Big Boat With Lunch",
                        "image": "/uploads/packages/day-images/FPenEdrEbs0VL7bBCz0RYr7kabB7m7J8TeIWoc4o240823103427.jpg"
                },
                {
                        "day": "Day 3: Phuket to Krabi",
                        "activity": "Krabi Rainforest Tour",
                        "image": "/uploads/packages/day-images/aGgTqvfXTzxXYEyqh5SVwfgfdxJNcmulYvrh0RZZ240823020654.jpg"
                },
                {
                        "day": "Day 4: Krabi",
                        "activity": "04 Island Tour By Speed Boat With Lunch",
                        "image": "/uploads/packages/day-images/5fv7xRt3QvCLWhOgm3at8V3M1d4rizNPRlkF80MQ240823111804.jpeg"
                },
                {
                        "day": "Day 5: Phuket Departure",
                        "activity": "Drop at Phuket Airport",
                        "image": "/uploads/packages/day-images/xtydlioua0qzwawkiwqsc8ad9xbgucorhqsgeebp240823103812.jpg"
                }
        ]
},
    "singapore-tour-package": {
        "id": "37",
        "slug": "singapore-tour-package",
        "title": "Singapore Tour Package",
        "location": "3N Singapore",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 40999",
        "oldPrice": "\u20b9 45000",
        "image": "/uploads/packages/UyAaRcBgpPlkxEK3RrWnka7GXHewlsUUSR01LFce240827051128.jpg",
        "description": "",
        "highlights": [
                "Singapore: A vibrant, cosmopolitan city-state blending Asian and Western charm",
                "Gardens by the Bay, Marina Bay Sands, and Merlion iconic landmarks",
                "Foodie haven with street food and high-end cuisine.",
                "Multicultural heritage, safety, and efficiency make it a popular destination for families, business, and solo travelers seeking excitement and\u00a0exploration."
        ],
        "inclusions": [
                "3 Nights\u2019 Accommodation at Hotel Boss (Superior Queen/Twin Room) with Breakfast",
                "1 Way Airport to Hotel transfer on private basis  and 1 Way Hotel to Airport transfer on private basis",
                "City Orientation tour on Pvt Basis",
                "All Tours and Return Airport Transfers on private basis"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Services not mentioned in the inclusions",
                "5% GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Airport To Hotel",
                        "activity": "Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/tdvd3eqpvxi356tdznu6pkqhbqhmeonrtlaeow3l240828045838.jpg"
                },
                {
                        "day": "Day 2: Singapore Sightseeing",
                        "activity": "Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/b2kfjyuuzr1niazgqcarqvgzf0q7jq2mns4togyi240828051119.jpg"
                },
                {
                        "day": "Day 3: Sightseeing",
                        "activity": "Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/os4jfhltvcs62uibrqfxbyxpikcvjbsceyubcgrh240828051637.jpg"
                },
                {
                        "day": "Day 4: Departure",
                        "activity": "Transfer from Value Hotel Thomson to Changi Airport",
                        "image": "/uploads/packages/day-images/c7upqix8hpxdpcp0yezkiqq2cmm9vyy7kgtfg4vo240828051250.jpg"
                }
        ]
},
    "thailand-tour-package": {
        "id": "38",
        "slug": "thailand-tour-package",
        "title": "Thailand Tour Package",
        "location": "2N Phuket / 2N Pattaya / 2N Bangkok",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 52999",
        "oldPrice": "\u20b9 56000",
        "image": "/uploads/packages/ItyyJiyjRVdzXZVfc8LFGxEVs3MYHasDqQdY48Ff240822120710.jpg",
        "description": "",
        "highlights": [
                "Experience the ultimate Thailand tour with a visit to Phuket City, featuring the majestic Big Buddha and a thrilling Phi Phi Island tour by speedboat, complete with lunch, snorkeling, and access to the National Park.",
                "Enjoy the spectacular Alcazar Show with normal seating, followed by a private transfer to the famous Tiger Topia Sriracha, where you can take a photo with a tiger.",
                "Embark on an exciting Coral Island tour by speedboat with a delicious Indian lunch, followed by a visit to Nong Nooch Village for sightseeing, a cultural show, and a delicious Indian lunch.",
                "End your journey with a beautiful Chao Phraya Princess Dinner Cruise offering an Indian buffet, a fun-filled visit to Safari World &amp; Marine Park with lunch, and a 4-hour shopping spree in Bangkok with private transfer."
        ],
        "inclusions": [
                "Sightseeing",
                "Alcazar show",
                "Coral Island tour",
                "Safari world",
                "Pattaya Floating Market",
                "Safari World & Marine Park",
                "Phi Phi Island (Maya Beach) Speed Boat",
                "Nong Nooch Village(Entrance Fee +Sight-seeing bus + Lunch ( indian) + Show)",
                "Chao Phraya Princess Dinner Cruise Indian Buffet",
                "6 Breakfast 4 Lunch 1 Dinner Cruise",
                "All airport & hotel transfers"
        ],
        "exclusions": [
                "Visa",
                "Early check-in & late check-out.",
                "Lunch and Dinner for except mentioned.",
                "Any drinks & personal expenses",
                "Phone Call, Laundry, Mini Bar, Room Services",
                "Travel insurance",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Phuket Arrival",
                        "activity": "Half Day Phuket City Tour With Big Buddha Overnight stay at hotel",
                        "image": "/uploads/packages/day-images/degYoEE9F42aAXSXdyXun4DtxN7P3k6VFp862H9i240822045335.jpg"
                },
                {
                        "day": "Day 2: Phuket Sight seeing",
                        "activity": "Phi Phi Island (Maya Beach) Speed Boat With Lunch Included Snorkeling & National Park Fee(SIC) overnight stay at hotel",
                        "image": "/uploads/packages/day-images/AuxdJxKixDu4m5YzWbyxhnrYzceTCXFoEeHUuMPZ240822045408.jpg"
                },
                {
                        "day": "Day 3: Phuket to Pattaya",
                        "activity": "Alcazar Show(Normal Seat) with Private Transfer (Two way) Overnight stay at hotel Tiger Topia Sriracha Entrance + Photo Session With Tiger with Private Transfer (Two way)",
                        "image": "/uploads/packages/day-images/kBqUvXH9oIuZFB7tP6gvl1sM3l9QhlAD37fujAst240822045442.jpg"
                },
                {
                        "day": "Day 4: Pattaya sight seeing's",
                        "activity": "Coral Island Tour By Speed Boat With Indian Lunch (SIC)",
                        "image": "/uploads/packages/day-images/IkKho7Go12cAqkm56Jlyb6bGIP6vT7XcLJQ3YZFE240822045507.jpg"
                },
                {
                        "day": "Day 5: Bangkok",
                        "activity": "Nong Nooch Village(Entrance Fee +Sight-seeing bus + Lunch ( indian) + Show) Chao Phraya Princess Dinner Cruise Indian Buffet (SIC - Boat, PVT -Transfer) with Private Transfer",
                        "image": "/uploads/packages/day-images/yeOKLms9igHIAN0lfhylSQOI1Tg2PDoHBTyGcJFD240822045540.jpg"
                },
                {
                        "day": "Day 6: Bangkok sightseeing",
                        "activity": "Safari World & Marine Park With lunch(PVT)(Closed On Every Monday) with Private Transfer",
                        "image": "/uploads/packages/day-images/i6XfJtybQmVRWasTW34nonI5YZJWGkG6CEkMHeYg240822045606.jpg"
                },
                {
                        "day": "Day 7: Departure",
                        "activity": "04 hrs shopping at Bangkok with Private Transfer",
                        "image": "/uploads/packages/day-images/dpemsbndq97zmsxtynsqvuwdyxo6v5lijtb1nqmr240822045630.jpg"
                }
        ]
},
    "golden-triangle-package": {
        "id": "39",
        "slug": "golden-triangle-package",
        "title": "Golden Triangle Package",
        "location": "2N Delhi / 1N Agra / 2N Jaipur",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 23999",
        "oldPrice": "\u20b9 25950",
        "image": "/uploads/packages/aiwgy8tafcpau9dgatsmnlnk1yfvugillle8yzbh240905024128.png",
        "description": "",
        "highlights": [],
        "inclusions": [
                "With all transfer, driver allowances, parking, toll taxes, fuel",
                "with all \uf0b7 Airport/ Railway Station pickup drop off and sightseeing as per the itinerary",
                "24x7 Emergency Support",
                "MAPAI (05 Breakfast + 05 Dinner)"
        ],
        "exclusions": [
                "Heater charge will be extra.",
                "Travel Insurance",
                "Any meal other than specified",
                "Elephant Safari",
                "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: DELHI arrival",
                        "activity": "Namaste and Welcome to Capital of India Upon arrival atDelhi Airport / Station you will get a warm welcome and transfer to hotel and check in hotel. Evening free for shopping at local market. After that back to hotel and Overnight stay at Delhi.",
                        "image": "/uploads/packages/day-images/p8cuktnh2bgvyk0vij12dgkbac12ro4d8vhdignd241029111739.jpg"
                },
                {
                        "day": "Day 2: Delhi Sight seeing",
                        "activity": "Red Fort Raj Ghat - the site of the memorial to Mahatma Gandhi and Shanti Vana the memorial of Independent India\u2019s first Prime Minister, Pundit Jawaharlal Nehru. Government buildings \u2013 Parliament House and Presidents House and India Gate. Then visit Qutab Minar, built in 1193 in Persian style of architecture.",
                        "image": "/uploads/packages/day-images/aioakcchzcljbe4cy1schdu08whgbsrkpwbtsepo241029111822.jpg"
                },
                {
                        "day": "Day 3: AGRA",
                        "activity": "Taj Mahal Red Fort of Agra.",
                        "image": "/uploads/packages/day-images/jd65nigevd588in84z1tptilqb2huadrrun1cz7q241029111836.jpg"
                },
                {
                        "day": "Day 4: Agra \u00e2\u0080\u0093 Jaipur",
                        "activity": "Jaipur on the way stop a while we shall see Fatehpur Sikri (Capital of Mughal Empire during the reign of Mughal Emperor Akbar), Buland Darwaza (Gate of Magnificence) and Shrine of Sheikh Salim Chishti (magnificent example of Mughal Architecture in India). We touch Jaipur in the evening. Relax and enjoy the evening at Jaipur.",
                        "image": "/uploads/packages/day-images/2tqwffkgfsxzi13vic9lzcf15io0fc9gszo05hhu241029111855.jpg"
                },
                {
                        "day": "Day 5: Jaipur Sightseeing:-",
                        "activity": "visit Amber Fort, Jal Mahal, Hawa Mahal, City Palace, Jantar Mantar and Albert Hall Museum. Evening we shall take you around the city shop for true ethnic Indian Rajasthani dresses and silver jewelry, blue pottery, miniature paintings and Mojaris (leather shoes). For night stay we shall return back to the hotel in Jaipur.",
                        "image": "/uploads/packages/day-images/npsegl1cp90o95kv6uuib8sq4wsb8bbepeeuanej241029111918.jpg"
                },
                {
                        "day": "Day 6: Jaipur \u00e2\u0080\u0093 Delhi \u00e2\u0080\u0093 Departure",
                        "activity": "Morning after breakfast, check out from the hotel and transfer to Delhi as reach we shall escort you to the Delhi Airport / Railway Station. Tour ends with sweet memories..........",
                        "image": null
                }
        ]
},
    "goa-tour-package-1": {
        "id": "40",
        "slug": "goa-tour-package-1",
        "title": "Goa Tour Package",
        "location": "1N South Goa / 2N North Goa",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 12899",
        "oldPrice": "\u20b9 15000",
        "image": "/uploads/packages/3fb0vs45lzgs7p2uxdksfennausfud9ktfpzy1lv240905105628.jpg",
        "description": "",
        "highlights": [
                "Begin your Goa trip with local sightseeing and relaxation on iconic beaches like Baga and Calangute, soaking in the lively atmosphere and golden sands.",
                "Dive into Goa&rsquo;s rich history with visits to South Goa's cultural gems, and savor the local Goan cuisine while enjoying the vibrant nightlife.",
                "Discover Old Goa&rsquo;s UNESCO world heritage site, Basilica of Bom Jesus, and explore Panaji's beautiful colonial architecture and charming churches.",
                "Wrap up with some leisure beach time, exciting water activities, local shopping, and sightseeing before your departure, making the most of your Goa getaway."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Goa Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast.",
                "Children below 5 years will be complimentary."
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like boating charges and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Gala Dinner on New year & Xmas",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: ARRIVAL AT GOA",
                        "activity": "Arrive at Goa - Railway station/ Airport -  our cab and driver will be there to meet and greet you and proceed to South Goa. Start your Goan holiday with local Sight Seeing and relax on the Beach.",
                        "image": "/uploads/packages/day-images/3x2huwy2vqqzncxiwinlvutkxtnxzpicm4zokqfq241028040156.jpg"
                },
                {
                        "day": "Day 2: SOUTH GOA TO NORTH GOA",
                        "activity": "Spend the day exploring the vibrant beaches of Baga and Calangute Enjoy the buzzing nightlife and try some local Goan cuisine",
                        "image": "/uploads/packages/day-images/clhvdixvawncsuancharvnidz4vdf5w14bhl8gsd241028040212.jpg"
                },
                {
                        "day": "Day 3: SOUTH GOA TO NORTH GOA",
                        "activity": "historic and cultural attractions of South Goa Visit UNESCO world heritage site, Basilica of Bom Jesus in Old Goa Explore stunning churches & colonial architecture min Panaji, the capital of Goa",
                        "image": "/uploads/packages/day-images/pylg5sfoiwy2qqfaqqlw3ubms079maoo4fbadqbd241028040241.jpg"
                },
                {
                        "day": "Day 4: GOA DEPARTURE DAY",
                        "activity": "Enjoy some leisure time on beaches and do some water activities Local shopping and sightseeing based on return timing Back to hometown with Good memories of Goa Trip",
                        "image": "/uploads/packages/day-images/wd5p65ovunmulyvocizlyxkpdyphdidpyxxnsm3s241108110624.jpg"
                }
        ]
},
    "dubai-tour-package": {
        "id": "41",
        "slug": "dubai-tour-package",
        "title": "Dubai Tour Package",
        "location": "4N  Dubai",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 41600",
        "oldPrice": "\u20b9 56600",
        "image": "/uploads/packages/tq8vaehurvgrtwpipapx8i5mro0yy5ctudzkakxl240905095614.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "04 Nights stay with Breakfast",
                "Return Dubai Airport Transfers",
                "Dhow Cruise Dinner with Creek View \u2013 Sharing Basis",
                "Half Day Dubai City Tour",
                "Miracle Garden + Museum of the future",
                "Burj Khalifa 124th Floor Non-prime slot (subject to availability)",
                "Desert Safari with BBQ Dinner & Entertainment by 4x4 \u2013 Sharing Basis",
                "VAT Included",
                "All Tours & Transfers on PVT Basis"
        ],
        "exclusions": [
                "Expenses of personal nature (Telephone calls, Laundry etc.) any extra services will charge extra, Tips and Gratuities",
                "International Air Tickets",
                "Any items specifically not mentioned in the itinerary",
                "Any Meals which are not mentioned",
                "Tourism Fee",
                "Visa"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival to Airport",
                        "activity": "Arrival at Dubai Airport. Transfer to Hotel. Burj Khalifa visit + under zoo/aquerium Dubai Mall Visit Overnight in hotel",
                        "image": "/uploads/packages/day-images/WWmg5EF4BAbjPQv3oBXudBCnzK132oe0NJ7RbjXS240907050750.jpeg"
                },
                {
                        "day": "Day 2: City Tour",
                        "activity": "Full Day city Tour Dubai Frame and future musuem Overnight stay in hotel",
                        "image": "/uploads/packages/day-images/ecasjkzqeztmuy7dvucpkhaoarcavgv9mgo3u8g4241029121159.jpg"
                },
                {
                        "day": "Day 3: Further Sight Seeing",
                        "activity": "Breakfast at hotel Gold Souk Spice market and shopping Miracle Garden visit Deluxe Dow Cruise in Dubai Creek Overnight stay in hotel",
                        "image": "/uploads/packages/day-images/tmlblrhjoyrabs51sap2coa3dnponqxggqgwozfc241029121210.jpg"
                },
                {
                        "day": "Day 4: Further Dubai Exploration",
                        "activity": "Dessert Safari (belly dance with barbeque Dinner) Optional activies like sandboard skiing, camel ride and dune buggy Overnight stay in hotel",
                        "image": "/uploads/packages/day-images/vwmnvzwzbbzdjfojd77t4e88dtgmclb2dnlhq26v241029121225.jpg"
                },
                {
                        "day": "Day 5: Departure Day",
                        "activity": "Check Out. Transfer to Dubai Airport for Departure",
                        "image": "/uploads/packages/day-images/ed7scmvbpdhv63a5lagaychfomxz0qwbny3uqmf5241029121239.jpg"
                }
        ]
},
    "bali-tour-package": {
        "id": "42",
        "slug": "bali-tour-package",
        "title": "Bali Premium  Tour Package",
        "location": "6N Bali",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 46999",
        "oldPrice": "\u20b9 50000",
        "image": "/uploads/packages/228m8vaurkhynfrnzxaqra00gehpticlwehmnkuv240827104950.jpg",
        "description": "",
        "highlights": [
                "Experience Bali beauty with a Dolphin Dive &amp; Water Sports adventure, including a banana boat ride, normal parasailing, and jet skiing, followed by a visit to Uluwatu Temple for stunning ocean views.",
                "Explore Bedugul&rsquo;s iconic attractions, including Ulan Danu Temple, the majestic Handara Gate, and the breathtaking Tanah Lot Temple, all set against Bali&rsquo;s serene landscapes.",
                "Visit natural wonders like Tegenungan Waterfall and the Tegalalang Rice Fields, and immerse yourself in the spiritual beauty of Lempuyang Temple and Tirtha Gangga.",
                "Discover Bali&rsquo;s vibrant nightlife, from beach bars to lively clubs, with Kuta and Seminyak offering the best of entertainment after a day of adventure."
        ],
        "inclusions": [
                "Arrival + Transfer to Hotel.",
                "Bali Dolphin Dive & Water Sports ( Banana Boat + Normal Parasailing + Jetski )",
                "Departure + Transfer to Airport",
                "Breakfast included all days"
        ],
        "exclusions": [
                "Any expenses of personal nature.",
                "Anything not mentioned in inclusions \u2022 TCS"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival And Transfer To Hotel",
                        "activity": "Arrival + Transfer to Hotel.",
                        "image": "/uploads/packages/day-images/7alywzolhp3hbpms0rlpr2vtrdqazjwv20q5ufd8240827045207.jpg"
                },
                {
                        "day": "Day 2: Bali Dolphin Dive & Water Sports",
                        "activity": "Bali Dolphin Dive & Water Sports ( Banana Boat + Normal Parasailing + Jetski ) + Uluwatu Temple",
                        "image": "/uploads/packages/day-images/grhkpjwnvxxb6lyiumq8cbhfy4nd8pvnqyvqbpo0240827045654.jpg"
                },
                {
                        "day": "Day 3: Bedugul  Sightseeing",
                        "activity": "Bedugul (Ulan Danu Temple , Handara Gate & Tanah Lot Temple )",
                        "image": "/uploads/packages/day-images/vkjtxkiojpnekgowgh87dzpbppmlkwtmvetuwoku240827050158.jpg"
                },
                {
                        "day": "Day 4: Kintamani Volcano Tour",
                        "activity": "Tegenungan Waterfall ,Tegalalang Rice Field",
                        "image": "/uploads/packages/day-images/gx4usma93sxxqddiimfm7pz4iq6etri1yejw11oi240827050217.jpg"
                },
                {
                        "day": "Day 5: Lempuyang Temple",
                        "activity": "Lempuyang Temple ( Tirtha Gangga )",
                        "image": "/uploads/packages/day-images/oqe8oewxvd2lxiqptkitamkieqwczp01mqvectbh240827050242.jpg"
                },
                {
                        "day": "Day 6: Day at Leisure",
                        "activity": "10. Bali's vibrant nightlife scene offers everything from beach bars to clubs, with Kuta and Seminyak being popular spots.",
                        "image": "/uploads/packages/day-images/7tzc3yvvpboba5roohk34px0eft8fxb790k3e5rd240827050522.jpg"
                },
                {
                        "day": "Day 7: Departure + Transfer to Airport .",
                        "activity": "Departure day , Transfer to Airport , fly with sweet memories of Bali Trip",
                        "image": "/uploads/packages/day-images/yybh6ht9aogxezrxhr7z10vlvrazfuw7sbzzmo2j240827050537.jpg"
                }
        ]
},
    "thailand-tour-package-premium": {
        "id": "43",
        "slug": "thailand-tour-package-premium",
        "title": "Thailand  Delight",
        "location": "2N Pattaya / 1N Bangkok",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 22000",
        "oldPrice": "\u20b9 24500",
        "image": "/uploads/packages/U58KmFr2waHgoZCqz2YiipHY43bHX1lDH2R4cWqg240822120232.jpg",
        "description": "",
        "highlights": [
                "Discover Thailand's beauty as you visit the Sri Racha Tiger Zoo, where you can get close to exotic animals and enjoy thrilling shows.",
                "Enjoy the vibrant Pattaya Floating Market, where you can shop for local goods and experience authentic Thai culture.",
                "Witness the spectacular Alcazar Show in the evening, followed by an exciting Coral Island tour by speed boat.",
                "Explore Bangkok&rsquo;s rich heritage with a memorable temple tour, taking in the city&rsquo;s iconic landmarks and spiritual beauty."
        ],
        "inclusions": [
                "3 Nights hotel accomadtion",
                "03 breakfasts + 02 Lunches + 3 Dinners",
                "Sriracha tiger zoo entrance with arrival breakfast",
                "Alcazar show",
                "Coral Island tour by speed boat",
                "Safari world and marine park",
                "Bangkok Temple tour",
                "Sightseeing on private vehicle",
                "All airport & hotel transfers"
        ],
        "exclusions": [
                "Visa",
                "Early check-in & late check-out.",
                "Lunch and Dinner for except mentioned.",
                "Any drinks & personal expenses",
                "Phone Call, Laundry, Mini Bar, Room Services",
                "Travel insurance",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bangkok To Pattaya",
                        "activity": "After arrival, transfer you to the Hotel in Pattaya Visit Sri Racha Tiger Zoo Hotel check in at 14.00 Evening Alcazar Show",
                        "image": "/uploads/packages/day-images/iqQbznr0fs8ljHg3XwiL6K0DbXPrBnTeZ8kSPB9r240822103305.jpg"
                },
                {
                        "day": "Day 2: Pattaya",
                        "activity": "Coral Island Tour by Speed Boat Pattaya Floating Market",
                        "image": "/uploads/packages/day-images/Nv4ThNsbOhCldaX46e5bmWXuTwacUH8I7WVIC7qL240822103331.jpg"
                },
                {
                        "day": "Day 3: Pattaya To Bangkok",
                        "activity": "Safari World with Marine Park",
                        "image": "/uploads/packages/day-images/k9mqReT0ve7wC23IizhlEt1WoEIxI3Uj07QtKdlY240822103411.jpg"
                },
                {
                        "day": "Day 4: Bangkok Departure",
                        "activity": "After breakfast check out from Hotel Bangkok Temple Tour Transfer to DMK Airport & Fly to Cochin",
                        "image": "/uploads/packages/day-images/e60vHfJ262gEp1xeyCoNCyXVdZu2RIBlp2sEeVzT240822105646.jpg"
                }
        ]
},
    "bali-tour-plan": {
        "id": "44",
        "slug": "bali-tour-plan",
        "title": "Bali  Budget Tour Plan",
        "location": "3N Bali",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 16999",
        "oldPrice": "\u20b9 19000",
        "image": "/uploads/packages/xe9jtsf7cqwsux9oqjjcp5btcdtpwcyduqxksib9240827103944.jpg",
        "description": "",
        "highlights": [
                "Begin your Bali trip with the Kintamani Volcano Tour, featuring breathtaking views of Mount Batur and Lake Batur, along with a delicious Indonesian buffet lunch overlooking the volcano.",
                "Discover Balinese culture with visits to Batubulan Village for handmade batik painting, Mas Village for exquisite wood carvings, and a highland coffee plantation, where you can try various coffees including the renowned Luwak coffee.",
                "Explore the famous Tegalalang rice terraces and enjoy a stroll through Ubud, stopping at the Ubud Handicraft Village, Ubud Royal Palace, and Ubud Market for unique Balinese souvenirs.",
                "Visit Uluwatu Temple, perched on a cliff 100 meters above the ocean, and witness a stunning sunset along with the sacred temple&rsquo;s resident monkeys, known to protect the temple."
        ],
        "inclusions": [
                "Arrival + Transfer to Hotel. Bali Dolphin Dive & Water Sports ( Banana Boat + Normal Parasailing + Jetski ) Departure + Transfer to Airport Breakfast included all days"
        ],
        "exclusions": [
                "Any expenses of personal nature. Anything not mentioned in inclusions \u2022 TCS"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival",
                        "activity": "Pick up at the airport & transfer to hotel",
                        "image": "/uploads/packages/day-images/kvezchngvtmdpypuqcbwikutje54syinydvhwftu240827044349.jpg"
                },
                {
                        "day": "Day 2: Bali Sightseeing",
                        "activity": "KINTAMANI VOLCANO Tour, visit Traditional handmade BATIK PAINTING in Batubulan Village, visit PAINTING and WOOD CARVING at MAS village, continue to a highland to visit COFFEE PLANTATION, knowing different kind of coffee, including LUWAK Coffee the most famous coffee in Bali besides the authentic Balinese coffee and its coffee powder making process. Time to taste some different kind of Indonesian Coffee on site. The Highlight is to see nice view of MOUNT BATUR & and its sister LAKE BATUR + Indonesian buffet Lunch will be served at the local restaurant, on the way back will stop to view spectacular rice terraces in TEGALALANG Village. Next visit to UBUD HANDICRAFT VILLAGE and the same time to complimentary visit to UBUD ROYAL PALACE nearby the Ubud Market. Shopping places are available on this tour and You may spend your time for shopping of any kind of Balinese handicraft products good for souvenir and or for collection. (include Lunch)",
                        "image": "/uploads/packages/day-images/sr3bsfg3ibrmj1qcneg8c4kkv0omrgfupqxbr2w2240827044413.jpg"
                },
                {
                        "day": "Day 3: WATER SPORT Activity",
                        "activity": "One round of BANANA BOAT ride (Optional water  Sports can be taken on the spot on personal account, such as Adventure parasailing, jet ski, flying fish, snorkeling, sky tube, sea walker, diving etc ).  Noon Transfer for Indian Food set lunch at INDIAN Restaurant in Nusa Dua or in Seminyak. After lunch : ULUWATU TEMPLE TOUR. Visit to ancient Hindu temple located on top of the cliff jutting out to the ocean over 100 meters above the sea level. It is a spectacular view from the splash of the wave all the times under the natural rocky cliff combining with the stunning Sunset. Many holy monkeys around the temple courtyard which is believed as guardian of the temple. Then back to hotel. (Include Lunch)",
                        "image": "/uploads/packages/day-images/5jhensc9uvfp2sd4jx6lgrlyxicsrnvlqs7nmtli240827044552.jpg"
                },
                {
                        "day": "Day 4: Departure",
                        "activity": "After breakfast. Free arrangement and departure transfer to Airport",
                        "image": "/uploads/packages/day-images/zrffbnrvtdnmmhb05zbrheonu28xwglmkvux5553240827044656.jpg"
                }
        ]
},
    "dubai-package": {
        "id": "45",
        "slug": "dubai-package",
        "title": "Dubai Package",
        "location": "3N Dubai",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 38900",
        "oldPrice": "\u20b9 53200",
        "image": "/uploads/packages/vzf3nf4it2udlr0djd7b2qwaqnlxtwcsc6osz810240905095529.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Dubai Creek Dhow Cruise with Dinner ( 4* Catering) on SIC Basis - Z1",
                "Burj Khalifa 124 Floor (Non Prime) 09:00 - 14:30 & 19:00 until closing - Z1 with Private Transfer (One way).",
                "Deluxe Desert Safari with BBQ Dinner on SIC",
                "Museum Of The Future Entry Ticket - Z1 with Private Transfer (Two way)",
                "One way | Dubai Airports ( T1 | T2 | T3) - DXB Zone 1 | Qty:1 - 07 Seater Car",
                "One way | DXB Zone 1 - Dubai Airports ( T1 | T2 | T3) | Qty:1 - 07 Seater Car"
        ],
        "exclusions": [
                "Anything Other than Inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: City Tour",
                        "activity": "Dubai Creek Dhow Cruise with Dinner ( 4* Catering) on SIC Basis - Z1 Dubai Half Day Orientation city tour on SIC Basis Burj Khalifa 124 Floor (Non Prime) 09:00 - 14:30 & 19:00 until closing - Z1 with Private Transfer",
                        "image": "/uploads/packages/day-images/qfb9qkhplb6sgieahn56o61p68abd68idytmebgd241029120432.jpg"
                },
                {
                        "day": "Day 2: Tour",
                        "activity": "Dubai Half Day Orientation city tour on SIC Basis Burj Khalifa 124 Floor (Non Prime) 09:00 - 14:30 & 19:00 until closing - Z1 with Private Transfer",
                        "image": "/uploads/packages/day-images/c2rg2li5qkahwwyzhzcighrz9ujym3gmdiytqnju241029120525.jpg"
                },
                {
                        "day": "Day 3: Desert Safari",
                        "activity": "Deluxe Desert Safari with BBQ Dinner on SIC Museum Of The Future Entry Ticket - Z1 with Private Transfer",
                        "image": "/uploads/packages/day-images/ik5zg2ujrfenajymzxkdv66ksyjbhzaadtfcpm9k241029120535.jpg"
                },
                {
                        "day": "Day 4: Departure Day",
                        "activity": "Drop to Airport",
                        "image": "/uploads/packages/day-images/nyft88qbldgjrv3grdthtm4wjnrexlzddcdeq93h241029120609.jpg"
                }
        ]
},
    "andaman-packages": {
        "id": "46",
        "slug": "andaman-packages",
        "title": "Andaman Packages",
        "location": "6N  Andaman",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 30999",
        "oldPrice": "\u20b9 34000",
        "image": "/uploads/packages/sn5u9loaltgduhnit3mwbvi9j6kqwztfark0i6zp240904050028.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Accommodation in rooms as mentioned in the itinerary.     \u00fc  Transfer to Inter Island in Cruise ITT Majestic (Silver Class) / Green Ocean 2 (Premium Class) / similar.     \u00fc  All entry tickets, ferry tickets, boat tickets of sightseeing mentioned in the itinerary.     \u00fc  Exclusive Ac vehicle for transfers & sightseeing. Please brief to the guests that the vehicle will not be at disposal, it will be available to the guests as per itinerary only (point to point basis).     \u00fc  Rates are valid for INDIAN NATIONALS only."
        ],
        "exclusions": [
                "\u00fb  Air Fare / Train Fare, Camera fees, Portarage, Insurance, Tips & Gratuity, Any personal expenses, Mineral/soft/hard drinks, Extra usage of vehicle, Guide.     \u00fb  Vehicle is not at disposal at any of the islands.     \u00fb  Any personal expenses .Room service and special orders. Alcoholic and non-alcoholic beverages.     \u00fb  Any cost arising due to acts of God, terrorism or threats of terrorism, civil disorder, strikes, lockouts, server and network failure, riots, acts of war, cyclones, tsunami, earthquakes, inclement weather conditions, any other natural disasters, disease or medical epidemics or outbreaks, curtailment of transportation facilities, change/cancellation in timings of ferries/flights, change in travel advisories by competent authorities, fire and explosions.etc (to be borne by the client, should be directly payable on the spot).     \u00fb  Anything which is not included in the inclusion.     \u00fb  Guide Charges.     \u00fb  Additional sightseeing or extra usage of vehicles, other than mentioned in the itinerary.     \u00fb  Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.     \u00fb  We will not accept any responsibility for the loss or damage of any personal belongings."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Port Blair \u00e2\u0080\u0093 Corbyn\u00e2\u0080\u0099s Cove Beach \u00e2\u0080\u0093 Cellu",
                        "activity": "\u00d8  Assistance on arrival at Veer Savarkar Airport, Port Blair and You will be taken to your hotel where you rest and relax.     \u00d8  Proceed to Corbyn's Cove Beach.     \u00d8  Then visit the Cellular Jail, formerly known as Kala Pani.     \u00d8  Later attend the Light and Sound Show at Cellular Jail.     \u00d8  Stay overnight at Port Blair.",
                        "image": "/uploads/packages/day-images/uyjbiuyln7hk94f1uh5cu5atu0opzvsr0e3onhxl241029120808.jpg"
                },
                {
                        "day": "Day 2: Ross Island and North Bay (Coral Island)",
                        "activity": "\u00d8  After breakfast, an excursion trip to Netaji Subhash Chandra Bose Island (Ross Island).     \u00d8  Then you visit North Bay Island (Coral island). It is popular for water-based adventure activities such as Scuba Diving, Snorkeling, Glass Bottom Boat ride etc (for extra cost).     \u00d8  Stay overnight at Port Blair.",
                        "image": "/uploads/packages/day-images/tdjs586ztbxhpyve7h6yz41urvkkwkuc6gmqglm0241029120834.jpg"
                },
                {
                        "day": "Day 3: Port Blair \u00e2\u0080\u0093 Havelock Island \u00e2\u0080\u0093 Radhanaga",
                        "activity": "\u00d8  As per the ferry schedule, get transferred to Swaraj Dweep (Havelock Island).     \u00d8  Enjoy your afternoon at the World Famous Radhanagar Beach (Beach number 7) 'Best Beach in Asia'.     \u00d8  Stay overnight at Havelock.    Note: Ferry will be issued as per the availability of tickets. Sightseeing will be covered as per ferry timings.",
                        "image": "/uploads/packages/day-images/zeaisn2xjn1bzuvattl95p2ewl2cttt9exxipgbp241029120851.jpg"
                },
                {
                        "day": "Day 4: Havelock \u00e2\u0080\u0093 Elephanta Beach",
                        "activity": "After breakfast, visit Elephanta Beach (Complimentary Snorkeling by Boat Association).     \u00d8  Stay overnight in Havelock.",
                        "image": "/uploads/packages/day-images/yxinvakixqv3ololog3rmupzzjflqes8dk7a0nml241029120902.jpg"
                },
                {
                        "day": "Day 5: Havelock \u00e2\u0080\u0093 Neil Island \u00e2\u0080\u0093 Bharatpur Beach",
                        "activity": "After breakfast, get transferred to Shaheed Dweep (Neil Island).    \u00d8  Then you visit Bharatpur Beach, ideal for Snorkeling and glass bottom boat rides (for Extra cost).    \u00d8  Later in the afternoon visit Laxmanpur Beach for magnificent sunset viewing.    \u00d8  Evening is free or on your own. Stay overnight at Neil Island.    Note: Ferry will be issued as per the availability of tickets. Sightseeing will be covered as per ferry timings.",
                        "image": "/uploads/packages/day-images/38x9gbqyranbhwtjjb64pqyisnx3jqpwgo3lomia241029120927.jpg"
                },
                {
                        "day": "Day 6: Neil Island \u00e2\u0080\u0093 Howrah Bridge \u00e2\u0080\u0093 Port Blair",
                        "activity": "Post breakfast check out from the hotel and visit Howrah Bridge, a natural rock formation.     \u00d8  Then transfer to Port Blair. Stay overnight at Port Blair.",
                        "image": "/uploads/packages/day-images/so417yn3thvecbxz0bacvytnvxu0rgr66kjnkq1t241029121020.jpg"
                },
                {
                        "day": "Day 7: Drop to Airport",
                        "activity": "After breakfast, proceed to the airport to return home with sweet memories of this exotic destination.",
                        "image": "/uploads/packages/day-images/u8hlgn1szwfrko4cb0yo0yam74gglqvkpptmgmrq241108125016.jpg"
                }
        ]
},
    "summer-special-assam-meghalaya-packages": {
        "id": "47",
        "slug": "summer-special-assam-meghalaya-packages",
        "title": "Assam Meghalaya Tour",
        "location": "3N SHILLONG / 1N GUWAHATI",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 26999",
        "oldPrice": "\u20b9 29500",
        "image": "/uploads/packages/7zw7tf5mlcanzfebdwxti9b3pmhjvoteniv5cozl240904043422.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "MAPAI (04 Breakfast + 04 Dinner)",
                "With all transfer, driver allowances, parking, toll taxes, fuel",
                "All sightseeing"
        ],
        "exclusions": [
                "Any airfare/ Train fare",
                "Check in & Check out time 12:00 noon",
                "Travel Insurance",
                "Entry fee & Guide charge",
                "Please Note That CarrierIs Not Allowed In Northeast So You",
                "Any expenditure personal kindof nature",
                "Any meal other than specified",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Guwahati \u00e2\u0080\u0093 Shillong",
                        "activity": "On arrival at Guwahati Airport/Railway In the evening you are free to explore local areas like near the golf course, (by Own) \u2013 Walking Distance. Overnight, stay at Shillong.",
                        "image": "/uploads/packages/day-images/xc589ppm6hkdqbuert58lp3yg7f1xj2q1lfmocjq241029113131.jpg"
                },
                {
                        "day": "Day 2: Shillong \u00e2\u0080\u0093 Cherrapunji \u00e2\u0080\u0093 Shillong",
                        "activity": "Post breakfast visit Cherrapunji \u2013 the wettest place on the earth. visit Mawkdok Valley \u2013 a very prominent sightseeing spot. Nohsngithiang Falls, Seven Sisters Falls is the next attraction on the way. Upnext are Mawsmai Cave and Eco Park from Eco Park, you also catch a glimpse of Sylhet plains Bangladesh. Enjoying the scenic route, you will back to Shillong hotel for a restful sleep.",
                        "image": "/uploads/packages/day-images/azsljgylq2rpqoq9cz5f6wkehctcvy1p5o5ghafk241029113158.jpg"
                },
                {
                        "day": "Day 3: Excursion to Mawlynnong & Dawki",
                        "activity": "After an early breakfast drive to Mawlynnong \u2013 \u201cAsia\u2019s Cleanest Village\u201d. Later proceed to Dawki, a small town near India Bangladesh border. taking view of the Umangot River. Evening drive back to Shillong. Stay overnight at your hotel in Shillong.",
                        "image": "/uploads/packages/day-images/owf9jpxf9blyqvgxwmfash7msedon9tfk0dksgbo241029113246.jpg"
                },
                {
                        "day": "Day 4: Shillong \u00e2\u0080\u0093 Guwahati",
                        "activity": "Morning after breakfast check out from the hotel and visit The mesmerizing Lady Hydra Park, Ward\u2019s Lake and Cathedral Catholic Church. After sightseeing transfer to Guwahati. Overnight stay at Guwahati.",
                        "image": "/uploads/packages/day-images/c7jd9fsri4vzyuzvc911agksyc9yrue40vflkeek241029113324.jpg"
                },
                {
                        "day": "Day 5: Guwahati Sightseeing \u00e2\u0080\u0093 Departure:-",
                        "activity": "Morning after breakfast check out from the hotel and visit Saraighat Bridge, and Kamakhya Temple. After sightseeing we shall escort you to Guwahati Airport /Railway Station. Tour concludes, Tour End with sweetmemories..............",
                        "image": "/uploads/packages/day-images/at5ic6nsx3fkibwwjecbmgsz8qu9nvzrsb6jmwtn241029113344.jpg"
                }
        ]
},
    "varanasi-package": {
        "id": "48",
        "slug": "varanasi-package",
        "title": "Varanasi Package",
        "location": "2N Varanasi / 1N Ayodya",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 21999",
        "oldPrice": "\u20b9 23900",
        "image": "/uploads/packages/qi7pkr3vs0suxdbur0ua8iidcuqzfurzuls3ugyb240904042707.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "02 airport transfers by a A/c vehicle exclusively Accommodation in mentioned or similar hotels"
        ],
        "exclusions": [
                "Any airfare/ Train fare  \u00b7         Check in time 14:00 & check out time 11:00 morning  \u00b7         Any adventure activities, any personal expenses  \u00b7         Anything which is not mention on tour package inclusion  \u00b7         Travel insurance  \u00b7         Any meal other than specified  \u00b7         Any expenditure personal kind of nature  \u00b7         Boating, Pind Dan, Monuments Entry Fees, Tour Guide  \u00b7         Any increase in the taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Varanasi & Evening Aarti",
                        "activity": "Pick up from Varanasi railway station and transfer to the hotel (early check-in & late check-out is subject to availability) for the check-in process. Evening observe the Holy worship or the Aarti custom on the Ghats of The Ganges. The Varanasi Ganga Aarti happens every day at blessed Dasaswamedh Ghat. After Aarti returned back to the hotel and stayed overnight in Varanasi.",
                        "image": "/uploads/packages/day-images/bja2ub7ndg3wsvmz3ag5bff3fnine8rg66tmmr7g241029125424.jpg"
                },
                {
                        "day": "Day 2: Varanasi Sightseeing",
                        "activity": "You will be taken on an early morning to Ganga Ghat for Holy dips. After that you will be taken on a temple tour to enjoy the morning rituals in famous temples like Kashi Vishwanath Temple, Kaal Bhairav Temple, B.H.U., Sankat Mochan Temple, Tulsi Manas Mandir, & Tridev Temple. Later, you will be taken back to the hotel for breakfast and rest. By early afternoon, you will be taken on a road trip to Sarnath. Sarnath is the spot where Lord Buddha delivered his sermon after getting enlightenment. Top attractions visited in Sarnath are Archeological Museum, Buddha Temples, Stupas and others. After sightseeing, I returned back to the hotel and stayed overnight stay in Varanasi.",
                        "image": "/uploads/packages/day-images/0dspgj9oukxonxptkamttivfual1e1hyl4m0naku241029110938.jpg"
                },
                {
                        "day": "Day 3: Varanasi \u00e2\u0080\u0093 Ayodhya Sightseeing",
                        "activity": "Morning after breakfast, check out from the hotel and transfer towards Ayodhya as we reach visit Sri Ram Janma-Bhoomi, Dasarat Mahal, Kanak Mahal, Hanuman Garhi Temple. After sightseeing, check in at the hotel and overnight stay in Ayodhya.",
                        "image": "/uploads/packages/day-images/vu2wvxumxxcni0cgimjf7gtjrrwu83nzdf2uqgtv241029110950.jpg"
                },
                {
                        "day": "Day 4: Ayodhya \u00e2\u0080\u0093 Departure",
                        "activity": "Morning after breakfast check out from the hotel and we shall escort you to Ayodhya Airport. Tour ends with sweet memories",
                        "image": "/uploads/packages/day-images/5tanxe1jod1kcgykwpmc6o6wfbzhh0mqmkdybror241029124649.jpg"
                }
        ]
},
    "special-6n7d-bhutan-package": {
        "id": "49",
        "slug": "special-6n7d-bhutan-package",
        "title": "Bhutan Package",
        "location": "2N PHUENTSHOLING / 1N THIMPHU/ 1N PUNAKHA /2N PARO",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 44999",
        "oldPrice": "\u20b9 48000",
        "image": "/uploads/packages/lsmdanwguapamdapyzttjtog1a5wl6tawqdpxz0o240904035156.png",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Accommodation",
                "MAPAI (06 Breakfast + 06 Dinner)",
                "Bhutan tax",
                "With all transfer, driver allowances, parking, toll taxes, fuel",
                "All Airport/ Railway Station pickup dropoff andsightseeing",
                "Professional English Speaking Tour Guide within Bhutan",
                "Above rate is valid forIndian nationals only.",
                "01 Bottle mineral water per head per day.",
                "Bhutan permits (on arrival).",
                "01 Tourist Sim Card on Arrival"
        ],
        "exclusions": [
                "GST",
                "Extras of personal nature such as personal tips, laundry charges, additional tour charges.",
                "Does not include any Lunch & Evening Tea/snacks.",
                "Does not include Hard drinks or liquor or soft drinks/juices",
                "Does not include Entrance Fees at Monasteries / Monuments /Museums etc.",
                "Air Fare / Train Tickets",
                "Monuments Entr\u00e9e fees"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Pick up from IXB Airport / NJP Station -",
                        "activity": "On arrival pick up from IXB Airport/NJP Railway Station Drive to Phuentsholing. It is a thriving commercial center on the northern edge of the Indian Plains. Overnight stay at the hotel in Phuentsholing.",
                        "image": "/uploads/packages/day-images/csllsd5xkppcplyguhqxi2wixeommj6fx8uiuce5241029122238.jpg"
                },
                {
                        "day": "Day 2: Phuentsholing - Thimphu",
                        "activity": "drive to Thimphu via the wonderful mystic town Gedu, Which is about 9000 ft above the sea and Chukha Dam. On the way visit Crocodile Park, Kharbondi Gumpha, Wankha waterfalls and halt at Chojum to take photographs of the confluence of two rivers of Bhutan. overnight stay at the hotel in Thimphu.",
                        "image": "/uploads/packages/day-images/se4hj1ctx8q516kfejndkgomsgwx9wq8z4iulmyt241029122301.jpg"
                },
                {
                        "day": "Day 3: Thimphu Local sightseeing \u00e2\u0080\u0093 Punakha",
                        "activity": "After breakfast, Visit the Kuensel Phodrang (Buddha Statue). Located at a short drive from Thimphu City Centre, Kuenselphodrang offers a good overview of the Thimphu valley. The largest statue of Buddha in the country sits here which houses over one hundred thousand smaller Buddha statues. Then visit the National Memorial Chorten built in the memory of the Third King of Bhutan. Folk Heritage Museum. visit Sangaygang View Point, Changangkha Monastery and the Takin Preserve Centre. Takin is the national animal of Bhutan. In the evening visit Tashichho Dzong (Fortress of the Glorious Religion). Overnight stay at hotel in Punakha.",
                        "image": "/uploads/packages/day-images/5bdtf2x56ylearhgmzf7rsj0r03mjnvstt9b0shf241029122425.jpg"
                },
                {
                        "day": "Day 4: Punakha Local sightseeing \u00e2\u0080\u0093 Paro",
                        "activity": "After breakfast, check out from hotel and visit Punakha Dzong - built in 1637 by Zhabdrung Ngawang Namgyal. The Dzong was named Druk Pungthang Dechen Phodrang (Palace of Great Happiness). And also visit Punakha Suspension Bridge. After Punakha sightseeing transfer to Paro via Dochula-Pass. As reach check in to the hotel. Evening free for leisure. Overnight stay at Paro.",
                        "image": "/uploads/packages/day-images/pkrrz550z8gxkymu4ndc4rezeee14d5hezzwkcmk241029122414.jpg"
                },
                {
                        "day": "Day 5: Paro Local sightseeing",
                        "activity": "After breakfast, Visit Nya-mey Zam and Dungtse Lhakhang, Kila Gompa, Druk Choeding, Tamchog Ihakhang, Ringpung Dzong, view of Taktsang Monastery, Ta Dzong Overnight stay at hotel in Paro \u201cTiger Nest Monastery\u201d.",
                        "image": "/uploads/packages/day-images/ch3k5wyow4fya16bj7dp1p5ctlpfbklydjpwrhv4241029122457.jpg"
                },
                {
                        "day": "Day 6: Paro \u00e2\u0080\u0093 Phuentsholing",
                        "activity": "After breakfast check out of your hotel and transfer to the Phuentsholing, On the way visit Paro Airport View Point and local market. overnight stay at Phuentsholing.",
                        "image": "/uploads/packages/day-images/4ooq9fhxakc48kjvuo3xuqrjfh0pvwt09wt6pg5e241029122511.jpg"
                },
                {
                        "day": "Day 7: Phuentsholing \u00e2\u0080\u0093 Bagdogra Airport/NJP Sta",
                        "activity": "Early morning after breakfast check out from the hotel and transfer to Bagdogra Airport \\NJP Railway Station.",
                        "image": null
                }
        ]
},
    "leh-ladakh-tour-package": {
        "id": "50",
        "slug": "leh-ladakh-tour-package",
        "title": "Leh Ladakh Tour Package",
        "location": "3N Leh 2N Ladakh",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 16999",
        "oldPrice": "\u20b9 22000",
        "image": "/uploads/packages/k7ksmqay9clwp5rfdoeab7b3ucmsrsijxaxstr6d240904032017.png",
        "description": "",
        "highlights": [],
        "inclusions": [
                "05 Nights\u2019 Accommodation in Hotel",
                "Accommodation : Double Sharing Basis",
                "Meal Plan : MAPAI (05 Breakfast + 05 Dinner)",
                "With all transfer, driver allowances, parking, toll taxes, fuel and with all",
                "Airport/ Railway Station pickup drop off and sightseeing as per the itinerary",
                "Inner Line permit Wild Life Fees"
        ],
        "exclusions": [
                "Any airfare/ Train fare",
                "Check in time 14:00 & check out time 11:00",
                "Any Adventure activities, any personal expenses, etc.",
                "Anything which is not mention on package inclusion",
                "Travel Insurance",
                "Any meal other than specifiedAny meal other than specified",
                "Any expenditure personal kind of nature",
                "Room Heater Charges",
                "Jeep Safari",
                "Monuments entry fees, Tour Guide, Boating Etc.",
                "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Leh Airport",
                        "activity": "Leh Market, Leh Palace and Shanti Stupa",
                        "image": "/uploads/packages/day-images/y7oxr0i4ny099r7aljt0hfpnsmmjtnd8l2lazzfj241028041132.jpg"
                },
                {
                        "day": "Day 2: Leh Local (Sham Valley):-",
                        "activity": "Magnetic Hill, Hall of Fame, Gurudwara Pathar Sahib and The Sangam of Zanskar & Indus River.",
                        "image": "/uploads/packages/day-images/xfbhreoujjvndgbcedlta743bmh65mep5btlesza241028041227.jpg"
                },
                {
                        "day": "Day 3: Leh to Nubra Valley (125 KM / 5-6 Hrs):-",
                        "activity": "journey to Nubra Valley. we will pass through the highest motorable road in a world that is the Khardungla Pass. After visiting Hunder, if time permits, we will go to the Diskit Monastery.",
                        "image": "/uploads/packages/day-images/xoeisgij5zsxgxtynl2ww58nh04jjedkpp4u5lus241028041252.jpg"
                },
                {
                        "day": "Day 4: Nubra to Pangong via Shyok (150 KM / 06",
                        "activity": "From the Agyam Bridge, we will take the left route which leads us to the villages of Shyok and Durbuk. Drive to Pangong Lake (3 Idiot Shooting point) on the Indo-China border. Enjoy the scenic beauty of the Shyok river on one side and the Mountains on another side.",
                        "image": "/uploads/packages/day-images/ntuqg0uvdsuhgmi0ymlnlkpxgkqls7l91v8jx8fz241029124042.jpg"
                },
                {
                        "day": "Day 5: Pangong Lake to Leh (155 KM / 05 - 06 Hr",
                        "activity": "Morning to the beautiful Pangong Lake and enjoy breakfast near the Lake. Start your drive back and pass through the numerous villages on the way like Durbuk, Tangtse many more on the way Leh, take a short halt at Changla Pass to enjoy a cup of hot steaming tea.",
                        "image": "/uploads/packages/day-images/vofypibc46i5nsydbyorcupt2afta8en2crpaa9k241029123928.jpg"
                },
                {
                        "day": "Day 6: Day 06: Leh Airport Departure:-",
                        "activity": "Post breakfast, depart for Leh airport. End your trip with memories to cherish forever.",
                        "image": "/uploads/packages/day-images/oiuf7pwxdj7mh2tlpckiufwb9ii15tigdg9aoeie241028041350.jpg"
                }
        ]
},
    "special-gangtok-darjeeling-packages": {
        "id": "51",
        "slug": "special-gangtok-darjeeling-packages",
        "title": "Gangtok Darjeeling Package",
        "location": "2N GANGTOK / 2N DARJEELING",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 23999",
        "oldPrice": "\u20b9 26500",
        "image": "/uploads/packages/klidzvonwfqlp6nyvhmnkkon6g6cobwkxaxxloxn240904040120.png",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Accommodation",
                "MAPAI (04 Breakfast + 04 Dinner)",
                "With all transfer, driver allowances, parking, toll taxes, fuel",
                "with all  Airport/ Railway Station pickup drop off and sightseeing",
                "24x7 Emergency assistance"
        ],
        "exclusions": [
                "Any Airfare/ Train fare",
                "Check in & Check out time 02:00 noon/11:00am",
                "Any Adventure activities, any personal expenses, etc.",
                "Anything which is not mention on package inclusion",
                "Travel Insurance",
                "Any meal other than specified",
                "Any expenditure personal kind of nature",
                "Darjeeling Toy Train (Joy Rides )",
                "Room heater or blower in room",
                "Vehicle for Nathula Pass",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Bagdogra Airport \u00e2\u0080\u0093 Gangtok",
                        "activity": "Welcome on arrival at Bagdogra Airport, meet our representative and transfer to Gangtok, Overnight stay at the hotel in Gangtok.",
                        "image": "/uploads/packages/day-images/stqao0gv7n9io0afi0bjwetghbjkaqvsqkqkj4mk241029112025.jpg"
                },
                {
                        "day": "Day 2: Excursion of Baba Mandir & Tsongmo Lake",
                        "activity": "After breakfast, proceed to Tsongmo Lake  and Baba Mandir, Nathula Pass, the entry point to China termed as the \u201cSilk Route\u201d and remains frozen for most parts of the year. Nearby is the Sacred Baba Mandir, which is highly acknowledged for its spiritual worth. overnight stay at the hotel.",
                        "image": "/uploads/packages/day-images/ln1dskcvqqr4gb2pamoatgmdwvzoqvenh0iwertl241029112041.jpg"
                },
                {
                        "day": "Day 3: Gangtok Sightseeing \u00e2\u0080\u0093 Darjeeling",
                        "activity": "Morning after breakfast check out from the hotel and visit Ganesh Tok, Tashi View Point, Bakthang Waterfall, Ridge Flower Park, Lhasa Falls & Do-Drul Chorten Stupa. After sightseeing transfer to Darjeeling as reach check in at hotel and overnight stay in Darjeeling hotel.",
                        "image": "/uploads/packages/day-images/0y8ygvy8zyu3kaz3pzmgtidn5amob2n4cwahem5e241029112050.jpg"
                },
                {
                        "day": "Day 4: Darjeeling Sightseeing",
                        "activity": "Early morning proceeds to Tiger Hill. Being the highest point of Darjeeling, Tiger Hill visited early in the morning Imagine yourself standing in front of the mighty Kanchenjunga peak, one of the oldest Tibetan Buddhist Monasteries in Darjeeling. Also visit the  incredible Batasia Loop, and visit Padmaja Naidu Himalayan Zoological Park, Himalayan Mountaineering Institute, Japanese Peace Pagoda, Tenzing Rock, Tea Estate(outer view). Overnight stay at the hotel in Darjeeling.",
                        "image": "/uploads/packages/day-images/qfn1mzbzh83wngdbgnbsj7mxereekdmm04zoazbd241029112103.jpg"
                },
                {
                        "day": "Day 5: Darjeeling \u00e2\u0080\u0093 Bagdogra \u00e2\u0080\u0093 Departure",
                        "activity": "Morning after breakfast check out from the hotel and transfer to Bagdogra Airport. Tour concludes... Cherish always the sweet memories.",
                        "image": null
                }
        ]
},
    "kashmir-holiday-package": {
        "id": "52",
        "slug": "kashmir-holiday-package",
        "title": "Kashmir Holiday Package",
        "location": "5N Srinagar",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 27999",
        "oldPrice": "\u20b9 30000",
        "image": "/uploads/packages/hgksm2sl24ngdvpsh5ovizl3otpxu35iimuvjuni240829022035.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast&Dinner"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature. Optional activities in your trip like boating charges and entry tickets CP plans don\u2019t have Lunch and Dinner. Gala Dinner on New year & Xmas Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: SRINAGAR ARRIVAL",
                        "activity": "Arrive at the Paradise on Earth,Kashmir where our cab and driver will be there to meet and greet you and proceed to  hotel",
                        "image": "/uploads/packages/day-images/zi7ezc8rjftuipmldqohtlksi2vuni5to42bvsju240829040951.jpg"
                },
                {
                        "day": "Day 2: LOCAL SIGHTSEEING",
                        "activity": "Mughal Gardens, Nishat Bagh built by Asaf Khan All the gardens are situated on the banks of Dal Lake with the Zabarwan hills Shikara ride on Dal Lake floating vegetable gardens.",
                        "image": "/uploads/packages/day-images/otjvdl7gbwhqtxjz08hirefyxpjhpoctmg8zlvql240829041019.jpg"
                },
                {
                        "day": "Day 3: SRINAGAR \u00e2\u0080\u0093 GULMARG - SRINAGAR",
                        "activity": "Morning proceeds for Gulmarg (Meadow of Flowers) If weather permits one can also have the view of Nanga Parbat, the naked mountain that over, 26,000 feets and dominates the entire region, also enjoy cable car (Gondola) for mountain ride up to khilanmarg.(on direct hire basis) In the evening drive back to Srinagar.   Overnight in hotel .",
                        "image": "/uploads/packages/day-images/yvhex2rixtm3ok6qkurlbkwxa43advpqnxsqdsl4240829041033.jpg"
                },
                {
                        "day": "Day 4: SRINAGAR-PAHALGAM-SRINAGAR",
                        "activity": "After breakfast drive to Pahalgam (The valley of shepherds) En-route, visit the saffron fields of pampore, Awantipura Ruins Enjoy the beautiful countryside Drive through the pine forests. sightseeing of aru valley betaab valley chandanwari Drive back to Srinagar. Overnight in hotel .",
                        "image": "/uploads/packages/day-images/drengvxfftrxhh1umwa3liynimbwgc1xbl4jyvlj240829041142.jpg"
                },
                {
                        "day": "Day 5: SRINAGAR \u00e2\u0080\u0093 SONMARG - SRINAGAR",
                        "activity": "Sonamarg is (2800 Meters above from sea level), which means (Meadow of Golden) has, as its backdrop, snowy mountains against a cerulean sky. The Sindh meanders along here and abounds with trout and mahseer, snow trout can be caught in the mail river, the visitors can have access to snow which is furnished all over like a white carpet Thajiwas glacier, a major attraction during the summer months In the evening return back to Srinagar. Overnight in a Hotel.",
                        "image": "/uploads/packages/day-images/jLSGgw21BpTNYM5MwUlAWcE3xMQNyC4dMfgbGUpE240829041215.jpg"
                },
                {
                        "day": "Day 6: DEPARTURE FROM SRINAGAR",
                        "activity": "After breakfast transfer to Srinagar airport for onward Destination",
                        "image": "/uploads/packages/day-images/dycklb5j9x3qig1pnifdv0qsmph5t6tndyawapwq240829041858.jpg"
                }
        ]
},
    "manali-package": {
        "id": "53",
        "slug": "manali-package",
        "title": "Manali Package",
        "location": "4N  Manali",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 18999",
        "oldPrice": "\u20b9 20100",
        "image": "/uploads/packages/j6cozrh2jgnksv5hsfoj9m6emdicmwtvtvqvnqu8240829050035.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together Driver charges, toll, parking, Fuel expense English/Hindi speaking friendly driver cum guide Bed and Breakfast&Dinner"
        ],
        "exclusions": [
                "Any airfare/ Train fare \uf076 Check in time 14:00 & check out time 11:00 \uf076 Any Adventure activities, any personal expenses, etc. \uf076 Anything which is not mention on package inclusion \uf076 Travel Insurance \uf076 Any meal other than specified \uf076 Any expenditure personal kind of nature \uf076 Room Heater Charges \uf076 Oxygen Cylinder \uf076 River Rafting, ATV Ride \uf076 Monuments entry fees, Tour Guide, Boating Etc. \uf076 Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Chandigarh \u00e2\u0080\u0093 Shimla",
                        "activity": "Namaste and Welcome to Chandigarh Railway Station / Airport you will get a warm welcome and proceed to Shimla, by road. Fondly referred to as the \u201cQueen of Hills\u201d, Shimla is a very popular hill town of Himachal Pradesh. On arrival check in at the hotel and overnight stay at the hotel In Shimla.",
                        "image": "/uploads/packages/day-images/rizqkodzt8vxfpfnwrijnsl7hi4nyzl31s8tqvpb241029102505.jpg"
                },
                {
                        "day": "Day 2: Shimla \u00e2\u0080\u0093 Kufri \u00e2\u0080\u0093 Shimla",
                        "activity": "Morning after breakfast go for an excursion to Kufri, a must \u2013 visit place. Placed at an altitude of 2290m above the sea level Kufri is blessed with tranquillity, scenery and is dotted with tourist attractions Like Mahasu Peak, Chini Bunglow, Indira Tourist Park, etc. Afternoon return back to Shimla, visit Christ Church, Town Hall, Scandal Point. Evening free for shopping at mall road and overnight stay at the hotel in Shimla.",
                        "image": "/uploads/packages/day-images/fcwjc8btb9wlmtpxyubotvonwuwhihhaelfo2gjg241029102451.jpg"
                },
                {
                        "day": "Day 3: Shimla \u00e2\u0080\u0093 Kullu \u00e2\u0080\u0093 Manali",
                        "activity": "Morning after breakfast Check out from the hotel & drive to Manali, valley of Gods, is a combination of natural splendor and rich cultural heritage. On the pass through Sunder Nagar Lake, Pandoh Dam, Ooth Tunnel and Kullu Valley (Enjoy River Rafting & other activities on direct payment basis). On arrival at Manali check in at the hotel. Overnight stay at the hotel in Manali.",
                        "image": "/uploads/packages/day-images/fqwldurfcgx7hkombe7emeipr1hal40wu1xa7xsy241029102536.jpg"
                },
                {
                        "day": "Day 4: Solang Valley & Manali Sightseeing",
                        "activity": "After Breakfast, transfer to full day sightseeing of Solang Valley. Get enjoy snow fall and enjoy Skiing, Snow Bike, & Paragliding (direct payment basis) around Solang in the mountain side snow fields. Afternoon back to Manali and (if time permits) visit Hadimba Devi Temple, Vashisht Village, Vashisht Hot Water Springs. Also visit the famous Mall, Tibetan Monastery. Shopping in Manali market for handicraft items and others. After shopping, transfer to a hotel, take dinner and Overnight at Manali hotel.",
                        "image": "/uploads/packages/day-images/qphm7xyfflahdnel18jpw1fcvlhmvbjbo41i0gd8241029102605.jpg"
                },
                {
                        "day": "Day 5: Manali \u00e2\u0080\u0093 Chandigarh Departure",
                        "activity": "Morning after breakfast check out from the hotel and transfer to Chandigarh as we reach we shall escort you to Chandigarh Airport/ Railway station. Tour Ends with sweet memories",
                        "image": "/uploads/packages/day-images/kocdhonttr5ov3ruhfpvq0xb0occnbgllfj21se7241108124507.jpg"
                }
        ]
},
    "malaysia-tour-package": {
        "id": "54",
        "slug": "malaysia-tour-package",
        "title": "Malaysia Tour Package",
        "location": "3N Malaysia",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 19499",
        "oldPrice": "\u20b9 22500",
        "image": "/uploads/packages/sc3sabi8yshgcivodgcqgboalmhdvwdanrukaopu240904025152.png",
        "description": "",
        "highlights": [
                "Begin your Malaysia tour with a captivating Half Day City Tour of Kuala Lumpur, taking in iconic sights like the Petronas Twin Towers, the grand King&rsquo;s Palace, and Independence Square.",
                "Visit key attractions including the National Monument and National Mosque, each with its own rich history and beautiful architecture.",
                "Enjoy a photo stop at the famous Cocoa Centre and immerse yourself in the vibrant sights of Kuala Lumpur at your own pace.",
                "For an added adventure, opt for a Full Day Excursion to Genting Highlands, a popular retreat featuring stunning landscapes and exciting entertainment options."
        ],
        "inclusions": [
                "3 Nights\u2019 accommodation at Kuala Lumpur in selecselectedl category",
                "Daily Buffet Breakfast",
                "Half-Day Kuala Lumpur City Tour on Seat in Coach (SIC) basis",
                "Return Airport Transfers on Seat in Coach (SIC) basis",
                "All Tours & Transfers on Seat in Coach (SIC) basis",
                "All Hotel Taxes & Service Charge"
        ],
        "exclusions": [
                "City Tax | Tourism Tax to be paid extra directly to hotel at time of Check-In (approximately RM 10 per room per night will be levied)",
                "International Airfares",
                "Cost of Visa",
                "Travel Insurance",
                "Expenses of personal nature such as tips, telephone calls, laundry, liquor, etc.",
                "Anything which is not specified in Inclusions",
                "Peak / Festival Period Surcharge to be paid extra & will be notified at time of booking confirmation",
                "Genting Park / Indoor Park Ticket not included",
                "Surcharges & Tax if any needs to be paid extra at time of confirmation",
                "Early Check-In & Late Check-Out"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Kuala Lumpur Arrival",
                        "activity": "Airport transfer to your hotel Rest of the day is free to relax in a hotel or you can explore the neighborhood.",
                        "image": "/uploads/packages/day-images/tgrbw1huzmyn26u4xjx4w8cgddpvqjsiwofthd9z241029101906.jpg"
                },
                {
                        "day": "Day 2: Kuala Lumpur",
                        "activity": "Embark on a Half Day City Tour of Kuala Lumpur we will see Petronas Twin Towers (photo stop), Cocoa Centre, King's palace (photo stop), National Monument (Photo Stop), National Mosque (photo stop) & Independence Square",
                        "image": "/uploads/packages/day-images/4hovbwg7rlqzja1st7ccorevejk6rjm7kqj4nzet241029101930.jpg"
                },
                {
                        "day": "Day 3: Kuala Lumpur",
                        "activity": "Enjoy breakfast at your hotel. Today you have day free at leisure to explore Kuala Lumpur (on own) OR you can opt for an optional Full Day Excursion to Genting Highlands.",
                        "image": "/uploads/packages/day-images/cvbbaof2clik0xwoynz02d7w45cuszwgiyeqyzgn241029102058.jpg"
                },
                {
                        "day": "Day 4: Kuala Lumpur Departure",
                        "activity": "Enjoy your last morning in Malaysia before checking out of your hotel and being transferred to the Kuala Lumpur airport where you will depart for your destination with bags full of souvenirs and happy memories.",
                        "image": "/uploads/packages/day-images/clav6kwr85ux4ozdwy3j1irdbushdwtlg3lqv6v8241108123407.jpg"
                }
        ]
},
    "sri-lanka": {
        "id": "55",
        "slug": "sri-lanka",
        "title": "Sri Lanka Package",
        "location": "1N Kandy / 1N Nuwara Eliya / 1N Bentota / Kosgoda",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 53999",
        "oldPrice": "\u20b9 57200",
        "image": "/uploads/packages/7mCmQivsI7l0TYGuG2vOOJ6dBjrrM5TevOHyvtq1240820125113.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "4 Nights hotel accomadtion",
                "04 breakfasts & 4 Dinners",
                "Meet and Greet at the Airport by the English-speaking chauffer",
                "Sightseeing on private vehicle",
                "Entrance Fees to Pinnawala Elephant Orphanage, Temple of Tooth Relic, Turtle Hatchery & Madu River Boat Ride",
                "All transfers from arrival to departure",
                "V.A.T. (Value added tax)",
                "ost of Sri Lanka\u2013 ETA Visa (subject to approval)",
                "All Local Taxes"
        ],
        "exclusions": [
                "Any Video or Camera Permits",
                "Visa",
                "Extra Meals",
                "xpenses of personal nature such as tips, telephone calls, laundry, liquor, etc",
                "Anything that is not specified in Inclusions",
                "Peak/Festival Period Surcharge to be paid extra & will be notified at time of booking confirmation",
                "Early Check-In & Late Check-Out Charges",
                "Airfare and Insurance",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Kandy",
                        "activity": "Welcome to Colombo! Our representative will greet you at Bandaranaike International Airport and escort you to Kandy, the historic hill capital of Sri Lanka and its second largest city, known for its UNESCO World Heritage status. En route, we'll visit Pinnawala Elephant Orphanage and a spice garden. Witness caretakers' dedication to orphaned elephants.  In Kandy, explore the city and its rich Buddhist heritage. The Temple of the Sacred Tooth Relic houses a revered relic dating back to the 4th century, when the Buddha's tooth was brought to Sri Lanka hidden from sacrilegious hands in an Orissan princess' hair. The relic has grown in repute and holiness in Sri Lanka and throughout the Buddhist World. Immerse yourself in culture and history as you embark on your Sri Lankan adventure.",
                        "image": "/uploads/packages/day-images/xw2uuzi6n1unh3xxzd43vhln0x7o08p0cmxby2kw240820022538.jpg"
                },
                {
                        "day": "Day 2: Nuwara Eliya",
                        "activity": "After breakfast, head to Nuwara Eliya. Explore Ramboda Falls, the 11th highest waterfall in Sri Lanka, with a 109m drop. Visit a tea factory and plantation. Proceed to the Sri Baktha Hanuman Temple, associated with the epic Ramayana, housing a 16-foot Hanuman statue. Later, in Nuwara Eliya, often called 'Little England,' enjoy a city tour amidst scenic mountains, valleys, and tea plantations. See Seetha Amman Temple, marking the spot where Sita was held captive by King Ravana. This charming town, resembling England, offers a glimpse into colonial influence. Nuwara Eliya's cool climate and beautiful landscapes create an enchanting experience.",
                        "image": "/uploads/packages/day-images/J4e80Qsz665bVLam8ajMgwZjIGxk1wSnumigphmv240820022859.jpg"
                },
                {
                        "day": "Day 3: Bentota",
                        "activity": "Following breakfast, head to Bentota and visit the renowned Kosgoda Turtle Hatchery, managed by the Wild Life Protection Society of Sri Lanka. Established in 1988, it has protected and released approximately 3.5 million baby turtles into the wild, aided by local fishermen who provide eggs. Eggs are buried in sand, and hatchlings are released into the sea at night after about 50 days. The hatchery cares for injured and disabled turtles, including albinos. Next, take a boat ride on the Madu Ganga River, home to pristine mangrove forests and abundant wildlife. You'll encounter diverse flora and fauna. Visit a Buddhist monastery on an island, and witness local activities like cinnamon production and prawn fishing. In the evening you will see the fishermen in their canoes lighting lanterns to attract the shellfish into their traps. It's a captivating journey through nature and culture through enchanting interactions with the local inhabitants.",
                        "image": "/uploads/packages/day-images/a5sCiMyJh01RVNCCRkhhkRRQVO8X2Y6ekcLA5E4K240820024545.jpg"
                },
                {
                        "day": "Day 4: Colombo",
                        "activity": "Head to Colombo, a two-hour journey. Explore the city, starting with Fort, the former British administrative and military hub. Pass through Cinnamon Gardens, the tree-lined residential area. Discover Pettah's bustling commercial district, including Sea Street, known for goldsmiths, a Hindu temple, and the Dutch Church of Wolfendhal from 1749. Visit BMICH, featuring an Avukana Buddha replica, and Independence Square. Then, enjoy shopping at Odel, offering designer clothing for the family and a culinary adventure. In Colombo, you'll experience a blend of history, culture, and modern shopping opportunities during this day of exploration.",
                        "image": "/uploads/packages/day-images/tjjml04uoo31b7cjprlmjc8wwooc7gbbc9dtr8dw240820024930.jpg"
                },
                {
                        "day": "Day 5: Colombo",
                        "activity": "After enjoying your breakfast, proceed to the airport for your return flight. We hope you had a great holiday and hope to see you again soon.",
                        "image": "/uploads/packages/day-images/TDmjVaPE5ZZ068rQ8fsgA8dVpvwcdxlmaop0U1uF240820025831.jpg"
                }
        ]
},
    "malaysia-with-penang": {
        "id": "56",
        "slug": "malaysia-with-penang",
        "title": "Malaysia with Penang",
        "location": "3N Kuala Lampur / 2N Penang",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 32999",
        "oldPrice": "\u20b9 36000",
        "image": "/uploads/packages/0ati8uaniug6kxou673hhovknfvootd18qawatkt240821040447.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "3 Nights\u2019 accommodation at Kuala Lumpur in selected category",
                "2 Nights\u2019 accommodation at Penang in a selected hotel category",
                "Daily Buffet Breakfast",
                "Half-Day Kuala Lumpur City Tour on Seat in Coach (SIC) basis",
                "Full Day Excursion to Genting Highlands with route Batu Caves & One Way Cable Car on Seat in Coach (SIC) basis",
                "Half-Day Penang City Tour on a Private basis",
                "Return Coach Ticket from Kuala Lumpur to Penang",
                "Private Transfers from Penang Coach Terminal to Hotel on a Private basis",
                "Return Airport Transfers on Seat in Coach (SIC) basis in Kuala Lumpur",
                "All Hotel Taxes & Service Charge"
        ],
        "exclusions": [
                "City Tax | Tourism Tax to be paid extra directly to the hotel at the time of Check-In (approximately RM 10 per room per night will be levied)",
                "International Airfares",
                "Cost of Visa",
                "Travel Insurance",
                "Expenses of personal nature such as tips, telephone calls, laundry, liquor, etc.",
                "Anything that is not specified in Inclusions",
                "Rates are not valid during Black-Out Dates",
                "Peak / Festival Period Surcharge to be paid extra & will be notified at time of booking confirmation",
                "Genting Park / Indoor Park Ticket not included",
                "Surcharges & Tax if any need to be paid extra at the time of confirmation",
                "Early Check-In & Late Check-Out"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Kuala Lumpur",
                        "activity": "Welcome to Malaysia! You will be welcomed on arrival at Kuala Lumpur International Airport transferred to your hotel. Kuala Lumpur is the capital of Malaysia and & the city is located in west-central Peninsular It is the country\u2019s largest urban area and its cultural, commercial, and transportation center. Rest of the day is free to relax in a hotel or you can explore the neighborhood.",
                        "image": "/uploads/packages/day-images/rTxQZ8TIABgdq8ly2VklKoD0Qhm4jsdOJrMFj6rG240821042535.jpg"
                },
                {
                        "day": "Day 2: Kuala Lumpur",
                        "activity": "Embark on a Half Day City Tour of Kuala Lumpur which gives you a glimpse of the city\u2019s rich cultural heritage, modern architecture, and vibrant atmosphere On this city tour we will see Petronas Twin Towers (photo stop), Cocoa Centre, King's palace (photo stop), National Monument (Photo Stop), National Mosque (photo stop) & Independence Square.",
                        "image": "/uploads/packages/day-images/PiMIV4ciE5RaPicFy4MjZWWy4rvfQV6Av1iBhbLo240821043450.jpg"
                },
                {
                        "day": "Day 3: Penang",
                        "activity": "Today we proceed for full day excursion to Genting Highlands. This Genting Highlands Day Tour from Kuala Lumpur will take you through the picturesque Titiwangsa Mountains, some 6,118 feet (1,835 meters) above sea level Take a cable car ride to the top of the highlands and admire the surrounding view of the hills. Upon arrival explore the resort and casino at your leisure Enjoy shopping, theme parks and amazing views. We also stop briefly at Batu Caves, which is one of the most popular and iconic attractions near Kuala Lumpur Upon arrival, climb the steep flight of 272 steps to reach the main cave entrance. Along the way, you'll be greeted by the impressive golden statue of Lord Murugan, standing at 42.7 meters (140 feet).",
                        "image": "/uploads/packages/day-images/itoj7hd1wofmuxcz3lgvtmbo2q2ryjj1sefvlm6m240821042201.jpg"
                },
                {
                        "day": "Day 4: Penang",
                        "activity": "Enjoy breakfast at hotel & Check-Out. Our local representative will meet you & transfer you to you to Coach Terminal where you will board a comfortable coach to Penang. Penang is one of the Malaysia\u2019s 13 states and is often referred to as the  On arrival, our local representative will pick-up from Coach Terminal & transfer you to your hotel in Penang.",
                        "image": "/uploads/packages/day-images/JwXH8lPv53EM2keXpsoJQfrnv5XEULqAvjYHc6pU240821044109.jpg"
                },
                {
                        "day": "Day 5: Penang",
                        "activity": "After breakfast we proceed for the Half Day Penang City Tour. his tour will include reclining Buddha & Burmese Buddhist Temple, Penang History Museum + 3D (excluding entrance), Unesco\u2019s Georgetown \u2013 bypassing \u2018Street of Racial Harmony\u2019, St.George\u2019s Anglican Church, Goddess of Mercy Temple, Sri Mariamman Temple, Little India, Kapitan Keling Mosque, Fort Cornwallis photoshop, Local Penang flavors namely the Penang White Coffee & Tea",
                        "image": "/uploads/packages/day-images/mxcrrhwwnagvcs9rsmjiqwwydqdog4swwlolygbd240821045435.jpg"
                },
                {
                        "day": "Day 6: Penang",
                        "activity": "Check-Out from hotel & head to coach terminal to catch your coach to Kuala Lumpur. On arrival we will proceed to International Airport for your flight to onward destination.",
                        "image": "/uploads/packages/day-images/J7o3LkZLEhH2BLBxDanQEVNFnRtGBSeiupHR56og240821050300.jpg"
                }
        ]
},
    "lakshadweep-package": {
        "id": "57",
        "slug": "lakshadweep-package",
        "title": "Lakshadweep Package",
        "location": "3N Agatti island",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 22999",
        "oldPrice": "\u20b9 24500",
        "image": "/uploads/packages/rqeuFriCXbjmlMkRh6UmXGJka06Jt1bLAWQFexJD240821035047.jpeg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Sea view cottage at any of the above-mentioned beach hotels o All meals included this plan o Agatti airport to resort and back o 01 Agatti land Excursion by car o Entry Permit of Agatti"
        ],
        "exclusions": [
                "Alliance Air Kochi to Agatti Island - ETD 08:55 / ETA 10:15 Agatti Island to Kochi - ETD 10:45 / ETA 12:05 -12,000 rupees onwards Baggage allowance \u2013 15 kg check in -\u00a007 kg hand baggage / Rs. 465 extra per kg o Nature expenses, water sports, dive, all water sports and extra activities\u00a0are direct payable at the resort only. o Excursions not mentioned in inclusions."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Kochi-Agatti (by Flight)",
                        "activity": "-Welcome to Agatti! Our representative will receive and escort you to your hotel after arrival at the Agatti airport. After the check in procedures, enjoy lunch and proceed for sightseeing on the island which includes attractions such as Public Library, Anthropological Museum, South Beach, Eastern Jetty (ship embarkation and disembarkation point), NIOT Sea Water Desalination Plant and Lagoon Beach. In the evening you can\u00a0explore the nearby beach and enjoy the sunset. Back to hotel for dinner. Overnight stay at Agatti Island.",
                        "image": "/uploads/packages/day-images/mjlATgo4OMPh4pXIj9DalVr71d4ZVCGg85XrsyXb240821103037.jpg"
                },
                {
                        "day": "Day 2: Agatti - Thinnakra Island and Bangaram S",
                        "activity": "After breakfast, proceed to Bangaram Island, a small uninhabited island of Agatti, with a well-experienced guide. From Agatti, it will take 45minutes in a private boat to reach the island. Enjoy walks on beautiful beaches and see floating turtles in clear waters. After reaching Thinnakara and relaxation our boat will bring you to Bangaram Sand Bank\u00a0. In the evening, return to your hotel and relax. Enjoy a comfortable overnight stay at Agatti.",
                        "image": "/uploads/packages/day-images/0QOrBcMYu6gmvwaJh8gzt4U2HoITmsYhv1JDmKBo240821105507.jpg"
                },
                {
                        "day": "Day 3: Agatti - Kalpetti Island Trip",
                        "activity": "After breakfast, proceeds to Kalpetti Island for a half day excursion by boat. Afternoon back to Agatti, have Lunch and the rest day free for leisure and for water sport activities like diving, snorkeling, kayaking, fishing, reef watch etc.., all the water sports are directly payable at the Resort. Overnight stay at Agatti.",
                        "image": "/uploads/packages/day-images/bwm2p6bxzwcffadlrytxqasj698f8usdcldmdxcm240821105453.jpg"
                },
                {
                        "day": "Day 4: Departure from Agatti",
                        "activity": "-After breakfast, proceeds to Agatti airport. Hope you had a great time in Lakshadweep!",
                        "image": "/uploads/packages/day-images/9a3t1rk3zfewj5cxtw51pygcwbx3rnt4owi5wmzn240821035209.jpg"
                }
        ]
},
    "thailand-tour-package-premium-1": {
        "id": "58",
        "slug": "thailand-tour-package-premium-1",
        "title": "Thailand  Premium  Package",
        "location": "2N Phuket / 2N Pattaya / 2N Bangkok",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 57999",
        "oldPrice": "\u20b9 61000",
        "image": "/uploads/packages/QtneW8dXhkqqd3l17c3o1qSYw4ZjBvDh0YaqtrHB240822095542.jpg",
        "description": "",
        "highlights": [
                "Embark on a thrilling Thailand tour, starting with a visit to Phuket City and the iconic Big Buddha, followed by an unforgettable Phi Phi Island (Maya Beach) speedboat trip with lunch, snorkeling, and access to the National Park.",
                "Experience the glamour of the Alcazar Show (normal seat) with private round-trip transfer, and then visit Tiger Topia Sriracha for an exciting photo session with tigers.",
                "Enjoy a scenic Coral Island tour by speedboat with an Indian lunch, followed by a trip to Nong Nooch Village, including entrance fees, sightseeing bus, lunch, and a cultural show.",
                "Indulge in a Chao Phraya Princess Dinner Cruise with an Indian buffet (SIC-boat, PVT-transfer), followed by a visit to Safari World &amp; Marine Park with lunch and private transfer."
        ],
        "inclusions": [
                "Sightseeing",
                "Alcazar show",
                "Coral Island tour",
                "Safari world",
                "Pattaya Floating Market",
                "Safari World & Marine Park",
                "Phi Phi Island (Maya Beach) Speed Boat",
                "Nong Nooch Village(Entrance Fee +Sight-seeing bus + Lunch ( indian) + Show)",
                "Chao Phraya Princess Dinner Cruise Indian Buffet",
                "6 Breakfast 4 Lunch 1 Dinner Cruise",
                "All airport & hotel transfers"
        ],
        "exclusions": [
                "Visa",
                "Early check-in & late check-out.",
                "Lunch and Dinner for except mentioned.",
                "Any drinks & personal expenses",
                "Phone Call, Laundry, Mini Bar, Room Services",
                "Travel insurance",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Phuket  Arrival",
                        "activity": "Half Day Phuket City Tour With Big Buddha Overnight stay at hotel",
                        "image": "/uploads/packages/day-images/wvlDvBXO4sYbfnxbaGKKCSYNhhwDoI3pQwdR5yXR240822100255.jpg"
                },
                {
                        "day": "Day 2: Phuket Sightseeing",
                        "activity": "Phi Phi Island (Maya Beach) Speed Boat With Lunch Included Snorkeling & National Park Fee(SIC) overnight stay at hotel",
                        "image": "/uploads/packages/day-images/feYY9I07HUqEuf10bL2iPpELHxZEq2QNkS0i48is240822100510.jpg"
                },
                {
                        "day": "Day 3: Phuket to Pattaya",
                        "activity": "Alcazar Show(Normal Seat) with Private Transfer (Two way) Tiger Topia Sriracha Entrance + Photo Session With Tiger with Private Transfer (Two way) Overnight stay at hotel",
                        "image": "/uploads/packages/day-images/6beYLD6bZHBeN9PG59fqfhv77jNZkdUcB5H2HoMI240822101433.jpg"
                },
                {
                        "day": "Day 4: Pattaya Sightseeing",
                        "activity": "Coral Island Tour By Speed Boat With Indian Lunch (SIC)",
                        "image": "/uploads/packages/day-images/86NDOZkFoPYha3UpYEDjbZxYjyhAidKcflyG05Kr240822101458.jpg"
                },
                {
                        "day": "Day 5: Bangkok",
                        "activity": "Nong Nooch Village(Entrance Fee +Sight-seeing bus + Lunch ( indian) + Show) Chao Phraya Princess Dinner Cruise Indian Buffet (SIC - Boat, PVT -Transfer) with Private Transfer",
                        "image": "/uploads/packages/day-images/2nvguRYaAVIuXURcyteuxmvv2hApZYv5iRb3MzIO240822102807.jpg"
                },
                {
                        "day": "Day 6: Bangkok sightseeing",
                        "activity": "Safari World & Marine Park With lunch(PVT)(Closed On Every Monday) with Private Transfer",
                        "image": "/uploads/packages/day-images/LZYeeRPLuXraVlonyhX9pREDsAVNzzfh1P2NPcYB240822102819.jpg"
                },
                {
                        "day": "Day 7: Departure",
                        "activity": "04 hrs shopping at Bangkok with Private Transfer",
                        "image": "/uploads/packages/day-images/9civq7l0exp8umvh2ayi7tzgbb3qrhfcge59omtx240822103110.jpg"
                }
        ]
},
    "singapore-tour-package-1": {
        "id": "59",
        "slug": "singapore-tour-package-1",
        "title": "Singapore Tour Package",
        "location": "4N  Singapore",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 57999",
        "oldPrice": "\u20b9 63000",
        "image": "/uploads/packages/jyky2rsv6qbalqwelupkbrpng8vrykhooekvnvz0240828045640.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Accommodation provided on CP (Breakfast only).",
                "Pickup-Drop",
                "Sightseeing",
                "All transfers including sightseeing.",
                "All presently applicable government taxes.",
                "Singapore City Tour",
                "Sentosa Island Excursion",
                "Garden by the way with light & sound show",
                "Night Safari",
                "Universal Studios"
        ],
        "exclusions": [
                "Singapore Local Sim Card (100GB Data): SGD 17.00/- Per Sim Card",
                "VISA",
                "\u2060Batam Island (INDONESIA) Day Tour SGD 120.00/- Per Person (Min 02 Pax)",
                "\u2060Exciting offers for Honeymoon couples at Bintan Island (INDONESIA)",
                "Tiger Brewery Tour SGD 25.00/- Per Person (Upto 2 hours Beer sampling, 1 Hour Brewery Tour, 1 Souvenir)",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrive at Changi Airport",
                        "activity": "On arrival from the airport you are transferred to your hotel. Check in at the hotel and relax till evening. In the evening get ready for an amazing Night Safari (world\u2019s first nocturnal zoo) on the outskirts of Singapore city. Return back to the hotel late evening. Overnight stay in Singapore.",
                        "image": "/uploads/packages/day-images/jcqixebaqmrkfwisci7gqqexu5ijbj5eo3whk0ok240828051746.jpg"
                },
                {
                        "day": "Day 2: Singapore City Tour and Sentosa Island",
                        "activity": "After breakfast get ready to experience the mega metropolis of Singapore.. We will visit the Colonial district where old Singapore begins and where modern Singapore was created, Little India, places of worship, China Town, Mount Faber that offers excellent views of the Singapore skyline. Later in the afternoon get ready to explore Sentosa Island: You will be visiting Under Water World, Digital Photo, Images of Singapore, Merlion Tower and Songs of the Sea show. Later in the evening you are dropped back to the hotel. Overnight stay in hotel.",
                        "image": "/uploads/packages/day-images/yvswklfo4lqv74w0qfjt4keirjshqbsffzgeqnn6240828051408.jpg"
                },
                {
                        "day": "Day 3: Singapore - Full day Universal Studios",
                        "activity": "After breakfast in the morning enjoy your trip to Universal studios. Enter the world of Hollywood at Universal Studios Singapore and ride the movies on roller coasters and other themed attractions. You can also see the dinosaurs in the Jurassic Park Adventure plunge into an equatorial rainforest in Madagascar and mummy from ancient Egypt. It\u2019s a day of thrills. Later you are dropped back to the hotel for your stay in Singapore.",
                        "image": "/uploads/packages/day-images/p4bm0ndcs0xtwetueiukpptrvsf6pozv9sqsyeod240828051450.jpg"
                },
                {
                        "day": "Day 4: Singapore",
                        "activity": "In the morning after breakfast, you are free on your own to explore the vibrant Malls of Singapore for shopping. At ev ready to vis Garden by the way with Light & sound show. Overnight stay in hotel.",
                        "image": "/uploads/packages/day-images/izq6jf9oweckdpdesdnf8l8duv42tctgmij6wjjs240828051512.jpg"
                },
                {
                        "day": "Day 5: Departure - Singapore",
                        "activity": "After breakfast check out from the hotel, you will be driven down to Singapore International Airport to board the flight back home.",
                        "image": "/uploads/packages/day-images/j3xm98xzqxo5sstyy8r4vspdvsayxijtry7tkywv240828051813.jpg"
                }
        ]
},
    "5n6d-rajasthan-tour-package": {
        "id": "60",
        "slug": "5n6d-rajasthan-tour-package",
        "title": "Rajasthan Tour Package",
        "location": "2N JAIPUR / 1N JODHPUR / 2N UDAIPUR",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 21999",
        "oldPrice": "\u20b9 29000",
        "image": "/uploads/packages/pxckp21pd9jsmx7demeb2jbi7zgowvjuac5dbkys240904024249.png",
        "description": "",
        "highlights": [],
        "inclusions": [
                "05 Nights\u2019 Accommodation in Hotel",
                "Double Sharing Basis",
                "MAPAI (05 Breakfast + 05 Dinner)",
                "With all transfer, driver allowances, parking, toll taxes, fuel and with all",
                "Airport/ Railway Station pickup drop off and sightseeing as per the itinerary",
                "24 x 7 Emergency assistance during stay"
        ],
        "exclusions": [
                "Any airfare/ Train fare",
                "Check in time 14:00 noon & check out time 11:00 morning",
                "Any adventure activities, any personal expenses",
                "Anything which is not mention on tour package inclusion",
                "Travel insurance",
                "Any meal other than specified",
                "Any expenditure personal kind of nature",
                "Any Adventure Activities",
                "Desert Safari, Elephant Safari",
                "Room Heater Charges",
                "Monuments Entry Fees, Tour Guide, Boating in Lake Pichola Etc.",
                "Any increase in the taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Jaipur",
                        "activity": "Namaste and Welcome to Jaipur Upon arrival at Jaipur Airport, you will get a warm welcome and transfer to hotel check in and overnight stay in Jaipur.",
                        "image": "/uploads/packages/day-images/98fs5ejlnghvxhlqbvcnymohi84cyfmtcmcbick5241029110401.jpg"
                },
                {
                        "day": "Day 2: Jaipur Sightseeing",
                        "activity": "Morning after breakfast visit Amber Fort, Lake Palace, Hawa Mahal, City Palace, Jantar Mantar. Evening we shall take you around the city shop for true ethnic Indian Rajasthani dresses and silver jewellery, blue pottery, miniature paintings and Mojaris (leather shoes). For night stay we shall return back to the hotel and overnight stay at hotel in Jaipur.",
                        "image": "/uploads/packages/day-images/groijchcdxvi8yekwc4pomicva2cdomnfnuqetmv241029110546.jpg"
                },
                {
                        "day": "Day 3: Jaipur \u00e2\u0080\u0093 Pushkar \u00e2\u0080\u0093 Jodhpur",
                        "activity": "Morning after breakfast, check out from the hotel, transfer to Jodhpur. On the way visit Pushkar, visit various temples and Ghats and holy Pushkar Lake. There are more than 400 hundred temples in Pushkar but the main attraction being the temple of Lord Brahma, the only temple in India dedicated to Brahma. As reach check in at the hotel and overnight stay at the hotel in Jodhpur.",
                        "image": "/uploads/packages/day-images/uuc8uc87zwxwqo9kya8jclyeuqkehs936lsq28oe241029110557.jpg"
                },
                {
                        "day": "Day 4: Jodhpur Sightseeing \u00e2\u0080\u0093 Udaipur",
                        "activity": "Morning after breakfast check out from the hotel and visit Umaid Bhawan Palace, Mehrangarh Fort & Jaswant Thada. After sightseeing proceed to Udaipur \u2013 Titled as the \u2018City of Lakes\u2019. As reach check in at the hotel and overnight stay in Udaipur.",
                        "image": "/uploads/packages/day-images/5dynmvsjn4iqkzsooiiqjwopwkjabcnpm9al6i0h241029110607.jpg"
                },
                {
                        "day": "Day 5: Udaipur Sightseeing",
                        "activity": "Morning after breakfast, visit City Palace, Saheliyon-ki-Bari, a garden with flowers, lily ponds and marble fountains etc. Fateh Sagar Lake, an artificial lake famed for its azure water and ethereal beauty. Take a trip to the Pratap Memorial, Bharatiya Lok Kala Mandal and Pichola Lake \u2013 a picturesque lake which boasts of sublime beauty and scenic surroundings. Return to the hotel for an overnight stay.",
                        "image": "/uploads/packages/day-images/v1ft3smovzilwe6m5h8lb2ndzew5wnfbuyuz2c89241029110638.jpg"
                },
                {
                        "day": "Day 6: Udaipur \u00e2\u0080\u0093 Departure",
                        "activity": "Morning after breakfast, check out from the hotel, we shall escort you to Udaipur Airport / Railway Station. Tour ends with sweet memories..........",
                        "image": null
                }
        ]
},
    "4n5d-bali-tour-package": {
        "id": "61",
        "slug": "4n5d-bali-tour-package",
        "title": "Bali Tour Package",
        "location": "4N Bali",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 21999",
        "oldPrice": "\u20b9 25000",
        "image": "/uploads/packages/scjv80siga8jttcsryrjx5hfckuzsflpd6ten4ld240827103913.jpg",
        "description": "",
        "highlights": [
                "Begin your Bali trip with an adventurous Kintamani Volcano Tour, taking in stunning views of Mount Batur and visiting charming local villages rich in Balinese artistry and tradition.",
                "Experience the craft of batik painting in Batubulan Village, followed by a visit to Mas Village to explore beautiful wood carvings and intricate artwork unique to Bali.",
                "Savor a visit to a coffee plantation, where you&rsquo;ll learn about the coffee-making process and taste Luwak coffee, Bali&rsquo;s most famous brew, along with other local varieties.",
                "Dive into adventure with a thrilling river rafting experience on the Ayung River, and explore the cultural and scenic beauty of Ubud Village and the serene Nusa Dua area."
        ],
        "inclusions": [
                "Number of nights stay in mentioned hotel (Only if hotel is booked with us)",
                "All transfers & sight seeing's as mentioned in the itinerary on PRIVATE SUV VEHICLE only, other than mentioned",
                "Driver cum tour guide during the tours and transfers.",
                "Extra charges if Separate Tour Guide is needed**",
                "Daily Breakfast at the hotel's restaurant (from day 2) (Only if hotel is booked with us) & Other meals as mentioned in the itinerary"
        ],
        "exclusions": [
                "Flight Fare",
                "Visa Cost",
                "Travel Insurance",
                "Meals which is not mentioned on the inclusions",
                "Optional activities and shopping",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival",
                        "activity": "Pick up at the airport & transfer to hotel.",
                        "image": "/uploads/packages/day-images/xsyugaene0bmyftwvts1p6ysp5wkakz4fdsdjzss240827042342.jpg"
                },
                {
                        "day": "Day 2: Full day Tour  KINTAMANI VOLCANO +  Batu",
                        "activity": "KINTAMANI VOLCANO Tour visit Traditional handmade BATIK PAINTING in Batubulan Village visit PAINTING and WOOD CARVING at MAS village, continue to a highland to visit COFFEE PLANTATION LUWAK Coffee the most famous coffee in Bali besides the authentic Balinese coffee and its coffee powder making process.",
                        "image": "/uploads/packages/day-images/rjlpjrdhjypo1cppvlnragrx2jybl0u9xz574elu240827042522.jpg"
                },
                {
                        "day": "Day 3: leisure Day",
                        "activity": "After breakfast, Free arrangement.",
                        "image": "/uploads/packages/day-images/su6yeglqbebozki0byywer8agtvtj1t7fj4s6gmh240827043758.jpg"
                },
                {
                        "day": "Day 4: UBUD village",
                        "activity": "RIVER RAFTING in AYUNG RIVER UBUD village Nusa Dua area complimentary Indonesian buffet Lunch at the restaurant provided.",
                        "image": "/uploads/packages/day-images/nfizrddtxrqkfvmabeloq3s6cls26ty8jbkwytk0240827042803.jpg"
                },
                {
                        "day": "Day 5: Departure",
                        "activity": "After breakfast, Free arrangement and departure transfer to Airport (-)",
                        "image": "/uploads/packages/day-images/n2ot3rnpy98oe83ovopwg5lykkyi6eegbglf5hn9240827042535.jpg"
                }
        ]
},
    "4n5d-bali-tour-package-premium": {
        "id": "62",
        "slug": "4n5d-bali-tour-package-premium",
        "title": "Bali   Premium Package",
        "location": "4N5D Bali",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 34999",
        "oldPrice": "\u20b9 38500",
        "image": "/uploads/packages/hsb19bj5teriwlc13z1tom2snhiiadregrxs4qfd240827103831.jpg",
        "description": "",
        "highlights": [
                "Immerse yourself in Bali beauty with a visit to Kintamani Volcano, where you can enjoy breathtaking views and explore the nearby coffee plantations, alongside a visit to Tegalalang Village and its famous rice terraces.",
                "Discover the artistic charm of Bali by visiting MAS Village for wood carvings and painting, and witness the craftsmanship behind these traditional works of art.",
                "Experience an exciting rafting adventure in the Ayung River, where you&rsquo;ll glide past cliffs, lush greenery, and beautiful waterfalls, offering an unforgettable journey through Bali&rsquo;s nature.",
                "Explore the cultural heart of Bali with a visit to Ubud Village, where you can shop for unique Balinese handicrafts at Ubud Market and enjoy a complimentary tour of the Ubud Royal Palace."
        ],
        "inclusions": [
                "Number of nights stay in mentioned hotel (Only if hotel is booked with us)",
                "All transfers & sight seeing's as mentioned in the itinerary on PRIVATE SUV VEHICLE only, other than mentioned",
                "Driver cum tour guide during the tours and transfers.",
                "Extra charges if Separate Tour Guide is needed**",
                "Daily Breakfast at the hotel's restaurant (from day 2) (Only if hotel is booked with us) & Other meals as mentioned in the itinerary"
        ],
        "exclusions": [
                "Flight Fare",
                "Visa Cost",
                "Travel Insurance",
                "Meals which is not mentioned on the inclusions",
                "Optional activities and shopping",
                "GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival",
                        "activity": "Pick up at the airport & transfer to hotel.",
                        "image": "/uploads/packages/day-images/8bp8dwf7gw3tymnbnqjfzqacpqbrotbuadafzc0f240827035150.jpg"
                },
                {
                        "day": "Day 2: Full day KINTAMANI VOLCANO Tour + Batubu",
                        "activity": "KINTAMANI VOLCANO Tour visit PAINTING and WOOD CARVING at MAS village COFFEE PLANTATION visit TEGALALANG Village Overnight stay in Hotel",
                        "image": "/uploads/packages/day-images/z7dckw7vf5ur822s5erlfrrftsjlotjpvgaiyodj240827035348.jpg"
                },
                {
                        "day": "Day 3: Leisure Day",
                        "activity": "After breakfast, Free arrangement.",
                        "image": "/uploads/packages/day-images/oc03lwpnetzgih4e7vexlgux6cgh1ubdc9lcjpz5240827035706.jpg"
                },
                {
                        "day": "Day 4: UBUD Village",
                        "activity": "RIVER RAFTING in AYUNG RIVER start enjoy the Rafting Adventure with beautiful view of cliffs and waterfalls during the activity visit to UBUD VILLAGE and the same time to complimentary visit to UBUD ROYAL PALACE UBUD MARKET for any kind of Balinese handicraft products Overnight stay in hotel",
                        "image": "/uploads/packages/day-images/nt9ixirmerqr8xdt3bywb5fcebdlozptkp1zhmgc240827035402.jpg"
                },
                {
                        "day": "Day 5: Departure",
                        "activity": "After breakfast, Free arrangement and departure transfer to Airport (-).",
                        "image": "/uploads/packages/day-images/l5jdnituorqod2q5qbbedu8oafhrdspth0c8vjjp240827035723.jpg"
                }
        ]
},
    "bali-tour-package-1": {
        "id": "63",
        "slug": "bali-tour-package-1",
        "title": "Bali  Standard tour",
        "location": "5N Bali",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 27999",
        "oldPrice": "\u20b9 32000",
        "image": "/uploads/packages/firux1ir0nnix84mzytacsprhbo120ca8u6wgi8p240827103800.jpg",
        "description": "",
        "highlights": [
                "Experience Bali beauty with an unforgettable day exploring Batubulan Village&rsquo;s intricate batik painting, Mas Village&rsquo;s exquisite wood carving, and the lush coffee plantations of the highlands.",
                "Witness the breathtaking scenery of Mount Batur and Lake Batur, followed by an adventurous banana boat ride and a fascinating trip to Turtle Island by glass-bottom boat.",
                "Embark on a thrilling river rafting adventure on the Ayung River, soaking up Bali&rsquo;s natural wonders as you navigate the rapids for over two hours.",
                "Discover Bali&rsquo;s heritage at the Taman Ayun Royal Family Temple in Mengwi Village, enjoy the fresh air of the Bedugul Vegetable Plantation, and savor an Indonesian buffet lunch with stunning sunset views to end the day."
        ],
        "inclusions": [
                "Number of nights stay in mentioned hotel (Only if hotel is booked with us) All transfers & sight seeing's as mentioned in the itinerary on PRIVATE SUV VEHICLE only, other than mentioned Driver cum tour guide during the tours and transfers. Extra charges if Separate Tour Guide is needed** Daily Breakfast at the hotel's restaurant (from day 2) (Only if hotel is booked with us) & Other meals as mentioned in the itinerary"
        ],
        "exclusions": [
                "Flight Fare Visa Cost Travel Insurance Meals which is not mentioned on the inclusions Optional activities and shopping GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival",
                        "activity": "Pick up at the airport & transfer to hotel.",
                        "image": "/uploads/packages/day-images/jvtqcs99qy4tvi7cunq7cdhafzhj3sgg14enpyuc240827034352.jpg"
                },
                {
                        "day": "Day 2: KINTAMANI VOLCANO TOUR",
                        "activity": "BATIK PAINTING in Batubulan Village PAINTING and WOOD CARVING at MAS village visit COFFEE PLANTATION MOUNT BATUR & and its sister LAKE BATUR + Indonesian buffet Lunch",
                        "image": "/uploads/packages/day-images/tluzghntrkt0yjn19unkg2eoiuljy8bfhb5bbnyi240827033823.jpg"
                },
                {
                        "day": "Day 3: WATER SPORT ACTIVITY",
                        "activity": "BANANA BOAT ride Visit TURTLE ISLAND by Glass bottom boat Overnight stay  in hotel",
                        "image": "/uploads/packages/day-images/n19xtfppohcy7svxdr6f7rstqrdbehlwwt8jntwm240827034129.jpg"
                },
                {
                        "day": "Day 4: RIVER RAFTING in AYUNG RIVER",
                        "activity": "RIVER RAFTING in AYUNG RIVER, Rafting will take around 2 hour and 30 minutes",
                        "image": "/uploads/packages/day-images/fuu9lo9amcutx1hbpw3smgd0iehq1hzxd8vkodmv240827034435.jpg"
                },
                {
                        "day": "Day 5: TAMAN AYUN Royal Family Temple",
                        "activity": "TAMAN AYUN Royal Family Temple at Mengwi Village BEDUGUL VEGETABLE PLANTATION Indonesian buffet Lunch will be served in a local restaurant stunning sun set view Overnight stay at hotel",
                        "image": "/uploads/packages/day-images/t0w7do9sa8sgvsbop2gzdhulmg8f0skejydfgsa7240827033902.jpg"
                },
                {
                        "day": "Day 6: Departure",
                        "activity": "After breakfast. Free arrangement and departure transfer to Airport",
                        "image": "/uploads/packages/day-images/pvqkbvmbtezdncwmj9tlq8pddtoldhuvmqr7t6ik240827034454.jpg"
                }
        ]
},
    "bali-package": {
        "id": "64",
        "slug": "bali-package",
        "title": "Bali  Premium Package",
        "location": "5N Bali",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 33999",
        "oldPrice": "\u20b9 36300",
        "image": "/uploads/packages/wwm9ddc5cqusj4gix2j2fbfzbmcl2t6m0po7pone240827103732.jpg",
        "description": "",
        "highlights": [
                "Discover Bali beauty with visits to Luwak coffee plantations, the majestic Mount Batur, and the serene Lake Batur, topped off with an Indonesian buffet lunch at a local restaurant.",
                "Experience Bali&rsquo;s rich cultural side with the Kintamani Volcano tour, traditional batik painting at Batubulan, wood carving at Mas Village, and scenic stops at Tegalalang Village and Tegenungan Waterfall.",
                "Dive into adventure with river rafting on the Ayung River, a banana boat ride, a glass-bottom boat visit to Turtle Island, and optional water sports like parasailing, jet skiing, and snorkeling.",
                "Unwind with a tour of Uluwatu Temple&rsquo;s stunning cliff views, Taman Ayun Royal Temple, the lush Bedugul Vegetable Plantation, Lake Beratan, and a picturesque sunset view at Tanah Lot."
        ],
        "inclusions": [
                "Number of nights stay in mentioned hotel (Only if hotel is booked with us) All transfers & sight seeing's as mentioned in the itinerary on PRIVATE SUV VEHICLE only, other than mentioned Driver cum tour guide during the tours and transfers. Extra charges if Separate Tour Guide is needed** Daily Breakfast at the hotel's restaurant (from day 2) (Only if hotel is booked with us) & Other meals as mentioned in the itinerary"
        ],
        "exclusions": [
                "Flight Fare Visa Cost Travel Insurance Meals which is not mentioned on the inclusions Optional activities and shopping GST"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Bali Arrival",
                        "activity": "Pick up at the airport & transfer to hotel.",
                        "image": "/uploads/packages/day-images/ofoil2s3um0qauioeqji2xrw9geojtgvqweu8snz240827010150.jpg"
                },
                {
                        "day": "Day 2: KINTAMANI VOLCANO Tour",
                        "activity": "LUWAK + MOUNT BATUR & and its sister LAKE BATUR + Indonesian buffet Lunch will be served at the local restaurant, TEGALALANG Village. + TEGENUNGAN WATERFALL KINTAMANI VOLCANO Tour, visit Traditional handmade BATIK PAINTING in Batubulan Village, visit PAINTING and WOOD CARVING at MAS village",
                        "image": "/uploads/packages/day-images/tpkdw2kkuhqdsfgyszzos1z6fghbeeeiwkwhpy0b240827010219.jpg"
                },
                {
                        "day": "Day 3: WATER SPORT Activity",
                        "activity": "BANANA BOAT ride Visit TURTLE ISLAND by Glass bottom boat Optional water Sports can be taken on the spot on personal account, such as Adventure parasailing, jet ski, flying fish, snorkeling, sky tube, sea walker, diving etc ULUWATU TEMPLE TOUR.",
                        "image": "/uploads/packages/day-images/Zh8LbHAqev2vXWohuwcC5lQeI2vXLkPZggYOhAfz240827010347.jpg"
                },
                {
                        "day": "Day 4: RIVER RAFTING in AYUNG RIVER",
                        "activity": "RIVER RAFTING in AYUNG RIVER, next to UBUD village (the most popular river for Rafting activity) complimentary Indonesian buffet Lunch",
                        "image": "/uploads/packages/day-images/bzmcd0vjaqmi0hmcazue2eukl5izod34tsbrlz9o240827010920.jpg"
                },
                {
                        "day": "Day 5: TAMAN AYUN Royal Family Temple",
                        "activity": "TAMAN AYUN Royal Family Temple at Mengwi Village + BEDUGUL VEGETABLE PLANTATION, + LAKE Beratan Lake + Indonesian buffet Lunch will be served in a local restaurant ANAH LOT to see a nice view of Hindu temple is located inside the ocean above the rock",
                        "image": "/uploads/packages/day-images/wmvu7oqkbhqfsi0ooqsk4tp3d77h6gkdzjzpnukc240827011204.jpg"
                },
                {
                        "day": "Day 6: Departure",
                        "activity": "After breakfast. Free arrangement and departure transfer to Airport",
                        "image": "/uploads/packages/day-images/9xsjrbxjj9nxdnzxgorjgmnbibzdmhgrwkfey8qe240827032831.jpg"
                }
        ]
},
    "4n5d-kashmir-holiday-package": {
        "id": "65",
        "slug": "4n5d-kashmir-holiday-package",
        "title": "Kashmir Holiday",
        "location": "4N SRINAGAR",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 21999",
        "oldPrice": "\u20b9 25000",
        "image": "/uploads/packages/ujztwngbfjmhebzweiqwdeoaqrbbnix7wrswsbc7240829021419.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide",
                "Bed and Breakfast&Dinner",
                "All transfer and Sightseeing by Non-AC Sedan",
                "sightseeing as per the itinerary  Shikara Ride in famous Dal Lake for 01 Hrs."
        ],
        "exclusions": [
                "Any airfare/ Train fare",
                "Check in time 14:00 noon & check out time 11:00 morning",
                "Any Adventure activities, any personal expenses, etc.",
                "Anything which is not mention on package inclusion",
                "Travel Insurance, Tour Guide, Monuments entry fees",
                "Any meal other than specified",
                "Any expenditure personal kind of nature",
                "Entry Fee & Guide Charges",
                "Room Heater Charges",
                "Camera fee at various Places of Sightseeing, Horse Riding, Gondola Ride etc.",
                "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Srinagar & Sightseeing",
                        "activity": "Pick up from Srinagar airport and transfer to the hotel (early check-in & late check-out is subject to availability) after check-in process visit famous Mughal Gardens like Nishat Bagh, Shalimar Bagh, and Famous Hazratbal Shrine located on the banks of Dal Lake. In the evening do Shikara ride on The Dal Lake. It's one of the most peaceful & relaxing aspects in Kashmir. After sightseeing return back to hotel and overnight stay in Srinagar.",
                        "image": "/uploads/packages/day-images/XeYPFQMJf3wNbljFSwRbT1vS4z1KosYQ2KINgrZm240829022251.jpg"
                },
                {
                        "day": "Day 2: Srinagar \u00e2\u0080\u0093 Gulmarg \u00e2\u0080\u0093 Srinagar",
                        "activity": "Morning after breakfast proceed for a scenic drive to Gulmarg. Gulmarg (Meadow of Gold). On arrival head to the valley to try some of the activities. You can opt for a visit Gondola Cable Car Ride to Khilanmarg (on direct payment basis). After an exciting day, return back to Srinagar hotel and overnight stay in Srinagar.",
                        "image": "/uploads/packages/day-images/jbwtjnqvv0ndehknmd2eu6ufohwqb4fjaxh3fqaa240829025044.jpg"
                },
                {
                        "day": "Day 3: Srinagar \u00e2\u0080\u0093 Pahalgam \u00e2\u0080\u0093 Srinagar",
                        "activity": "After breakfast you will be transferred by road to Pahalgam (Valley of Shepherds), Enroute you can see saffron fields at Pampore town. On arrival visit world famous Betaab valley, Aru Valley and Chandanwari, which are the most scenic and serene spots in Pahalgam, all these can be covered by local taxi or by horse riding (on direct payment basis) on the same day, In Spring / Summers since the days are Long you can also have time to take short trek to Famous Baisaran Valley also known as Mini Switzerland. Evening drive back to hotel & Overnight stay at hotel in Srinagar",
                        "image": "/uploads/packages/day-images/7tgez9ytlbsh0qyj9noi73swbzvbgbwzbpugslts240829025537.jpg"
                },
                {
                        "day": "Day 4: Srinagar \u00e2\u0080\u0093 Sonmarg \u00e2\u0080\u0093 Srinagar",
                        "activity": "Morning after breakfast leave for Sonmarg (Meadow of Gold ), It is one of the most visited, scenic, serene  place in Kashmir, mostly visited for Seeing Snow even in Summer, enjoy full day fun there ,you can ride a pony to see the Thajwas Glacier covered with ice, Zero Point (Snow Point) located around Zojila pass near to kargil  (Need to hire a local union shared taxi to cover these both points on direct payment basis (negotiable charges), Late evening drive back to Srinagar, & overnight stay at Srinagar.",
                        "image": "/uploads/packages/day-images/6isjsb9xy49vwg0trcttecujkqc7stoylqylsyij240829031832.jpg"
                },
                {
                        "day": "Day 5: Srinagar \u00e2\u0080\u0093 Departure",
                        "activity": "Morning after breakfast check out from the hotel and we shall escort you to Srinagar Airport. Tour End with sweet memories",
                        "image": "/uploads/packages/day-images/tpwggi5j5ptoqx8lubakld4ldwxtewjweqwn8qxo240829032459.jpg"
                }
        ]
},
    "2n3d-alleppey-wonderla-park": {
        "id": "66",
        "slug": "2n3d-alleppey-wonderla-park",
        "title": "2N3D Alleppey & Wonderla",
        "location": "1N Aleppey Backwaters/ 1N Kochi",
        "duration": "",
        "price": "\u20b9 9799",
        "oldPrice": "\u20b9 11200",
        "image": "/uploads/packages/I47gsL6i77YHg3EspxbupTtCT3FaV5RzBCjNwAxN240907044833.jpg",
        "description": "",
        "highlights": [
                "Check into a charming backwater resort in Alleppey for a relaxing overnight stay and experience Kerala's beauty.",
                "Unwind in the evening by the backwaters, soaking in the beautiful scenery of Alleppey.",
                "Start your day with a delicious breakfast before heading to the exciting Wonderla Amusement Park.",
                "Enjoy thrilling rides and attractions at Wonderla for a fun-filled day of adventure."
        ],
        "inclusions": [
                "Bed & Breakfast",
                "All sightseeing",
                "Wanderla entry tickets",
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Cochin Airport, Railway, Bus stand Pickup and Drop",
                "Driver charges, toll, parking, Fuel expense",
                "English/Hindi speaking friendly driver cum guide"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like boating charges and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Cochin To Alleppey",
                        "activity": "Arrive at the gate way of Kerala, Cochin where our cab and driver will there to meet and greet you and proceed to Alleppey Check into the resort and overnight stay in Alleppey",
                        "image": "/uploads/packages/day-images/oqcozigm1thmd6svhk56h9iepyvfrvuhlfhsy0so241025025731.jpg"
                },
                {
                        "day": "Day 2: Alleppey To Kochi",
                        "activity": "This days visit Wanderla Amusement Park  after the breakfast. Overnight stay in kochi hotel",
                        "image": "/uploads/packages/day-images/hv4cabcmrydtrmbfypnsclzzp78yroxd2hff7pjd241025043125.jpg"
                },
                {
                        "day": "Day 3: Departure",
                        "activity": "After breakfast you can check out and proceed for departure. On the way you can enjoy Cochin sightseeing which includes: Fort Cochin Mattanchetry, Jew town, local shopping based upon your flight timings. Our Cab will drop you at the Airport. Fly back to your hometown with good memories of Kerala trip.",
                        "image": null
                }
        ]
},
    "azerbaijan-tour-packages": {
        "id": "67",
        "slug": "azerbaijan-tour-packages",
        "title": "Budgeted Azerbaijan",
        "location": "3 Nights Baku",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 31000",
        "oldPrice": "\u20b9 33000",
        "image": "/uploads/packages/bngpjquzmy5datq8m8jfqwb8fgk5lprdnfefmbn3250131025302.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Hotel booking",
                "Visa",
                "Sightseeing"
        ],
        "exclusions": [
                "Flights"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Day 1 | ARRIVAL & CITY TOUR",
                        "activity": "Arrive at Heydar Aliyev International Airport. CITY TOUR Icherisheher (Old City)- Maiden Tower Palace of the Shirvanshahs Juma Mosqe Heydar Aliyev Center Flame Towers Baku Boulevard Carpet Museum Fountain Square Nizami Street Transfer To Hotel Overnight Stay At Resort",
                        "image": "/uploads/packages/day-images/452fsyxo1kfhvdwtmy2i3lle9iqlxas5fokehm5e250204022041.jpg"
                },
                {
                        "day": "Day 2: DAY 2 | Baku TOUR",
                        "activity": "Breakfast from hotel & Transfer to Gabala Nohur Lake seven beauties Waterfalls Tufandag Mountain Resort (Take the cable car) Transfer to Hotel - Stay at Baku",
                        "image": "/uploads/packages/day-images/S6DATZ0NI6ML5OgjAjaKxqfmCCmK7mPoHlDKjNV7250204103202.jpg"
                },
                {
                        "day": "Day 3: DAY 3 | GOBUSTAN & ABSHERON",
                        "activity": "Breakfast from hotel Gobustan National Park Gobustan Museum Mud Volcano Fire Temple Burning Mountain Transfer to hotel",
                        "image": "/uploads/packages/day-images/vakqx0x4dozk0eeqdfppyctp5ckpenvox0s9rcqn250204022424.jpg"
                },
                {
                        "day": "Day 4: Day 4 | DEPARTURE",
                        "activity": "Breakfast from Hotel Transfer to airport",
                        "image": "/uploads/packages/day-images/ppyr39brxsjstwcju8uss4dpzldzm9yfyxobalty250204110246.jpg"
                }
        ]
},
    "azerbaijan": {
        "id": "68",
        "slug": "azerbaijan",
        "title": "Peaceful Azerbaijan",
        "location": "4 Nights Baku",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 33000",
        "oldPrice": "\u20b9 35000",
        "image": "/uploads/packages/jp9ooiwngbh8movmdimg17ub2uzgpbpk1gkzieiv250203034840.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Hotel Booking",
                "Visa",
                "Sightseeings"
        ],
        "exclusions": [
                "Flight"
        ],
        "itinerary": [
                {
                        "day": "Day 1: DAY 1 ARRIVAL",
                        "activity": "Arrival at Baku Airport Our cab driver will be there to meet and Greet you! Check in to the hotel Overnight Stay at Hotel",
                        "image": "/uploads/packages/day-images/ofvmssxwkfvtrmqvraetjmitaktmtfrrkboinctp250204112613.jpg"
                },
                {
                        "day": "Day 2: DAY 2 BAKU CITY TOUR",
                        "activity": "Breakfast from hotel Old City- Maiden Tower Miniature Book Museum Palace of the Shirvanshahs Juma Mosque Heydar Aliyev Canter Flame Towers Baku Boulevard Carpet Museum Fountain Square Nizami Street Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/u2ffywfhtmecojscgyv1sef4jvw646yhiex5lym6250204023001.jpg"
                },
                {
                        "day": "Day 3: DAY 3  SHAHDAG  TOUR",
                        "activity": "Breakfast from hotel Shahdag Mountain Resort - Cable Car Rides outdoor Activities: (Depending on the season) ,Skiing/Snowboarding (winter) Hiking (summer),Mountain Biking Zip-lining Overnight stay at Baku Hotel",
                        "image": "/uploads/packages/day-images/8z3puwluaf7navidlqjvy7br6nkp6ib2hptag5ye250204023304.jpg"
                },
                {
                        "day": "Day 4: DAY 4 GOBUSTAN & ABSHERON",
                        "activity": "Breakfast from hotel Gobustan National Park Gobustan Museum Mud Volcano Fire Temple Burning Mountain Overnight stay at Baku hotel",
                        "image": "/uploads/packages/day-images/lwwvy4qpqjvthqqmqly8ltmpk42nlno8mxu3pagn250204043436.jpg"
                },
                {
                        "day": "Day 5: DAY 5  DEPARTURE",
                        "activity": "Breakfast and checkout from Hotel Transfer to airport Back to home country with sweet memories of Azerbaijan trip.",
                        "image": "/uploads/packages/day-images/2jypjxbfnzipgup1ea75mmw7vvv55xm4ujdwkpet250204023343.jpg"
                }
        ]
},
    "azerbaijan-tour-packages-1": {
        "id": "69",
        "slug": "azerbaijan-tour-packages-1",
        "title": "Magical Azerbaijan",
        "location": "5 Nights Baku",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 38500",
        "oldPrice": "\u20b9 40500",
        "image": "/uploads/packages/jqhwd7bmbliq4lkzlzp6ukvxmouljd5pufkrhnkn250131031610.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Hotel Booking",
                "Visa",
                "Sightseeings"
        ],
        "exclusions": [
                "Flights"
        ],
        "itinerary": [
                {
                        "day": "Day 1: DAY 1 ARRIVAL",
                        "activity": "Arrive at Heydar Aliyev International Airport. Transfer to your hotel and check in Stay at resort",
                        "image": "/uploads/packages/day-images/8kihqlc9omplycqswhpsgfqemglwnh5fywubb5ui250204031405.jpg"
                },
                {
                        "day": "Day 2: BAKU CITY TOUR",
                        "activity": "Breakfast from hotel Icherisheher (Old City)- Maiden Tower Palace of the Shirvanshahs Juma Mosque Heydar Aliyev Center Flame Towers Baku Boulevard Carpet Museum Fountain Squar Nizami Street Transfer To Hotel",
                        "image": "/uploads/packages/day-images/iwlrcnshhumwrtvgct007if408xh0dvu8bvif7od250204030331.jpg"
                },
                {
                        "day": "Day 3: DAY 3 GABALA TOUR",
                        "activity": "Breakfast from hotel & Transfer to Gabala Nohur Lake seven beauties Waterfalls Tufandag Mountain Resort (Take the cable car) Transfer to Hotel - Stay at Baku",
                        "image": "/uploads/packages/day-images/r9zbjorilz6f3qwtmmfls9z3dny6g1iuofwibdiy250203044213.jpg"
                },
                {
                        "day": "Day 4: DAY 4 QUBA TOUR",
                        "activity": "Breakfast from hotel Quba Mosque Explore the local market Qechresh Forest Candy Cane Mountain Stay At Baku",
                        "image": "/uploads/packages/day-images/bkglbfiqnbnyly4r4zzhe3vlpn8cbwwjfqcg6x76250203044513.jpg"
                },
                {
                        "day": "Day 5: DAY 5 GOBUSTAN & ABSHERON",
                        "activity": "Breakfast from hotel Gobustan National Park Gobustan Museum Mud Volcano Fire Temple Burning Mountain Transfer to hotel",
                        "image": "/uploads/packages/day-images/zhtrctscvbnsmc1usjfib0ztx8fbuabsqd5d6xit250204030904.jpg"
                },
                {
                        "day": "Day 6: DAY 6  DEPARTURE",
                        "activity": "Breakfast from Hotel Transfer to airport",
                        "image": "/uploads/packages/day-images/objjikudfplibse3glvjb9xu3cqsmxrqgquiph5t250204123728.jpg"
                }
        ]
},
    "azerbaijan-tour-packages-2": {
        "id": "70",
        "slug": "azerbaijan-tour-packages-2",
        "title": "Amazing Azerbaijan",
        "location": "5 Nights Baku",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 44500",
        "oldPrice": "\u20b9 46500",
        "image": "/uploads/packages/lfmcnumcedxxbxva70zglvqdljjqk7pjytkrwtyb250131031148.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Hotel Bookings",
                "Visa",
                "Sigtseeings"
        ],
        "exclusions": [
                "Flights"
        ],
        "itinerary": [
                {
                        "day": "Day 1: DAY 1 ARRIVAL IN BAKU",
                        "activity": "Arrival at Baku Airport Our cab driver will be there to meet and Greet you! Check in to the hotel Overnight Stay at Hotel",
                        "image": "/uploads/packages/day-images/li9ql2tgz8cbdkw44hkpjgjpn7zsf6ydtjlrxhxu250204032957.jpg"
                },
                {
                        "day": "Day 2: DAY 2   BAKU CITY TOUR",
                        "activity": "Breakfast from hotel Icherisheher (Old City)- Maiden Tower Palace of the Shirvanshahs Juma Mosque Heydar Aliyev Center Flame Towers Baku Boulevard Carpet Museum Fountain Square Nizami Street Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/wtxiyxacgza2qtpza3wrnx1n9kmqqcavdhcyoi51250204032211.jpg"
                },
                {
                        "day": "Day 3: DAY 3 GABALA TOUR",
                        "activity": "Breakfast from hotel & Transfer to Gabala Nohur Lake seven beauties Waterfalls Tufandag Mountain Resort (Take the cable car) Transfer to Hotel - Stay at Baku",
                        "image": "/uploads/packages/day-images/3qdcql9vdciqcgjzz5tnc8tcfdvxmmmum1lelsoh250204032414.jpg"
                },
                {
                        "day": "Day 4: DAY 4  QUBA TOUR",
                        "activity": "Breakfast from hotel Quba Mosque Explore the local market Qechresh Forest Candy Cane Mountain Stay At Baku resort",
                        "image": "/uploads/packages/day-images/szsrlnvucq6fbnhj9yzv9o1t59wytaolxj2h9yrh250204033409.jpg"
                },
                {
                        "day": "Day 5: DAY 5 GOBUSTAN & ABSHERON",
                        "activity": "Breakfast from hotel Gobustan National Park Gobustan Museum Mud Volcano Fire Temple Burning Mountain Transfer to hotel",
                        "image": "/uploads/packages/day-images/mez8wigfksieiqsb5nbghspw9iuucfk4ydd1ypgh250204032739.jpg"
                },
                {
                        "day": "Day 6: DAY 6  DEPARTURE",
                        "activity": "Breakfast from Hotel Transfer to airport",
                        "image": "/uploads/packages/day-images/b1ujnovzwewwae5sf0hneawzvmuqmkoqc9kq1phc250204124630.jpg"
                }
        ]
},
    "azerbaijan-tour-packages-3": {
        "id": "71",
        "slug": "azerbaijan-tour-packages-3",
        "title": "charming Azerbaijan",
        "location": "4 Nights Baku",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 37500",
        "oldPrice": "\u20b9 39500",
        "image": "/uploads/packages/aimiy5pemefnkwre8qabxdtffsbhyleibck3xs92250131032303.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Hotel Booking",
                "Visa",
                "Sightseeings"
        ],
        "exclusions": [],
        "itinerary": [
                {
                        "day": "Day 1: DAY 1 ARRIVAL",
                        "activity": "Arrival at Baku Airport Our cab driver will be there to meet and Greet you! Check in to the hotel Overnight Stay at Hotel",
                        "image": "/uploads/packages/day-images/l0e0plflo9nwqnykkqzpe48m7kowcpm614eec6l8250204114254.jpg"
                },
                {
                        "day": "Day 2: DAY 2 BAKU CITY TOUR",
                        "activity": "Breakfast from hotel Old City- Maiden Tower Miniature Book Museum Palace of the Shirvanshahs Juma Mosque Heydar Aliyev Canter Flame Towers Baku Boulevard Carpet Museum Fountain Square Nizami Street Overnight stay at Hotel",
                        "image": "/uploads/packages/day-images/of7xfgzunw7vtriira0l1obimptpyxrx8rtlplm4250204024826.jpg"
                },
                {
                        "day": "Day 3: DAY 3  SHAHDAG  TOUR",
                        "activity": "Breakfast from hotel Shahdag Mountain Resort - Cable Car Rides outdoor Activities: (Depending on the season) ,Skiing/Snowboarding (winter)  Hiking (summer),Mountain Biking Zip-lining Overnight stay at Baku Hotel",
                        "image": "/uploads/packages/day-images/dqzipvbgmvrwgxox09xqueotmebh5w949bqrcbq2250204024903.jpg"
                },
                {
                        "day": "Day 4: DAY 4 GOBUSTAN & ABSHERON",
                        "activity": "Breakfast from hotel Gobustan National Park Gobustan Museum Mud Volcano Fire Temple Burning Mountain Overnight stay at Baku hotel",
                        "image": "/uploads/packages/day-images/dmkov9zezcsgzcpsekmpq95d8onqni7mg9cfmfzd250204025933.jpg"
                },
                {
                        "day": "Day 5: DAY 5  DEPARTURE",
                        "activity": "Breakfast and checkout  from Hotel Transfer to airport Back to home country with sweet memories of Azerbaijan trip.",
                        "image": "/uploads/packages/day-images/govxjnazktrcc4wyhmx8zjllwfox0hrkfmo876d9250204121918.jpg"
                }
        ]
},
    "thailand-premium": {
        "id": "72",
        "slug": "thailand-premium",
        "title": "Thailand Premium",
        "location": "2N Pattaya / 2N Bangkok",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 29500",
        "oldPrice": "\u20b9 32500",
        "image": "/uploads/packages/3t7juwrgvdmth8malgvhehbwyx7ownmp8xjgiyla250603053815.jpg",
        "description": "30500",
        "highlights": [
                "Embark on a thrilling Thailand trip by visiting the Sri Racha Tiger Zoo, where you can get up close with amazing animals and enjoy exciting animal shows.",
                "Enjoy the spectacular Alcazar Show, a dazzling performance filled with vibrant costumes and impressive choreography.",
                "Take an exciting Coral Island tour by speed boat, exploring crystal-clear waters and stunning beaches.",
                "Discover Bangkok&rsquo;s rich culture on a memorable temple tour, visiting the city's famous landmarks and marveling at their stunning beauty."
        ],
        "inclusions": [
                "\u27a2 02 Nights in Pattaya \u27a2 02 Night in Bangkok \u27a2 04 Breakfast at Hotels \u27a2 Tiger Topia \u2013 Entrance and photo session with Tiger \u27a2 Alcazar Show \u27a2 Coral Island Tour in Speed Boat with Lunch (Seat In Coach \u2013 Group Tour) \u27a2 Bangkok Temple Tour (Golden Buddha & Marble Temple) \u27a2 Safari World & Marine Park With lunch (PVT) (Closed on Every Monday) with Private Transfer (Two way) \u27a2 DMK/BKK Airport to Pattaya Hotel \u2013 Bangkok Hotel \u2013 To DMK/BKK Airport \u27a2 All Tours & Transfers on private basis (Except Coral Island)"
        ],
        "exclusions": [
                "Package Exclusions: - Flight Tickets | On Arrival Visa fee | Insurance Any other than mentioned in Inclusions | Lunch & Dinner"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Thailand Arrival",
                        "activity": "Arrival +Tiger Topia Sriracha Entrance + Photo Session With Tiger (Enroute To PTY HTL)+Alcazar Show(Normal Seat)",
                        "image": null
                },
                {
                        "day": "Day 2: Pattaya Sightseeing",
                        "activity": "Coral Island Tour By Speed Boat With Indian Lunch (SIC)+Pattaya Floating Market(Rowing Boat -inclusive admission package no 1)",
                        "image": null
                },
                {
                        "day": "Day 3: Bangkok Arrival",
                        "activity": "Safari World & Marine Park With Lunch(PVT)(Enroute To BKK Hotel)",
                        "image": null
                },
                {
                        "day": "Day 4: Bangkok Temple Tours",
                        "activity": "Bangkok Temple Tour (Golden Buddha & Marble Temple)",
                        "image": null
                },
                {
                        "day": "Day 5: Bangkok Departure",
                        "activity": "Leisure Day Departure",
                        "image": null
                }
        ]
},
    "budgeted-vietnam-package": {
        "id": "73",
        "slug": "budgeted-vietnam-package",
        "title": "Budgeted Vietnam",
        "location": "2N Hanoi - 1N Saigon",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 18500",
        "oldPrice": "\u20b9 20500",
        "image": "/uploads/packages/7J1QWWJ0sjoMbiKxSyAxxtIQgWgPeauAN0sLEU7a250527121157.jpeg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like activies and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Chu Chi Tunel",
                        "activity": "Arrive in Ho Chi Minh City Airport Pick up and Drop to Hotel Depart For Cu Chi Tunnel Tour Visit the Cu Chi Tunnels, network of underground tunnels used during the Vietnam war. Marble at the tunnels many features, from camouflaged drap doors to a variety of ingenious  booby traps. Cu Chi Tunnels: Discover the hidden tunnels and bunkers,including the infamous \"tunnel of  death\" War Museum: Visit the Cu Chi War Museum to learn about the history of the tunnels and the  war. Countryside Scenic Drive: Take in the scenic views of the Vietnamese countryside during  the drive to and from Cu Chi. Tunnel Evening Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/0uskaziykuncchun1mvpk7ytywyzl5kfmhz3iiqg250605010450.jpg"
                },
                {
                        "day": "Day 2: Mekong Delta",
                        "activity": "Breakfast at Hotel he Mekong Delta is a region in southwestern Vietnam, known for its lush green landscapes, winding waterways, and traditional villages Depart for Mekong Delta Tour Boat Trip : Take a boat trip along the Mekong River and explore the delta's winding waterways Floating Markets :  Visit the famous floating markets, such as Cai Be or Cai Rang, and see  the locals buying and selling fresh produce. Traditional Villages : Explore traditional villages and see the locals making traditional crafts,  such as weaving or pottery. Tropical Fruits : Taste the delicious tropical fruits, such as mangoes, bananas, or coconuts.  Enjoy tropical seasonal fruits while listening to traditional folk Music. Lunch Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/clrprztlsxzfymludke07zr3n1tgog7uhyctcyxe250605010709.jpg"
                },
                {
                        "day": "Day 3: Dinner Cruise Saigon",
                        "activity": "Breakfast at Hotel Check Out Rooms Depart For Halong Bay Day Cruise 08:00 : Our Guide will pick you from Hotel - Arrive at Harbour and check in at cruise and  Relax Lunch on Cruise Full Day Cruise in Halong Bay , a UNESCO world Heritage Site with over 1,600 limestone islands. 14:00 - boat stop at fishing farm and do kayaking or bamboo Boat which is rowed by local  people to visit Luon cave or relaxing at the sundeck for about 40 minutes. Boat will stop at the wharf then you can go inside to visit Sung Sot cave (or Surprising cave  in english) Boat Moving to TiTop island where you can swim or Climbing up the top of the island for  an overview of Halong Bay. Evening Back to Harbour Depart For Hanoi Overnight Stay at Cruise",
                        "image": "/uploads/packages/day-images/kz2dbz1HVjBmT4J8gKUpriNiAoGDvL4Kve8loqmb250527122618.webp"
                },
                {
                        "day": "Day 4: Vietnam",
                        "activity": "Breakfast at Hotel Checkout Rooms Airport Drop Flight to Home country",
                        "image": "/uploads/packages/day-images/ibk5frzjgxagbkyioawmxgmwkpgv6ccqagewh87m250605011002.jpg"
                }
        ]
},
    "4n5d-andaman-tour-packages": {
        "id": "74",
        "slug": "4n5d-andaman-tour-packages",
        "title": "4N5D Andaman Tour Packages",
        "location": "Stunning Andaman",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 25000",
        "oldPrice": "\u20b9 28000",
        "image": "/uploads/packages/OVelXuVa9Ge2qLrMY1o1mfCD1n7qiYDQ9LJWeqos250527122712.webp",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Complimentary Breakfast",
                "Sightseeing",
                "Entry Tickets",
                "Airport Transfers",
                "Cab",
                "Ferry Tickets",
                "Accommodation (3star Room facilities in all destinations)",
                "Coordinator",
                "Includes Tax"
        ],
        "exclusions": [
                "Flight Tickets are not included",
                "Lunch and dinner not included; dine at recommended local restaurants.",
                "Vehicle not for personal use; it will adhere to the planned itinerary during your stay on the islands.",
                "Any personal expenses are not included.",
                "Any additional charges resulting from flight delays or cancellations are not included.",
                "Please be aware that any expenses arising from unforeseen circumstances are not part of the package."
        ],
        "itinerary": [
                {
                        "day": "Day 1: Port Blair Arrival - and Cellular Jail +",
                        "activity": "CORBYN'S COVE BEACH LIGHT AND SOUND MUSIC SHOW CELLULAR JAIL",
                        "image": null
                },
                {
                        "day": "Day 2: Port Blair to Havelock - Transfer + Radh",
                        "activity": "SWARAJ DEPP (HAVELOCK ISLAND) Port Blair To Havelock - Makruzz : Premium",
                        "image": null
                },
                {
                        "day": "Day 3: Havelock - Visit to Elephanta Coral Beac",
                        "activity": "Elephanta Beach is one of the most beautiful places in Havelock Island which is famous for its clear water and variety of live corals & colorful fishes. One can do several other water sports activities like Glass Bottom, Snorkeling, Banana Ride, Sofa Ride etc.",
                        "image": null
                },
                {
                        "day": "Day 4: Havelock to Port blair - Transfer + Day ",
                        "activity": "After breakfast, board Green Ocean Cruise / Makruzz and return to Port Blair. Free at leisure. Overnight stay at Port Blair.",
                        "image": null
                },
                {
                        "day": "Day 5: Port Blair - Departure",
                        "activity": "Port Blair - Departure",
                        "image": null
                }
        ]
},
    "basic-vietnam-package": {
        "id": "75",
        "slug": "basic-vietnam-package",
        "title": "Basic Vietnam",
        "location": "1N Halong - 2N Ninh Binh",
        "duration": "3 Nights 4 Days",
        "price": "\u20b9 20500",
        "oldPrice": "\u20b9 22500",
        "image": "/uploads/packages/LbdQh1glU8sAHOeRv6CziNxX5ABPavpMW3dp6J5f250527123910.jpeg",
        "description": "",
        "highlights": [
                "Halong Bay,&nbsp;cruising through the bay, exploring captivating caves like Sung Sot (Surprise) Cave, and immersing in the culture of floating fishing villages",
                "Ninh Binh,&nbsp;boat tours through Trang An and Tam Coc, exploring Mua Cave for panoramic views, and visiting Bai Dinh Pagoda, the largest Buddhist temple in Vietnam",
                "Grand World is a multi-purpose complex,featuring entertainmet, attrations and a recreation of iconic golbel cities."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like activies and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Halong bay",
                        "activity": "Arrive in Danang (13:45 PM) A city with a rich history dating back to the 2nd century  BC. Meet and greet from Airport - Pick Up From Airport Hotel Drop - Check in Hotel Depart for Halong Bay Full Day Tour. On the eay you have good chance to visit to see  the beautiful landscapes of Vietname\u2019s countryside such as : Luc River, Red River,  Buffalos, Green Rice, Cane, Canal Fields. Full Day Cruise in Halong Bay , a UNESCO world Heritage Site with over 1,600  limestone islands. Lunch on Cruise Explore Hidden Caves, Grottos and Emerald water. Visit Titop Island and where you can do swimming or Climbing up to the top of  the island for an overview of Ha long Bay. Evening Back to Hanoi Overnight Stay",
                        "image": "/uploads/packages/day-images/mdcdjmbgeaknaltas9rnswslwdd1ynzhrwzq6jlq250605011231.jpg"
                },
                {
                        "day": "Day 2: Ninh Binh",
                        "activity": "Breakfast at hotel Depart for Bana Hills Full Day Tour Visit Bana Hills - a French colonial - era hill station with stunning views and historic  sites & Flower Garden. Explore the Bana Hills cable car, the longest cable car in Vietnam Immerse yourself in  the excitement of Fantasy Park Visiting Green natural forests, Dream stream, Elephant rock. Enjoy the most popular Golden Bridge in Bana Hills. Discover the striking views of  the hand  bridge and country side Beyond. Lunch At Restaurant Visiting Linh Ung Pagoda , French Village & Many Attractions Meet and greet from Airport - Pick Up From Airport Overnight Stay in Danang",
                        "image": "/uploads/packages/day-images/ebvtcubimyfkpibfy5kyma7ld5cpg6jzycoxmsrs250605011648.jpg"
                },
                {
                        "day": "Day 3: Grand World",
                        "activity": "Breakfast at hotel Visit - Marble Mountain (03:30 PM ) a group of five marble and limestone hills  representing the Five Elements Explore Hoi An Ancient Town UNESCO world heritage  site, architecture, temples, and vibrant local markets Dinner at local Restaurant Back to Hotel Overnight stay in Danang",
                        "image": "/uploads/packages/day-images/df7nryykjaxc7l5gozgrdnwamkxpg0oo1if7dw6j250605012127.jpg"
                },
                {
                        "day": "Day 4: Vietnam",
                        "activity": "Breakfast at Hotel Checkout Rooms Airport Drop Flight From to Home country",
                        "image": "/uploads/packages/day-images/i4rduoa6q26wicms4e1hiytgp1mrf186q60amr5d250605012309.jpg"
                }
        ]
},
    "magical-vietnam-package": {
        "id": "76",
        "slug": "magical-vietnam-package",
        "title": "Magical Vietnam",
        "location": "3N Nha trang - 1N Saigon",
        "duration": "4 Nights 5 Days",
        "price": "\u20b9 28500",
        "oldPrice": "\u20b9 30500",
        "image": "/uploads/packages/5lxwwbdd0mh4yklmgl5kfizrzumz99exjffdhnpj250603054551.jpg",
        "description": "",
        "highlights": [
                "Vinpearl Nha Trang,&nbsp;the longest over-water cable car, and the Aquafied Nha Trang wellness complex.&nbsp;Vinpearl Golf Nha Trang provides a challenging golfing experience with stunning views.",
                "Vietnam is known for its mud baths,&nbsp;These baths are believed to offer therapeutic and relaxing benefits, with the mud believed to draw out toxins and soothe muscles.",
                "Ho Chi Minh City (HCMC), formerly known as Saigon, is a vibrant and historical city with numerous attractions.The city also boasts architectural landmarks like Notre Dame Cathedral, the Central Post Office, and the Independence Palace.&nbsp;",
                "Nguyen Hue is a vibrant street with a focus on cultural events, music performances, and street art."
        ],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like activies and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Nha Trang",
                        "activity": "\u2022 Arrival at Hanoi Pick up From Airport and Drop to Hotel Depart for Hanoi Grand World Tour World Tour (Pick up & Drop) The Grand World Tour is a symphony of colors, sounds,   and flavors,  a journey that will leave you with unforgettable memories, and a heart full of love for  Hanoi_ Enjoy Grand World Tour Visit Traditional Songs & Dance Visit Water Shows Take Photos and Enjoy Back to Hotel Overnight Stay at Hanoi",
                        "image": "/uploads/packages/day-images/ufwwijqib9ljbfg9ux7pwu5ejuesn3xmazlqlbuc250605012701.jpg"
                },
                {
                        "day": "Day 2: Nha Trang",
                        "activity": "Breakfast at Hotel Depart for Ninh Binh Tour. Ninh Binh Tour Province is located in northern Vietnam,   about 10 km south of Hanoi. 7:30 pick up at your hotel then depart to Ninh Binh. On the way you can see the picture of  rural Vietnam with fertilizer green fields, buffalos are eating grass, ducks are swimming. 10:30 Arrive Hoa Lu that is the first capital of Vietnam in 10th Century.  The guide will take you to inside Dinh\u2019s Temple & Le Kings Temple Have Lunch with special Vietnamies Food. 14:30 Get on small boat for visiting Trang An eco Tourism. Take boat trip to visit Sang Cave, Toi Cave, Ba Giot Cave, Nau Ruou, Sinh Cave,  Si Cave etc Evening Back to Hanoi Overnight Stay in Hanoi",
                        "image": "/uploads/packages/day-images/eyx2i6mmuzc0sftp0r6pcib7yn0bd31r8ohlkyye250605013202.jpg"
                },
                {
                        "day": "Day 3: Nha Trang",
                        "activity": "Breakfast at Hotel Depart For Halong Bay Day Cruise 08:00 : Our Guide will pick you from Hotel - Arrive at Harbour and check in at  cruise and Relax Lunch on Cruise Full Day Cruise in Halong Bay , a UNESCO world Heritage Site with over  1,600 limestone islands. 14:00 - boat stop at fishing farm and do kayaking or bamboo Boat which is rowed  by local people to visit Luon cave or relaxing at sundeck about 40 minutes. Boat will stop at the wharf then you can go inside to visit Sung Sot cave (or  Supprising cave in english) Boat Moving to TiTop island where you can swimming or Climbing up the top  of the island for overview Halong Bay. Enjoy at Cruise Dinner at Cruise Overnight Stay at Cruise",
                        "image": "/uploads/packages/day-images/b3i7ghksz7vlyplrbw4s6tvfitdacjuky83pmexq250605013609.jpg"
                },
                {
                        "day": "Day 4: Saigon",
                        "activity": "Breakfast at Hotel Check out Cruise Brunch at Cruise Back to Harbour HALONG BAY - HANOI Depart for Halong - Hanoi Evening Back to Hanoi Check in at Hotel \u2022 Refresh & Relax \u2022 Free Leisure Overnight Stay at Hanoi",
                        "image": "/uploads/packages/day-images/bn3aslaa1wttg66krnwjmdhmpbnhc1uiuzdz5nci250605013850.jpg"
                },
                {
                        "day": "Day 5: Vietnam",
                        "activity": "Breakfast at Hotel Checkout Rooms Airport Drop Flight From to Home country",
                        "image": "/uploads/packages/day-images/y2HkhWibk4YX3yK6tFSphpZ28F33peRTC5wlQ98c250605013921.jpg"
                }
        ]
},
    "popular-vietnam-package": {
        "id": "77",
        "slug": "popular-vietnam-package",
        "title": "Popular Vietnam",
        "location": "2N Hanoi - 2N Sapa - 2N Danag",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 38500",
        "oldPrice": "\u20b9 42500",
        "image": "/uploads/packages/yul08VVfF0hPMk6d0YHIfKXkKyos5Bvpw6c2VYEV250527031610.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like activies and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Hanoi",
                        "activity": "Arrival at Hanoi Pick up From Airport and Drop to Hotel Depart for Hanoi City Tour Ho Chi Minh Mausoleum : Pay respects to Vietnam's founding  father, Ho Chi Minh. One Pillar Pagoda : Marvel at the ancient pagoda's unique   architecture Temple of Literature : Discover Vietnam's rich literary history  and cultural heritage. Hoan Kiem Lake : Stroll around the picturesque lake and visit  the Ngoc Son Temple. Old Quarter : Explore the narrow streets and alleys of Hanoi's  historic Old Quarter. Evening Back to Hotel Overnight Stay at Hanoi",
                        "image": "/uploads/packages/day-images/8g70a1qwm4dlgrjtbmxpq34af11vhwn4sbwugjhc250605015330.jpg"
                },
                {
                        "day": "Day 2: Hanoi",
                        "activity": "Breakfast at Hotel Depart For Halong Bay Day Cruise 08:00 : Our Guide will pick you from Hotel - Arrive at  Harbour and check in at cruise and Relax Lunch on Cruise Full Day Cruise in Halong Bay , a UNESCO world Heritage  Site with over 1,600 limestone islands. 14:00 - boat stop at fishing farm and do kayaking or bamboo     Boat which is rowed by local people to visit Luon cave or      relaxing at sundeck about 40 minutes. Boat will stop at the wharf then you can go inside to visit  Sung Sot cave (or Supprising cave in english) Boat Moving to TiTop island where you can swimming or  Climbing up the top of the island for overview Halong Bay. 17:45 - 18:00 - Arrive harbour get on the bus to come back  Hanoi Overnight Stay at Hanoi",
                        "image": "/uploads/packages/day-images/8k2hpozzytmkscjzug6zv0jumhilkxcnyiqyaj1g250605015359.jpg"
                },
                {
                        "day": "Day 3: Sapa",
                        "activity": "Arrival at Ho Chi Minh Pick up From Airport and Drop to Hotel Depart for Cu Chi Tunnel Tour Visit the Cu Chi Tunnels, network of underground tunnel used  during the Vietnam war. Marble at the tunnels many features, from camouflaged drap  doors to a variety of ingenious booby traps. Cu Chi Tunnels: Discover the hidden tunnels and bunkers,  including the infamous \"tunnel of death\". War Museum: Visit the Cu Chi War Museum to learn about  the history of the tunnels and the war. Countryside Scenic Drive: Take in the scenic views of the  Vietnamese countryside during the drive to and from Cu Chi  tunnel Evening Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/xcnhvpmjzvwshnbn392qyyhp9c72l4hqwxpmzsvu250605015524.jpg"
                },
                {
                        "day": "Day 4: Sapa",
                        "activity": "Breakfast at Hotel Depart for Mekong Delta Tour Boat Trip : Take a boat trip along the Mekong River and  explore the delta's winding waterways Floating Markets : Visit the famous floating markets, such  as Cai Be or Cai Rang, and see the locals buying and  selling fresh produce. Lunch at Locatl restaurant Traditional Villages : Explore traditional villages and see  the locals making traditional crafts, such as weaving or  pottery Tropical Fruits : Taste the delicious tropical fruits, such  as mangos, bananas, or coconuts. Enjoy tropical seasonal fruits while listening to traditional  folk Music Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/z0qjzxycdpwqcmhjlxes64866wh3uihwmfeb5xdh250605022537.jpg"
                },
                {
                        "day": "Day 5: Danang",
                        "activity": "Breakfast at Hotel Depart For Bana Hills Tour 07:30 : Our Guide will pick you from Hotel - Starting Journey Ba Na Hills Cable Car : Take a thrilling ride on the world's        longest cable car, offering stunning views of the surrounding     landscape. Golden Bridge : Walk across the iconic Golden Bridge,                   Suspended 150 meters above the ground and offering    breathtalking views Enjoy Buffet Lunch Visit Debay Wine Cellar and Le Jardin D'Amour (Own Cost) Ba Na Hills Fantasy Park : Enjoy thrilling rides and attractions    at the fantasy park (Own Cost) 17:30  Back to Hotel Overnight Stay at Danang",
                        "image": "/uploads/packages/day-images/b0ovoswrsmqprasuiferkfdaqah2deyfbcnz7fq1250605022848.jpg"
                },
                {
                        "day": "Day 6: Danang",
                        "activity": "Breakfast at Hotel Depart For Coconut Village You will go visiting the eco-system of the forest by basket    boats catching crabs, snails and making toys from coconut    leaf. Especially, you can also join the basket boat race,    which will bring you a lot of wonderful experiences. Hoi An Ancient Town :  Explore the ancient town of Hoi An,    a UNESCO World Heritage Site, and visit its historic buildings,    vibrant markets, and narrow streets. Japanese Bridge : Visit the iconic Japanese Bridge, a symbol    of Hoi An. Phuc Kien Assembly Hall : Explore the historic Phuc Kien    Assembly Hall, built in 1690. Dinner at locat Restaurant Overnight Stay at Danang",
                        "image": "/uploads/packages/day-images/jxl9jop2v7efmmgyrrwc8eozdcc7qwp9886l6gcl250605023109.jpg"
                },
                {
                        "day": "Day 7: Vietnam",
                        "activity": "Breakfasr at Hotel Check out Rooms Airport Drop Flight From to Home Country",
                        "image": "/uploads/packages/day-images/lhz0h2rdi0wl8ay45tao3zfe7zeiyavjrg9kaico250605023132.jpg"
                }
        ]
},
    "fabulous-vietnam-package": {
        "id": "78",
        "slug": "fabulous-vietnam-package",
        "title": "Fabulous Vietnam",
        "location": "3N Hanoi - 2N Hochiminh",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 35500",
        "oldPrice": "\u20b9 38500",
        "image": "/uploads/packages/oskhdoun5lxwuoqzmh3p7u5bgs1ghwg5ofeqocky250603055959.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Optional activities in your trip like activies and entry tickets",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Hanoi",
                        "activity": "Arrive in Hanoi Airport Pick up and Drop to Hotel Depart for Hanoi City Tour Ho Chi Minh Mausoleum : Pay respects to Vietnam's founding father, Ho Chi Minh. One Pillar Pagoda : Marvel at the ancient pagoda's unique architecture Temple of Literature : Discover Vietnam's rich literary history and cultural heritage. Evening Back to Hotel Overnight Stay at Hanoi",
                        "image": "/uploads/packages/day-images/gyb35midzvb5tvmnzbdxnbral9hdc1yi92zcectv250605014312.jpg"
                },
                {
                        "day": "Day 2: Hanoi",
                        "activity": "Breakfast at Hotel Depart for Ninh Binh Tour. Ninh Binh Tour Province is located in the northern Vietnam,   about 10 km south of Hanoi 07:30 pick up at your hotel then depart to Ninh Binh on the way  you can see the picture of rural in Vietnam with fertilizer green  fields, buffalos are eating grass, ducks are swimming. 10:30 Arrive Hoa Lu that is the first capital of Vietnam in 10th  Century. The guide will take you to inside Dinh\u2019s Temple & Le   Kings Temple Have Lunch with special Vietnamies Food. 14:30 Get on small boat for visiting Trang An eco Tourism. Take boat trip to visit Sang Cave, Toi Cave, Ba Giot Cave,  Nau  Ruou, Sinh Cave, Si Cave etc 16:30 PM Back to Hanoi - Overnight Stay in Hanoi",
                        "image": "/uploads/packages/day-images/yl2u6vdbstsz7vqvru1taihzltysmbf8nnj30l0w250605014500.jpg"
                },
                {
                        "day": "Day 3: Hanoi",
                        "activity": "Breakfast at Hotel Depart for Halong Bay Full Day Tour.     On the eay you have good chance to visit to see the beautiful       landscapes of  Vietname\u2019s countryside such as : Luc River,     Red River, Buffalos, Green Rice, Cane, Canal Fields. Full Day Cruise in Halong Bay , a UNESCO world Heritage    Site with over 1,600 limestone islands. Lunch on Cruise Explore Hidden Caves, Grottos and Emerald water Visit Titop Island and where you can do swimming or Climbing    up to top of the island for overview Ha long Bay Evening Back to Hanoi Overnight Stay",
                        "image": "/uploads/packages/day-images/pzroihdgzqvo1sm4aehk4egdck6hrnuz4bhkgmgc250605014708.jpg"
                },
                {
                        "day": "Day 4: Hochiminh",
                        "activity": "Arrive in Ho Chi Minh City Airport Pick up and Drop to Hotel Depart For Cu Chi Tunnel Tour Visit the Cu Chi Tunnels, network of underground tunnels used during the Vietnam war. Marble at the tunnels many features, from camouflaged drap doors to a variety of ingenious  booby traps. Cu Chi Tunnels: Discover the hidden tunnels and bunkers,including the infamous \"tunnel of  death\" War Museum: Visit the Cu Chi War Museum to learn about the history of the tunnels and the  war. Countryside Scenic Drive: Take in the scenic views of the Vietnamese countryside during  the drive to and from Cu Chi. Tunnel Evening Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/gvnwqm67izcuy3muvi0cwqxdluplvjtggmzcmnzv250605014736.jpg"
                },
                {
                        "day": "Day 5: Hochiminh",
                        "activity": "Breakfast at Hotel he Mekong Delta is a region in southwestern Vietnam, known for its lush green landscapes, winding waterways, and traditional villages Depart for Mekong Delta Tour Boat Trip : Take a boat trip along the Mekong River and explore the delta's winding waterways Floating Markets :  Visit the famous floating markets, such as Cai Be or Cai Rang, and see  the locals buying and selling fresh produce. Traditional Villages : Explore traditional villages and see the locals making traditional crafts,  such as weaving or pottery. Tropical Fruits : Taste the delicious tropical fruits, such as mangoes, bananas, or coconuts.  Enjoy tropical seasonal fruits while listening to traditional folk Music. Lunch Back to Hotel Overnight Stay at Saigon",
                        "image": "/uploads/packages/day-images/ckooe4sgfwoyaiguhyfmuqolntr6w1wbjnj070z3250605015011.jpg"
                },
                {
                        "day": "Day 6: Vietnam",
                        "activity": "Breakfast at Hotel Checkout Rooms Airport Drop Flight From Danang  to Home country",
                        "image": "/uploads/packages/day-images/vgpkz4spx5fmuflw2xfgqyu6pnpkvdqbiyovtfom250605015037.jpg"
                }
        ]
},
    "charming-vietnam": {
        "id": "79",
        "slug": "charming-vietnam",
        "title": "Charming Vietnam",
        "location": "2 N Siem Reip - 3N Hanoi - 2N Danag",
        "duration": "7 Nights 8 Days",
        "price": "\u20b9 40500",
        "oldPrice": "\u20b9 44500",
        "image": "/uploads/packages/9qvmqhqgvhvl5ai2jd2vernedifnqeivdxdgaldk250603061801.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "Base category twin room price valid for 2 people staying together",
                "Children below 5 years will be complimentary.",
                "Airport Pickup and Drop",
                "English speaking friendly driver cum guide",
                "Meals as mentioned in the programme",
                "All transfers and sightseeing on SIC (Seat-in-Coach) tours as mentioned in the programme"
        ],
        "exclusions": [
                "Any portage at airports and hotels, tips, all items of personal nature.",
                "Optional activities in your trip like activies and entry tickets",
                "CP plans don\u2019t have Lunch and Dinner.",
                "Services not mentioned in the inclusions"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Seim Reip",
                        "activity": "Arrival at Phu Quoc Pick up From Airport and Drop to Hotel - Check in At Hotel , Refresh & Relax Depart for Grand World Tour (Pick up & Drop) The Grand World Tour is a symphony of colors, sounds, and flavors, a journey that will        leave you    with unforgettable memories, and a heart full of love for Phu Quoc Enjoy Grand World Tour Visit Traditional Songs & Dance Visit Water Shows Take Photos and Enjoy Night Vibe Back to Hotel Overnight Stay at Phu Quoc",
                        "image": "/uploads/packages/day-images/6ll3cvrsangode8l335yvjzpjspiexyakavhhez9250605023612.jpg"
                },
                {
                        "day": "Day 2: Seim Reip",
                        "activity": "Breakfast at Hotel Depart For 4 island Tour 08:00 pick up from your hotel at lobby or pick up point Arrive at An Thoi harbor - board on speed boat Visit 3 islands in the south Mong Tay Island: Enjoy the beach.  May Rut Island: Take photograph, Fly Cam with       sup . Gam Ghi Island: Snorkeling at coral reef exploring . Lunch on the island Speed boat arrive Thom Island: Enjoy water park \u2013 more than 20 modern games       from the world\u2019s leading manufactures. Back on cable car (around 25 mins):        Enjoy sunset & rides with a panoramic overall view of islands Evening Visit Kiss Bridge : it is a Picturesque Pedestrian Bridge in Phu Quic Enjky Kiss Of the Sea Star Show :  Enjoy Breathtaking View Back to Hotel Overnight Stay at Phu Quoc",
                        "image": "/uploads/packages/day-images/wrqorwjcz4gf2x94g2txyriiacx1qeqkejgsegxc250606103147.jpg"
                },
                {
                        "day": "Day 3: Hanoi",
                        "activity": "Arrival at Hanoi Airport Airport Pick up and Drop to Hotel Guide Meet and pick up at hotel. Depart For Hanoi City Tour Visiting  Ho Chi Minh Complex One Pillar Pagoda  , Tran Quoc Pagoda , Hanoi Old Quarter Explore the Temple of Literature (1076 AD), Deficated to    Confucius and Vietnam\u2019s rich literary heritage. 05:30 PM Back to Hotel , Free Time for relaxing. Overnight stay in Hanoi",
                        "image": "/uploads/packages/day-images/eumm2mkq2orqgt4exe42o5nxcbio5gefsnowrklh250606103515.jpg"
                },
                {
                        "day": "Day 4: Hanoi",
                        "activity": "Breakfast at Hotel Depart for Ninh Binh Tour.    Ninh Binh Tour Province is located in the northern Vietnam,   about 10 km south of Hanoi 07:30 pick up at your hotel then depart to Ninh Binh on the way  you can see the picture of rural in Vietnam with fertilizer green  fields, buffalos are eating grass, ducks are swimming 10:30 Arrive Hoa Lu that is the first capital of Vietnam in 10th  Century. The guide will take you to inside Dinh\u2019s Temple & Le   Kings Temple Have Lunch with special Vietnamies Food. 14:30 Get on small boat for visiting Trang An eco Tourism. Take boat trip to visit Sang Cave, Toi Cave, Ba Giot Cave,  Nau  Ruou, Sinh Cave, Si Cave etc 16:30 PM Back to Hanoi - Overnight Stay in Hanoi",
                        "image": "/uploads/packages/day-images/2vgykkylqnxwsfcttppu8by1e5jz2daartqvker1250606103946.jpg"
                },
                {
                        "day": "Day 5: Hanoi",
                        "activity": "Breakfast at Hotel Depart for Halong Bay Full Day Tour.     On the eay you have good chance to visit to see the beautiful       landscapes of  Vietname\u2019s countryside such as : Luc River,     Red River, Buffalos, Green Rice, Cane, Canal Fields. Full Day Cruise in Halong Bay , a UNESCO world Heritage    Site with over 1,600 limestone islands.  \u2022 Lunch on Cruise Explore Hidden Caves, Grottos and Emerald water. Visit Titop Island and where you can do swimming or Climbing    up to top of the island for overview Ha long Bay Evening Back to Hanoi Overnight Stay",
                        "image": "/uploads/packages/day-images/vxnvcyuf04y2yomp6nrorhibb41f4djcd62rzf4x250606104220.jpg"
                },
                {
                        "day": "Day 6: Danang",
                        "activity": "Breakfast at Hotel Check out from Hotel Airport Drop Flight From Hanoi to Danang Arrive at Danang, A city with a rich history dating     back to the 2nd century BC. Meet and greet from Airport - Pick Up Hotel Drop - Check in Hotel Visit - Marble Mountain (03:30 PM ) a group of five marble and     limestone hills representing the Five Elements. Explore Hoi An Ancient Town UNESCO world heritage site,     architecture, temples, and vibrant local markets. Dinner at local Restaurant Back to Hotel Overnight stay in Danang",
                        "image": "/uploads/packages/day-images/vr8ntwfddexiovmlkgfqck23neuxq6xnga3fgc7r250606104600.jpg"
                },
                {
                        "day": "Day 7: Danang",
                        "activity": "Breakfast at hotel Depart for Bana Hills Full Day Tour Visit Bana Hills - a French colonial - era hill station with     stunning views and historic sites & Flower Garden. Explore the Bana Hills cable car, the longest cable car in     Vietnam Immerse yourself in the excitement of Fantasy Park Visiting Green natural forests, Dream stream, Elephant rock. Enjoy the most popular Golden Bridge in Bana Hills.    Discover the striking views of the hand bridge and country   side Beyond. Lunch At Restaurant Visiting Linh Ung Pagoda , French Village & Many Attractions Overnight Stay in Danang",
                        "image": "/uploads/packages/day-images/nt7nrjvvspm5myiwnhmdowdlf35iqxigf3ttumzr250606104947.jpg"
                },
                {
                        "day": "Day 8: Vietnam",
                        "activity": "Breakfast at Hotel Check out Rooms Airport Drop Flight From Danang to Home Country",
                        "image": null
                }
        ]
},
    "dubai-package-1": {
        "id": "80",
        "slug": "dubai-package-1",
        "title": "Dubai Package",
        "location": "6N Dubai",
        "duration": "6 Nights 7 Days",
        "price": "\u20b9 50400",
        "oldPrice": "\u20b9 65100",
        "image": "/uploads/packages/kbtqjlCKQNNuhMP0GPgbaNNl1ewhvNSCNEVgh0Vm260130012049.jpg",
        "description": "44700",
        "highlights": [],
        "inclusions": [
                "All above mentioned Entry Tickets are included",
                "All transfers are made on a private basis and sic basis",
                "02 Dinner included ( Creek dhow cruise & desert safari )",
                "Breakfast Included",
                "Hotel - Tourism Fee, Municipality Fee, VAT"
        ],
        "exclusions": [
                "Airfare not included",
                "All activities and transfers which are apart from the itinerary.",
                "Any personal expenses/ Porterage/ Tips",
                "Tourist Visa and Travel Insurance"
        ],
        "itinerary": [
                {
                        "day": "Day 1: Arrival at Dubai",
                        "activity": "Arriavl At Dubai CREEK DHOW  CRUISE WITH DINNER (SIC)",
                        "image": null
                },
                {
                        "day": "Day 2: City Tour",
                        "activity": "Breakfast at Hotel HALF DAY DUBAI CITY TOUR  (sic) Overnight stay in resort",
                        "image": null
                },
                {
                        "day": "Day 3: City Tour",
                        "activity": "Breakfast at Hotel BURJ KHALIFA 124TH 125TH FLOOR NON PRIME DESERT SAFARI WITH BBQ DINNER (SIC) Overnight stay in Hotel",
                        "image": null
                },
                {
                        "day": "Day 4: Free Day",
                        "activity": "Breakfast from hotel Free day Overnight stay in resort",
                        "image": null
                },
                {
                        "day": "Day 5: Further sightseeings",
                        "activity": "Breakfast from hotel MIRACLE GARDEN (SIC) visit GLOBAL VILLAGE (SIC) Visit Overnight stay at Hotel",
                        "image": null
                },
                {
                        "day": "Day 6: Abu Dhabi Sightseeings",
                        "activity": "Breakfast at Hotel AUH CITY TOUR (SIC) GRAND MOSQUE Overnight stay in Hotel",
                        "image": null
                },
                {
                        "day": "Day 7: Departure",
                        "activity": "Breakfast at Hotel Check out from Hotel Transfer to Airport Return to Home with good memories",
                        "image": null
                }
        ]
},
    "dubai-package-2": {
        "id": "81",
        "slug": "dubai-package-2",
        "title": "Dubai Package",
        "location": "5N Dubai",
        "duration": "5 Nights 6 Days",
        "price": "\u20b9 44800",
        "oldPrice": "\u20b9 59800",
        "image": "/uploads/packages/ZBPQ8Obws9f24JY46ra8u32gHwujJxweITRQ77o7260130012126.jpg",
        "description": "",
        "highlights": [],
        "inclusions": [
                "All above mentioned Entry Tickets are included",
                "All transfers are made on a private basis and sic basis",
                "02 Dinner included (creek cruise & desert safari)",
                "Breakfast Included",
                "Hotel - Tourism Fee, Municipality Fee, VAT"
        ],
        "exclusions": [
                "Airfare not included",
                "All activities and transfers which are apart from the itinerary.",
                "Any personal expenses/ Porterage/ Tips",
                "Tourist Visa and Travel Insurance"
        ],
        "itinerary": [
                {
                        "day": "Day 1: ARRIVAL - DUBAI",
                        "activity": "ARRIVAL - DUBAI DHOW CRUISE WITH DINNER (SIC)",
                        "image": null
                },
                {
                        "day": "Day 2: HALF DAY DUBAI CITY TOUR",
                        "activity": "Breakfast at Hotel HALF DAY DUBAI CITY TOUR (sic) Overnight stay in resort",
                        "image": null
                },
                {
                        "day": "Day 3: City Tour",
                        "activity": "Breakfast at Hotel BURJ KHALIFA 124TH 125TH FLOOR NON PRIME (MORNING SLOT)       (2 way transfer) DESERT SAFARI WITH BBQ DINNER (SIC)",
                        "image": null
                },
                {
                        "day": "Day 4: City Tour",
                        "activity": "Breakfast at Hotel MIRACLE GARDEN (SIC) GLOBAL VILLAGE (SIC)",
                        "image": null
                },
                {
                        "day": "Day 5: Abu Dhabi city tour",
                        "activity": "Breakfast at Hotel AUH CITY TOUR (SIC) GRAND MOSQUE Overnight stay in Hotel",
                        "image": null
                },
                {
                        "day": "Day 6: Departure",
                        "activity": "Breakfast at Hotel Check out from Hotel Transfer to Airport Return to Home with good memories",
                        "image": null
                }
        ]
},
};
