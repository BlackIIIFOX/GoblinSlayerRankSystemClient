import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../core/models';
import {AccountService} from '../core/services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  adminPanelClasses = ['hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed', 'layout-footer-fixed'];

  public pageRoute = '/admin';
  public currentUser: User;

  constructor(private renderer: Renderer2, public router: Router, private userService: AccountService) {
  }

  ngOnInit(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.addClass(document.body, adminBodyClass));

    this.userService.currentUser.subscribe(
      (userData) => {
        if (userData) {
          this.currentUser = userData;
        }
      }, error => {

      }
    );
  }

  ngOnDestroy(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.removeClass(document.body, adminBodyClass));
  }

}
