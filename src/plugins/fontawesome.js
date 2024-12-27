import {library} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Importamos los íconos que vamos a utilizar 
import { faUser,faKey, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; 

library.add(faUser, faKey, faEnvelope, faPhone);

export default FontAwesomeIcon; 
