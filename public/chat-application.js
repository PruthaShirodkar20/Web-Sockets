// socket connection on the browser side
//io is prsent because of the script in the index.html
var socketClient= io.connect('http://localhost:8080');
var messageClient=document.getElementById('message');
var identifier=document.getElementById('identifier');
var button=document.getElementById('button');
var result=document.getElementById('output-display');
var feedback=document.getElementById('status-display');


//Emitting events
button.addEventListener('click',function()
                       {
    socketClient.emit(
    'Message',
    {
       message:messageClient.value,
       identifier:identifier.value
    })
})

//Listen for events
socketClient.on('Message',function(data)
               {
    feedback.innerHTML="";
    result.innerHTML+='<strong>'+data.identifier+'</strong><br>'+data.message+'<hr>';

})

//Emit typing to other clients on keypress

messageClient.addEventListener('keypress',
                              function()
                              {
    socketClient.emit('typing',identifier.value);
})


socketClient.on('typing',function(data)
               {
 feedback.innerHTML='<p><em>' + data + ' is typing a message...</em></p>';
})