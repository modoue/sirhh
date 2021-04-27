import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PosteAgentComponent } from './list/poste-agent.component';
import { PosteAgentDetailComponent } from './detail/poste-agent-detail.component';
import { PosteAgentUpdateComponent } from './update/poste-agent-update.component';
import { PosteAgentDeleteDialogComponent } from './delete/poste-agent-delete-dialog.component';
import { PosteAgentRoutingModule } from './route/poste-agent-routing.module';

@NgModule({
  imports: [SharedModule, PosteAgentRoutingModule],
  declarations: [PosteAgentComponent, PosteAgentDetailComponent, PosteAgentUpdateComponent, PosteAgentDeleteDialogComponent],
  entryComponents: [PosteAgentDeleteDialogComponent],
})
export class AdministrationPosteAgentModule {}
