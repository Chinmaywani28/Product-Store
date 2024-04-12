import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private snackbar : MatSnackBar) { }

  cart = new BehaviorSubject<Cart>({items: []});


  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items]; // dup array ie items

    const itemsInCart = items.find((_item) => _item.id === item.id)
    console.log('itemsInCart',itemsInCart)
    if(itemsInCart){
      itemsInCart.quantity += 1; 
    }else{
      items.push(item);
    }

    this.cart.next({items})
    this.snackbar.open('1 item added to cart', 'Ok', {duration: 3000});
    console.log("items in cart::", this.cart.value)
  }

  removeQuantity(item: CartItem){
    let itemForRemoval : CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if(_item.id === item.id){
        _item.quantity--;

        if(_item.quantity === 0){
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if(itemForRemoval) {
     filteredItems = this.removeSingleItemInCart(itemForRemoval, false)
    }

    this.cart.next({items: filteredItems })
    this.snackbar.open('1 item removed from cart.','Ok', {duration: 3000})

  }

  getTotal(items: Array<CartItem>) {
    const result =  items.map((ele) => ele.price * ele.quantity).reduce((pre , current) => pre + current , 0)
    console.log('result::', result);
    
    return result;
  }

  clearCart(): void {
    this.cart.next({items: []});
    this.snackbar.open('Your cart is cleared','Ok',{duration: 3000})
  }

  removeSingleItemInCart(item: CartItem, update = true): Array<CartItem> {
      const filteredItems =  this.cart.value.items.filter((_item) => _item.id !== item.id )

      if(update){
      this.cart.next({items: filteredItems })
      this.snackbar.open('item is removed from cart', 'Ok', {duration: 3000})
      }

      return filteredItems
      
  }





}
