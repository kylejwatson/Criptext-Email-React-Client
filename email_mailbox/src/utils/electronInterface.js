const electron = window.require('electron');
const { remote, ipcRenderer } = electron;
const dbManager = remote.require('./src/DBManager');
const clientManager = remote.require('./src/clientManager');
const labels = remote.require('./src/systemLabels');
const searchLabel = {
  search: {
    id: null,
    text: 'Search'
  }
};

export const LabelType = Object.assign(labels, searchLabel);

export const myAccount = remote.require('./src/Account');

export const openComposerWindow = () => {
  ipcRenderer.send('create-composer');
};

export const createLabel = params => {
  return dbManager.createLabel(params);
};

export const getAllLabels = () => {
  return dbManager.getAllLabels();
};

export const getLabelById = id => {
  return dbManager.getLabelById(id);
};

export const updateLabel = params => {
  return dbManager.updateLabel(params);
};

export const getThreads = (timestamp, params) => {
  return dbManager.getThreads(timestamp, params);
};

export const getEmailsGroupByThreadByParams = params => {
  return dbManager.getEmailsGroupByThreadByParams(params);
};

export const getEmailsByThreadId = threadId => {
  return dbManager.getEmailsByThreadId(threadId);
};

export const getContactByIds = ids => {
  return dbManager.getContactByIds(ids);
};

export const getEmailById = emailId => {
  return dbManager.getEmailById(emailId);
};

export const getAllFeeds = () => {
  return dbManager.getAllFeeds();
};

export const getUserByUsername = username => {
  return dbManager.getUserByUsername(username);
};

export const markFeedAsReadById = feedId => {
  return dbManager.updateFeed({ id: feedId, unread: false });
};

export const setMuteEmailById = (emailId, muteValue) => {
  return dbManager.updateEmail({ id: emailId, isMuted: muteValue });
};

export const deleteFeedById = feedId => {
  return dbManager.deleteFeedById(feedId);
};

/* Signal
  ----------------------------- */
export const createKeys = params => {
  return dbManager.createKeys(params);
};

export const getKeys = params => {
  return dbManager.getKeys(params);
};

export const getPreKeyPair = params => {
  return dbManager.getPreKeyPair(params);
};

export const getSignedPreKey = params => {
  return dbManager.getSignedPreKey(params);
};

export const createAccount = params => {
  return dbManager.createAccount(params);
};

export const getAccount = () => {
  return dbManager.getAccount();
};

export const getEvents = () => {
  return clientManager.getEvents();
};

export const getEmailBody = params => {
  return clientManager.getEmailBody(params);
};

export const createEmail = params => {
  return dbManager.createEmail(params);
};

export const createEmailLabel = params => {
  return dbManager.createEmailLabel(params);
};

export const deleteEmailLabel = params => {
  return dbManager.deleteEmailLabel(params);
};
