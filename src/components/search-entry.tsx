import React from 'react';

import '@styles/components/search-entry.sass';
import SongData from 'src/models/songdata';

interface Props {
  songdata: SongData;
}

export default class SearchEntry extends React.Component<Props> {
  getTitle(): string {
    const title = this.props.songdata.title;
    if (title.length <= 22) {
      return title;
    }

    return title.substr(0, 20) + '...';
  }

  getArtist(): string {
    const artist = this.props.songdata.artist;
    if (artist.length <= 31) {
      return artist;
    }

    return artist.substr(0, 28) + '...';
  }

  public render(): JSX.Element {
    return (
      <div className={'flex flex-row flex-nowrap search-entry search-entry-background rounded'}>
        <img className={'flex-20p rounded-l min-w-0'} src={this.props.songdata.img_url} />

        <div className={'flex-grow-4 flex flex-col justify-center items-start pl-2'}>
          <p className={'search-entry-text search-entry-title'}>{this.getTitle()}</p>
          <p className={'search-entry-text search-entry-artist'}>{this.getArtist()}</p>
        </div>
      </div>
    );
  }
}
