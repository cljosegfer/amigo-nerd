const Comment = require('../models/comments')
const Plano = require('../models/planos')
const User = require('../models/users')

module.exports = (app) => {

    // create
    app.post("/planos/:planoId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        comment.author = req.user._id
      
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
          .save()
          .then(comment => {
            return Plano.findById(req.params.planoId)
          })
          .then(plano => {
              plano.comments.unshift(comment)
              return plano.save()
          })
          .then(comment => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
          })
          .catch(err => {
            console.log(err);
          });
      });

    // app.post('/planos/:planoId/comments', (req, res) => {
    //     if (req.user) {
    //         const comment = new Comment(req.body)
    //         comment.author = req.user._id
    //         comment
    //             .save()
    //             .then(comment => {
    //                 return User.findById(req.user._id)
    //             })
    //             // .then(user => {
    //             //     user.comments.unshift(comment)
    //             //     user.save()
    //             //     res.redirect(`/planos/${plano._id}`)
    //             // })
    //             .catch(err => {
    //                 console.log(err.message)
    //             })
    //     }
    //     else {
    //         return res.status(401)
    //     }
    // })

    // app.post("/planos/:planoId/comments", function(req, res) {
    //     const comment = new Comment(req.body);
    //     comment
    //         .save()
    //         .then(comment => {
    //           return Plano.findById(req.params.planoId)
    //         })
    //         .then(plano => {
    //             plano.comments.unshift(comment)
    //             return plano.save()
    //         })
    //         .then(plano => {
    //             res.redirect('/planos/index')
    //         })
    //         .catch(err => {
    //           console.log(err);
    //       });
    //   });

}
