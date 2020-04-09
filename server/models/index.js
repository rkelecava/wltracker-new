module.exports = {
    load: function () {
        require('./User.model')
        require('./Availableitem.model')
        require('./Dailystat.model')
        require('./Dailyfood.model')
        require('./Dailyfluid.model')
    }
}