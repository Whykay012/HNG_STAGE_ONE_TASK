const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  _id: { type: String }, // UUID v7
  name: { type: String, required: true, unique: true, lowercase: true },
  gender: String,
  gender_probability: Number,
  sample_size: Number,
  age: Number,
  age_group: String,
  country_id: String,
  country_probability: Number,
  created_at: { type: Date, default: Date.now }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      // Ensure created_at is ISO string
      ret.created_at = ret.created_at.toISOString();
      return ret;
    }
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);