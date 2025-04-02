import React from 'react'
import "./Pin.scss"
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {  Icon } from 'leaflet'

// Configure default icon
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Pin({item}) {
  return (
    <Marker position={[item.latitude,item.longitude]}>
    <Popup>
      <div className="popupContainer">
        <img src={item.img} alt="" />
        <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span className='bed'>{item.bedroom}</span>
            <b>$ {item.price}</b>
        </div>
      </div>
    </Popup>
  </Marker>
  )
}

export default Pin