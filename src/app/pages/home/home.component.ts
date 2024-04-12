import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

const ROWS_HEIGHT : { [id: number]: number }  = {
    1: 400,
    3: 335,
    4: 350
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {


  colsNumber = 3
  rowHeight = ROWS_HEIGHT[this.colsNumber]

  category!: string 
  products!: Array<Product>
  sort = 'desc';
  count = 12;
  productSubscription : Subscription | undefined

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
  }

  onChangeOfCols(event: any){
    this.colsNumber = event;
    this.rowHeight = ROWS_HEIGHT[this.colsNumber]

  }

  getSelectedCategory(newCategory: string){
    this.category = newCategory;
    console.log("category::",this.category )
    this.getProducts()
  }

  addToCart(product: Product) {
    console.log("prod::", product)
    let productObj = {
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id 
    }
    this.cartService.addToCart(productObj);
  }

  getProducts(){
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((resp) =>{
        console.log("all prod from api::", resp)
        this.products = resp;
      })
  }

  updateSorting(sortString: string){
    this.sort = sortString;
    this.getProducts()
  }

  updateCount(count: number){
    this.count = count;
    this.getProducts()
  }
}
