import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import UpdatePostCard from "./UpdatePostCard";

export default function PostsCard({ post, deleteHandler, chengeHandler }) {
  const [show, setShow] = useState(false);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.text}</Card.Text>
        <Button variant="success" onClick={() => setShow((prev) => !prev)}>
          Изменить
        </Button>
        <Button variant="danger" onClick={() => deleteHandler(post.id)}>
          Удалить
        </Button>
      </Card.Body>
      {show && <UpdatePostCard post={post} chengeHandler={chengeHandler}/>}
    </Card>
  );
}
