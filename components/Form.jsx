import React from "react";
import Link from "next/link";

const Feed = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} </span>Post
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI platform
      </p>
      <br />
      <form 
      onSubmit={handleSubmit} 
      className='mt-10 w-full' 
      action=''>
        
      </form>
    </section>
  );
};

export default Feed;
