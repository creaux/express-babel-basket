import { Router } from 'express';
import basket, { add, remove } from '../controllers/basket';

const router = Router();

router.get('/', basket);
router.get('/add', add);
router.post('/add', add);
router.get('/remove', remove);
router.post('/remove', remove);

export default router;
