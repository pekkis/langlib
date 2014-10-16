/**
 * @jsx React.DOM
 */

var config = require('./../config');
var $ = require('jquery');
var React = require('react/addons');
var Table = require('react-bootstrap/Table');
var Translation = require('./Translation');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');
var CreateModal = require('./CreateModal');
var EditModal = require('./EditModal');


var Translations = React.createClass({

    componentDidMount: function() {
        
        $.getJSON(config.api + '/api/translation').then(function(t) {
            this.setTranslations(t);
        }.bind(this));
    },

    setTranslations: function(t) {
        t.sort(function (a, b) {
            return a.key > b.key;
        });

        this.setState({ translations: t })
    },

    getInitialState: function() {

        return {
            translations: [],
            edit: null,
            create: false
        };
    },

    handleEdit: function(key) {
        this.setState({ edit: key });
    },

    handleSave: function(t) {
                
        var edit = this.state.edit;

        $.post(config.api + "/api/translation/" + this.state.translations[edit].id, t).then(function(ret) { 

            var ts = this.state.translations;
            ts[edit] = t;
            this.setState({translations: ts});
            
        }.bind(this));
    },

    handleCreate: function(t) {

        $.post(config.api + "/api/translation", t).then(function(ret) { 

            var ts = this.state.translations;
            ts.push(ret);
            this.setState({translations: ts});            
            
        }.bind(this));

    },

    requestCreate: function() {
        this.setState({create: true});
    },


    handleClose: function() {
        this.setState({edit: null, create: false});
    },

    render: function() {

        var translationNodes = this.state.translations.map(function(t, key) { 
            return (<Translation onClick={this.handleEdit.bind(this, key)} key={key} t={t}></Translation>);
        }.bind(this));

        var editNode = '';
        if (this.state.edit !== null) {
            editNode = (<EditModal onRequestHide={this.handleClose} t={this.state.translations[this.state.edit]} handleSave={this.handleSave} />);
        };

        var createNode = '';
        if (this.state.create) {
            createNode = (<CreateModal onRequestHide={this.handleClose} handleSave={this.handleCreate} />);
        };

        return (
            <div>
                {editNode}
                {createNode}
                
                <div className="controls">
                    <Button bsStyle="primary" onClick={this.requestCreate}>Add a new translation</Button>
                </div>

                <Table striped bordered hover>
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

                <div className="controls">
                     <Button bsStyle="primary" onClick={this.requestCreate}>Add a new translation</Button>
                </div>

            </div>
    	);
    }

});

module.exports = Translations;
