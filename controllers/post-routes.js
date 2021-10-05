const router = require('express').Router();
const routeBuilder = require("../utils/routeBuilder");
const postApiQuery = require("./queries/post-routes.queries");

router.get('/all', async (req, res) => {
    // const query = await routeBuilder(postApiQuery.all);
    const query = await postApiQuery.all;

    res.render('homepage', {
        posts: query.map(post => post.get({plain: true})),
        loggedIn: req.session.loggedIn
    });
});

router.get('/dashboard', async (req, res) => {
    const query = await routeBuilder(postApiQuery.all);

    res.render('dashboard', {
        posts: query.map(post => post.get({plain: true})),
        loggedIn: true
    });
});

router.get('/create-post', (req, res) => {
    const newPost = {
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
        newPost,
    });
});
router.post('/create-post', async (req, res) => {
    const query = await postApiQuery.newPost(req)
    res.json(query)
});

router.get('/:id', async (req, res) => {
    const addNewComment = {
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
    const query = await postApiQuery.singlePost(req);

    if (!query) {
        res.status(404).json({message: 'No post found with this id'});
        return;
    }

    res.render('single-post', {
        post: query.get({plain: true}),
        addNewComment,
        loggedIn: req.session.loggedIn
    });
});

router.post('/:id/comments', async (req, res) => {
    const query = await postApiQuery.addNewComment(req)

    res.json({success: true})
});

router.get('/:id/edit', /*withAuth,*/ (req, res) => {
    const newPost = {
        id: "edit-post",
        title: "edit post",
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
            title: "Edit",
            onsubmit: "submitEditPost(event)"
        },
        delete: true
    }
    res.render('create-post', {
        newPost,
    });


    // Post.findByPk(req.params.id, {
    //     attributes: [
    //         'id',
    //         'post_url',
    //         'title',
    //         'created_at',
    //         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    //     ],
    //     include: [
    //         {
    //             model: Comment,
    //             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //             include: {
    //                 model: User,
    //                 attributes: ['username']
    //             }
    //         },
    //         {
    //             model: User,
    //             attributes: ['username']
    //         }
    //     ]
    // })
    //     .then(dbPostData => {
    //         if (dbPostData) {
    //             const post = dbPostData.get({ plain: true });
    //
    //             res.render('edit-post', {
    //                 post,
    //                 loggedIn: true
    //             });
    //         } else {
    //             res.status(404).end();
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     });
});
router.put('/:id/edit', async (req, res) => {
    const query = await postApiQuery.updatePost(req)

    if (query[0] === 0) {
        res.status(404).json({message: 'No post found with this id'});
        return;
    }

    res.json(query)
});
router.delete('/:id/edit', async (req, res) => {
    const query = await postApiQuery.deletePost(req)

    if (!query) {
        res.status(404).json({message: 'No post found with this id'});
        return;
    }

    res.json(query)
});

module.exports = router;