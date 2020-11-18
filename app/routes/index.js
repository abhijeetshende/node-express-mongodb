const express                = require('express');
const router                 = express.Router();
const tutorialController      = require('./turorial.routes');
const iphostController      = require('./iphost.routes');
const machostController      = require('./machost.routes');
const scheduleController      = require('./schedule.routes');
const fqdnController      = require('./fqdn.routes');
const zoneController      = require('./zone.routes');
const fqdnListController      = require('./fqdnlist.routes');

router.use('/tutorial',tutorialController);
router.use('/iphost',iphostController);
router.use('/machost',machostController);
router.use('/schedule',scheduleController);
router.use('/fqdn',fqdnController);
router.use('/zones',zoneController);
router.use('/fqdnlist',fqdnListController);