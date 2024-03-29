"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Geometry = /*#__PURE__*/function () {
  function Geometry() {
    _classCallCheck(this, Geometry);
  }
  _createClass(Geometry, [{
    key: "normalize",
    value: function normalize(from, to) {
      return {
        x: to.x - from.x,
        y: to.y - from.y
      };
    }
  }, {
    key: "denormalize",
    value: function denormalize(from, vec) {
      return {
        x: vec.x + from.x,
        y: vec.y + from.y
      };
    }
  }, {
    key: "quadrant",
    value: function quadrant(vec) {
      if (vec.x >= 0 && vec.y < 0)
        // 第四象限
        return 4;else if (vec.x < 0 && vec.y < 0)
        // 第三象限
        return 3;else if (vec.x < 0 && vec.y >= 0)
        // 第二象限
        return 2;
      return 1;
    }
  }, {
    key: "vec2vecAtQuadrant",
    value: function vec2vecAtQuadrant(vec, q) {
      if (q === 2) return {
        x: vec.y,
        y: vec.x * -1
      };
      if (q === 3) return {
        x: vec.x * -1,
        y: vec.y * -1
      };
      if (q === 4) return {
        x: vec.y * -1,
        y: vec.x
      };

      // if (q===1)
      return _objectSpread({}, vec);
    }
  }, {
    key: "vec2vecAtUnquadrant",
    value: function vec2vecAtUnquadrant(vec, q) {
      if (q === 2) return {
        x: vec.y * -1,
        y: vec.x
      };
      if (q === 3) return {
        x: vec.x * -1,
        y: vec.y * -1
      };
      if (q === 4) return {
        x: vec.y,
        y: vec.x * -1
      };

      // if (q===1)
      return _objectSpread({}, vec);
    }
  }, {
    key: "lenPoint2Point",
    value: function lenPoint2Point(from, to) {
      var v = to - from;
      if (v >= 0) return v;
      return v * -1;
    }
  }, {
    key: "lineOfNode2Node",
    value: function lineOfNode2Node(from, to) {
      // normalize
      var vec = this.normalize(from, to);

      // 象限を取得
      var q = this.quadrant(vec);

      // 第一象限に正規化 (回転させる)
      var vec_1q = this.vec2vecAtQuadrant(vec, q);

      // 三辺を定義する。
      ///
      ///                  + sin c/a
      ///              __ /|__
      ///                / |
      ///               a  c
      ///            __/   |__
      ///             /    |
      /// cos b/a    o--b--+ tan c/b
      ///          (x,y)
      ///
      var b = vec_1q.x;
      var c = vec_1q.y;
      var a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));

      // sin cos を算出する。
      var sin_theta = c / a;
      var cos_theta = b / a;

      // 新しい from を算出する。
      var from_1q_new = {
        x: cos_theta * from.circle.r + 10,
        y: sin_theta * from.circle.r + 10
      };

      // 新しい to を算出する。
      var to_1q_new = {
        x: vec_1q.x - cos_theta * (to.circle.r + to.circle.stroke.width + 35),
        y: vec_1q.y - sin_theta * (to.circle.r + to.circle.stroke.width + 35)
      };

      // 元の象限に戻す。
      var from_new = this.vec2vecAtUnquadrant(from_1q_new, q);
      var to_new = this.vec2vecAtUnquadrant(to_1q_new, q);

      // normalize を元に戻して返す
      return {
        from: this.denormalize(from_new, from),
        to: this.denormalize(to_new, from)
      };
    }
  }]);
  return Geometry;
}();
exports["default"] = Geometry;