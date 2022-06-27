export class Customer {
    city:string;
    country:string;
    custID:string;
    fullName:string;
    postCode:string;
    region:string;
    segment:{segID:string; segName:string;};
    state:string;
    constructor (custID:string, fullName:string, segID:string, segName:string, country:string, city:string, state:string, postCode:string, region:string) {
        this.city = city;
        this.country = country;
        this.custID = custID;
        this.fullName = fullName;
        this.postCode = postCode;
        this.region = region;
        this.segment ={segID, segName};
        this.state = state;
    }
}