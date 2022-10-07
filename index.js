const app = require('./config/server');

require('./src/app/routes/students.js')(app);

//Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});