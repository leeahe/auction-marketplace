
export interface ErrorObject {
  error: string;
  message: string;
}

export interface User {
  userId: string;
  userName: string;
  email: string;
  hashedPassword: string;
  address: string;
}

export interface Session {
  sessionId: string;
  userId: string;
  TokenHash: string;
  active: boolean;
}

export type listingStatus = 'open' | 'closed' | 'deleted';
export type ItemCondition = 'new'| 'like_new'| 'good'| 'fair'| 'poor';

export interface Listing {
  listingId: string;
  sellerId: string;
  title: string;
  description: string;
  tags: string[]
  imageUrls: string[];
  expected_minimum_price: number;
  current_highest_bid: number | null;
  return_refund_policy: string;
  status : listingStatus;
  soldTo: string | null;
  condition: string;
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