import React, { useEffect } from "react";
import "./style.css";

const Post = ({ imagesData, setPage, page }) => {
  useEffect(() => {
    const lastImage = document.querySelector("#img-post:last-child");

    const observer = new IntersectionObserver(
      (param) => {
        console.log(param, "[[[[[[");
        if (param?.[0]?.isIntersecting) {
          observer.unobserve(lastImage);
          setPage(page + 1);
        }
      },
      {
        threshold: 0.5, //it colud between 0 to 1 and it mean, if if 0.5 then it means last image 50% porton in in visible are then after call the observer
      }
    );
    console.log(lastImage, "imgesssssss");
    if (!lastImage) {
      return;
    }
    observer.observe(lastImage);

    return () => {
      observer.unobserve(lastImage);
      observer.disconnect();
    };
  }, [imagesData, page]);

  return (
    <div className="imagecontainer">
      {imagesData.length > 0 &&
        imagesData?.map((data, index) => {
          return (
            <img
              id="img-post"
              className="image_view"
              src={data.download_url}
              alt="images..."
              key={index}
              height={350}
              width={300}
              loading="lazy"
            />
          );
        })}
    </div>
  );
};

export default Post;
