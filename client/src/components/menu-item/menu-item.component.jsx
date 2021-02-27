import React from'react';
import {withRouter} from 'react-router-dom';

import './menu-item.styles.scss'

const MenuItem= ({title, imageUrl, size,history ,linkUrl, match})=>(
    <div 
    onClick={()=> history.push(`${match.url}${linkUrl}`)}
    className= {`${size} menu-item`}>
        <div
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        className='background-image'/>
                <div className="content">
                    <h1 className='title'>
                        {title}
                    </h1>
                    <span className='subtitle'>Shop Now </span>
                </div>
            </div>
)

export default withRouter(MenuItem);