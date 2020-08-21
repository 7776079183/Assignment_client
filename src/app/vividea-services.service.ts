import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VivideaServicesService {
  configUrl = "http://localhost:5000/api/"
  constructor(private http: HttpClient) { }
  /* Login User */
  loginUser(data) {
    return this.http.post<any>(this.configUrl + "login", data).pipe(map(res => {
      return res;
    }));
  }

  getProducts(){
    return this.http.get<any>(this.configUrl + "products").pipe(map(res => {
      return res;
    }));
  }

  deleteProducts(id){
    return this.http.delete<any>(this.configUrl + "delete-product/"+id).pipe(map(res => {
      return res;
    }));
  }

  addProduct(data){
    return this.http.post<any>(this.configUrl + "add-product", data).pipe(map(res => {
      return res;
    }));
  }

  productDetail(_id){
    return this.http.get<any>(this.configUrl + "products?_id="+_id).pipe(map(res => {
      return res;
    }));
  }

  updateProduct(data){
    return this.http.put<any>(this.configUrl + "update-product", data).pipe(map(res => {
      return res;
    }));
  }
}
