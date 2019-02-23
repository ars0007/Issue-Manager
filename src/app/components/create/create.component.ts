import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm:FormGroup;

  constructor(private service:IssueService,private fb:FormBuilder,private router:Router) { 
    this.createForm=this.fb.group(
      {
        title:['',Validators.required],
        responsible:'',
        description:'',
        severity:''
      }
    );
  }

  ngOnInit() {
  }
  newIssue(title,responsible,description,severity){
    this.service.addIssue(title,responsible,description,severity).subscribe(()=>
    {
      this.router.navigate(['/list']);
    })
  }

}
