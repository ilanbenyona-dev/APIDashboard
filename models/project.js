const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    project_name: String,
    users: [{ id:String ,admin:Boolean }], 
    deadline_at: Number, // Int representing the time in miliseconds
    started_at: Number, // Int representing the time in miliseconds
    description: String,
    budget: Number,
    chat: [{message_id: String, created: Date, sender_id: String, content: String}],
    assets: [{d: String, URI: String}],
    missions: [{id: String, priority: Number, content: String, deadline_at: Number}]
});



const Project = mongoose.model('projects', projectSchema);
module.exports = Project;


/*
const database = [projectObject, projectObject1]

app.get('/',(req, res)=>{
    res.send('API is online')
})

app.get('/project/:projectid', (req, res)=>{
    const project = database.filter(x => x.id === req.params.projectid);
    if(!project.length) return res.send('No project found')
    delete project[0].chat;

    res.json(project)
})

app.get('/project/chat/:projectid',(req, res)=>{
    const project = database.filter(x => x.id === req.params.projectid);
    if(!project.length) return res.send('No project found')

    res.json(project[0].chat)
})

app.get('/',(req, res)=>{
    
})




const port = process.env.PORT || 4040;
app.listen(port, console.log(`Project mamangemnt is running on ${port}`));

*/