"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _embed = require("./embed");

var _embed2 = _interopRequireDefault(_embed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OEmbed extends _embed2.default {
  extractTitle(data) {
    return { title: data.title };
  }

  extractHtml() {
    return {};
  }

  extractDescription(data) {
    return data.description ? { description: data.description } : {};
  }

  extractThumbnail(data, element) {
    return {
      thumbnail: {
        width: data.thumbnail_width,
        height: data.thumbnail_height,
        url: data.thumbnail_url
      }
    };
  }

  extractProvider(data) {
    let extractedData = {};
    return data.provider_name && data.provider_url ? {
      provider: {
        name: data.provider_name,
        url: data.provider_url
      }
    } : {};
  }

  extractAuthor(data) {
    return data.author_name && data.author_url ? {
      author: {
        name: data.author_name,
        url: data.author_url
      }
    } : {};
  }

  extractWidth(data) {
    return data.width && data.width != null ? { width: data.width } : {};
  }

  extractHeight(data) {
    return data.height && data.height != null ? { height: data.height } : {};
  }

  extractMeta(data, element) {
    return {};
  }

  process(data, element) {
    return _extends({
      type: this.type
    }, this.extractTitle(data, element), this.extractHtml(data, element), this.extractDescription(data, element), this.extractThumbnail(data, element), this.extractProvider(data, element), this.extractAuthor(data, element), this.extractWidth(data, element), this.extractHeight(data, element), this.extractMeta(data, element));
  }
}
exports.default = OEmbed;