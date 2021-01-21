// Define all of your ticket controller methods in this file that
// will be used as callbacks to your endpoints
const Ticket = require('../models/ticket');

function getTicketList(req, res){
    Ticket.find({}, (err, tickets) => {
        if (err) {
            res.status(500).send('error retrieving ticket list');
        }
        else {
            res.json(tickets);
        }
    });

}
function createTicket(req, res){
    let ticket = new Ticket(req.body);
    ticket.save(function(err){
        if(err){
            res.status(500).send('error creating ticket');
        }
        else{
            res.status(201).json(ticket);
        }
    })

}
function getTicket(req, res){
    Ticket.findById(req.params.id).exec()
    .then(ticket => res.json(ticket))
    .catch(e => res.status(500).send(`error retrieving ticket with id =${req.params.id} `));
}
function updateTicket(req, res){
    Ticket.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true },
        function (err, updatedTicket) {
            if (err) {
                res.staus(500).send('error: ' + err);
            }
            else {
                res.status(204).send('');
            }
        }
    );

}
function deleteTicket(req, res){
    Ticket.findById(req.params.id, function (err, ticket) {
        if (ticket) {
            ticket.remove(err => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send('');
                }
            });
        }
        else {
            res.status(204).send('');
        }
    })

}

exports.getTicketList = getTicketList;
exports.createTicket = createTicket;
exports.getTicket = getTicket;
exports.deleteTicket = deleteTicket;
exports.updateTicket = updateTicket;