
const pgQuery = (client, queryString) => {
    return new Promise ( resolve => {
        client.query(queryString, (err, res) => {
            if(err) throw err
            else resolve(res)
        })
    })
}

exports.pgQuery = pgQuery