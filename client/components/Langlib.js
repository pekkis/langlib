/**
 * @jsx React.DOM
 */

var React = require('react');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Translations = require('./Translations');

var Langlib = React.createClass({

	render: function() {
		return (
            <Grid fluid>
                
                <Row className="header">
                    <Col md={12}>
                        <h1>LangLib!</h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Translations></Translations>
                    </Col>
                </Row>
            </Grid>
		);
	}

});

module.exports = Langlib;
