"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={() => {}}
            handleEdit={() => {}}
            handleDelete={() => {}}
          ></PromptCard>
        );
      })}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  if (!session) {
    return (
      <section className='sectionB feed' style={{ marginTop: -15 + "px" }}>
        <div className='blob'>
          <svg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='b'>
                <stop offset='0%' stop-color='#ff8100' />
                <stop offset='100%' stopColor='#ffaf38' />
              </linearGradient>
              <clipPath id='a'>
                <path
                  fill='currentColor'
                  d='M916.5 632.5q-52.5 132.5-171 196t-234 27Q396 819 285 778T96 618.5Q18 500 136.5 411t190-157Q398 186 513 146.5T766 157q138 50 170.5 196.5t-20 279Z'
                />
              </clipPath>
            </defs>
            <g clipPath='url(#a)'>
              <path
                fill='url(#b)'
                d='M916.5 632.5q-52.5 132.5-171 196t-234 27Q396 819 285 778T96 618.5Q18 500 136.5 411t190-157Q398 186 513 146.5T766 157q138 50 170.5 196.5t-20 279Z'
              />
            </g>
          </svg>
          <div
            className='text-3xl font-extrabold leading-[1.15] text-white md:text-5xl w-75% h-75% flex-center text-center'
            style={{ marginTop: "-60%", fontSize: "54px"}}
          >
            Log or Sign In 
            <br />
            to get started!!!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleClick={() => {}} />
    </section>
  );
};

export default Feed;
