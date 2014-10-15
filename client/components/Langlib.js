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
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <Translations></Translations>
                    </Col>
                </Row>
            </Grid>
		);
	}

});

module.exports = Langlib;
