import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewRequestComponent } from './view-request/view-request.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { GetPropertyComponent } from './get-property/get-property.component';
import { PropertyDetailsComponent } from './user/property-details/property-details.component';
import { NotificationComponent } from './user/notification/notification.component';

@NgModule({
  declarations: [
    PropertiesListComponent,
    UserComponent,
    AdminComponent,
    ViewRequestComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    GetPropertyComponent,
    PropertyDetailsComponent,
    // NotificationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: PropertiesListComponent },
      { path: 'viewrequests', component: ViewRequestComponent },
      { path: 'add', component: AddPropertyComponent },
      { path: 'edit/:prop_id', component: EditPropertyComponent },
      { path: 'view/:prop_id', component: GetPropertyComponent },
      { path: 'view/:prop_id/details', component: PropertyDetailsComponent },
      { path: 'viewnotifications', component: NotificationComponent}
    ]),
  ],
})
export class PropertiesModule {}
