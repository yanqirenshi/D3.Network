import * as d3 from 'd3';

class D3NetworkNodeCore {
    makeDataCircle (option) {
        let circle = {
            r: 55,
            fill: '#ffffff',
            stroke: {
                color: '#d57c6b',
                width: 8
            },
        };

        if (option.circle && option.circle.r)
            circle.r = option.circle.r;

        return circle;
    }
    // TODO: はいきよてい
    makeDataLink (data) {

        if (!data)
            return null;

        return data;
    }
    makeDataImage (option) {
        if (!option.image)
            return null;

        return {
            url: option.image.url,
            x: option.image.x || 0,
            y: option.image.y || 0,
            w: option.image.w || 0,
            h: option.image.h || 0,
        };
    }
    makeDataLabel (option) {
        let label = {
            text: '',
            font: {
                size: 44
            },
            x: 0,
            y: 0,
        };

        if (!option || !option.label)
            return label;

        if (option.label.text)
            label.text = option.label.text;

        if (option.label.x)
            label.x = option.label.x;

        if (option.label.y)
            label.y = option.label.y;

        if (option.label.font)
            label.font = option.label.font;

        return label;
    }
    makeDataMove (option) {
        // free:    自動移動(free will)
        // support: 移動
        // freeze:  移動もしない
        let default_val = 'will';
        if (!option || !option.move)
            return default_val;

        let move = option.move;
        let master = [default_val, 'support', 'freeze'];

        if (!master.find((d) => { return d===move; }))
            return default_val;

        return move;
    }
    makeDataFreeze (data) {
        if (!data)
            return false;

        if (data===true)
            return true;

        if (data===false)
            return false;

        return false;
    }
    makeDataSelect (data) {
        if (!data)
            return false;

        if (data===true)
            return true;

        if (data===false)
            return false;

        return false;
    }
    makeData (option = {}) {
        let data = {
            x: option.x || 0,
            y: option.y || 0,
            freeze: this.makeDataFreeze(option.select),
            move:   this.makeDataMove(option),
            select: this.makeDataSelect(option.select),
            label:  this.makeDataLabel(option),
            circle: this.makeDataCircle(option),
            image:  this.makeDataImage(option),
            link:   this.makeDataLink(option.link),
            action: option.action || null,
            //
            _id: option._id,
            _class: 'NODE',
        };

        if (data.move==='freeze' || data.move==='support') {
            data.fx = data.x;
            data.fy = data.y;
        }

        if (option._class)
            data._class = option._class;

        data._core = {...data};

        return data;
    }
}


export default class D3NetworkNode extends D3NetworkNodeCore {
    constructor () {
        super();

        this.elements = null;
    }
    /////
    ///// draw clip circle
    /////
    getCircleRList (data) {
        let list = [];

        for (let node of data.node) {
            let v = node.circle.r;
            if (list.indexOf(v)===-1)
                list.push(v);
        };

        return list;
    }
    drawClipCircle (place, data) {
        // http://bl.ocks.org/itagakishintaro/71a7c6779933c189c3ca
        let list = this.getCircleRList(data);

        var defs = place.append('defs');

        defs
            .selectAll("circle")
            .data(list)
            .enter()
            .append('circle')
            .attr('id', (d) => { return 'circle-' + d; })
            .attr('r', (d) => { return d; });

        defs
            .selectAll("clipPath")
            .data(list)
            .enter()
            .append('clipPath')
            .attr('id', (d) => { return 'clip-' + d; })
            .append('use')
            .attr('xlink:href', (d) => { return '#circle-' + d; });
    }
    /////
    ///// draw
    /////
    clickAction (d, callbacks) {
        if (d.link) {
            window.open(d.link.to);
            return;
        }
        if (d.action && d.action.type==='link') {
            window.open(d.action.to);
            return;
        }
        if (callbacks && callbacks.node && callbacks.node.click) {
            callbacks.node.click(d);
            return;
        }
    }
    drawGroup (place, data) {
        return place
            .selectAll("g.ng-node")
            .data(data, (d) => { return d._id; })
            .enter()
            .append("g")
            .attr('class', 'ng-node');
    }
    drawCircleImage (groups, callbacks) {
        groups
            .filter((d) => {
                return d.image;
            })
            .append('image')
            .on("click", (d) => {
                this.clickAction(d, callbacks);
            })
            .attr('xlink:href', (d) => {
                return d.image.url;
            })
            .attr('clip-path', (d) => {
                return `url(#clip-${d.circle.r})`;
            })
            .attr('width', (d) => {
                return d.image.w;
            })
            .attr('height', (d) => {
                return d.image.h;
            })
            .attr('x', (d) => {
                return d.image.x;
            })
            .attr('y', (d) => {
                return d.image.y;
            });
    }
    drawCircle (groups, callbacks) {
        groups
            .append('circle')
            .on("click", (d) => {
                if (callbacks && callbacks.node && callbacks.node.click) {
                    callbacks.node.click(d);
                    return;
                }
            })
            .attr("r", (d) => {
                return d.circle.r;
            })
            .attr("fill", (d) => {
                return d.circle.fill;
            })
            .attr("stroke-width", (d) => {
                return d.circle.stroke.width;
            })
            .attr("stroke", (d) => {
                return d.circle.stroke.color;
            });

        this.drawCircleImage(groups, callbacks);
    }
    drawCircleLabel (groups, callbacks) {
        return groups
            .filter((d) => {
                return !d.image;
            })
            .append('text')
            .on("click", (d) => {
                this.clickAction(d, callbacks);
            })
            .attr("x", (d) => {
                return d.label.x;
            })
            .attr("y", (d) => {
                return d.label.y;
            })
            .attr("font-size", (d) => {
                return d.label.font.size;
            })
            .text((d) => {
                return d.label.text;
            });
    }
    draw (place, data, callbacks) {
        let groups = this.drawGroup(place, data);

        groups.call(d3
                    .drag()
                    .on("start", callbacks.dragStarted)
                    .on("drag", callbacks.dragged)
                    .on("end", callbacks.dragEnded));

        this.drawCircle(groups, callbacks);
        this.drawCircleLabel(groups, callbacks);

        return groups;
    }
    tick (nodes) {
        nodes
            .attr("transform", (d) => {
                return `translate(${d.x}, ${d.y})`;
            });
    }
}
