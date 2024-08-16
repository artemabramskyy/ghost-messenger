import express from 'express';

import { sendMessage } from '../controllers';

const router = express.Router();

router.post('/send-message', sendMessage);

export default router;
