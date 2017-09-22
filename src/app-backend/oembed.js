import fetch from "node-fetch";
import Embed from "./embed";

export default class OEmbed extends Embed {
  endpointUrl() {
    throw new Error("You must implement an endpointUrl() {} method");
  }

  exec(element, meta) {
    return new Promise(resolve => {
      fetch(this.endpointUrl(element), {
        headers: {
          "User-Agent": "Minni.im oEmbed Web Service",
        },
      })
        .then(res => {
          if (!res.ok || res.status !== 200) {
            throw new Error(
              `[${this.name}] unable to process request: \n${res}`
            );
          }
          return res.json();
        })
        .then(data => this.process(data, element))
        .then(embed => {
          // original matching url
          embed.url = element.url;

          // embed provider if not provided
          if (!embed.provider) {
            embed.provider = {
              name: this.name,
            };
          }

          if (!embed.type && this.type) {
            embed.type = this.type;
          }
          resolve(embed);
        })
        .catch(error => {
          console.error(`[${this.name}] ${error}`);
          resolve(false);
        });
    });
  }

  process(data, element) {
    return {
      type: this.type,
      ...this.extractTitle(data, element),
      ...this.extractHtml(data, element),
      ...this.extractDescription(data, element),
      ...this.extractThumbnail(data, element),
      ...this.extractProvider(data, element),
      ...this.extractAuthor(data, element),
      ...this.extractWidth(data, element),
      ...this.extractHeight(data, element),
      ...this.extractMeta(data, element),
    };
  }

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
        url: data.thumbnail_url,
      },
    };
  }

  extractProvider(data) {
    let extractedData = {};
    return data.provider_name && data.provider_url
      ? {
          provider: {
            name: data.provider_name,
            url: data.provider_url,
          },
        }
      : {};
  }

  extractAuthor(data) {
    return data.author_name && data.author_url
      ? {
          author: {
            name: data.author_name,
            url: data.author_url,
          },
        }
      : {};
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
}
