const keys = require('../../config/keys');

module.exports = (survey) => {
    //大段的html要放在``中
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following questions:</p>
                    <p>${survey.body}</p>
                    <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                    </div>  
                </div>
            </body>
        </html>
    `;
};