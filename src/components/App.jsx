import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';

import React, { Component } from 'react';

export class App extends Component {
  newStrSearch = newStr => {
    console.log('newStr :>> ', newStr);
  };
  render() {
    return (
      <div>
        <SearchBar changeStringSearch={this.newStrSearch} />
        <ImageGallery stringSearch="" />
      </div>
    );
  }
}

// getStringSearch =()=>{}
//   return (
//     <div>
//       <SearchBar />
//       <ImageGallery />
//     </div>
//   );
// };
