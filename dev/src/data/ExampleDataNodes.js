class ExampleDataNodes {
    defaultCircle (r) {
        return {
            r: r || 33,
            fill: '#eeeeee',
            stroke: { color: '#888888', width: 1 },
        };
    }
    makeData () {
        let defaultCircle = {
            r: 33,
            fill: '#eeeeee',
            stroke: { color: '#888888', width: 1 },
        };

        return [
            {
                id: 1,
                _class: 'NODE-A',
                x: 0,
                y: 0,
                label: {
                    text: 'Node #1',
                    font: { size: 48 },
                },
                circle: this.defaultCircle(55),
            },
            {
                id: 2,
                _class: 'NODE-B',
                x: 0,
                y: 0,
                move: 'freeze',
                label: {
                    text: 'Node #2',
                    font: { size: 24 },
                },
                circle: this.defaultCircle(33),
            },
            {
                id: 3,
                _class: 'NODE-C',
                x: 0,
                y: 0,
                label: {
                    text: 'Node #3',
                    font: { size: 36 },
                },
                circle: this.defaultCircle(44),
            },
        ];
    }
};

export default ExampleDataNodes;
