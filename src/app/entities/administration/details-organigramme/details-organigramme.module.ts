import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DetailsOrganigrammeComponent } from './list/details-organigramme.component';
import { DetailsOrganigrammeDetailComponent } from './detail/details-organigramme-detail.component';
import { DetailsOrganigrammeUpdateComponent } from './update/details-organigramme-update.component';
import { DetailsOrganigrammeDeleteDialogComponent } from './delete/details-organigramme-delete-dialog.component';
import { DetailsOrganigrammeRoutingModule } from './route/details-organigramme-routing.module';

@NgModule({
  imports: [SharedModule, DetailsOrganigrammeRoutingModule],
  declarations: [
    DetailsOrganigrammeComponent,
    DetailsOrganigrammeDetailComponent,
    DetailsOrganigrammeUpdateComponent,
    DetailsOrganigrammeDeleteDialogComponent,
  ],
  entryComponents: [DetailsOrganigrammeDeleteDialogComponent],
})
export class AdministrationDetailsOrganigrammeModule {}
