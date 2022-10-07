const Student = require('../models/Student');

module.exports = app => {

    app.get('/', async (request, res) => {
        try {
            const students = await Student.find({}).lean();
            res.render('students/students', { students });
        } catch (error) {
            throw error
        }
    });

    // Add a new entry
    app.post('/students', (request, result) => {
        const newStudent = new Student({
            name: request.body.name,
            last_name: request.body.last_name,
            age: request.body.age,
            grade: request.body.grade,
            status: request.body.status,
        });

        newStudent.save()
            .then(result.redirect('/'))
            .catch(err => { throw err});
    });

    // Delete an entry
    app.post('/students/:id', (request, result) => {
        Student.findOneAndDelete({ _id: request.params.id })
            .then(result.redirect('/'))
            .catch(err => { throw err});
    });
}