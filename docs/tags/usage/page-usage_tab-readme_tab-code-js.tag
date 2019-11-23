<page-usage_tab-readme_tab-code-js>

    <section class="section">
        <div class="container">
            <h1 class="title is-4">Javascript</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p><pre style="line-height:14px;"><code>{code}</code></pre></p>
            </div>
        </div>
    </section>

    <script>
     this.on('mount', () => {
         hljs.initHighlightingOnLoad();
     });
     this.code = [
         "class Main {",
         "    constructor (d3svg) {",
         "        this.d3svg = d3svg;",
         "        this.simulator = new D3Simulator().make();",
         "    }",
         "    refreshSvgSize () {",
         "        let tag = this.refs.svg;",
         "",
         "        tag.setAttribute('width',window.innerWidth);",
         "        tag.setAttribute('height',window.innerHeight);",
         "    }",
         "    draw (nodes, edges, rules) {",
         "        if (!this.d3svg)",
         "            return;",
         "",
         "        let d3svg = this.d3svg;",
         "",
         "        new D3Base().draw(d3svg);",
         "        new D3Nodes().draw(d3svg,",
         "                           nodes,",
         "                           this.simulator,",
         "                           (type, data) => { return; });",
         "        new D3Edges().draw(d3svg, edges, this.simulator);",
         "    }",
         "}",
         "",
         "new Main(makeD3Svg())",
         "    .draw(",
         "        {list: makeNodes(333)},",
         "        {list: makeEdges(222)},",
         "        null",
         "    );",
     ].join('\n');
    </script>

</page-usage_tab-readme_tab-code-js>
