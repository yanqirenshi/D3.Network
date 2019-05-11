<cdn-versions>

    <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
            <th>Version</th>
            <th>File</th>
            <th>Url</th>
        </thead>

        <tbody>
            <tr each={cdn in CDNs()}>
                <td each={col in cdn}
                    rowspan={col.span.row}>
                    <div if={col.url}><a href={col.url}>{col.name}</a></div>
                    <span if={!col.url}>{col.name}</span>
                </td>
            </tr>
        </tbody>
    </table>

    <script>
     this.CDNs = () => {
         let out = [];

         for (let cdn of this.opts.sources)
             for (let i in cdn.files) {
                 let rec = [];

                 if (i==0)
                     rec.push({
                         name: cdn.version,
                         url: null,
                         span: {
                             row: cdn.files.length
                         }
                     })

                 let file = cdn.files[i];
                 rec.push({
                     name: file.name,
                     url: null,
                     span: { row: 1 },
                 });

                 rec.push({
                     name: file.url,
                     url: file.url,
                     span: { row: 1 },
                 });

                 out.push(rec);
             }

         return out;
     };
    </script>

</cdn-versions>
