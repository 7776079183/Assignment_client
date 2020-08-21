import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLogout:Boolean = false;
  constructor( private router:Router) {
    if(localStorage.getItem('vivideas_token')){
      this.showLogout = true;
    }else{
      this.showLogout = false;
    }
   }

  ngOnInit(): void {
    
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
