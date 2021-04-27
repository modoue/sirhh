import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RegimeHoraireComponent } from './list/regime-horaire.component';
import { RegimeHoraireDetailComponent } from './detail/regime-horaire-detail.component';
import { RegimeHoraireUpdateComponent } from './update/regime-horaire-update.component';
import { RegimeHoraireDeleteDialogComponent } from './delete/regime-horaire-delete-dialog.component';
import { RegimeHoraireRoutingModule } from './route/regime-horaire-routing.module';

@NgModule({
  imports: [SharedModule, RegimeHoraireRoutingModule],
  declarations: [RegimeHoraireComponent, RegimeHoraireDetailComponent, RegimeHoraireUpdateComponent, RegimeHoraireDeleteDialogComponent],
  entryComponents: [RegimeHoraireDeleteDialogComponent],
})
export class AdministrationRegimeHoraireModule {}
