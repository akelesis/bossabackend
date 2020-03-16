module.exports = app => {
    const save = async (req, res) => {
        const post = {...req.body}
        const appData = {}

        appData.name = post.title
        appData.link = post.link
        appData.description = post.description

        const appTags = post.tags
        
        app.db('app')
            .insert(appData)
            .then(response => {
                appTags.forEach(async element => {
                    const tagFromDB = await app.db('tag').where({name: element}).first()
                    if(!tagFromDB){
                        app.db('tag')
                            .insert({name: element})
                            .then(resp => {
                                app.db('app_tag')
                                    .insert({idapp: response, idtag: resp})
                                    .catch(err => console.log(err))
                            })
                    }
                    else{
                        app.db('app_tag')
                            .insert({idapp: response, idtag: tagFromDB.id})
                            .catch(err => console.log(err))
                    }
                })
            })
            .then(_ => res.status(201).send())
            .catch(err => res.status(500).send(err))

    }

    const get = async (req, res) => {
        
        const apps = await app.db('app')
                    
        for(let i = 0; i < apps.length; i++){
            const idtags = await app.db('app_tag').select('idtag').where({idapp: apps[i].id})
            const numIdTags = idtags.map(x => {
                return JSON.parse(JSON.stringify(x.idtag))
            })
            const tags = await app.db('tag').select('name').whereIn('id', numIdTags)
            const tagsNames = []
            tags.forEach(e => {
                tagsNames.push(e.name)
            })
            apps[i].tags = tagsNames
        }
        res.json(apps)

    }

    const getById = async (req, res) => {
        const params = req.params
        
        const application = JSON.parse(JSON.stringify(await app.db('app').where({id: params.id}).first()))
        const idtags = await app.db('app_tag').select('idtag').where({idapp: params.id})
        
        const numIdTags = idtags.map(x => {
            return JSON.parse(JSON.stringify(x.idtag))
        })

        
        const tags = await app.db('tag').whereIn('id', numIdTags)
        const tagsNames = []
        tags.forEach(element => {
            tagsNames.push(element.name)
        })
        application.tags = tagsNames
        
        res.status(200).send(application)
        
    }

    const remove = async (req, res) => {
        const params = req.params

        try{
            relationDelete = await app.db('app_tag').del().where({idapp: params.id})
            repoDelete = await app.db('app').del().where({id: params.id})

            res.status(204).send()
        }
        catch{
            res.status(400).send('repositorio não encontrado!')
        }
    }

    const getByTag = async (req, res) => {
        const tagName = req.query.tag
        try{
            const idTag = await app.db('tag').select('id').where({name: tagName}).first()
            const repoIds = await app.db('app_tag').select('idapp').where({idtag: idTag.id})
            const repoIdNumbers = repoIds.map(x => {
                return x.idapp
            })
            const repos = await app.db('app').whereIn('id', repoIdNumbers)

            for(let i = 0; i < repos.length; i++){
                const idtags = await app.db('app_tag').select('idtag').where({idapp: repos[i].id})
                const numIdTags = idtags.map(x => {
                    return JSON.parse(JSON.stringify(x.idtag))
                })
                const tags = await app.db('tag').select('name').whereIn('id', numIdTags)
                const tagsNames = []
                tags.forEach(e => {
                    tagsNames.push(e.name)
                })
                repos[i].tags = tagsNames
            }

            res.json(repos)
        }
        catch{
            res.status(400).send('Não houve resultado para a busca')
        }
    }

    return {save, remove, get, getById, getByTag}
}