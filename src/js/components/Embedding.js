import * as THREE from "three";

export class Embedding {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(-15, 0, 0);
    this.scene.add(this.group);

    this.createEmbedding();
  }

  createEmbedding() {
    // Crear el cubo 3D de puntos
    const size = 5;
    const pointsPerSide = 8;
    const spacing = size / (pointsPerSide - 1);
    const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pointMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a9eff,
      emissive: 0x4a9eff,
      emissiveIntensity: 0.2,
    });

    this.points = [];
    for (let x = 0; x < pointsPerSide; x++) {
      for (let y = 0; y < pointsPerSide; y++) {
        for (let z = 0; z < pointsPerSide; z++) {
          const point = new THREE.Mesh(pointGeometry, pointMaterial);
          point.position.set(
            (x - pointsPerSide / 2) * spacing,
            (y - pointsPerSide / 2) * spacing,
            (z - pointsPerSide / 2) * spacing
          );
          this.points.push(point);
          this.group.add(point);
        }
      }
    }

    // Crear líneas para mostrar la estructura del cubo
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.2,
    });

    // Líneas horizontales
    for (let y = 0; y < pointsPerSide; y++) {
      for (let z = 0; z < pointsPerSide; z++) {
        const points = [];
        for (let x = 0; x < pointsPerSide; x++) {
          points.push(
            new THREE.Vector3(
              (x - pointsPerSide / 2) * spacing,
              (y - pointsPerSide / 2) * spacing,
              (z - pointsPerSide / 2) * spacing
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        this.group.add(line);
      }
    }

    // Líneas verticales
    for (let x = 0; x < pointsPerSide; x++) {
      for (let z = 0; z < pointsPerSide; z++) {
        const points = [];
        for (let y = 0; y < pointsPerSide; y++) {
          points.push(
            new THREE.Vector3(
              (x - pointsPerSide / 2) * spacing,
              (y - pointsPerSide / 2) * spacing,
              (z - pointsPerSide / 2) * spacing
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        this.group.add(line);
      }
    }

    // Líneas de profundidad
    for (let x = 0; x < pointsPerSide; x++) {
      for (let y = 0; y < pointsPerSide; y++) {
        const points = [];
        for (let z = 0; z < pointsPerSide; z++) {
          points.push(
            new THREE.Vector3(
              (x - pointsPerSide / 2) * spacing,
              (y - pointsPerSide / 2) * spacing,
              (z - pointsPerSide / 2) * spacing
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        this.group.add(line);
      }
    }
  }

  animate(text) {
    const tokens = text.split("");
    this.points.forEach((point, index) => {
      if (index < tokens.length * 64) {
        // 64 puntos por token
        point.material.emissiveIntensity = 0.5;
        point.scale.set(1.2, 1.2, 1.2);

        // Añadir movimiento aleatorio
        const time = Date.now() * 0.001;
        point.position.x += Math.sin(time + index) * 0.01;
        point.position.y += Math.cos(time + index) * 0.01;
        point.position.z += Math.sin(time * 0.5 + index) * 0.01;
      } else {
        point.material.emissiveIntensity = 0.2;
        point.scale.set(1, 1, 1);
      }
    });
  }

  reset() {
    this.points.forEach((point) => {
      point.material.emissiveIntensity = 0.2;
      point.scale.set(1, 1, 1);
      point.position.copy(point.userData.originalPosition || point.position);
    });
  }

  update() {
    // Rotación suave del cubo
    this.group.rotation.y += 0.005;
    this.group.rotation.x += 0.002;
  }
}
