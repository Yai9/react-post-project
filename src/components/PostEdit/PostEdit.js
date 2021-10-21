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
    console.log(...updatedItems, "updatedItems");
    console.log(updatedItem, "item");
    localStorage.setItem("postData", JSON.stringify(updatedItems));
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

  console.log(
    JSON.parse(localStorage.getItem("postData")).find(
      (i) => i.id === props.match.params.id
    ),
    "localStorageItem"
  );
  console.log(state, "state");

  return (
    <Fragment>
      <div className="form-section">
        <h1>Edit Post</h1>
        {postArray ? (
          <form className="form" onSubmit={editPostItem}>
            <div class="form-control">
              <label>Title</label>
              <input
                id="title"
                value={state.text}
                onChange={(event) => setState({ text: event.target.value })}
              />
            </div>
            <div class="form-control">
              <label>Picture</label>
              <input
                id="pictureUrl"
                value={state.image}
                onChange={(event) => setState({ image: event.target.value })}
              />
            </div>
            <div class="form-control">
              <label>Tags</label>
              <input
                id="tags"
                value={state.tags}
                onChange={(event) => setState({ tags: [event.target.value] })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : null}
      </div>
    </Fragment>
  );
};

export default PostEdit;
