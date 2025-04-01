import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: String,
  cleanliness: {
    type: Number,
    min: 1,
    max: 5,
  },
  taste: {
    type: Number,
    min: 1,
    max: 5,
  },
  service: {
    type: Number,
    min: 1,
    max: 5,
  },
  priceValue: {
    type: Number,
    min: 1,
    max: 5,
  },
  ambience: {
    type: Number,
    min: 1,
    max: 5,
  },
  waitTime: {
    type: Number,
    min: 1,
    max: 5,
  },
  locationRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Review', reviewSchema);
