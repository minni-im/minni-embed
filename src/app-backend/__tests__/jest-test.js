import * as jestUtil from "../";
import {
  VALID_NAME,
  VALID_TYPE,
  toHaveEndpointUrl,
  toHaveMatch
} from "../jest";

const { Embed, OEmbed } = jestUtil;

test("RegExp for valid name", () => {
  expect("Youtube").toMatch(VALID_NAME);
  expect("Github-gist").toMatch(VALID_NAME);
  expect("Spotify_album").toMatch(VALID_NAME);
  expect("With space").not.toMatch(VALID_NAME);
});

test("RegExp for valid type", () => {
  expect("video.youtube").toMatch(VALID_TYPE);
  expect("video.youtube.private").toMatch(VALID_TYPE);
  expect("video-youtube").not.toMatch(VALID_TYPE);
  expect("video youtube").not.toMatch(VALID_TYPE);
});

test("toHaveEndpointUrl matcher should check OEmbed inheritence", () => {
  class MyBadEmbed extends Embed {}

  expect(toHaveEndpointUrl(new MyBadEmbed())).toEqual({
    message:
      "Expected embed class 'MyBadEmbed' must extend OEmbed \nReceived: 'Embed' class instead",
    pass: false,
  });
});

test("toHaveEndpointUrl matcher should check endpointUrl is there", () => {
  class MyBadEmbed extends OEmbed {}

  expect(toHaveEndpointUrl(new MyBadEmbed())).toEqual({
    message:
      "Expected embed class 'MyBadEmbed' must implement an 'endpointUrl()' method",
    pass: false,
  });
});

test("toHaveEndpointUrl matcher should check endpointUrl is there and not the same as OEmbed.endpointUrl()", () => {
  class MyBadEmbed extends OEmbed {
    endpointUrl() {
      throw new Error("You must implement an endpointUrl() {} method");
    }
  }

  expect(toHaveEndpointUrl(new MyBadEmbed())).toEqual({
    message:
      "Expected embed method 'MyBadEmbed.endpointUrl()' should be implemented",
    pass: false,
  });
});

test("toHaveMatch matcher should check match() is there", () => {
  class MyBadEmbed extends Embed {}

  expect(toHaveMatch(new MyBadEmbed())).toEqual({
    message:
      "Expected embed class 'MyBadEmbed' must implement a 'match()' method",
    pass: false,
  });
});
