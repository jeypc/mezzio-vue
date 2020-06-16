let createPage = (name, object = {}, methods = {}) => {
    return Vue.component('page-' + name, {
        data    : () => Object.assign({content: ''}, object),
        methods : methods,
        mounted () {
            (new Promise( (resolve) => {
                fetch(
                    this.$route.path,
                    {
                        method: 'GET',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    }
                ).then(response =>  resolve(response.text()));
            })).then(result => this.content = result);
        },
        render : function (c) {
            if (this.content == '') {
                return;
            }

            return c(Vue.compile('<div>' + this.content + '</div>'));
        }
    });
}

export default createPage;