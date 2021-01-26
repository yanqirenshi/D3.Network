"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      if (vec.x >= 0 && vec.y < 0) // 第四象限
        return 4;else if (vec.x < 0 && vec.y < 0) // 第三象限
        return 3;else if (vec.x < 0 && vec.y >= 0) // 第二象限
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
      }; // if (q===1)

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
      }; // if (q===1)

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
      var vec = this.normalize(from, to); // 象限を取得

      var q = this.quadrant(vec); // 第一象限に正規化 (回転させる)

      var vec_1q = this.vec2vecAtQuadrant(vec, q); // 三辺を定義する。
      ///
      ///                  + sin c/a
      ///              __ /|__
      ///                / |
      ///               a  c
      ///            __/   |__
      ///             /    |
      /// cos b/a    +--b--+ tan c/b
      ///

      var b = vec_1q.x;
      var c = vec_1q.y;
      var a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2)); // sin cos を算出する。

      var sin_theta = c / a;
      var cos_theta = b / a; // 新しい from を算出する。

      var from_1q_new = {
        x: cos_theta * from.circle.r,
        y: sin_theta * from.circle.r
      }; // 新しい to を算出する。

      var to_1q_new = {
        x: vec_1q.x - cos_theta * (from.circle.r + from.circle.stroke.width),
        y: vec_1q.y - sin_theta * (from.circle.r + from.circle.stroke.width)
      }; // 元の象限に戻す。

      var from_new = this.vec2vecAtUnquadrant(from_1q_new, q);
      var to_new = this.vec2vecAtUnquadrant(to_1q_new, q); // normalize を元に戻して返す

      return {
        from: this.denormalize(from_new, from),
        to: this.denormalize(to_new, from)
      };
    }
  }]);

  return Geometry;
}();

exports["default"] = Geometry;