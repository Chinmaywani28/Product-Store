import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {


  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) { }

  @Input() 
  get cart() {
    return this._cart
  }

  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuantity = cart.items.map((item) => item.quantity)
    .reduce((prev, current) => prev + current , 0)
  }

  getTotal(items: Array<CartItem>) : number {
    console.log('items in header::',items )
    return this.cartService.getTotal(items)
  }

  onClearCart() : void{
    this.cartService.clearCart()
  }



  
  

}
