const Controller = require('../mappers/models_controller')

const saveCourse = Author => (req, res, next) => {
  const authorController = new Controller(Author)
  const courseEdit = req.body

  console.log('dasdasdsadsadsadoi');

  if (courseEdit.id === '') {
    authorController
      .insertCourse(courseEdit)
      .then(() => res.redirect('/admin/list'))
      .catch((error) => {
        console.log(error)
        next()
      })
  } else {
    authorController
      .updateCourse(courseEdit)
      .then(() => res.redirect('/admin/list'))
      .catch((error) => {
        console.log(error)
        next()
      })
  }
}

module.exports = saveCourse
