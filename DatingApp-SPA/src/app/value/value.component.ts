import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
  providers: [ HttpClient ]
})
export class ValueComponent implements OnInit {
  values: any;
  URI_BASE: string = 'http://localhost:5000/api/values';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get(this.URI_BASE).subscribe(response => {
      this.values = response;
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
