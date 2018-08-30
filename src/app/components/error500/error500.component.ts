import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.css']
})
export class Error500Component implements OnInit {

  constructor() { }

  ngOnInit() {

    var testScript = document.createElement("script");
    testScript.setAttribute("id", "testScript");
    testScript.setAttribute("src", "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js");
    document.body.appendChild(testScript);

    var testScript2 = document.createElement("script");
    testScript2.setAttribute("id", "testScript");
    testScript2.setAttribute("src", "assets/js/error500.js");
    document.body.appendChild(testScript2);

  }

}
