document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('bienvenida').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('bienvenida').style.display = 'none';
            document.getElementById('contenido-principal').classList.remove('oculto');
            document.getElementById('contenido-principal').classList.add('mostrar');
        }, 1000); // Duración del desvanecimiento
    }, 2000); // Duración de la bienvenida

    cargarGaleria();
    configurarModal();
    initMap();
    configurarFlatpickr();
});

function cargarGaleria() {
    const galeria = document.querySelector('.galeria');
    const imagenes = [
        '1.jpg', '2.jpg', '3.jpg',
        '4.jpg', '5.jpg', '6.jpg',
        '7.jpg', '8.jpg', '9.jpg',
        '10.jpg', '11.jpg', '12.jpg'
    ];

    imagenes.forEach(imagen => {
        const img = document.createElement('img');
        img.src = `images/${imagen}`;
        img.alt = `Mueble ${imagen}`;
        galeria.appendChild(img);
    });
}

function configurarModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('imgModal');
    const captionText = document.getElementById('caption');
    const closeModal = document.getElementsByClassName('close')[0];
    const images = document.querySelectorAll('.galeria img');

    images.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target !== modalImg) {
            modal.style.display = 'none';
        }
    });
}

function initMap() {
    const location = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function configurarFlatpickr() {
    flatpickr("#fecha-visita", {
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: "es"
    });
}

// Función para manejar el envío del formulario con Formspree
document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Gracias por enviar tu mensaje , en breve contestaremos .');
            this.reset();
        } else {
            return response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert('Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.');
                }
            });
        }
    })
    .catch(error => {
        alert('Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.');
        console.error('Error:', error);
    });
});
