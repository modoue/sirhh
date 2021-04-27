import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SanctionAgentComponent } from './list/sanction-agent.component';
import { SanctionAgentDetailComponent } from './detail/sanction-agent-detail.component';
import { SanctionAgentUpdateComponent } from './update/sanction-agent-update.component';
import { SanctionAgentDeleteDialogComponent } from './delete/sanction-agent-delete-dialog.component';
import { SanctionAgentRoutingModule } from './route/sanction-agent-routing.module';

@NgModule({
  imports: [SharedModule, SanctionAgentRoutingModule],
  declarations: [SanctionAgentComponent, SanctionAgentDetailComponent, SanctionAgentUpdateComponent, SanctionAgentDeleteDialogComponent],
  entryComponents: [SanctionAgentDeleteDialogComponent],
})
export class AdministrationSanctionAgentModule {}
