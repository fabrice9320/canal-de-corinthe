import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import scrollama from "scrollama"; // Importez Scrollama depuis votre package npm



// ---------------------- fetch et ajout des valeurs ------------------------------

// Récupérer le lien vers le fichier JSON
const dataLink = document.querySelector('link[rel="data"]').href;

// Charger les données JSON
fetch(dataLink)
    .then(response => response.json())
    .then(data => {
        // Injecter les données dans les éléments SVG
        // document.querySelector('#step4 .construction_date_start').textContent = data.construction_date_start;
        // document.querySelector('#step4 .construction_date_end').textContent = data.construction_date_end;

        // document.querySelector('#step4 .construction_dates').textContent = data.construction_date_start + " - " + data.construction_date_end;
        const element = document.querySelector('#step4 .construction_dates');
        if (element !== null) {
            element.textContent = data.construction_date_start + " - " + data.construction_date_end;
        }
        // document.querySelector('#step4 .construction_duraction').textContent = data.construction_duraction;
        document.querySelector('#step4 .distance_saved').textContent = data.distance_saved;
        document.querySelector('#step4 .length').textContent = data.length;
        document.querySelector('#step4 .width').textContent = data.width;
        document.querySelector('#step4 .height_max').textContent = data.height_max;
        document.querySelector('#step4 .depth').textContent = data.depth;

        document.querySelector('#step5 .hours_of_operation').textContent = data.hours_of_operation;
        document.querySelector('#step5 .speed_limit').textContent = data.speed_limit;
        document.querySelector('#step5 .transit').textContent = data.transit_per_year;
    })
    .catch(error => console.error('Error loading data:', error));

// ------------------------------------------------------------------




// ---------------------- Scrollama ------------------------------


// ------------------------------------------------------------------



// ---------------------- Version slide ------------------------------

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.9
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));

// ------------------------------------------------------------------



// ---------------------- Carte 1 --------------------------------------------

// Set your Mapbox token here or via environment variable
const MAPBOX_TOKEN = "pk.eyJ1IjoiZmFicmljZTkzMjAiLCJhIjoiY2x2cW4zemM4MGF3aDJpbWg0a3I5M3d3cyJ9.NzJkfmMp9kpjliMvX5Vw-A"; // eslint-disable-line

const map1 = new mapboxgl.Map({
    container: 'map1',
    style: 'mapbox://styles/fabrice9320/clvqnovp201oz01qrel70e53f',
    accessToken: MAPBOX_TOKEN,
    center: [22.9586, 37.9404], // Centered on Corinth Canal in Greece
    zoom: 1.5,
    bearing: 0,
    pitch: 10,
    scrollZoom: false,
    // interactive: false
});

// const tooltip = document.createElement('div');
// tooltip.style.position = 'absolute';
// tooltip.style.zIndex = 1001;
// tooltip.style.pointerEvents = 'none';
// document.body.append(tooltip);

map1.addControl(new mapboxgl.NavigationControl());

document.querySelector('.mapboxgl-control-container').remove();


// ------------------------------------------------------------------


// ---------------------- Carte 2 --------------------------------------------

const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/fabrice9320/clvqnovp201oz01qrel70e53f',
    accessToken: MAPBOX_TOKEN,
    center: [22.9586, 37.9404],
    zoom: 1.5,
    // essential: true,
    bearing: 0,
    pitch: 10,
    interactive: false
});

// make a function to zoom the map on the corinth canal
function zoomToCorinthCanal() {
    map2.flyTo({
        center: [22.9586, 37.9404],
        zoom: 12,
        essential: true
    });
}

// // use zoomToCorinthCanal when i scoll the page
document.addEventListener('click', zoomToCorinthCanal);

map2.addControl(new mapboxgl.NavigationControl());

document.querySelector('.mapboxgl-control-container').remove();

// ------------------------------------------------------------------



// ---------------------- Déclencher le zoom map2--------------------

const customObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === 'step3') {
            setTimeout(() => zoomToCorinthCanal(), 500); // Appel de la fonction de zoom lorsque le step3 est visible
        }
    });
}, {
    threshold: 0.9
});

customObserver.observe(document.querySelector("#step3"))

const hiddenElements2 = document.querySelectorAll('.hidden');
hiddenElements2.forEach((el) => customObserver.observe(el));

// ------------------------------------------------------------------



// ---------------------- hover paires --------------------------------------------

// Sélectionnez tous les éléments de texte avec un attribut data-target
const textElementsPaires = document.querySelectorAll('.text_step4[data-target]');

// Parcourez chaque élément de texte
textElementsPaires.forEach(element => {
    // Ajoutez un écouteur d'événement pour le hover
    element.addEventListener('mouseenter', () => {
        // Récupérez la valeur de l'attribut data-target
        const target = element.getAttribute('data-target');

        // Sélectionnez tous les éléments de texte avec le même data-target
        const relatedTexts = document.querySelectorAll(`.text_step4[data-target="${target}"]`);

        // Changez la couleur de texte pour tous les éléments associés
        relatedTexts.forEach(text => {
            text.style.fill = '#333'; // Couleur de texte plus foncée lors du hover
        });
    });

    // Rétablissez la couleur de texte par défaut lorsque la souris quitte l'élément
    element.addEventListener('mouseleave', () => {
        const target = element.getAttribute('data-target');
        const relatedTexts = document.querySelectorAll(`.text_step4[data-target="${target}"]`);
        relatedTexts.forEach(text => {
            text.style.fill = '#e6e6e6'; // Couleur de texte claire par défaut
        });
    });
});

// ------------------------------------------------------------------



// ---------------------- hover affichage texte --------------------------------------------

const textElements = document.querySelectorAll('.text_step5');

// Ajouter un écouteur d'événement pour chaque élément
textElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Récupérer la valeur de l'attribut data-target
        const targetClass = element.getAttribute('data-target');

        // Afficher la valeur associée en utilisant la classe cible
        const valueElements = document.querySelectorAll(`.${targetClass}`);
        valueElements.forEach(valueElement => {
            valueElement.style.display = 'block';
        });

        // Changez la couleur de texte pour l'élément survolé
        element.style.fill = '#333'; // Couleur de texte plus foncée lors du hover
    });

    element.addEventListener('mouseleave', () => {
        // Cacher la valeur associée lorsque la souris quitte le mot en dur
        const targetClass = element.getAttribute('data-target');
        const valueElements = document.querySelectorAll(`.${targetClass}`);
        valueElements.forEach(valueElement => {
            valueElement.style.display = 'none';
        });

        element.style.fill = '#e6e6e6'; // Couleur de texte claire par défaut
    });
});

// ------------------------------------------------------------------



// ---------------------- hover texte bas de page --------------------------------------------

const basPageText = document.querySelector('.basPage-text'); // Sélectionne le conteneur .basPage-text

const paragraphs = basPageText.querySelectorAll('p'); // Sélectionne tous les éléments <p> à l'intérieur de .basPage-text

paragraphs.forEach(paragraph => {
    paragraph.addEventListener('mouseenter', function () {
        this.style.color = '#333'; // Modifie la couleur du texte au survol
    });

    paragraph.addEventListener('mouseleave', function () {
        this.style.color = '#e6e6e6'; // Rétablit la couleur du texte lorsque la souris quitte la zone
    });
});

// ------------------------------------------------------------------



// ---------------------- start again --------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const startAgainButton = document.querySelector('.stepLast-text');

    // Ajouter l'écouteur d'événement pour le clic
    startAgainButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Fait remonter la page en haut
    });

    // Ajouter l'effet de survol
    startAgainButton.addEventListener('mouseenter', function () {
        // Change la couleur du texte au survol
        this.style.color = '#333';
    });

    // Rétablir la couleur du texte lorsque la souris quitte le bouton
    startAgainButton.addEventListener('mouseleave', function () {
        this.style.color = '#e6e6e6'; // Rétablit la couleur du texte
    });
});

// ------------------------------------------------------------------

