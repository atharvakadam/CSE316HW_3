import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom'
import {Modal} from 'react-materialize';
import {Button} from 'react-materialize';
import {Timestamp} from 'firebase';
import { now } from 'moment';
import {firebase} from 'firebase';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    deleteList = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).delete().then(function(){
            console.log("The list was deleted successfully deleted!");
        })
    }

    updateListNameChange = () => {
        console.log(this.props)
        var name = document.getElementById('name').value
        name = name.trim()
        if (name === ''){
            name = '(No Name)'
        }
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({"name": name})
    }

    updateListOwnerChange = () => {
        var owner = document.getElementById('owner').value
        owner = owner.trim()
        if (owner === ''){
            owner = '(No Owner)'
        }
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({"owner": owner})
    }


    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        console.log()
    }

    render() {
        // const timestamp = now();
        // console.log('Timestamp is:' + timestamp)

        // this.props.firestore.collection('todoLists').doc(this.props.todoList.id).set({
        //     timestamp: now()
        // }, { merge: true });

        // this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
        // });
        

        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        
//<div className="right" id='list_trash'>&#128465;</div>
//header="Modal Header"
        console.log(this.props.history)
        return (
            <div className="container white">
            <Modal fixedFooter={false} actions={null} trigger={<div className="right" id='list_trash'>&#128465;</div>}>
                <p>Delete list?</p>
                <strong>Are you sure you want to delete this list?</strong>
                <br></br>
                <p></p>
                <div id="yes_no_buttons">
                   <Link to="/"><Button onClick={this.deleteList} waves="light" id="yesButton">Yes</Button></Link> 
                    <span> </span>
                    <Button modal='close' waves="light" id="noButton">No</Button>
                </div>
                <br></br>
                <p>This List will not be retrievable</p>
            </Modal>
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <span style={{paddingRight:'30px',paddingLeft:'10px'}}>Name:     </span>
                    <input style={{width:'70%'}} className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.updateListNameChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <span style={{paddingRight:'30px',paddingLeft:'10px'}}>Owner:   </span>
                    <input style={{paddingLeft:'30pxpx',width:'70%'}} className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.updateListOwnerChange} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

//<label style={{paddingBottom:'20px'}} htmlFor="email">Name</label>
//<label style={{paddingBottom:'20px'}} htmlFor="password">Owner</label>

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists'},
  ]),
)(ListScreen);