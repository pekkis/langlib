/**
 * @jsx React.DOM
 */

var React = require('react');
var Button = require('react-bootstrap/Button');

var Translation = React.createClass({

    render: function() {
        return (
            <tr>
                <td><Button bsStyle="warning" onClick={this.props.onClick}>Edit</Button></td>
                <td>{this.props.t.key}</td>
                <td>{this.props.t.translations['fi']}</td>
                <td>{this.props.t.translations['en']}</td>
                <td>{this.props.t.translations['sv']}</td>
            </tr>
        );
    }

});

module.exports = Translation;
