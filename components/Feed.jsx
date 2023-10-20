"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const PromptCardList = ({ data, handleClick, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={handleTagClick}
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
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [response, setResponse] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    setResponse(true);
    try {
      console.log(searchText)
      const res = await fetch(`/api/prompt/search/${searchText.trim()}`);
      const data = await res.json();

      setPosts(data);
    } catch (err) {
      console.log(err);
    }
    setSearchText("");
  };

  const backToFeedHandler = () => {
    setSearchText("");
    setResponse(true);
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  };

  const handleTagClick = async (text) => {
    setResponse(true);
    try {
      const data = posts.filter(p=>p.tag === text);

      setPosts(data);
    } catch (err) {
      console.log(err);
    }
    setSearchText("");
  };

  useEffect(() => {
    setResponse(false);
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const feedback = response ? (
              <section
                className='space-y-6 py-8 w-full'
                style={{ marginTop: 30 + "px" }}
              >
                <h1 className='text-3xl sm:text-5xl font-bold leading-[1.15] text-black text-center'>
                  Invalid tag or there is no prompts with that tag :(
                </h1>
                <p className='text-gray-700 text-center mt-5'>
                  Try creating prompts with specific tags or continue browsing
                  all of the prompts.
                </p>
                <div
                  className='flex justify-between'
                  style={{ marginTop: 80 + "px" }}
                >
                  <div className='bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-2 text-white font-semibold'>
                    <Link className='mx-2' href='/create-prompt'>
                      Create Prompt
                    </Link>
                  </div>
                  <div>
                    <button
                      className='rounded-full border border-black bg-transparent py-2 px-6 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center'
                      onClick={backToFeedHandler}
                    >
                      Back to all prompts
                    </button>
                  </div>
                </div>
              </section>
            ) : "";

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
            style={{ marginTop: "-60%", fontSize: "54px" }}
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
      <form onSubmit={searchHandler} className='relative w-full flex-center'>
        <div
          onClick={backToFeedHandler}
          className='mr-3 bg-orange-400 py-1.5 
          drop-shadow-md hover:drop-shadow-lg px-2 rounded-full  text-white font-semibold cursor-pointer transition-all'
        >
          All
        </div>
        <input
          type='text'
          placeholder='Enter tag,username or part of the prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        <button
          className=' ml-3 bg-orange-400 p-2 rounded-full drop-shadow-md hover:drop-shadow-lg'
          type='submit'
        >
          <AiOutlineSearch className='text-white' size={20} />
        </button>
      </form>

      {posts.length === 0 ? feedback : (
        <PromptCardList
          data={posts}
          handleClick={() => {}}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
