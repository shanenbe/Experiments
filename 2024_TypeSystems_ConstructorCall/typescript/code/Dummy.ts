import 'module-alias/register.js';

import {cartesian_product} from "@experimentation/modules/utils/Utils";

let cp = cartesian_product;
cp([], [], ()=>null);
