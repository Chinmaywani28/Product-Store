import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html' 
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Output() prodAddToCart = new EventEmitter<any>();
  @Input() products : Product = 
    {
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      rating: {}   
    }
  
  
  

  // product : Product | undefined = 
  //   {
  //     id: 1,
  //     title : 'Snickers',
  //     price: 50,
  //     category: 'chocklate',
  //     description: 'This is chocklate',
  //     image: 'https://via.placeholder.com/150'
  //   }
  
  constructor() { }

  ngOnInit(): void {
    
    
  }

  addToCart(): void {
    this.prodAddToCart.emit(this.products);
  }

}
