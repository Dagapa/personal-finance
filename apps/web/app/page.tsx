'use client';

import styles from "./page.module.css";
import { Header } from "../src/shared/components/header";
import { TransactionForm } from "../src/transaction/components/transactionForm/transactionForm";

export default function Home() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/users`);
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // console.log(users);

  return (
    <main className={styles.page}>
      <Header />
      <h1>Welcome to Personal Finance</h1>
      <TransactionForm />

    </main>
  );
}