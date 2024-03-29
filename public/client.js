import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js';

// Inizializzazione della scena
var scene = new THREE.Scene();
const tween = new TWEEN.Tween();
let flagmonitor = false;
let IndiceStato = 0;
let bloccoanimazione = false;

// Creazione della camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);

camera.position.z = 2;
camera.position.y = 3;
camera.position.x = 4;
camera.rotation.x = -1;
camera.rotation.y = 1.2;
camera.rotation.z = 0.95;

function getDistanza() {
    var larghezzaSchermo = window.innerWidth;
    var posizione 
    if (larghezzaSchermo <= 480) {
        posizione = {
            x: -0.44,
            y: 2.45,
            z: -1.55
        };
    } else if (larghezzaSchermo > 480 && larghezzaSchermo <= 1080) {
        posizione = {
            x: -0.44,
            y: 2.2,
            z: -2.0
        };
    } else if (larghezzaSchermo > 1080 && larghezzaSchermo <= 1800) {
        posizione = {
            x: -0.44,
            y: 2.2,
            z: -2.0
        };
    } else {
        posizione = {
            x: -0.6,
            y: 2.1,
            z: -2.4
        };
    }
    return posizione;
}

function animateReverseCameraTransitionBackFromMonitor() {
    flagmonitor = false;
    rendererCSS3D.domElement.style.zIndex = "0";
    buttonAvanti.style.display = "none";
    buttonIndietro.style.display = "none";
    divDescrizione.style.display = "none";

    const initialPosition = getDistanza();

    const initialRotation = {
        x: 0,
        y: 0,
        z: 0
    };

    const finalPosition = {
        x: 4,
        y: 3,
        z: 2
    };
    const finalRotation = {
        x: -1,
        y: 1.2,
        z: 0.95
    };

    const duration = 3000;

    // Interpolazione della posizione e della rotazione utilizzando Tween.js
    const positionTween = new TWEEN.Tween(initialPosition)
        .to(finalPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
        });

    const rotationTween = new TWEEN.Tween(initialRotation)
        .to(finalRotation, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
        })
        .onComplete(() => {
            divText.style.display = "flex";
        });

    // Avvia l'animazione
    positionTween.start();
    rotationTween.start();
}

function animateCameraTransitionToMonitor() {
    flagmonitor = true;
    divText.style.display = "none";

    const initialPosition = {
        x: 4,
        y: 3,
        z: 2
    };
    const initialRotation = {
        x: -1,
        y: 1.2,
        z: 0.95
    };

    const finalPosition = getDistanza();

    const finalRotation = {
        x: 0,
        y: 0,
        z: 0
    };

    const duration = 3000;

    // Interpolazione della posizione e della rotazione utilizzando Tween.js
    const positionTween = new TWEEN.Tween(initialPosition)
        .to(finalPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
        });

    const rotationTween = new TWEEN.Tween(initialRotation)
        .to(finalRotation, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
        })
        .onComplete(() => {
            rendererCSS3D.domElement.style.zIndex = "1";
            buttonAvanti.style.display = "block";
            buttonIndietro.style.display = "block";
            divDescrizione.style.display = "block";
        });

    // Avvia l'animazione
    positionTween.start();
    rotationTween.start();
}


// Crea un renderer CSS3DRenderer
const rendererCSS3D = new CSS3DRenderer();
rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
rendererCSS3D.domElement.style.position = 'fixed';
rendererCSS3D.domElement.style.top = 0;
rendererCSS3D.id = "divRender2d"; // Imposta l'ID del div
rendererCSS3D.domElement.style.zIndex = "0"; // Imposta il valore di z-index

document.body.appendChild(rendererCSS3D.domElement);

const planeWidth = 1.4; // Larghezza del piano
const planeHeight = 0.6; // Altezza del piano

// Aggiungi una superficie 3D per visualizzare la pagina web
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight); // Dimensioni della superficie
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry);
plane.rotation.y = Math.PI; // Ruota la superficie 
plane.position.set(-0.44, 2.12, -3.26);

scene.add(plane);

//Creazione struttura iFrame

const div = document.createElement("div");
div.style.width = "100%";
div.style.height = "100%";

// Crea un iframe per caricare contenuti
const iframe = document.createElement('iframe');
iframe.src = "documento.html"; // Sostituisci con l'URL della tua pagina web
iframe.style.width = '100%'; // Specifica la larghezza in pixel dell'iframe
iframe.style.height = '100%'; // Specifica l'altezza in pixel dell'iframe
iframe.style.border = 'none';

div.appendChild(iframe);

// Crea un oggetto 3D per l'iframe e posizionalo sulla superficie del piano
const cssObject = new CSS3DObject(div);
cssObject.position.set(0, 0, 0); // Posizione relativa rispetto al piano
cssObject.rotation.y = -Math.PI;
plane.add(cssObject);

// Ottieni le dimensioni della pagina HTML
const pageWidth = window.innerWidth; // Larghezza della pagina HTML
const pageHeight = window.innerHeight; // Altezza della pagina HTML
// Calcola la scala necessaria
const scaleX = planeWidth / pageWidth;
const scaleY = planeHeight / pageHeight;

// Applica la scala all'oggetto CSS3DObject
cssObject.scale.set(scaleX, scaleY, 1);

const divText = document.getElementById('container_text');

// Crea Div che contiene il testo descrittivo
const divDescrizione = document.createElement('div');
divDescrizione.id = 'containerdescrizione';

document.body.appendChild(divDescrizione);
divDescrizione.style.display = "none";



// Crea un elemento HTML per il pulsante
const buttonAvanti = document.createElement('button');
buttonAvanti.textContent = '>';
buttonAvanti.id = 'avanti';
buttonAvanti.style.display = "none";

// Aggiungi il pulsante all'elemento body del documento HTML
document.body.appendChild(buttonAvanti);

// Crea un elemento HTML per il pulsante
const buttonIndietro = document.createElement('button');
buttonIndietro.textContent = '<';
buttonIndietro.id = 'indietro';
buttonIndietro.style.display = "none";

// Aggiungi il pulsante all'elemento body del documento HTML
document.body.appendChild(buttonIndietro);

// Creazione del renderer
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); // Imposta il rapporto dei pixel a 2 volte il valore attuale
renderer.setSize(window.innerWidth, window.innerHeight); // Imposta la dimensione del renderer alla dimensione della finestra
renderer.antialias = true; // Abilita l'antialiasing
//renderer.setPixelRatio(2); // Imposta il rapporto dei pixel per una maggiore risoluzione(disattivato per via delle prestazioni)

// Configura il renderer WebGL per supportare le ombre
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Abilita le ombre nella scena
scene.receiveShadow = true; // Abilita la ricezione delle ombre
scene.castShadow = true; // Abilita la proiezione delle ombre

document.body.appendChild(renderer.domElement);

// Creazione delle luci

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Colore: bianco, Intensità: 0.5
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(10, 5, 10); // Puoi impostare la posizione della luce direzionale
directionalLight.castShadow = true; // Abilita il lancio delle ombre

directionalLight.shadow.mapSize.width = 2048; // Larghezza della mappa delle ombre
directionalLight.shadow.mapSize.height = 2048; // Altezza della mappa delle ombre
directionalLight.shadow.camera.left = -10; // Limite sinistro della telecamera ombra
directionalLight.shadow.camera.right = 10; // Limite destro della telecamera ombra
directionalLight.shadow.camera.top = 10; // Limite superiore della telecamera ombra
directionalLight.shadow.camera.bottom = -10; // Limite inferiore della telecamera ombra

// Abilita l'antialiasing per le ombre
directionalLight.shadow.mapSize.width *= 2; // Moltiplica la larghezza della mappa delle ombre per applicare l'antialiasing
directionalLight.shadow.mapSize.height *= 2; // Moltiplica l'altezza della mappa delle ombre per applicare l'antialiasing
directionalLight.shadow.camera.near = 0.5; // Distanza del piano vicino per la telecamera delle ombre
directionalLight.shadow.camera.far = 500; // Distanza del piano lontano per la telecamera delle ombre
directionalLight.shadow.bias = -0.0005; // Compensazione del bias delle ombre per evitare artefatti

scene.add(directionalLight);

const directionalLightFuori = new THREE.DirectionalLight("lightyellow", 2);
directionalLightFuori.position.set(-10, 7, -5); // Puoi impostare la posizione della luce direzionale
directionalLightFuori.castShadow = true; // Abilita il lancio delle ombre

directionalLightFuori.shadow.mapSize.width = 2048; // Larghezza della mappa delle ombre
directionalLightFuori.shadow.mapSize.height = 2048; // Altezza della mappa delle ombre
directionalLightFuori.shadow.camera.left = -10; // Limite sinistro della telecamera ombra
directionalLightFuori.shadow.camera.right = 10; // Limite destro della telecamera ombra
directionalLightFuori.shadow.camera.top = 10; // Limite superiore della telecamera ombra
directionalLightFuori.shadow.camera.bottom = -10; // Limite inferiore della telecamera ombra

// Abilita l'antialiasing per le ombre
directionalLightFuori.shadow.mapSize.width *= 2; // Moltiplica la larghezza della mappa delle ombre per applicare l'antialiasing
directionalLightFuori.shadow.mapSize.height *= 2; // Moltiplica l'altezza della mappa delle ombre per applicare l'antialiasing
directionalLightFuori.shadow.camera.near = 0.5; // Distanza del piano vicino per la telecamera delle ombre
directionalLightFuori.shadow.camera.far = 500; // Distanza del piano lontano per la telecamera delle ombre
directionalLightFuori.shadow.bias = -0.0005; // Compensazione del bias delle ombre per evitare artefatti

scene.add(directionalLightFuori);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(10, 6, 6); // Puoi impostare la posizione della luce direzionale
scene.add(directionalLight2);


//--------------------------------------------------------------------
//BUTTON LISTENER
//pulsante di inizio
const buttoninizio = document.getElementById('btnstart');

// Aggiungi un event listener al pulsante di inizio.
buttoninizio.addEventListener('click', function () {
    IndiceStato = 1;
    bloccoanimazione = false;
    stato();
});

// Aggiungi un event listener al pulsante di inizio.
buttonAvanti.addEventListener('click', function () {
    IndiceStato++;
    bloccoanimazione = false; //blocco animazione serve per non far fare l'animazione alla camera tornando indietro
    stato();
});

// Aggiungi un event listener al pulsante di inizio.
buttonIndietro.addEventListener('click', function () {
    IndiceStato--;
    bloccoanimazione = true;
    stato();
});

// Event listener
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && IndiceStato > 0) {
        IndiceStato--;
        bloccoanimazione = true;
        stato();
    } else if (event.key === 'ArrowRight' && IndiceStato > 0) {
        IndiceStato++;
        bloccoanimazione = false;
        stato();
    }
});

//---------------------------------------------------------------------------------------------------------------------

//stato e azioni del tour
function stato() {
    switch (IndiceStato) {
        case 0:
            animateReverseCameraTransitionBackFromMonitor();
            break;
        case 1:
            if (!bloccoanimazione) {
                animateCameraTransitionToMonitor();
            }
            iframe.src = "documento.html";
            divDescrizione.innerHTML = 'Competenze web <div class="descrizione">Negli anni ho sviluppato buone competenze nello sviluppo web perfezionando l\'uso di HTML, CSS e JavaScript</div>';
            break;
        case 2:
            iframe.src = "documento2.html";
            divDescrizione.innerHTML = 'Backend <div class="descrizione">Inolte ho sviluppato molte competenze nello sviluppo backend e nell\'uso di Node.js, Express, Three.js, PHP e SQL per l\'interazione con il database</div>';
            break;
        case 3:
            iframe.src = "documento3.html";
            divDescrizione.innerHTML = 'Sviluppo di applicazioni desktop<div class="descrizione">Ho imparato ad usare linguaggi ad oggetti come C++, C# e Java per lo sviluppo di applicazioni desktop e mobile ed ho imparato ad usare linguaggi come C ed Assembly</div>';
            break;
        case 4:
            iframe.src = "documento4.html";
            divDescrizione.innerHTML = 'Vmware iperconvergenza e sicurezza del dato<div class="descrizione">Ho completato un corso su VMware, iperconvergenza e sicurezza dei dati. Ho acquisito competenze nella gestione di ambienti virtualizzati utilizzando VMware vSphere</div>';
            break;
        case 5:
            iframe.src = "documento5.html";
            divDescrizione.innerHTML = 'Contatti<div class="descrizione">Puoi contattarmi al seguente indirizzo mail: kevinromanello99@gmail.com<br>oppure al numero: +39 3923050338<br>Puoi trovarmi su linkedin, visualizzare il CV o inviarmi una E-mail tramite i bottoni nell\'header</div>';
            break;
        case 6:
            animateReverseCameraTransitionBackFromMonitor();
            IndiceStato = 0;
            break;
        default:
            break;
    }
}

//---------------------------------------------------------------------------------------------------------------------

// Carica il modello GLTF
var loader = new GLTFLoader();
loader.load(
    'stanzafattabeneNoLuci.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true; // Imposta il modello per proiettare ombre
                child.receiveShadow = true; // Imposta il modello per ricevere ombre
            }
        });
        var modelloCaricato = gltf.scene; // Salva il modello caricato nella variabile
        scene.add(modelloCaricato); // Aggiungi il modello alla scena

        // Chiamata alla funzione animate per avviare l'animazione
        animate();
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Creazione dei controlli orbitanti
//const controls = new OrbitControls(camera, renderer.domElement);

// Aggiunta di uno sfondo colorato
scene.background = new THREE.Color('#000041');

function aggiornagrandezze() {
    // Ottieni le dimensioni della pagina HTML
    const pageWidth = window.innerWidth; // Larghezza della pagina HTML
    const pageHeight = window.innerHeight; // Altezza della pagina HTML
    // Calcola la scala necessaria
    const scaleX = planeWidth / pageWidth;
    const scaleY = planeHeight / pageHeight;

    // Applica la scala all'oggetto CSS3DObject
    cssObject.scale.set(scaleX, scaleY, 1);

}

// Funzione per gestire il ridimensionamento della finestra
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    if(flagmonitor){
        let nuovaposizione = getDistanza();
        camera.position.set(nuovaposizione.x,nuovaposizione.y, nuovaposizione.z);
    }
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
    aggiornagrandezze();
}
window.addEventListener('resize', onWindowResize);

// Funzione per animare la scena
function animate() {
    //controls.update();
    TWEEN.update();
    renderer.render(scene, camera); //Renderizza la scena
    rendererCSS3D.render(scene, camera);//funzione per renderizzare il codice html dento il mondo
    requestAnimationFrame(animate);
}