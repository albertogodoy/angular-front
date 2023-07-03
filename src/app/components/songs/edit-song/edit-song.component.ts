import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent {

  formulario: FormGroup;
  songId: string = '';
  activatedRoute = inject(ActivatedRoute);
  songsService = inject(SongsService);

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

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const songId = params['songId'];
      const song = await this.songsService.getById(songId);
      this.songId = songId;
      delete song._id;
      delete song.__v;
      this.formulario.setValue(song);
    });
  }

  async onSubmit() {
    const song = await this.songsService.update(this.songId, this.formulario.value);
    console.log(song);
  }

}
