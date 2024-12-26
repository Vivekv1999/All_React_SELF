/**
 * @param {Object} props
 * @param {string} props.title
 */
import React, { useEffect, useState } from "react";
import Post from "./Post";

const InfiniteScroll = () => {
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchImaes = async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=5`
      );
      const data = await res.json();
      setImagesData([...imagesData, ...data]);
      console.log(data, "resss");
    };
    fetchImaes();
  }, [page]);

  return <Post imagesData={imagesData} setPage={setPage} page={page} />;
};

export default InfiniteScroll;
