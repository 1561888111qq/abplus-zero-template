import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { SettingsService, ModalHelper } from '@delon/theme';
import { AppAuthService } from '@core/auth/app-auth.service';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HeaderChangePwdComponent } from './change-pwd.component';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="openChangePwd()"><i nz-icon type="user" class="mr-sm"></i>
        {{ 'menu.account.change-pwd' | translate }}
      </div>
      <div nz-menu-item routerLink="/account/settings"><i nz-icon type="setting" class="mr-sm"></i>
        {{ 'menu.account.settings' | translate }}
      </div>
      <div nz-menu-item routerLink="/exception/trigger"><i nz-icon type="close-circle" class="mr-sm"></i>
        {{ 'menu.account.trigger' | translate }}
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
        {{ 'menu.account.logout' | translate }}
      </div>
    </div>
  </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private _modal: ModalHelper,
    private _appAuthService: AppAuthService,
    private _router: Router,
    @Inject(DA_SERVICE_TOKEN) private _tokenService: ITokenService
  ) { }

  logout() {
    this._appAuthService.logout(() => {
      this._router.navigateByUrl(this._tokenService.login_url);
    });
  }

  openChangePwd() {
    this._modal
      .createStatic(HeaderChangePwdComponent)
      .subscribe();
  }
}