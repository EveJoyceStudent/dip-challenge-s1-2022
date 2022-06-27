import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { CustomerComponent } from './customer/customer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddOrderComponent } from './add-order/add-order.component';
import { DisplayOrderComponent } from './display-order/display-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AddOrderComponent,
    DisplayOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
