odoo.define("website_owl.owl_example_widget", async function (require) {
  "use strict";
  const publicWidget = require("web.public.widget");
  const OwlClick = require("website_owl.owl_widget_click");
  const OwlThreeJs = require("website_owl.owl_widget_threejs");

  const { mount } = owl;

  async function prepare() {
    let templates = await owl.utils.loadFile(
      "/website_owl/static/src/xml/templates.xml"
    );
    const bus = new owl.core.EventBus();
    const env = {
      qweb: new owl.QWeb({ templates }),
      bus: bus,
    };
    await owl.utils.whenReady();
    return env;
  }

  let envpromise = prepare();

  const OwlWidgetClick = publicWidget.Widget.extend({
    selector: ".owl-click",
    start: async function () {
      const env = await envpromise;
      const $target = this.$target;
      return owl.mount(OwlClick, { env, target: $target[0] });
    },
  });

  const OwlWidgetThreeJS = publicWidget.Widget.extend({
    selector: ".owl-threejs",
    start: async function () {
      const env = await envpromise;
      const $target = this.$target;
      return owl.mount(OwlThreeJs, { env, target: $target[0] });
    },
  });

  publicWidget.registry.owlWidgetClick = OwlWidgetClick;
  publicWidget.registry.owlWidgetThreeJS = OwlWidgetThreeJS;
  return OwlWidgetClick, OwlWidgetThreeJS;
});
