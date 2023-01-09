import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import tippy, { hideAll } from 'tippy.js';
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { PswResetPopupComponent } from '../users/userPopups/psw-reset-popup/psw-reset-popup.component';

@Component({
  selector: 'app-useraction',
  templateUrl: './useraction.component.html',
  styleUrls: ['./useraction.component.css']
})
export class UseractionComponent implements OnInit, AfterViewInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  selected: boolean = false;
  offsetValue: number[] = [];

  ngOnInit() { }
  @ViewChild('content') container;

  @ViewChild('trigger') button;

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog) {
    let menuList = [ 'edit','reset_password', 'deactivate', 'activate'];
    let showCaseMenuList: string[] = [];
    let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
    userRolesData.forEach(element => {
      if (element.title == 'settingusers') {
        element.permission.forEach(item => {
          if (menuList.indexOf(item.action.toLowerCase()) !== -1 && item.status) {
            showCaseMenuList.push(item.action);
          }

        })

      }
    })
    console.log(showCaseMenuList.length);
    switch (showCaseMenuList.length) {
      case 4:
        this.offsetValue = [-100, 200];
        break;
      case 3:
        // translate(-272.222px, 192.222px) 220 250
        this.offsetValue = [-72, 200];
        break;
      case 2:
        // translate(-272.222px, 192.222px) 220 250 277
        this.offsetValue = [-42, 200];
        break;
        case 1:
          // translate(-272.222px, 192.222px) 220 250 277
          this.offsetValue = [-15, 200];
          break;

      default:
        this.offsetValue = [-100, 200];
        break;
    }



  }

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
  }


  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      theme: 'user-tippy',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      offset: this.offsetValue,
      // offset: [-100, 100],
      onShow: (instance) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance, event) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  editUser() {

    this.dialog.open(EditPopupComponent,);
    this.isOpen = false;
  }
  deactive() {
    this.dialog.open(DeactivateUserpopupComponent);
    this.isOpen = false;
  }

  activate() {
    this.dialog.open(ActivatepopUpComponent);
    this.isOpen = false;
  }
  resetpws() {
    sessionStorage.setItem("admin", '')
    this.dialog.open(PswResetPopupComponent);
    this.isOpen = false;
  }
  tickmark() {
    this.selected = true;
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      let data: any = localStorage.setItem('session', '');
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }



}
