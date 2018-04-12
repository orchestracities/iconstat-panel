'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PLUGIN_PATH = 'public/plugins/statistics-panel/';
var REMOTE_SERVER = 'https://orion.s.orchestracities.com/v2/entities/<device_id>/attrs/?options=keyValues';
var REQUEST_HEADER = {
  'Content-Type': 'application/json',
  'Fiware-Service': 'default',
  'Fiware-ServicePath': '/'
};

exports.default = {
  plugin_path: PLUGIN_PATH,
  remote_server: REMOTE_SERVER,
  request_header: REQUEST_HEADER
};
//# sourceMappingURL=definitions.js.map
