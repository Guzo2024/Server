import Reviews from '../models/Reviews.js';
import Store from '../models/Stores.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createStore = asyncHandler(async (req, res, next) => {
  const { name, location, address, website, phonenumbers, images } = req.body;


  if (!name || !location || !address) {
    throw new ErrorResponse('Name, Standort und Adresse sind erforderliche Felder', 400);
  }

  const store = await Store.create({
    name,
    location,
    address,
    website,
    phonenumbers,
    images,
  });

  res.status(201).json({
    success: true,
    data: store,
  });
});

export const getStores = asyncHandler(async (req, res, next) => {
  const stores = await Store.find();

  for (let store of stores) {
    const storeReviews = await Reviews.find({ store: store._id });
    store._doc.reviews = storeReviews;
  }

  res.status(200).json({
    success: true,
    count: stores.length,
    data: stores,
  });
});

export const getStoreById = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    throw new ErrorResponse('Store not found', 404);
  }

  const reviews = await Reviews.find({ store: store._id });

  res.status(200).json({
    success: true,
    data: { store, reviews },
  });
});

export const updateStore = asyncHandler(async (req, res, next) => {
  let store = await Store.findById(req.params.id);
  if (!store) {
    throw new ErrorResponse('Store not found', 404);
  }

  store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: store,
  });
});

export const deleteStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    throw new ErrorResponse('Store not found', 404);
  }

  await store.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

export const searchStores = asyncHandler(async (req, res, next) => {
  const { store } = req.query;

  const foundStores = await Store.find({
    name: { $regex: store, $options: 'i' },
  });

  if (foundStores.length === 0) {
    throw new ErrorResponse(`Store ${store} not found`, 404);
  }

  res.json(foundStores);
});