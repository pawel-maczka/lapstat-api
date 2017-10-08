const Tokenizer = require('../../src/lapstat/tokenizer');

describe("Tokenizer", function () {
    it("creates token based on head string", function (done) {

        const single = 'Pos';
        const singleToken = 'pos';

        const bestLap ='Best lap';
        const bestLapTransform = 'bestLap';

        const gapTo1St = 'Gap to 1st';
        const gapTo1StTransform = 'gapTo1st';

        const vMax = 'vMax';
        const vMaxTransform = 'vMax';

        expect(Tokenizer.createToken(single)).toBe(singleToken);
        expect(Tokenizer.createToken(bestLap)).toBe(bestLapTransform);
        expect(Tokenizer.createToken(gapTo1St)).toBe(gapTo1StTransform);
        expect(Tokenizer.createToken(vMax)).toBe(vMaxTransform);

        done();
    });
});
