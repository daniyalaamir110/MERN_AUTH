import { Button, Center, FormContainer } from "../components";
import { connect } from "react-redux";
import { authenticateFailure } from "../redux";
import { signoutRequest } from "../utils/api";
import { useState } from "react";

const initialState = {
  processing: false
}

const Home = props => {

  const [state, setState] = useState(initialState);

  const { user: { firstName, lastName } } = props.state;
  const fullName = `${firstName} ${lastName}`
  
  const clickHandler = async () => {
    setState({ processing: true });
    const success = await props.signout();
    if (success) {
      window.alert("Signed out");
      window.location = "/signin";
    } else {
      window.alert("Something went wrong");
    }
    setState({ processing: false });
  }
  
  return (
    <Center>
      <FormContainer formTitle={`Welcome ${fullName}`}>
        <p>You are currently in session.</p>
        <Button 
          onClick={clickHandler} 
          text={"Sign out"}
          disabled={state.processing}  
        />
      </FormContainer>
    </Center>
  );
}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  signout: async () => {
    const request = signoutRequest();
    const response = await fetch(request);
    if (response.status === 200) {
      dispatch(authenticateFailure(""));
      return true;
    } 
    return false;
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);