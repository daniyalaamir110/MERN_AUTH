import styles from "./css/Combobox.module.css";

const Combobox = props => (
  <>
    {!!props.error && (
      <div className={styles.error}>{props.error}</div>
    )}
    <select {...props} className={`${styles.combobox} ${props.spacebelow && styles.spacebelow}`}>
      <option key={0} value={0} disabled hidden>{props.text}</option>
      {props.options.map(option => (
        <option key={option.id} value={option.id}>{option.text}</option>
      ))}
    </select>
  </>
)

export default Combobox;