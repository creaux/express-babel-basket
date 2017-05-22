import { Router } from 'express';
import product, {
  create,
  remove,
} from '../controllers/catalog';

const router = Router();

// Get product page
router.get('/', product);
// Create Product
router.get('/create', create);
router.post('/create', create);
// Remove Product
router.get('/remove', remove);
router.post('/remove', remove);

export default router;
