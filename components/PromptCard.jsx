"use client"

import React, {useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  useState();

  return (
    <div>
      <div>{post.prompt}</div>
      <div>{post.tag}</div>
    </div>
  );
};

export default PromptCard;
