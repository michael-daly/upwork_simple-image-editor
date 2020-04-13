const express = require ('express');
const server  = express ();

const PORT = 3000;


server.use ('/', express.static ('./client'));

server.get ('/', ( req, res ) =>
{
	res.sendFile ('index.html', { root: './client' });
});

server.listen (PORT, () =>
{
	console.log ('Listening on port', PORT);
});
