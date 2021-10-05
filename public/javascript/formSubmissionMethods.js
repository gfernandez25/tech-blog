function submitCreatePost(e){
    e.preventDefault();
    console.log(
        e.target["title"].value, 
        e.target["content"].value
    )
}

function submitEditPost(e){
    e.preventDefault();

    console.log({"submitEditPost": e})
}

function submitLogin(e){
    e.preventDefault();

    console.log({"submitLogin": e})
}

function submitSignUp(e){
    e.preventDefault();

    console.log({"submitSignUp": e})
}

function retrieveAllComments() {
    e.preventDefault();
}

function submitNewComment(e) {
    e.preventDefault();

    const postId = location.pathname.split("/")
    fetch(`/post/${postId[2]}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: e.target["comment"].value,
            // todo: get user id from session
            userId: 1,
        })

    }).then( response => {
        console.log(response)
        if (response.status === 200) {
            location.reload(true);
        }
    })
}



