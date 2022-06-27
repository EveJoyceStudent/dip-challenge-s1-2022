import { collectionGroup, query, where, getDocs, getFirestore } from "firebase/firestore";  
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { addDoc, doc, setDoc, Timestamp, collection } from "@angular/fire/firestore";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  @Input() customer:any;
  @Output() createEvent = new EventEmitter();

  displayStyle:any="none";

  Product:any;
  ShipMode:any;
  Quantity:number = 1;
  OrderDate:any = new Date().toISOString().split('T')[0];
  ShipDate:any = new Date().toISOString().split('T')[0];

  Products:any[]=[];
  ShipModes:any[]=[];

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
    this.getShipMode();

  }

  async getProducts(){
    const db = getFirestore();
    const products = query(collectionGroup(db, 'Product'));
    const querySnapshot = await getDocs(products);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.Products.push(doc.data());
    });
    this.Product=this.Products[0].ProdID;
  }

  async getShipMode(){
    const db = getFirestore();
    const products = query(collectionGroup(db, 'Shipping'));
    const querySnapshot = await getDocs(products);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        this.ShipModes = doc.data()['ShipMode'];
    });
    this.ShipMode=this.ShipModes[0];
  }


  async newOrder(){
    const db = getFirestore();
    console.log(this.customer, this.Product, this.Products.find(product=>product.ProdID==this.Product), this.ShipMode, this.Quantity, Timestamp.fromDate(new Date(this.OrderDate)), Timestamp.fromDate(new Date(this.OrderDate)));
    await addDoc(collection(db, "Customer", this.customer, "Order"), {
      Product: this.Products.find(product=>product.ProdID==this.Product),
      ShipMode: this.ShipMode,
      Quantity: this.Quantity,
      OrderDate: Timestamp.fromDate(new Date(this.OrderDate)),
      ShipDate: Timestamp.fromDate(new Date(this.OrderDate))
    });
    this.createEvent.emit();
    this.closePopup();
  }

  openPopup(){
    this.displayStyle="block";
  }
  closePopup(){
    this.displayStyle="none";
  }

}
