<page-classes>

    <section-header title="Data"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-classes_tab-readme      class="hide"></page-classes_tab-readme>
        <page-classes_tab-d3nodes     class="hide"></page-classes_tab-d3nodes>
        <page-classes_tab-d3edges     class="hide"></page-classes_tab-d3edges>
        <page-classes_tab-d3simulator class="hide"></page-classes_tab-d3simulator>
        <page-classes_tab-d3base      class="hide"></page-classes_tab-d3base>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme',      label: 'Overview',    tag: 'page-classes_tab-readme' },
         {code: 'd3nodes',     label: 'D3Nodes',     tag: 'page-classes_tab-d3nodes' },
         {code: 'd3edges',     label: 'D3Edges',     tag: 'page-classes_tab-d3edges' },
         {code: 'd3simulator', label: 'D3Simulator', tag: 'page-classes_tab-d3simulator' },
         {code: 'd3base',      label: 'D3Base',      tag: 'page-classes_tab-d3base' },
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

</page-classes>
