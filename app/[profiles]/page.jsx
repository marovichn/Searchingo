"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import PromptCard from "@components/PromptCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorId = searchParams.get("id");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPostsUser = async () => {
      const response = await fetch(`/api/users/${creatorId}/posts`);
      const data = await response.json();
      const user = await fetch(`/api/users/${creatorId}`);
      const userData = await user.json();

      setUser(userData);
      setPosts(data);
    };

    if (creatorId) {
      fetchPostsUser();
    }
  }, []);

  if (session?.user.id === user._id) {
    router.push("/profile");
  }

  const handleEdit = async (post) => {
    if(post){
    router.push(`/update-prompt?id=${post._id}`);}
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{user?.username}'s</span> Profile
      </h1>
      <p className='mt-10 desc text-left '>
        <span className='font-semibold'>Contact:</span> {user?.email}
      </p>
      <div className='flex flex-between gap-12 w-full'>
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
        {posts.map((prompt) => {
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
    </section>
  );
};

export default ProfilePage;
