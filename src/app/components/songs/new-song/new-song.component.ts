import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent {

  formulario: FormGroup;
  songsServices = inject(SongsService);

  constructor() {
    this.formulario = new FormGroup({
      title: new FormControl(),
      artist: new FormControl(),
      genero: new FormControl(),
      album: new FormControl(),
      duration: new FormControl(),
      year: new FormControl(),
      tracknumber: new FormControl(),
      isExplicit: new FormControl(),
    });
  }

  async onSubmit() {
    const response = await this.songsServices.create(this.formulario.value);
    console.log(response)
  }

}
