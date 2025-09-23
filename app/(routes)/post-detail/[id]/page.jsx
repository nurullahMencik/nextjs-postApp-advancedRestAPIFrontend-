"use client";
import { deletePost, fetchPostDetails } from "@/redux/slices/postSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";

const PostDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedPost } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetails(id));
    }
  }, [id, dispatch]);

  const handleDelete = () => {
    if (!token) {
      return alert("Bu işlem için yetkiniz yok!");
    }
    dispatch(deletePost(id)).then(() => {
      router.push("/"); // silindikten sonra ana sayfaya dön
    });
  };

  const handleEdit = () => {
    if (!token) {
      return alert("Bu işlem için yetkiniz yok!");
    }
    router.push(`/edit-post/${id}`); // edit sayfasına yönlendirme
  };

  if (!selectedPost) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">{selectedPost.name}</h1>
      <p className="mb-2 text-gray-700 break-words">{selectedPost.description}</p>
      <p className="mb-6 font-medium">Stock: {selectedPost.stock}</p>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <MdDelete className="text-xl" /> Delete
        </button>

        <button
          onClick={handleEdit}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <MdEdit className="text-xl" /> Edit
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
