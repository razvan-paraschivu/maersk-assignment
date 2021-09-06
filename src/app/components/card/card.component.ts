import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public data: any;
  
  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  public goToDetails(data){
    this.router.navigate(['/details', data.name]);
  }

}
