import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  editing: boolean;
}

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    TextFieldModule
  ],
  providers:[AuthService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private http = inject(HttpClient);
  products: Product[] = [];

  constructor(private authService: AuthService){}

  async ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.authService.checkLoginState();
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`
    })

    if(bearerToken){
      this.http.get(`${environment.API_URL}/products`, {headers})
        .subscribe((data) => {
          const listedProducts = data as Product[];
          this.products = listedProducts.map((cur) => {
            const product = {
              _id: cur._id,
              name: cur.name,
              description: cur.description,
              price: cur.price,
              editing: false
            }
            return product;
          })
        });
    }
  }

  newProduct: Product = {_id: "", name: '', description: '', price: 0, editing: false };

  addProduct() {
    if (this.newProduct.name.trim() && this.newProduct.description.trim() && this.newProduct.price >= 0.01) {
    this.authService.checkLoginState();
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`
    })

    if(bearerToken){
      const body = {
        name:this.newProduct.name,
        description:this.newProduct.description,
        price:this.newProduct.price
      };
      this.http.post(`${environment.API_URL}/products`, body, {headers})
        .subscribe((_data) => {
          this.getProducts();
          this.newProduct = {_id:"", name: '', description: '', price: 0, editing: false };
        });
    }
    }
  }

  deleteProduct(id: string) {
    this.authService.checkLoginState();
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`
    })
    this.http.delete(`${environment.API_URL}/products/${id}`, {headers})
      .subscribe((_data) => {
        this.getProducts();
        this.newProduct = {_id:"", name: '', description: '', price: 0, editing: false };
      });
  }

  editProduct(id: string) {
    this.products.find((cur) => cur._id == id)!.editing = true;
  }

  saveEdit(id: string, name: string, description: string, price: number) {

    console.log("aaa");
    if (name.trim() && description.trim() && price >= 0.01) {
      this.authService.checkLoginState();
      const bearerToken = this.authService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`
      })
      if(bearerToken){
        const body = {
          name,
          description,
          price
        };
        this.http.put(`${environment.API_URL}/products/${id}`, body, {headers})
          .subscribe((_data) => {
            this.getProducts();
          });
      }
    }

   }

  cancelEdit(id: string) {
    this.products.find((cur) => cur._id == id)!.editing = false;
  }
}
