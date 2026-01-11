import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router";

// Static Data (Same as before)
const staticSliders = [
  {
    _id: "1",
    bookName: "The Art of Creative Thinking",
    authorName: "Rod Judkins",
    genre: "Self-Help",
    description:
      "Discover the secrets of the world's most creative people and how you can apply their methods to your own life and work.",
    price: 25.5,
    image:
      "https://m.media-amazon.com/images/I/41JxG-hSKSL._SL10_UR1600,800_CR200,50,1024,512_CLa%7C1024,512%7C41JxG-hSKSL.jpg",
    status: "published",
  },
  {
    _id: "2",
    bookName: "Modern Web Architecture",
    authorName: "Sarah Drasner",
    genre: "Technology",
    description:
      "Learn how to build scalable, high-performance web applications using the latest industry standards and tools.",
    price: 45.0,
    image:
      "https://acropolium.com/img/articles/modern-web-app-architecture/img07.jpg",
    status: "published",
  },
  {
    _id: "3",
    bookName: "The Midnight Library",
    authorName: "Matt Haig",
    genre: "Fiction",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life.",
    price: 18.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbG1_hOgdDPtkyUGAXYbr3vzwX-q4QBu1QkQ&s",
    status: "published",
  },
];

const HeroSection = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-4 md:px-0 py-8">
      <Swiper
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        {staticSliders.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-8 md:p-16 lg:p-20 min-h-[500px] transition-colors duration-300">
              <div className="flex flex-col justify-center items-center md:items-start space-y-6 text-center md:text-left order-2 md:order-1">
                <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  Featured Release
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {slide.bookName}
                </h1>

                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-lg md:text-xl flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-8 h-0.5 bg-emerald-500 hidden md:block"></span>
                    By {slide.authorName}
                  </p>
                  <span className="inline-block text-slate-400 dark:text-slate-500 text-sm font-semibold uppercase tracking-wide">
                    {slide.genre}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <p className="text-3xl font-black text-slate-900 dark:text-emerald-500">
                    ${slide.price}
                  </p>
                  <Link to={`/all-books`}>
                    <button className="bg-slate-900 dark:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-200 dark:shadow-none">
                      Explore Now
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center relative order-1 md:order-2">
                <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-600 rounded-full blur-3xl opacity-30 dark:opacity-10 scale-75"></div>

                <div className="relative z-10 group">
                  <img
                    src={slide.image}
                    alt={slide.bookName}
                    className="h-[300px] md:h-[450px] w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-50 dark:border-slate-700 animate-bounce">
                    <p className="text-emerald-600 dark:text-emerald-400 font-black text-xl leading-none">
                      20%
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase">
                      Off Today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #059669 !important;
          width: 25px !important;
          border-radius: 5px !important;
        }
        .swiper-pagination-bullet {
          background: #94a3b8; /* slate-400 */
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #10b981 !important; /* emerald-500 */
          transform: scale(0.4);
        }
        .dark .swiper-button-next,
        .dark .swiper-button-prev {
          color: #34d399 !important; /* emerald-400 for dark mode */
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
