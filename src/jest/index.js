import Embed from "../embed";

function wrapExpectReturn(pass, messageTrue, messageFalse) {
  return pass
    ? { message: () => messageTrue, pass: true }
    : { message: () => messageFalse, pass: false };
}

function toHaveProperMethod(object, methodName) {
  const method = object[methodName];
  return wrapExpectReturn(
    method &&
      typeof method === "function" &&
      method !== Embed.prototype[methodName] &&
      method.toString() !== Embed.prototype[methodName].toString(),
    `Embed '${object.constructor
      .name}' is not expected to override 'Embed.${methodName}()' method`,
    `Embed '${object.constructor
      .name}' is expected to override 'Embed.${methodName}()' method (with a different implementation)`
  );
}

export default {
  toHaveValidName(received) {
    return wrapExpectReturn(
      received.name &&
        typeof received.name === "string" &&
        received.name.length > 0 &&
        received.name.match(/^[\w-]+$/) !== null,
      `Expected '${received.constructor.name}'` +
        " to have a non empty 'name' property that contains letters and/or - characters\n" +
        `Received: ${received.name}`,
      `Expected '${received.constructor.name}'` +
        " to have an empty 'name' property\n" +
        `Received: ${received.name}`
    );
  },

  toHaveValidType(received) {
    return wrapExpectReturn(
      received.type &&
        typeof received.type === "string" &&
        received.type.length > 0 &&
        received.type.match(/^[\w.]+$/) !== null,
      `Expected '${received.constructor.name}'` +
        " to have an non empty 'type' property that contains letters and/or . characters\n" +
        `Received: ${received.type}`,
      `Expected '${received.constructor.name}'` +
        " to have an empty 'type' property\n" +
        `Received: ${received.type}`
    );
  },

  toHaveEndPointUrlMethod(received) {
    return toHaveProperMethod(received, "endPointUrl");
  },

  toHaveMatchMethod(received) {
    return toHaveProperMethod(received, "match");
  },

  toHaveProcessMethod(received) {
    return toHaveProperMethod(received, "process");
  },
};
