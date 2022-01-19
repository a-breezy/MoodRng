const signupFormHandler = async (event) => {
    event.preventDefault();

    const changeTxt = () => {
      document.getElementById('signup-button').innerHTML = 'LOADING...';
    }

    changeTxt();
  
    const username = document.querySelector('#username-signup').value.trim();
    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && first_name && last_name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, first_name, last_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };


document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);
