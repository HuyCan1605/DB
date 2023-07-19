const firebaseConfig = {
    apiKey: "AIzaSyDO1FpVtQNZWvfpr_S20Nb9muSAgb_mzAw",
    authDomain: "fir-firebase-4a9b5.firebaseapp.com",
    databaseURL: "https://fir-firebase-4a9b5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-firebase-4a9b5",
    storageBucket: "fir-firebase-4a9b5.appspot.com",
    messagingSenderId: "358028421082",
    appId: "1:358028421082:web:c35cd6c1e19aa0d236c2e3",
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


// let globalData;


// let parking_car = [
//     {
//         name: 'Bãi đỗ xe trường FPT',
//         color: '#e8b015',
//         lngLat: [105.527740, 21.014672],
//         description: '<a href="D:/Subject/IOC391/Firebase_test/detail.html">Bãi đỗ xe còn trống </a>'
//     },
//     {
//         name: 'Bãi đỗ xe FPT SOFTWARE',
//         color: '#88f02e',
//         lngLat: [105.536774, 21.010295],
//         description: ''
//     },
//     {
//         name: 'Bãi đỗ xe trường Đại học Quốc Gia Hà Nội',
//         color: '#3df2d7',
//         lngLat: [105.508128, 20.997953],
//         description: ''
//     },
//     {
//         name: 'Bãi đỗ xe Nissan Company',
//         color: '#3250fa',
//         lngLat: [105.552528, 21.006450],
//         description: ''
//     },
//     {
//         name: 'Bãi đỗ xe Công Viên Khởi Nghiệp',
//         color: '#e81554',
//         lngLat: [105.537733, 21.014870],
//         description: ''
//     }
// ]


// parking_car.forEach(function ({ name, color, lngLat, description }) {
//     const popup = new mapboxgl
//         .Popup({ offset: 25 })
//         .setText(description);

//     new mapboxgl.Marker({
//         color,
//         scale: 1
//     })
//         .setLngLat(lngLat)
//         .setPopup(popup)
//         .addTo(map);
// });



map.on('load', () => {
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addSource('parking-car', {
                type: 'geojson',
                data: data
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

});

// let valuedb = firebase.database().ref('/oke');
// valuedb.on('value', snap => {
//     let value = snap.val();
//     parking_car[0].description = value;
// });
// Create a promise for the database operation


data = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [105.52708575312181, 21.013430256683503]
        }, 'properties': {
            'title': 'Bãi đỗ xe FPT',
            'description': '<a href="D:/Subject/IOC391/Firebase_test/detail.html">Bãi đỗ xe còn trống </a></p>',
            'icon': 'theatre'
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [105.536774, 21.010295]
        }, 'properties': {
            'title': 'Bãi đỗ xe FPT SOFTWARE',
            'description': '<p id = "slot2">Bãi đỗ xe không còn trống</p>',
            'icon': 'bar'
        }
    }]
};


