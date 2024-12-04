import React from "react";
import { Button, Form } from "react-bootstrap";

export default function UpdatePostCard({post, chengeHandler}) {

  return (
    <>
      <Form onSubmit={(e) => chengeHandler(e, post.id)}>
        <h4>Изменить</h4>
        <Form.Control
          name="title"
          defaultValue={post?.title}
          type="text"
          placeholder="Название"
        />
        <Form.Control
          name="text"
          defaultValue={post?.text}
          type="text"
          placeholder="Описание"
        />
        {/* <Form.Control
        name="img"
        defaultValue={card?.img}
        type="text"
        placeholder="URL"
      /> */}
        <Button type="submit" variant="light">
          
        </Button>
      </Form>
    </>
  );
}
