odoo.define("website_owl.owl_example_widget", async function (require) {
  "use strict";
  const publicWidget = require("web.public.widget");
  const OwlClick = require("website_owl.owl_widget_click");
  const OwlThreeJs = require("website_owl.owl_widget_threejs");

  const { mount } = owl;
  let templates = await owl.utils.loadFile(
    "/website_owl/static/src/xml/templates.xml"
  );

  const bus = new owl.core.EventBus();
  const env = {
    qweb: new owl.QWeb({ templates }),
    bus: bus,
  };

  owl.Component.env = env;
  await owl.utils.whenReady();

  const OwlWidgetClick = publicWidget.Widget.extend({
    selector: ".owl-click",
    start: function () {
      const $target = this.$target;
      const owlclick = new OwlClick();
      owlclick.mount($target[0], env);
    },
  });

  const OwlWidgetThreeJS = publicWidget.Widget.extend({
    selector: ".owl-threejs",
    start: function () {
      const $target = this.$target;

      const owlthreejs = new OwlThreeJs();
      owlthreejs.mount($target[0], env);
    },
  });

  publicWidget.registry.owlWidgetClick = OwlWidgetClick;
  publicWidget.registry.owlWidgetThreeJS = OwlWidgetThreeJS;

  return OwlWidgetClick, OwlWidgetThreeJS;
});
