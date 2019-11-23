<home_page-cdn>

    <section class="section">
        <div class="container">
            <h1 class="title">CDN</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <cdn-versions sources={cdns}></cdn-versions>
            </div>
        </div>
    </section>

    <script>
     this.cdns = [
         {
             version: 'Version 0.0.1',
             files: [
                 { name: 'D3Network.js',   url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Network.js' },
                 { name: 'D3Base.js',      url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Base.js' },
                 { name: 'D3Edges.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Edges.js' },
                 { name: 'D3Nodes.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Nodes.js' },
                 { name: 'D3Ruler.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Ruler.js' },
                 { name: 'D3Simulator.js', url: 'https://yanqirenshi.github.io/D3.Network/dist/0.0.1/D3Simulator.js' },
             ]
         },
         {
             version: 'Edge Version',
             files: [
                 { name: 'D3Network.js',   url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Network.js' },
                 { name: 'D3Base.js',      url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Base.js' },
                 { name: 'D3Edges.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Edges.js' },
                 { name: 'D3Nodes.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Nodes.js' },
                 { name: 'D3Ruler.js',     url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Ruler.js' },
                 { name: 'D3Simulator.js', url: 'https://yanqirenshi.github.io/D3.Network/dist/edge/D3Simulator.js' },
             ]
         },
     ]
    </script>

</home_page-cdn>
