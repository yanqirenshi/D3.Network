import * as d3 from 'd3';

class NodeCore {
    makeDataCircle (option) {
        let circle = {
            r: 55,
            fill: '#ffffff',
            stroke: {
                color: '#eeeeee',
                width: 8
            },
        };

        if (option.circle) {
            if (circle.r || circle.r===0)
                circle.r = option.circle.r;

            const stroke = option.circle.stroke;
            if (stroke) {
                if (stroke.color)
                    circle.stroke.color = stroke.color;
                if (stroke.width || stroke.width===0)
                    circle.stroke.width = stroke.width;
            }
        }

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
        let select = data.select;

        if (!select)
            return false;

        if (select===true)
            return true;

        if (select===false)
            return false;

        return false;
    }
    makeData (option = {}) {
        if (option._node)
            return option._node;

        let data = {
            x:      option.x || 0,
            y:      option.y || 0,
            freeze: this.makeDataFreeze(option.freeze),
            move:   this.makeDataMove(option),
            select: this.makeDataSelect(option),
            label:  this.makeDataLabel(option),
            circle: this.makeDataCircle(option),
            image:  this.makeDataImage(option),
            link:   this.makeDataLink(option.link),
            action: option.action || null,
            //
            id:     option.id,
            _class: 'NODE',
        };

        if (data.move==='freeze' || data.move==='support') {
            data.fx = data.x;
            data.fy = data.y;
        }

        if (option._class)
            data._class = option._class;

        data._core = {...option};
        option._node = data;

        return data;
    }
}


export default class Node extends NodeCore {
    constructor () {
        super();

        this.elements = null;
    }
    /////
    ///// draw clip circle
    /////
    getCircleRList (data) {
        let list = [];

        for (let node of data) {
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
    ///// get element
    /////
    selectRing (mode, groups) {
        if (mode==='enter')
            return groups
            .append('circle')
            .attr('class', 'select-ring');

        return groups.select("circle.select-ring");
    }
    circles (mode, groups, callbacks) {
        if (mode==='enter')
            return groups
            .append('circle')
            .on("click", (e, d) => {
                this.clickAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("dblclick", (e, d) => {
                this.dblClickAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("mousedown", (e, d) => {
                this.mouseDownAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("mouseup", (e, d) => {
                this.mouseUpAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("mouseover", (e, d) => {
                this.mouseOverAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("mouseout", (e, d) => {
                this.mouseOutAction(e, d, callbacks);
                e.stopPropagation();
            })
            .attr('class', 'base');

        return groups.select("circle.base");
    }
    circleLabels (mode, groups, callbacks) {
        if (mode==='enter')
            return groups
            .filter((d) => {
                return !d.image;
            })
            .append('text')
            .on("click", (e, d) => {
                this.clickAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("dblclick", (e, d) => {
                this.dblClickAction(e, d, callbacks);
                e.stopPropagation();
            })
            .attr('class', 'label');

        return groups.select("text.label");
    }
    /////
    ///// Events
    /////
    clickAction (e, d, callbacks) {
        if (d.link) {
            window.open(d.link.to);
            return;
        }

        if (d.action && d.action.type==='link') {
            window.open(d.action.to);
            return;
        }

        if (callbacks && callbacks.node && callbacks.node.click) {
            callbacks.node.click(d, e);
            return;
        }
    }
    dblClickAction (e, d, callbacks) {
        if (d.link) {
            window.open(d.link.to);
            return;
        }
        if (d.action && d.action.type==='link') {
            window.open(d.action.to);
            return;
        }
        if (callbacks && callbacks.node && callbacks.node.dblclick) {
            callbacks.node.dblclick(d, e);
            return;
        }
    }
    mouseDownAction (e, d, callbacks) {
        if (!callbacks || !callbacks.node || !callbacks.node.mouseDown)
            return;

        callbacks.node.mouseDown(d, e);
    }
    mouseUpAction (e, d, callbacks) {
        if (!callbacks || !callbacks.node || !callbacks.node.mouseUp)
            return;

        callbacks.node.mouseUp(d, e);
    }
    mouseOverAction (e, d, callbacks) {
        if (!callbacks || !callbacks.node || !callbacks.node.mouseOver)
            return;

        callbacks.node.mouseOver(d, e);
    }
    mouseOutAction (e, d, callbacks) {
        if (!callbacks || !callbacks.node || !callbacks.node.mouseOut)
            return;

        callbacks.node.mouseOut(d, e);
    }
    /////
    ///// draw
    /////
    drawGroup (place, data) {
        let groups =  place
            .selectAll("g.ng-node")
            .data(data, (d) => { return d.id; });

        let enter = groups
            .enter()
            .append("g")
            .attr('class', 'ng-node');

        let exit =  place
            .selectAll("g.ng-node")
            .data(data, (d) => { return d.id; })
            .exit();

        return {
            enter: enter,
            exit: exit,
            update: groups,
        };
    }
    drawCircleImage (groups, callbacks) {
        groups
            .filter((d) => {
                return d.image;
            })
            .append('image')
            .on("click", (e, d) => {
                this.clickAction(e, d, callbacks);
                e.stopPropagation();
            })
            .on("dblclick", (e, d) => {
                this.dblClickAction(e, d, callbacks);
                e.stopPropagation();
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
    drawSelectRing (mode, groups, callbacks) {
        const color = '#2ca9e1';
        const width = 3;

        const rings = this.selectRing(mode, groups);

        rings
            .attr("r", (d) => {
                return d.select ? d.circle.r + (width * 2)  : 0;
            })
            .attr("fill", (d) => {
                return color;
            })
            .attr("stroke-width", (d) => {
                return d.select ? width  : 0;
            })
            .attr("stroke", (d) => {
                return color;
            });
    }
    drawCircle (mode, groups, callbacks) {
        const circles = this.circles(mode, groups, callbacks);

        circles
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
    drawCircleLabel (mode, groups, callbacks) {
        const labels = this.circleLabels(mode, groups, callbacks);

        labels
            .attr("x", (d) => {
                return d.label.x;
            })
            .attr("y", (d) => {
                return d.label.y + d.label.font.size;
            })
            .attr("font-size", (d) => {
                return d.label.font.size;
            })
            .text((d) => {
                return d.label.text;
            });
    }
    drawOperators (groups, callbacks) {}
    drawEnter (groups, callbacks) {
        groups.call(d3
                    .drag()
                    .on("start", callbacks.dragStarted)
                    .on("drag", callbacks.dragged)
                    .on("end", callbacks.dragEnded));

        this.drawSelectRing('enter', groups, callbacks);

        this.drawCircle('enter', groups, callbacks);

        this.drawCircleLabel('enter', groups, callbacks);

        this.drawOperators(groups, callbacks);

        return groups;
    }
    drawUpdate (groups) {

        this.drawSelectRing('update', groups);

        this.drawCircle('update', groups);

        this.drawCircleLabel('update', groups);

        this.drawOperators(groups);
    }
    drawRemove (groups) {
        groups.remove() ;
    }
    draw (place, data, callbacks) {
        let groups = this.drawGroup(place, data);

        this.drawRemove(groups.exit);
        this.drawEnter(groups.enter, callbacks);
        this.drawUpdate(groups.update, callbacks);

        return place.selectAll("g.ng-node");
    }
    tick (nodes) {
        if (!nodes)
            return;

        nodes
            .attr("transform", (d) => {
                return `translate(${d.x}, ${d.y})`;
            });
    }
}
