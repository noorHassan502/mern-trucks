import mongoose from 'mongoose';

const truckListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: false, // Optional if no discount is applied
    },
    truckType: {
      type: String,
      required: true,
      enum: ['pickup', 'container', 'flatbed', 'dump', 'trailer', 'other'],
    },
    capacityTons: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TruckListing = mongoose.model('TruckListing', truckListingSchema);

export default TruckListing;
