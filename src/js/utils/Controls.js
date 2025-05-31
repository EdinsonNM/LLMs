export class Controls {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.isResearcherMode = false;
    this.components = {};

    this.setupControls();
  }

  setupControls() {
    // Crear panel de controles
    const controlsDiv = document.createElement("div");
    controlsDiv.id = "controls";
    document.body.appendChild(controlsDiv);

    // Selector de modo
    const modeSelector = document.createElement("div");
    modeSelector.id = "mode-selector";
    controlsDiv.appendChild(modeSelector);

    const studentBtn = document.createElement("button");
    studentBtn.className = "mode-btn active";
    studentBtn.textContent = "Modo Estudiante";
    studentBtn.onclick = () => this.setMode("student");
    modeSelector.appendChild(studentBtn);

    const researcherBtn = document.createElement("button");
    researcherBtn.className = "mode-btn";
    researcherBtn.textContent = "Modo Investigador";
    researcherBtn.onclick = () => this.setMode("researcher");
    modeSelector.appendChild(researcherBtn);

    // Controles de cámara
    this.addCameraControls(controlsDiv);

    // Controles de componentes
    this.addComponentControls(controlsDiv);

    // Controles avanzados (solo modo investigador)
    this.addAdvancedControls(controlsDiv);
  }

  addCameraControls(container) {
    const cameraGroup = document.createElement("div");
    cameraGroup.className = "control-group";
    container.appendChild(cameraGroup);

    const cameraLabel = document.createElement("label");
    cameraLabel.textContent = "Rotación de Cámara";
    cameraGroup.appendChild(cameraLabel);

    const cameraSlider = document.createElement("input");
    cameraSlider.type = "range";
    cameraSlider.className = "slider";
    cameraSlider.min = "0";
    cameraSlider.max = "360";
    cameraSlider.value = "0";
    cameraSlider.oninput = (e) => {
      const angle = (e.target.value * Math.PI) / 180;
      this.camera.position.x = Math.cos(angle) * 30;
      this.camera.position.z = Math.sin(angle) * 30;
      this.camera.lookAt(0, 0, 0);
    };
    cameraGroup.appendChild(cameraSlider);
  }

  addComponentControls(container) {
    const componentSelector = document.createElement("div");
    componentSelector.id = "component-selector";
    document.body.appendChild(componentSelector);

    const components = [
      { id: "tokenizer", name: "Tokenizador" },
      { id: "embedding", name: "Embedding" },
      { id: "attention", name: "Atención" },
      { id: "neural", name: "Red Neuronal" },
      { id: "output", name: "Salida" },
    ];

    components.forEach((component) => {
      const btn = document.createElement("button");
      btn.className = "component-btn active";
      btn.textContent = component.name;
      btn.onclick = () => this.toggleComponent(component.id);
      componentSelector.appendChild(btn);
    });
  }

  addAdvancedControls(container) {
    const advancedControls = document.createElement("div");
    advancedControls.className = "advanced-controls";
    container.appendChild(advancedControls);

    // Control de velocidad de animación
    const speedGroup = document.createElement("div");
    speedGroup.className = "control-group";
    advancedControls.appendChild(speedGroup);

    const speedLabel = document.createElement("label");
    speedLabel.textContent = "Velocidad de Animación";
    speedGroup.appendChild(speedLabel);

    const speedSlider = document.createElement("input");
    speedSlider.type = "range";
    speedSlider.className = "slider";
    speedSlider.min = "0.1";
    speedSlider.max = "2";
    speedSlider.value = "1";
    speedSlider.step = "0.1";
    speedSlider.oninput = (e) => {
      this.animationSpeed = parseFloat(e.target.value);
    };
    speedGroup.appendChild(speedSlider);

    // Control de detalle
    const detailGroup = document.createElement("div");
    detailGroup.className = "control-group";
    advancedControls.appendChild(detailGroup);

    const detailLabel = document.createElement("label");
    detailLabel.textContent = "Nivel de Detalle";
    detailGroup.appendChild(detailLabel);

    const detailSlider = document.createElement("input");
    detailSlider.type = "range";
    detailSlider.className = "slider";
    detailSlider.min = "1";
    detailSlider.max = "5";
    detailSlider.value = "3";
    detailSlider.step = "1";
    detailSlider.oninput = (e) => {
      this.detailLevel = parseInt(e.target.value);
      this.updateDetailLevel();
    };
    detailGroup.appendChild(detailSlider);
  }

  setMode(mode) {
    this.isResearcherMode = mode === "researcher";
    document.body.className = mode + "-mode";

    const studentBtn = document.querySelector(".mode-btn:first-child");
    const researcherBtn = document.querySelector(".mode-btn:last-child");

    if (mode === "student") {
      studentBtn.classList.add("active");
      researcherBtn.classList.remove("active");
    } else {
      studentBtn.classList.remove("active");
      researcherBtn.classList.add("active");
    }

    this.updateControls();
  }

  toggleComponent(componentId) {
    if (this.components[componentId]) {
      this.components[componentId].visible =
        !this.components[componentId].visible;
      const btn = document.querySelector(
        `.component-btn[data-component="${componentId}"]`
      );
      btn.classList.toggle("active");
    }
  }

  updateControls() {
    const advancedControls = document.querySelector(".advanced-controls");
    if (advancedControls) {
      advancedControls.style.display = this.isResearcherMode ? "block" : "none";
    }
  }

  updateDetailLevel() {
    // Actualizar nivel de detalle en los componentes
    Object.values(this.components).forEach((component) => {
      if (component.updateDetail) {
        component.updateDetail(this.detailLevel);
      }
    });
  }

  registerComponent(id, component) {
    this.components[id] = component;
  }
}
