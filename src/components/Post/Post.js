import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
  return (
    <Fragment>
      <div key={props.id} className="single_post">
        <div className="single_post_owner">
          <img
            className="profile_image"
            src={props.owner.picture}
            alt={props.owner.firstName}
          />
          <h4>
            {props.owner.firstName + " "}
            {props.owner.lastName}
          </h4>
          <span className="post_date">{props.date}</span>
        </div>
        <div className="single_post_title">
          <h2>{props.title}</h2>
        </div>
        <div className="single_post_image">
          <img className="post_image" src={props.image} alt={props.title} />
        </div>
        <div className="single_post_footer">
          <p>
            <span style={{ fontWeight: "bold" }}>{props.likes}</span> likes
          </p>
          <Link className="single_post_link" to={`/${props.id}`}>
            View Full Post
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Post;
