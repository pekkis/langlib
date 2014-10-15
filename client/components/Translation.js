/**
 * @jsx React.DOM
 */

var React = require('react');

var Translation = React.createClass({

    render: function() {
    	
        console.log(this.props.t.translations);

        return (

            <tr>
                <td>{this.props.t.key}</td>
                <td>{this.props.t.translations['fi']}</td>
                <td>{this.props.t.translations['en']}</td>
                <td>{this.props.t.translations['se']}</td>
            </tr>
        );
    }

});

module.exports = Translation;
