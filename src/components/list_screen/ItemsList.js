import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ItemScreen from '../item_screen/ItemScreen';

var img1 = require('../../images/icons/AddItem.png');
// var key = this.props.todoList.length
class ItemsList extends React.Component {

    addItem = () => {
        var newItem = {
            assigned_to:'Unknown',
            completed:true,
            description:"Unknown",
            due_date: "2019-08-30",
            key:this.props.todoList.items.length
        }
        // key = key + 1
        // console.log(this.props.firestore.collection(this.props.todoList.id).items);
        // history.pushState(newItem,'idontknoe','/todoList/' + this.props.todoList.id + '/' + newItem.key)
        console.log(this.props.history)
        // this.props.history.push('/todoList/' + this.props.todoList.id + '/' + newItem.key);
        return <Redirect to={'/todoList/' + this.props.todoList.id + '/' + newItem.key} ><ItemScreen /></Redirect>
        

        // this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({items: firebase.firestore.FieldValue.arrayUnion(newItem)});
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );})
                }
                <div className = "center" onClick={this.addItem}>
                <img src={img1} alt=""></img>
                </div>    
            </div>
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);