import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostEdit from "../PostEdit/PostEdit.js";
import "./PostDetail.css";

const PostDetail = (props) => {
  const [postDetail, setDetail] = useState();
  const [comments, setComments] = useState();
  const [editMode, setEditMode] = useState(false);

  const editModeHandler = () => {
    return (window.location.pathname = `/edit/${props.match.params.id}`);
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

      const commentsData = await fetch(
        `https://dummyapi.io/data/v1/post/${props.match.params.id}/comment?limit=10`,
        {
          headers: {
            "app-id": "616dd2a1aabb17f7eeb7ff58",
          },
        }
      );
      const result = await postData.json();
      const comments = await commentsData.json();
      setDetail(result);
      setComments(comments);
      return result;
    };

    fetchData();
  }, []);

  console.log(postDetail, "postDetail");
  console.log(comments, "commentDetail");
  return (
    <Fragment>
      {postDetail && comments && (
        <div key={postDetail.id} className="detailed_post">
          <div className="detailed_post_owner">
            <img
              className="profile_image"
              src={postDetail.owner.picture}
              alt={postDetail.owner.firstName}
            />
            <h4>
              {postDetail.owner.firstName + " "}
              {postDetail.owner.lastName}
            </h4>
            <span className="post_date">{postDetail.publishDate}</span>
          </div>
          <div className="detailed_post_title">
            <h2>{postDetail.text}</h2>
          </div>
          <div className="detailed_post_image">
            <img
              className="post_image"
              src={postDetail.image}
              alt={postDetail.title}
            />
          </div>
          <div className="detailed_post_footer">
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>{postDetail.likes}</span>{" "}
                likes
              </p>
              <div className="post_tags">
                {postDetail.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </div>
            </div>

            {comments.data.length == 0 ? (
              <p>No comments on this post.</p>
            ) : (
              <div className="post_comments">
                Show {" " + comments.data.length + " "} comments
              </div>
            )}
          </div>
          <Link className="detailed_post_link" to="/">
            Back
          </Link>
          <button className="detailed_post_button" onClick={editModeHandler}>
            Edit Post
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PostDetail;
