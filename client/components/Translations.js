/**
 * @jsx React.DOM
 */

var config = require('./../config');
var $ = require('jquery');
var React = require('react');
var Table = require('react-bootstrap/Table');
var Translation = require('./Translation');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');
var EditModal = require('./EditModal');

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
            translations: [],
            edit: null
        };
    },

    handleEdit: function(key) {
        this.setState({ edit: key });
    },

    handleHide: function(t) {
        alert('Close me!')
    },

    handleSave: function(t) {
        
        console.log(t);

        $.post(config.api + "/translation/" + t.id);
    },

    handleClose: function() {
        this.setState({edit: null});
    },

    render: function() {
    	
        console.log(this.state.translations, 'trans');

        var translationNodes = this.state.translations.map(function(t, key) { 
            return (<Translation onClick={this.handleEdit.bind(this, key)} key={key} t={t}></Translation>);
        }.bind(this));

        var modalNode = '';
        if (this.state.edit !== null) {
            modalNode = (<EditModal onRequestHide={this.handleClose} t={this.state.translations[this.state.edit]} handleSave={this.handleSave} />);
        };
       
        return (
            <div>
                {modalNode}
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>key</th>
                            <th>fi</th>
                            <th>en</th>
                            <th>sv</th>
                        </tr>
                    </thead>

                    <tbody>
                        {translationNodes}
                    </tbody>

                </Table>
            </div>
    	);
    }

});

module.exports = Translations;
