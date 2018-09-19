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
    testScript.setAttribute("src", "assets/js/particles.js");
    document.body.appendChild(testScript);

    setTimeout(() => {
      var testScript2 = document.createElement("script");
      testScript2.setAttribute("id", "testScript");
      testScript2.setAttribute("src", "assets/js/error500.js");
      document.body.appendChild(testScript2);
    }, 200);

  }

}
