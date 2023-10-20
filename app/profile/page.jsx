"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    const fetchFavorites = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/favorite`);
      const data = await response.json();

      setFavorites(data);
    };

    if (session?.user.id) {
      fetchPosts();
      fetchFavorites();
    }
  }, []);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
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

        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name}
      desc='Welcome to your profile page'
      data={posts}
      favorites={favorites}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
