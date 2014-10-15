/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var Langlib = require('./components/Langlib.js');

// React dev tools enable haxor
window.React = React; 

React.renderComponent(Langlib(), document.getElementById('app'));
