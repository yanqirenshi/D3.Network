export default class Geometry {
    normalize (from, to) {
        return {
            x: to.x - from.x,
            y: to.y - from.y,
        };
    }
    denormalize (from, vec) {
        return {
            x: vec.x + from.x,
            y: vec.y + from.y,
        };
    }
    quadrant (vec) {
        if (vec.x >= 0 && vec.y < 0)
            // 第四象限
            return 4;
        else if (vec.x < 0 && vec.y < 0)
            // 第三象限
            return 3;
        else if (vec.x < 0 && vec.y >= 0)
            // 第二象限
            return 2;

        return 1;
    }
    vec2vecAtQuadrant (vec, q) {
        if (q===2) return { x: vec.y,      y: vec.x * -1 };
        if (q===3) return { x: vec.x * -1, y: vec.y * -1 };
        if (q===4) return { x: vec.y * -1, y: vec.x };

        // if (q===1)
        return {...vec};
    }
    vec2vecAtUnquadrant (vec, q) {
        if (q===2) return { x: vec.y * -1, y: vec.x };
        if (q===3) return { x: vec.x * -1, y: vec.y * -1 };
        if (q===4) return { x: vec.y,      y: vec.x * -1 };

        // if (q===1)
        return {...vec};
    }
    lenPoint2Point (from, to) {
        let v = to - from;

        if (v >= 0)
            return v;

        return v * -1;
    }
    lineOfNode2Node (from, to) {
        // normalize
        let vec = this.normalize(from, to);

        // 象限を取得
        let q = this.quadrant(vec);

        // 第一象限に正規化 (回転させる)
        let vec_1q = this.vec2vecAtQuadrant(vec, q);

        // 三辺を定義する。
        ///
        ///                  + sin c/a
        ///              __ /|__
        ///                / |
        ///               a  c
        ///            __/   |__
        ///             /    |
        /// cos b/a    +--b--+ tan c/b
        ///
        let b = vec_1q.x;
        let c = vec_1q.y;
        let a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));

        // sin cos を算出する。
        let sin_theta = c / a;
        let cos_theta = b / a;

        // 新しい from を算出する。
        let from_1q_new = {
            x: cos_theta * from.circle.r,
            y: sin_theta * from.circle.r,
        };

        // 新しい to を算出する。
        let arrowhead_buffer = 4;
        let to_1q_new = {
            x: vec_1q.x - (cos_theta * (from.circle.r + from.circle.stroke.width)),
            y: vec_1q.y - (sin_theta * (from.circle.r + from.circle.stroke.width)),
        };

        // 元の象限に戻す。
        let from_new = this.vec2vecAtUnquadrant(from_1q_new, q);
        let to_new   = this.vec2vecAtUnquadrant(to_1q_new,q);

        // normalize を元に戻して返す
        return {
            from: this.denormalize(from_new, from),
            to:   this.denormalize(to_new,   from),
        };
    }
}
