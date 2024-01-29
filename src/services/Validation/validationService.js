const isEmailValid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
const isEntireStingNumbers = (string) => !isNaN(string);
const isCountryUSA = (country) =>  country === 'United States';


export { isEmailValid, isEntireStingNumbers, isCountryUSA };