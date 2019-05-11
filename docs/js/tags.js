riot.tag2('app-page-area', '', '', '', function(opts) {
     this.on('update', (action) => {
         if (this.opts.route)
             ROUTER.draw(this, STORE.get('site.pages'), this.opts.route);
     });
});

riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <app-page-area></app-page-area> <section-footer></section-footer>', '', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };
     this.updateMenuBar = () => {
         if (this.tags['menu-bar'])
             this.tags['menu-bar'].update();
     }

     STORE.subscribe((action)=>{
         if (action.type=='MOVE-PAGE') {
             this.updateMenuBar();
             this.tags['app-page-area'].update({ opts: { route: action.route }});
         }
     });

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash=STORE.get('site.active_page');
});

riot.tag2('page-classes', '<section-header title="Data"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <page-classes_tab-readme class="hide"></page-classes_tab-readme> <page-classes_tab-d3nodes class="hide"></page-classes_tab-d3nodes> <page-classes_tab-d3edges class="hide"></page-classes_tab-d3edges> <page-classes_tab-d3simulator class="hide"></page-classes_tab-d3simulator> <page-classes_tab-d3base class="hide"></page-classes_tab-d3base> </div>', '', '', function(opts) {
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
});

riot.tag2('page-classes_tab-d3base', '<section class="section"> <div class="container"> <h1 class="title">D3Base</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-d3edges', '<section class="section"> <div class="container"> <h1 class="title">D3Edges</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-d3nodes', '<section class="section"> <div class="container"> <h1 class="title">D3Nodes</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-d3simulator', '<section class="section"> <div class="container"> <h1 class="title">D3Simulator</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">README</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('markdown-preview', '', 'markdown-preview h1 { font-weight: bold; font-size: 20px; margin-top: 11px; margin-bottom: 6px; } markdown-preview h2 { font-weight: bold; font-size: 18px; margin-top: 8px; margin-bottom: 4px; } markdown-preview h3 { font-weight: bold; font-size: 16px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h4 { font-weight: bold; font-size: 14px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h5 { font-weight: bold; font-size: 12px; margin-bottom: 4px; } markdown-preview * { font-size: 12px; } markdown-preview table { border-collapse: collapse; } markdown-preview td { border: solid 0.6px #888888; padding: 2px 5px; } markdown-preview th { border: solid 0.6px #888888; padding: 2px 5px; background: #eeeeee; }', '', function(opts) {
     this.on('update', () => {
         this.root.innerHTML = this.opts.data;
     });

    this.root.innerHTML = opts.data

});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label" onclick="{clickBrand}"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #ffffff; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #eaedf7; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #333333; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #ffffff; color: #333333; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #ffffff; color: #333333; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'link-a', href: '', label: 'Link A' },
             { code: 'link-b', href: '', label: 'Link B' },
             { code: 'link-c', href: '', label: 'Link C' },
         ]
         return moves.filter((d)=>{
             return d.code != this.opts.current;
         });
     };

     this.brandStatus = (status) => {
         let brand = this.refs['brand'];
         let classes = brand.getAttribute('class').trim().split(' ');

         if (status=='open') {
             if (classes.find((d)=>{ return d!='open'; }))
                 classes.push('open')
         } else {
             if (classes.find((d)=>{ return d=='open'; }))
                 classes = classes.filter((d)=>{ return d!='open'; });
         }
         brand.setAttribute('class', classes.join(' '));
     }

     this.clickBrand = () => {
         let panel = this.refs['move-panel'];
         let classes = panel.getAttribute('class').trim().split(' ');

         if (classes.find((d)=>{ return d=='hide'; })) {
             classes = classes.filter((d)=>{ return d!='hide'; });
             this.brandStatus('open');
         } else {
             classes.push('hide');
             this.brandStatus('close');
         }
         panel.setAttribute('class', classes.join(' '));
     };
});

riot.tag2('modal-description-editor', '<div class="modal {isActive()}"> <div class="modal-background"></div> <div class="modal-content" style="width: 88vw;"> <div class="card"> <div class="card-content" style="height: 88vh;"> <div style="display:flex; height: 100%; width: 100%;flex-direction: column;"> <div style="margin-bottom:11px;"> <h1 class="title is-4">{title()} の Description の変更</h1> </div> <div style="display:flex; flex-grow: 1"> <div style="flex-grow: 1;margin-right: 8px;"> <div class="element-container"> <h1 class="title is-5">Markdown</h1> <textarea class="input" ref="description" onkeyup="{inputDescription}">{description()}</textarea> </div> </div> <div style=";flex-grow: 1;margin-left: 8px;"> <div class="element-container"> <h1 class="title is-5">Preview</h1> <div class="preview" style="padding: 0px 11px 11px 11px;"> <markdown-preview data="{marked(markdown)}"></markdown-preview> </div> </div> </div> </div> <div style="margin-top:11px;"> <button class="button is-warning" onclick="{clickCancel}">Cancel</button> <button class="button is-danger" style="float:right;" onclick="{clickSave}">Save</button> </div> </div> </div> </div> </div> </div>', 'modal-description-editor .element-container { display:flex; height: 100%; width: 100%; flex-direction: column; } modal-description-editor .element-container .title{ margin-bottom:6px; } modal-description-editor .input { border: 1px solid #eeeeee; padding: 11px; box-shadow: none; height: 100%; width: 100%; } modal-description-editor .preview { border: 1px solid #eeeeee; flex-grow:1; }', '', function(opts) {
     this.markdown = null;

     this.clickCancel = () => {
         this.opts.callback('close-modal-description-editor');
     };
     this.clickSave = () => {
         this.opts.callback('save-column-instance-description', {
             object: this.opts.data,
             value: this.refs['description'].value,
         });
     };
     this.inputDescription = () => {
         this.markdown = this.refs['description'].value;

         this.tags['markdown-preview'].update();
     };

     this.description = () => {
         if (!this.markdown) {
             let obj = this.opts.data;

             this.markdown = !obj ? '' : obj.description;
         }

         return this.markdown;
     };
     this.title = () => {
         if (!this.opts.data)
             return '';

         let obj = this.opts.data;
         return obj._class + ':' + obj.name;
     };
     this.isActive = () => {
         return this.opts.data ? 'is-active' : '';
     };
});

riot.tag2('page-tabs', '<div class="tabs is-boxed"> <ul> <li each="{opts.core.tabs}" class="{opts.core.active_tab==code ? \'is-active\' : \'\'}"> <a code="{code}" onclick="{clickTab}">{label}</a> </li> </ul> </div>', 'page-tabs li:first-child { margin-left: 55px; }', '', function(opts) {
     this.clickTab = (e) => {
         let code = e.target.getAttribute('code');
         this.opts.callback(e, 'CLICK-TAB', { code: code });
     };
});

riot.tag2('section-breadcrumb', '<section-container data="{path()}"> <nav class="breadcrumb" aria-label="breadcrumbs"> <ul> <li each="{opts.data}"> <a class="{active ? \'is-active\' : \'\'}" href="{href}" aria-current="page">{label}</a> </li> </ul> </nav> </section-container>', 'section-breadcrumb section-container > .section,[data-is="section-breadcrumb"] section-container > .section{ padding-top: 3px; }', '', function(opts) {
     this.path = () => {
         let hash = location.hash;
         let path = hash.split('/');

         if (path[0] && path[0].substr(0,1)=='#')
             path[0] = path[0].substr(1);

         let out = [];
         let len = path.length;
         let href = null;
         for (var i in path) {
             href = href ? href + '/' + path[i] : '#' + path[i];

             if (i==len-1)
                 out.push({
                     label: path[i],
                     href: hash,
                     active: true
                 });

             else
                 out.push({
                     label: path[i],
                     href: href,
                     active: false
                 });
         }
         return out;
     }
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { background: #ffffff; padding-top: 13px; padding-bottom: 13px; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { background: #ffffff; }', '', function(opts) {
});

riot.tag2('section-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>機能</th> <th>概要</th> </tr> </thead> <tbody> <tr each="{data()}"> <td><a href="{hash}">{title}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = () => {
         return opts.data.filter((d) => {
             if (d.code=='root') return false;

             let len = d.code.length;
             let suffix = d.code.substr(len-5);
             if (suffix=='_root' || suffix=='-root')
                 return false;

             return true;
         });
     };
});

riot.tag2('cdn-versions', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <th>Version</th> <th>File</th> <th>Url</th> </thead> <tbody> <tr each="{cdn in CDNs()}"> <td each="{col in cdn}" rowspan="{col.span.row}"> <div if="{col.url}"><a href="{col.url}">{col.name}</a></div> <span if="{!col.url}">{col.name}</span> </td> </tr> </tbody> </table>', '', '', function(opts) {
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
});

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{code}</a></td> <td>{tag}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('page-data', '<section-header title="Data"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <page-data_tab-readme class="hide"></page-data_tab-readme> <page-data_tab-node-envelope class="hide"></page-data_tab-node-envelope> <page-data_tab-node-object class="hide"></page-data_tab-node-object> <page-data_tab-edge-envelope class="hide"></page-data_tab-edge-envelope> <page-data_tab-edge-object class="hide"></page-data_tab-edge-object> </div>', '', '', function(opts) {
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
});

riot.tag2('page-data_tab-edge-envelope', '<section class="section"> <div class="container"> <div class="contents"> <div class="contents"> <p><pre>\\{\n  ht: \\{ /* key: _id, value: Object */ \\},\n  list: [ /* Object ... */ ]\n\\}</pre></p> </div> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-data_tab-node-envelope', '<section class="section"> <div class="container"> <div class="contents"> <p><pre>\\{\n  ht: \\{ /* key: _id, value: Object */ \\},\n  list: [ /* Object ... */ ]\n\\}</pre></p> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-data_tab-node-object', '<section class="section"> <div class="container"> <div class="contents"> <p><pre>\\{\n    x: 0,\n    y: 0,\n    label: \\{\n        text: \'XYZ\',\n        font: \\{\n            size: 12\n        \\}\n    \\},\n    circle: \\{\n        r: 33,\n        fill: \'#eeeeee\',\n        stroke: \\{\n            color: \'#888888\',\n            width: 1\n        \\}\n    \\},\n    _id: 1,\n    _class: \'XXX\'\n    _core: \\{ /* 元となるデータ */ \\}\n\\}</pre></p> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-data_tab-edge-object', '<section class="section"> <div class="container"> <div class="contents"> <p><pre>\\{\n   source: 1,\n   target: 2\n    _core: \\{ /* 元となるデータ */ \\}\n\\}</pre></p> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-data_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">README</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('home_page', '<section-header title="HOME"></section-header> <section class="section"> <div class="container"> <h1 class="title">CDN</h1> <h2 class="subtitle"></h2> <div class="contents"> <cdn-versions sources="{cdns}"></cdn-versions> </div> </div> </section>', '', '', function(opts) {
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
});

riot.tag2('page_member', '<section-header title="Member"></section-header>', '', '', function(opts) {
     dump(this.opts._route)
});

riot.tag2('page_teams', '<section-header title="Teams"></section-header>', '', '', function(opts) {
});

riot.tag2('page-usage', '<section-header title="Data"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <page-usage_tab-readme class="hide"></page-usage_tab-readme> </div>', '', '', function(opts) {
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
});

riot.tag2('page-usage_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">README</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});
