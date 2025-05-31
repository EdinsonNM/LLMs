export class Animation {
  constructor(components) {
    this.components = components;
    this.isAnimating = false;
    this.currentText = "";
    this.animationSpeed = 1;
  }

  startAnimation(text) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentText = text;

    // Animar cada componente en secuencia
    this.animateComponent("tokenizer", 0)
      .then(() => this.animateComponent("embedding", 500))
      .then(() => this.animateComponent("attention", 500))
      .then(() => this.animateComponent("neural", 500))
      .then(() => this.animateComponent("output", 500))
      .then(() => {
        this.isAnimating = false;
        this.resetAll();
      });
  }

  animateComponent(componentId, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.components[componentId]) {
          this.components[componentId].animate(this.currentText);
        }
        resolve();
      }, delay * this.animationSpeed);
    });
  }

  resetAll() {
    Object.values(this.components).forEach((component) => {
      if (component.reset) {
        component.reset();
      }
    });
  }

  update() {
    if (!this.isAnimating) {
      Object.values(this.components).forEach((component) => {
        if (component.update) {
          component.update();
        }
      });
    }
  }

  setAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }
}
