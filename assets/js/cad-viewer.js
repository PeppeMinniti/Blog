// Viewer 3D per modelli CAD STL
// Usa Three.js per rendering interattivo

let currentViewer = null;

function openCADViewer(modelUrl, modelName) {
    // Crea modal
    const modal = document.createElement('div');
    modal.className = 'cad-viewer-modal';
    modal.innerHTML = `
        <div class="cad-viewer-content">
            <span class="cad-viewer-close" onclick="closeCADViewer()">&times;</span>
            <div class="cad-viewer-header">
                <h3>${modelName}</h3>
                <div class="cad-viewer-controls">
                    <button onclick="resetCADCamera()" title="Reset vista">🔄</button>
                    <button onclick="toggleCADWireframe()" title="Wireframe">📐</button>
                    <button onclick="toggleCADRotation()" title="Auto rotazione">🔁</button>
                </div>
            </div>
            <div id="cad-viewer-container"></div>
            <div class="cad-viewer-info">
                <p>🖱️ <strong>Rotazione:</strong> Click sinistro + trascina | <strong>Zoom:</strong> Rotella mouse | <strong>Pan:</strong> Click destro + trascina</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Inizializza Three.js
    setTimeout(() => initCADViewer(modelUrl), 100);

    // Chiudi con ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeCADViewer();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function initCADViewer(modelUrl) {
    const container = document.getElementById('cad-viewer-container');
    if (!container) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Luci
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, -10, -10);
    scene.add(directionalLight2);

    // Griglia - verrà aggiunta dopo il caricamento dell'oggetto

    // Controlli orbita
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // Variabili globali viewer
    currentViewer = {
        scene,
        camera,
        renderer,
        controls,
        model: null,
        autoRotate: false,
        wireframe: false,
        originalMaterial: null
    };

    // Loader STL
    const loader = new THREE.STLLoader();

    // Loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'cad-loading';
    loadingDiv.innerHTML = '<div class="spinner"></div><p>Caricamento modello 3D...</p>';
    container.appendChild(loadingDiv);

    loader.load(
        modelUrl,
        function (geometry) {
            // Crea materiale per STL (colore blu accento del portfolio)
            const material = new THREE.MeshPhongMaterial({
                color: 0x58a6ff,
                specular: 0x111111,
                shininess: 200,
                flatShading: false
            });

            currentViewer.originalMaterial = material.clone();

            // Crea mesh
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Centra modello su X e Y, poggia sul piano Z=0
            geometry.computeBoundingBox();
            const bbox = geometry.boundingBox;

            // Calcola dimensioni
            const sizeX = bbox.max.x - bbox.min.x;
            const sizeY = bbox.max.y - bbox.min.y;
            const sizeZ = bbox.max.z - bbox.min.z;

            // Centra su X e Z (piano orizzontale)
            mesh.position.x = -(bbox.min.x + sizeX / 2);
            mesh.position.z = -(bbox.min.z + sizeZ / 2);

            // Poggia sul piano Y=0 (base a Y=0, centro a Y=altezza/2)
            mesh.position.y = -bbox.min.y;

            // Il centro del modello ora è a (0, altezza/2, 0)
            const modelCenter = new THREE.Vector3(0, sizeY / 2, 0);

            // Scala camera in base a dimensioni dell'oggetto
            const maxDim = Math.max(sizeX, sizeY, sizeZ);

            // Crea griglia proporzionata all'oggetto (3x dimensione oggetto)
            const gridSize = maxDim * 3;
            const gridDivisions = 20;
            const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x222222);
            scene.add(gridHelper);

            const fov = camera.fov * (Math.PI / 180);
            let cameraDist = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraDist *= 2.8; // Distanza iniziale per vedere oggetto completo con margine

            // Posiziona camera con angolazione isometrica, guardando il centro del modello
            camera.position.set(
                modelCenter.x + cameraDist,
                modelCenter.y + cameraDist * 0.7,
                modelCenter.z + cameraDist
            );
            camera.lookAt(modelCenter);

            // Aggiorna target OrbitControls per ruotare intorno al centro del modello
            controls.target.copy(modelCenter);
            controls.minDistance = maxDim * 0.2; // Permetti di avvicinarsi
            controls.maxDistance = maxDim * 50;  // Permetti di allontanarsi molto
            controls.update();

            scene.add(mesh);
            currentViewer.model = mesh;
            currentViewer.modelCenter = modelCenter;
            currentViewer.cameraDist = cameraDist;

            // Rimuovi loading
            loadingDiv.remove();

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                if (currentViewer.autoRotate && currentViewer.model) {
                    currentViewer.model.rotation.y += 0.005;
                }

                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        },
        function (xhr) {
            const percent = (xhr.loaded / xhr.total) * 100;
            loadingDiv.querySelector('p').textContent = `Caricamento: ${Math.round(percent)}%`;
        },
        function (error) {
            console.error('Errore caricamento modello:', error);
            loadingDiv.innerHTML = '<p style="color: #ff6b6b;">❌ Errore caricamento modello 3D</p>';
        }
    );

    // Resize handler
    window.addEventListener('resize', onCADViewerResize);
}

function onCADViewerResize() {
    if (!currentViewer) return;
    const container = document.getElementById('cad-viewer-container');
    if (!container) return;

    currentViewer.camera.aspect = container.clientWidth / container.clientHeight;
    currentViewer.camera.updateProjectionMatrix();
    currentViewer.renderer.setSize(container.clientWidth, container.clientHeight);
}

function resetCADCamera() {
    if (!currentViewer || !currentViewer.modelCenter || !currentViewer.cameraDist) return;

    const mc = currentViewer.modelCenter;
    const dist = currentViewer.cameraDist;

    // Ripristina posizione camera isometrica
    currentViewer.camera.position.set(
        mc.x + dist,
        mc.y + dist * 0.7,
        mc.z + dist
    );
    currentViewer.camera.lookAt(mc);

    // Ripristina target controlli
    currentViewer.controls.target.copy(mc);
    currentViewer.controls.update();
}

function toggleCADWireframe() {
    if (!currentViewer || !currentViewer.model) return;

    currentViewer.wireframe = !currentViewer.wireframe;
    currentViewer.model.material.wireframe = currentViewer.wireframe;
}

function toggleCADRotation() {
    if (!currentViewer) return;
    currentViewer.autoRotate = !currentViewer.autoRotate;
}

function closeCADViewer() {
    const modal = document.querySelector('.cad-viewer-modal');
    if (modal) {
        modal.remove();
    }

    if (currentViewer) {
        if (currentViewer.renderer) {
            currentViewer.renderer.dispose();
        }
        currentViewer = null;
    }

    window.removeEventListener('resize', onCADViewerResize);
}

// Chiudi cliccando fuori
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cad-viewer-modal')) {
        closeCADViewer();
    }
});
