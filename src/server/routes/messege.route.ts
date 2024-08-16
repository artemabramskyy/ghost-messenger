import express from 'express';

import { sendMessege } from '../controllers';

const router = express.Router();

router.post('/send-messege', sendMessege);

export default router;
