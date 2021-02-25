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

const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Funcion que compila SASS

const path = {
	imagenes: 'src/img/**/*'
}

function css(done) {
	console.log('Compilando SASS');
	return src('src/scss/app.scss')
		//------------------------------
		//Mensahe de error en el codigo
		.pipe(plumber({ // * 3 * //
			errorHandler: function(err) {
				notify.onError({ // * 4 * //
					title:    'Gulp Error',
					message:  '<%= error.message %>',
					sound:    'Bottle'
				})(err);
				this.emit('end'); // * 5 * //
			}
		}))
		//------------------------------
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(dest('./build/css'))
}

function javaScript() {
	return src('src/js/**/*.js')
		//------------------------------
		//Mensahe de error en el codigo
		.pipe(plumber({ // * 3 * //
			errorHandler: function(err) {
				notify.onError({ // * 4 * //
					title:    'Gulp Error',
					message:  '<%= error.message %>',
					sound:    'Bottle'
				})(err);
				this.emit('end'); // * 5 * //
			}
		}))
		//------------------------------
		.pipe( concat('bundle.js'))
		.pipe( dest('./build/js'))
}

function imagenes() {
	return src(path.imagenes)
		.pipe(imagemin() )
		.pipe(dest('build/img'))
		// .pipe(notify({message: 'Imagenes Minificadas'}));
}

function watchArchivos() {
	watch('src/scss/**/*.scss', css);
	watch('src/js/**/*.js', javaScript);
}

function versionWebp() {
	return src(path.imagenes)
		.pipe(webp())
		.pipe(dest('build/img'))
}

exports.css = css;
exports.imagenes = series(imagenes, versionWebp);
exports.default = series(javaScript, watchArchivos);