export const getUserRequest = () => {
  const URL = "/api/user";
  const options = { method: "GET"};
  const request = new Request(URL, options );
  return request;
}

export const signupRequest = (formData) => {
  const URL = "/api/signup";
  const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }
  const request = new Request(URL, options);
  return request;
}

export const signinRequest = credentials => {
  const URL = "/api/signin";
  const options = {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }
  const request = new Request(URL, options);
  return request;
}

export const signoutRequest = () => {
  const URL = "/api/signout";
  const options = { method: "GET"};
  const request = new Request(URL, options );
  return request;
}
