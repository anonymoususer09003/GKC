const onSignOut = () => {
  window.localStorage.removeItem("gkcAuth");
  window.localStorage.removeItem("userType");
  window.localStorage.removeItem("stripeForm");
}

export default onSignOut;