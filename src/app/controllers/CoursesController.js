const Coure = require('../models/Coure')
const {mongooseToObject} = require('../../until/mongoose')


class CoursesController {

    //[GET] /:slug
    show(req, res, next){
        Coure.findOne({ slug: req.params.slug})
            .then(courses => {
                res.render('courses/show', {courses: mongooseToObject(courses)})
            })
            .catch(next)
    }

    //[GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }  

    //[POST] /courses/create
    store(req, res, next){
        // res.json(req.body)'
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const courses = new Coure(req.body);
        courses.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            })
            
    } 

    //[GET] /courses/:id/edit
    edit(req, res, next){
        Coure.findById(req.params.id)
            .then(course =>  res.render('courses/edit', 
                {course: mongooseToObject(course)}
            ))
            .catch(next)
       
    }

    //[PUT] /courses/:id
    update(req, res, next){
        Coure.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    } 

    //[DELETE] /courses/:id
    delete(req, res, next){
        Coure.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[DELETE] /courses/:id/force
    deleteForce(req, res, next){
        Coure.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    } 

    //[PATCH] /courses/:id/restore  
    restore(req, res, next){
        Coure.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[POST] /courses//courses/handle-form-actions 
    handleFormActions(req, res, next){
       switch (req.body.action) {
        case 'delete':
            Coure.delete({_id: {$in: req.body.coursesIds}})
            .then(() => res.redirect('back'))
            .catch(next)
            break;
        case'restore':
            Coure.restore({_id: {$in: req.body.coursesIds}})
            .then(() => res.redirect('back'))
            .catch(next)
            break;
        case 'deleteForce':
            Coure.deleteMany({_id: {$in: req.body.coursesIds}})
            .then(() => res.redirect('back'))
            .catch(next)
            break;
        default: 
            break;
       }
    }
}

module.exports = new CoursesController()