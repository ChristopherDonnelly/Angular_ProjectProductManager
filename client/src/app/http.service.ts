import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){ }
    
    getProduct(id){
      return this._http.get(`/product/${id}`);
    }

    getProducts(){
      return this._http.get('/product');
    }

    createProduct(title, price, image_URL){
      return this._http.post('/product', { "title": title, "price": price, "image_URL": image_URL });
    }

    updateProduct(id, title, price, image_URL){
      return this._http.put(`/product/${id}`, { "title": title, "price": price, "image_URL": image_URL });
    }

    deleteProduct(id){
      return this._http.delete(`/product/${id}`);
    }
}
