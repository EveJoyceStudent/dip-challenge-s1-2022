import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { doc, deleteDoc } from "firebase/firestore";

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.css']
})
export class DisplayOrderComponent implements OnInit {
  @Input() order:any;
  @Input() customer:any;
  @Output() updateEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  async deleteOrder(){
    const db = getFirestore();
    // console.log(this.order);
    await deleteDoc(doc(db, "Customer", this.customer, "Order", this.order.id));
    this.updateEvent.emit();
  }

}
