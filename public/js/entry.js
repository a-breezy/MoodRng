const entryFormHandler = async (event) => {
    event.preventDefault();
  
    const sleep = document.querySelector('#sleep').value;
    const mood = document.querySelector('#mood').value;
    const food = document.querySelector('#food').value.trim();
    const activities = document.querySelector('#activities').value.trim();
  
    if (sleep && mood && food && activities) {
      const response = await fetch('/api/entries/', {
        method: 'POST',
        body: JSON.stringify({ mood, sleep, food, activities }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert("Entry successfully Created");
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

// evenet listener
  document
  .querySelector('#entry')
  .addEventListener('submit', entryFormHandler);
