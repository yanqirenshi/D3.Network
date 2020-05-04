class ExampleDataNodes {
    makeData () {
        let defaultCircle = {
            r: 33,
            fill: '#eeeeee',
            stroke: { color: '#888888', width: 1 },
        };

        return [
            {
                _id: 1,
                _class: 'NODE-A',
                x: 0,
                y: 0,
                label: {
                    text: 'Node #1',
                    font: { size: 12 },
                },
                circle: {...defaultCircle},
            },
            {
                _id: 2,
                _class: 'NODE-B',
                x: 0,
                y: 0,
                label: {
                    text: 'Node #2',
                    font: { size: 12 },
                },
                circle: {...defaultCircle},
            },
            {
                _id: 3,
                _class: 'NODE-C',
                x: 0,
                y: 0,
                label: {
                    text: 'Node #3',
                    font: { size: 12 },
                },
                circle: {...defaultCircle},
            },
        ];
    }
};

export default ExampleDataNodes;
