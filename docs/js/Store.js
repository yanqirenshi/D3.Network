class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'home_page',
            },
            {
                code: "usage",
                menu_label: 'Usage',
                tag: 'page-usage',
            },
            {
                code: "data",
                menu_label: 'Data',
                tag: 'page-data',
            },
            {
                code: "classes",
                menu_label: 'Class',
                tag: 'page-classes',
            },
        ];
    }
    init () {
        let data = {
            site: {
                active_page: 'home',
                home_page: 'home',
                pages: this.pages(),
            }
        };

        this._contents = Immutable.Map(data);
        return this;
    }
}
