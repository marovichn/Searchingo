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
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        action=''
      >
        <label htmlFor=''>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Ai Prompt
          </span>
          <textarea
        id="textarea-prompt"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />
        </label>
        

        <label htmlFor=''>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag 
            <span className="font-normal ml-1"> (#product, #webdev, #art, #idea)</span>
          </span>
          <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder='#tag'
          required
          className='form_input'
        />
        </label>
        
        <button className="">Create!</button>
      </form>
    </section>
  );
};

export default Feed;
