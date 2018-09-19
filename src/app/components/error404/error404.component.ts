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
    testScript.setAttribute("src", "assets/js/particles.js");
    document.body.appendChild(testScript);

    setTimeout(() => {
      var testScript2 = document.createElement("script");
      testScript2.setAttribute("id", "testScript");
      testScript2.setAttribute("src", "assets/js/error404.js");
      document.body.appendChild(testScript2);
    }, 200);



  }

}
