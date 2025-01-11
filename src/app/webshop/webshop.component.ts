import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-webshop',
  standalone: false,
  
  templateUrl: './webshop.component.html',
  styleUrl: './webshop.component.scss'
})
export class WebshopComponent {

  userArray : any[] = [];


  name: string ="";
  email: string ="";

  currentUserId="";

  constructor(private http: HttpClient )
  {
    this.getAllUsers();
  }

  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "email" : this.email
    };
 
    this.http.post("http://localhost:8089/api/v1/webshop/user/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Successfully");
        this.getAllUsers();
 
        this.name = '';
        this.email = '';
    });
  }

  getAllUsers()
  {
    
    this.http.get("http://localhost:8089/api/v1/webshop/user/getAll")
  
    .subscribe((resultData: any)=>
    {
    
        console.log(resultData);
        this.userArray = resultData;
    });
  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.email = data.email;
   this.currentUserId = data.id;
   
  }


 
  UpdateRecords()
  {
    let bodyData = {
     
      "name" : this.name,
      "email" : this.email,
    };
    
    this.http.post("http://localhost:8089/api/v1/webshop/user/update"+ "/" + this.currentUserId , bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Updated")
        this.getAllUsers();
 
        this.name = '';
        this.email = '';
    });
  }
 
  save()
  {
    if(this.currentUserId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://localhost:8089/api/v1/webshop/user/delete"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log('Deleting user with ID:', data.id);
        console.log(resultData);
        alert("User Deleted")
        this.getAllUsers();
 
        this.name = '';
        this.email = '';
  
    });
 
  }


}

