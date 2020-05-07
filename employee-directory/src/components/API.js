import axios from "axios";

export default {
  search: function(order, cb) {
    axios.get("https://randomuser.me/api/?results=20")
    .then(function (response) {
      console.log(response.data.results);
      // if(order) {
      // const sortedEmployees = this.sortJSON(response.data.results, 'email', order );
      // console.log(sortedEmployees);
      // cb(sortedEmployees);
      // }
      // else {
      cb(response.data.results);
      // }
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  },

  sortJSON: function(data, key, way, cb) {
    // eslint-disable-next-line
      cb(data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    }));
  }
  

};

// function sortJSON(data, key, way) {
//   // eslint-disable-next-line
//   return data.sort(function(a, b) {
//       var x = a[key]; var y = b[key];
//       if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
//       if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
//   });
// }

