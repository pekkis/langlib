/**
 * @jsx React.DOM
 */

var React = require('react');

var Translation = React.createClass({

    render: function() {

        return (

            <tr>
                <td><a href="#" onClick={this.props.onClick}>{this.props.t.id}</a></td>
                <td>{this.props.t.key}</td>
                <td>{this.props.t.translations['fi']}</td>
                <td>{this.props.t.translations['en']}</td>
                <td>{this.props.t.translations['sv']}</td>
            </tr>
        );
    }

});

module.exports = Translation;
