try {
  var books = require("books-cli");
} catch (error) {
  console.warn(error);
}

module.exports = {
  // Map of new blocks
  blocks: {
    // 3
    mermaid: {
      process: function (block) {
        try {
          var body = block.body;
          return books.Mermaid.string2svgAsync(body);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    }
  },

  // Map of new filters
  filters: {}
};