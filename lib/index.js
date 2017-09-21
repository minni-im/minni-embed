"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OEmbed = exports.Embed = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.register = register;
exports.parse = parse;
exports.process = process;

var _simpleMarkdown = require("simple-markdown");

var _simpleMarkdown2 = _interopRequireDefault(_simpleMarkdown);

var _embed = require("./embed");

var _embed2 = _interopRequireDefault(_embed);

var _oembed = require("./oembed");

var _oembed2 = _interopRequireDefault(_oembed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Embed = _embed2.default;
exports.OEmbed = _oembed2.default;


const EMBEDS = [];

let rules = {
  newline: _simpleMarkdown2.default.defaultRules.newline,
  text: _simpleMarkdown2.default.defaultRules.text
};
let parser;

function normalizeName(text) {
  return text.toLowerCase();
}

function register(embed) {
  if (!EMBEDS.includes(embed)) {
    EMBEDS.push(embed);
    const embedName = normalizeName(embed.name);
    rules = _extends({}, rules, {
      [embedName]: {
        order: _simpleMarkdown2.default.defaultRules.url.order,
        match: embed.match,
        parse: embed.parse
      }
    });
    parser = _simpleMarkdown2.default.parserFor(rules);
  }
}

function parse(text) {
  return parser ? parser(text, { inline: true }).filter(p => p.type !== "text") : [];
}

function process(text) {
  const tree = parse(text);
  return Promise.all(tree.map(element => {
    const processor = EMBEDS.find(e => normalizeName(e.name) === element.type);
    return processor.exec(element);
  })).then(results => results.filter(result => result !== false));
}