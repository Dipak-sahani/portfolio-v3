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
    "https://img.berojgarfounder.com/website.content/dp0.jpg",
    "https://img.berojgarfounder.com/website.content/dp2.jpeg",
    "https://img.berojgarfounder.com/website.content/dp3.jpeg",
    "https://img.berojgarfounder.com/website.content/dp4.jpeg",
    "https://img.berojgarfounder.com/website.content/dp5.jpeg",
    "https://img.berojgarfounder.com/website.content/dp6.jpeg",
    "https://img.berojgarfounder.com/website.content/dp7.jpeg",
    "https://img.berojgarfounder.com/website.content/dp8.jpeg",
    "https://img.berojgarfounder.com/website.content/dp9.jpeg",
  ];

  const scrollRef = useRef(null);
  const position = useRef(0); // float accumulator
  const isPaused = useRef(false);
  const speed = 0.2; // works perfectly now

  useEffect(() => {
    const el = scrollRef.current;
    let raf;

    const animate = () => {
      if (!isPaused.current) {
        position.current += speed;
        el.scrollLeft = position.current;
        // seamless loop
        if (position.current >= el.scrollWidth / 2) {
          position.current = 0;
          el.scrollLeft = 0;
        }
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
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
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
