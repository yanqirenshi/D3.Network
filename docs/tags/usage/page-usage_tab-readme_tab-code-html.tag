<page-usage_tab-readme_tab-code-html>

    <section class="section">
        <div class="container">
            <h1 class="title is-4">Html</h1>
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
         '&lt;head&gt;',
         '    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.min.js"&gt;&lt;/script&gt;',
         '',
         '    &lt;script src="https://yanqirenshi.github.io/D3.Svg/dist/beta/D3.Svg.js"&gt;&lt;/script&gt;',
         '    &lt;script src="./sketch.js"&gt;&lt;/script&gt;',
         '    &lt;script src="D3Network.js"&gt;&lt;/script&gt;',
         '&lt;/head&gt;',
         '&lt;body&gt;',
         '    &lt;svg id="scketchbook"&gt;&lt;/svg&gt;',
         '&lt;/body&gt;',
     ].join('\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    </script>

</page-usage_tab-readme_tab-code-html>
