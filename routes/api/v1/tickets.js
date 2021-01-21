// define all your endpoints for the ticket model in this file
const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/ticketController');


router.route('/')
    .get(controller.getTicketList)
    .post(controller.createTicket);
router.route('/:id')
    .get(controller.getTicket)
    .put(controller.updateTicket)
    .delete(controller.deleteTicket);

module.exports = router;
    