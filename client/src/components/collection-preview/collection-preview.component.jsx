import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import {withRouter} from 'react-router-dom';
import './collection-preview.styles.scss'
import {Link} from 'react-router-dom'
class CollectionPreview extends React.Component{
    // console.log(otherCollectionProps);
    // console.log(title);
       constructor(props) {
   super(props);


}
    

    render(){
        var title= this.props.title;
        var items = this.props.items;
        var history1=this.props.history;
        //console.log(this.props)
        return(
    <div className='collection-preview'>
        <Link to={`${this.props.match.url}/${title.toLowerCase()}`}>
        <h1 className='title' >{title.toUpperCase()}</h1>
        </Link>
        <div className='preview'>
            {
                items
                .filter((item, idx)=>idx<4)
                .map((item)=>(
                   <CollectionItem key={item.id} item={item}/>
                ))

                
            }
        </div>

    </div>
)}
}

export default withRouter(CollectionPreview);