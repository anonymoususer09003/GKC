const onSignOut = () => {
  window.localStorage.removeItem('gkcAuth');
  window.localStorage.removeItem('userType');
  window.localStorage.removeItem('stripeForm');
  window.localStorage.removeItem('email');
};

export default onSignOut;
