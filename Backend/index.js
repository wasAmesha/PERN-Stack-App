const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

/* 
function getNotes(req, res){
    return res.json({
        notes: [],
    });
}
*/

async function getClient(){
    const client = new Client("postgresql://NotesDB_owner:0vjlQYZJaiT7@ep-black-water-a191e48l.ap-southeast-1.aws.neon.tech/NotesDB?sslmode=require");

    await client.connect();
    return client;
}

app.post("/add", async function (req, res){
    try{
        //console.log(req.body);
        const note = req.body;

        const client = await getClient();

        addNoteQuery = "insert into notes(id, title, content) values($1, $2, $3)";
        values = [note.id, note.title, note.content];

        await client.query(addNoteQuery, values);

        return res.json({
            msg: "Note Added"
        });
    }catch (error){
        return res.json({
            msg: "internal server error",
        });
    }   
});

app.get("/notes", async function (req, res){
    try {
        const client = await getClient();

        const selectQuery = "select * from notes";
        const response = await client.query(selectQuery);

        return res.json({
            data: response.rows,
        });
    } catch (error) {
        return res.json({
            data: "internal server error",
        });
    }
});

app.listen(8070, function (){
    console.log("App Working Successfully!")
});

