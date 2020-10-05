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
    await createTables(client)
    console.log('tables created!!')
})


const createTables = async client => {
    await pgQuery(client, createAuthorTable)
    await pgQuery(client, createPaperTable)
    await pgQuery(client, createWritesTable)
    await pgQuery(client, createConferenceTable)
    await pgQuery(client, createSubmitsTable)
    await pgQuery(client, createCitesTable)
}

const createAuthorTable = `
    create table Author (
        authorId serial NOT NULL primary key,
        name varchar(255) NOT NULL,
        email varchar(255),
        affiliation varchar(255)
        );
`

const createPaperTable = `
    create table Paper (
        paperId serial NOT NULL primary key,
        title varchar(255),
        abstract text
        );
`

const createWritesTable = `
    create table Writes (
        authorId int NOT NULL ,
        paperId int NOT NULL ,
        CONSTRAINT author
            FOREIGN KEY(authorId)
                REFERENCES Author(authorId)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE, 
        CONSTRAINT paper
            FOREIGN KEY(paperId)
                REFERENCES Paper(paperId)
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE 
    );`

const createConferenceTable = `
    create table Conference (
        confId serial NOT NULL primary key,
        name varchar(255) NOT NULL,
        ranking int
        );`

const createSubmitsTable = `
    create table Submits(
        paperId int NOT NULL,
        confId int NOT NULL,
        isAccepted boolean,
        date date,
        CONSTRAINT paper
            FOREIGN KEY(paperId)
                REFERENCES Paper(paperId)
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE,
        CONSTRAINT conference
            FOREIGN KEY(confId)
                REFERENCES Conference(confId)
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE 
    );`

const createCitesTable = `
    create table Cites(
        paperIdFrom int NOT NULL,
        paperIdTo int NOT NULL,
        CONSTRAINT paperFrom
            FOREIGN Key(paperIdFrom)
                REFERENCES Paper(paperId)
                    ON UPDATE CASCADE 
                    ON DELETE RESTRICT, 
        CONSTRAINT paperTo
            FOREIGN KEY(paperIdTo)
                REFERENCES Paper(paperId)
                    ON UPDATE CASCADE 
                    ON DELETE RESTRICT 
    );`
