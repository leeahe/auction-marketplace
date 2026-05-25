import mongoose from 'mongoose'

// export type Bidder = {
//   userId: string,
//   bid: Number
// };

// export interface Listing {
//   listingId: string;
//   sellerId: string;
//   title: string;
//   description: string;
//   tags: string[]
//   imageUrls: string[];
//   expected_minimum_price: number;
//   current_highest_bid: Bidder;
//   return_refund_policy: string;
//   status : listingStatus;
//   sold_to: string | null;
//   condition: itemCondition;
// }


const ListingSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  

  tags: {
    type: [String],
    default: []
  },  
  
  imageUrls: {
    type: [String],
    default: []
  },

  expected_minimum_price: {
    type: Number,
    required: true
  },

  current_highest_bid: {
    userId: {
      type: String,
      default: null
    },
    bid: {
      type: Number,
      default: null
    }
  },

  return_refund_policy: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['open' , 'closed' , 'deleted'],
    default: 'open'
  },

  sold_to: {
    type: Number,
    default: null
  },

  condition: {
    type: String,
    enum: [ 'new', 'like_new', 'good', 'fair', 'poor'],
    default: 'new'
  }
}, {timestamps: true})

export default mongoose.model('Listing', ListingSchema)