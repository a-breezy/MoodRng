
const messageGenerator = () => {
  fetch('/api/entries')
  .then(response => response.json())
  .then(data => console.log("I AM THE FETCH", data))
};