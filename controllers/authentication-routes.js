const router = require('express').Router();

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    const formConfigLogin = {
        id: "login",
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
            title: "Login!",
            onsubmit: "submitLogin(event)"
        },
        cta: {
            url: "/sign-up",
            title: "Sign up instead"
        }
    }

    res.render('login', {
        formConfigLogin,
    });
});
router.post('/login', (req, res) => {
//TODO: change into right format
//TODO: change the logic for login
//TODO: Test on insomniac
});

router.get('/sign-up', (req, res) => {

    const formConfigSignUp = {
        id: "sign-up",
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
            title: "Sign Up!",
            onsubmit: "submitSignUp(event)"
        },
        cta: {
            url: "/login",
            title: "Login instead"
        }
    }

    res.render('sign-up', {
        formConfigSignUp,
    });
});
router.post('/sign-up', (req, res) => {
    //TODO: change into right format
    //TODO: change the logic for sign up
    //TODO: Test on insomniac

    // // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // User.create({
    //     username: req.body.username,
    //     password: req.body.password
    // })
    //     .then(dbUserData => {
    //         req.session.save(() => {
    //             req.session.user_id = dbUserData.id;
    //             req.session.username = dbUserData.username;
    //             req.session.loggedIn = true;
    //
    //             res.json(dbUserData);
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
});

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });

        console.log("session destroyed")
    }

    res.render('logout', {});
});

module.exports = router;