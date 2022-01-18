const pastEntryGenerator= async (event) => {
    event.preventDefault();
  
    function makePastEntry(data){
        let card = `
            <div id="employee-card">
                <div>
                    <h2 id="name">${data[i].name}</h2>
                    <h3 id="role">${data[i].getRole()}</h3>
                </div>
                <div>
                    <p id="id">ID:${data[i].id}</p>
                    <p id="email">
                        Email:<a href="mailto:${data[i].email}">${data[i].email}</a>
                    </p>`
                    if (data[i].getRole() == "Manager") {
                        card += 
                        `<p>Office Number: ${data[i].officeNumber}</p>
                        </div>
                        </div>`
                    }  else if (data[i].getRole() == "Engineer") {
                        card += 
                        `<p>
                            GitHub: <a href="https://github.com/${data[i].github}" target="_blank">${data[i].github}</a>
                        </p>
                        </div>
                        </div>`
                    }  else if (data[i].getRole() == "Intern") {
                        card += 
                        `<p>School: ${data[i].school}</p>
                        </div>
                        </div>`
                    };
        
                }
                return card;
    };
    
    function pageBuilder(data) {
        return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        
        
    
    </head>
    <body>
        <h1>My Team</h1>
    <div id="employee-area">${makePastEntry(data)}</div>
    
    </body>
    </html>
        `
    }
    
    module.exports = pageBuilder;
  
//     if (sleep && mood && food && activities) {
//       console.log("IN SIDE EMAIl/PASSWORD");
//       const response = await fetch('/api/entries/', {
//         method: 'POST',
//         body: JSON.stringify({ mood, sleep, food, activities }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         alert("Entry successfully Created");
//         document.location.replace('/');
//       } else {
//         alert('Failed to log in.');
//       }
//     }
//   };

// evenet listener
  document
  .querySelector('#entry-point')
  .addEventListener('plot-point', pastEntryGenerator);