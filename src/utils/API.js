import axios from "axios";

export default {
  search: function (cb) {
    axios.get("https://randomuser.me/api/?results=30")
      .then(function (response) {
        cb(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  },

  sortJSON: function (data, key, order, cb) {
 // eslint-disable-next-line
    cb(data.sort(function (a, b) {
      if (key === "first" || key === "last") {
        var x = a.name[key];
        var y = b.name[key];
      }
      else if (key === "email") {
        x = a[key];
        y = b[key];
      }
      else if (key === "age") {
        x = a.dob[key];
        y = b.dob[key];
      }

      if (order === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
      if (order === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    }));
  }
};

