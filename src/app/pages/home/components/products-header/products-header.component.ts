import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {


  @Output() onChangeColNumber = new EventEmitter<number>();
  @Output() sortUpdateEmit = new EventEmitter<any>();
  @Output() countUpdateEmit = new EventEmitter<number>();

  sort = 'desc';
  itemsOnPage = 12;


  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(sortString: string): void{
    this.sort = sortString
    this.sortUpdateEmit.emit(sortString)
  }

  ontotalItemsOnPage(totalItems: number): void{
    this.itemsOnPage = totalItems
    this.countUpdateEmit.emit(this.itemsOnPage);
  }

  onChangeitemsInRow(cols: number) : void{
    this.onChangeColNumber.emit(cols)
  }

}
