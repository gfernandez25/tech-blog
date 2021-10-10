const {Post, Comment, User} = require("../../models");


const all = function(req) {
    return Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        order:[
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
};

const singlePost = function(req) {
    const {id} = req.params;
//todo: sort does not work, need to fix
    return Post.findOne({
        where: {id},
        attributes: [
            'id',
            'post_url',
            'content',
            'title',
            'created_at',
        ],
        order:[
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]

    });
}
const newPost = function (req) {
    const {title, content, user_id} = req.body;

    return Post.create({
        title,
        content,
        user_id,
        order:[
            ['updatedAt', 'DESC']
        ]
    })
};
const updatePost = function (req) {


    const {title, content} = req.body;
    const {id} = req.params;


    console.log({title, content, id})

    return Post.update(
        {
            title,
            content,
        },
        {
            where: {
                id
            }
        }
    )
}
const deletePost = function (req) {
    const {id} = req.params;

    return Post.destroy({
        where: {id}
    })
}
const addNewComment = function (req) {
    const {comment_text, user_id} = req.body;
    const {id} = req.params;

    return Comment.create({
        comment_text,
        user_id,
        post_id: parseInt(id),
    })
}

module.exports = {
    all,
    singlePost,
    newPost,
    updatePost,
    deletePost,
    addNewComment
};

// .then(query => {
//
// })
//     .catch(err => res.status(500).json(err))