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
        default: Date.now()
    },
    urls: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url'
        }]
    },
    status: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports.Project = mongoose.model('Project', projectSchema);