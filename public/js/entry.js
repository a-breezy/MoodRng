const entryFormHandler = async (event) => {
    event.preventDefault();
    
    const sleep = document.querySelector('#sleep-form').value;
    const mood = document.querySelector('#mood-form').value;
    const food = document.querySelector('#food-form').value.trim();
    const activities = document.querySelector('#activities-form').value.trim();
  
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
        alert('Failed to record entry');
      }
    }
  };

// event listener for form submit
  document
  .querySelector('#entry')
  .addEventListener('submit', entryFormHandler);
