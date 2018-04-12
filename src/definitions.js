const PLUGIN_PATH = 'public/plugins/statistics-panel/'
const REMOTE_SERVER = 'https://orion.s.orchestracities.com/v2/entities/<device_id>/attrs/?options=keyValues'
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    'Fiware-Service': 'default',
    'Fiware-ServicePath': '/'
  }

export default {
  plugin_path: PLUGIN_PATH,
  remote_server: REMOTE_SERVER,
  request_header: REQUEST_HEADER
};
