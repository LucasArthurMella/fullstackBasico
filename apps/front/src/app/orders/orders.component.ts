import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number
}

interface ProductsWithQuantities {
  product: Product;
  productId: string;
  quantity: number;
}

interface Order {
  _id: string;
  productsWithQuantities: ProductsWithQuantities[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],

  providers:[AuthService],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private http = inject(HttpClient);
  constructor(private authService: AuthService){}

  products: Product[] = [];
  orders: Order[] = [];
  currentOrder:ProductsWithQuantities [] = [];
  selectedProductId: string | null = null;
  quantity: number = 1;

  ngOnInit(){
    this.getProducts();
    this.getOrders();
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
              price: cur.price
            }
            return product;
          })
        });
    }
  }
  getOrders(){
    this.authService.checkLoginState();
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`
    })

    if(bearerToken){
      this.http.get(`${environment.API_URL}/orders`, {headers})
        .subscribe((data) => {
          const listedProducts = data as any[];
          this.orders = listedProducts.map((cur) => {

            const productsWithQuantities = cur.productsWithQuantities.map((cur: any) => ({
              productId: cur._id,
              product: {
                id: cur._id,
                name: cur.productName,
                price: cur.price,
                description: cur.description
              },
              quantity: cur.quantity
            }));

            let product = {
              _id: cur._id,
              productsWithQuantities
            }

            return product;
          })
        });
    }
  }

  addToCurrentOrder() {
    if (this.selectedProductId && this.quantity > 0) {

      const existingItem = this.currentOrder.find(item => item.product._id === this.selectedProductId!);
      if (existingItem) {
        existingItem.quantity += this.quantity;
      } else {
        const currentProduct = this.products.find((cur) => cur._id == this.selectedProductId);
        this.currentOrder.push({ product: currentProduct!, quantity: this.quantity, productId: this.selectedProductId});
      }
      this.selectedProductId = null;
      this.quantity = 1;
    }
  }

  finalizeOrder() {

    if (this.currentOrder.length > 0){
    this.authService.checkLoginState();
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`
    })

    if(bearerToken){

      const body = {
        productsWithQuantities: this.currentOrder.map((cur) =>({
          productId: cur.productId,
          quantity: cur.quantity
        }))
      };

      this.http.post(`${environment.API_URL}/orders`, body, {headers})
        .subscribe((_data) => {
          this.getOrders();
          this.currentOrder = [];
        });
      }
    }
  }

  cancelOrder() {
    this.currentOrder = [];
  }

}
