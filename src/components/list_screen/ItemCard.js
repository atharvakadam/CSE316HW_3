import React from 'react';
// import jquery from 'jquery';
import { Modal, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

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


    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
            
                <div className="card-content grey-text text-darken-3">
                    <span id="item_description" className="card-content">{item.description}</span>
                    <span id="item_due_date" className="card-content">{item.due_date}</span>
                    <span id="item_completed" id={item.completed?'list_item_card_completed':'list_item_card_not_completed'} className="card-content">{item.completed?'Completed':'Pending'}</span>
                    <br></br>
                    <span id="item_assigned_to" className="card-content">{"Assigned to:" + item.assigned_to}</span>
                    <span>
                    <Button style={{position:'relative'}} floating fab={{direction: 'left'}} className="red right" large>
                        <Button floating icon={<Icon>arrow_upward</Icon>} className="green" />
                        <Button floating icon={<Icon>arrow_downward</Icon>} className="green" />
                        <Button floating icon={<Icon>delete</Icon>} className="green" />
                    </Button>
                    </span>
                    
                    
                    
                    
                </div>
            </div>
        );
    }
}
                        




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




export default ItemCard;
