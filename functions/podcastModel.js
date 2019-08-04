const mongoose = require('mongoose')
const schema = mongoose.Schema

const podcastModel = new schema({
    title: { type: String} ,
    url: { type: String} ,
    image: { type: String}
})

module.exports = mongoose.model('podcast', podcastModel)