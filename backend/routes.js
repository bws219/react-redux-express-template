const express = require('express');
const router = express.Router();
const { User, Post, Comment, Vote } = require('../models');

// MARK: Public Routes
router.get('/posts', (req, res) => {
    Post.findAll()
        .then(result => {
            res.status(200).json({
                success: true,
                posts: result.map(post => post.dataValues)
            });
        })
        .catch(error => {
            console.log('Error retrieving posts:', error);
            res.status(500).json({
                success: false,
                message: error
            })
        })
})

router.get('/comments/:id', (req, res) => {
    Comment.findAll({
        where: {
            fk_post_id: req.params.id
        }
    })
        .then(comments => {
            res.status(200).json({
                success: true,
                comment: comments.map(comment => comment.dataValues)
            });
        })
        .catch(error => {
            console.log('Error retrieving comments:', error);
            res.status(500).json({
                success: false,
                message: error
            })
        })
})

router.use('/', (req, res, next) => {
    console.log(req)
    console.log(req.user)
    if (!req.user && req.method !== 'OPTIONS') {
        res.status(401).json({
            success: false,
            message: 'You are not logged in'
        });
    } else {
        next();
    }
})

// MARK: Private Routes

router.post('/post/new', (req, res) => {
    let { title, content } = req.body;
    let linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
    Post.create({
        fk_author_id: req.user.id,
        title,
        content,
        is_link: !!content.match(linkRegex),
    })
        .then(result => {
            res.json({
                success: true,
                message: 'Post added successfully!'
            })
        })
        .catch(error => {
            console.log('Error creating post:', error);
            res.status(500).json({
                success: false,
                message: error
            })
        })
});

router.post('/comment/new', (req, res) => {
    let { content, postID, parentID } = req.body;
    Comment.create({
        fk_author_id: req.user.id,
        fk_post_id: postID,
        fk_parent_id: parentID,
        content,
    })
        .then(result => {
            res.json({
                success: true,
                message: 'Comment added successfully!'
            })
        })
        .catch(error => {
            console.log('Error creating comment:', error);
            res.status(500).json({
                success: false,
                message: error
            })
        })
});

router.post('/vote/', (req, res) => {
    let { postID, commentID, type } = req.body;
    // FIXME: Votes do not work yet
    Vote.findAll({
        where: Sequelize.or({
            fk_comment_id: commentID,
            fk_post_id: postID
        })
    })
    Vote.create({
        fk_voter_id: req.user.id,
        fk_post_id: postID,
        fk_comment_id: commentID,
        type
    })
        .then(result => {
            res.json({
                success: true,
                message: 'Vote recorded successfully!'
            })
        })
        .catch(error => {
            console.log('Error creating vote:', error);
            res.status(500).json({
                success: false,
                message: error
            })
        })
});

module.exports = router;
