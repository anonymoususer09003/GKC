const onSignOut = () => {
  window.localStorage.removeItem('gkcAuth');
  window.localStorage.removeItem('userType');
  window.localStorage.removeItem('stripeForm');
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('DoesParentCreateNewStudent');
  window.localStorage.removeItem('parentData');
};

export default onSignOut;
