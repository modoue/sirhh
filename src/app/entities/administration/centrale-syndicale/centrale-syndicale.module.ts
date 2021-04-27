import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CentraleSyndicaleComponent } from './list/centrale-syndicale.component';
import { CentraleSyndicaleDetailComponent } from './detail/centrale-syndicale-detail.component';
import { CentraleSyndicaleUpdateComponent } from './update/centrale-syndicale-update.component';
import { CentraleSyndicaleDeleteDialogComponent } from './delete/centrale-syndicale-delete-dialog.component';
import { CentraleSyndicaleRoutingModule } from './route/centrale-syndicale-routing.module';

@NgModule({
  imports: [SharedModule, CentraleSyndicaleRoutingModule],
  declarations: [
    CentraleSyndicaleComponent,
    CentraleSyndicaleDetailComponent,
    CentraleSyndicaleUpdateComponent,
    CentraleSyndicaleDeleteDialogComponent,
  ],
  entryComponents: [CentraleSyndicaleDeleteDialogComponent],
})
export class AdministrationCentraleSyndicaleModule {}
