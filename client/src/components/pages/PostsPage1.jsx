import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import PostsCard from "../ui/RouteCard";
import { useParams } from "react-router-dom";

export default function PostsPage({ user }) {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get("/posts").then(({ data }) => setPosts(data));
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      setPosts((posts) => posts.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const chengeHandler = async (e, id) => {
    try {
      e.preventDefault();
      const chengePost = Object.fromEntries(new FormData(e.target));
      const { data } = await axiosInstance.put(`/posts/${id}`, chengePost);
      setPosts(posts.map((el) => (el.id !== id ? el : data)));
      e.target.reset();
    } catch (error) {
      alert("Ошибка изсенения поста");
    }
  };

  return (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <div className="col-4" key={post.id}>
            <PostsCard
              post={post}
              deleteHandler={deleteHandler}
              chengeHandler={chengeHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
