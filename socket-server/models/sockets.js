const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.ticketList = new TicketList();
        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            
            console.log('Client connected!')
            
            // Escuchar evento: mensaje-to-server
            socket.on('create-ticket', ( _, callback ) => {
                const newTicket = this.ticketList.createTicket();
                callback( newTicket );
            });

            socket.on('next-ticket', ( user, callback ) => {
                const nextTicket = this.ticketList.assignTicket( user.agent, user.desktop );
                callback( nextTicket );
                this.io.emit('ticket-assigned', this.ticketList.getLast13);
            });
            
        
        });
    }


}


module.exports = Sockets;