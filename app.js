var QuoteBox = React.createClass({
    render: function () {
        return (
            <div>
                '{this.props.quote.quoteText}' - {this.props.quote.quoteAuthor}
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
            <a className="twitter-share-button" href={link} data-size="large">
                Tweet
            </a>
        )
    }
})

var Button = React.createClass({
    render: function () {
        return (
            <button onClick={this.props.generate}>Generate</button>
        )
    }
});

var Main = React.createClass({

    getDefaultProps: function () {
        return {
            quotes: [
                {body: 'Life is 10% what happens to you and 90% how you react to it.', author: 'Charles R. Swindoll'},
                {body: 'How people treat you is their karma; how you react is yours.', author: 'Wayne Dyer'},
                {body: 'It\'s not what happens to you, but how you react to it that matters.', author: 'Epictetus'},
                {body: 'People react to fear, not love; they don\'t teach that in Sunday School, but it\'s true.', author: 'Richard M. Nixon'},
                {body: 'When we meet real tragedy in life, we can react in two ways - either by losing hope and falling into self-destructive habits, or by using the challenge to find our inner strength. Thanks to the teachings of Buddha, I have been able to take this second way.', author: 'Dalai Lama'},
            ]
        }
    },


    getInitialState: function () {
        return {
            currentQuote: {}
        }
    },


    getQuote: function () {
        var link = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp';
        $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
            .done(function (data) {
                console.log('done', data);
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
            <div>
                <Button generate={this.handleGenerate}/>
                <QuoteBox quote={this.state.currentQuote}/>
                <TweetBtn quote={this.state.currentQuote}></TweetBtn>
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));