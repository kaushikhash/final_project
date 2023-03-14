const path = require('path');
const { mongoose } = require(path.join(__dirname, '/../db/db'));


let eventSchema = new mongoose.Schema({
    event_id: {
        type: Number,
        unique: true,
        required: true
    },
    name_of_event: {
        type: String,

    },
    description: {
        type: String,
    },
    people: {
        type: [String],
    },
    // no_of_people: {
    //     type: Number,
    // }

});

const Event = mongoose.model('Event', eventSchema);


module.exports = Event