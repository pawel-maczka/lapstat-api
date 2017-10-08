class Tokenizer {
    static createToken(str) {
        let parts = str.split(' ');
        let token = '';

        parts.forEach((part, idx) => {

            if (idx === 0) {
                token += part.charAt(0).toLowerCase() + part.slice(1);
            } else {
                token += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            }
        });

        return token;
    }
}

module.exports = Tokenizer;