
export interface ErrorObject {
  error: string;
  message: string;
}

export interface User {
  userId: string;
  userName: string;
  email: string;
  hashedPassword: string;
}

export interface Session {
  sessionId: string;
  userId: string;
  tokenHash: string;
  active: boolean;
}

export type listingStatus = 'open' | 'closed' | 'deleted';
export type itemCondition = 'new'| 'like_new'| 'good'| 'fair'| 'poor';

export type Bidder = {
  userId: string,
  bid: number
};

export interface Listing {
  listingId: string;
  sellerId: string;
  title: string;
  description: string;
  tags: string[]
  imageUrls: string[];
  expected_minimum_price: number;
  current_highest_bid: Bidder;
  return_refund_policy: string;
  status : listingStatus;
  sold_to: string | null;
  condition: itemCondition;
}

export interface Bid {
  bidId: string;
  bidderId: string;
  listingId: string;
  amount: string;
}

export interface Review {
  reviewId: string;
  listingId: string;
  authorId: string;
  sellerId: string;
  rating: number;
  Comment: string;
}