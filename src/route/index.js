const searchRoute = require('./search')
const meRoute = require('./me')
const coursesRoute = require('./courses')
const siteRoute = require('./site')


function route(app){
    
    app.use('/search', searchRoute)
    app.use('/me', meRoute)
    app.use('/courses', coursesRoute)



    app.use('/', siteRoute)
}

module.exports = route