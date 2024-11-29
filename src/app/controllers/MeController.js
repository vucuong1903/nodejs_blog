const Coure = require('../models/Coure')
const {mutipleMongooseToObject} = require('../../until/mongoose')

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next){
        let courseQuery = Coure.find({})
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }
        Promise.all([courseQuery,  Coure.countDocumentsWithDeleted({deleted: true})])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }

     //[GET] /me/trash/courses
     trashCourses(req, res, next){
        // let courseQuery =  Coure.findWithDeleted({ deleted: true})
        // if(req.query.hasOwnProperty('_sort')){
        //     courseQuery =   courseQuery.sort({
        //         [req.query.column]: req.query.type,
        //     })
        // }
        // Coure.findWithDeleted({ deleted: true})
        //     .then(courses => {
        //         res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)})
        //     })
        //     .catch(next)
        let courseQuery = Coure.findWithDeleted({ deleted: true }); // Đúng tên model
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        courseQuery
            .then(courses => {
                res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)})
            })
            .catch(next)
    }
}

module.exports = new MeController()