odoo.define("website_owl.owl_widget_slider", async function (require) {
  "use strict";
  var ajax = require("web.ajax");
  const { Component, tags, useState } = owl;
  const { xml, css } = tags;

  class OwlSlider extends Component {
    static template = xml`
    <div class="owl-slider">
    <label><t t-esc="props.title"/> : <t t-esc="state.slider_value"/></label><br/>
      <input class="owl-slider-component"/>
    </div>
    `;

    setup() {
      this.state = useState({
        slider_value: this.props.slider_value,
      });
    }

    async willStart() {
      await ajax.loadCSS("/website_owl/static/lib/css/bootstrap-slider.css");
      await owl.utils.loadJS("/website_owl/static/lib/bootstrap-slider.js");
    }

    mounted() {
      const slider_component = new Slider(
        $(this.el).find(".owl-slider-component")[0]
      );
      slider_component.setValue(parseInt(this.state.slider_value));
      slider_component.on("slide", this._on_slide_change.bind(this));
    }

    _on_slide_change(e) {
      this.state.slider_value = parseInt(e);
      this.trigger("slide", {
        rotSpeed: e,
      });
    }
  }

  return OwlSlider;
});
