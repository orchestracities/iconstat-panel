import _ from 'lodash';
import $ from 'jquery';
import 'vendor/flot/jquery.flot.js';
import 'vendor/flot/jquery.flot.time.js';
import 'vendor/flot/jquery.flot.gauge.js';
//grafana specific
import kbn from 'app/core/utils/kbn';
import config from 'app/core/config';
import TimeSeries from 'app/core/time_series2';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
//plugin specific
import definitions from './definitions';
import './styles/panel.css!';

class StatisticsCtrl extends MetricsPanelCtrl {

  /** @ngInject */
  constructor($scope, $injector, $location, linkSrv) {
    super($scope, $injector);

    this.base_path = definitions.plugin_path;
    this.dataType = 'timeseries';
    this.series = [];
    this.data = [];
    this.fontSizes = [];
    this.fontSizesInt = [];
    this.unitFormats = [];
    this.invalidGaugeRange = false;

    this.valueNameOptions = [
        { value: 'min', text: 'Min' },
        { value: 'max', text: 'Max' },
        { value: 'avg', text: 'Average' },
        { value: 'current', text: 'Current' },
        { value: 'total', text: 'Total' },
        { value: 'name', text: 'Name' },
        { value: 'first', text: 'First' },
        { value: 'delta', text: 'Delta' },
        { value: 'diff', text: 'Difference' },
        { value: 'range', text: 'Range' },
        { value: 'last_time', text: 'Time of last point' },
    ];
    this.iconPositionOptions = [ 'title', 'value'];
    this.iconTypeOptions = [
      'none',
      'address-book',
      'address-book-o',
      'address-card',
      'address-card-o',
      'adjust',
      'adn',
      'align-center',
      'align-justify',
      'align-left',
      'align-right',
      'amazon',
      'ambulance',
      'american-sign-language-interpreting',
      'anchor',
      'android',
      'angellist',
      'angle-double-down',
      'angle-double-left',
      'angle-double-right',
      'angle-double-up',
      'angle-down',
      'angle-left',
      'angle-right',
      'angle-up',
      'apple',
      'archive',
      'area-chart',
      'arrow-circle-down',
      'arrow-circle-left',
      'arrow-circle-o-down',
      'arrow-circle-o-left',
      'arrow-circle-o-right',
      'arrow-circle-o-up',
      'arrow-circle-right',
      'arrow-circle-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'arrows',
      'arrows-alt',
      'arrows-h',
      'arrows-v',
      'asl-interpreting',
      'assistive-listening-systems',
      'asterisk',
      'at',
      'audio-description',
      'automobile',
      'backward',
      'balance-scale',
      'ban',
      'bandcamp',
      'bank',
      'bar-chart',
      'bar-chart-o',
      'barcode',
      'bars',
      'bath',
      'bathtub',
      'battery',
      'battery-0',
      'battery-1',
      'battery-2',
      'battery-3',
      'battery-4',
      'battery-empty',
      'battery-full',
      'battery-half',
      'battery-quarter',
      'battery-three-quarters',
      'bed',
      'beer',
      'behance',
      'behance-square',
      'bell',
      'bell-o',
      'bell-slash',
      'bell-slash-o',
      'bicycle',
      'binoculars',
      'birthday-cake',
      'bitbucket',
      'bitbucket-square',
      'bitcoin',
      'black-tie',
      'blind',
      'bluetooth',
      'bluetooth-b',
      'bold',
      'bolt',
      'bomb',
      'book',
      'bookmark',
      'bookmark-o',
      'braille',
      'briefcase',
      'btc',
      'bug',
      'building',
      'building-o',
      'bullhorn',
      'bullseye',
      'bus',
      'buysellads',
      'cab',
      'calculator',
      'calendar',
      'calendar-check-o',
      'calendar-minus-o',
      'calendar-o',
      'calendar-plus-o',
      'calendar-times-o',
      'camera',
      'camera-retro',
      'car',
      'caret-down',
      'caret-left',
      'caret-right',
      'caret-square-o-down',
      'caret-square-o-left',
      'caret-square-o-right',
      'caret-square-o-up',
      'caret-up',
      'cart-arrow-down',
      'cart-plus',
      'cc',
      'cc-amex',
      'cc-diners-club',
      'cc-discover',
      'cc-jcb',
      'cc-mastercard',
      'cc-paypal',
      'cc-stripe',
      'cc-visa',
      'certificate',
      'chain',
      'chain-broken',
      'check',
      'check-circle',
      'check-circle-o',
      'check-square',
      'check-square-o',
      'chevron-circle-down',
      'chevron-circle-left',
      'chevron-circle-right',
      'chevron-circle-up',
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'child',
      'chrome',
      'circle',
      'circle-o',
      'circle-o-notch',
      'circle-thin',
      'clipboard',
      'clock-o',
      'clone',
      'close',
      'cloud',
      'cloud-download',
      'cloud-upload',
      'cny',
      'code',
      'code-fork',
      'codepen',
      'codiepie',
      'coffee',
      'cog',
      'cogs',
      'columns',
      'comment',
      'comment-o',
      'commenting',
      'commenting-o',
      'comments',
      'comments-o',
      'compass',
      'compress',
      'connectdevelop',
      'contao',
      'copy',
      'copyright',
      'creative-commons',
      'credit-card',
      'credit-card-alt',
      'crop',
      'crosshairs',
      'css3',
      'cube',
      'cubes',
      'cut',
      'cutlery',
      'dashboard',
      'dashcube',
      'database',
      'deaf',
      'deafness',
      'dedent',
      'delicious',
      'desktop',
      'deviantart',
      'diamond',
      'digg',
      'dollar',
      'dot-circle-o',
      'download',
      'dribbble',
      'drivers-license',
      'drivers-license-o',
      'dropbox',
      'drupal',
      'edge',
      'edit',
      'eercast',
      'eject',
      'ellipsis-h',
      'ellipsis-v',
      'empire',
      'envelope',
      'envelope-o',
      'envelope-open',
      'envelope-open-o',
      'envelope-square',
      'envira',
      'eraser',
      'etsy',
      'eur',
      'euro',
      'exchange',
      'exclamation',
      'exclamation-circle',
      'exclamation-triangle',
      'expand',
      'expeditedssl',
      'external-link',
      'external-link-square',
      'eye',
      'eye-slash',
      'eyedropper',
      'fa',
      'facebook',
      'facebook-f',
      'facebook-official',
      'facebook-square',
      'fast-backward',
      'fast-forward',
      'fax',
      'feed',
      'female',
      'fighter-jet',
      'file',
      'file-archive-o',
      'file-audio-o',
      'file-code-o',
      'file-excel-o',
      'file-image-o',
      'file-movie-o',
      'file-o',
      'file-pdf-o',
      'file-photo-o',
      'file-picture-o',
      'file-powerpoint-o',
      'file-sound-o',
      'file-text',
      'file-text-o',
      'file-video-o',
      'file-word-o',
      'file-zip-o',
      'files-o',
      'film',
      'filter',
      'fire',
      'fire-extinguisher',
      'firefox',
      'first-order',
      'flag',
      'flag-checkered',
      'flag-o',
      'flash',
      'flask',
      'flickr',
      'floppy-o',
      'folder',
      'folder-o',
      'folder-open',
      'folder-open-o',
      'font',
      'font-awesome',
      'fonticons',
      'fort-awesome',
      'forumbee',
      'forward',
      'foursquare',
      'free-code-camp',
      'frown-o',
      'futbol-o',
      'gamepad',
      'gavel',
      'gbp',
      'ge',
      'gear',
      'gears',
      'genderless',
      'get-pocket',
      'gg',
      'gg-circle',
      'gift',
      'git',
      'git-square',
      'github',
      'github-alt',
      'github-square',
      'gitlab',
      'gittip',
      'glass',
      'glide',
      'glide-g',
      'globe',
      'google',
      'google-plus',
      'google-plus-circle',
      'google-plus-official',
      'google-plus-square',
      'google-wallet',
      'graduation-cap',
      'gratipay',
      'grav',
      'group',
      'h-square',
      'hacker-news',
      'hand-grab-o',
      'hand-lizard-o',
      'hand-o-down',
      'hand-o-left',
      'hand-o-right',
      'hand-o-up',
      'hand-paper-o',
      'hand-peace-o',
      'hand-pointer-o',
      'hand-rock-o',
      'hand-scissors-o',
      'hand-spock-o',
      'hand-stop-o',
      'handshake-o',
      'hard-of-hearing',
      'hashtag',
      'hdd-o',
      'header',
      'headphones',
      'heart',
      'heart-o',
      'heartbeat',
      'history',
      'home',
      'hospital-o',
      'hotel',
      'hourglass',
      'hourglass-1',
      'hourglass-2',
      'hourglass-3',
      'hourglass-end',
      'hourglass-half',
      'hourglass-o',
      'hourglass-start',
      'houzz',
      'html5',
      'i-cursor',
      'id-badge',
      'id-card',
      'id-card-o',
      'ils',
      'image',
      'imdb',
      'inbox',
      'indent',
      'industry',
      'info',
      'info-circle',
      'inr',
      'instagram',
      'institution',
      'internet-explorer',
      'intersex',
      'ioxhost',
      'italic',
      'joomla',
      'jpy',
      'jsfiddle',
      'key',
      'keyboard-o',
      'krw',
      'language',
      'laptop',
      'lastfm',
      'lastfm-square',
      'leaf',
      'leanpub',
      'legal',
      'lemon-o',
      'level-down',
      'level-up',
      'life-bouy',
      'life-buoy',
      'life-ring',
      'life-saver',
      'lightbulb-o',
      'line-chart',
      'link',
      'linkedin',
      'linkedin-square',
      'linode',
      'linux',
      'list',
      'list-alt',
      'list-ol',
      'list-ul',
      'location-arrow',
      'lock',
      'long-arrow-down',
      'long-arrow-left',
      'long-arrow-right',
      'long-arrow-up',
      'low-vision',
      'magic',
      'magnet',
      'mail-forward',
      'mail-reply',
      'mail-reply-all',
      'male',
      'map',
      'map-marker',
      'map-o',
      'map-pin',
      'map-signs',
      'mars',
      'mars-double',
      'mars-stroke',
      'mars-stroke-h',
      'mars-stroke-v',
      'maxcdn',
      'meanpath',
      'medium',
      'medkit',
      'meetup',
      'meh-o',
      'mercury',
      'microchip',
      'microphone',
      'microphone-slash',
      'minus',
      'minus-circle',
      'minus-square',
      'minus-square-o',
      'mixcloud',
      'mobile',
      'mobile-phone',
      'modx',
      'money',
      'moon-o',
      'mortar-board',
      'motorcycle',
      'mouse-pointer',
      'music',
      'navicon',
      'neuter',
      'newspaper-o',
      'object-group',
      'object-ungroup',
      'odnoklassniki',
      'odnoklassniki-square',
      'opencart',
      'openid',
      'opera',
      'optin-monster',
      'outdent',
      'pagelines',
      'paint-brush',
      'paper-plane',
      'paper-plane-o',
      'paperclip',
      'paragraph',
      'paste',
      'pause',
      'pause-circle',
      'pause-circle-o',
      'paw',
      'paypal',
      'pencil',
      'pencil-square',
      'pencil-square-o',
      'percent',
      'phone',
      'phone-square',
      'photo',
      'picture-o',
      'pie-chart',
      'pied-piper',
      'pied-piper-alt',
      'pied-piper-pp',
      'pinterest',
      'pinterest-p',
      'pinterest-square',
      'plane',
      'play',
      'play-circle',
      'play-circle-o',
      'plug',
      'plus',
      'plus-circle',
      'plus-square',
      'plus-square-o',
      'podcast',
      'power-off',
      'print',
      'product-hunt',
      'puzzle-piece',
      'qq',
      'qrcode',
      'question',
      'question-circle',
      'question-circle-o',
      'quora',
      'quote-left',
      'quote-right',
      'ra',
      'random',
      'ravelry',
      'rebel',
      'recycle',
      'reddit',
      'reddit-alien',
      'reddit-square',
      'refresh',
      'registered',
      'remove',
      'renren',
      'reorder',
      'repeat',
      'reply',
      'reply-all',
      'resistance',
      'retweet',
      'rmb',
      'road',
      'rocket',
      'rotate-left',
      'rotate-right',
      'rouble',
      'rss',
      'rss-square',
      'rub',
      'ruble',
      'rupee',
      's15',
      'safari',
      'save',
      'scissors',
      'scribd',
      'search',
      'search-minus',
      'search-plus',
      'sellsy',
      'send',
      'send-o',
      'server',
      'share',
      'share-alt',
      'share-alt-square',
      'share-square',
      'share-square-o',
      'shekel',
      'sheqel',
      'shield',
      'ship',
      'shirtsinbulk',
      'shopping-bag',
      'shopping-basket',
      'shopping-cart',
      'shower',
      'sign-in',
      'sign-language',
      'sign-out',
      'signal',
      'signing',
      'simplybuilt',
      'sitemap',
      'skyatlas',
      'skype',
      'slack',
      'sliders',
      'slideshare',
      'smile-o',
      'snapchat',
      'snapchat-ghost',
      'snapchat-square',
      'snowflake-o',
      'soccer-ball-o',
      'sort',
      'sort-alpha-asc',
      'sort-alpha-desc',
      'sort-amount-asc',
      'sort-amount-desc',
      'sort-asc',
      'sort-desc',
      'sort-down',
      'sort-numeric-asc',
      'sort-numeric-desc',
      'sort-up',
      'soundcloud',
      'space-shuttle',
      'spinner',
      'spoon',
      'spotify',
      'square',
      'square-o',
      'stack-exchange',
      'stack-overflow',
      'star',
      'star-half',
      'star-half-empty',
      'star-half-full',
      'star-half-o',
      'star-o',
      'steam',
      'steam-square',
      'step-backward',
      'step-forward',
      'stethoscope',
      'sticky-note',
      'sticky-note-o',
      'stop',
      'stop-circle',
      'stop-circle-o',
      'street-view',
      'strikethrough',
      'stumbleupon',
      'stumbleupon-circle',
      'subscript',
      'subway',
      'suitcase',
      'sun-o',
      'superpowers',
      'superscript',
      'support',
      'table',
      'tablet',
      'tachometer',
      'tag',
      'tags',
      'tasks',
      'taxi',
      'telegram',
      'television',
      'tencent-weibo',
      'terminal',
      'text-height',
      'text-width',
      'th',
      'th-large',
      'th-list',
      'themeisle',
      'thermometer',
      'thermometer-0',
      'thermometer-1',
      'thermometer-2',
      'thermometer-3',
      'thermometer-4',
      'thermometer-empty',
      'thermometer-full',
      'thermometer-half',
      'thermometer-quarter',
      'thermometer-three-quarters',
      'thumb-tack',
      'thumbs-down',
      'thumbs-o-down',
      'thumbs-o-up',
      'thumbs-up',
      'ticket',
      'times',
      'times-circle',
      'times-circle-o',
      'times-rectangle',
      'times-rectangle-o',
      'tint',
      'toggle-down',
      'toggle-left',
      'toggle-off',
      'toggle-on',
      'toggle-right',
      'toggle-up',
      'trademark',
      'train',
      'transgender',
      'transgender-alt',
      'trash',
      'trash-o',
      'tree',
      'trello',
      'tripadvisor',
      'trophy',
      'truck',
      'try',
      'tty',
      'tumblr',
      'tumblr-square',
      'turkish-lira',
      'tv',
      'twitch',
      'twitter',
      'twitter-square',
      'umbrella',
      'underline',
      'undo',
      'universal-access',
      'university',
      'unlink',
      'unlock',
      'unlock-alt',
      'unsorted',
      'upload',
      'usb',
      'usd',
      'user',
      'user-circle',
      'user-circle-o',
      'user-md',
      'user-o',
      'user-plus',
      'user-secret',
      'user-times',
      'users',
      'vcard',
      'vcard-o',
      'venus',
      'venus-double',
      'venus-mars',
      'viacoin',
      'viadeo',
      'viadeo-square',
      'video-camera',
      'vimeo',
      'vimeo-square',
      'vine',
      'vk',
      'volume-control-phone',
      'volume-down',
      'volume-off',
      'volume-up',
      'warning',
      'wechat',
      'weibo',
      'weixin',
      'whatsapp',
      'wheelchair',
      'wheelchair-alt',
      'wifi',
      'wikipedia-w',
      'window-close',
      'window-close-o',
      'window-maximize',
      'window-minimize',
      'window-restore',
      'windows',
      'won',
      'wordpress',
      'wpbeginner',
      'wpexplorer',
      'wpforms',
      'wrench',
      'xing',
      'xing-square',
      'y-combinator',
      'y-combinator-square',
      'yahoo',
      'yc',
      'yc-square',
      'yelp',
      'yen',
      'yoast',
      'youtube',
      'youtube-play']

    // Set and populate defaults
    this.panelDefaults = {
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
        fillColor: 'rgba(31, 118, 189, 0.18)',
      },
      gauge: {
        show: false,
        minValue: 0,
        maxValue: 100,
        thresholdMarkers: true,
        thresholdLabels: false,
      },
      trendIndicator: {
        show: false,
        size: 30
      },
      tableColumn: '',
      subtitle: 'NA',
      iconType: '',
      iconPosition: '',
      allowActuation: false,
    };

    _.defaultsDeep(this.panel, this.panelDefaults);

    this.initModalValues();

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

    this.onSparklineColorChange = this.onSparklineColorChange.bind(this);
    this.onSparklineFillChange = this.onSparklineFillChange.bind(this);

    this.handleClickTitle = this.showDetailsModal.bind(this);
  }


  initModalValues() {
    this.modal = {
      allowedEntities: [],
      allowedTypes: [],
      entity: {},
      type: {},
      value: '',
      valid: false
    }
  }

  initDetailModalValues() {
    this.modal = { values: this.getDetailsModalValues() }
  }

  showDetailsModal() {

    this.initDetailModalValues();

    let modalScope = this.$scope.$new();
    modalScope.panel = this.panel;

    this.publishAppEvent('show-modal', {
      src: this.base_path+'partials/modal_details.html',
      modalClass: 'confirm-modal',
      scope: modalScope,
    });
  }

  validFieldValues() {
    return (this.modal.type.column!==undefined && this.modal.entity.value!==undefined && this.modal.value!==undefined && this.modal.value!=='')
  }

  onInitEditMode() {
    this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
    this.fontSizesInt = [10, 30, 50, 70, 80, 100, 110, 120];
    this.addEditorTab('Options', `${definitions.plugin_path}partials/editor.html`, 2);
    this.addEditorTab('Value Mappings', `${definitions.plugin_path}partials/mappings.html`, 3);
    this.unitFormats = kbn.getUnitFormats();
  }

  setUnitFormat(subItem) {
    this.panel.format = subItem.value;
    this.refresh();
  }

  onDataError(err) {
    this.onDataReceived([]);
  }

  onDataReceived(dataList) {
    if(!dataList) {
      console.debug('No data recieved')
      return ;
    }

    if(dataList.length === 0) {
      console.debug('No dataList recieved')
      return;
    }

    let data = {};

    if (dataList.length > 0 && dataList[0].type === 'table') {
      this.dataType = 'table';
      const tableData = dataList.map(this.tableHandler.bind(this));
      this.setTableValues(tableData, data);
    } else {
      this.dataType = 'timeseries';
      this.series = dataList.map(this.seriesHandler.bind(this));
      this.setValues(data);
    }

    this.data = data;
    console.debug(this.data)
    this.render();
  }

  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints || [],
      alias: seriesData.target,
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }

  tableHandler(tableData) {
    const datapoints = [];
    const columnNames = {};

    tableData.columns.forEach((column, columnIndex) => {
      columnNames[columnIndex] = column.text;
    });

    this.tableColumnOptions = columnNames;
    if (!_.find(tableData.columns, ['text', this.panel.tableColumn])) {
      this.setTableColumnToSensibleDefault(tableData);
    }

    tableData.rows.forEach(row => {
      const datapoint = {};

      row.forEach((value, columnIndex) => {
        const key = columnNames[columnIndex];
        datapoint[key] = value;
      });

      datapoints.push(datapoint);
    });

    return datapoints;
  }

  setTableColumnToSensibleDefault(tableData) {
    if (this.tableColumnOptions.length === 1) {
      this.panel.tableColumn = this.tableColumnOptions[0];
    } else {
      this.panel.tableColumn = _.find(tableData.columns, col => {
        return col.type !== 'time';
      }).text;
    }
  }

  setTableValues(tableData, data) {
    if (!tableData || tableData.length === 0) {
      return;
    }

    if (tableData[0].length === 0 || tableData[0][0][this.panel.tableColumn] === undefined) {
      data.value = null;
      this.setValueMapping(data);
      if (!isNaN(parseFloat(data.valueFormatted))) data.value = parseFloat(data.valueFormatted);
      return;
    }

    const datapoint = tableData[0][0];
    data.value = datapoint[this.panel.tableColumn];

    if (_.isString(data.value)) {
      data.valueFormatted = _.escape(data.value);
      data.value = 0;
      data.valueRounded = 0;
    } else {
      const decimalInfo = this.getDecimalsForValue(data.value);
      const formatFunc = kbn.valueFormats[this.panel.format];
      data.valueFormatted = formatFunc(
        datapoint[this.panel.tableColumn],
        decimalInfo.decimals,
        decimalInfo.scaledDecimals
      );
      data.valueRounded = kbn.roundValue(data.value, this.panel.decimals || 0);
    }

    this.setValueMapping(data);
  }

  canChangeFontSize() {
    return this.panel.gauge.show;
  }

  setColoring(options) {
    if (options.background) {
      this.panel.colorValue = false;
      this.panel.colors = ['rgba(71, 212, 59, 0.4)', 'rgba(245, 150, 40, 0.73)', 'rgba(225, 40, 40, 0.59)'];
    } else {
      this.panel.colorBackground = false;
      this.panel.colors = ['rgba(50, 172, 45, 0.97)', 'rgba(237, 129, 40, 0.89)', 'rgba(245, 54, 54, 0.9)'];
    }
    this.render();
  }

  invertColorOrder() {
    var tmp = this.panel.colors[0];
    this.panel.colors[0] = this.panel.colors[2];
    this.panel.colors[2] = tmp;
    this.render();
  }

  onColorChange(panelColorIndex) {
    return color => {
      this.panel.colors[panelColorIndex] = color;
      this.render();
    };
  }

  onSparklineColorChange(newColor) {
    this.panel.sparkline.lineColor = newColor;
    this.render();
  }

  onSparklineFillChange(newColor) {
    this.panel.sparkline.fillColor = newColor;
    this.render();
  }

  getDecimalsForValue(value) {
    if (_.isNumber(this.panel.decimals)) {
      return { decimals: this.panel.decimals, scaledDecimals: null };
    }

    var delta = value / 2;
    var dec = -Math.floor(Math.log(delta) / Math.LN10);

    var magn = Math.pow(10, -dec),
      norm = delta / magn, // norm is between 1.0 and 10.0
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

    let result = {};
    result.decimals = Math.max(0, dec);
    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

    return result;
  }

  setValues(data) {
    data.flotpairs = [];

    console.log('setValues...')
    console.log(this.series)


    if (this.series.length === 0) {
      let error = new Error();
      error.message = 'No Series Error';
      error.data =
        'Metric query returns ' +
        this.series.length +
        ' series. Single Stat Panel expects a series.\n\nResponse:\n' +
        JSON.stringify(this.series);
      throw error;
    }

    if (this.series && this.series.length > 0) {
      if (this.series.length > 1){
        console.log('=> multiple series: #'+this.series.length)

      }

      let lastPoint = _.last(this.series[0].datapoints);
      let lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;

      if (this.panel.valueName === 'name') {
        data.value = 0;
        data.valueRounded = 0;
        data.valueFormatted = this.series[0].alias;
      } else if (_.isString(lastValue)) {
        data.value = 0;
        data.valueFormatted = _.escape(lastValue);
        data.valueRounded = 0;
      } else if (this.panel.valueName === 'last_time') {
        let formatFunc = kbn.valueFormats[this.panel.format];
        data.value = lastPoint[1];
        data.valueRounded = data.value;
        data.valueFormatted = formatFunc(data.value, 0, 0);
      } else {
        data.value = this.series[0].stats[this.panel.valueName];
        data.flotpairs = this.series[0].flotpairs;

        let decimalInfo = this.getDecimalsForValue(data.value);
        let formatFunc = kbn.valueFormats[this.panel.format];
        data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
        data.valueRounded = kbn.roundValue(data.value, decimalInfo.decimals);
      }

      // Add $__name variable for using in prefix or postfix
      data.scopedVars = _.extend({}, this.panel.scopedVars);
      data.scopedVars['__name'] = { value: this.series[0].label };
    }
    this.setValueMapping(data);
  }

  setValueMapping(data) {
    // check value to text mappings if its enabled
    if (this.panel.mappingType === 1) {
      for (let i = 0; i < this.panel.valueMaps.length; i++) {
        let map = this.panel.valueMaps[i];
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
      for (let i = 0; i < this.panel.rangeMaps.length; i++) {
        let map = this.panel.rangeMaps[i];
        // special null case
        if (map.from === 'null' && map.to === 'null') {
          if (data.value === null || data.value === void 0) {
            data.valueFormatted = map.text;
            return;
          }
          continue;
        }

        // value/number to range mapping
        var from = parseFloat(map.from);
        var to = parseFloat(map.to);
        if (to >= data.valueRounded && from <= data.valueRounded) {
          data.valueFormatted = map.text;
          return;
        }
      }
    }

    if (data.value === null || data.value === void 0) {
      data.valueFormatted = 'no value';
    }
  }

  removeValueMap(map) {
    var index = _.indexOf(this.panel.valueMaps, map);
    this.panel.valueMaps.splice(index, 1);
    this.render();
  }

  addValueMap() {
    this.panel.valueMaps.push({ value: '', op: '=', text: '' });
  }

  removeRangeMap(rangeMap) {
    var index = _.indexOf(this.panel.rangeMaps, rangeMap);
    this.panel.rangeMaps.splice(index, 1);
    this.render();
  }

  addRangeMap() {
    this.panel.rangeMaps.push({ from: '', to: '', text: '' });
  }

  getDetailsModalValues() {
    if(!this.series[0].datapoints)
      return ;
    let lines_total = this.series.length
    let cols_total = this.series[0].datapoints.length

    let result = []
    let pair = null

    for(let c=0; c<cols_total; c++) {
      pair = {}
      for(let l=0; l<lines_total; l++) {
        pair[this.series[l].alias||this.series[l].label] = this.series[l].datapoints[c][0]
      }
      result.push(pair)
    }

    return result
  }

  link(scope, elem, attrs, ctrl) {
    let $location = this.$location;
    let linkSrv = this.linkSrv;
    let $timeout = this.$timeout;
    let panel = ctrl.panel;
    let templateSrv = this.templateSrv;
    let data, linkInfo;

    let $panelContainer = elem.find('.panel-container');
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
      let spanContent = '<div class="' + className;
      if(fontSize)
        spanContent += '" style="font-size:' + fontSize;

      spanContent += '">' + content + '</div>';
      return spanContent;
    }

    function getTrendIndicator() {
      //probably the 'Format as' is of type 'table'. 'table' is not supported
      if(!data.flotpairs && data.flotpairs.length<=1) {
        console.info('Unable to show trend. Please, choose other interval or verify the resultset.');
        return `<span></span>`;
      }

      console.debug(`first value: ${data.flotpairs[0][1]}, last value: ${data.flotpairs[data.flotpairs.length-1][1]}`)
      let trendIndicatorValue = data.flotpairs[data.flotpairs.length-1][1]-data.flotpairs[0][1]
      let icon;

      console.debug(`trendIndicatorValue: ${trendIndicatorValue}`)

      if(trendIndicatorValue<0)
        icon = 'fa-arrow-down';
      else if(trendIndicatorValue>0)
        icon = 'fa-arrow-up';
      else
        icon = 'fa-arrow-right';

      return `<span><i class="fa ${icon}"></i></span>`;
    }

    function getBigValueHtml() {
      var body = '';

      if (panel.iconPosition === "value") {
        var icon_class = `fa fa-${panel.iconType}`;
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
        body += getDiv('statistics-panel-trendIndicator', `${panel.trendIndicator.size}px`, getTrendIndicator());
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

      var plotCanvas = $('<div></div>');
      var plotCss = {
        top: '10px',
        margin: 'auto',
        position: 'relative',
        height: height * 0.9 + 'px',
        width: dimension + 'px',
      };

      plotCanvas.css(plotCss);

      var thresholds = [];
      for (var i = 0; i < data.thresholds.length; i++) {
        thresholds.push({
          value: data.thresholds[i],
          color: data.colorMap[i],
        });
      }
      thresholds.push({
        value: panel.gauge.maxValue,
        color: data.colorMap[data.colorMap.length - 1],
      });

      var bgColor = config.bootData.user.lightTheme ? 'rgb(230,230,230)' : 'rgb(38,38,38)';

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
              width: gaugeWidth,
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
                font: { size: thresholdLabelFontSize },
              },
              show: panel.gauge.thresholdMarkers,
              width: thresholdMarkersWidth,
            },
            value: {
              color: panel.colorValue ? getColorForValue(data, data.valueRounded) : null,
              formatter: function() {
                return getValueText();
              },
              font: {
                size: fontSize,
                family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              },
            },
            show: true,
          },
        },
      };

      elem.append(plotCanvas);

      var plotSeries = {
        data: [[0, data.valueRounded]],
      };

      $.plot(plotCanvas, [plotSeries], options);
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
      var plotCanvas = $('<div></div>');
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
            fillColor: panel.sparkline.fillColor,
          },
        },
        yaxes: { show: false },
        xaxis: {
          show: false,
          mode: 'time',
          min: ctrl.range.from.valueOf(),
          max: ctrl.range.to.valueOf(),
        },
        grid: { hoverable: false, show: false },
      };

      elem.append(plotCanvas);

      var plotSeries = {
        data: data.flotpairs,
        color: panel.sparkline.lineColor,
      };

      $.plot(plotCanvas, [plotSeries], options);
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

      if(!ctrl.data || ctrl.data.length===0)
        return;

      data = ctrl.data;

      // get thresholds
      data.thresholds = panel.thresholds.split(',').map(function(strVale) {
        return Number(strVale.trim());
      });
      data.colorMap = panel.colors;

      setPanelBackground();

      elem.html('')
      !panel.gauge.show && elem.append(getBigValueHtml());
      panel.sparkline.show && addSparkline();
      panel.gauge.show && addGauge();

      elem.toggleClass('pointer', panel.links.length > 0);

      linkInfo = null;
    }

    function hookupDrilldownLinkTooltip() {
      // drilldown link tooltip
      var drilldownTooltip = $('<div id="tooltip" class="">hello</div>"');

      elem.mouseleave(function() {
        if (panel.links.length === 0) {
          return;
        }
        $timeout(function() {
          drilldownTooltip.detach();
        });
      });

      elem.click(function(evt) {
        if (!linkInfo) {
          return;
        }
        // ignore title clicks in title
        if ($(evt).parents('.panel-header').length > 0) {
          return;
        }

        if (linkInfo.target === '_blank') {
          window.open(linkInfo.href, '_blank');
          return;
        }

        if (linkInfo.href.indexOf('http') === 0) {
          window.location.href = linkInfo.href;
        } else {
          $timeout(function() {
            $location.url(linkInfo.href);
          });
        }

        drilldownTooltip.detach();
      });

      elem.mousemove(function(e) {
        if (!linkInfo) {
          return;
        }

        drilldownTooltip.text('click to go to: ' + linkInfo.title);
        drilldownTooltip.place_tt(e.pageX, e.pageY - 50);
      });
    }

    hookupDrilldownLinkTooltip();

    this.events.on('render', function() {
      render();
      ctrl.renderingCompleted();
    });
  }
}

function getColorForValue(data, value) {
  if (!_.isFinite(value)) {
    return null;
  }
  for (var i = data.thresholds.length; i > 0; i--) {
    if (value >= data.thresholds[i - 1]) {
      return data.colorMap[i];
    }
  }
  return _.first(data.colorMap);
}

function processTargets(targets) {
  let whereClauses = targets
    .map(elem => elem.whereClauses
    .filter(elem=>elem.operator=="="))
    .map(elem=>elem.map(({ column, value })=>({ column, value })))
  let metrics = targets.map(elem=>elem.metricAggs
    .filter(elem=>elem.type=='raw'))
    .map(elem=>elem.map(({ column })=>({ column })))

  let entities = whereClauses.length > 0 ? whereClauses[0].map(elem=>elem) : []
  let fields = metrics.length > 0 ? metrics[0].map(elem=>elem) : []

  return [entities, fields]
}

StatisticsCtrl.templateUrl = 'partials/module.html';

export { StatisticsCtrl, StatisticsCtrl as PanelCtrl, getColorForValue };
