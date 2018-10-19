import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Search } from "./search.js";

$(document).ready(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    $("#results").empty();

    let keyWord = $("#keyWord").val();

    let newSearch = new Search();
    let promise = newSearch.getDoctors(keyWord);

    promise.then(
      function(response) {
        let body = JSON.parse(response);
        if (body.data.length > 0) {
          for (let i = 0; i < body.data.length; i++) {
            $("#results").append(
              `<h3>${body.data[i].profile.first_name} ${
                body.data[i].profile.last_name
              }</h3> <h4>${body.data[i].practices[0].visit_address.street} ${
                body.data[i].practices[0].visit_address.city
              } ${body.data[i].practices[0].visit_address.state} ${
                body.data[i].practices[0].visit_address.zip
              }</h4> <h5>${
                body.data[i].practices[0].phones[0].number
              }</h5> <h6>${body.data[i].practices[0].accepts_new_patients}</h6>`
            );
          }
        } else {
          $("#results").append(
            `<h3>There are no search results that fit your search criteria. Please try again!</h3>`
          );
        }
      },
      function(error) {
        $(".showErrors").text(
          `There was an error processing your request: ${error.message}`
        );
      }
    );
  });
});
