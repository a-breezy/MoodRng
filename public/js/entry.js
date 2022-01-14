const entryFormHandler = async (event) => {
    event.preventDefault();
  
    const sleep = document.querySelector('#sleep').value.trim();
    const mood = document.querySelector('#').value.trim();

  
    if (email && password) {
      const response = await fetch('/api/entries/', {
        method: 'POST',
        body: JSON.stringify({ sleep,  }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

// evenet listener
  document
  .querySelector('.entry')
  .addEventListener('submit', entryFormHandler);
