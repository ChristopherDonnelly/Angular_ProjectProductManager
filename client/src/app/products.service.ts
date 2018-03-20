import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

  location = '';
  id = '';
  title = '';
  price = '';
  image_URL = '';
  all = [];

  constructor() { }

  clear(){
    this.location = '';
    this.id = '';
    this.title = '';
    this.price = '';
    this.image_URL = '';    
  }
}
