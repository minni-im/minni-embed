const EMBEDS = {};

export function register(type, component) {
  EMBEDS[type] = component;
}

export function getComponent(type) {
  return EMBEDS[type];
}
