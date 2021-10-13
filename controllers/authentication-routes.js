const router = require('express').Router();
const authApiQuery = require('../controllers/queries/authentication-routes.queries')

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
router.post('/sign-up',  (req, res) => {

    authApiQuery.signUp(req)

    /*The req.session.save() method will initiate the creation of the session
    and then run the callback function once completed*/
        .then(query => {
            req.session.save(() => {
                req.session.user_id = query.id;
                req.session.username = query.username;
                req.session.loggedIn = true;

                console.log(req.session)

                res.json(query);

            });
        })

});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/post/dashboard');
        return;
    }

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
router.post('/login', async (req, res) => {
    const query = await authApiQuery.login(req)

    if (!query) {
        res.status(400).json({message: 'No user found with that username!'});
        return;
    }

    const validPassword = query.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({message: 'Incorrect password!'});
        return;
    }

    req.session.save(() => {
        req.session.user_id = query.id;
        req.session.username = query.username;
        req.session.loggedIn = true;

        res.json({ user: query, message: 'You are now logged in!' });
    });
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