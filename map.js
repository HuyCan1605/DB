const firebaseConfig = {
    apiKey: "AIzaSyCpl3usEWQBmwsz2ncr8VQL5FwdRs42e_M",
    authDomain: "module-7-realtime-db.firebaseapp.com",
    databaseURL: "https://module-7-realtime-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "module-7-realtime-db",
    storageBucket: "module-7-realtime-db.appspot.com",
    messagingSenderId: "844850635767",
    appId: "1:844850635767:web:347ae2d6013a28f2f5c4f2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();


mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5bnExNjA1IiwiYSI6ImNsazJld3E3ZzAxb2UzbG1yeDNnazliZ3kifQ.XnGNNPJab0SCBOcuDHNZ9w';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [105.52708575312181, 21.013430256683503],
    zoom: 13
});
map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'top-left'
);

map.on('load', async () => {
    const valuedb = await fetchDataFromFirebase();

    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addSource('parking-car', {
                type: 'geojson',
                data: valuedb
            });
            map.addLayer({
                'id': 'parking-car',
                'type': 'symbol',
                'source': 'parking-car',
                'layout': {
                    'icon-allow-overlap': true,
                    'icon-image': 'custom-marker',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-size': 12,
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
            map.on('click', 'parking-car', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on('mouseenter', 'parking-car', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'parking-car', () => {
                map.getCanvas().style.cursor = '';
            });


        });

    const updateSource = setInterval(async () => {
        const valuejson = await fetchDataFromFirebase(updateSource);
        console.log(valuejson);
        map.getSource('parking-car').setData(valuejson);
    }, 2000);

    async function fetchDataFromFirebase(updateSource) {
        try {
            const response = await fetch('https://module-7-realtime-db-default-rtdb.asia-southeast1.firebasedatabase.app/.json',
                { method: 'GET' }
            );
            const datadb = await response.json();
            const latitude = datadb.oke.place.latitude;
            const longitude = datadb.oke.place.longitude;
            const title = datadb.oke.title;
            const description = datadb.oke.slot_left;
            const latitude2 = datadb.oke2.coordinates.latitude;
            const longitude2 = datadb.oke2.coordinates.longitude;
            const title2 = datadb.oke2.title;
            const description2 = datadb.oke2.slot_left;
            return {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [latitude2, longitude2]
                    }, 'properties': {
                        'title': title2,
                        'description': '<p>Bãi đỗ xe còn ' + description2 + '</p><a href ="D:/Subject/IOC391/Firebase_test/detail.html">Click</>',
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [latitude, longitude]
                    }, 'properties': {
                        'title': title,
                        'description': '<p>Bãi đỗ xe còn ' + description + '</p><a href ="D:/Subject/IOC391/Firebase_test/detail.html">Click</>',
                    }
                }]
            };
        } catch (err) {
            // If the updateSource interval is defined, clear the interval to stop updating the source.
            if (updateSource) clearInterval(updateSource);
            throw new Error(err);
        }

    };

});





