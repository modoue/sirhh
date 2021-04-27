import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CiviliteComponent } from './list/civilite.component';
import { CiviliteDetailComponent } from './detail/civilite-detail.component';
import { CiviliteUpdateComponent } from './update/civilite-update.component';
import { CiviliteDeleteDialogComponent } from './delete/civilite-delete-dialog.component';
import { CiviliteRoutingModule } from './route/civilite-routing.module';

@NgModule({
  imports: [SharedModule, CiviliteRoutingModule],
  declarations: [CiviliteComponent, CiviliteDetailComponent, CiviliteUpdateComponent, CiviliteDeleteDialogComponent],
  entryComponents: [CiviliteDeleteDialogComponent],
})
export class AdministrationCiviliteModule {}
