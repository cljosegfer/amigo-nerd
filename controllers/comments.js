const { post } = require('..');
const Comment = require('../models/comments')
const Plano = require('../models/planos')

module.exports = (app) => {

    // create
    app.post("/planos/:planoId/comments", function(req, res) {
        const comment = new Comment(req.body);
        comment
            .save()
            .then(comment => {
              return Plano.findById(req.params.planoId)
            })
            .then(plano => {
                plano.comments.unshift(comment)
                return plano.save()
            })
            .then(plano => {
                res.redirect('/planos/index')
            })
            .catch(err => {
              console.log(err);
          });
      });

    // // new
    // app.post('/reviews/comments', (req, res) => {
    //     Comment.create(req.body)
    //         .then((comment) => {
    //             console.log(comment)
    //             res.redirect(`/reviews/${comment.reviewId}`)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // })

    // // show
    // app.get('/reviews/:id', (req, res) => {
    //     Review.findBy(req.params.id)
    //         .then(review => {
    //             Comment.find({ reviewId: req.params.id })
    //                 .then(comments => {
    //                     res.render('reviews-show', { review: review, comments: comment})
    //                 })
    //                 .catch((err) => {
    //                     console.log(err.message)
    //                 })
    //         })
    // })

    // // delete
    // app.delete('/reviews/comments/:id', function (req, res) {
    //     console.log("DELETE comment")
    //     Comment.findByIdAndRemove(req.params.id)
    //         .then((comment) => {
    //             res.redirect(`/reviews/${comment.reviewId}`)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // })

}
