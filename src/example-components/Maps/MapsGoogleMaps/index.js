import React, { Fragment } from 'react';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LivePreviewExample() {
  const center = {
    lat: -19.5891911,
    lng: -65.7558019
  };
  const zoom = 11;
  return (
    <Fragment>
      <div className="w-100" style={{ height: '350px' }}>
        <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
          <AnyReactComponent lat={-19.5891911} lng={-65.7558019} text="My Marker" />
        </GoogleMapReact>
      </div>
    </Fragment>
  );
}
