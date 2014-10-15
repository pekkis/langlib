/**
 * @jsx React.DOM
 */

var config = require('./../config');
var $ = require('jquery');
var React = require('react');
var Table = require('react-bootstrap/Table');
var Translation = require('./Translation')

var Translations = React.createClass({

    componentDidMount: function() {

        console.log(config.api + '/translation');
        console.log($.getJSON);

        var that = this;
        $.getJSON(config.api + '/translation').then(function(t) {
            that.setState({ translations: t })
        });
    },

    getInitialState: function() {

        return {
            translations: []
        };
    },

    render: function() {
    	
        var translationNodes = this.state.translations.map(function(t) { 
            
            console.log(t);

            return (<Translation key={t.key} t={t}></Translation>);
        });

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>fi</th>
                        <th>en</th>
                        <th>se</th>
                    </tr>
                </thead>

                <tbody>
                    {translationNodes}
                </tbody>

            </Table>
    	);
    }

});

module.exports = Translations;
