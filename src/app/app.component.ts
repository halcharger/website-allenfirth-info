import { Component } from '@angular/core';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedIn = faLinkedin;
}
