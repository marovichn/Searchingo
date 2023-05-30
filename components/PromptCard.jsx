import React from "react";

const PromptCard = ({ post, tag, handleTagClick }) => {
  return (
    <div>
      <div>{post}</div>
      <div>{tag}</div>
    </div>
  );
};

export default PromptCard;
