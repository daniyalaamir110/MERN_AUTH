import styles from "./css/Button.module.css";

const Button = props => (
  <button 
    type="button"
    className={`${styles.button} ${props.spacebelow && styles.spaceBelow}`}
    {...props}   
  >{props.text}</button>
);

export default Button;
