import React from 'react';
// import jquery from 'jquery';
import { Modal, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class ItemCard extends React.Component {

    hoverEvent = (event) =>{
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = document.getElementsByClassName('fixed-action-btn').FloatingActionButton.init(elems, {
              direction: 'left'
            });
        // document.addEventListener('DOMContentLoaded', function() {
        //     console.log('FUCKSHITFUCK')
            
        //   });
    }

    moveItemUp = (e,todoList,item) => {
        e.preventDefault();
        console.log('MoveItemUp')
        console.log(todoList.items)
        console.log(item)
        var newItemsList = todoList.items;
        var listItemIndex = item.key;
        console.log(newItemsList[item.key])
        if(item.key!=0){
            let temp = newItemsList[listItemIndex];
            newItemsList[listItemIndex] = newItemsList[listItemIndex-1];
            newItemsList[listItemIndex-1] = temp

            let tempKey = newItemsList[listItemIndex].key;
            newItemsList[listItemIndex].key = newItemsList[listItemIndex-1].key;
            newItemsList[listItemIndex-1].key = tempKey
        }

        this.props.firestore.collection('todoLists').doc(todoList.id).update({items:newItemsList});
    }

    moveItemDown = (e,todoList,item) => {
        e.preventDefault();
        console.log('MoveItemDown')
        console.log(todoList.items)
        console.log(item)
        var newItemsList = todoList.items;
        var listItemIndex = item.key;
        console.log(newItemsList[item.key])
        if(item.key!=newItemsList.length-1){
            let temp = newItemsList[listItemIndex];
            newItemsList[listItemIndex] = newItemsList[listItemIndex+1];
            newItemsList[listItemIndex+1] = temp

            let tempKey = newItemsList[listItemIndex].key;
            newItemsList[listItemIndex].key = newItemsList[listItemIndex+1].key;
            newItemsList[listItemIndex+1].key = tempKey
        }

        this.props.firestore.collection('todoLists').doc(todoList.id).update({items:newItemsList});
        
    }

    deleteItem = (e,todoList,item) => {
        e.preventDefault();
        console.log('DeleteItem')
        console.log(item);
        console.log(todoList.items)
        console.log(item)
        var newItemsList = todoList.items;
        var listItemIndex = item.key;
        // var itemKey = newItemsList[item.key].key
        // console.log(newItemsList[item.key].key)
        console.log('BEFORE' )
        console.log(newItemsList)
        newItemsList.splice(item.key,1);
        console.log('AFTER')
        console.log(newItemsList)
        for(let i=item.key;i<newItemsList.length;i++){
            
            newItemsList[i].key = newItemsList[i].key - 1;
        }
        console.log('Final list to replace:')
        console.log(newItemsList)
        // for(let i=listItemIndex+1;i<newItemsList.length;i++){
        //     newItemsList[i].key = newItemsList[i].key - 1;
        // }

        this.props.firestore.collection('todoLists').doc(todoList.id).update({items:newItemsList});

    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
            
                <div id="list_item_card" className="card-content grey-text text-darken-3">
                    <span style={{fontSize:'16px',paddingLeft:'27px',paddingTop:'20px'}} id="itemDescription" className="card-title">{item.description}</span>
                    <span id="itemDueDate" className="card-content">{item.due_date}</span>
                    <span id="itemCheckBox" id={item.completed?'list_item_card_completed':'list_item_card_not_completed'} className="card-content">{item.completed?'Completed':'Pending'}</span>
                    <br></br>
                    
                    <span style={{top:'50px'}} className="list_item_card_toolbar1" >
                        <Button style={{position:'relative'}} floating fab={{direction: 'left'}} className="red right" large>
                            <span className="list_item_card_toolbar2">
                                <Button disabled={item.key!==0?false:true} floating icon={<Icon>arrow_upward</Icon>} className={item.key!==0?'green':'disabled'} onClick={(e) => this.moveItemUp(e,this.props.todoList,item)}/>
                                <Button disabled={(item.key!==(this.props.todoList.items.length-1))?false:true} floating icon={<Icon>arrow_downward</Icon>} className={(item.key!==(this.props.todoList.items.length-1))?'green':'disabled'} onClick={(e) => this.moveItemDown(e,this.props.todoList,item)} />
                                <Button floating icon={<Icon>delete</Icon>} className="green" onClick={(e) => this.deleteItem(e,this.props.todoList,item)}/>
                            </span>    
                        </Button>
                    </span>
                </div>
                <div style={{paddingLeft:'50px',fontSize:'14px'}} id="itemAssignedTo" className="card-content grey-text text-darken-3">{"Assigned to:" + item.assigned_to}</div>
            </div>
        );
    }
}
 
// <span className="list_item_card_toolbar">
//                         <Button onClick={(e) => this.moveItemUp(e,this.props.todoList,item)}>UP</Button>
//                         <Button onClick={(e) => this.moveItemDown(e,this.props.todoList,item)}>DN</Button>
//                         <Button onClick={(e) => this.deleteItem(e,this.props.todoList,item)}>RE</Button>
//                     </span>


// <Button style={{position:'relative'}} floating fab={{direction: 'left'}} className="red right" large>
//                         <Button floating icon={<Icon>arrow_upward</Icon>} className="green" />
//                         <Button floating icon={<Icon>arrow_downward</Icon>} className="green" />
//                         <Button floating icon={<Icon>delete</Icon>} className="green" />
//                     </Button>



// <div class="fixed-action-btn horizontal right" style={{position:"relative"}} onMouseOver={this.hoverEvent}>
//                             <a class="btn-floating btn-large red">
//                             <i class="large material-icons">mode_edit</i>
//                             </a>
//                             <ul>
//                             <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
//                             <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
//                             <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
//                             <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
//                             </ul>
//                     </div>

// <a id='FAB' class="btn-floating halfway-fab waves-effect waves-light red" onMouseOver={this.hoverEvent} >
//                         <i class="large material-icons">mode_edit</i>
//                         <ul>
//                             <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
//                             <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
//                             <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
//                             <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
//                         </ul>
//                     </a>


//class="fixed-action-btn horizontal"
//class="btn-floating halfway-fab waves-effect waves-light red"
//id={item.completed? "list_item_card_completed":"list_item_card_not_completed"}
// <ul>
//                             <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
//                             <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
//                             <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
//                             <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
//                         </ul>

// <a class="btn-floating halfway-fab waves-effect horizontal" ><i class="material-icons">mode_edit</i>
//                 <ul>
//                     <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
//                     <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
//                     <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
//                     <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
//                 </ul>
//             </a>



const mapStateToProps = (state, ownProps) => {
    console.log("OWNPROPS:")
    console.log(ownProps);
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
)(ItemCard);
