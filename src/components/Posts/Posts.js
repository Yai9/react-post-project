import React, { Fragment, useState, useEffect } from "react";
import Post from "../Post/Post.js";
import "./Posts.css";

const Posts = () => {
  const [postData, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetch(
        "https://dummyapi.io/data/v1/post?page=0&limit=10",
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );
      const result = await postData.json();
      setData(result);
      return result;
    };

    fetchData();
  }, []);
  let post;
  let postArray = JSON.parse(localStorage.getItem("postData"));
  if (postArray) {
    post = postArray.map((res) => {
      return (
        <li key={res.id}>
          <Post
            id={res.id}
            title={res.text}
            image={res.image}
            likes={res.likes}
            owner={res.owner}
            tags={res.tags}
            date={res.publishDate}
          />
        </li>
      );
    });
  } else if (postData) {
    post = postData.data.map((res) => {
      localStorage.setItem("postData", JSON.stringify(postData.data));
      return (
        <li key={res.id}>
          <Post
            id={res.id}
            title={res.text}
            image={res.image}
            likes={res.likes}
            owner={res.owner}
            tags={res.tags}
            date={res.publishDate}
          />
        </li>
      );
    });
  }

  return (
    <Fragment>
      <div className="posts_container">{post}</div>
    </Fragment>
  );
};

export default Posts;
