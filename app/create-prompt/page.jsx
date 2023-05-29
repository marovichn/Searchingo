"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Form from "@components/Form"


const CreatePrompt = () => {
const {data:session} = useSession();
const [submitting, setSubmitting]= useState(false);
const [post, setPost] = useState({
  prompt: "",
  tag:""
});

const createPrompt= async(e) =>{

};


  return (
    <div>
      <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      ></Form>
    </div>
  )
}

export default CreatePrompt;