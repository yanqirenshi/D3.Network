# D3.Network

# Usage

See `src/index.html`

## Data Structure

データを以下のフォーマットに変換して流し込む必要があります。

### Node

#### Envelope

```
{
  ht: { /* key: _id, value: Object */ },
  list: [ /* Object ... */ ]
}
```

#### Object

```
{
    x: 0,
    y: 0,
    label: {
        text: 'XYZ',
        font: {
            size: 12
        }
    },
    circle: {
        r: 33,
        fill: '#eeeeee',
        stroke: {
            color: '#888888',
            width: 1
        }
    },
    _id: 1,
    _class: 'XXX'
    _core: { /* 元となるデータ */ }
}
```

### Edge

#### Envelope

```
{
  ht: { /* key: _id, value: Object */ },
  list: [ /* Object ... */ ]
}
```

#### Object

```
{
   source: 1,
   target: 2
    _core: { /* 元となるデータ */ }
}
```

# Installation

# Dependencies

- D3.js

# Author

yanqirenshi (yanqirenshie@gmail.com)

# Copyright

Copyright (c) 2018 yanqirenshi (yanqirenshie@gmail.com)

# License

Licensed under the LLGPL License.
