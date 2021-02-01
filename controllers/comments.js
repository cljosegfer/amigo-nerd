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

}
