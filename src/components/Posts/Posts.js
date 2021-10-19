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
      localStorage.setItem('postData', result)
      return result;
    };

    fetchData();
  }, []);
  let post;

  if (postData) {
    post = postData.data.map((res) => (
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
    ));
  }

  console.log(postData, "postData");
  return (
    <Fragment>
      <div className="posts_container">{post}</div>
    </Fragment>
  );
};

export default Posts;
