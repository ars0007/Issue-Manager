import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { Issue } from "../../issue.model";
import { IssueService } from "src/app/issue.service";
import { from } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  // issues: Issue[] = [
  //   {
  //     title: "Ac not working",
  //     responsible: "Saubhik",
  //     severity: "Critical",
  //     status: "Open",
  //     id: "1234",
  //     description: "jkdsjf,dsjf,"
  //   }
  // ];
  issues: any = [];
  displayedColumns = ["title", "responsible", "severity", "status", "actions"];

  constructor(private service: IssueService, private router: Router) {}

  ngOnInit() {
    this.fetchIssues();
  }
  fetchIssues() {
    this.service.getIssues().subscribe(data => {
      this.issues = data;
      console.log(data);
    });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id) {
    this.service.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
