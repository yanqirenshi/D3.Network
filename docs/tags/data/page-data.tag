<page-data>

    <section-header title="Data"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-data_tab-readme        class="hide"></page-data_tab-readme>
        <page-data_tab-node-envelope class="hide"></page-data_tab-node-envelope>
        <page-data_tab-node-object   class="hide"></page-data_tab-node-object>
        <page-data_tab-edge-envelope class="hide"></page-data_tab-edge-envelope>
        <page-data_tab-edge-object   class="hide"></page-data_tab-edge-object>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme',        label: 'README',        tag: 'page-data_tab-readme' },
         {code: 'node-envelope', label: 'Node Envelope', tag: 'page-data_tab-node-envelope' },
         {code: 'node-object',   label: 'Node Object',   tag: 'page-data_tab-node-object' },
         {code: 'edge-envelope', label: 'Edge Envelope', tag: 'page-data_tab-edge-envelope' },
         {code: 'edge-object',   label: 'Edge Object',   tag: 'page-data_tab-edge-object' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
    </script>

</page-data>
