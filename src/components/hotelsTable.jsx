import React from 'react';
import PropTypes from 'prop-types';

import HotelRow from './HotelRow';

const HotelsTable = ({ hotels, sortKey, onSort }) => (
  <table>
    <tbody>
      <tr>
        <th>画像</th>
        <th>ホテル名</th>
        <th className="hotel-price-column" onClick={() => onSort('price')}>
          値段{sortKey === 'price' ? '▼' : ''}
        </th>
        <th onClick={() => onSort('reviewAverage')}>
          レビュー{sortKey === 'reviewAverage' ? '▼' : ''}
        </th>
        <th onClick={() => onSort('reviewCount')}>
          レビュー件数{sortKey === 'reviewCount' ? '▼' : ''}
        </th>
        <th onClick={() => onSort('distance')}>
          距離{sortKey === 'distance' ? '▼' : ''}
        </th>
      </tr>
      {hotels.map(hotel => (<HotelRow key={hotel.id} hotel={hotel} />))}
    </tbody>
  </table>
);

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.any),
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

HotelsTable.defaultProps = {
  hotels: [],
};

export default HotelsTable;
