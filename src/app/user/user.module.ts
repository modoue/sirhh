import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste/liste.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'app/service/user.service';
import { UserlisteComponent } from './userliste/userliste.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatTableModule} from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
const routes:Routes=[
  {path:'liste',component:UserlisteComponent}

]

@NgModule({
  declarations: [ListeComponent, UserlisteComponent],
  imports: [
   
    RouterModule.forChild(routes),
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule,
    FuseSidebarModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
