<page-usage>

    <section-header title="Data"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-usage_tab-readme        class="hide"></page-usage_tab-readme>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme',        label: 'README',        tag: 'page-usage_tab-readme' },
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
