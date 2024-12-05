import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function TestComponent() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const myUsers = axios('https://restful-api.dev/')
    await myUsers.status(200).send((data) => setUsers(data))
    //   .then((data) => setUsers(data))
    //   .catch(console.log('Error'));
  }, []);

  return (
    <div>
      {users.map((el) => (
        <div key={el.id}>el.name</div>
      ))}
    </div>
  );
}
