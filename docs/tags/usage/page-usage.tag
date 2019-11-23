<page-usage>

    <section-header title="Usage"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-usage_tab-readme_tab-graph></page-usage_tab-readme_tab-graph>
        <page-usage_tab-readme_tab-code-html></page-usage_tab-readme_tab-code-html>
        <page-usage_tab-readme_tab-code-js></page-usage_tab-readme_tab-code-js>
        <page-usage_tab-readme_tab-code-data></page-usage_tab-readme_tab-code-data>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'graph', label: 'Readme',          tag: 'page-usage_tab-readme_tab-graph' },
         {code: 'html',  label: 'Code:Html',       tag: 'page-usage_tab-readme_tab-code-html' },
         {code: 'js',    label: 'Code:Javascript', tag: 'page-usage_tab-readme_tab-code-js' },
         {code: 'data',  label: 'Code:Data',       tag: 'page-usage_tab-readme_tab-code-data' },
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

</page-usage>
