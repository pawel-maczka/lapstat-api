const cheerio = require('cheerio');
const Tokenizer = require('./tokenizer');

class DataReader {
    constructor(data) {
        this.data = data;
        this.header = [];
        this.rows = [];
        this.$ = cheerio.load(this.data);
    }

    parseHeader() {
        this.header = [];

        this.$('table thead th').each((index, data) => {
            this.header.push({index: index, data: Tokenizer.createToken(data.children[0].data)});
        });
    };

    parseBody() {
        this.rows = [];

        this.$('table tbody tr').each((index, data) => {
            let row = {};
            this.$(data).find('td').each((rowIndex, rowData) => {
                const numberOfChildren = rowData.children.length;
                const cell = rowData.children[numberOfChildren - 1].data;

                if (undefined !== cell) {
                    const token = this.getTokenForIndex(rowIndex);
                    row[token] = cell.trim();
                }
            });

            this.rows.push(row);
        });
    }

    getTokenForIndex(idx) {
        for (let i = 0; i < this.header.length; i++) {
            if (this.header[i].index === idx) {
                return this.header[i].data;
            }
        }

        return null;
    }

    parse() {
        this.parseHeader();
        this.parseBody();

        return this.rows;
    }
}

module.exports = DataReader;