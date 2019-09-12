'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorForValue = exports.PanelCtrl = exports.StatisticsCtrl = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('vendor/flot/jquery.flot.js');

require('vendor/flot/jquery.flot.time.js');

require('vendor/flot/jquery.flot.gauge.js');

var _kbn = require('app/core/utils/kbn');

var _kbn2 = _interopRequireDefault(_kbn);

var _config = require('app/core/config');

var _config2 = _interopRequireDefault(_config);

var _time_series = require('app/core/time_series2');

var _time_series2 = _interopRequireDefault(_time_series);

var _sdk = require('app/plugins/sdk');

var _definitions = require('./definitions');

var _definitions2 = _interopRequireDefault(_definitions);

require('./styles/panel.css!');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//grafana specific

//plugin specific


var StatisticsCtrl = function (_MetricsPanelCtrl) {
  _inherits(StatisticsCtrl, _MetricsPanelCtrl);

  /** @ngInject */
  function StatisticsCtrl($scope, $injector, $location, linkSrv) {
    _classCallCheck(this, StatisticsCtrl);

    var _this = _possibleConstructorReturn(this, (StatisticsCtrl.__proto__ || Object.getPrototypeOf(StatisticsCtrl)).call(this, $scope, $injector));

    _this.base_path = _definitions2.default.plugin_path;
    _this.dataType = 'timeseries';
    _this.series = [];
    _this.data = [];
    _this.fontSizes = [];
    _this.fontSizesInt = [];
    _this.unitFormats = [];
    _this.invalidGaugeRange = false;

    _this.valueNameOptions = [{ value: 'min', text: 'Min' }, { value: 'max', text: 'Max' }, { value: 'avg', text: 'Average' }, { value: 'current', text: 'Current' }, { value: 'total', text: 'Total' }, { value: 'name', text: 'Name' }, { value: 'first', text: 'First' }, { value: 'delta', text: 'Delta' }, { value: 'diff', text: 'Difference' }, { value: 'range', text: 'Range' }, { value: 'last_time', text: 'Time of last point' }];
    _this.iconPositionOptions = ['title', 'value'];
    _this.iconTypeOptions = ['none', 'address-book', 'address-book-o', 'address-card', 'address-card-o', 'adjust', 'adn', 'align-center', 'align-justify', 'align-left', 'align-right', 'amazon', 'ambulance', 'american-sign-language-interpreting', 'anchor', 'android', 'angellist', 'angle-double-down', 'angle-double-left', 'angle-double-right', 'angle-double-up', 'angle-down', 'angle-left', 'angle-right', 'angle-up', 'apple', 'archive', 'area-chart', 'arrow-circle-down', 'arrow-circle-left', 'arrow-circle-o-down', 'arrow-circle-o-left', 'arrow-circle-o-right', 'arrow-circle-o-up', 'arrow-circle-right', 'arrow-circle-up', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrows', 'arrows-alt', 'arrows-h', 'arrows-v', 'asl-interpreting', 'assistive-listening-systems', 'asterisk', 'at', 'audio-description', 'automobile', 'backward', 'balance-scale', 'ban', 'bandcamp', 'bank', 'bar-chart', 'bar-chart-o', 'barcode', 'bars', 'bath', 'bathtub', 'battery', 'battery-0', 'battery-1', 'battery-2', 'battery-3', 'battery-4', 'battery-empty', 'battery-full', 'battery-half', 'battery-quarter', 'battery-three-quarters', 'bed', 'beer', 'behance', 'behance-square', 'bell', 'bell-o', 'bell-slash', 'bell-slash-o', 'bicycle', 'binoculars', 'birthday-cake', 'bitbucket', 'bitbucket-square', 'bitcoin', 'black-tie', 'blind', 'bluetooth', 'bluetooth-b', 'bold', 'bolt', 'bomb', 'book', 'bookmark', 'bookmark-o', 'braille', 'briefcase', 'btc', 'bug', 'building', 'building-o', 'bullhorn', 'bullseye', 'bus', 'buysellads', 'cab', 'calculator', 'calendar', 'calendar-check-o', 'calendar-minus-o', 'calendar-o', 'calendar-plus-o', 'calendar-times-o', 'camera', 'camera-retro', 'car', 'caret-down', 'caret-left', 'caret-right', 'caret-square-o-down', 'caret-square-o-left', 'caret-square-o-right', 'caret-square-o-up', 'caret-up', 'cart-arrow-down', 'cart-plus', 'cc', 'cc-amex', 'cc-diners-club', 'cc-discover', 'cc-jcb', 'cc-mastercard', 'cc-paypal', 'cc-stripe', 'cc-visa', 'certificate', 'chain', 'chain-broken', 'check', 'check-circle', 'check-circle-o', 'check-square', 'check-square-o', 'chevron-circle-down', 'chevron-circle-left', 'chevron-circle-right', 'chevron-circle-up', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'child', 'chrome', 'circle', 'circle-o', 'circle-o-notch', 'circle-thin', 'clipboard', 'clock-o', 'clone', 'close', 'cloud', 'cloud-download', 'cloud-upload', 'cny', 'code', 'code-fork', 'codepen', 'codiepie', 'coffee', 'cog', 'cogs', 'columns', 'comment', 'comment-o', 'commenting', 'commenting-o', 'comments', 'comments-o', 'compass', 'compress', 'connectdevelop', 'contao', 'copy', 'copyright', 'creative-commons', 'credit-card', 'credit-card-alt', 'crop', 'crosshairs', 'css3', 'cube', 'cubes', 'cut', 'cutlery', 'dashboard', 'dashcube', 'database', 'deaf', 'deafness', 'dedent', 'delicious', 'desktop', 'deviantart', 'diamond', 'digg', 'dollar', 'dot-circle-o', 'download', 'dribbble', 'drivers-license', 'drivers-license-o', 'dropbox', 'drupal', 'edge', 'edit', 'eercast', 'eject', 'ellipsis-h', 'ellipsis-v', 'empire', 'envelope', 'envelope-o', 'envelope-open', 'envelope-open-o', 'envelope-square', 'envira', 'eraser', 'etsy', 'eur', 'euro', 'exchange', 'exclamation', 'exclamation-circle', 'exclamation-triangle', 'expand', 'expeditedssl', 'external-link', 'external-link-square', 'eye', 'eye-slash', 'eyedropper', 'fa', 'facebook', 'facebook-f', 'facebook-official', 'facebook-square', 'fast-backward', 'fast-forward', 'fax', 'feed', 'female', 'fighter-jet', 'file', 'file-archive-o', 'file-audio-o', 'file-code-o', 'file-excel-o', 'file-image-o', 'file-movie-o', 'file-o', 'file-pdf-o', 'file-photo-o', 'file-picture-o', 'file-powerpoint-o', 'file-sound-o', 'file-text', 'file-text-o', 'file-video-o', 'file-word-o', 'file-zip-o', 'files-o', 'film', 'filter', 'fire', 'fire-extinguisher', 'firefox', 'first-order', 'flag', 'flag-checkered', 'flag-o', 'flash', 'flask', 'flickr', 'floppy-o', 'folder', 'folder-o', 'folder-open', 'folder-open-o', 'font', 'font-awesome', 'fonticons', 'fort-awesome', 'forumbee', 'forward', 'foursquare', 'free-code-camp', 'frown-o', 'futbol-o', 'gamepad', 'gavel', 'gbp', 'ge', 'gear', 'gears', 'genderless', 'get-pocket', 'gg', 'gg-circle', 'gift', 'git', 'git-square', 'github', 'github-alt', 'github-square', 'gitlab', 'gittip', 'glass', 'glide', 'glide-g', 'globe', 'google', 'google-plus', 'google-plus-circle', 'google-plus-official', 'google-plus-square', 'google-wallet', 'graduation-cap', 'gratipay', 'grav', 'group', 'h-square', 'hacker-news', 'hand-grab-o', 'hand-lizard-o', 'hand-o-down', 'hand-o-left', 'hand-o-right', 'hand-o-up', 'hand-paper-o', 'hand-peace-o', 'hand-pointer-o', 'hand-rock-o', 'hand-scissors-o', 'hand-spock-o', 'hand-stop-o', 'handshake-o', 'hard-of-hearing', 'hashtag', 'hdd-o', 'header', 'headphones', 'heart', 'heart-o', 'heartbeat', 'history', 'home', 'hospital-o', 'hotel', 'hourglass', 'hourglass-1', 'hourglass-2', 'hourglass-3', 'hourglass-end', 'hourglass-half', 'hourglass-o', 'hourglass-start', 'houzz', 'html5', 'i-cursor', 'id-badge', 'id-card', 'id-card-o', 'ils', 'image', 'imdb', 'inbox', 'indent', 'industry', 'info', 'info-circle', 'inr', 'instagram', 'institution', 'internet-explorer', 'intersex', 'ioxhost', 'italic', 'joomla', 'jpy', 'jsfiddle', 'key', 'keyboard-o', 'krw', 'language', 'laptop', 'lastfm', 'lastfm-square', 'leaf', 'leanpub', 'legal', 'lemon-o', 'level-down', 'level-up', 'life-bouy', 'life-buoy', 'life-ring', 'life-saver', 'lightbulb-o', 'line-chart', 'link', 'linkedin', 'linkedin-square', 'linode', 'linux', 'list', 'list-alt', 'list-ol', 'list-ul', 'location-arrow', 'lock', 'long-arrow-down', 'long-arrow-left', 'long-arrow-right', 'long-arrow-up', 'low-vision', 'magic', 'magnet', 'mail-forward', 'mail-reply', 'mail-reply-all', 'male', 'map', 'map-marker', 'map-o', 'map-pin', 'map-signs', 'mars', 'mars-double', 'mars-stroke', 'mars-stroke-h', 'mars-stroke-v', 'maxcdn', 'meanpath', 'medium', 'medkit', 'meetup', 'meh-o', 'mercury', 'microchip', 'microphone', 'microphone-slash', 'minus', 'minus-circle', 'minus-square', 'minus-square-o', 'mixcloud', 'mobile', 'mobile-phone', 'modx', 'money', 'moon-o', 'mortar-board', 'motorcycle', 'mouse-pointer', 'music', 'navicon', 'neuter', 'newspaper-o', 'object-group', 'object-ungroup', 'odnoklassniki', 'odnoklassniki-square', 'opencart', 'openid', 'opera', 'optin-monster', 'outdent', 'pagelines', 'paint-brush', 'paper-plane', 'paper-plane-o', 'paperclip', 'paragraph', 'paste', 'pause', 'pause-circle', 'pause-circle-o', 'paw', 'paypal', 'pencil', 'pencil-square', 'pencil-square-o', 'percent', 'phone', 'phone-square', 'photo', 'picture-o', 'pie-chart', 'pied-piper', 'pied-piper-alt', 'pied-piper-pp', 'pinterest', 'pinterest-p', 'pinterest-square', 'plane', 'play', 'play-circle', 'play-circle-o', 'plug', 'plus', 'plus-circle', 'plus-square', 'plus-square-o', 'podcast', 'power-off', 'print', 'product-hunt', 'puzzle-piece', 'qq', 'qrcode', 'question', 'question-circle', 'question-circle-o', 'quora', 'quote-left', 'quote-right', 'ra', 'random', 'ravelry', 'rebel', 'recycle', 'reddit', 'reddit-alien', 'reddit-square', 'refresh', 'registered', 'remove', 'renren', 'reorder', 'repeat', 'reply', 'reply-all', 'resistance', 'retweet', 'rmb', 'road', 'rocket', 'rotate-left', 'rotate-right', 'rouble', 'rss', 'rss-square', 'rub', 'ruble', 'rupee', 's15', 'safari', 'save', 'scissors', 'scribd', 'search', 'search-minus', 'search-plus', 'sellsy', 'send', 'send-o', 'server', 'share', 'share-alt', 'share-alt-square', 'share-square', 'share-square-o', 'shekel', 'sheqel', 'shield', 'ship', 'shirtsinbulk', 'shopping-bag', 'shopping-basket', 'shopping-cart', 'shower', 'sign-in', 'sign-language', 'sign-out', 'signal', 'signing', 'simplybuilt', 'sitemap', 'skyatlas', 'skype', 'slack', 'sliders', 'slideshare', 'smile-o', 'snapchat', 'snapchat-ghost', 'snapchat-square', 'snowflake-o', 'soccer-ball-o', 'sort', 'sort-alpha-asc', 'sort-alpha-desc', 'sort-amount-asc', 'sort-amount-desc', 'sort-asc', 'sort-desc', 'sort-down', 'sort-numeric-asc', 'sort-numeric-desc', 'sort-up', 'soundcloud', 'space-shuttle', 'spinner', 'spoon', 'spotify', 'square', 'square-o', 'stack-exchange', 'stack-overflow', 'star', 'star-half', 'star-half-empty', 'star-half-full', 'star-half-o', 'star-o', 'steam', 'steam-square', 'step-backward', 'step-forward', 'stethoscope', 'sticky-note', 'sticky-note-o', 'stop', 'stop-circle', 'stop-circle-o', 'street-view', 'strikethrough', 'stumbleupon', 'stumbleupon-circle', 'subscript', 'subway', 'suitcase', 'sun-o', 'superpowers', 'superscript', 'support', 'table', 'tablet', 'tachometer', 'tag', 'tags', 'tasks', 'taxi', 'telegram', 'television', 'tencent-weibo', 'terminal', 'text-height', 'text-width', 'th', 'th-large', 'th-list', 'themeisle', 'thermometer', 'thermometer-0', 'thermometer-1', 'thermometer-2', 'thermometer-3', 'thermometer-4', 'thermometer-empty', 'thermometer-full', 'thermometer-half', 'thermometer-quarter', 'thermometer-three-quarters', 'thumb-tack', 'thumbs-down', 'thumbs-o-down', 'thumbs-o-up', 'thumbs-up', 'ticket', 'times', 'times-circle', 'times-circle-o', 'times-rectangle', 'times-rectangle-o', 'tint', 'toggle-down', 'toggle-left', 'toggle-off', 'toggle-on', 'toggle-right', 'toggle-up', 'trademark', 'train', 'transgender', 'transgender-alt', 'trash', 'trash-o', 'tree', 'trello', 'tripadvisor', 'trophy', 'truck', 'try', 'tty', 'tumblr', 'tumblr-square', 'turkish-lira', 'tv', 'twitch', 'twitter', 'twitter-square', 'umbrella', 'underline', 'undo', 'universal-access', 'university', 'unlink', 'unlock', 'unlock-alt', 'unsorted', 'upload', 'usb', 'usd', 'user', 'user-circle', 'user-circle-o', 'user-md', 'user-o', 'user-plus', 'user-secret', 'user-times', 'users', 'vcard', 'vcard-o', 'venus', 'venus-double', 'venus-mars', 'viacoin', 'viadeo', 'viadeo-square', 'video-camera', 'vimeo', 'vimeo-square', 'vine', 'vk', 'volume-control-phone', 'volume-down', 'volume-off', 'volume-up', 'warning', 'wechat', 'weibo', 'weixin', 'whatsapp', 'wheelchair', 'wheelchair-alt', 'wifi', 'wikipedia-w', 'window-close', 'window-close-o', 'window-maximize', 'window-minimize', 'window-restore', 'windows', 'won', 'wordpress', 'wpbeginner', 'wpexplorer', 'wpforms', 'wrench', 'xing', 'xing-square', 'y-combinator', 'y-combinator-square', 'yahoo', 'yc', 'yc-square', 'yelp', 'yen', 'yoast', 'youtube', 'youtube-play'];

    // Set and populate defaults
    _this.panelDefaults = {
      links: [],
      datasource: null,
      maxDataPoints: 100,
      interval: null,
      targets: [{}],
      cacheTimeout: null,
      format: 'none',
      prefix: '',
      postfix: '',
      nullText: null,
      valueMaps: [{ value: 'null', op: '=', text: 'N/A' }],
      mappingTypes: [{ name: 'value to text', value: 1 }, { name: 'range to text', value: 2 }],
      rangeMaps: [{ from: 'null', to: 'null', text: 'N/A' }],
      mappingType: 1,
      nullPointMode: 'connected',
      valueName: 'avg',
      prefixFontSize: '50%',
      valueFontSize: '80%',
      postfixFontSize: '50%',
      thresholds: '',
      colorBackground: false,
      colorValue: false,
      colors: ['#299c46', 'rgba(237, 129, 40, 0.89)', '#d44a3a'],
      sparkline: {
        show: false,
        full: false,
        lineColor: 'rgb(31, 120, 193)',
        fillColor: 'rgba(31, 118, 189, 0.18)'
      },
      gauge: {
        show: false,
        minValue: 0,
        maxValue: 100,
        thresholdMarkers: true,
        thresholdLabels: false
      },
      trendIndicator: {
        show: false,
        size: 30
      },
      tableColumn: '',
      subtitle: 'NA',
      orionURL: 'https://api.s.orchestracities.com/context',
      fiwareService: 'default',
      fiwareServicepath: '/',
      entity: '',
      entityField: '',
      inputValue: 0,
      maxValue: 100,
      minValue: 0,
      iconType: '',
      iconPosition: '',
      allowActuation: false
    };

    _lodash2.default.defaultsDeep(_this.panel, _this.panelDefaults);

    _this.initModalValues();

    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('data-error', _this.onDataError.bind(_this));
    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

    _this.onSparklineColorChange = _this.onSparklineColorChange.bind(_this);
    _this.onSparklineFillChange = _this.onSparklineFillChange.bind(_this);

    _this.handleClickActuation = _this.showActuationModal.bind(_this);
    _this.handleClickTitle = _this.showDetailsModal.bind(_this);
    _this.handleSendToRemote = _this.sendToRemote.bind(_this);

    _this.handleClickInput = _this.sendInputToOrion.bind(_this);
    return _this;
  }

  _createClass(StatisticsCtrl, [{
    key: 'sendInputToOrion',
    value: function sendInputToOrion() {
      var url = this.panel.orionURL + '/v2/entities/' + this.panel.entity + '/attrs/?options=keyValues';
      var data = {};
      data[this.panel.entityField] = this.panel.inputValue;
      var headers = {
        'Content-Type': 'application/json',
        'Fiware-Service': this.panel.fiwareService,
        'Fiware-ServicePath': this.panel.fiwareServicepath
      };
      fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers(headers)
      }).then(function (response) {
        if (response.ok) {
          console.info('Success:', response);
        } else {
          console.warn('Error:', error);
          alert('An error has occured: failed to update');
        }
      }).catch(function (error) {
        console.warn('Error:', error);
        alert('An error has occured: failed to update');
      });
    }
  }, {
    key: 'initModalValues',
    value: function initModalValues() {
      this.modal = {
        allowedEntities: [],
        allowedTypes: [],
        entity: {},
        type: {},
        value: '',
        valid: false
      };
    }
  }, {
    key: 'initDetailModalValues',
    value: function initDetailModalValues() {
      this.modal = { values: this.getDetailsModalValues() };
    }
  }, {
    key: 'showActuationModal',
    value: function showActuationModal() {
      if (!this.panel.allowActuation) return;

      this.initModalValues();

      var _processTargets = processTargets(this.panel.targets);

      var _processTargets2 = _slicedToArray(_processTargets, 2);

      this.modal.allowedEntities = _processTargets2[0];
      this.modal.allowedTypes = _processTargets2[1];

      var modalScope = this.$scope.$new();
      modalScope.panel = this.panel;

      this.publishAppEvent('show-modal', {
        src: this.base_path + 'partials/modal_actuation.html',
        modalClass: 'confirm-modal',
        scope: modalScope
      });
    }
  }, {
    key: 'showDetailsModal',
    value: function showDetailsModal() {

      this.initDetailModalValues();

      var modalScope = this.$scope.$new();
      modalScope.panel = this.panel;

      this.publishAppEvent('show-modal', {
        src: this.base_path + 'partials/modal_details.html',
        modalClass: 'confirm-modal',
        scope: modalScope
      });
    }
  }, {
    key: 'validFieldValues',
    value: function validFieldValues() {
      return this.modal.type.column !== undefined && this.modal.entity.value !== undefined && this.modal.value !== undefined && this.modal.value !== '';
    }
  }, {
    key: 'sendToRemote',
    value: function sendToRemote() {
      this.modal.valid = this.validFieldValues();
      if (!this.modal.valid) {
        processResponse('warning', 'Please, choose or set all fields!');
        return;
      }

      var url = this.panel.orionURL + '/v2/entities/' + this.modal.entity.value + '/attrs/?options=keyValues';
      var data = {};
      data[this.modal.type.column] = this.modal.value;
      console.info(url);
      console.info(data);
      var headers = {
        'Content-Type': 'application/json',
        'Fiware-Service': this.panel.fiwareService,
        'Fiware-ServicePath': this.panel.fiwareServicepath
      };
      fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers(headers)
      }).then(function (response) {
        if (response.ok) {
          console.info('Success:', response);
          processResponse('success', 'Successfuly updated!');
        } else processResponse('warning', 'Error updating!');
      }).catch(function (error) {
        console.warn('Error:', error);
        processResponse('warning', error);
      });

      function processResponse(type, msg) {
        document.querySelector('.modal-content > .server-response').innerHTML = '<div class=\'alert alert-' + type + ' fade in alert-dismissible\'>' + msg + '</div>';
      }
    }
  }, {
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
      this.fontSizesInt = [10, 30, 50, 70, 80, 100, 110, 120];
      this.addEditorTab('Options', _definitions2.default.plugin_path + 'partials/editor.html', 2);
      this.addEditorTab('Value Mappings', _definitions2.default.plugin_path + 'partials/mappings.html', 3);
      this.unitFormats = _kbn2.default.getUnitFormats();
    }
  }, {
    key: 'setUnitFormat',
    value: function setUnitFormat(subItem) {
      this.panel.format = subItem.value;
      this.refresh();
    }
  }, {
    key: 'onDataError',
    value: function onDataError(err) {
      this.onDataReceived([]);
    }
  }, {
    key: 'onDataReceived',
    value: function onDataReceived(dataList) {
      if (!dataList) {
        console.debug('No data recieved');
        return;
      }

      if (dataList.length === 0) {
        console.debug('No dataList recieved');
        return;
      }

      var data = {};

      if (dataList.length > 0 && dataList[0].type === 'table') {
        this.dataType = 'table';
        var tableData = dataList.map(this.tableHandler.bind(this));
        this.setTableValues(tableData, data);
      } else {
        this.dataType = 'timeseries';
        this.series = dataList.map(this.seriesHandler.bind(this));
        this.setValues(data);
      }

      this.data = data;
      console.debug(this.data);
      this.render();
    }
  }, {
    key: 'seriesHandler',
    value: function seriesHandler(seriesData) {
      var series = new _time_series2.default({
        datapoints: seriesData.datapoints || [],
        alias: seriesData.target
      });

      series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
      return series;
    }
  }, {
    key: 'tableHandler',
    value: function tableHandler(tableData) {
      var datapoints = [];
      var columnNames = {};

      tableData.columns.forEach(function (column, columnIndex) {
        columnNames[columnIndex] = column.text;
      });

      this.tableColumnOptions = columnNames;
      if (!_lodash2.default.find(tableData.columns, ['text', this.panel.tableColumn])) {
        this.setTableColumnToSensibleDefault(tableData);
      }

      tableData.rows.forEach(function (row) {
        var datapoint = {};

        row.forEach(function (value, columnIndex) {
          var key = columnNames[columnIndex];
          datapoint[key] = value;
        });

        datapoints.push(datapoint);
      });

      return datapoints;
    }
  }, {
    key: 'setTableColumnToSensibleDefault',
    value: function setTableColumnToSensibleDefault(tableData) {
      if (this.tableColumnOptions.length === 1) {
        this.panel.tableColumn = this.tableColumnOptions[0];
      } else {
        this.panel.tableColumn = _lodash2.default.find(tableData.columns, function (col) {
          return col.type !== 'time';
        }).text;
      }
    }
  }, {
    key: 'setTableValues',
    value: function setTableValues(tableData, data) {
      if (!tableData || tableData.length === 0) {
        return;
      }

      if (tableData[0].length === 0 || tableData[0][0][this.panel.tableColumn] === undefined) {
        data.value = null;
        this.setValueMapping(data);
        return;
      }

      var datapoint = tableData[0][0];
      data.value = datapoint[this.panel.tableColumn];

      if (_lodash2.default.isString(data.value)) {
        data.valueFormatted = _lodash2.default.escape(data.value);
        data.value = 0;
        data.valueRounded = 0;
      } else {
        var decimalInfo = this.getDecimalsForValue(data.value);
        var formatFunc = _kbn2.default.valueFormats[this.panel.format];
        data.valueFormatted = formatFunc(datapoint[this.panel.tableColumn], decimalInfo.decimals, decimalInfo.scaledDecimals);
        data.valueRounded = _kbn2.default.roundValue(data.value, this.panel.decimals || 0);
      }

      this.setValueMapping(data);
    }
  }, {
    key: 'canChangeFontSize',
    value: function canChangeFontSize() {
      return this.panel.gauge.show;
    }
  }, {
    key: 'setColoring',
    value: function setColoring(options) {
      if (options.background) {
        this.panel.colorValue = false;
        this.panel.colors = ['rgba(71, 212, 59, 0.4)', 'rgba(245, 150, 40, 0.73)', 'rgba(225, 40, 40, 0.59)'];
      } else {
        this.panel.colorBackground = false;
        this.panel.colors = ['rgba(50, 172, 45, 0.97)', 'rgba(237, 129, 40, 0.89)', 'rgba(245, 54, 54, 0.9)'];
      }
      this.render();
    }
  }, {
    key: 'invertColorOrder',
    value: function invertColorOrder() {
      var tmp = this.panel.colors[0];
      this.panel.colors[0] = this.panel.colors[2];
      this.panel.colors[2] = tmp;
      this.render();
    }
  }, {
    key: 'onColorChange',
    value: function onColorChange(panelColorIndex) {
      var _this2 = this;

      return function (color) {
        _this2.panel.colors[panelColorIndex] = color;
        _this2.render();
      };
    }
  }, {
    key: 'onSparklineColorChange',
    value: function onSparklineColorChange(newColor) {
      this.panel.sparkline.lineColor = newColor;
      this.render();
    }
  }, {
    key: 'onSparklineFillChange',
    value: function onSparklineFillChange(newColor) {
      this.panel.sparkline.fillColor = newColor;
      this.render();
    }
  }, {
    key: 'getDecimalsForValue',
    value: function getDecimalsForValue(value) {
      if (_lodash2.default.isNumber(this.panel.decimals)) {
        return { decimals: this.panel.decimals, scaledDecimals: null };
      }

      var delta = value / 2;
      var dec = -Math.floor(Math.log(delta) / Math.LN10);

      var magn = Math.pow(10, -dec),
          norm = delta / magn,
          // norm is between 1.0 and 10.0
      size;

      if (norm < 1.5) {
        size = 1;
      } else if (norm < 3) {
        size = 2;
        // special case for 2.5, requires an extra decimal
        if (norm > 2.25) {
          size = 2.5;
          ++dec;
        }
      } else if (norm < 7.5) {
        size = 5;
      } else {
        size = 10;
      }

      size *= magn;

      // reduce starting decimals if not needed
      if (Math.floor(value) === value) {
        dec = 0;
      }

      var result = {};
      result.decimals = Math.max(0, dec);
      result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

      return result;
    }
  }, {
    key: 'setValues',
    value: function setValues(data) {
      data.flotpairs = [];

      console.log('setValues...');
      console.log(this.series);

      if (this.series.length === 0) {
        var _error = new Error();
        _error.message = 'No Series Error';
        _error.data = 'Metric query returns ' + this.series.length + ' series. Single Stat Panel expects a series.\n\nResponse:\n' + JSON.stringify(this.series);
        throw _error;
      }

      if (this.series && this.series.length > 0) {
        if (this.series.length > 1) {
          console.log('=> multiple series: #' + this.series.length);
        }

        var lastPoint = _lodash2.default.last(this.series[0].datapoints);
        var lastValue = _lodash2.default.isArray(lastPoint) ? lastPoint[0] : null;

        if (this.panel.valueName === 'name') {
          data.value = 0;
          data.valueRounded = 0;
          data.valueFormatted = this.series[0].alias;
        } else if (_lodash2.default.isString(lastValue)) {
          data.value = 0;
          data.valueFormatted = _lodash2.default.escape(lastValue);
          data.valueRounded = 0;
        } else if (this.panel.valueName === 'last_time') {
          var formatFunc = _kbn2.default.valueFormats[this.panel.format];
          data.value = lastPoint[1];
          data.valueRounded = data.value;
          data.valueFormatted = formatFunc(data.value, 0, 0);
        } else {
          data.value = this.series[0].stats[this.panel.valueName];
          data.flotpairs = this.series[0].flotpairs;

          var decimalInfo = this.getDecimalsForValue(data.value);
          var _formatFunc = _kbn2.default.valueFormats[this.panel.format];
          data.valueFormatted = _formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
          data.valueRounded = _kbn2.default.roundValue(data.value, decimalInfo.decimals);
        }

        // Add $__name variable for using in prefix or postfix
        data.scopedVars = _lodash2.default.extend({}, this.panel.scopedVars);
        data.scopedVars['__name'] = { value: this.series[0].label };
      }
      this.setValueMapping(data);
    }
  }, {
    key: 'setValueMapping',
    value: function setValueMapping(data) {
      // check value to text mappings if its enabled
      if (this.panel.mappingType === 1) {
        for (var i = 0; i < this.panel.valueMaps.length; i++) {
          var map = this.panel.valueMaps[i];
          // special null case
          if (map.value === 'null') {
            if (data.value === null || data.value === void 0) {
              data.valueFormatted = map.text;
              return;
            }
            continue;
          }

          // value/number to text mapping
          var value = parseFloat(map.value);
          if (value === data.valueRounded) {
            data.valueFormatted = map.text;
            return;
          }
        }
      } else if (this.panel.mappingType === 2) {
        for (var _i = 0; _i < this.panel.rangeMaps.length; _i++) {
          var _map = this.panel.rangeMaps[_i];
          // special null case
          if (_map.from === 'null' && _map.to === 'null') {
            if (data.value === null || data.value === void 0) {
              data.valueFormatted = _map.text;
              return;
            }
            continue;
          }

          // value/number to range mapping
          var from = parseFloat(_map.from);
          var to = parseFloat(_map.to);
          if (to >= data.valueRounded && from <= data.valueRounded) {
            data.valueFormatted = _map.text;
            return;
          }
        }
      }

      if (data.value === null || data.value === void 0) {
        data.valueFormatted = 'no value';
      }
    }
  }, {
    key: 'removeValueMap',
    value: function removeValueMap(map) {
      var index = _lodash2.default.indexOf(this.panel.valueMaps, map);
      this.panel.valueMaps.splice(index, 1);
      this.render();
    }
  }, {
    key: 'addValueMap',
    value: function addValueMap() {
      this.panel.valueMaps.push({ value: '', op: '=', text: '' });
    }
  }, {
    key: 'removeRangeMap',
    value: function removeRangeMap(rangeMap) {
      var index = _lodash2.default.indexOf(this.panel.rangeMaps, rangeMap);
      this.panel.rangeMaps.splice(index, 1);
      this.render();
    }
  }, {
    key: 'addRangeMap',
    value: function addRangeMap() {
      this.panel.rangeMaps.push({ from: '', to: '', text: '' });
    }
  }, {
    key: 'getDetailsModalValues',
    value: function getDetailsModalValues() {
      if (!this.series[0].datapoints) return;
      var lines_total = this.series.length;
      var cols_total = this.series[0].datapoints.length;

      var result = [];
      var pair = null;

      for (var c = 0; c < cols_total; c++) {
        pair = {};
        for (var l = 0; l < lines_total; l++) {
          pair[this.series[l].alias || this.series[l].label] = this.series[l].datapoints[c][0];
        }
        result.push(pair);
      }

      return result;
    }
  }, {
    key: 'link',
    value: function link(scope, elem, attrs, ctrl) {
      var $location = this.$location;
      var linkSrv = this.linkSrv;
      var $timeout = this.$timeout;
      var panel = ctrl.panel;
      var templateSrv = this.templateSrv;
      var data = void 0,
          linkInfo = void 0;

      var $panelContainer = elem.find('.panel-container');
      elem = elem.find('.statistics-panel-value-container');

      function applyColoringThresholds(value, valueString) {
        if (!panel.colorValue) {
          return valueString;
        }

        var color = getColorForValue(data, value);
        if (color) {
          return '<span style="color:' + color + '">' + valueString + '</span>';
        }

        return valueString;
      }

      function getDiv(className, fontSize, content) {
        content = templateSrv.replace(content, data.scopedVars);
        var spanContent = '<div class="' + className;
        if (fontSize) spanContent += '" style="font-size:' + fontSize;

        spanContent += '">' + content + '</div>';
        return spanContent;
      }

      function getTrendIndicator() {
        //probably the 'Format as' is of type 'table'. 'table' is not supported
        if (!data.flotpairs && data.flotpairs.length <= 1) {
          console.info('Unable to show trend. Please, choose other interval or verify the resultset.');
          return '<span></span>';
        }

        console.debug('first value: ' + data.flotpairs[0][1] + ', last value: ' + data.flotpairs[data.flotpairs.length - 1][1]);
        var trendIndicatorValue = data.flotpairs[data.flotpairs.length - 1][1] - data.flotpairs[0][1];
        var icon = void 0;

        console.debug('trendIndicatorValue: ' + trendIndicatorValue);

        if (trendIndicatorValue < 0) icon = 'fa-arrow-down';else if (trendIndicatorValue > 0) icon = 'fa-arrow-up';else icon = 'fa-arrow-right';

        return '<span><i class="fa ' + icon + '"></i></span>';
      }

      function getBigValueHtml() {
        var body = '';

        if (panel.iconPosition === "value") {
          var icon_class = 'fa fa-' + panel.iconType;
          body += getDiv(icon_class, panel.prefixFontSize, '');
        }

        if (panel.prefix) {
          var prefix = applyColoringThresholds(data.value, panel.prefix);
          body += getDiv('statistics-panel-prefix', panel.prefixFontSize, prefix);
        }

        var value = applyColoringThresholds(data.value, data.valueFormatted);
        body += getDiv('statistics-panel-value', panel.valueFontSize, value);

        if (panel.postfix) {
          var postfix = applyColoringThresholds(data.value, panel.postfix);
          body += getDiv('statistics-panel-postfix', panel.postfixFontSize, postfix);
        }

        if (panel.trendIndicator.show) {
          body += getDiv('statistics-panel-trendIndicator', panel.trendIndicator.size + 'px', getTrendIndicator());
        }

        return body;
      }

      function getValueText() {
        var result = panel.prefix ? templateSrv.replace(panel.prefix, data.scopedVars) : '';
        result += data.valueFormatted;
        result += panel.postfix ? templateSrv.replace(panel.postfix, data.scopedVars) : '';

        return result;
      }

      function addGauge() {
        var width = elem.width();
        var height = elem.height();
        // Allow to use a bit more space for wide gauges
        var dimension = Math.min(width, height * 1.3);

        ctrl.invalidGaugeRange = false;
        if (panel.gauge.minValue > panel.gauge.maxValue) {
          ctrl.invalidGaugeRange = true;
          return;
        }

        var plotCanvas = (0, _jquery2.default)('<div></div>');
        var plotCss = {
          top: '10px',
          margin: 'auto',
          position: 'relative',
          height: height * 0.9 + 'px',
          width: dimension + 'px'
        };

        plotCanvas.css(plotCss);

        var thresholds = [];
        for (var i = 0; i < data.thresholds.length; i++) {
          thresholds.push({
            value: data.thresholds[i],
            color: data.colorMap[i]
          });
        }
        thresholds.push({
          value: panel.gauge.maxValue,
          color: data.colorMap[data.colorMap.length - 1]
        });

        var bgColor = _config2.default.bootData.user.lightTheme ? 'rgb(230,230,230)' : 'rgb(38,38,38)';

        var fontScale = parseInt(panel.valueFontSize) / 100;
        var fontSize = Math.min(dimension / 5, 100) * fontScale;
        // Reduce gauge width if threshold labels enabled
        var gaugeWidthReduceRatio = panel.gauge.thresholdLabels ? 1.5 : 1;
        var gaugeWidth = Math.min(dimension / 6, 60) / gaugeWidthReduceRatio;
        var thresholdMarkersWidth = gaugeWidth / 5;
        var thresholdLabelFontSize = fontSize / 2.5;

        var options = {
          series: {
            gauges: {
              gauge: {
                min: panel.gauge.minValue,
                max: panel.gauge.maxValue,
                background: { color: bgColor },
                border: { color: null },
                shadow: { show: false },
                width: gaugeWidth
              },
              frame: { show: false },
              label: { show: false },
              layout: { margin: 0, thresholdWidth: 0 },
              cell: { border: { width: 0 } },
              threshold: {
                values: thresholds,
                label: {
                  show: panel.gauge.thresholdLabels,
                  margin: thresholdMarkersWidth + 1,
                  font: { size: thresholdLabelFontSize }
                },
                show: panel.gauge.thresholdMarkers,
                width: thresholdMarkersWidth
              },
              value: {
                color: panel.colorValue ? getColorForValue(data, data.valueRounded) : null,
                formatter: function formatter() {
                  return getValueText();
                },
                font: {
                  size: fontSize,
                  family: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }
              },
              show: true
            }
          }
        };

        elem.append(plotCanvas);

        var plotSeries = {
          data: [[0, data.valueRounded]]
        };

        _jquery2.default.plot(plotCanvas, [plotSeries], options);
      }

      function addSparkline() {
        var width = elem.width() + 20;
        if (width < 30) {
          // element has not gotten it's width yet
          // delay sparkline render
          setTimeout(addSparkline, 30);
          return;
        }

        var height = ctrl.height;
        var plotCanvas = (0, _jquery2.default)('<div></div>');
        var plotCss = {};
        plotCss.position = 'absolute';

        if (panel.sparkline.full) {
          plotCss.bottom = '5px';
          plotCss.left = '-5px';
          plotCss.width = width - 10 + 'px';
          var dynamicHeightMargin = height <= 100 ? 5 : Math.round(height / 100) * 15 + 5;
          plotCss.height = height - dynamicHeightMargin + 'px';
        } else {
          plotCss.bottom = '0px';
          plotCss.left = '-5px';
          plotCss.width = width - 10 + 'px';
          plotCss.height = Math.floor(height * 0.25) + 'px';
        }

        plotCanvas.css(plotCss);

        var options = {
          legend: { show: false },
          series: {
            lines: {
              show: true,
              fill: 1,
              lineWidth: 1,
              fillColor: panel.sparkline.fillColor
            }
          },
          yaxes: { show: false },
          xaxis: {
            show: false,
            mode: 'time',
            min: ctrl.range.from.valueOf(),
            max: ctrl.range.to.valueOf()
          },
          grid: { hoverable: false, show: false }
        };

        elem.append(plotCanvas);

        var plotSeries = {
          data: data.flotpairs,
          color: panel.sparkline.lineColor
        };

        _jquery2.default.plot(plotCanvas, [plotSeries], options);
      }

      function setPanelBackground() {
        if (panel.colorBackground) {
          var color = getColorForValue(data, data.value);
          if (color) {
            $panelContainer.css('background-color', color);
            if (scope.fullscreen) {
              elem.css('background-color', color);
            } else {
              elem.css('background-color', '');
            }
          }
        } else {
          $panelContainer.css('background-color', '');
          elem.css('background-color', '');
        }
      }

      function render() {

        if (!ctrl.data || ctrl.data.length === 0) return;

        data = ctrl.data;

        // get thresholds
        data.thresholds = panel.thresholds.split(',').map(function (strVale) {
          return Number(strVale.trim());
        });
        data.colorMap = panel.colors;

        setPanelBackground();

        elem.html('');
        !panel.gauge.show && elem.append(getBigValueHtml());
        panel.sparkline.show && addSparkline();
        panel.gauge.show && addGauge();

        elem.toggleClass('pointer', panel.links.length > 0);

        linkInfo = null;
      }

      function hookupDrilldownLinkTooltip() {
        // drilldown link tooltip
        var drilldownTooltip = (0, _jquery2.default)('<div id="tooltip" class="">hello</div>"');

        elem.mouseleave(function () {
          if (panel.links.length === 0) {
            return;
          }
          $timeout(function () {
            drilldownTooltip.detach();
          });
        });

        elem.click(function (evt) {
          if (!linkInfo) {
            return;
          }
          // ignore title clicks in title
          if ((0, _jquery2.default)(evt).parents('.panel-header').length > 0) {
            return;
          }

          if (linkInfo.target === '_blank') {
            window.open(linkInfo.href, '_blank');
            return;
          }

          if (linkInfo.href.indexOf('http') === 0) {
            window.location.href = linkInfo.href;
          } else {
            $timeout(function () {
              $location.url(linkInfo.href);
            });
          }

          drilldownTooltip.detach();
        });

        elem.mousemove(function (e) {
          if (!linkInfo) {
            return;
          }

          drilldownTooltip.text('click to go to: ' + linkInfo.title);
          drilldownTooltip.place_tt(e.pageX, e.pageY - 50);
        });
      }

      hookupDrilldownLinkTooltip();

      this.events.on('render', function () {
        render();
        ctrl.renderingCompleted();
      });
    }
  }]);

  return StatisticsCtrl;
}(_sdk.MetricsPanelCtrl);

function getColorForValue(data, value) {
  if (!_lodash2.default.isFinite(value)) {
    return null;
  }
  for (var i = data.thresholds.length; i > 0; i--) {
    if (value >= data.thresholds[i - 1]) {
      return data.colorMap[i];
    }
  }
  return _lodash2.default.first(data.colorMap);
}

function processTargets(targets) {
  var whereClauses = targets.map(function (elem) {
    return elem.whereClauses.filter(function (elem) {
      return elem.operator == "=";
    });
  }).map(function (elem) {
    return elem.map(function (_ref) {
      var column = _ref.column,
          value = _ref.value;
      return { column: column, value: value };
    });
  });
  var metrics = targets.map(function (elem) {
    return elem.metricAggs.filter(function (elem) {
      return elem.type == 'raw';
    });
  }).map(function (elem) {
    return elem.map(function (_ref2) {
      var column = _ref2.column;
      return { column: column };
    });
  });

  var entities = whereClauses.length > 0 ? whereClauses[0].map(function (elem) {
    return elem;
  }) : [];
  var fields = metrics.length > 0 ? metrics[0].map(function (elem) {
    return elem;
  }) : [];

  return [entities, fields];
}

StatisticsCtrl.templateUrl = 'partials/module.html';

exports.StatisticsCtrl = StatisticsCtrl;
exports.PanelCtrl = StatisticsCtrl;
exports.getColorForValue = getColorForValue;
//# sourceMappingURL=module.js.map
