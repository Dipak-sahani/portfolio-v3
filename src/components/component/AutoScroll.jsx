import { useEffect, useRef } from "react";

const ImageAutoScroll = () => {

  //     const images = [
  //   "/images/dp0.jpg",
  //   "/images/dp1.jpeg",
  //   "/images/dp2.jpeg",
  //   "/images/dp3.jpeg",
  //   "/images/dp4.jpeg",
  //   "/images/dp5.jpeg",
  //   "/images/dp6.jpeg",
  //   "/images/dp7.jpeg",
  //   "/images/dp8.jpeg",
  //   "/images/dp9.jpeg",


  // ];




  const images = [
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/HomePage.jpg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp2.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp3.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp4.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp5.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp6.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp7.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp8.jpeg",
    "https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/scroll_Images_LandingPage/dp9.jpeg",
  ];

  const scrollRef = useRef(null);
  const position = useRef(0); // float accumulator
  const speed = 0.2; // works perfectly now

  useEffect(() => {
    const el = scrollRef.current;
    let raf;

    const animate = () => {
      position.current += speed;
      el.scrollLeft = position.current;

      // seamless loop
      if (position.current >= el.scrollWidth / 2) {
        position.current = 0;
        el.scrollLeft = 0;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto overflow-y-hidden w-full scrollbar-hide no-scrollbar"
    >
      <div className="flex w-max gap-6 px-6 items-center">
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className=" h-50 sm:h-120 w-auto rounded-xl object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageAutoScroll;
