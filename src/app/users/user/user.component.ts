import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  paramsSubscribe: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * @description note this user setting is happend ONLY once when the component is created.
     * If the this.user changing it WILL NOT reflacted so user.name and user.id will notupdated (string interpulation)
     */
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    /**
     * user obserable to sbcribe on changs on the url params 
     */
    this.paramsSubscribe = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  /**
   * @description Angular automaticly unsubscribe router parameters subscribtion 
   * but it is good practic to unsubcribe all the subscriptions.  
   */
  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
  }

}
