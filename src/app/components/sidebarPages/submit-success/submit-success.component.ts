import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanStateService } from 'src/app/shared/plan.service';

@Component({
  selector: 'app-submit-success',
  templateUrl: './submit-success.component.html',
  styleUrls: ['./submit-success.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class SubmitSuccessComponent implements OnInit {
  hideButtons: boolean = true;

  constructor(private planService: PlanStateService, private router: Router) {}

  ngOnInit(): void {}

}
