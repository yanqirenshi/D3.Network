class D3RuleLine {
    constructor(reducer) {}
    draw(d3svg, data) {
        let lines = [];
        let span = data.span;
        let _id = -1000;

        for (let x=data.from.x ; x<data.to.x ; x+=span)
            if(x!=0)
                lines.push({
                    _id: _id++,
                    from: {x: x, y: data.from.y},
                    to:   {x: x, y: data.to.y}
                });

        for (let y=data.from.y ; y<data.to.y ; y+=span)
            if(y!=0)
                lines.push({
                    _id: _id++,
                    from: {x: data.from.x, y: y},
                    to:   {x: data.to.x,   y: y}
                });

        let svg = d3svg.Svg();


        let g = svg.selectAll('g.rules');

        g.selectAll('line.rule')
            .data(lines)
            .enter()
            .append('line')
            .attr('class', 'rule')
            .attr('x1', (d) => { return d.from.x;})
            .attr('y1', (d) => { return d.from.y;})
            .attr('x2', (d) => { return d.to.x;})
            .attr('y2', (d) => { return d.to.y;})
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 0.8)
            .attr('stroke-dasharray', '5,5');

        let axis = [
            { from: { x:-10000, y:0 },      to: { x:10000, y:0 } },
            { from: { x:0,      y:-10000 }, to: { x:0,     y:10000 } }
        ];

        g.selectAll('line.axis')
            .data(axis)
            .enter()
            .append('line')
            .attr('x1', (d) => { return d.from.x;})
            .attr('y1', (d) => { return d.from.y;})
            .attr('x2', (d) => { return d.to.x;})
            .attr('y2', (d) => { return d.to.y;})
            .attr('class', 'rule')
            .attr('stroke', '#888888')
            .attr('stroke-width', 3);
    }
}
