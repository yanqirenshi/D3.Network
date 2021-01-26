"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _Geometry = _interopRequireDefault(require("./Geometry.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EdgeCore = /*#__PURE__*/function () {
  function EdgeCore() {
    _classCallCheck(this, EdgeCore);

    // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
    this.line_color = '#aaaaaa';
  }

  _createClass(EdgeCore, [{
    key: "makeDataLine",
    value: function makeDataLine(data) {}
  }, {
    key: "makeData",
    value: function makeData(data) {
      if (data._edge) return data._edge;
      var out = {
        source: data.source,
        target: data.target,
        line: {
          stroke: {
            width: 8,
            color: this.line_color
          },
          filll: this.line_color
        },
        // arrowhead: {},
        _core: data,
        id: data.id
      };
      data._edge = out;
      return out;
    }
  }]);

  return EdgeCore;
}();

var Edge = /*#__PURE__*/function (_EdgeCore) {
  _inherits(Edge, _EdgeCore);

  var _super = _createSuper(Edge);

  function Edge() {
    var _this;

    _classCallCheck(this, Edge);

    _this = _super.call(this);
    _this.elements = null;
    _this.d3line = null;
    return _this;
  }

  _createClass(Edge, [{
    key: "init",
    value: function init(params) {
      // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
      if (params.line_color) this.line_color = params.line_color;
      return this;
    }
  }, {
    key: "drawEdgeArrowhead",
    value: function drawEdgeArrowhead(place) {
      var marker = place.append("defs").append("marker").attr('id', "arrowhead").attr('refX', 4).attr('refY', 2).attr('markerWidth', 4).attr('markerHeight', 4).attr('orient', "auto");
      marker.append("path").attr('d', "M 0,0 V 4 L4,2 Z").attr('fill', this.line_color);
    }
  }, {
    key: "getD3Line",
    value: function getD3Line() {
      if (!this.d3line) this.d3line = d3.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      });
      return this.d3line;
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      var _this2 = this;

      this.elements = place.selectAll("path.ng-edge").data(data, function (d) {
        return d.id;
      }).enter().append('path').attr('class', 'ng-edge').attr("stroke-width", function (d) {
        return d.line.stroke.width;
      }).attr("stroke", function (d) {
        return _this2.line_color;
      }).attr('marker-end', "url(#arrowhead)");
      return place.selectAll("path.ng-edge");
    }
  }, {
    key: "tick",
    value: function tick(edges) {
      if (!edges) return;
      var line = this.getD3Line();
      var geo = new _Geometry["default"]();
      edges.attr('d', function (d) {
        var line_new = geo.lineOfNode2Node(d.source, d.target);
        return line([[line_new.from.x, line_new.from.y], [line_new.to.x, line_new.to.y]]);
      }).attr('stroke-dasharray', function (d) {
        var edge_length = this.getTotalLength();
        var ref1 = 8;
        var r1 = d.source.circle.stroke.width;
        var r2 = d.target.circle.stroke.width;
        var t = edge_length - (r1 + r2 + ref1);
        return "0 " + r1 + " " + t + " " + r2;
      }).attr('stroke-dashoffset', 0);
    }
  }]);

  return Edge;
}(EdgeCore);

exports["default"] = Edge;