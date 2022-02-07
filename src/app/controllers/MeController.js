const Course = require('../models/Course');

class MeController {
  // *[GET] /me/stored/courses
  storedCourses(req, res, next) {
    
    let courseQuery = Course.find({})

    // !Tự nó sẽ đẩy ra views luôn
    // res.locals._sort
   
    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        // !Truyền cái cột trong database muốn sort và thêm cái điều kiện sort like asc or desc
        [req.query.column]: req.query.type
      })
    }
    
    // !Thực hiện render view --> render đếm số lượng course đã xoá \
    // !Kết quả trả ra sẽ là 
    Promise.all([courseQuery.lean(),Course.countDocumentsDeleted({}).lean()])
      .then(([course,deleteCourse])=> 
        res.render('me/stored-courses', { course,deleteCourse })
      )
      .catch(next)

    // Course.countDocumentsDeleted({})
    //   .lean()
    //   .then((deletedCount) => {
    //     console.log(deletedCount)
    //   })
    //   .catch(next)

    // Course.find({})
    //   .lean()
    //   .then((course) => res.render('me/stored-courses', { course }))
    //   .catch((err) => next(err));
  }

  // *[GET] /me/trashed/courses
  trashedCouses(req, res, next) {
    let courseQuery = Course.findDeleted()

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        // !Truyền cái cột trong database muốn sort và thêm cái điều kiện sort like asc or desc
        [req.query.column]: req.query.type
      })
    }
    courseQuery
      .lean()
      .then((course) => res.render('me/trashed-courses', { course }))
      .catch((err) => next(err));
  }
}

module.exports = new MeController();
