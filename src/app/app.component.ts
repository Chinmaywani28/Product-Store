import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  
   constructor(private cartService: CartService) {}

   cart : Cart = {items : []}

   ngOnInit(): void{
      this.cartService.cart.subscribe((items : any) => {
          console.log("cart items::", items)
          this.cart = items;
      })
   }



}
