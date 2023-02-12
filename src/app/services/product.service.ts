import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate( thePage:number,pageSize:number, categoryNum:number): Observable<GetResponseProducts> {
    // need to build URL based on category id ,page
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryNum}`
                      +`&page=${thePage}&size=${pageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryNum:number): Observable<Product[]> {
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryNum}`;
    
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: String) : Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
  }
  searchProductsPaginate( thePage:number,pageSize:number, theKeyword:string):
                   Observable<GetResponseProducts> {
    // need to build URL based on category id ,page
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      +`&page=${thePage}&size=${pageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  
  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number):Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}