import styles from "./css/Navbar.module.css";

const Navbar = props => {
  
  let links;

  if (!props.isAuthenticated) {
    links = [
      { to: "/signin", text: "Sign in" },
      { to: "/signup", text: "Sign up" },
    ]
  } else {
    links = [
      { to: "/home", text: "Home" }
    ]
  }
  
  return (
    <ul className={styles.navbar}>
      {links.map((link, id) => (
        <li><a key={id} href={link.to}>{link.text}</a></li>
      ))}
    </ul>
  )
}

export default Navbar;