import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;
  submitted = false;
  fileObject:any;
  product:any;
  constructor(private formBuilder: FormBuilder, private vividiasService : VivideaServicesService,private route: Router,private activatedRoute :  ActivatedRoute) { }

  ngOnInit(): void {
    this. getProductDetails();
    this.generateProductForm();
  }

  generateProductForm(){
    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      file: [''],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      batch_no: ['', Validators.required],
      mfg_date: ['', Validators.required],
      exp_date: ['', Validators.required]
    });
  }
  get f() { return this.updateProductForm.controls; }

  getProductDetails(){
   this.vividiasService.productDetail(this.activatedRoute.snapshot.params['_id']).subscribe((result:any)=>{
      this.product = result[0];
      console.log(this.product);
      this.updateProductForm.patchValue({
        name: this.product.name,
        brand: this.product.brand,
        batch_no:this.product.batch_no,
        category:this.product.category,
        mfg_date: this.product.mfg_date,
        exp_date: this.product.exp_date

      });
  },(error)=>{
    console.log(error)
  })
  }
  
  udateProduct(){
    this.submitted = true;
    console.log(this.updateProductForm.value.image)
    // stop here if form is invalid
    if (this.updateProductForm.invalid) {
        return;
    }
    var formData = new FormData();
    formData.append('_id',this.activatedRoute.snapshot.params['_id'] );
    formData.append('name', this.updateProductForm.value.name);
    formData.append('file', this.fileObject);
    formData.append('brand', this.updateProductForm.value.brand);
    formData.append('category', this.updateProductForm.value.category);
    formData.append('batch_no', this.updateProductForm.value.batch_no);
    formData.append('mfg_date', this.updateProductForm.value.mfg_date);
    formData.append('exp_date', this.updateProductForm.value.exp_date);
    this.vividiasService.updateProduct(formData).subscribe((result:any)=>{
      alert("Product Updated Successfully");
      this.route.navigate(['/admin']);
    },(error)=>{
        console.log(error);
    })
  }

  onFileChnage(file){
    this.fileObject = file;
  }

}
