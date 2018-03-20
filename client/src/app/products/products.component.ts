import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) {
    this.productsService.clear();
    this.productsService.location = "Products List";
  }

  ngOnInit() {
    this.getAllProducts();
  }

  edit(prod_id){
    console.log('Navigate to Edit with Product ID: '+prod_id);

    this._router.navigate(['/edit',prod_id]);
  }

  delete(prod_id){
    console.log('Delete Product ID: '+prod_id);

    let deleteProduct = this._httpService.deleteProduct(prod_id);
    deleteProduct.subscribe(data => {
      console.log('Delete Product Title: '+data['product'])
      this.getAllProducts();
    });
  }

  getAllProducts(){
    let listAllProducts = this._httpService.getProducts();
    listAllProducts.subscribe(data => {
      this.productsService.all = data['products'];
    });
  }

}
