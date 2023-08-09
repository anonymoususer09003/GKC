const onSignOut = () => {
  window.localStorage.removeItem("gkcAuth");
}

export default onSignOut;