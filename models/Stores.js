import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  website: String,
  phonenumbers: [String],
  images: String,
});

storeSchema.index({ location: '2dsphere' });

export default mongoose.model('Store', storeSchema);
