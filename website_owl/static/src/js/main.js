odoo.define("website_owl.owl_example_widget", async function (require) {
  "use strict";
  const publicWidget = require("web.public.widget");
  const OwlClick = require("website_owl.owl_component_click");
  const OwlThreeJs = require("website_owl.owl_component_threejs");
  const OwlPartners = require("website_owl.owl_component_partner");
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

  const OwlComponentClick = publicWidget.Widget.extend({
    selector: ".owl-click",
    start: async function () {
      const env = await envpromise;
      const $target = this.$target;
      return owl.mount(OwlClick, { env, target: $target[0] });
    },
  });

  const OwlComponentThreeJS = publicWidget.Widget.extend({
    selector: ".owl-threejs",
    start: async function () {
      const env = await envpromise;
      const $target = this.$target;
      return owl.mount(OwlThreeJs, { env, target: $target[0] });
    },
  });

  const OwlComponentPartners = publicWidget.Widget.extend({
    selector: ".owl-partners",
    start: async function () {
      const env = await envpromise;
      const $target = this.$target;
      return owl.mount(OwlPartners, { env, target: $target[0] });
    },
  });

  publicWidget.registry.OwlComponentClick = OwlComponentClick;
  publicWidget.registry.OwlComponentThreeJS = OwlComponentThreeJS;
  publicWidget.registry.OwlComponentPartners = OwlComponentPartners;
  return OwlComponentClick, OwlComponentThreeJS, OwlComponentPartners;
});
