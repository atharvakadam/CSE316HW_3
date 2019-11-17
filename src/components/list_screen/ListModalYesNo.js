import React, { Component } from 'react'

export class ListModalYesNo extends Component {
    render() {
        return (
            <div id="modal_background" >
                    <div id="modal_yes_no_dialog" >
                        {this.props.children}
                        <p>Delete list?</p>
                        <strong>Are you sure you want to delete this list?</strong>
                        <p></p>
                        <div id="yes_no_buttons">
                            <button id="yesButton" onClick={this.removeListandGoHome}>Yes</button>
                            <button id="noButton" onClick={this.props.closeModal}>No</button>    
                        </div>
                        <p>This List will not be retrievable</p>
                    </div>
            </div>
        )
    }
}

export default ListModalYesNo
