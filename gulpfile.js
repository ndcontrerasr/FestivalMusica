// Github 
// const { series, parallel }= require('gulp');

//Compilar gulp------------------------------------
// function CSS( done ) {
// 	console.log('Compilando.... CSS');
// 	done();
// }

// function JavaScript( done ) {
// 	console.log('Compilando.... JavaScript');
// 	done();
// }

// function SASS( done ) {
// 	console.log('Compilando.... SASS');
// 	done();
// }

// function minificarHTML( done ) {
// 	console.log('Minificando....');
// 	done();
// }


// exports.CSS = CSS;
// exports.SASS = SASS;
// exports.JavaScript = JavaScript;

// exports.default = parallel(CSS, JavaScript, SASS);

//Compilar SASS con gulp --------------------

const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

//Funcion que compila SASS

function css(done) {
	console.log('Compilando SASS');
	return src('src/scss/app.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(dest('./build/css'))
}

function watchArchivos() {
	watch('src/scss/**/*.scss', css);
}

exports.css = css;
exports.watch = watchArchivos;