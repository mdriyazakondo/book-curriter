import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { use } from "react";
import ReviewCard from "./ReviewCard";
import Container from "../../../shared/Container/Container";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="bg-slate-50/30 dark:bg-slate-900/40 py-16 transition-colors duration-300">
      <Container>
        <div className="relative">
          <div className="mb-14 flex items-center justify-center flex-col text-center">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
              Testimonials
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              What Our{" "}
              <span className="text-emerald-600 italic">Customers</span> Say
            </h3>

            <div className="w-20 h-1.5 bg-emerald-500 rounded-full mt-4 mb-6"></div>

            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed">
              Fast and reliable book delivery right to your doorstep. Experience
              timely deliveries and excellent customer service with{" "}
              <span className="text-slate-900 dark:text-emerald-500 font-bold">
                BookCourier
              </span>
              .
            </p>
          </div>

          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              scale: 0.85,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="pb-16 px-4!"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="py-10">
                <div className="transition-all duration-500">
                  <ReviewCard review={review} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
