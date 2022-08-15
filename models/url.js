const mongoose = require('mongoose');
const { Schema } = mongoose

const urlSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    req_method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE'],
        required: true
    },
    req_body: {
        type: mongoose.Schema.Types.Mixed
    },
    req_headers: {
        type:  mongoose.Schema.Types.Mixed
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports.Url = mongoose.model('Url', urlSchema);