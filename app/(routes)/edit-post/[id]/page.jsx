"use client";
import { fetchPostDetails, updatePost } from "@/redux/slices/postSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditPostPage = () => {
  const { id } = useParams();
  const { selectedPost } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const router = useRouter()

  const [formData, setFormData] = useState({
    name:  "",
    description: "",
    stock: "",
  });
 useEffect(() => {
  if (selectedPost) {
    setFormData({
      name: selectedPost.name || "",
      description: selectedPost.description || "",
      stock: selectedPost.stock || ""   
    },[selectedPost]);
  }
}, [selectedPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      return alert("post bulunamadı");
    }
    try {
      await dispatch(updatePost({ data: formData, postId: id })).unwrap();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Edit Post</h2>

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
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
