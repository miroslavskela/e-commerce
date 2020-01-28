import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/11.2 shopping-bag.svg.svg';
import {connect} from 'react-redux';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';

import {toggleCartHidden} from '../../redux/cart/cart.actions';
import React from 'react'

function CartIcon({toggleCartHidden, itemCount}) {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemCount:selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden:() => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)