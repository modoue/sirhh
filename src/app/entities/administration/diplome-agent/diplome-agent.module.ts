import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DiplomeAgentComponent } from './list/diplome-agent.component';
import { DiplomeAgentDetailComponent } from './detail/diplome-agent-detail.component';
import { DiplomeAgentUpdateComponent } from './update/diplome-agent-update.component';
import { DiplomeAgentDeleteDialogComponent } from './delete/diplome-agent-delete-dialog.component';
import { DiplomeAgentRoutingModule } from './route/diplome-agent-routing.module';

@NgModule({
  imports: [SharedModule, DiplomeAgentRoutingModule],
  declarations: [DiplomeAgentComponent, DiplomeAgentDetailComponent, DiplomeAgentUpdateComponent, DiplomeAgentDeleteDialogComponent],
  entryComponents: [DiplomeAgentDeleteDialogComponent],
})
export class AdministrationDiplomeAgentModule {}
