import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-four0four',
  templateUrl: './four0four.component.html',
  styleUrls: ['./four0four.component.css']
})

export class Four0fourComponent implements OnInit {

  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productsService.location = "Product not found:";
  }

}
