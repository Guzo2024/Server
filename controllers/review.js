import Review from '../models/Reviews.js';
import Store from '../models/Stores.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getStoreReviews = asyncHandler(async (req, res, next) => {
  const { storeId } = req.params;

  const reviews = await Review.find({ store: storeId }).populate(
    'user',
    'firstName lastName'
  );

  if (!reviews.length) {
    return res.status(404).json({
      success: false,
      message: 'No reviews found for this store',
    });
  }

  const reviewsWithAverages = reviews.map((review) => {
    const individualAverage =
      (review.cleanliness +
        review.taste +
        review.service +
        review.priceValue +
        review.ambience +
        review.waitTime +
        review.locationRating) /
      7;
    return {
      ...review.toObject(),
      individualAverage: individualAverage.toFixed(2),
    };
  });

  const overallAverageRating =
    reviewsWithAverages.reduce(
      (acc, review) => acc + Number(review.individualAverage),
      0
    ) / reviewsWithAverages.length;

  res.status(200).json({
    success: true,
    data: {
      reviews: reviewsWithAverages,
      averageRating: overallAverageRating.toFixed(2),
    },
  });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const {
    comment,
    cleanliness,
    taste,
    service,
    priceValue,
    ambience,
    waitTime,
    locationRating,
  } = req.body;
  const { storeId } = req.params;

  const review = await Review.create({
    store: storeId,
    user: req.uid,
    comment,
    cleanliness,
    taste,
    service,
    priceValue,
    ambience,
    waitTime,
    locationRating,
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});
