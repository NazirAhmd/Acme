import { Injectable } from "@angular/core";

import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import{tap,catchError,map} from "rxjs/operators";

@Injectable({
    providedIn:"root"
})
export class ProductService{
    private url:string="api/products/products.json";

    constructor(private http:HttpClient) {
    }

    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.url).pipe(
            tap(data=>console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
      }

    private handleError(err:HttpErrorResponse){
        let errorMessage="";
        if(err.error instanceof ErrorEvent ){
            errorMessage=`An error occurred ${err.error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);

    }
}