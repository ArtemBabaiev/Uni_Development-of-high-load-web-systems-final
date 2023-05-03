import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../services/movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {Movie} from "../../../models/movie";
import {first} from "rxjs";
import {MovieData} from "../../../formModels/movie-data";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit{
  id: number;
  movieGroup: FormGroup;
  currentYear = (new Date()).getFullYear()

  constructor(private movieService: MovieService,
              private router: Router,
              private fb: FormBuilder,
              private notificator: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    let movie: Movie;
    this.movieService.getMovieById(this.id).pipe(first()).subscribe(
      next=>{
        movie = next
      },
      error => {}
    )
    this.movieGroup = this.fb.group({
      title: [movie.title, [Validators.required]],
      releaseYear: [movie.releaseYear, [Validators.required]],
      description: [movie.description, [Validators.required]],
      boxOffice: [movie.boxOffice, [Validators.required]],
    })
  }

  onSubmitClick(data: any){
    let movieData: MovieData = {
      title: data.title,
      releaseYear: data.releaseYear,
      description: data.description,
      boxOffice: data.boxOffice
    }
    this.movieService.updateMovie(this.id, movieData, this.selectedFile).pipe(first()).subscribe(
      next=>{if(next!=null) this.router.navigate(['/movie-control'])},
      error => {this.notificator.error(error.message)}
    )
  }
  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
}
