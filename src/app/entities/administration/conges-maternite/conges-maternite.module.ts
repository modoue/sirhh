import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CongesMaterniteComponent } from './list/conges-maternite.component';
import { CongesMaterniteDetailComponent } from './detail/conges-maternite-detail.component';
import { CongesMaterniteUpdateComponent } from './update/conges-maternite-update.component';
import { CongesMaterniteDeleteDialogComponent } from './delete/conges-maternite-delete-dialog.component';
import { CongesMaterniteRoutingModule } from './route/conges-maternite-routing.module';

@NgModule({
  imports: [SharedModule, CongesMaterniteRoutingModule],
  declarations: [
    CongesMaterniteComponent,
    CongesMaterniteDetailComponent,
    CongesMaterniteUpdateComponent,
    CongesMaterniteDeleteDialogComponent,
  ],
  entryComponents: [CongesMaterniteDeleteDialogComponent],
})
export class AdministrationCongesMaterniteModule {}
