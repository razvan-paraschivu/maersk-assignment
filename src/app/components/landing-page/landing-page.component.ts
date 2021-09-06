import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { forkJoin, Subscription } from 'rxjs';
import { LandingPageService } from './landing-page.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  public search:string = '';
  public length: number = 0;
  public pageSize: number = 20;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [10, 20, 50];
  public showLoading: boolean = true;
  public sorting: string;
  private subscription: Subscription = new Subscription();
  public pageEvent: PageEvent;
  public results: any;
  public shownResults: any;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getData(event:PageEvent): PageEvent{
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPokemon();
    return event;
  }

  public next(){
    if(this.paginator.hasNextPage())
      this.paginator.nextPage()
  }

  public prev(){
    if(this.paginator.hasPreviousPage())
      this.paginator.previousPage()
  }

  private getPokemon(){
    this.showLoading = true;
    this.subscription.add(this.landingPageService.getPokemon(this.pageSize, this.pageSize * this.pageIndex).subscribe(
      (resp: any) => {
        this.length = resp.count;
        this.results = resp.results;
        let arr = [];
        this.results.forEach(pokemon => {
          arr.push(this.landingPageService.getPokemonByName(pokemon.name))
        });
        forkJoin(arr).subscribe((arrResp) => {
          this.shownResults = [...arrResp];
          this.showLoading = false;

          if (localStorage.getItem("search") !== null) {
            this.search = localStorage.getItem("search");
          }
          if (localStorage.getItem("sorting") !== null) {
            this.sorting = localStorage.getItem("sorting");
            this.sortingChanged();
          }
        });
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  public sortingChanged(){
    localStorage.setItem('sorting', this.sorting);
    
    if(this.sorting == 'name')
      this.shownResults.sort((a, b) => a.name.localeCompare(b.name))
    else if(this.sorting == 'weight')
      this.shownResults.sort((a, b) => (a['weight'] > b['weight']) ? 1 : -1);
    else if(this.sorting == 'height')
      this.shownResults.sort((a, b) => (a['height'] > b['height']) ? 1 : -1);
    else
      this.shownResults.sort((a, b) => (a['id'] > b['id']) ? 1 : -1);
  }

  public saveSearch(){
    localStorage.setItem('search', this.search);
  }

  public clearSearch(){
    this.search = '';
    this.saveSearch()
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
