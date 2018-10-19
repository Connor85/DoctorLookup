export class Search {
  getDoctors(keyWord) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${keyWord}&location=wa-seattle&user_location=47.6062%2C122.3321&skip=0&limit=10&user_key=3293fe8e1dc7b5cdb46cdd0b647355aa`;
      request.onload = function() {
        if (this.status === 200) {
          console.log(request.response);
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
