import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { doc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { collectionGroup, query, getDocs, getFirestore } from "firebase/firestore";  
@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  @Input() customer:any;
  @Input() order:any;
  @Output() updateEvent = new EventEmitter();

  Product:any;
  ShipMode:any;
  Quantity:any;
  OrderDate:any;
  ShipDate:any;

  displayStyle:any = "none";

  Products:any[]=[];
  ShipModes:any[]=[];

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
    this.getShipMode();

    this.Product=this.order.Product.ProdID;
    this.ShipMode=this.order.ShipMode;
    this.Quantity=this.order.Quantity;
    this.OrderDate=this.order.OrderDate.toDate().toISOString().split('T')[0];
    this.ShipDate=this.order.ShipDate.toDate().toISOString().split('T')[0];

  }

  async getProducts(){
    const db = getFirestore();
    const products = query(collectionGroup(db, 'Product'));
    const querySnapshot = await getDocs(products);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.Products.push(doc.data());
    });
    console.log(this.Products);
  }

  async getShipMode(){
    const db = getFirestore();
    const products = query(collectionGroup(db, 'Shipping'));
    const querySnapshot = await getDocs(products);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.ShipModes = doc.data()['ShipMode'];
    });
  }

  openPopup(){
    this.displayStyle="block";
  }
  closePopup(){
    this.displayStyle="none";
  }

  async updateOrder(){
    const db = getFirestore();
    console.log(this.customer, this.Product, this.Products.find(product=>product.ProdID==this.Product), this.ShipMode, this.Quantity, Timestamp.fromDate(new Date(this.OrderDate)), Timestamp.fromDate(new Date(this.OrderDate)));
    await updateDoc(doc(db, "Customer", this.customer, "Order", this.order.id), {
      Product: this.Products.find(product=>product.ProdID==this.Product),
      ShipMode: this.ShipMode,
      Quantity: this.Quantity,
      OrderDate: Timestamp.fromDate(new Date(this.OrderDate)),
      ShipDate: Timestamp.fromDate(new Date(this.OrderDate))
    });
    this.displayStyle="none";
    this.updateEvent.emit();
  }
}
