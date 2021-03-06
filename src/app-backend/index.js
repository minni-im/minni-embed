import SimpleMarkdown from "simple-markdown";

import Embed from "./embed";
import OEmbed from "./oembed";

export { Embed, OEmbed };

const EMBEDS = [];

let rules = {
  newline: SimpleMarkdown.defaultRules.newline,
  text: SimpleMarkdown.defaultRules.text,
};
let parser;

function normalizeName(text) {
  return text.toLowerCase();
}

export function register(embed) {
  if (!EMBEDS.includes(embed)) {
    EMBEDS.push(embed);
    const embedName = normalizeName(embed.name);
    rules = {
      ...rules,
      [embedName]: {
        order: SimpleMarkdown.defaultRules.url.order,
        match: embed.match,
        parse: embed.parse,
      },
    };
    parser = SimpleMarkdown.parserFor(rules);
  }
}

export function parse(text) {
  return parser
    ? parser(text, { inline: true }).filter(p => p.type !== "text")
    : [];
}

export function process(text, meta = {}) {
  const tree = parse(text);
  return Promise.all(
    tree.map(element => {
      const processor = EMBEDS.find(
        e => normalizeName(e.name) === element.type
      );
      return processor.exec(element, meta);
    })
  ).then(
    results => results.filter(result => result !== false),
    error => {
      console.error(`[Embeds] processing error: \n${error}`);
      return [];
    }
  );
}
