import * as THREE from "three";
import { Tokenizer } from "./components/Tokenizer.js";
import { Embedding } from "./components/Embedding.js";
import { Attention } from "./components/Attention.js";
import { NeuralNetwork } from "./components/NeuralNetwork.js";
import { Output } from "./components/Output.js";
import { Controls } from "./utils/Controls.js";
import { Animation } from "./utils/Animation.js";

class App {
  constructor() {
    this.init();
  }

  init() {
    // Configurar escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);
    this.scene.fog = new THREE.Fog(0x0a0a0a, 20, 100);

    // Configurar cámara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 10, 30);
    this.camera.lookAt(0, 0, 0);

    // Configurar renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    // Añadir luces
    this.addLights();

    // Crear componentes
    this.components = {
      tokenizer: new Tokenizer(this.scene),
      embedding: new Embedding(this.scene),
      attention: new Attention(this.scene),
      neural: new NeuralNetwork(this.scene),
      output: new Output(this.scene),
    };

    // Configurar controles
    this.controls = new Controls(this.scene, this.camera, this.renderer);
    Object.entries(this.components).forEach(([id, component]) => {
      this.controls.registerComponent(id, component);
    });

    // Configurar animación
    this.animation = new Animation(this.components);

    // Configurar entrada de texto
    this.setupTextInput();

    // Configurar eventos de ventana
    window.addEventListener("resize", () => this.onWindowResize());

    // Iniciar bucle de animación
    this.animate();
  }

  addLights() {
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0x4a9eff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Luz puntual
    const pointLight = new THREE.PointLight(0x4a9eff, 1, 100);
    pointLight.position.set(0, 10, 0);
    this.scene.add(pointLight);
  }

  setupTextInput() {
    const inputContainer = document.createElement("div");
    inputContainer.id = "input-simulation";
    document.body.appendChild(inputContainer);

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "text-input";
    textInput.placeholder = "Ingresa texto para procesar...";
    inputContainer.appendChild(textInput);

    const processBtn = document.createElement("button");
    processBtn.id = "process-btn";
    processBtn.textContent = "Procesar";
    processBtn.onclick = () => {
      const text = textInput.value;
      if (text) {
        this.animation.startAnimation(text);
      }
    };
    inputContainer.appendChild(processBtn);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Actualizar animaciones
    this.animation.update();

    // Renderizar escena
    this.renderer.render(this.scene, this.camera);
  }
}

// Iniciar aplicación
new App();
