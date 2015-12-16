var QuoteBox = React.createClass({
    render: function () {
        return (
            <div>
                "All's well that ends well. - Someone
            </div>
        )
    }
})

var Button = React.createClass({
    render: function () {
        return (
            <button>Generate</button>
        )
    }
});

var Main = React.createClass({

    getDefaultProps: function () {
        return {
            quotes: [
                {body: 'I like everything but chocolate.', author: 'Mike Hock'},
                {body: 'Chocolate. Chocolate is great.', author: 'Lege Ende'},
            ]
        }
    },
    
    randomQuote: function () {
        return this.props.quotes[Math.floor(Math.random() * 2)]
    },

    render: function () {

        console.log(this.randomQuote());
        return (
            <div>
                <Button />
                <QuoteBox />
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));