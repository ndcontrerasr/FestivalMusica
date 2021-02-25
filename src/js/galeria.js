document.addEventListener('DOMContentLoaded', function() {
	crearGaleria();
});

function crearGaleria() {
	const galeria = document.querySelector('.galeria-imagenes');

	for(let i = 1; i<= 12; i++) {
		const imagen = document.createElement('IMG');
		imagen.className = `imagen`;
		imagen.dataset.imagenId = i;
		imagen.src = `build/img/thumb/${i}.webp`;

		//añadir la funcion de mostrarImagen
		imagen.onclick = mostrarImagen;

		// console.log(imagen);
		const lista = document.createElement('LI');
		lista.appendChild(imagen);

		galeria.appendChild(lista);
	}
}

function mostrarImagen(e) {
	console.log(e.target.dataset.imagenId);

	const id = parseInt(e.target.dataset.imagenId);

	const imagen = document.createElement('IMG');
	imagen.src = `build/img/grande/${id}.webp`;

	const overlay = document.createElement('DIV');
	overlay.appendChild(imagen);

	overlay.classList.add('overlay');

	overlay.onclick = function() {
		overlay.remove();
		body.classList.remove('fijar-body')
		
	}

	// Boton para cerrar la imagen
	const cerrarImagen = document.createElement('P');
	cerrarImagen.textContent = 'X';
	cerrarImagen.classList.add('btn-cerrar');

	//tipo
	cerrarImagen.onclick = function() {
		overlay.remove();
		body.classList.remove('fijar-body')
	}

	overlay.appendChild(cerrarImagen);

	//mostrar en el html
	const body = document.querySelector('body');
	body.appendChild(overlay);

	//evitar que de scrult
	body.classList.add('fijar-body');
}