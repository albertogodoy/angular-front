import { Component, inject, signal } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent {

  arrSongs = signal<any[]>([]);
  empty:any;

  songsService = inject(SongsService);

  async ngOnInit() {
    const songs = await this.songsService.getAll();
    this.arrSongs.set(songs);
    this.empty = songs.length;
  }

  async delete(songId: string) {
    const song = await this.songsService.delete(songId);

    if (confirm('¿Estás seguro de que deseas borrar este elemento?') === true) {
      if (!song.error) {
        const songs = await this.songsService.getAll();
        this.arrSongs.set(songs);
      }
    } else {
      console.log(song.error);
    }
  }

  async refresh() {
    const songs = await this.songsService.getAll();
    this.arrSongs.set(songs);
  }
}
