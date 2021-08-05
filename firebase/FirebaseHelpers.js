// ./firebase/FirebaseHelpers.js

import * as firebase from 'firebase';
import { firebaseConfig } from './Credentials';

firebase.initializeApp(firebaseConfig);

export default firebase;