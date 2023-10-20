"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const favorites = fetch(`/api/users/${session?.user?.id}/favorite`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) {
          setIsFavorite(false);
        }
        console.log(data);
        // Check if post._id is included in the data array
        data.forEach((p) => {
          if (p._id === post._id) {
            setIsFavorite(true);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const unfavorite = await fetch(
          `/api/users/${session?.user?.id}/favorite/${post._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (unfavorite.status === 200) {
          setIsFavorite(false);
        } else {
          console.error(`Error: ${unfavorite.status}`);
        }
      }

      if (!isFavorite) {
        const favorite = await fetch(
          `/api/users/${session?.user?.id}/favorite/${post._id}`,
          {
            method: "POST",
          }
        );

        if (favorite.status === 200) {
          setIsFavorite(true);
        } else {
          console.error(`Error: ${favorite.status}`);
        }
      }
    } catch (error) {
      // Handle network errors, e.g., no internet connection
      console.error(`Network error: ${error.message}`);
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const goToProfileHandler = () => {
    if (session?.user.id === post.creator._id) {
      router.push("/profile");
    } else {
      router.push(`/profiles?id=${post.creator._id}`);
    }
  };

  return (
    <div className='prompt_card'>
      <div
        onClick={goToProfileHandler}
        className='flex justify-between items-start gap-5'
      >
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
        {post.tag.includes("#") ? "" : "#"}
        {post.tag.toLowerCase()}
      </p>

      {pathName !== "/profile" && (
        <div
          onClick={() => handleFavorite()}
          className='flex gap-x-5 items-center cursor-pointer'
        >
          <div className='p-2 mt-3 bg-rose-500 rounded-lg w-9'>
            <button className='flex items-center justify-center gap-x-2 text-white text-xl font-bold'>
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
          <p className='font-semibold text-gray-600 mt-3'>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </p>
        </div>
      )}

      {session?.user.id === post.creator._id && pathName === "/profile" && (
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
