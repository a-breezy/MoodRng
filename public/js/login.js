
function changeTxt() {
  document.getElementById('btn').innerHTML = 'LOGGING IN...';
}

const loginFormHandler = async (event) => {
  
  event.preventDefault();
  changeTxt();


  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};


document
  .getElementById('btn')
  .addEventListener('submit', loginFormHandler);
  
