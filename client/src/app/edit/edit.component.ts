import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpService } from '../http.service';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
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
    this.productsService.location = "Edit Product";
  }

  ngOnInit() {

    this.title = {errors: ''}
    this.price = {errors: ''}
    this.error = false;
    
    this._route.params.subscribe((params: Params) => {
      console.log('Edit Product Id: '+params['id']);
      this.productsService.id = params['id'];

      let getProduct = this._httpService.getProduct(this.productsService.id);
      getProduct.subscribe(data => {
        console.log('Found Product Title: '+data['product'].title);
        this.productsService.title = data['product'].title;
        this.productsService.price = data['product'].price;
        this.productsService.image_URL = (data['product'].image_URL=='http://via.placeholder.com/165x115?text=No%20Image')?'':data['product'].image_URL;
      });
    });
  }

  update(id){
    let image_URL = (this.productsService.image_URL=='')?'http://via.placeholder.com/165x115?text=No%20Image':this.productsService.image_URL;

    let updateProduct = this._httpService.updateProduct(this.productsService.id, this.productsService.title, this.productsService.price, image_URL);
    updateProduct.subscribe(data => {
      if(data['message'] == 'Error'){
        // console.log(data['error'].errors.name.message)
        this.error = true;
        this.title.errors = (data['error'].errors.title)?data['error'].errors.title.message:'';
        this.price.errors = (data['error'].errors.price)?data['error'].errors.price.message:'';
        // console.log(data['error'].name, data['error'].message);
      }else{
	      // console.log(`Updated Product Title: ${data['product'].title} - Price: ${data['product'].price} - Image URL:  ${data['product'].image_URL}`);
	      // this.productsService.title = data['product'].title;
	      // this.productsService.title = data['product'].price;
	      // this.productsService.title = data['product'].image_URL;

	      this._router.navigate(['/products']);
      }
    });
  }

  delete(prod_id){
    console.log('Delete Product ID: '+prod_id);

    let deleteProduct = this._httpService.deleteProduct(prod_id);
    deleteProduct.subscribe(data => {
      console.log('Delete Product Title: '+data['product']);
      
      this._router.navigate(['/products']);
    });
  }

}
