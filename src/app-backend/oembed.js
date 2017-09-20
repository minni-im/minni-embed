import Embed from "./embed";

export default class OEmbed extends Embed {
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
}
