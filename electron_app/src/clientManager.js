const ClientAPI = require('@criptext/email-http-client');
const { PROD_SERVER_URL } = require('./utils/consts');
const { getAccount } = require('./DBManager');
let client = {};

const checkClient = async () => {
  const [account] = await getAccount();
  const token = account ? account.jwt : undefined;
  if (!client.login || client.token !== token) {
    const clientOptions = {
      url: process.env.REACT_APP_KEYSERVER_URL || PROD_SERVER_URL,
      token,
      timeout: 60000
    };
    client = new ClientAPI(clientOptions);
    client.token = token;
  }
};

class ClientManager {
  constructor() {
    this.check();
  }

  acknowledgeEvents(eventIds) {
    return client.acknowledgeEvents(eventIds);
  }

  async check() {
    await checkClient();
  }

  checkAvailableUsername(username) {
    return client.checkAvailableUsername(username);
  }

  findKeyBundles(params) {
    return client.findKeyBundles(params);
  }

  getEmailBody(bodyKey) {
    return client.getEmailBody(bodyKey);
  }

  async getEvents() {
    this.check();
    const res = await client.getPendingEvents();
    return this.formEvents(res.body);
  }

  formEvents(events) {
    return events.map(event => {
      const { params, cmd, rowid } = event;
      return { cmd, params: JSON.parse(params), rowid };
    });
  }

  login(data) {
    return client.login(data);
  }

  postEmail(params) {
    return client.postEmail(params);
  }

  postKeyBundle(params) {
    return client.postKeyBundle(params);
  }

  postOpenEvent(metadataKeys) {
    return client.postOpenEvent(metadataKeys);
  }

  postUser(params) {
    return client.postUser(params);
  }

  unsendEmail(params) {
    return client.unsendEmail(params);
  }
}

module.exports = new ClientManager();
