import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../landing-page/landing-page.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  private pokemonName:string = '';
  private subscription: Subscription = new Subscription();
  public showLoading: boolean;
  public data: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private landingPageService: LandingPageService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.pokemonName = paramsId.pokemonName;
      this.getPokemonData(this.pokemonName);
    });
  }

  private getPokemonData(pokemonName){
    this.showLoading = true;
    this.subscription.add(this.landingPageService.getPokemonByName(pokemonName).subscribe(
      (resp: any) => {
        this.data = resp;
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  public goBackToList(){
    this.router.navigate(['/landing-page']);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
