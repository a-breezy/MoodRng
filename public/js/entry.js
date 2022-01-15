const entryFormHandler = async (event) => {
    event.preventDefault();
  
    const sleep = document.querySelector('#sleep').value.trim();
    const mood = document.querySelector('#mood').value.trim();
    const food = document.querySelector('#food').value.trim();
    const activities = document.querySelector('#activities').value.trim();

  
    if (email && password) {
      const response = await fetch('/api/entries/', {
        method: 'POST',
        body: JSON.stringify({ mood, sleep, food, activities }),
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
