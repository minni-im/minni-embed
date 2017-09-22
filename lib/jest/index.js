"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveMatchMethod = toHaveMatchMethod;
exports.toHaveProcessMethod = toHaveProcessMethod;
exports.toHaveEndpointUrlMethod = toHaveEndpointUrlMethod;
const VALID_NAME = exports.VALID_NAME = /^[\w\S-]+$/;
const VALID_TYPE = exports.VALID_TYPE = /^[a-z0-9.]+$/;

function toHaveProperMethod(instance, methodName, exception) {
  if (instance[methodName] === Object.getPrototypeOf(instance.constructor).prototype[methodName]) {
    return {
      message: `Expected embed class '${instance.constructor.name}' must implement ${methodName[0].match(/[aeiou]/) ? "an" : "a"} '${methodName}()' method`,
      pass: false
    };
  } else {
    try {
      instance[methodName]();
    } catch (ex) {
      if (ex.message === exception) {
        return {
          message: `Expected embed method '${instance.constructor.name}.${methodName}()' should be implemented`,
          pass: false
        };
      }
    }
  }
  return { pass: true };
}

function toHaveMatchMethod(received) {
  return toHaveProperMethod(received, "match", "You must implement a match(capture) {} method");
}

function toHaveProcessMethod(received) {
  return toHaveProperMethod(received, "process", "You must implement a process(data) {} method");
}

function toHaveEndpointUrlMethod(received) {
  const parentName = Object.getPrototypeOf(received.constructor).name;
  if (parentName !== "OEmbed") {
    return {
      message: `Expected embed class '${received.constructor.name}' must extend OEmbed \nReceived: '${parentName}' class instead`,
      pass: false
    };
  } else {
    return toHaveProperMethod(received, "endpointUrl", "You must implement an endpointUrl() {} method");
  }
  return { pass: true };
}