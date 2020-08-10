Vue.component('heading', {
    render: function(createElement){
        return createElement(
            'h' + this.level,    // h1, h2 ...
            [
                createElement('a', {
                    attrs: {
                        name: 'headerId',
                        href: '#' + 'headerId'
                    }
                }, 'this is a tag')
            ]
        );
    }
});

// could be <h1><a href="#headerId">this is a tag</a></h1>