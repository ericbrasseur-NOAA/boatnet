import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
// import { LoginComponent } from './screens/login/login.component';
import { TallyComponent } from './screens/tally/tally.component';
import { TripsComponent } from './screens/trips/trips.component';
import { TripListComponent } from './screens/trips/trip-list/trip-list.component';
import { TripEditComponent } from './screens/trips/trip-edit/trip-edit.component';
import { HaulsComponent } from './screens/hauls/hauls.component';
import { HaulListComponent } from './screens/hauls/haul-list/haul-list.component';
import { HaulEditComponent } from './screens/hauls/haul-edit/haul-edit.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { TallyPdfComponent } from './screens/tally/tally-pdf/tally-pdf.component';
import { BackupComponent } from './screens/backup/backup.component';
import { RedirectDownloadComponent } from './_helpers/redirect-download/redirect-download.component';
import { LoginPageComponent } from './auth/components/login-page.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TripListComponent },
      { path: 'new', component: TripEditComponent },
      { path: ':id', component: TripEditComponent },
      { path: ':id/edit', component: TripEditComponent }
    ]
  },
  {
    path: 'hauls',
    component: HaulsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HaulListComponent },
      { path: 'new', component: HaulEditComponent },
      { path: ':id/edit', component: HaulEditComponent }
    ]
  },
  { path: 'backup', component: BackupComponent, canActivate: [AuthGuard] },
  { path: 'tally', component: TallyComponent, canActivate: [AuthGuard] },
  { path: 'tally/pdf', component: TallyPdfComponent, canActivate: [AuthGuard] },
  { path: 'download', component: RedirectDownloadComponent, pathMatch: 'full' },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
