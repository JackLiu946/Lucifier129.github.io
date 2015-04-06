define(function (require, exports, module) {
var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var Todo = React.createClass({

	getInitialState: function() {
		return {
			onEdit: false
		}
	},
	getClassName: function() {
		var className = []
		if (this.props.completed) {
			className.push('completed')
		}
		if (this.state.onEdit) {
			className.push('editing')
		}
		return className.join(' ')
	},

	handleBlur: function(e) {
		var newTitle = e.target.value.trim()
		this.setState({
			onEdit: false
		})
		if (newTitle && newTitle !== this.props.title) {
			this.updateTodo({
				title: newTitle,
				time: new Date().toLocaleString()
			})
		} else if (!newTitle) {
			this.removeTodo()
		}
	},

	handleKeyup: function(e) {
		var keyCode = e.keyCode
		if (keyCode === ENTER_KEY ||  keyCode === ESCAPE_KEY) {
			this.handleBlur(e)
		}
	},

	handleDblclick: function() {
		var editor = this.refs.editor.getDOMNode()
		editor.value = this.props.title
		this.setState({
			onEdit: true
		})
		setTimeout(function() {
			editor.focus()
		}, 20)
	},

	removeTodo: function() {
		this.props.removeTodo(this.props.id)
	},

	toggleTodo: function(e) {
		var options = {
			completed: e.target.checked
		}
		this.updateTodo(options)
	},

	updateTodo: function(options) {
		this.props.updateTodo({
			id: this.props.id,
			title: options.title || this.props.title,
			time: options.time || this.props.time,
			completed: options.completed !== undefined ? options.completed : this.props.completed
		})
	},

	render: function() {
		return (
			<li className={this.getClassName()} title={this.props.time}>
				<div className="view">
					<input className="toggle" type="checkbox" onChange={this.toggleTodo} checked={this.props.completed} />
					<label onDoubleClick={this.handleDblclick}>{this.props.title}</label>
					<button className="destroy" onClick={this.removeTodo}></button>
				</div>
				<input className="edit" onBlur={this.handleBlur} onKeyUp={this.handleKeyup} ref="editor" />
			</li>
			)
	}
})

module.exports = Todo
});