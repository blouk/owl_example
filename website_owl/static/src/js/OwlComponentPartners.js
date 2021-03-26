odoo.define("website_owl.owl_component_partner", function (require) {
  "use strict";
  const { Component, tags } = owl;
  const { xml } = tags;
  const ajax = require("web.ajax");

  class OwlPartner extends Component {
    static template = "OwlPartnersCard";

    async willStart() {
      await ajax.jsonRpc("/get/partners", "call").then((e) => {
        this.partners = JSON.parse(e);
      });
    }
  }

  return OwlPartner;
});
