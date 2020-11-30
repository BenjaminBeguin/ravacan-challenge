import React from 'react';

import {  notification } from 'antd';

const defaultDuration = 7;

export function successToast(params) {
  notification.open({
    duration: defaultDuration,
    ...params
  });
}

// export function errorToast(errors) {
//   let msg = () => {
//     let out = '';
//     for(key in errors)
//       out += {<li>errors[key][0]</li>}
//   }
//   notification.open({
//     duration: defaultDuration,
//     ...params
//   });
// }
