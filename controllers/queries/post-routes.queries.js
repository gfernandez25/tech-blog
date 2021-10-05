const {Post, Comment, User} = require("../../models");
const sequelize = require("../../config/connection");
const routeBuilder = require("../../utils/routeBuilder");

const all = routeBuilder(Post.findAll({
    attributes: [
        'id',
        'title',
        'content',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
}));
const singlePost = function (req) {
    const {id} = req.params;

    return routeBuilder(Post.findOne({
        where: {id},
        attributes: [
            'id',
            'post_url',
            'content',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
    }));
}
const newPost = function (req) {
    const {title, content} = req.body;
    //TODO: retrieve id from session
    const user_id = 1;

    return routeBuilder(Post.create({
        title,
        content,
        user_id
    }))
};
const updatePost = function (req) {
    const {title, content} = req.body;
    const {id} = req.params;

    return routeBuilder(Post.update(
        {
            title,
            content,
        },
        {
            where: {
                id
            }
        }
    ))
}
const deletePost = function (req) {
    const {id} = req.params;

    return routeBuilder(Post.destroy({
        where: {id}
    }))
}
const addNewComment = function (req) {
    const {comment, userId} = req.body;
    const {id} = req.params;

    return routeBuilder(Comment.create({
        comment_text: comment,
        user_id: userId,
        post_id: id,
    }))
}

module.exports = {
    all,
    singlePost,
    newPost,
    updatePost,
    deletePost,
    addNewComment
};