import * as THREE from "three";

export class Output {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(15, 0, 0);
    this.scene.add(this.group);

    this.createOutput();
  }

  createOutput() {
    // Crear el contenedor principal
    const container = new THREE.Mesh(
      new THREE.BoxGeometry(8, 8, 8),
      new THREE.MeshPhongMaterial({
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      })
    );
    this.group.add(container);

    // Crear partículas de salida
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4a9eff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.group.add(this.particles);

    // Crear líneas de energía
    this.energyLines = [];
    for (let i = 0; i < 12; i++) {
      const points = [];
      for (let j = 0; j < 10; j++) {
        const angle = (j / 10) * Math.PI * 2;
        const radius = 3;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 2
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(geometry, material);
      this.energyLines.push(line);
      this.group.add(line);
    }
  }

  animate(text) {
    const tokens = text.split("");
    const time = Date.now() * 0.001;

    // Animar partículas
    const positions = this.particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length / 3; i++) {
      if (i < tokens.length * 10) {
        positions[i * 3] += Math.sin(time + i) * 0.02;
        positions[i * 3 + 1] += Math.cos(time + i) * 0.02;
        positions[i * 3 + 2] += Math.sin(time * 0.5 + i) * 0.02;
      } else {
        positions[i * 3] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    this.particles.geometry.attributes.position.needsUpdate = true;

    // Animar líneas de energía
    this.energyLines.forEach((line, index) => {
      const points = [];
      for (let j = 0; j < 10; j++) {
        const angle = (j / 10) * Math.PI * 2 + time * 0.5;
        const radius = 3 + Math.sin(time + index) * 0.2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            Math.sin(time * 2 + j) * 0.5
          )
        );
      }
      line.geometry.setFromPoints(points);
      line.geometry.attributes.position.needsUpdate = true;
    });
  }

  reset() {
    const positions = this.particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  update() {
    // Rotación suave de la salida
    this.group.rotation.y += 0.004;
    this.group.rotation.x += 0.002;
  }
}
