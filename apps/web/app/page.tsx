'use client';

import styles from "./page.module.css";
import { baseUrl } from "../config/paths";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className={styles.page}>
      {users.map((user: any) => (
        <div key={user.id}>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
          </div>
      ))}
    </div>
  );
}
