"use client";
import { Login } from "@/redux/slices/authSlice";
import { createTodo } from "@/redux/slices/postSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreatePostPage = () => {
  const {token} = useSelector((state)=>state.auth)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    if(!token){
       return alert("bu işlem için tekiniz yok")
    }
    e.preventDefault(); 
    console.log("Form Data:", formData); 
    try {
    await dispatch(createTodo(formData)).unwrap()
    router.push("/")
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Post</h2>

        <div>
          <label className="block text-sm font-medium">Post Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Post Name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter your Post Description"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter your Post Stock"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
