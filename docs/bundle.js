(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/marquee3000/marquee3k.js
  var require_marquee3k = __commonJS({
    "node_modules/marquee3000/marquee3k.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.Marquee3k = factory();
        }
      })(exports, function() {
        "use strict";
        let animationId = 0;
        class Marquee3k2 {
          constructor(element, options) {
            this.element = element;
            this.selector = options.selector;
            this.speed = element.dataset.speed || 0.25;
            this.pausable = element.dataset.pausable;
            this.reverse = element.dataset.reverse;
            this.paused = false;
            this.parent = element.parentElement;
            this.parentProps = this.parent.getBoundingClientRect();
            this.content = element.children[0];
            this.innerContent = this.content.innerHTML;
            this.wrapStyles = "";
            this.offset = 0;
            this._setupWrapper();
            this._setupContent();
            this._setupEvents();
            this.wrapper.appendChild(this.content);
            this.element.appendChild(this.wrapper);
          }
          _setupWrapper() {
            this.wrapper = document.createElement("div");
            this.wrapper.classList.add("marquee3k__wrapper");
            this.wrapper.style.whiteSpace = "nowrap";
          }
          _setupContent() {
            this.content.classList.add(`${this.selector}__copy`);
            this.content.style.display = "inline-block";
            this.contentWidth = this.content.offsetWidth;
            this.requiredReps = this.contentWidth > this.parentProps.width ? 2 : Math.ceil((this.parentProps.width - this.contentWidth) / this.contentWidth) + 1;
            for (let i = 0; i < this.requiredReps; i++) {
              this._createClone();
            }
            if (this.reverse) {
              this.offset = this.contentWidth * -1;
            }
            this.element.classList.add("is-init");
          }
          _setupEvents() {
            this.element.addEventListener("mouseenter", () => {
              if (this.pausable)
                this.paused = true;
            });
            this.element.addEventListener("mouseleave", () => {
              if (this.pausable)
                this.paused = false;
            });
          }
          _createClone() {
            const clone = this.content.cloneNode(true);
            clone.style.display = "inline-block";
            clone.classList.add(`${this.selector}__copy`);
            this.wrapper.appendChild(clone);
          }
          animate() {
            if (!this.paused) {
              const isScrolled = this.reverse ? this.offset < 0 : this.offset > this.contentWidth * -1;
              const direction = this.reverse ? -1 : 1;
              const reset = this.reverse ? this.contentWidth * -1 : 0;
              if (isScrolled)
                this.offset -= this.speed * direction;
              else
                this.offset = reset;
              this.wrapper.style.whiteSpace = "nowrap";
              this.wrapper.style.transform = `translate(${this.offset}px, 0) translateZ(0)`;
            }
          }
          _refresh() {
            this.contentWidth = this.content.offsetWidth;
          }
          repopulate(difference, isLarger) {
            this.contentWidth = this.content.offsetWidth;
            if (isLarger) {
              const amount = Math.ceil(difference / this.contentWidth) + 1;
              for (let i = 0; i < amount; i++) {
                this._createClone();
              }
            }
          }
          static refresh(index) {
            MARQUEES[index]._refresh();
          }
          static pause(index) {
            MARQUEES[index].paused = true;
          }
          static play(index) {
            MARQUEES[index].paused = false;
          }
          static toggle(index) {
            MARQUEES[index].paused = !MARQUEES[index].paused;
          }
          static refreshAll() {
            for (let i = 0; i < MARQUEES.length; i++) {
              MARQUEES[i]._refresh();
            }
          }
          static pauseAll() {
            for (let i = 0; i < MARQUEES.length; i++) {
              MARQUEES[i].paused = true;
            }
          }
          static playAll() {
            for (let i = 0; i < MARQUEES.length; i++) {
              MARQUEES[i].paused = false;
            }
          }
          static toggleAll() {
            for (let i = 0; i < MARQUEES.length; i++) {
              MARQUEES[i].paused = !MARQUEES[i].paused;
            }
          }
          static init(options = { selector: "marquee3k" }) {
            if (animationId)
              window.cancelAnimationFrame(animationId);
            window.MARQUEES = [];
            const marquees = Array.from(document.querySelectorAll(`.${options.selector}`));
            let previousWidth = window.innerWidth;
            let timer;
            for (let i = 0; i < marquees.length; i++) {
              const marquee = marquees[i];
              const instance = new Marquee3k2(marquee, options);
              MARQUEES.push(instance);
            }
            animate();
            function animate() {
              for (let i = 0; i < MARQUEES.length; i++) {
                MARQUEES[i].animate();
              }
              animationId = window.requestAnimationFrame(animate);
            }
            window.addEventListener("resize", () => {
              clearTimeout(timer);
              timer = setTimeout(() => {
                const isLarger = previousWidth < window.innerWidth;
                const difference = window.innerWidth - previousWidth;
                for (let i = 0; i < MARQUEES.length; i++) {
                  MARQUEES[i].repopulate(difference, isLarger);
                }
                previousWidth = this.innerWidth;
              }, 250);
            });
          }
        }
        return Marquee3k2;
      });
    }
  });

  // source/index.js
  var Marquee3k = require_marquee3k();
  var fonts = [
    "'Impact', sans-serif",
    "'Lucida Console', monospace",
    "'Comic Sans MS', cursive",
    "'Courier New', monospace",
    "'Alfa Slab One', cursive",
    "'Bebas Neue', cursive",
    "'Monoton', cursive",
    "'Press Start 2P', cursive"
  ];
  var colours = [
    "f00",
    "0f0",
    "ff0",
    "0ff",
    "f0f"
  ];
  var randomElement = (array) => array[Math.floor(Math.random() * array.length)];
  var backgrounds = [
    "url('/ocean.jpg')",
    "url('/abstract.jpg')",
    "url('/stars.gif')",
    "#88D2FB url('/flower.gif')",
    `linear-gradient(45deg, #${randomElement(colours)} 0%, #${randomElement(colours)} 100%)`
  ];
  var randomNumber = (min, max) => Math.random() * (max - min) + min;
  window.onload = () => {
    document.body.style.background = randomElement(backgrounds);
    document.getElementById("topper").style.backgroundColor = "#" + randomElement(colours);
    document.getElementById("topper").style.fontFamily = randomElement(fonts);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let toRandomise = document.getElementsByClassName("gross-box");
    for (let i = 0; i < toRandomise.length; i++) {
      let element = toRandomise[i];
      element.style.left = randomNumber(15, 85) + "%";
      element.style.top = randomNumber(15, 85) + "%";
      element.style.fontSize = randomNumber(2, 8) + "em";
      element.style.fontFamily = randomElement(fonts);
      element.style.backgroundColor = "#" + randomElement(colours);
      let viewportOffset = element.getBoundingClientRect();
      if (viewportOffset.bottom > screenHeight) {
        element.style.top = "unset";
        element.style.bottom = randomNumber(1, 15) + "px";
      }
      if (viewportOffset.right > screenWidth) {
        element.style.left = "unset";
        element.style.right = randomNumber(1, 15) + "px";
      }
    }
    Marquee3k.init();
  };
})();
//# sourceMappingURL=bundle.js.map
