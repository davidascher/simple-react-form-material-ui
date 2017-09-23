'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _simpleReactForm = require('simple-react-form');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes, {
  /**
   * Optional default value.
   */
  defaultValue: _propTypes2.default.string,
  /**
   * The options for the select input. Each item must have label and value.
   */
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired
  }))
});

var defaultProps = {};

var SelectComponent = function (_React$Component) {
  _inherits(SelectComponent, _React$Component);

  function SelectComponent() {
    _classCallCheck(this, SelectComponent);

    return _possibleConstructorReturn(this, (SelectComponent.__proto__ || Object.getPrototypeOf(SelectComponent)).apply(this, arguments));
  }

  _createClass(SelectComponent, [{
    key: 'getOptions',
    value: function getOptions() {
      if (this.props.options) {
        return this.props.options;
      } else if (this.props.fieldSchema && this.props.fieldSchema.allowedValues) {
        return _underscore2.default.map(this.props.fieldSchema.allowedValues, function (allowedValue) {
          return {
            label: allowedValue,
            value: allowedValue
          };
        });
      } else {
        throw new Error('You must set the options for the select field');
      }
    }
  }, {
    key: 'getDefaultValue',
    value: function getDefaultValue() {
      if (this.props.defaultValue) {
        return this.props.defaultValue;
      } else if (this.props.fieldSchema && this.props.fieldSchema.defaultValue) {
        return this.props.fieldSchema.defaultValue;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.value) {
        this.props.onChange(this.getDefaultValue());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _SelectField2.default,
        _extends({
          value: String(this.props.value),
          defaultValue: this.getDefaultValue(),
          fullWidth: true,
          disabled: this.props.disabled,
          floatingLabelText: this.props.label,
          errorText: this.props.errorMessage
        }, this.props.passProps),
        this.getOptions().map(function (item) {
          return _react2.default.createElement(_MenuItem2.default, { key: item.value, value: String(item.value), primaryText: item.label, onTouchTap: function onTouchTap(value) {
              return _this2.props.onChange(item.value);
            } });
        })
      );
    }
  }]);

  return SelectComponent;
}(_react2.default.Component);

exports.default = SelectComponent;


SelectComponent.propTypes = propTypes;
SelectComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'select',
  component: SelectComponent
});