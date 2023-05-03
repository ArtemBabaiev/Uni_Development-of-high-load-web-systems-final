import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieService} from "../../../services/movie.service";
import {NotificationService} from "../../../services/notification.service";
import {MovieData} from "../../../formModels/movie-data";
import {first} from "rxjs";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit{
  currentYear = (new Date()).getFullYear()
  movieGroup: FormGroup;

  constructor(private movieService: MovieService,
              private router: Router,
              private fb: FormBuilder,
              private notificator: NotificationService) {
  }

  ngOnInit() {
    this.movieGroup = this.fb.group({
      title: ['', [Validators.required]],
      releaseYear: ['', [Validators.required]],
      description: ['', [Validators.required]],
      boxOffice: ['', [Validators.required]],
      poster: []
    })
  }

  onSubmitClick(data: any){
    let movieData: MovieData = {
      title: data.title,
      releaseYear: data.releaseYear,
      description: data.description,
      boxOffice: data.boxOffice
    }
    this.movieService.createMovie(movieData, this.selectedFile).pipe(first()).subscribe(
      next=>{if(next!=null) this.router.navigate(['/movie-control'])},
      error => {this.notificator.error(error.message)}
    )
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

}
