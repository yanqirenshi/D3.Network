<page-usage_tab-readme_tab-code-data>

    <section class="section">
        <div class="container">
            <h1 class="title is-4">Data</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p><pre style="line-height:14px;"><code>{this.code}</code></pre></p>
            </div>
        </div>
    </section>

    <script>
     this.on('mount', () => {
         hljs.initHighlightingOnLoad();
     });
     this.code = [
         "function makeNode (id) {",
         "    return {",
         "        x: Math.floor(Math.random() * Math.floor(500)),",
         "        y: Math.floor(Math.random() * Math.floor(500)),",
         "        label: {",
         "            text: 'XYZ-'+id,",
         "            font: {",
         "                size: 12",
         "            }",
         "        },",
         "        circle: {",
         "            r: 33,",
         "            fill: '#eeeeee',",
         "            stroke: {",
         "                color: '#888888',",
         "                width: 1",
         "            }",
         "        },",
         "        _id: id,",
         "        _class: 'XXX'",
         "    };",
         "}",
         "function makeNodes (n) {",
         "    let nodes = [];",
         "    for (let i=1 ; i<n ; i++)",
         "        nodes.push(makeNode(i));",
         "    return nodes;",
         "}",
         "",
         "function makeEdge () {",
         "    return {",
         "        source: Math.floor(Math.random() * Math.floor(332)), 1,",
         "        target: Math.floor(Math.random() * Math.floor(332)), 1",
         "    };",
         "}",
         "function makeEdges (n) {",
         "    let edges = [];",
         "    for (let i=1 ; i<n ;i++)",
         "        edges.push(makeEdge());",
         "    return edges;",
         "}"
     ].join('\n');
    </script>

</page-usage_tab-readme_tab-code-data>
