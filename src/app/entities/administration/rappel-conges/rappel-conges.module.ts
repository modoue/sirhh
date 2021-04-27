import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RappelCongesComponent } from './list/rappel-conges.component';
import { RappelCongesDetailComponent } from './detail/rappel-conges-detail.component';
import { RappelCongesUpdateComponent } from './update/rappel-conges-update.component';
import { RappelCongesDeleteDialogComponent } from './delete/rappel-conges-delete-dialog.component';
import { RappelCongesRoutingModule } from './route/rappel-conges-routing.module';

@NgModule({
  imports: [SharedModule, RappelCongesRoutingModule],
  declarations: [RappelCongesComponent, RappelCongesDetailComponent, RappelCongesUpdateComponent, RappelCongesDeleteDialogComponent],
  entryComponents: [RappelCongesDeleteDialogComponent],
})
export class AdministrationRappelCongesModule {}
