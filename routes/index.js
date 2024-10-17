import { Router } from 'express';
import AppController from '../controllers/AppController';

// Create a new instance
const router = new Router();

// Define the GET /status route
router.get('/status', AppController.status);

// Define the GET /stats route
router.get('/stats', AppController.stats);

export default router;
