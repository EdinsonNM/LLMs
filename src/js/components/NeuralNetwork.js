import * as THREE from "three";

export class NeuralNetwork {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(5, 0, 0);
    this.scene.add(this.group);

    this.createNeuralNetwork();
  }

  createNeuralNetwork() {
    // Crear capas de la red neuronal
    const numLayers = 5;
    const neuronsPerLayer = [8, 12, 16, 12, 8];
    const layerSpacing = 4;

    this.layers = [];
    this.connections = [];

    for (let layer = 0; layer < numLayers; layer++) {
      const layerGroup = new THREE.Group();
      layerGroup.position.x = layer * layerSpacing;
      this.group.add(layerGroup);
      this.layers.push(layerGroup);

      const numNeurons = neuronsPerLayer[layer];
      const radius = 2;
      const neurons = [];

      // Crear neuronas para esta capa
      for (let i = 0; i < numNeurons; i++) {
        const angle = (i / numNeurons) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const neuronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const neuronMaterial = new THREE.MeshPhongMaterial({
          color: 0x4a9eff,
          emissive: 0x4a9eff,
          emissiveIntensity: 0.2,
        });
        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
        neuron.position.set(x, y, 0);
        neurons.push(neuron);
        layerGroup.add(neuron);
      }

      // Crear conexiones con la capa anterior
      if (layer > 0) {
        const prevLayer = this.layers[layer - 1];
        const prevNeurons = prevLayer.children;

        for (let i = 0; i < neurons.length; i++) {
          for (let j = 0; j < prevNeurons.length; j++) {
            const start = prevNeurons[j].position.clone();
            const end = neurons[i].position.clone();

            // Ajustar posiciones para tener en cuenta la posición de la capa
            start.x += prevLayer.position.x;
            end.x += layerGroup.position.x;

            const curve = new THREE.CubicBezierCurve3(
              start,
              new THREE.Vector3(start.x + layerSpacing / 3, start.y, start.z),
              new THREE.Vector3(end.x - layerSpacing / 3, end.y, end.z),
              end
            );

            const points = curve.getPoints(20);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: 0x4a9eff,
              transparent: true,
              opacity: 0.1,
            });
            const line = new THREE.Line(geometry, material);
            this.connections.push({
              line,
              start: prevNeurons[j],
              end: neurons[i],
            });
            this.group.add(line);
          }
        }
      }
    }
  }

  animate(text) {
    const tokens = text.split("");
    const time = Date.now() * 0.001;

    // Animar neuronas
    this.layers.forEach((layer, layerIndex) => {
      layer.children.forEach((neuron, neuronIndex) => {
        if (layerIndex < tokens.length) {
          neuron.material.emissiveIntensity = 0.5;
          neuron.scale.set(1.2, 1.2, 1.2);

          // Movimiento orgánico
          const angle = (neuronIndex / layer.children.length) * Math.PI * 2;
          const radius = 2 + Math.sin(time + neuronIndex) * 0.1;
          neuron.position.x = Math.cos(angle) * radius;
          neuron.position.y = Math.sin(angle) * radius;
        } else {
          neuron.material.emissiveIntensity = 0.2;
          neuron.scale.set(1, 1, 1);
        }
      });
    });

    // Animar conexiones
    this.connections.forEach((connection) => {
      const start = connection.start.position.clone();
      const end = connection.end.position.clone();

      // Ajustar posiciones para tener en cuenta la posición de la capa
      start.x += connection.start.parent.position.x;
      end.x += connection.end.parent.position.x;

      const curve = new THREE.CubicBezierCurve3(
        start,
        new THREE.Vector3(start.x + 1.33, start.y, start.z),
        new THREE.Vector3(end.x - 1.33, end.y, end.z),
        end
      );

      const points = curve.getPoints(20);
      connection.line.geometry.setFromPoints(points);
      connection.line.geometry.attributes.position.needsUpdate = true;

      // Actualizar opacidad basada en la activación
      if (
        connection.start.material.emissiveIntensity > 0.3 &&
        connection.end.material.emissiveIntensity > 0.3
      ) {
        connection.line.material.opacity = 0.3;
      } else {
        connection.line.material.opacity = 0.1;
      }
    });
  }

  reset() {
    this.layers.forEach((layer) => {
      layer.children.forEach((neuron) => {
        neuron.material.emissiveIntensity = 0.2;
        neuron.scale.set(1, 1, 1);
      });
    });

    this.connections.forEach((connection) => {
      connection.line.material.opacity = 0.1;
    });
  }

  update() {
    // Rotación suave de la red neuronal
    this.group.rotation.y += 0.002;
  }
}
