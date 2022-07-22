import styles from "./css/TextInput.module.css";

const TextInput = props => (
  <>
    {!!props.error && (
      <div className={styles.error}>{props.error}</div>
    )}
    <input
      {...props} 
      className={`${styles.textInput} ${props.spacebelow && styles.spaceBelow}`}
    />
  </>
);

export default TextInput;