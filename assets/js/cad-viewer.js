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

    // Griglia
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

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

            // Centra modello
            geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            geometry.boundingBox.getCenter(center);
            mesh.position.sub(center);

            // Scala camera in base a dimensioni dell'oggetto
            const box = new THREE.Box3().setFromObject(mesh);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 3.5; // Zoom out per vedere oggetto intero con margine

            // Posiziona camera con angolazione isometrica
            camera.position.set(cameraZ, cameraZ * 0.8, cameraZ);
            camera.lookAt(0, 0, 0);

            // Aggiorna limiti OrbitControls in base a dimensioni oggetto
            controls.minDistance = maxDim * 0.5;
            controls.maxDistance = maxDim * 10;
            controls.update();

            scene.add(mesh);
            currentViewer.model = mesh;

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
    if (!currentViewer) return;
    currentViewer.camera.position.set(5, 5, 5);
    currentViewer.camera.lookAt(0, 0, 0);
    currentViewer.controls.reset();
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
