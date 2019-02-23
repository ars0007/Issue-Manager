import { Component, OnInit } from "@angular/core";
import { IssueService } from "src/app/issue.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Issue } from "../../issue.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  id: string;
  issue: any = {};
  updateForm: FormGroup;

  constructor(
    private service: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.service.IssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get("title").setValue(this.issue.title);
        this.updateForm.get("responsible").setValue(this.issue.responsible);
        this.updateForm.get("description").setValue(this.issue.description);
        this.updateForm.get("severity").setValue(this.issue.severity);
        this.updateForm.get("status").setValue(this.issue.status);
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ["", Validators.required],
      responsible: "",
      description: "",
      severity: "",
      status: ""
    });
  }

  updateIssue(title, responsible, description, severity, status) {
    this.service
      .updateIssue(this.id, title, responsible, description, severity, status)
      .subscribe(() => {
        // this.snackbar.open("Issue updated successfully", "OK", {
        //   duration: 3000
        // });
        alert("Updated Successfully");
      });
  }
}
