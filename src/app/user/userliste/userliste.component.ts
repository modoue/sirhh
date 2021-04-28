import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'app-userliste',
  templateUrl: './userliste.component.html',
  styleUrls: ['./userliste.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UserlisteComponent implements OnInit {

  dialogRef: any;
  //confirmDialogRef: MatDialogRef<CreateComponent>;
  miseajour: boolean=false;
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog:MatDialog
  ) { }

  ngOnInit(): void {
 
  }
  /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    open(){
 

    }
     
    /**
     * New contact
     */
    newUser(): void
    {/* 
        this.dialogRef = this._matDialog.open(CreateComponent, {
          
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
          
        });
        this.miseajour=false

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( this.miseajour)
                {
                  this.miseajour=false;
                }
                else{
                  this.miseajour=true
                }
                
              

            }); */
    }
}
