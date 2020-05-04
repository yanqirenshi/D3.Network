import * as d3 from 'd3';

class D3NetworkEdgeCore {
    constructor () {
        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        this.line_color = '#aaaaaa';
    }
    makeDataLine (data) {
    }
    makeData (data) {
        let out = {
            source: data.source,
            target: data.target,
            line: {
                stroke: {
                    width: 8,
                    color: this.line_color,
                },
                filll: this.line_color,
            },
            // arrowhead: {},
            _core: data,
        };

        return out;
    }
}

export default class D3NetworkEdge extends D3NetworkEdgeCore {
    constructor () {
        super();

        this.elements = null;

        this.d3line = null;
    }
    init (params) {
        // TODO: 回避措置コード。本来は line_color はデータに持たせるべき。
        if (params.line_color)
            this.line_color = params.line_color;

        return this;
    }
    drawEdgeArrowhead (place) {
        var marker = place
            .append("defs")
            .append("marker")
            .attr('id', "arrowhead",)
            .attr('refX', (8+1))
            .attr('refY', 2)
            .attr('markerWidth', 4)
            .attr('markerHeight', 4)
            .attr('orient', "auto");

        marker.append("path")
            .attr('d', "M 0,0 V 4 L4,2 Z")
            .attr('fill', this.line_color);
    }
    getD3Line () {
        if (!this.d3line)
            this.d3line = d3
            .line()
            .x(function(d) {
                return d[0];
            })
            .y(function(d) {
                return d[1];
            });

        return this.d3line;
    }
    draw (place, data) {
        var line = this.getD3Line();

        this.elements = place
            .selectAll("path.ng-edge")
            .data(data, (d) => {
                return d._id;
            })
            .enter()
            .append('path')
            .attr('class', 'ng-edge')
            .attr('d', (d) => {
                let from = [
                    d.source.x || 0,
                    d.source.y || 0 ,
                ];
                let to = [
                    d.source.x || 0,
                    d.source.y || 0,
                ];
                return line([from, to]);
            })
            .attr("stroke-width", (d) => {
                return d.line.stroke.width;
            })
            .attr("stroke", (d) => {
                return this.line_color;
            })
            .attr( 'marker-end', "url(#arrowhead)");

        return this.elements;
    }
    tick (edges) {
        let line = this.getD3Line();

        edges
            .attr('d', (d) => {
                let from = [
                    d.source.x,
                    d.source.y ,
                ];
                let to = [
                    d.target.x,
                    d.target.y,
                ];

                return line([from, to]);
            })
            .attr('stroke-dasharray', function (d) {
                let edge_length = this.getTotalLength();
                let ref1 = 8;

                let r1 = d.source.circle.r + d.source.circle.stroke.width;
                let r2 = d.target.circle.r + d.target.circle.stroke.width;

                let t = edge_length - (r1 + r2 + ref1);

                return "0 " + r1 + " " + t + " " + r2;
            })
            .attr('stroke-dashoffset', 0);
    }
}
