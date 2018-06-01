
  
  
AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "dataLoader": {
    "url": "http://localhost:3000/data.json",
    "format": "json",
    "async": true
  },
  "categoryField": "country",
  "graphs": [ {
    "valueField": "visits",
    "type": "column"
  } ]
} );
