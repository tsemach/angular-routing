import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

   /**
   * route.navigate: some notes about navigation
   * 1) 1th argument: is relative to that component so '/servers' and 'servers' are the same.
   * 2) ActiveRoute: is an object represent the current active route which able to inject by angular.
   * 
   * The Route object doesn't know which is the current active route so if relativeTo is not exist
   * It tring from /.
   */  
  reLoadPage() {
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
