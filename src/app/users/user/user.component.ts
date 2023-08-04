import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // snapshot only works for first time component loads
    // it will NOT update when data in component changes
    this.user = {
      // the ['id'] here is based on what we defined as the dynamic route variable "/:id" in app.module.ts
      id: this.route.snapshot.params['id'],
      // ['name'] is from "/:name" from dynamic route
      name: this.route.snapshot.params['name']
    }

    // subscribing to params will help us reload from within component when route params changes
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'],
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
