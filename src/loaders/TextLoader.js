const fs = require("fs");
const path = require("path");

class TextLoader {

    load(filePath) {

        const absolutePath = path.resolve(filePath);

        const content = fs.readFileSync(absolutePath, "utf8");

        return {
            path: absolutePath,
            content
        };

    }

}

module.exports = { TextLoader };