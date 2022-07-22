import { useEffect } from "react"
import Router from "./Router";
import { authenticateFailure, authenticateRequest, authenticateSuccess } from "./redux";
import { connect } from "react-redux";
import { getUserRequest } from "./utils/api";
import { Navbar } from "./components";

const App = props => {

  useEffect(() => {
    props.loadState();
  }, []);

  const { 
    isAuthenticating,
    isAuthenticated 
  } = props.state;

  if (isAuthenticating) {
    return <>LOADING...</>
  }


  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  loadState: async () => {
    dispatch(authenticateRequest)
    const request = getUserRequest();
    const response = await fetch(request);
    const { user } = await response.json();
    const isAuthenticated = !!user;
    if (isAuthenticated){
      dispatch(authenticateSuccess(user));
    } else {
      dispatch(authenticateFailure(""));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
