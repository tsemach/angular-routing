import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSubscribe: Subscription;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    this.paramsSubscribe = this.route.params
    .subscribe(
      (params: Params) => { 
        console.log("server componet - id = " + params['id']);
        console.log("server componet - server = " + JSON.stringify(this.server));
        console.log("server componet - server = " + JSON.stringify(this.serversService.getServer(1)));
        this.server = this.serversService.getServer(+params['id']);
      }
    )
  }

  onEdit() {    
    //this.router.navigate(['/servers', this.server.id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
    //this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
