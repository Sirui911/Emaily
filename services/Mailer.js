//M开头是因为export一个class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//extends from mailer can be automatically be equipped with some properties in sendgrid.mail library
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
      super();
  
      this.sgApi = sendgrid(keys.sendGridKey);
      this.from_email = new helper.Email('pangsirui_ee_2019@163.com');
      this.subject = subject;
      this.body = new helper.Content('text/html', content);
      this.recipients = this.formatAddresses(recipients);
  
      this.addContent(this.body);
      this.addClickTracking();
      this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize = new helper.Personalization();
        //此时的recipients是一个helper.Email类的object
        this.recipients.forEach( recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path:'/v3/mail/send',
            body: this.toJSON()
        });
        //sgApi class 中的API method
        const response = await this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;