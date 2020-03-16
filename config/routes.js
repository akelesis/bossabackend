module.exports = app => {
    //app.route('/apps')
        app.post('/apps', app.api.apps.save)
        app.get('/apps', app.api.apps.get)

    app.route('/apps/:id')
        .get(app.api.apps.getById)
        .delete(app.api.apps.remove)

    app.route('/tools')
        .get(app.api.apps.getByTag)
}