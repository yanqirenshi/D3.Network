"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Simulation = /*#__PURE__*/function () {
  function Simulation(tick) {
    _classCallCheck(this, Simulation);

    this.makeSimuration(tick);
  }

  _createClass(Simulation, [{
    key: "makeSimuration",
    value: function makeSimuration(tick) {
      var collide = d3.forceCollide(88).radius(function (d) {
        return 111;
      });
      var link = d3.forceLink().id(function (d) {
        return d.id;
      });
      this.simulation = d3.forceSimulation().alphaMin(0.001).alphaTarget(0.002).force('collide', collide).force("link", link).force("charge", d3.forceManyBody()).on("tick", tick);
    }
  }, {
    key: "makeDragAndDropCallbacks",
    value: function makeDragAndDropCallbacks(callback) {
      var simulation = this.simulation;

      var dragStarted = function dragStarted(event, d) {
        if (d.move === 'freeze') return;

        if (d.move === 'support') {
          d.fx_keep = d.fx;
          d.fy_keep = d.fy;
        }

        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      var dragged = function dragged(event, d) {
        if (d.move === 'freeze') return;
        d.fx = event.x;
        d.fy = event.y;
      };

      var dragEnded = function dragEnded(event, d) {
        if (d.move === 'freeze') return;
        if (!event.active) simulation.alphaTarget(0);

        if (d.move !== 'support') {
          d.fx = null;
          d.fy = null;
        }
      };

      var out = {
        dragStarted: dragStarted,
        dragged: dragged,
        dragEnded: dragEnded,
        node: {
          click: null
        }
      };
      if (callback && callback.node && callback.node.click) out.node.click = callback.node.click;
      return out;
    }
  }, {
    key: "nodes",
    value: function nodes(nodes_data) {
      this.simulation.nodes(nodes_data);
    }
  }, {
    key: "edges",
    value: function edges(edge_data) {
      this.simulation.force('link').links(edge_data);
    }
  }]);

  return Simulation;
}();

exports["default"] = Simulation;