import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}'s</span> Profile
      </h1>
      <p className='mt-10 desc text-left '>{desc}</p>
      {data.length !== 0 && (
        <h3 className='font-semibold mt-10 text-2xl'>Your posts</h3>
      )}
      {data.length === 0 && (
        <h3 className='font-semibold mt-10 text-2xl'>Try creating some posts !</h3>
      )}
      <div className='mt-3 prompt_layout'>
        {data.map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              post={prompt}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            ></PromptCard>
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
