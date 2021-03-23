odoo.define("website_owl.owl_widget_threejs", function(require) {
	"use strict";

	const {Component} = owl;

	class OwlThreeJS extends Component {
		static template = "OwlThreeJs";

		constructor(...args) {
			super(...arguments);
		}
	}

	return OwlThreeJS;
});
