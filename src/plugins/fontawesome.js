// Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// import { } from "@fortawesome/free-regular-svg-icons";

export async function loadFontAwesome(app) {
  app.component("font-awesome-icon", FontAwesomeIcon);
  library.add(faInstagram, faLinkedin, faDribbble, faGithub);
}
