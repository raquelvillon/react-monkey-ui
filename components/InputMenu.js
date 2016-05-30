import React, { Component } from 'react'

class InputMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="menu-bubble" className="menu-bubble" style={{display : this.props.visible ? "block" : "none"}}>
				{/*<div className="menu-bubble-item" onClick={this.props.enableGeoInput}><i id="mky-menu-location-icon" className="demo-icon mky-location">&#xe815;</i><p>Send Location</p></div>*/}
				<div className="menu-bubble-item" onClick={this.props.handleAttach}><i id="mky-menu-attach-icon" className="demo-icon mky-attach">&#xe82a;</i> <div>Attach File</div></div>
				<div className="menu-bubble-item" onClick={this.props.handleAttach}><i id="mky-menu-attach-file" className="demo-icon mky-attach">&#xe82b;</i><div>File</div></div>
				<div id="layer-menu" onClick={this.props.toggleVisibility} ></div>
			</div>
		)
	}
}

export default InputMenu;