import React, { Fragment, useState, useEffect } from "react";
import "./PostEdit.css";

const PostEdit = (props) => {
  let postArray = JSON.parse(localStorage.getItem("postData"));
  let postItem = JSON.parse(localStorage.getItem("postData")).find(
    (i) => i.id === props.match.params.id
  );

  const [state, setState] = useState(postItem);

  const editPostItem = (event) => {
    event.preventDefault();
    const updatedItem = { ...postItem, ...state };
    const itemIndex = postArray.findIndex(
      (i) => i.id === props.match.params.id
    );
    const updatedItems = [...postArray];
    updatedItems[itemIndex] = updatedItem;
    localStorage.setItem("postData", JSON.stringify(updatedItems));
    window.location.pathname = "/";
    return updatedItems;
  };

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
      return result;
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="form-section">
        <h1>Edit Post</h1>
        {postArray ? (
          <form className="form" onSubmit={editPostItem}>
            <div className="form-control">
              <label>Title</label>
              <input
                id="title"
                value={state.text}
                onChange={(event) => setState({ text: event.target.value })}
              />
            </div>
            <div className="form-control">
              <label>Picture</label>
              <input
                id="pictureUrl"
                value={state.image}
                onChange={(event) => setState({ image: event.target.value })}
              />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
            <button className="submit-button" type="button" onClick={()=>window.location.pathname="/"}>
           Back 
            </button>
          </form>
        ) : null}
      </div>
    </Fragment>
  );
};

export default PostEdit;
