import express from 'express';
import { getLocations } from '../controllers/locationController.js';

const router = express.Router();

// রুট: GET /api/locations
router.get('/', getLocations);

export default router; // <--- এখানে default export নিশ্চিত করা হলো