"use client";


import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
const searchParams = useSearchParams();
const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  
  useEffect(()=>{
    const fetchPost=async()=>{
        const prompt = await fetch(`/api/prompt/${promptId}`);
        const post = await prompt.json();
        setPost({
            prompt: post.prompt,
            tag: post.tag,
        });
    };
    if(promptId){fetchPost();}    
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      ></Form>
    </div>
  );
};

export default UpdatePrompt;
