import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private http: HttpClient
  ) { }

  cart: Cart = {
    items: [
        // {
        //   product: 'https://via.placeholder.com/150',
        //   name: 'Snickers',
        //   price: 50,
        //   quantity: 2,
        //   id: 1

        // },
        // {
        //   product: 'https://via.placeholder.com/150',
        //   name: 'Chocklate',
        //   price: 5,
        //   quantity: 10,
        //   id: 2
          
        // }
  ]
  }
  dataSource: Array<CartItem> = []
  displayedColumns: Array<string> = [
    'Product',
    'Name',
    'Price',
    'Quantity',
    'Total',
    'Action'
  ]



  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((cart: Cart) =>{
      this.cart = cart
    })

    
  }

  getTotal(items: Array<CartItem>){
    const result =  items.map((ele) => ele.price * ele.quantity).reduce((pre , current) => pre + current , 0)
    return result;
  }

  onClearCart(){
    this.cartService.clearCart();
  }

  onRemoveSingleItem(item: CartItem){
    console.log("Clicked")
    this.cartService.removeSingleItemInCart(item);

  }

  onAddQuantity(item: CartItem){
    this.cartService.addToCart(item);  
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item)
  }

  onCheckOut(){
    console.log("abdd")
    this.http.post(`http://localhost:4242/checkout`, {
      items: this.cart.items
    }).subscribe(async (resp:any) =>{
        let stripe = await loadStripe(`pk_test_51P2vzkSGsAovPjpmGM9BtpzdD4WqHSu3h6AIe2rzDnHgrflcp2QVfPTZwe2JSW18zLn8GvXL7mpaBqqSsjE6EvmN009rxQd6pX`);
        stripe?.redirectToCheckout({
          sessionId: resp.id
        })
    })
  }
}
