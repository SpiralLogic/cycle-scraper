const {scrapeRun} = require('./dist/App')

module.exports.scrape = async (event) => {
    await scrapeRun();
    return {
        statusCode: 200,
        body: JSON.stringify({
            content,
        }),
    };
};
