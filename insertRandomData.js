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

    await populateAuthorTable(client, 10000)
    console.log('authors table pupulated')
    await populateConferenceTable(client, 1000)
    console.log('conference table populated')
    await populatePaperTable(client, 10000)
    console.log('paper table populated')
    await populateSubmitTable(client, 10000)
    console.log('submit table populated')
    await populateWritesTable(client, 10000)
    console.log('writes table populated')
    await populateCites(client, 10000)
    console.log('cites table populated')
})



const populateConferenceTable = (client, number) => {

    const promises = Array(number)

    for(let i= 0; i < number; i++){
        const string =
                `insert into conference values(${i},${generateRandomString()},${generateRandomNumber(200)});`
        promises[i] = pgQuery(client, string)
    }

    return Promise.all(promises)
}

const populateAuthorTable = (client, number) => {

    const promises = Array(number)

    for(let i = 0; i < number; i++){

        let name = ''

        if(!(i % 7)){
            name = `'Alex'`
        }else if(!(i% 9)){
            name = `'Alexander'`
        }else{
            name = generateRandomString()
        }

        const string = `insert into author values(${i}, ${name}, 'some_email', 'some_affiliation')`

        promises[i] = pgQuery(client, string)
    }

    return Promise.all(promises)
}

const populatePaperTable = (client, number) => {

    let promises = Array(number)

    for(let i = 0; i < number; i++){
        const queryString = `insert into paper values(${i}, ${generateRandomString()}, ${generateRandomString()})`

        promises[i] = pgQuery(client, queryString)
    }

    return Promise.all(promises)
}


const populateWritesTable = (client, number) => {
    let promises = Array(number)

    for(let i = 0; i < number; i++){
        // random numbers from 0 to 100
        // to increase likelyhood of same author
        // and same paper (to facilitate exercises)
        const authorId = generateRandomNumber(100)
        const paperId = generateRandomNumber(100)

        const queryString = `insert into writes values(${authorId}, ${paperId});`

        promises[i] = pgQuery(client, queryString)
    }

    return Promise.all(promises)
}

const populateSubmitTable = (client, number) => {

    let promises = Array(number)

    for(let i = 0; i < number; i++){

        const isAccepted = generateRandomNumber(1) === 1 ? 'true' : 'false'

        const queryString = `insert into submits values(${generateRandomNumber(100)}, ${generateRandomNumber(100)}, ${isAccepted}, current_date);`

        promises[i] = pgQuery(client, queryString)
    }

    return Promise.all(promises)
}

const populateCites = (client, number) => {

    let promises = Array(number)

    for(let i = 0; i < number; i++){
        promises[i] = pgQuery(client, `insert into cites values(${generateRandomNumber(100)}, ${generateRandomNumber(100)})`)
    }

    return Promise.all(promises)
}


/*
 *
 * ==================== HELPER METHODS =============================
 *
 */
const generateRandomString = () => {

    let name = "'"

    for(let j = 0; j < generateRandomNumber(10); j++){
        name += String.fromCharCode(65 + generateRandomNumber(25))
    }

    name += "'"

    return name
}

const generateRandomNumber = (max) => Math.floor(Math.random() * Math.floor(max))