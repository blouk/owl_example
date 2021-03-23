odoo.define("website_owl.owl_example_widget", async function(require) {
	"use strict";

	const OwlClick = require("website_owl.owl_widget_click");
	const OwlThreeJs = require("website_owl.owl_widget_threejs");
	const publicWidget = require("web.public.widget");
	const {mount} = owl;

	let templates = await owl.utils.loadFile(
		"/website_owl/static/src/xml/templates.xml"
	);
	const env = {qweb: new owl.QWeb({templates})};
	owl.Component.env = env;
	await owl.utils.whenReady();

	const OwlWidgetClick = publicWidget.Widget.extend({
		selector: ".owl-click",

		start: async function() {
			const $target = this.$target;
			const owlclick = new OwlClick();
			owlclick.mount($target[0]);
		}
	});

	const OwlWidgetThreeJS = publicWidget.Widget.extend({
		selector: ".owl-threejs",

		start: async function() {
			const $target = this.$target;
			const owlthreejs = new OwlThreeJs();
			owlthreejs.mount($target[0]);
		}
	});

	publicWidget.registry.owlWidgetClick = OwlWidgetClick;
	publicWidget.registry.owlWidgetThreeJS = OwlWidgetThreeJS;
	return OwlWidgetClick, OwlWidgetThreeJS;
});
