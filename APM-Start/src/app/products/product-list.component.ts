import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.filterProductsMethod(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    products: IProduct[];

    constructor(private productService: ProductService) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            data => {
                this.products = data;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }

    filterProductsMethod(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((item: IProduct) =>
            item.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    OnStarClicked(value: string): void {
        this.pageTitle = "Product Rating: " + value;
    }
}