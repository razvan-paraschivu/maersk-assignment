import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { LandingPageService } from './landing-page.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public search:string = '';
  public length: number = 0;
  public pageSize: number = 20;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [10, 20, 50];
  public showLoading: boolean = true;
  private subscription: Subscription = new Subscription();
  pageEvent: PageEvent;
  public results: any;

  constructor(private landingPageService: LandingPageService
    ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getData(event){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPokemon();
  }

  private getPokemon(): void{
    this.showLoading = true;
    this.subscription.add(this.landingPageService.getPokemon(this.pageSize, this.pageSize * this.pageIndex).subscribe(
      (resp: any) => {
        this.length = resp.count;
        this.results = resp.results;
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }
}
