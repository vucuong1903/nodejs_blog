
class SearchController {

    //[GET] /search
    index(req, res){
        res.render('search')
    }

    //[GET] /:slug
    show(req, res){
        res.send('Seach Detail')
    }
}

module.exports = new SearchController