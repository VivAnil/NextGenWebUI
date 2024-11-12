import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
        clients_details = [
    {
         "ID": "BN-0001",
        "bnName": "Arti Singh",
        "dob": "27-05-1980",
        "age": "25",
        "dor": "03-10-2023",
        "fatherName": "Somesh Singh",
        "motherName": "Rati Singh",
        "gender": "Female",
        "mobile": "9765467379",
        "state": "Assam",
        "district": "Nagoan",
        "block": "Block 1",
        "districts": "Nagoan",
        "village": "Rampura",
        "gram": "Gram Panchayat",
        "pincode": "230090",
        "religion": "Hindu",
        "marital": "Married",
        "social": "OBC",
        "economoic": "BPL",
        "qualification": "10th",
        "disability": "20%",
        "spName": "Aman Verma",
        "spID": "SP-0001",
        "services": "SN1,SN2,SN3",
        "address": "Nagaon, Assam",
        "email": "abc@gmail.com",
        "pancard": "1",
        "adhaar": "",
        "digitalService": "1",
        "loan": "1",
        "cash": "",
        "financialService": "1",
        "ration": "1",
        "pension": "",
        "governmentCompliance": "1",
        "earnedbyservice": "12,400",
        "earnedbyincentives": "4,600",
        "totalEarnings": "17,000",
        "totalserviceworth" : "26,000"

    },
{
         "ID": "BN-0002",
        "bnName": "Suman Singh",
"ob": "20-02-1982",
"age": "45",
        "dor": "25-09-2023",
        "fatherName": "Abhishek Singh",
        "motherName": "Rupali Singh",
"gender": "Female",
"mobile": "9730230922",
"state": "Assam",
"district": "Nagoan",
"block": "Block 1",
"districts": "Nagoan",
"village": "Rampura",
"gram": "Gram Panchayat",
"pincode": "230090",                
"Occupation": "Farmer",
"religion": "Hindu",
        "marital": "Married",
        "social": "OBC",
        "economoic": "BPL",
"qualification": "10th",
"disability": "20%",
"spName": "Aman Verma",
        "spID": "SP-0001",
        "services": "SN1,SN2,SN3",
"address": "Nagaon, Assam",
"email": "abc@gmail.com",
"pancard": "",
"adhaar": "1",
"digitalService": "1",

        "loan": "1",
        "cash": "",
        "financialService": "1",

"ration": "1",
"pension": "",
"governmentCompliance": "1"

    },
{
         "ID": "BN-0003",
        "bnName": "Arti Singh",
"dob": "27-05-1980",
"age": "25",
        "dor": "03-10-2023",
        "fatherName": "Somesh Singh",
        "motherName": "Rati Singh",
"gender": "Female",
"mobile": "9765467379",
"state": "Assam",
        "district": "Nagoan",
"block": "Block 1",
"districts": "Nagoan",
"village": "Rampura",
"gram": "Gram Panchayat",
"pincode": "230090",				
"Occupation": "Farmer",
"religion": "Hindu",
        "marital": "Married",
        "social": "OBC",
        "economoic": "BPL",
"qualification": "10th",
"disability": "20%",
"spName": "Aman Verma",
        "spID": "SP-0001",
        "services": "SN1,SN2,SN3",
"address": "Nagaon, Assam",
"email": "abc@gmail.com",
"pancard": "",
"adhaar": "1",
"digitalService": "1",

        "loan": "2",
        "cash": "",
        "financialService": "2",

"ration": "1",
"pension": "",
"governmentCompliance": "1"

    },
{
         "ID": "BN-0004",
        "bnName": "Arti Singh",
"dob": "27-05-1980",
"age": "25",
        "dor": "03-10-2023",
        "fatherName": "Somesh Singh",
        "motherName": "Rati Singh",
"gender": "Female",
"mobile": "9765467379",
"state": "Assam",
        "districts": "Nagoan",
"block": "Block 1",
"di": "Nagoan",
"village": "Rampura",
"gram": "Gram Panchayat",
"pincode": "230090",				
"Occupation": "Farmer",
"religion": "Hindu",
        "marital": "Married",
        "social": "OBC",
        "economoic": "BPL",
"qualification": "10th",
"disability": "20%",
"spName": "Aman Verma",
        "spID": "SP-0001",
        "services": "SN1,SN2,SN3",
"address": "Nagaon, Assam",
"email": "abc@gmail.com",
"pancard": "1",
"adhaar": "1",
"digitalService": "2",

        "loan": "1",
        "cash": "",
        "financialService": "1",

"ration": "2",
"pension": "",
"governmentCompliance": "2"

    }  

];

  constructor() { }

  ngOnInit(): void {
  }
  uniqueBeneficiaries()
  {
 
			return false;
  }
}
