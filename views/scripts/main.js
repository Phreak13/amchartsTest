let socket = io();


AmCharts.makeChart("chartdiv", {
  "type": "serial",
  "dataLoader": {
    "url": "http://localhost:3000/data.json",
    "format": "json",
    "async": true
  },
  "categoryField": "country",
  "graphs": [{
    "valueField": "visits",
    "type": "column"
  }]
});

jQuery(document).ready(function () {
  jQuery('#chart-input').on('submit', function (e) {
    e.preventDefault();

    let countryTextbox = jQuery('[name=country]');
    let visitsTextbox = jQuery('[name=visits]');


    socket.emit('addData', {
      "country": countryTextbox.val(),
      "visits": parseInt(visitsTextbox.val())
    }, function () {
      countryTextbox.val('');
      visitsTextbox.val('');
    });

    AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "dataLoader": {
        "url": "http://localhost:3000/data.json",
        "format": "json",
        "async": true
      },
      "categoryField": "country",
      "graphs": [{
        "valueField": "visits",
        "type": "column"
      }]
    });

  });
});


