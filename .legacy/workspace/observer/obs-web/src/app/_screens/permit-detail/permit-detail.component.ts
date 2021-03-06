import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { StateService } from '../../_services/data/state.service';
import { Permit } from '../../_models/permit'

@Component({
  selector: 'app-permit-detail',
  templateUrl: './permit-detail.component.html',
  styleUrls: ['./permit-detail.component.scss']
})
export class PermitDetailComponent implements OnInit {

  permit: Permit = this.stateSvc.currentState.permit
  captains = [
    {'name': 'Melina Shak', 'id': '2'},
    {'name': 'Nick Shaffer', 'id': '3'},
    {'name': 'Seth Gerou', 'id': '0'},
    {'name': 'Jasmine Vaughn', 'id': 3}, {'name': 'Mary Koch', 'id': 4}, {'name': 'Wendy Lopez', 'id': 5}, {'name': 'Mary Robinson', 'id': 6}, {'name': 'Ryan Perry', 'id': 7}, {'name': 'Amanda Alvarez', 'id': 8}, {'name': 'Alejandro Mills', 'id': 9}, {'name': 'Chelsey Hall', 'id': 10}, {'name': 'Jonathan Jones', 'id': 11}, {'name': 'Lisa Reynolds', 'id': 12}, {'name': 'Lindsay Collins', 'id': 13}, {'name': 'James Cooper', 'id': 14}, {'name': 'Joshua Hoffman', 'id': 15}, {'name': 'Kevin Castro', 'id': 16}, {'name': 'Philip Nelson', 'id': 17}, {'name': 'Tammie Santiago', 'id': 18}, {'name': 'Michael Simpson', 'id': 19}, {'name': 'Caroline Cooper', 'id': 20}, {'name': 'William Sanchez', 'id': 21}, {'name': 'Anthony Miller', 'id': 22}, {'name': 'Kenneth Cooper', 'id': 23}, {'name': 'Randy Allison', 'id': 24}, {'name': 'Linda Guerrero', 'id': 25}, {'name': 'Andrew Powell', 'id': 26}, {'name': 'Kyle Smith', 'id': 27}, {'name': 'Alejandro Mejia', 'id': 28}, {'name': 'Alan Sweeney', 'id': 29}, {'name': 'Donald Perez', 'id': 30}, {'name': 'Michelle Bradley', 'id': 31}, {'name': 'Jill Ewing', 'id': 32}, {'name': 'Joseph Robinson', 'id': 33}, {'name': 'Cynthia Smith', 'id': 34}, {'name': 'Kimberly Hernandez', 'id': 35}, {'name': 'Kelsey Hall', 'id': 36}, {'name': 'Amanda Thompson', 'id': 37}, {'name': 'Samantha Williams', 'id': 38}, {'name': 'Chad Johnston', 'id': 39}, {'name': 'Cynthia Ryan', 'id': 40}, {'name': 'Allen Hernandez', 'id': 41}, {'name': 'Ryan Palmer', 'id': 42}, {'name': 'Nancy Kim', 'id': 43}, {'name': 'Laura Weaver', 'id': 44}, {'name': 'Scott Green', 'id': 45}, {'name': 'Angela Trujillo', 'id': 46}, {'name': 'Kayla Williams', 'id': 47}, {'name': 'Catherine Collier', 'id': 48}, {'name': 'Nancy Thomas', 'id': 49}, {'name': 'Troy Wu', 'id': 50}, {'name': 'Leslie Reid', 'id': 51}, {'name': 'Justin Stein', 'id': 52}, {'name': 'Rachel Ruiz', 'id': 53}, {'name': 'Jordan Graham', 'id': 54}, {'name': 'Dustin Golden', 'id': 55}, {'name': 'Roy Banks', 'id': 56}, {'name': 'Brian Mckinney', 'id': 57}, {'name': 'Samuel Gibbs', 'id': 58}, {'name': 'Toni Aguilar', 'id': 59}, {'name': 'Nicole Murray', 'id': 60}, {'name': 'Tina Williams', 'id': 61}, {'name': 'Luis Gaines', 'id': 62}, {'name': 'Juan Tucker', 'id': 63}, {'name': 'Gregory Willis', 'id': 64}, {'name': 'Daniel Williams', 'id': 65}, {'name': 'Theresa Velez', 'id': 66}, {'name': 'Donna Brown', 'id': 67}, {'name': 'Melanie Davis', 'id': 68}, {'name': 'Meghan Moyer', 'id': 69}, {'name': 'Leslie Jordan', 'id': 70}, {'name': 'Ryan Phillips', 'id': 71}, {'name': 'Tina Johnson', 'id': 72}, {'name': 'Melissa Benjamin', 'id': 73}, {'name': 'James Gutierrez', 'id': 74}, {'name': 'Michael Obrien', 'id': 75}, {'name': 'Joshua Nichols', 'id': 76}, {'name': 'William Patel', 'id': 77}, {'name': 'Christian Jackson', 'id': 78}, {'name': 'Cindy Weber', 'id': 79}, {'name': 'Peter Valencia', 'id': 80}, {'name': 'Carlos Mitchell', 'id': 81}, {'name': 'Richard Andrews DVM', 'id': 82}, {'name': 'Terri Rowland', 'id': 83}, {'name': 'Jason Webster', 'id': 84}, {'name': 'David Velasquez', 'id': 85}, {'name': 'Emma Taylor', 'id': 86}, {'name': 'Chad Smith', 'id': 87}, {'name': 'Timothy Baker', 'id': 88}, {'name': 'Anthony Torres', 'id': 89}, {'name': 'Andrew Haynes', 'id': 90}, {'name': 'Ashley Griffin', 'id': 91}, {'name': 'Thomas Turner', 'id': 92}, {'name': 'Andrea Hamilton', 'id': 93}, {'name': 'Daniel Hunter', 'id': 94}, {'name': 'Ashley Johnson', 'id': 95}, {'name': 'Tonya Williams', 'id': 96}, {'name': 'Eric Jimenez', 'id': 97}, {'name': 'Erik Griffin', 'id': 98}, {'name': 'Adam Smith', 'id': 99}, {'name': 'Peggy Brennan', 'id': 100}, {'name': 'Pamela Hernandez', 'id': 101}, {'name': 'Janet Peters', 'id': 102}    
  ]

  selectedCaptains: string[] = []

  constructor(
    private stateSvc: StateService,
  ) {
   }

  ngOnInit() {
    this.stateSvc.setStateName('permit')
  }

}