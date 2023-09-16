"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string[]>();

  const fetchRandomImage = async () => {
    let temp: string[] = [];
    for (let i = 0; i < 5; i++) {
      const image = await axios.get(
        "http://localhost:9000/getRandomEventImage"
      );
      console.log(image.data.randomImageURL);
      temp.push(image.data.randomImageURL);
    }

    setImageUrl(temp);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[500px] bg-slate-500 shadow">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {imageUrl?.map((url, idx) => (
            <>
              <SwiperSlide key={idx}>
                <Image
                  loader={({ src }) => src}
                  alt="Cant Load Image"
                  src={url}
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
