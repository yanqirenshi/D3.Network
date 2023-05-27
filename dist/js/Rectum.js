"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Edge", {
  enumerable: true,
  get: function get() {
    return _Edge["default"];
  }
});
Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _Node["default"];
  }
});
Object.defineProperty(exports, "Simulation", {
  enumerable: true,
  get: function get() {
    return _Simulation["default"];
  }
});
exports["default"] = void 0;
var _assh0le = require("@yanqirenshi/assh0le");
var _Node = _interopRequireDefault(require("./Node"));
var _Edge = _interopRequireDefault(require("./Edge"));
var _Simulation = _interopRequireDefault(require("./Simulation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);
  var _super = _createSuper(Rectum);
  function Rectum(params) {
    var _this;
    _classCallCheck(this, Rectum);
    _this = _super.call(this, params);
    _this.node = new _Node["default"]();
    _this.edge = new _Edge["default"](params.edge);
    _this.selection_node = null;
    _this.selection_edge = null;

    // TODO: 利用していないけど、このクラス自体がデータを管理すべきではないか。と。
    _this.data_nodes = {
      ht: {},
      list: []
    };
    _this.data_edges = {
      ht: {},
      list: []
    };
    _this.simulation = null;

    // TODO: 整理が必要
    _this._callbacks = {};
    _this.callbacks = null;
    if (params.callbacks) _this._callbacks = params.callbacks;

    // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
    _this.line_color = params.line_color || null;
    _this.edge.init({
      line_color: _this.line_color
    });

    // simulation
    _this.simulation = _this.makeSimulator();

    // これはゴミちゃうかな。
    _this._drawed_at = null;
    _this._initialized_at = null;
    _this._initialized_at = new Date();
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }
  _createClass(Rectum, [{
    key: "isInitialized",
    value: function isInitialized() {
      return this._initialized_at ? true : false;
    }
  }, {
    key: "selector_setAfter",
    value: function selector_setAfter() {
      this.edge.drawEdgeArrowhead(this.d3Element());
    }
    /* *********** */
    /*  Simulator  */
    /* *********** */
  }, {
    key: "makeSimulator",
    value: function makeSimulator() {
      var _this2 = this;
      return new _Simulation["default"](function () {
        _this2.node.tick(_this2.selection_node);
        _this2.edge.tick(_this2.selection_edge);
      });
    }
    /* ******** */
    /*  Others  */
    /* ******** */
  }, {
    key: "getCallbacks",
    value: function getCallbacks() {
      if (!this.callbacks) {
        var simulation = this.simulation;
        this.callbacks = simulation.makeDragAndDropCallbacks(this._callbacks);
      }
      console.log('---------------');
      console.log(this.callbacks);
      return this.callbacks;
    }
    /* ******** */
    /*  Data    */
    /* ******** */
  }, {
    key: "draw",
    value: function draw() {
      this.nodes(this._data.nodes);
      this.edges(this._data.edges);
      this._drawed_at = new Date();
      return this;
    }
  }, {
    key: "drawedAt",
    value: function drawedAt() {
      return this._drawed_at;
    }
  }, {
    key: "nodes",
    value: function nodes(data) {
      var _this3 = this;
      if (!data || data.length === 0) return this;
      var nodes_data = data.map(function (d) {
        return _this3.node.makeData(d);
      });
      var place = this.layer('foreground');

      // TODO: これは D3Network でデータを管理すべき。
      this.node.drawClipCircle(place, nodes_data);
      this.selection_node = this.node.draw(place, nodes_data, this.getCallbacks());
      this.simulation.nodes(nodes_data);
      return this;
    }
  }, {
    key: "edges",
    value: function edges(data) {
      var _this4 = this;
      if (!data || data.length === 0) return this;
      var links_data = data.map(function (d) {
        return _this4.edge.makeData(d);
      });
      var place = this.layer('background');
      var simulation = this.simulation;
      this.selection_edge = this.edge.draw(place, links_data);
      simulation.edges(links_data);
      return this;
    }
  }, {
    key: "addNode",
    value: function addNode(data) {}
  }, {
    key: "addEdge",
    value: function addEdge(data) {}
  }]);
  return Rectum;
}(_assh0le.Colon);
exports["default"] = Rectum;