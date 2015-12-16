var QuoteBox = React.createClass({
    render: function () {

        return (
            <div className="QuoteBox">
                <div className="QuoteText">'{this.props.quote.quoteText}'</div>
                <div className="QuoteAuthor">{this.props.quote.quoteAuthor}</div>
            </div>
        )
    }
});

var TweetBtn = React.createClass({
    render: function () {

        var body = encodeURI(this.props.quote.quoteText);
        body = body.replace(/;/gi, " -");
        var author = encodeURI(this.props.quote.quoteAuthor);

        var formattedQuote = "\"" + body + "\" - " + author;

        var link = "https://twitter.com/intent/tweet?text=" + formattedQuote;

        return (
            <a className="Twitter" href={link} data-size="large">
                Tweet
            </a>
        )
    }
})

var Button = React.createClass({
    render: function () {
        return (
            <button className="Button" onClick={this.props.generate}>Generate</button>
        )
    }
});

var Main = React.createClass({

    getInitialState: function () {
        return {
            currentQuote: {}
        }
    },

    getQuote: function () {
        var link = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp';
        $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
            .done(function (data) {
                this.setState({currentQuote: data})
            }.bind(this))
            .fail(function (err) {
                console.log('err:', err);
            });

    },

    handleGenerate: function () {
        this.getQuote();
    },

    componentDidMount: function () {
        this.getQuote();
    },


    render: function () {

        return (
            <div className="Main">
                <Button generate={this.handleGenerate}/>
                <QuoteBox quote={this.state.currentQuote}/>
                <TweetBtn quote={this.state.currentQuote}/>
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));