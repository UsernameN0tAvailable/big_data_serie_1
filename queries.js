const {Client} = require('pg')
const {pgQuery} = require('./pgQuery')

const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'ex1',
    port: 5432
})


client.connect(async () => {

    await pgQuery(client, D_i_query)
    await pgQuery(client, D_ii_query)
    await pgQuery(client, D_iii_query)
    await pgQuery(client, D_iv_query)
    await pgQuery(client, D_v_query)


})


const D_i_query = `select ranking, count(*) as count
                   from conference
                   group by ranking`

const D_ii_query = `select abstract 
                    from paper 
                        inner join writes on paper.paperId = writes.paperId 
                        inner join author on writes.authorId = author.authorId 
                   where name = 'Alex' or name = 'Alexander';`

const D_iii_query = `select name 
                     from author 
                        inner join writes on author.authorId = writes.authorId 
                        inner join cites on writes.paperId = cites.paperIdTo 
                        inner join writes as writesTmp on writesTmp.paperId = cites.paperIdFrom 
                    where writes.authorId = writesTmp.authorId`

const D_iv_query = `create view publishesIn as
                    select authorid, confid
                    from submits
                        inner join writes on submits.paperid = writes.paperid
                    where isAccepted=true`


const D_v_query = `select title 
                   from writes 
                        inner join paper on writes.paperID = paper.paperID 
                        inner join author on writes.authorID = author.authorID 
                   where name = 'Alex' and paper.paperID in (
                        select paperID 
                        from writes 
                        group by paperID 
                        having count(authorID) > 1)`