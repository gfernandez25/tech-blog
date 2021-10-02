const router = require('express').Router();


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    const login = {
        class: "login",
        title: "Login",
        fields: [
            {
                title: "Username",
                id: "username",
                type: "text",
            },
            {
                title: "Password",
                id: "password",
                type: "password",
            }
        ],
        submit: {
            title: "Login!"
        },
        cta: {
            url: "/sign-up",
            title: "Sign up instead"
        }
    }

    const signUp = {
        class: "sign-up",
        title: "Sign Up",
        fields: [
            {
                title: "Username",
                id: "username",
                type: "text",
            },
            {
                title: "Password",
                id: "password",
                type: "password",
            }
        ],
        submit: {
            title: "Sign Up!"
        },
        cta: {
            url: "/login",
            title: "Login instead"
        }
    }

    const newComment = {
        class: "new-comment",
        title: "",
        fields: [
            {
                title: "Comment",
                id: "comment",
                type: "text",
            }
        ],
        submit: {
            title: "Submit"
        },
    }

    const newPost = {
        class: "new-post",
        title: "crate new post",
        fields: [
            {
                title: "Title",
                id: "title",
                type: "text",
            },
            {
                title: "Content",
                id: "content",
                type: "text",
            },
        ],
        submit: {
            title: "Create"
        },
    }

    res.render('login', {
        login,
        signUp,
        newComment,
        newPost,
    });
});

router.get('/sign-up', (req, res) => {

    const signUp = {
        class: "sign-up",
        title: "Sign Up",
        fields: [
            {
                title: "Username",
                id: "username",
                type: "text",
            },
            {
                title: "Password",
                id: "password",
                type: "password",
            }
        ],
        submit: {
            title: "Sign Up!"
        },
        cta: {
            url: "/login",
            title: "Login instead"
        }
    }

    res.render('sign-up', {
        signUp,
    });
});

router.get('/logout', (req, res) => {

    res.render('logout', {
    });
});


module.exports = router;