import styles from "./styles.module.css";

export const Header = () => {
  return (
  <header className={styles.header}>
    <section className={styles.left_items}>
      <div className={styles.header_logo}></div>
      <input type="text" placeholder="Search..." />
    </section>
    <section className={styles.right_items}>
      <span className={styles.user_name}>Hi David 👋🏻</span>
      <div className={styles.user_image}></div>
    </section>
  </header>
  );
}