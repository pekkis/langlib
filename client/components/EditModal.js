/**
 * @jsx React.DOM
 */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

// Our custom component is managing whether the Modal is visible
var EditModal = React.createClass({

  handleSave: function() {

    var t = {
        id: this.props.t.id,
        key: this.props.t.key,
        translations: {
          fi: this.refs.fi.getDOMNode().value,
          en: this.refs.en.getDOMNode().value,
          sv: this.refs.sv.getDOMNode().value,
        }
    };

    console.log(this.props.t);
    console.log(t);

  },

  render: function () {
    return (
        <Modal title={this.props.t.key} onRequestHide={this.props.onRequestHide}>
          <div className="modal-body">
            
            <form>

              <label>fi</label>
              <textarea ref="fi" className="form-control" defaultValue={this.props.t.translations.fi}></textarea>

              <label>en</label>
              <textarea ref="en" className="form-control" defaultValue={this.props.t.translations.en}></textarea>

              <label>sv</label>
              <textarea ref="sv" className="form-control" defaultValue={this.props.t.translations.sv}></textarea>

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

module.exports = EditModal;
