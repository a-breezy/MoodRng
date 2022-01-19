//Button text function
const changeTxt = () => {
  document.getElementById('login-button').innerHTML = 'LOADING...';
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log("HELLO, I'M HERE")
  //changes text of submit button to LOADING...
  changeTxt();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password)
  
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("response", response)
    if (response.ok) {
      console.log("I'M LOGGED IN")
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};


document
  .getElementById('login-form')
  .addEventListener('submit', loginFormHandler);
  
