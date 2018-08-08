# D3.NETWORK

# Usage

example

```js
     this.d3svg = null;
     this.simulator = new D3Simulator().make();

     this.refreshSvgSize = () => {
         let tag = this.refs.svg;

         tag.setAttribute('width',window.innerWidth);
         tag.setAttribute('height',window.innerHeight);
     }

     this.makeD3Svg = () => {
         return new D3Svg({
             d3: d3,
             svg: d3.select("page01-sec_root svg"),
             x: 0,
             y: 0,
             w: window.innerWidth,
             h: window.innerHeight,
             scale: 1
         });
     };

     this.draw = () => {
         // TODO: ここを解除する。
         // return;

         if (!this.refs.svg || !STORE.state().get('nodes') || !STORE.state().get('edges'))
             return;

         let d3svg = this.d3svg;

         new D3Base().draw(d3svg)
         new D3RuleLine().draw(d3svg, STORE.state().get('rules'));
         new D3Nodes().draw(d3svg,
                            STORE.state().get('nodes'),
                            this.simulator,
                            (type, data) => {
                                if (type=='click-circle')
                                    STORE.dispatch(ACTIONS.setDataToInspector(data));
                            });
         new D3Edges().draw(d3svg, STORE.state().get('edges'), this.simulator)
     }

     /* **************************************************************** *
      *   Events
      * **************************************************************** */
     this.on('mount', () => {
         this.refreshSvgSize();
         this.d3svg = this.makeD3Svg();
         this.draw();
     });

     this.on('update', () => {
         this.refreshSvgSize();
     });

     STORE.subscribe((action) => {
         if (action.type=='FETCHED-EDGES')
             this.draw();
     });
```
