"use client";import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CreateNote() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const router = useRouter();
  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: Title,
        description: Description,
      }),
    });
    setDescription("");
    setTitle("");
    router.refresh();
  };

  return (
    <div className='flex flex-col mt-10'>
      <form onSubmit={create} className='flex gap-3 flex-col w-1/3 border-2'>
        <input
          type='text'
          placeholder='Title'
          className='bg-gray-100'
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='description'
          className='bg-gray-100'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='bg-green-200'>Create Note</button>
      </form>
    </div>
  );
}
