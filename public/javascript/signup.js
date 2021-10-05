  async function signupFormHandler(event) {
    event.preventDefault();

  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

      if (username && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {console.log(response)});
    
        if (response.ok) {
          document.location.replace('/post/dashboard/');
        } else {
          alert(response.statusText);
        }
      }
    }

  document.querySelector('.card').addEventListener('submit', signupFormHandler);
  