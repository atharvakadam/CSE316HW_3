import React, { Component } from 'react'
import Button from 'react-materialize/lib/Button'
import Checkbox from 'react-materialize/lib/Checkbox'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

export class ItemScreen extends Component {



    addNewItem = () => {
        // var pathArray = this.props.location.pathname.split('/');
        
        // var todoListId = pathArray.pop();
        var newItem = {
            assigned_to: this.refs.itemAssignedTo.value,
            completed: this.refs.itemCheckBox.checked,
            description:this.refs.itemDescription.value,
            due_date: this.refs.itemDueDate.value,
            key:this.props.itemNo}



        //console.log(this.props.firestore.collection('todoLists').doc(this.props.id).data)
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({items: firebase.firestore.FieldValue.arrayUnion(newItem)});
        
        
    }

    editItem = () => {

        var newItem = {
            assigned_to: this.refs.itemAssignedTo.value,
            completed: this.refs.itemCheckBox.checked,
            description:this.refs.itemDescription.value,
            due_date: this.refs.itemDueDate.value,
            key:this.props.itemNo}



        this.props.firestore.collection("todoLists").doc(this.props.todoList.id).get().then(doc=> {
            const data =doc.data();
            // data.items[this.props.itemNo].description = 
            // data.items[this.props.itemNo].assigned_to = 
            // data.items[this.props.itemNo].due_date = 
            // data.items[this.props.itemNo].completed = this.refs.itemCheckBox;
            data.items[this.props.itemNo] = newItem;

            this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({items:data.items})
            // console.log(data.items[this.props.itemNo]);
        });
    }

    // returnBackToList = (){
    //     return <Redirect to={'/todoList/' + Identity }/>
    // }

    render() {
            // console.log(this.props.match.params.id)
            // console.log(this.props.match.params.key)
            // console.log(this.props.firestore.collection('todoLists').doc(this.props.match.params.id).get())
            
            console.log(this.props.firestore.collection('todoLists').doc(this.props.todoList.id).data)
            const item = this.props.todoList.items[this.props.itemNo]
            const Identity = this.props.todoList.id
            console.log('ITem' + item)

        

        return (

            <div>
                <div class="containter white">
                    <br></br>
                    <p><strong>Item</strong></p>
                    <br></br>
                        <div className="text_toolbar">
                            <span>Description:      </span>
                            <input ref='itemDescription' type="text" defaultValue={item?item.description:'Unknown'} />  
                        </div>
                    <br></br>
                        <div className="text_toolbar">
                            <span>Assigned To:      </span>
                            <input ref='itemAssignedTo' type="text" defaultValue={item?item.assigned_to:'Unknown'} />  
                        </div>
                    <br></br>
                        <div className="text_toolbar">
                            <span>Date:      </span>
                            <input ref='itemDueDate' type="date" defaultValue={item?item.due_date:''}/>  
                        </div>
                    <br></br>
                        <div className="text_toolbar">
                            <span>Completed:      </span>
                            <label>
                            <input ref='itemCheckBox' type="checkbox" defaultChecked={item?(item.completed):false} />
                            <span></span>
                            </label>
                            
                            
                        </div>
                    <br></br>
                    <br></br>
                        <div>
                            <Link to={'/todoList/' + Identity }><Button onClick={item?this.editItem:this.addNewItem}>Submit</Button></Link>
                            <span> </span>
                            <Link to={'/todoList/' + Identity }><Button id="cancelButton">Cancel</Button></Link>
                            
                        </div>
                    <br></br>


                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps)
    const { id } = ownProps.match.params;
    console.log(id)
    const { todoLists } = state.firestore.data;
    console.log(state.firestore.data)
    console.log(todoLists)
    var todoList = todoLists ? todoLists[id] : null;
    console.log(todoList)
    todoList.id = id;
    const itemNo = ownProps.match.params.key
    console.log(itemNo)
    return {
        itemNo,
        todoList,
        auth: state.firebase.auth,
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);

//this.props.todoList.items[this.props.key].description