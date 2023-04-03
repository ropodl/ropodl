// Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleCheck,
  faSwatchbook,
  faCode,
  faPenRuler,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// import { faComment as far } from "@fortawesome/free-regular-svg-icons";

const fab = {};

export async function loadFontAwesome(app) {
  app.component("font-awesome-icon", FontAwesomeIcon);
  library.add(faInstagram, faLinkedin, faDribbble, faGithub);
}
