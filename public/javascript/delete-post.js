async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`post/${id}/edit`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/post/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
