import { Component, OnInit } from '@angular/core';
import { VivideaServicesService } from 'src/app/vividea-services.service';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.css']
})
export class CustomerProductComponent implements OnInit {
  constructor(private vividiasService : VivideaServicesService) { }
  products:any[];
  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.vividiasService.getProducts().subscribe((result:any)=>{
      this.products = result;
      console.log(this.products);
    },(error)=>{
       console.log(error);
    })
  }
}
