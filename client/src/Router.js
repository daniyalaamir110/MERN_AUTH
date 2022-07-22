import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup, Signin, Home, _404 } from "./pages";

const Router = props => {
  
  let routes;

  if (!props.isAuthenticated) {
    routes = [
      { path: "/signin", element: <Signin />, exact: true },
      { path: "/signup", element: <Signup />, exact: true },
    ]
  } else {
    routes = [
      { path: "/home", element: <Home />, exact: true }
    ]
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, id) => <Route key={id} {...route} />)}
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;