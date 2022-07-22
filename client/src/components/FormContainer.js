import styles from "./css/FormContainer.module.css";

const FormContainer = props => (
  <form className={styles.formContainer}>
    <h1>{props.formTitle}</h1>
    {props.children}
  </form>
);

export default FormContainer;