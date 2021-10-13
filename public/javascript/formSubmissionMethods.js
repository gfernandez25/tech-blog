function submitCreatePost(e) {
    e.preventDefault();

    fetch(`/post/create-post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: e.target["title"].value,
            content: e.target["content"].value,
        })
    }).then(response => {
        window.location.href = '/post/dashboard';
    })
}

function submitEditPost(e) {
    e.preventDefault();

    const id = location.pathname.split("/")

    console.log(`${id[2]}`)

    fetch(`/post/${id[2]}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: e.target["title"].value,
            content: e.target["content"].value,
            // todo: get user id from session
            user_id: 2,
        })

    }).then(response => {
        window.location.href = '/post/dashboard';
    })
}

function submitDeletePost(e) {
    e.preventDefault();

    console.log("delete")

    const id = location.pathname.split("/")
    console.log(id)
    fetch(`/post/${id[2]}/edit`, {
        method: 'DELETE'
    }).then(response => {
        window.location.href = '/post/dashboard';
    })
}

function submitLogin(e) {
    e.preventDefault();

    fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target["username"].value.trim(),
            password: e.target["password"].value.trim(),
        })

    }).then(response => {
        console.log(response)
        if (response.status === 200) {
            window.location.href = '/post/dashboard';
        }
    })
}

function submitSignUp(e) {
    e.preventDefault();

    fetch(`/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target["username"].value,
            password: e.target["password"].value,
        })

    }).then(response => {
        console.log(response)
        if (response.status === 200) {
            window.location.href = '/post/dashboard';
        }
    })
}

function retrieveAllComments() {
    e.preventDefault();
}

async function submitNewComment(e) {
    e.preventDefault();

    const postId = location.pathname.split("/")

        const response = await fetch(`/post/${postId[2]}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                comment_text: e.target["comment"].value,
                post_id: postId[2],
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            console.log(response)
            alert(response.statusText);
        }



    // fetch(`/post/${postId[2]}/comments`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         comment: e.target["comment"].value,
    //
    //     })
    //
    // }).then(response => {
    //     console.log(response)
    //     if (response.status === 200) {
    //         location.reload(true);
    //     }
    // })
}





