import React from "react";
import PromptCard from "./PromptCard";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";

const Profile = ({ name, desc, data, handleEdit, handleDelete, favorites }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}'s</span> Profile
      </h1>
      <p className='mt-10 desc text-left '>{desc}</p>
      <div className='flex flex-between gap-12 w-full'>
        {data.length !== 0 && (
          <h3 className='font-semibold mt-10 text-2xl'>Your prompts</h3>
        )}
        {data.length === 0 && (
          <h3 className='font-semibold mt-10 text-2xl'>
            Try creating some prompts !
          </h3>
        )}
        <div className='cursor-pointer mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-2'>
          <Link
            className='font-inter text-sm text-white mx-3 font-semibold '
            href='/'
          >
            Back to Feed
          </Link>
        </div>
      </div>

      <div className='mt-3 prompt_layout'>
        {data.map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              post={prompt}
              handleEdit={() => handleEdit(prompt)}
              handleDelete={() => handleDelete(prompt)}
            ></PromptCard>
          );
        })}
      </div>
      <div className='flex flex-between gap-12 w-full'>
        {favorites.length !== 0 && (
          <h3 className='font-semibold mt-10 text-2xl flex items-ceter justify-start gap-x-2 text-rose-500'>
            <AiFillHeart className="text-rose-500 -mt-1"/> Favorite Prompts :
          </h3>
        )}
        {favorites.length === 0 && (
          <h3 className='font-semibold mt-10 text-2xl'>
            Add some prompts to favorites !
          </h3>
        )}
      </div>

      <div className='mt-3 prompt_layout'>
        {favorites.map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              post={prompt}
              handleEdit={() => handleEdit(prompt)}
              handleDelete={() => handleDelete(prompt)}
              favorite={true}
            ></PromptCard>
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
