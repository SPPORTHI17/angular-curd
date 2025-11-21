import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { employeemodel } from './module/employee';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: employeemodel = new employeemodel();
  employeelist: employeemodel[] = [];

  constructor(){
    debugger;
    this.createForm()
   const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeelist = parseData;
    } 
   
  }
  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailid: new FormControl(this.employeeObj.emailid),
      phonenumber: new FormControl(this.employeeObj.phonenumber),
      address: new FormControl(this.employeeObj.address),
      pincode: new FormControl(this.employeeObj.pincode),

    })
  }


  onsave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeForm.controls["empid"].setValue(parseData.length +1);
      this.employeelist.unshift(this.employeeForm.value)
    }
    else{
       this.employeelist.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeelist))
    }


    onEdit(item: employeemodel ) {
      this.employeeObj = item;
      this.createForm()
    }


    onUpdate(){
      const record= this.employeelist.find(m=>m.empid == this.employeeForm.controls['empid'].value)
      if(record != undefined){
        record.name = this.employeeForm.controls['name'].value;
        record.city = this.employeeForm.controls['city'].value;
        record.state = this.employeeForm.controls['state'].value;
        record.emailid = this.employeeForm.controls['emailid'].value;
        record.phonenumber = this.employeeForm.controls['phonenumber'].value;
        record.address = this.employeeForm.controls['address'].value;
        record.pincode = this.employeeForm.controls['pincode'].value;

      }
      localStorage.setItem("EmpData", JSON.stringify(this.employeelist));
      this.employeeObj = new employeemodel();
      this.createForm()
    }


    onDelete(id: number){
      const isDelete = confirm ("Are you sure want to delete the data");
      if(isDelete){
        const index = this.employeelist.findIndex (m=>m.empid ==id)
        this.employeelist.splice(index,1);
        localStorage.setItem("EmpData", JSON.stringify(this.employeelist));
      }

    }
  }

