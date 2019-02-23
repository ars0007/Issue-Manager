import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class IssueService {
  uri = "localhost:8000";

  constructor(private http: HttpClient) {}

  getIssues() {
    return this.http.get("http://localhost:8000/display");
  }
  IssueById(id) {
    return this.http.get(`http://localhost:8000/getIssueById/${id}`);
  }
  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post("http://localhost:8000/post", issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`http://localhost:8000/update/${id}`, issue);
  }
  deleteIssue(id) {
    return this.http.get(`http://localhost:8000/delete/${id}`);
  }
}
