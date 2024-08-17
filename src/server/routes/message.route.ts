import express from 'express';

import { sendMessage } from '../controllers';

const router = express.Router();

router.post('/send', sendMessage);

export default router;
