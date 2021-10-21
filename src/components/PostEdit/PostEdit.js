import React, { Fragment, useState, useEffect } from "react";
import "./PostEdit.css";

const PostEdit = (props) => {
  const [postData, setPostData] = useState();
  const [state, setState] = useState({
    title: "",
    picture: "",
    tags: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetch(
        `https://dummyapi.io/data/v1/post/${props.match.params.id}`,
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );

      const result = await postData.json();
      setPostData(result);
      return result;
    };

    fetchData();
  }, []);

  console.log(postData, "postData");

  return (
    <Fragment>
      <div className="form-section">
        <h1>Edit Post</h1>
        {postData ? (
          <form className="form">
            <div class="form-control">
              <label>Title</label>
              <input
                id="title"
                value={postData.text}
                onChange={(event) => setPostData({ text: event.target.value })}
              />
            </div>
            <div class="form-control">
              <label>Picture</label>
              <input
                id="pictureUrl"
                value={postData.image}
                onChange={(event) => setPostData({ image: event.target.value })}
              />
            </div>
            <div class="form-control">
              <label>Tags</label>
              <input
                id="tags"
                value={postData.tags}
                onChange={(event) => setPostData({ tags: event.target.value })}
              />
            </div>
          </form>
        ) : null}
      </div>
    </Fragment>
  );
};

export default PostEdit;
