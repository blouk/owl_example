odoo.define("website_owl.owl_widget_threejs", async function (require) {
  "use strict";
  const Slider = require("website_owl.owl_widget_slider");
  const { Component } = owl;

  class OwlThreeJS extends Component {
    static template = "OwlThreeJs";
    static components = { Slider: Slider };

    setup() {
      this.bus = this.env.bus;
      this.y = 0.01;
      this.z = 0.01;
      this.x = 0.01;
      this.bus.on("add_mesh", null, this._add_mesh.bind(this));
    }
    async willStart() {
      await owl.utils.loadJS("/website_owl/static/lib/three.js");
    }

    mounted() {
      this._createScene();
    }

    updateRotationSpeed(type, el) {
      switch (type) {
        case "x":
          this.x = el.detail.rotSpeed / 100;
          break;

        case "y":
          this.y = el.detail.rotSpeed / 100;
          break;

        case "z":
          this.y = el.detail.rotSpeed / 100;
          break;
        default:
          console.log("None");
      }
    }

    _createScene() {
      this.$target = $(this.el).find(".threejs-canvas");
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.$target.width(), this.$target.height());
      this.$target[0].appendChild(this.renderer.domElement);
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);
      this.camera.position.z = 15;
      this._render();
    }

    _render() {
      requestAnimationFrame(() => this._render());
      this.renderer.render(this.scene, this.camera);
      this.scene.rotation.z += this.z;
      this.scene.rotation.y += this.y;
      this.scene.rotation.x += this.x;
    }

    _add_mesh(num) {
      var geo_added = new THREE.BoxGeometry(
        this._random(),
        this._random(),
        this._random()
      );
      var mat_added = new THREE.MeshBasicMaterial({
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      });
      var added_cube = new THREE.Mesh(geo_added, mat_added);
      added_cube.position.set(this._random(), this._random(), this._random());
      this.scene.add(added_cube);
    }

    _random() {
      return (-3 << 3) * Math.random();
    }
  }
  return OwlThreeJS;
});
