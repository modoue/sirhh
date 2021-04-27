import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CongesAnnuelsComponent } from './list/conges-annuels.component';
import { CongesAnnuelsDetailComponent } from './detail/conges-annuels-detail.component';
import { CongesAnnuelsUpdateComponent } from './update/conges-annuels-update.component';
import { CongesAnnuelsDeleteDialogComponent } from './delete/conges-annuels-delete-dialog.component';
import { CongesAnnuelsRoutingModule } from './route/conges-annuels-routing.module';

@NgModule({
  imports: [SharedModule, CongesAnnuelsRoutingModule],
  declarations: [CongesAnnuelsComponent, CongesAnnuelsDetailComponent, CongesAnnuelsUpdateComponent, CongesAnnuelsDeleteDialogComponent],
  entryComponents: [CongesAnnuelsDeleteDialogComponent],
})
export class AdministrationCongesAnnuelsModule {}
