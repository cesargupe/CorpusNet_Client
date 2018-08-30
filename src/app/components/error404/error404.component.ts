import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit() {

    var testScript = document.createElement("script");
    testScript.setAttribute("id", "testScript");
    testScript.setAttribute("src", "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js");
    document.body.appendChild(testScript);

    var testScript2 = document.createElement("script");
    testScript2.setAttribute("id", "testScript");
    testScript2.setAttribute("src", "assets/js/error404.js");
    document.body.appendChild(testScript2);

  }

}
