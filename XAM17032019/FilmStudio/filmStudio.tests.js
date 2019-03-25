let assert = require('chai').assert;
let FilmStudio = require('./filmStudio').filmStudio;

describe('Film Studio', function () {
	it('has defined name when non-empty string passed to constructor', function () {
		let studioName = 'Pixar'
		let filmStudio = new FilmStudio(studioName);
		assert.equal(studioName, filmStudio.name);
	});

	it('films collection is an array', function () {
		let filmStudio = new FilmStudio();
		assert.isArray(filmStudio.films);
	});

	it('films collection is an empty array upon creation', function () {
		let filmStudio = new FilmStudio();
		assert.isEmpty(filmStudio.films);
	});

	it('throws an error if trying to make a movie with invalid number of parameters', function () {
		let filmStudio = new FilmStudio('Pixar');
		assert.throws(() => { filmStudio.makeMovie('Movie') }, 'Invalid arguments count');
	});

	it('throws an error if trying to make a movie with invalid name', function () {
		let filmStudio = new FilmStudio('Pixar');
		assert.throws(() => { filmStudio.makeMovie({}, []) }, 'Invalid arguments');
	});

	it('throws an error if trying to make a movie with invalid roles', function () {
		let filmStudio = new FilmStudio('Pixar');
		assert.throws(() => { filmStudio.makeMovie('Movie', {}) }, 'Invalid arguments');
	});

	it('makes a movie with if valid parameters passed', function () {
		let filmStudio = new FilmStudio('Pixar');
		let movie = filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
		assert.isObject(movie);
		assert.equal('The Avengers', movie.filmName);
		assert.isArray(movie.filmRoles);
		assert.deepEqual(movie.filmRoles, [
			{ role: "Iron-Man", actor: false },
			{ role: "Thor", actor: false },
			{ role: "Hulk", actor: false },
			{ role: "Arrow guy", actor: false }
		]);
	});

	it('throws an error if searching for inexistent movie', function () {
		let filmStudio = new FilmStudio('Pixar');
		assert.throws(() => { filmStudio.lookForProducer('Inexistent Movie') },
			'Inexistent Movie do not exist yet, but we need the money...');
	});

	it('returns cast details when searching for existing movie', function () {
		let filmStudio = new FilmStudio('Pixar');
		filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
		let actualResult = filmStudio.lookForProducer('The Avengers');
		let expectedResult = 'Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Thor\nfalse as Hulk\nfalse as Arrow guy\n';
		assert.equal(actualResult, expectedResult);
	});

	it('throws an error if trying to cast actors without movies', function () {
		let filmStudio = new FilmStudio('Pixar');
		assert.throws(() => { filmStudio.casting() },
			'There are no films yet in Pixar.');
	});
});