import React, { Component } from 'react';
import _ from 'lodash';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';
import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => {
  console.log(hotels, sortKey);
  return _.sortBy(hotels, h => h[sortKey]);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      hotels: [
        { id: 111, name: 'ホテルオークラ', url: 'https://google.com' },
        { id: 222, name: 'アパホテル', url: 'https://yahoo.co.jp' },
      ],
      sortKey: 'price',
    };
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceSubmit(place) {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('Non Results Returned.');
            break;
          }
          default: {
            this.setErrorMessage('Error Occered.');
            break;
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('通信に失敗しました');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
