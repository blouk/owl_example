odoo.define("website_owl.owl_widget_click", function(require) {
	"use strict";

	const {Component, useState} = owl;

	class OwlClick extends Component {
		static template = "OwlClickAlert";

		constructor(...args) {
			super(...arguments);
			this.state = useState({value: 0});
		}
	}

	return OwlClick;
});
