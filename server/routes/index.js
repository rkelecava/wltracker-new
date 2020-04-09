module.exports = {
    load: function (app) {
        app.use('/user', require('./User.routes'))
        app.use('/availableitem', require('./Availableitem.routes'))
        app.use('/dailystat', require('./Dailystat.routes'))
        app.use('/dailyfood', require('./Dailyfood.routes'))
        app.use('/dailyfluid', require('./Dailyfluid.routes'))
    }
}