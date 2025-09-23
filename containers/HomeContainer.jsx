"use client";
import { deletePost, fetchPosts } from "@/redux/slices/postSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const HomeContainer = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const router = useRouter()
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (!token) {
      return alert("Bu işlem için yetkiniz yok");
    }
    dispatch(deletePost(postId));
  };
  const handleEdit = (postId) => {
    if (!token) {
      return alert("Bu işlem için yetkiniz yok!");
    }
    router.push(`/edit-post/${postId}`); // edit sayfasına yönlendirme
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <Link href={"/create-post"}>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            + Create Post
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="border p-6 rounded-2xl shadow-md hover:shadow-xl transition bg-white flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {post.name}
                </h2>
                <p className="mb-3 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{post.description}</p>
                <p className="font-medium text-gray-700">Stock: {post.stock}</p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Link
                  href={`post-detail/${post._id}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  View Details
                </Link>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={()=>handleEdit(post._id)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <MdEdit className="text-xl" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
