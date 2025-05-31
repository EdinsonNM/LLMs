import * as THREE from "three";

export class Tokenizer {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(-25, 0, 0);
    this.scene.add(this.group);

    this.createTokenizer();
  }

  createTokenizer() {
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

    // Crear tokens
    const tokenCount = 8;
    const tokenGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const tokenMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a9eff,
      emissive: 0x4a9eff,
      emissiveIntensity: 0.2,
    });

    this.tokens = [];
    for (let i = 0; i < tokenCount; i++) {
      const token = new THREE.Mesh(tokenGeometry, tokenMaterial);
      const angle = (i / tokenCount) * Math.PI * 2;
      const radius = 3;
      token.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      this.tokens.push(token);
      this.group.add(token);
    }
  }

  animate(text) {
    const tokens = text.split("");
    this.tokens.forEach((token, index) => {
      if (index < tokens.length) {
        token.material.emissiveIntensity = 0.5;
        token.scale.set(1.2, 1.2, 1.2);
      } else {
        token.material.emissiveIntensity = 0.2;
        token.scale.set(1, 1, 1);
      }
    });
  }

  reset() {
    this.tokens.forEach((token) => {
      token.material.emissiveIntensity = 0.2;
      token.scale.set(1, 1, 1);
    });
  }
}
