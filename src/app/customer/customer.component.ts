import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, FirestoreDataConverter, getDoc, getDocs, getFirestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customerID:string = '';
  @Input() customer:any;
  
  customerReturned:any;
  orderList:any[]=[];

  orders: Observable<any[]> = new Observable();

  constructor(firestore: AngularFirestore) {

    
    // this.ref = firestore.collection('Customer').snapshotChanges();

    
    // console.log("custID",this.customerID);
    // console.log("get",check);
    

  }

  // let check = firestore.collection('Customer').get();
  
  async getCust(custID:string) {
    const customerConverter:FirestoreDataConverter<Customer> = {
      toFirestore: (customer:any) => {
        let segID=customer.segment.segID;
        let segName=customer.segment.segName;
        return {
            City: customer.city,
            Country: customer.country,
            CustID: customer.custID,
            FullName: customer.fullName,
            PostCode: customer.postCode,
            Region: customer.region,
            Segment: {segID, segName},
            State: customer.state,
            tate: customer.state,
            country: customer.country
            };
    },
      fromFirestore: (snapshot:any, options:any) => {
          const data = snapshot.data(options);
          return new Customer(data.CustID, data.FullName, data.Segment.SegID, data.Segment.SegName, data.Country, data.City, data.State, data.PostCode, data.Region);
      }
  };

    const db = getFirestore();
    const docRef = doc(db, "Customer", custID).withConverter(customerConverter);
    // const docRef = doc(db, "Customer", custID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      return null;
    }
    
  }
  async getCustOrders(custID:string) {

    const db = getFirestore();

    const querySnapshot = await getDocs(collection(db, "Customer", custID, "Order"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let data = doc.data()
      data['id']=doc.id;
      this.orderList.push(data);
    });

    // console.log(this.orderList);
    
  }

  ngOnInit(): void {
    this.getCustOrders(this.customer.id);
    // this.customerReturned = this.getCust(this.customer.id);
  }

  update(){
    this.orderList=[];
    this.getCustOrders(this.customer.id);
  }

}
