import { Component, OnInit } from '@angular/core';
import { StateService } from '../../_services/data/state.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  title = "User Config"
  user = this.stateSvc.currentState.user

  // userPrefs = {
  //   0: {notification_preference: 'email'},
  //   1: {notification_preference: 'both'},
  //   2: {notification_preference: 'app only'},
  //   3: {notification_preference: 'text'},
  //   4: {notification_preference: 'text'},
  //   5: {notification_preference: 'email'},
  // }

  notification_options = [
    {label: 'email', value: 'email', icon: 'pi pi-envelope'},
    {label: 'text (mobile)', value: 'text', icon: 'pi pi-comment'},
    {label: 'device notification (push)', value: 'notification', icon: 'pi pi-mobile'}, 
  ]

  vessel_options = [
    {label: 'Excalibur', value: {vessel_name: "Excalibur", vessel_reg_num: 'WA984325'}},
    {label: 'Last Straw', value: {vessel_name: "Last Straw", vessel_reg_num: 'CA984325'}},
    {label: 'Raven', value: {vessel_name: "Raven", vessel_reg_num: 'OR984325'}},
    {label: 'Ms Julie', value: {vessel_name: "Ms Julie", vessel_reg_num: 'CA984325'}}
  ]

  userPreference = this.stateSvc.currentState.user.notification_prefs

  name = this.stateSvc.currentState.name

  constructor(
    private stateSvc: StateService,
  ) { }

  ngOnInit() {
    this.stateSvc.setStateName('user-config');
    this.name = this.stateSvc.currentState.name
    console.log(this.name)
  }

  setNotificationPref(event) {
    console.log(event.value)
    this.stateSvc.currentState.user.notification_prefs = event.value
    console.log(this.stateSvc.currentState.user.notification_prefs)
  }

  getNotificationPref() {
    return this.stateSvc.currentState.user.notification_prefs
  }

  setActiveVessel(event) {
    console.log(event.value)
    this.stateSvc.currentState.vessel = event.value
  }

  getActiveVessel() {
    return this.stateSvc.currentState.vessel.vessel_name
  }

}
