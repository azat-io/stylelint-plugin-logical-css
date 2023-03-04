"use strict";

const {
  rule: { messages, ruleName },
} = require("./index.js");
const { physicalPropertiesMap } = require("../../utils/physicalPropertiesMap");
const { physicalValuesMap } = require("../../utils/physicalValuesMap");

// eslint-disable-next-line no-undef
testRule({
  ruleName,
  config: [true],
  plugins: ["./index.js"],
  accept: [
    {
      code: "h1 { margin-block-start: 1rem; };",
      description: "Using a logical margin property",
    },
    {
      code: "h1 { text-align: start; };",
      description: "Using a logical text-align value",
    },
  ],

  reject: [
    {
      code: "h1 { margin-top: 1rem; };",
      description: "Using a physical margin property",
      message: messages.unexpectedProp(
        "margin-top",
        physicalPropertiesMap["margin-top"]
      ),
    },
    {
      code: "h1 { text-align: left; };",
      description: "Using a physical text-align value",
      message: messages.unexpectedValue(
        "text-align",
        "left",
        physicalValuesMap["text-align"]["left"]
      ),
    },
  ],
});
