var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    user1score: { type: Number, default: 0 },
    user2score: { type: Number, default: 0 },

    debates: [{
        description: { type: String },
        winner: { type: String },
        pending: { type: Boolean, default: true },
        submittedby: {type: String}
    }]
})

module.exports = mongoose.model('Game', GameSchema);
