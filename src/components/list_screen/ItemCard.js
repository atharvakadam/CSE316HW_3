import React from 'react';

class ItemCard extends React.Component {

    hoverEvent = (event) =>{
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = document.getElementById('FAB').FloatingActionButton.init(elems, {
              direction: 'left'
            });
          });
    }


    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
            
                <div className="card-content grey-text text-darken-3">
                    <span className="card-content">{item.description}</span>
                    <span className="card-content">{item.due_date}</span>
                    <span id={item.completed?'list_item_card_completed':'list_item_card_not_completed'} className="card-content">{item.completed?'Completed':'Pending'}</span>
                    <div className="card-content">{"Assigned to:" + item.assigned_to}</div>
                    
                    <a id='FAB' class="btn-floating halfway-fab waves-effect waves-light red" onMouseOver={this.hoverEvent} >
                        <i class="large material-icons">mode_edit</i>
                        <ul>
                            <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                        </ul>
                    </a>

                </div>
            </div>
        );
    }
}

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
