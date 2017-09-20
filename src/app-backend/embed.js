import fetch from "node-fetch";

export default class Embed {
  endPointUrl() {
    throw new Error("You must implement a endPointUrl method");
  }

  parse(capture) {
    return {
      url: capture[0],
    };
  }

  match() {
    throw new Error("You must implement a match method");
  }

  process(data) {
    throw new Error("You must implement a process method");
  }

  exec(element, options) {
    return new Promise(resolve => {
      fetch(this.endPointUrl(element), {})
        .then(res => {
          if (res.status !== 200) {
            return resolve(false);
          }
          return res.json();
        })
        .then(
          data => this.process(data, element),
          error => {
            console.error(`[${this.name}] data processing failed: \n${error}`);
            return resolve(false);
          }
        )
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

          return resolve(embed);
        })
        .catch(error => {
          console.error(`[${this.name}] ${error}`);
          return resolve(false);
        });
    });
  }
}
