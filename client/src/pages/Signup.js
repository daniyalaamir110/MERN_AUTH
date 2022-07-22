import { useState } from "react";
import { TextInput, FormContainer, Button, Combobox, Center } from "../components";
import { signupRequest } from "../utils/api";
import { validateSignup } from "../utils/formValidation";

const initialState = {
  processing: false,
  formData: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
  },
  isValid: false,
  errors: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
  }
};

const Signup = () => {

  const [state, setState] = useState(initialState);

  const submitHandler = async () => {
    const { isValid, errors } = validateSignup(state.formData);

    setState({ ...state, isValid, errors });

    if (isValid) {
      setState({ ...state, processing: true });
  
      // API Call
      const request = signupRequest(state.formData);
      const response = await fetch(request);
      if (response.status === 200) {
        window.alert("Signed up");
        window.location = "/signin";
      } else {
        window.alert("Couldn't sign you up");
      }
  
      setState({ ...state, processing: false });
    }
  }

  return (
    <Center>
      <FormContainer formTitle="Sign up">
        <TextInput 
          placeholder="First Name" 
          value={state.formData.firstName} 
          error={state.errors.firstName}
          onChange={e => setState({
            ...state, 
            formData: {
              ...state.formData, 
              firstName: e.target.value.trim()
            }
          })} 
          disabled={state.processing}
          spacebelow="true"
        />
        <TextInput 
          placeholder="Last Name" 
          value={state.formData.lastName} 
          error={state.errors.lastName}
          onChange={e => setState({
            ...state,
            formData: { 
              ...state.formData, 
              lastName: e.target.value.trim()
            }
          })} 
          disabled={state.processing}
          spacebelow="true"
        />
        <TextInput 
          placeholder="Username" 
          value={state.formData.username} 
          error={state.errors.username}
          onChange={e => setState({
            ...state, 
            formData: { 
              ...state.formData, 
              username: e.target.value.trim()
            }
          })} 
          disabled={state.processing}
          spacebelow="true"
        />
        <TextInput 
          type="password"
          placeholder="Password" 
          value={state.formData.password} 
          error={state.errors.password}
          onChange={e => setState({
            ...state, 
            formData: { 
              ...state.formData, 
              password: e.target.value.trim()
            }
          })}
          disabled={state.processing}
          spacebelow="true"
        />
        <TextInput 
          type="password"
          placeholder="Confirm Password" 
          value={state.formData.password2} 
          error={state.errors.password2}
          onChange={e => setState({
            ...state, 
            formData: { 
              ...state.formData, 
              password2: e.target.value.trim()
            }
          })}
          disabled={state.processing}
          spacebelow="true"
        />
        <Button 
          text="Sign up"
          onClick={submitHandler}
          disabled={state.processing}
        />
      </FormContainer>
    </Center>
  );
}

export default Signup;
