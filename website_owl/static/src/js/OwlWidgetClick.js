odoo.define("website_owl.owl_widget_click", function (require) {
  "use strict";
  const { Component, useState } = owl;

  class OwlClick extends Component {
    static template = "OwlClickAlert";

    constructor() {
      super(...arguments);
      this.state = useState({ value: 0 });
      this.bus = this.env.bus;
    }

    _on_click = () => {
      this.state.value++;
      this.bus.trigger("add_mesh", this.state.value);
    };
  }

  return OwlClick;
});
