const router = require('express').Router();
const postApiQuery = require("./queries/post-routes.queries");

router.get('/all', (req, res) => {
    console.log("++++++++++++++++", req.session);
    postApiQuery.all(req)
        .then(query => {
            res.render('homepage', {
                posts: query.map(post => post.get({plain: true})),
                //loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err))
});
router.get('/dashboard', (req, res) => {
    postApiQuery.all(req)
        .then(query => {
            res.render('dashboard', {
                posts: query.map(post => post.get({plain: true})),
                loggedIn: true
            });
        })
        .catch(err => res.status(500).json(err))
});

router.get('/create-post', (req, res) => {
    const newPostFormConfig = {
        id: "create-post",
        title: "create new post",
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
            title: "Create",
            onsubmit: "submitCreatePost(event)"
        },
    }

    res.render('create-post', {
        newPostFormConfig,
    });
});
router.post('/create-post', (req, res) => {

    postApiQuery.newPost(req)
        .then(query => {
            res.json(query)
        })
        .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    const newCommentFormConfig = {
        id: "new-comment",
        fields: [
            {
                title: "comment",
                id: "comment",
                type: "text",
            },
        ],
        submit: {
            title: "submit",
            onsubmit: "submitNewComment(event)"
        }
    }

    postApiQuery.singlePost(req)
        .then(query => {
            if (!query) {
                res.status(404).json({message: 'No post found with this id'});
                return;
            }

            res.render('single-post', {
                post: query.get({plain: true}),
                newCommentFormConfig,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err))
});

router.post('/:id/comments', (req, res) => {
    postApiQuery.addNewComment(req)
        .then(query => {
            res.json(query)
        })
        .catch(err => res.status(400).json(err))
});

router.get('/:id/edit', /*withAuth,*/ (req, res) => {
    postApiQuery.singlePost(req)
        .then(query => {
            const newPostFormConfig = {
                id: "edit-post",
                title: "edit post",
                fields: [
                    {
                        title: "Title",
                        id: "title",
                        type: "text",
                        value: query.title,
                    },
                    {
                        title: "Content",
                        id: "content",
                        type: "text",
                        value: query.content
                    },
                ],
                submit: {
                    title: "Edit",
                    onsubmit: "submitEditPost(event)"
                },
                delete: true
            }

            res.render('create-post', {
                newPostFormConfig,
            });
        })
        .catch(err => res.status(500).json(err))


});
router.put('/:id/edit', (req, res) => {
    postApiQuery.updatePost(req)
        .then(query => {
            if (query[0] === 0) {
                res.status(404).json({message: 'No post found with this id'});
                return
            }
            res.json(query)
        })
        .catch(err => res.status(500).json(err))
});
router.delete('/:id/edit', (req, res) => {
    postApiQuery.deletePost(req)
        .then(query => {
            if (!query) {
                res.status(404).json({message: 'No post found with this id'});
                return
            }
            res.json(query)
        })
        .catch(err => res.status(500).json(err))
});

module.exports = router;