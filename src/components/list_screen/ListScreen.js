import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
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
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
            <div className="right" id='list_trash'>&#128465;</div>
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.updateListNameChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.updateListOwnerChange} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

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
    { collection: 'todoLists' },
  ]),
)(ListScreen);