import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {


  @Output() onSelCategory = new EventEmitter<string>()

  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription =  this.storeService.getAllCategories().subscribe(resp => this.categories = resp);
  }

  onSelectCategory(category: string): void{
      this.onSelCategory.emit(category)
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe()
    }
  }



}
