import { Component, OnInit } from '@angular/core';

// test Models
import { TestModel } from 'bn-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test_vessel: TestModel;
  constructor() { }

  ngOnInit() {
    // Test a model from bn-models
    this.test_vessel = new TestModel();
    this.test_vessel.vessel_name = 'Test Successful.';
  }

}
