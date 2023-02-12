import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product=new Product();
  constructor(private productService:ProductService,
              private cartService:CartService,
              private router:ActivatedRoute){}
  ngOnInit(): void {
      this.router.params.subscribe(()=>{
        this.handleProductDetails();
      })
  }
  handleProductDetails() {
    const productId:number=+this.router.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).subscribe(
      data=>{
        this.product=data;
      }
    )
  }
  addToCart(){
    const cartItem:CartItem=new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
