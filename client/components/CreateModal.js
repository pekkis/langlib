/**
 * @jsx React.DOM
 */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

// Our custom component is managing whether the Modal is visible
var CreateModal = React.createClass({

  handleSave: function() {

    var t = {
        key: this.refs.key.getDOMNode().value,
        translations: {
          fi: this.refs.fi.getDOMNode().value,
          en: this.refs.en.getDOMNode().value,
          sv: this.refs.sv.getDOMNode().value,
        }
    };

    this.props.handleSave(t);
    this.props.onRequestHide();

  },

  render: function () {
    return (
        <Modal title="Create new translation" onRequestHide={this.props.onRequestHide}>
          <div className="modal-body">
            
            <form>

              <label>key</label>
              <input className="form-control" ref="key" />

              <label>fi</label>
              <textarea ref="fi" className="form-control"></textarea>

              <label>en</label>
              <textarea ref="en" className="form-control"></textarea>

              <label>sv</label>
              <textarea ref="sv" className="form-control"></textarea>

            </form>

          </div>
          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
          </div>
        </Modal>
      );
  }
});

module.exports = CreateModal;
