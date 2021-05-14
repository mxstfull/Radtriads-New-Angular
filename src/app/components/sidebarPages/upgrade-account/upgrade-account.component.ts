import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanStateService } from 'src/app/shared/plan.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-upgrade-account',
  templateUrl: './upgrade-account.component.html',
  styleUrls: ['./upgrade-account.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class UpgradeAccountComponent implements OnInit {
  hideButtons: boolean = true;
  user_info = { u_id: localStorage.getItem('unique_id') };
  perioudOption: boolean = false;
	stripePromise: Promise<Stripe | null>;

  constructor(private planService: PlanStateService, private router: Router) {}

  ngOnInit(): void {}

  register(plan_id: number) {
    this.planService
      .request_url({
        plan_id: plan_id,
        plan_method: this.perioudOption ? 'yearly' : 'monthly',
        u_id: this.user_info.u_id,
        success_url: window.location.origin + '/submit-success',
        cancel_url: window.location.origin + '/upgrade-account',
      })
      .subscribe((result) => {
        this.responseGetUrlHandler(result);
      });
  }

	async responseGetUrlHandler(result) {
		var {stripe_key, stripe_id} = result;

		this.stripePromise = loadStripe(stripe_key); 

		const stripe = await this.stripePromise;

		const { error } = await stripe.redirectToCheckout({
			sessionId: stripe_id,
		});
		
		if (error) {
			console.log(error);
  	}
	}
}
