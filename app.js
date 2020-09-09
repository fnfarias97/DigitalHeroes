const express = require('express');
const fs = require('fs');
const app = express();
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

app.listen(3030, () => console.log('Server running in 3030 port'));

app.get('/', (req,res) =>{
	res.send(`Ni Superman, Iron
	Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y
	hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como
	inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en
	ti!`)
});

app.get('/heroes', (req, res) => {
	res.send(heroes);
});

app.get('/heroes/detalle/:idHeroe', (req, res) => {
	let id = req.params.idHeroe;
	let heroe = heroes.find(x => x.id == id);
	if (heroe != undefined){
		res.send('Hola! Soy ' + heroe.nombre + ' y soy ' + heroe.profesion);
	} else {
		res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
	}
});

app.get('/heroes/bio/:idHeroe/:ok', (req, res) => {
	let id = req.params.idHeroe;
	let ok = req.params.ok;
	let heroe = heroes.find(x => x.id == id);
	console.log(ok);
	if (heroe != undefined){
		if (ok == 'ok'){
			res.send(`Hola! Soy ${heroe.nombre}! Te dejo un poquito más sobre mí:</br>
			${heroe.resenia}`);
		} else {
			res.send(`Hola! Soy ${heroe.nombre}! Lamento que no desees saber más de mi :(`);
		}
	} else {
		res.status(404).send(`No encontramos
		un héroe para mostrarte su biografía`);
	}	
});

app.get('/creditos', (req,res) =>{
	res.send(`powered by Fer`)
});

app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});