odoo.define('website_owl.owl_example_widget', async function(require) {
  "use strict";

  const core = require('web.core');
  const qweb = core.qweb;
  const ajax = require('web.ajax');
  const publicWidget = require('web.public.widget');
  const {
    Component,
    mount
  } = owl;

  const {
    useState
  } = owl.hooks;

  const templates = await owl.utils.loadFile('/website_owl/static/src/xml/template.xml');
  const env = {
    qweb: new owl.QWeb({
      templates
    })
  };
  owl.Component.env = env;


  class OwlClick extends Component {
    static template = 'OwlExample';
    constructor(...args) {
      super(...arguments);
      this.state = useState({
        value: 0
      });
    }

  };


  //
  // Object.assign(OwlClick, {
  //   template: new owl.QWeb({
  //     templates
  //   })
  // });



  const OwlWidget = publicWidget.Widget.extend({

    selector: '.owl-example',

    start: async function() {
      console.log(this)
      const $target = this.$target;
      const owlclick = new OwlClick();
      await owlclick.mount($target[0]);

    },
  });

  publicWidget.registry.owlex = OwlWidget;

  return OwlWidget;


});
