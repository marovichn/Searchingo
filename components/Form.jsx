import React from "react";

const Feed = ({
  type,
      post,
      setPost,
      submitting,
      handleSubmit,
}) => {
  return <div >
    <form className="flex" action="">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />
    </form>
  </div>;
};

export default Feed;
