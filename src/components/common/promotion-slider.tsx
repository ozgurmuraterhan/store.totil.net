import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// dummy data
const data = [
  {
    id: 1,
    title: "Coupon Savings",
    bannerUrl: "/promotion/offer-1.png",
  },
  {
    id: 2,
    title: "Free Delivery",
    bannerUrl: "/promotion/offer-2.png",
  },
  {
    id: 3,
    title: "Gift Voucher",
    bannerUrl: "/promotion/offer-3.png",
  },
  {
    id: 4,
    title: "Cash On Delivery",
    bannerUrl: "/promotion/offer-4.png",
  },
  {
    id: 5,
    title: "Express Delivery",
    bannerUrl: "/promotion/offer-5.png",
  },
];

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};
SwiperCore.use([Navigation]);

export default function PromotionSlider() {
  return (
    <div className="px-6 py-5 md:px-8 xl:px-12 md:py-10 border-t border-gray-200">
      <div className="relative">
        <Swiper
          id="offer"
          loop={true}
          breakpoints={offerSliderBreakpoints}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {data?.map((d) => (
            <SwiperSlide key={d.id}>
              <img
                className="w-full h-auto"
                src={d.bannerUrl}
                alt={d.title}
                width="430"
                height="200"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="prev cursor-pointer absolute top-2/4 -left-4 md:-left-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl border border-gray-200 border-opacity-70 flex items-center justify-center text-gray-800 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
          role="button"
        >
          <span className="sr-only">previous</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="next cursor-pointer absolute top-2/4 -right-4 md:-right-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl border border-gray-200 border-opacity-70 flex items-center justify-center text-gray-800 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
          role="button"
        >
          <span className="sr-only">next</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
