const Student = require('../models/Student');

module.exports = app => {

    //Rutas para formulario y tabla
    //Retornar elementos
    app.get('/', async (request, res) => {
        try {
            const students = await Student.find({}).lean();
            res.render('students/students', { students });
        } catch (error) {
            throw error
        }
    });

    //Agregar registro
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
            .catch(err => { throw err });
    });

    //Borrar registro
    app.post('/students/:id', (request, result) => {
        Student.findOneAndDelete({ _id: request.params.id })
            .then(result.redirect('/'))
            .catch(err => { throw err });
    });

    //Rutas para API
    //Retornar registros
    app.get('/api/students', (req, res) => {
        Student.find()
          .sort({ created: -1 })
          .then(items => console.log(res.json(items)));
      });

    //Insertar registro
    app.post('/api/students', (request, res) => {
        const newStudent = new Student({
            name: request.body.name,
            last_name: request.body.last_name,
            age: request.body.age,
            grade: request.body.grade,
            status: request.body.status,
        });

        newStudent.save()
        .then(() => res.json({ result: true }))
        .catch(err => res.status(404).json({ result: false }));
    });
    
    //Actualizar registro
    app.put('/api/students/:id', (req, res) => {
        Student.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => res.json({ result: true }))
        .catch(err => res.status(404).json({ result: false }));
    });

    //Eliminar registro
    app.delete('/api/students/:id', (req, res) => {
        Student.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json({ result: true }))
        .catch(err => res.status(404).json({ result: false }));
    });
}