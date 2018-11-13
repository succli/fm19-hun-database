import { Component, OnInit } from '@angular/core';
import { faLock, faSignOutAlt, faCogs, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'fmhun-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faLock = faLock;
  faSignOut = faSignOutAlt;
  faCogs = faCogs;
  faUserPlus = faUserPlus;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
