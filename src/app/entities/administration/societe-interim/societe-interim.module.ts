import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SocieteInterimComponent } from './list/societe-interim.component';
import { SocieteInterimDetailComponent } from './detail/societe-interim-detail.component';
import { SocieteInterimUpdateComponent } from './update/societe-interim-update.component';
import { SocieteInterimDeleteDialogComponent } from './delete/societe-interim-delete-dialog.component';
import { SocieteInterimRoutingModule } from './route/societe-interim-routing.module';

@NgModule({
  imports: [SharedModule, SocieteInterimRoutingModule],
  declarations: [
    SocieteInterimComponent,
    SocieteInterimDetailComponent,
    SocieteInterimUpdateComponent,
    SocieteInterimDeleteDialogComponent,
  ],
  entryComponents: [SocieteInterimDeleteDialogComponent],
})
export class AdministrationSocieteInterimModule {}
