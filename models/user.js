const userSchema = new Schema({
    is_admin: Boolean
});


const Project = mongoose.model('projects', userSchema);
module.exports = Project;