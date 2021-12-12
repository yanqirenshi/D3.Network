"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NodeCore = /*#__PURE__*/function () {
  function NodeCore() {
    _classCallCheck(this, NodeCore);
  }

  _createClass(NodeCore, [{
    key: "makeDataCircle",
    value: function makeDataCircle(option) {
      var circle = {
        r: 55,
        fill: '#ffffff',
        stroke: {
          color: '#eeeeee',
          width: 8
        }
      };

      if (option.circle) {
        if (circle.r || circle.r === 0) circle.r = option.circle.r;
        var stroke = option.circle.stroke;

        if (stroke) {
          if (stroke.color) circle.stroke.color = stroke.color;
          if (stroke.width || stroke.width === 0) circle.stroke.width = stroke.width;
        }
      }

      return circle;
    } // TODO: はいきよてい

  }, {
    key: "makeDataLink",
    value: function makeDataLink(data) {
      if (!data) return null;
      return data;
    }
  }, {
    key: "makeDataImage",
    value: function makeDataImage(option) {
      if (!option.image) return null;
      return {
        url: option.image.url,
        x: option.image.x || 0,
        y: option.image.y || 0,
        w: option.image.w || 0,
        h: option.image.h || 0
      };
    }
  }, {
    key: "makeDataLabel",
    value: function makeDataLabel(option) {
      var label = {
        text: '',
        font: {
          size: 44
        },
        x: 0,
        y: 0
      };
      if (!option || !option.label) return label;
      if (option.label.text) label.text = option.label.text;
      if (option.label.x) label.x = option.label.x;
      if (option.label.y) label.y = option.label.y;
      if (option.label.font) label.font = option.label.font;
      return label;
    }
  }, {
    key: "makeDataMove",
    value: function makeDataMove(option) {
      // free:    自動移動(free will)
      // support: 移動
      // freeze:  移動もしない
      var default_val = 'will';
      if (!option || !option.move) return default_val;
      var move = option.move;
      var master = [default_val, 'support', 'freeze'];
      if (!master.find(function (d) {
        return d === move;
      })) return default_val;
      return move;
    }
  }, {
    key: "makeDataFreeze",
    value: function makeDataFreeze(data) {
      if (!data) return false;
      if (data === true) return true;
      if (data === false) return false;
      return false;
    }
  }, {
    key: "makeDataSelect",
    value: function makeDataSelect(data) {
      var select = data.select;
      if (!select) return false;
      if (select === true) return true;
      if (select === false) return false;
      return false;
    }
  }, {
    key: "makeData",
    value: function makeData() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (option._node) return option._node;
      var data = {
        x: option.x || 0,
        y: option.y || 0,
        freeze: this.makeDataFreeze(option.freeze),
        move: this.makeDataMove(option),
        select: this.makeDataSelect(option),
        label: this.makeDataLabel(option),
        circle: this.makeDataCircle(option),
        image: this.makeDataImage(option),
        link: this.makeDataLink(option.link),
        action: option.action || null,
        //
        id: option.id,
        _class: 'NODE'
      };

      if (data.move === 'freeze' || data.move === 'support') {
        data.fx = data.x;
        data.fy = data.y;
      }

      if (option._class) data._class = option._class;
      data._core = _objectSpread({}, option);
      option._node = data;
      return data;
    }
  }]);

  return NodeCore;
}();

var Node = /*#__PURE__*/function (_NodeCore) {
  _inherits(Node, _NodeCore);

  var _super = _createSuper(Node);

  function Node() {
    var _this;

    _classCallCheck(this, Node);

    _this = _super.call(this);
    _this.elements = null;
    return _this;
  } /////
  ///// draw clip circle
  /////


  _createClass(Node, [{
    key: "getCircleRList",
    value: function getCircleRList(data) {
      var list = [];

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          var v = node.circle.r;
          if (list.indexOf(v) === -1) list.push(v);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      ;
      return list;
    }
  }, {
    key: "drawClipCircle",
    value: function drawClipCircle(place, data) {
      // http://bl.ocks.org/itagakishintaro/71a7c6779933c189c3ca
      var list = this.getCircleRList(data);
      var defs = place.append('defs');
      defs.selectAll("circle").data(list).enter().append('circle').attr('id', function (d) {
        return 'circle-' + d;
      }).attr('r', function (d) {
        return d;
      });
      defs.selectAll("clipPath").data(list).enter().append('clipPath').attr('id', function (d) {
        return 'clip-' + d;
      }).append('use').attr('xlink:href', function (d) {
        return '#circle-' + d;
      });
    } /////
    ///// draw
    /////

  }, {
    key: "clickAction",
    value: function clickAction(d, callbacks) {
      if (d.link) {
        window.open(d.link.to);
        return;
      }

      if (d.action && d.action.type === 'link') {
        window.open(d.action.to);
        return;
      }

      if (callbacks && callbacks.node && callbacks.node.click) {
        callbacks.node.click(d);
        return;
      }
    }
  }, {
    key: "drawGroup",
    value: function drawGroup(place, data) {
      var enter = place.selectAll("g.ng-node").data(data, function (d) {
        return d.id;
      }).enter().append("g").attr('class', 'ng-node');
      var exit = place.selectAll("g.ng-node").data(data, function (d) {
        return d.id;
      }).exit();
      return {
        enter: enter,
        exit: exit
      };
    }
  }, {
    key: "drawCircleImage",
    value: function drawCircleImage(groups, callbacks) {
      var _this2 = this;

      groups.filter(function (d) {
        return d.image;
      }).append('image').on("click", function (d) {
        _this2.clickAction(d, callbacks);
      }).attr('xlink:href', function (d) {
        return d.image.url;
      }).attr('clip-path', function (d) {
        return "url(#clip-".concat(d.circle.r, ")");
      }).attr('width', function (d) {
        return d.image.w;
      }).attr('height', function (d) {
        return d.image.h;
      }).attr('x', function (d) {
        return d.image.x;
      }).attr('y', function (d) {
        return d.image.y;
      });
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(groups, callbacks) {
      groups.append('circle').on("click", function (d) {
        if (callbacks && callbacks.node && callbacks.node.click) {
          d.select = !d.select;
          callbacks.node.click(d);
          return;
        }
      }).attr("r", function (d) {
        return d.circle.r;
      }).attr("fill", function (d) {
        return d.circle.fill;
      }).attr("stroke-width", function (d) {
        return d.circle.stroke.width;
      }).attr("stroke", function (d) {
        return d.circle.stroke.color;
      });
      this.drawCircleImage(groups, callbacks);
    }
  }, {
    key: "drawCircleLabel",
    value: function drawCircleLabel(groups, callbacks) {
      var _this3 = this;

      return groups.filter(function (d) {
        return !d.image;
      }).append('text').on("click", function (d) {
        _this3.clickAction(d, callbacks);
      }).attr("x", function (d) {
        return d.label.x;
      }).attr("y", function (d) {
        return d.label.y + d.label.font.size * 0.4;
      }).attr("font-size", function (d) {
        return d.label.font.size;
      }).text(function (d) {
        return d.label.text;
      });
    }
  }, {
    key: "drawEnter",
    value: function drawEnter(groups, callbacks) {
      groups.call(d3.drag().on("start", callbacks.dragStarted).on("drag", callbacks.dragged).on("end", callbacks.dragEnded));
      this.drawCircle(groups, callbacks);
      this.drawCircleLabel(groups, callbacks);
      return groups;
    }
  }, {
    key: "draw",
    value: function draw(place, data, callbacks) {
      var groups = this.drawGroup(place, data);
      this.drawEnter(groups.enter, callbacks);
      return place.selectAll("g.ng-node");
    }
  }, {
    key: "tick",
    value: function tick(nodes) {
      if (!nodes) return;
      nodes.attr("transform", function (d) {
        return "translate(".concat(d.x, ", ").concat(d.y, ")");
      });
    }
  }]);

  return Node;
}(NodeCore);

exports["default"] = Node;