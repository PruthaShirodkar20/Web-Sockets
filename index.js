var express=require('express');
var socket=require('socket.io');
var app=express();

//Create server
var server=app.listen(8080,function()
                 {
    console.log("Server listening on port 8080");
})

//link html& css files by directing the server to the public folder
app.use(express.static('public'));

//Socket setup for the server
var io=socket(server);
//socket on the server side waits for a connection from the browser
io.on('connection',function(socketID)
     {
    console.log('Made socket connection successfully by ');
        console.log(socketID.id);
    socketID.on('Message',function(data)
             {
        io.sockets.emit('Message',data);
    })

//Socket setup for the client

socketID.on('typing',function(data)
         {
    console.log('....');
    socketID.broadcast.emit('typing',data);
    console.log("/////////");
})
})