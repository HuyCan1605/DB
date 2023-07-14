mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5bnExNjA1IiwiYSI6ImNsazJld3E3ZzAxb2UzbG1yeDNnazliZ3kifQ.XnGNNPJab0SCBOcuDHNZ9w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [105.52708575312181, 21.013430256683503], // starting position [lng, lat]
    zoom: 15, // starting zoom
});

data = {
    "type": "FeatureCollection",
    "features": [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [105.52708575312181, 21.013430256683503]
        },properties:{
            name: 'Bãi đỗ xe 1'
        }
    },{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [105.52162141726842,
                21.001021867531264]
        },properties:{
            name: 'Bãi đỗ xe 2'
        }
        
    }

    ]
}

map.on('load', (e)=>{
    map.addSource('university-src',{
        type:'geojson',
        data:data
    })
    map.addLayer({
        'id': 'university-location',
        'type':'circle',
        'source':'university-src',
        'paint':{
            'circle-radius': 10,
            'circle-color': 'red'
        }
    })
    map.addLayer({
        'id': 'university-location',
        'type':'symp=bol',
        'source':'university-src',
        'layout':{
            'text-field': ['format',['get', 'name'], {'font-scale':1}],
            'text-size': 12, 
        },
        'paint':{
            'text-color':'#0000ff'
        }
    })
})