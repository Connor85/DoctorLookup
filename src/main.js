import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Search } from "./search.js";

$(document).ready(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    $("#results").empty();

    // let location = $("#location").val();

    let newSearch = new Search();
    let promise = newSearch.getDoctors();

    promise.then(
      function(response) {
        let body = JSON.parse(response);
        for (let i = 0; i < body.data.length; i++) {
          $("#results").append(
            `<h3>${body.data[i].profile.first_name} ${
              body.data[i].profile.last_name
            }</h3>`
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
