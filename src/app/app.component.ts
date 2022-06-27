import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories: Observable<any[]> = new Observable();
  customers: Observable<any[]> = new Observable();
  currentCustomer='9nDGmC0gec9zB0S509bi';
  constructor(firestore: AngularFirestore){
    this.categories = firestore.collection('Category').valueChanges({idField: 'id'});
    this.customers = firestore.collection('Customer').valueChanges({idField: 'id'});
    
  }
  title = 'dip-challenge-ng';
}
