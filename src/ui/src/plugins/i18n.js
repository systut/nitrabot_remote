import Vue from 'vue';
import VueI18n from 'vue-i18n';

import jpGeneral from '../locales/jp/general.json';
import jpSettingScreen from '../locales/jp/setting-screen.json';

import enGeneral from '../locales/en/general.json';
import enSettingScreen from '../locales/en/setting-screen.json';

Vue.use(VueI18n);

const messages = {
  'jp': {
    general: jpGeneral['general'],
    settingScreen: jpSettingScreen['settingScreen'],
  },
  'en': {
    general: enGeneral['general'],
    settingScreen: enSettingScreen['settingScreen'],
  },
};

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n;