document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // First fetch request to login and store the token
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // Send the login credentials
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token); // Store the token
        alert('Login successful!');
  
        // Second fetch request to access protected content
        fetch('/api/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}` // Attach the token
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
        
      } else {
        alert('Login failed.');
      }
    })
    .catch(error => console.error('Error:', error));
  });
  