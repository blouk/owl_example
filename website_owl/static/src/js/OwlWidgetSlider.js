odoo.define("website_owl.owl_widget_slider", async function (require) {
  "use strict";

  const { Component, tags, useState } = owl;
  const { xml, css } = tags;

  await owl.utils.loadJS("/website_owl/static/lib/bootstrap-slider.js");
  //MISSING ==> loadCSS;
  await owl.utils.whenReady();

  class OwlSlider extends Component {
    static template = xml`
    <div class="owl-slider">
    <label><t t-esc="props.title"/></label>
      <input class="owl-slider-component"/>
    </div>
    `;
    static style = css`
      /*! =======================================================
                          VERSION  11.0.2
    ========================================================= */
      /*! =========================================================
     * bootstrap-slider.js
     *
     * Maintainers:
     *		Kyle Kemp
     *			- Twitter: @seiyria
     *			- Github:  seiyria
     *		Rohit Kalkur
     *			- Twitter: @Rovolutionary
     *			- Github:  rovolution
     *
     * =========================================================
     *
     * bootstrap-slider is released under the MIT License
     * Copyright (c) 2019 Kyle Kemp, Rohit Kalkur, and contributors
     *
     * Permission is hereby granted, free of charge, to any person
     * obtaining a copy of this software and associated documentation
     * files (the "Software"), to deal in the Software without
     * restriction, including without limitation the rights to use,
     * copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following
     * conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     *
     * ========================================================= */
      .slider {
        display: inline-block;
        vertical-align: middle;
        position: relative;
      }

      .slider.slider-horizontal {
        width: 210px;
        height: 20px;
      }

      .slider.slider-horizontal .slider-track {
        height: 10px;
        width: 100%;
        margin-top: -5px;
        top: 50%;
        left: 0;
      }

      .slider.slider-horizontal .slider-selection,
      .slider.slider-horizontal .slider-track-low,
      .slider.slider-horizontal .slider-track-high {
        height: 100%;
        top: 0;
        bottom: 0;
      }

      .slider.slider-horizontal .slider-tick,
      .slider.slider-horizontal .slider-handle {
        margin-left: -10px;
      }

      .slider.slider-horizontal .slider-tick.triangle,
      .slider.slider-horizontal .slider-handle.triangle {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border-width: 0 10px 10px 10px;
        width: 0;
        height: 0;
        border-bottom-color: #036fa5;
        margin-top: 0;
      }

      .slider.slider-horizontal .slider-tick-container {
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }

      .slider.slider-horizontal .slider-tick-label-container {
        white-space: nowrap;
        margin-top: 20px;
      }

      .slider.slider-horizontal
        .slider-tick-label-container
        .slider-tick-label {
        display: inline-block;
        text-align: center;
      }

      .slider.slider-horizontal.slider-rtl .slider-track {
        left: initial;
        right: 0;
      }

      .slider.slider-horizontal.slider-rtl .slider-tick,
      .slider.slider-horizontal.slider-rtl .slider-handle {
        margin-left: initial;
        margin-right: -10px;
      }

      .slider.slider-horizontal.slider-rtl .slider-tick-container {
        left: initial;
        right: 0;
      }

      .slider.slider-vertical {
        height: 210px;
        width: 20px;
      }

      .slider.slider-vertical .slider-track {
        width: 10px;
        height: 100%;
        left: 25%;
        top: 0;
      }

      .slider.slider-vertical .slider-selection {
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
      }

      .slider.slider-vertical .slider-track-low,
      .slider.slider-vertical .slider-track-high {
        width: 100%;
        left: 0;
        right: 0;
      }

      .slider.slider-vertical .slider-tick,
      .slider.slider-vertical .slider-handle {
        margin-top: -10px;
      }

      .slider.slider-vertical .slider-tick.triangle,
      .slider.slider-vertical .slider-handle.triangle {
        border-width: 10px 0 10px 10px;
        width: 1px;
        height: 1px;
        border-left-color: #036fa5;
        margin-left: 0;
      }

      .slider.slider-vertical .slider-tick-label-container {
        white-space: nowrap;
      }

      .slider.slider-vertical .slider-tick-label-container .slider-tick-label {
        padding-left: 4px;
      }

      .slider.slider-vertical.slider-rtl .slider-track {
        left: initial;
        right: 25%;
      }

      .slider.slider-vertical.slider-rtl .slider-selection {
        left: initial;
        right: 0;
      }

      .slider.slider-vertical.slider-rtl .slider-tick.triangle,
      .slider.slider-vertical.slider-rtl .slider-handle.triangle {
        border-width: 10px 10px 10px 0;
      }

      .slider.slider-vertical.slider-rtl
        .slider-tick-label-container
        .slider-tick-label {
        padding-left: initial;
        padding-right: 4px;
      }

      .slider.slider-disabled .slider-handle {
        background-color: #cfcfcf;
        background-image: -moz-linear-gradient(top, #dfdfdf, #bebebe);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#dfdfdf),
          to(#bebebe)
        );
        background-image: -webkit-linear-gradient(top, #dfdfdf, #bebebe);
        background-image: -o-linear-gradient(top, #dfdfdf, #bebebe);
        background-image: linear-gradient(to bottom, #dfdfdf, #bebebe);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#DFDFDF', endColorstr='#BEBEBE',GradientType=0);
      }

      .slider.slider-disabled .slider-track {
        background-color: #e7e7e7;
        background-image: -moz-linear-gradient(top, #e5e5e5, #e9e9e9);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#e5e5e5),
          to(#e9e9e9)
        );
        background-image: -webkit-linear-gradient(top, #e5e5e5, #e9e9e9);
        background-image: -o-linear-gradient(top, #e5e5e5, #e9e9e9);
        background-image: linear-gradient(to bottom, #e5e5e5, #e9e9e9);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#E5E5E5', endColorstr='#E9E9E9',GradientType=0);
        cursor: not-allowed;
      }

      .slider input {
        display: none;
      }

      .slider .tooltip-inner {
        white-space: nowrap;
        max-width: none;
      }

      .slider .bs-tooltip-top .tooltip-inner,
      .slider .bs-tooltip-bottom .tooltip-inner {
        position: relative;
        left: -50%;
      }

      .slider.bs-tooltip-left .tooltip-inner,
      .slider.bs-tooltip-right .tooltip-inner {
        position: relative;
        top: -100%;
      }

      .slider .tooltip {
        pointer-events: none;
      }

      .slider .tooltip.bs-tooltip-top .arrow,
      .slider .tooltip.bs-tooltip-bottom .arrow {
        left: -0.4rem;
      }

      .slider .tooltip.bs-tooltip-top {
        margin-top: -44px;
      }

      .slider .tooltip.bs-tooltip-bottom {
        margin-top: 2px;
      }

      .slider .tooltip.bs-tooltip-left,
      .slider .tooltip.bs-tooltip-right {
        margin-top: -14px;
      }

      .slider .tooltip.bs-tooltip-left .arrow,
      .slider .tooltip.bs-tooltip-right .arrow {
        top: 8px;
      }

      .slider .hide {
        display: none;
      }

      .slider-track {
        background-color: #f7f7f7;
        background-image: -moz-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#f5f5f5),
          to(#f9f9f9)
        );
        background-image: -webkit-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: -o-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: linear-gradient(to bottom, #f5f5f5, #f9f9f9);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#F5F5F5', endColorstr='#F9F9F9',GradientType=0);
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        position: absolute;
        cursor: pointer;
      }

      .slider-selection {
        background-color: #f7f7f7;
        background-image: -moz-linear-gradient(top, #f9f9f9, #f5f5f5);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#f9f9f9),
          to(#f5f5f5)
        );
        background-image: -webkit-linear-gradient(top, #f9f9f9, #f5f5f5);
        background-image: -o-linear-gradient(top, #f9f9f9, #f5f5f5);
        background-image: linear-gradient(to bottom, #f9f9f9, #f5f5f5);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#F9F9F9', endColorstr='#F5F5F5',GradientType=0);
        -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        position: absolute;
      }

      .slider-selection.tick-slider-selection {
        background-color: #46c1fe;
        background-image: -moz-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#52c5ff),
          to(#3abcfd)
        );
        background-image: -webkit-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: -o-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: linear-gradient(to bottom, #52c5ff, #3abcfd);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#52c5ff', endColorstr='#3abcfd',GradientType=0);
      }

      .slider-track-low,
      .slider-track-high {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        position: absolute;
        background: transparent;
      }

      .slider-handle {
        background-color: #0478b2;
        background-image: -moz-linear-gradient(top, #0480be, #036fa5);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#0480be),
          to(#036fa5)
        );
        background-image: -webkit-linear-gradient(top, #0480be, #036fa5);
        background-image: -o-linear-gradient(top, #0480be, #036fa5);
        background-image: linear-gradient(to bottom, #0480be, #036fa5);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0480BE', endColorstr='#036fa5',GradientType=0);
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: #0480be;
        border: 0px solid transparent;
      }

      .slider-handle:hover {
        cursor: pointer;
      }

      .slider-handle.round {
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
      }

      .slider-handle.triangle {
        background: transparent none;
      }

      .slider-handle.custom {
        background: transparent none;
      }

      .slider-handle.custom::before {
        line-height: 20px;
        font-size: 20px;
        content: "\2605";
        color: #726204;
      }

      .slider-tick {
        background-color: #f7f7f7;
        background-image: -moz-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#f5f5f5),
          to(#f9f9f9)
        );
        background-image: -webkit-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: -o-linear-gradient(top, #f5f5f5, #f9f9f9);
        background-image: linear-gradient(to bottom, #f5f5f5, #f9f9f9);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#F5F5F5', endColorstr='#F9F9F9',GradientType=0);
        -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        cursor: pointer;
        width: 20px;
        height: 20px;
        filter: none;
        opacity: 0.8;
        border: 0px solid transparent;
      }

      .slider-tick.round {
        border-radius: 50%;
      }

      .slider-tick.triangle {
        background: transparent none;
      }

      .slider-tick.custom {
        background: transparent none;
      }

      .slider-tick.custom::before {
        line-height: 20px;
        font-size: 20px;
        content: "\2605";
        color: #726204;
      }

      .slider-tick.in-selection {
        background-color: #46c1fe;
        background-image: -moz-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#52c5ff),
          to(#3abcfd)
        );
        background-image: -webkit-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: -o-linear-gradient(top, #52c5ff, #3abcfd);
        background-image: linear-gradient(to bottom, #52c5ff, #3abcfd);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#52c5ff', endColorstr='#3abcfd',GradientType=0);
        opacity: 1;
      }
    `;
    constructor() {
      super(...arguments);
      this.state = useState({
        slider_value: this.props.slider_value,
      });

      this.bus = this.env.bus;
    }

    mounted = () => {
      const slider_component = new Slider(
        $(this.el).find(".owl-slider-component")[0]
      );
      slider_component.setValue(parseInt(this.state.slider_value));
      slider_component.on("slide", this._on_slide_change.bind(self));
    };

    _on_slide_change = (e) => {
      this.state.slider_value = parseInt(e);
      this.bus.trigger("changeRotSpeed", {
        rotSpeed: e,
        type: this.props.type,
      });
    };
  }

  return OwlSlider;
});