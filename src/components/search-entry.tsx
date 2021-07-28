import React from 'react';

import '@styles/components/search-entry.sass';
import ISongData from 'src/models/songdata';

interface Props {
  songdata: ISongData;
}

export default class SearchEntry extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <div className={'search-entry search-entry-background select-none flex flex-row flex-nowrap rounded'}>
        <img className={'flex-shrink flex-20 rounded-l min-w-0'} draggable={false} src={this.props.songdata.img_url} />
        <div className={'flex-grow-4 flex-shrink-0 flex-80 p-2 min-w-0 self-center'}>
          <p className={'search-entry-title truncate'}>{this.props.songdata.title}</p>
          <p className={'search-entry-artist truncate'}>{this.props.songdata.artist}</p>
        </div>
      </div>
    );
  }
}
