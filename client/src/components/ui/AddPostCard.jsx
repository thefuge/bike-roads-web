
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddPostCard() {
  const navigate = useNavigate();

  const createHandler = async (e) => {
    try {
      e.preventDefault();
      const newPost = Object.fromEntries(new FormData(e.target));
      if (!newPost.title || !newPost.text) {
        alert("Заполните все поля");
      }
      await axiosInstance.post("/posts", newPost);
      navigate("/posts");
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form className="d-flex flex-column" onSubmit={createHandler}>
        <Form.Control
          name="title"
          type="text"
          placeholder="Название"
          className="mb-3"
        />
        <Form.Control
          name="text"
          type="text"
          placeholder="Описание"
          className="mb-3"
        />
        {/* <Form.Control
        name="img"
        type="text"
        placeholder="Ссылка на изображение"
        className="mb-3"
      /> */}

        <Button type="submit" variant="light" className="mb-3 center ">
 
        </Button>

      </Form>
    </Container>
  );
}
