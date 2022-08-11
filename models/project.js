const mongoose = require('mongoose');
const { Schema } = mongoose

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    project_url: {
        type: String,
    },
    current_status: {
        type: String,
        default: 'active'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports.Project = mongoose.model('Project', projectSchema);