import { Component, OnInit } from '@angular/core';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor(private vividiasService : VivideaServicesService,private route: Router) { }
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

  updateProduct(id){
    this.route.navigate(['/update-product',id]);
  }

  deleteProduct(id){
    var result = confirm("Want to delete?");
    if (result) {
      this.vividiasService.deleteProducts(id).subscribe((result:any)=>{
        alert("Product Deleted successfully");
        this.getProducts();
      },(error)=>{
         console.log(error);
      })
    }
  }
  addProduct(){
    this.route.navigate(['/add-product']);
  }

}
