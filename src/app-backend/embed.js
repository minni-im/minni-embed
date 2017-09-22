export default class Embed {
  parse(capture) {
    return {
      url: capture[0],
    };
  }

  match() {
    throw new Error("You must implement a match(capture) {} method");
  }

  process(data) {
    throw new Error("You must implement a process(data) {} method");
  }

  exec(element) {
    return this.process(element);
  }
}
