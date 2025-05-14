
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10 // starting zoom
    });

    const marker1 = new mapboxgl.Marker({color: "red"})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25,})
        .setHTML(`
  <div style="padding: 10px; max-width: 220px; border-radius: 8px; background-color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
    <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #222;">${listingLocation}</h4>
    <p style="margin: 6px 0 0; font-size: 14px; color: #555;">It's a wonderful place.</p>
  </div>
`))
        .addTo(map);