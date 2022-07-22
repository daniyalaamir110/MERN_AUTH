import { useState } from "react";
import { TextInput, FormContainer, Button, Center } from "../components";
import { validateSignin } from "../utils/formValidation";
import { connect } from "react-redux";
import { authenticateRequest, authenticateSuccess, authenticateFailure } from "../redux";
import { signinRequest } from "../utils/api";

const initialState = {
  processing: false,
  formData: {
    username: "",
    password: "",
  },
  isValid: false,
  errors: {
    username: "",
    password: "",
  }
};

const Signin = props => {

  const [state, setState] = useState(initialState);

  const submitHandler = async () => {
    const { isValid, errors } = validateSignin(state.formData);

    setState({ ...state, isValid, errors });

    if (isValid) {

      setState({ ...state, processing: true });

      // API Call
      const credentials = state.formData;
      const success = await props.authenticate(credentials);
      if (success) {
        window.alert("Signed in successfully");
        window.location = "/home";
      } else {
        window.alert("Incorrect credentials");
      }

      setState({ ...state, processing: false });
    }
  }

  return (
    <Center>
      <FormContainer formTitle="Sign in">
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
        <Button 
          text="Sign in"
          onClick={submitHandler}
          disabled={state.processing}
        />
      </FormContainer>
    </Center>
  );
}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  authenticate: async credentials => {
    dispatch(authenticateRequest);
    const request = signinRequest(credentials);
    const response = await fetch(request);
    if (response.status === 200) {
      const { user } = await response.json();
      dispatch(authenticateSuccess(user));
      return true;
    }
    dispatch(authenticateFailure());
    return false;
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
