"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter} from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const {data:session}= useSession();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const goToProfileHandler =() =>{
    router.push(`/profiles?id=${post.creator._id}`);
  }

  return (
    <div className='prompt_card'>
      <div onClick={goToProfileHandler} className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
            width={12}
            height={12}
            alt='user_image'
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.includes("#") ? "" : "#"}{post.tag.toLowerCase()}
      </p>

      {session?.user.id === post.creator._id &&  pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <div className='bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-2'>
            <p
              className='font-inter text-sm  cursor-pointer text-white mx-2 font-semibold'
              onClick={handleEdit}
            >
              Edit
            </p>
          </div>

          <p
            className='font-inter orange_gradient cursor-pointer font-semibold text-l'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
