import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import Query from 'firebase'
import Direction from 'firebase';

class HomeScreen extends Component {

    handleNewList = () => {

        var newObject = {name:'Unknown', 
                        owner:'Unknown', 
                        items:[],
                        sortingCriteria:true,
                        timestamp:this.props.firestore.FieldValue.serverTimestamp()}  

        console.log(this.props.firestore.collection('todoLists').add(newObject));
    }

    updateTimeStamp = (id) =>{
        this.props.firestore.collection('todoLists').doc(id).update({timestamp:this.props.firestore.FieldValue.serverTimestamp()})
    }


    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        // this.props.firestore.collection("todoLists").orderBy("TimeStamp", 'asc')
        

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks updateTimeStamp={this.updateTimeStamp} />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists',orderBy:['timestamp','desc']},
    ]),
)(HomeScreen);