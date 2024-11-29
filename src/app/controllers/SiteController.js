const Coure = require('../models/Coure')
const {mutipleMongooseToObject} = require('../../until/mongoose')
class SiteController {

    //[GET] /
    index(req, res, next){
        Coure.find({})
            .then(Coure => {
                res.render('home', { Coure:  mutipleMongooseToObject(Coure) });
            })
            .catch(next);
    }

    //[GET] /:slug
    search(req, res){
        res.render('search')
    }
}

module.exports = new SiteController()