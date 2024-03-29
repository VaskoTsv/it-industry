const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  bookmarked_companies: [{ type: Types.ObjectId, ref: 'Company' }]
});

module.exports = model('User', schema);
