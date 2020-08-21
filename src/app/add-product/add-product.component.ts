import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  submitted = false;
  fileObject:any;

  constructor(private formBuilder: FormBuilder, private vividiasService : VivideaServicesService,private route: Router,) { }

  ngOnInit(): void {
    this.generateProductForm();
  }

  generateProductForm(){
    this.addProductForm = this.formBuilder.group({
      sku_id: ['', Validators.required],
      name: ['', Validators.required],
      file: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      batch_no: ['', Validators.required],
      mfg_date: ['', Validators.required],
      exp_date: ['', Validators.required]
    });
  }
  get f() { return this.addProductForm.controls; }

  addProduct(){
    this.submitted = true;
    console.log(this.addProductForm.value.image)
    // stop here if form is invalid
    if (this.addProductForm.invalid) {
        return;
    }
    var formData = new FormData();
    formData.append('sku_id', this.addProductForm.value.sku_id);
    formData.append('name', this.addProductForm.value.name);
    formData.append('file', this.fileObject);
    formData.append('brand', this.addProductForm.value.brand);
    formData.append('category', this.addProductForm.value.category);
    formData.append('batch_no', this.addProductForm.value.batch_no);
    formData.append('mfg_date', this.addProductForm.value.mfg_date);
    formData.append('exp_date', this.addProductForm.value.exp_date);
    this.vividiasService.addProduct(formData).subscribe((result:any)=>{
      alert("Product Added Successfully");
      this.route.navigate(['/admin']);
    },(error)=>{
      console.log(error)
       alert("Duplicate sku_id");
    })
  }

  onFileChnage(file){
    this.fileObject = file;
  }

}
