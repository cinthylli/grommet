'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _Close = require('./icons/base/Close');

var _Close2 = _interopRequireDefault(_Close);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TOAST;
var APP = _CSSClassnames2.default.APP;

var DURATION = 8000;
var ANIMATION_DURATION = 1000;

var ToastContents = function (_Component) {
  _inherits(ToastContents, _Component);

  function ToastContents() {
    _classCallCheck(this, ToastContents);

    var _this = _possibleConstructorReturn(this, (ToastContents.__proto__ || Object.getPrototypeOf(ToastContents)).call(this));

    _this._onClose = _this._onClose.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(ToastContents, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        history: this.props.history,
        intl: this.props.intl,
        router: this.props.router,
        store: this.props.store
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _Announcer.announce)(this._contentsRef.innerText);
      this._timer = setTimeout(this._onClose, DURATION);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
  }, {
    key: '_onClose',
    value: function _onClose() {
      var onClose = this.props.onClose;

      clearTimeout(this._timer);
      this._timer = undefined;
      this.setState({ closing: true });
      setTimeout(onClose, ANIMATION_DURATION);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          children = _props.children,
          onClose = _props.onClose,
          size = _props.size,
          status = _props.status;
      var closing = this.state.closing;


      var classNames = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--closing', closing), _classnames));

      var statusIcon = void 0;
      if (status) {
        statusIcon = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__status', value: status,
          size: size === 'large' ? 'medium' : size });
      }

      var closeControl = void 0;
      if (onClose) {
        closeControl = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__closer',
          icon: _react2.default.createElement(_Close2.default, null), onClick: this._onClose });
      }

      return _react2.default.createElement(
        'div',
        { className: classNames },
        statusIcon,
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this2._contentsRef = _ref;
            },
            className: CLASS_ROOT + '__contents' },
          children
        ),
        closeControl
      );
    }
  }]);

  return ToastContents;
}(_react.Component);

ToastContents.displayName = 'ToastContents';


ToastContents.propTypes = {
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  onClose: _react.PropTypes.func,
  router: _react.PropTypes.any,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  store: _react.PropTypes.any
};

// Because Toast creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
ToastContents.childContextTypes = {
  history: _react.PropTypes.object,
  intl: _react.PropTypes.object,
  router: _react.PropTypes.any,
  store: _react.PropTypes.object
};

var Toast = function (_Component2) {
  _inherits(Toast, _Component2);

  function Toast() {
    _classCallCheck(this, Toast);

    return _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).apply(this, arguments));
  }

  _createClass(Toast, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._addLayer();
      this._renderLayer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._renderLayer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._removeLayer();
    }
  }, {
    key: '_addLayer',
    value: function _addLayer() {
      var id = this.props.id;


      var element = document.createElement('div');
      if (id) {
        element.id = id;
      }
      element.className = CLASS_ROOT + '__container';
      // insert before .app, if possible.
      var appElements = document.querySelectorAll('.' + APP);
      var beforeElement;
      if (appElements.length > 0) {
        beforeElement = appElements[0];
      } else {
        beforeElement = document.body.firstChild;
      }
      if (beforeElement) {
        this._element = beforeElement.parentNode.insertBefore(element, beforeElement);
      }
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer() {
      if (this._element) {
        this._element.className = CLASS_ROOT + '__container';
        var contents = _react2.default.createElement(ToastContents, _extends({}, this.props, {
          history: this.context.history,
          intl: this.context.intl,
          router: this.context.router,
          store: this.context.store }));
        _reactDom2.default.render(contents, this._element);
      }
    }
  }, {
    key: '_removeLayer',
    value: function _removeLayer() {
      _reactDom2.default.unmountComponentAtNode(this._element);
      this._element.parentNode.removeChild(this._element);
      this._element = undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', { style: { display: 'none' } });
    }
  }]);

  return Toast;
}(_react.Component);

Toast.displayName = 'Toast';
exports.default = Toast;


Toast.propTypes = {
  onClose: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  status: _react.PropTypes.string
};

Toast.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];