import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpService } from '../http.service';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
  title: any;
  price: any;
  error: boolean;

  constructor(
    public productsService: ProductsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) {
    this.productsService.clear();
    this.productsService.location = "Create New Product";
  }

  ngOnInit() {

    this.title = {errors: ''}
    this.price = {errors: ''}
    this.error = false;
  }

  add(){

    let addProduct = this._httpService.createProduct(this.productsService.title, this.productsService.price, this.productsService.image_URL);
    addProduct.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = true;
        this.title.errors = (data['error'].errors.title)?data['error'].errors.title.message:'';
        this.price.errors = (data['error'].errors.price)?data['error'].errors.price.message:'';
      }else{
        this._router.navigate(['/products']);
      }
    });
  }

  cancel(){
    console.log('Cancel Edit!');

    this._router.navigate(['/products']);
  }

}
