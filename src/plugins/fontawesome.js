// Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDribbble,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export async function loadFontAwesome(app) {
  app.component("font-awesome-icon", FontAwesomeIcon);
  library.add(faInstagram, faLinkedin, faDribbble, faGithub);
}
