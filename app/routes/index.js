const express                = require('express');
const router                 = express.Router();
const tutorialController      = require('./turorial.routes');
const iphostController      = require('./iphost.routes');
const machostController      = require('./machost.routes');

router.use('/tutorial',tutorialController);
router.use('/iphost',iphostController);
router.use('/machost',machostController);