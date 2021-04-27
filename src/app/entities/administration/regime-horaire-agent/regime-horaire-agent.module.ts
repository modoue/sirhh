import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RegimeHoraireAgentComponent } from './list/regime-horaire-agent.component';
import { RegimeHoraireAgentDetailComponent } from './detail/regime-horaire-agent-detail.component';
import { RegimeHoraireAgentUpdateComponent } from './update/regime-horaire-agent-update.component';
import { RegimeHoraireAgentDeleteDialogComponent } from './delete/regime-horaire-agent-delete-dialog.component';
import { RegimeHoraireAgentRoutingModule } from './route/regime-horaire-agent-routing.module';

@NgModule({
  imports: [SharedModule, RegimeHoraireAgentRoutingModule],
  declarations: [
    RegimeHoraireAgentComponent,
    RegimeHoraireAgentDetailComponent,
    RegimeHoraireAgentUpdateComponent,
    RegimeHoraireAgentDeleteDialogComponent,
  ],
  entryComponents: [RegimeHoraireAgentDeleteDialogComponent],
})
export class AdministrationRegimeHoraireAgentModule {}
