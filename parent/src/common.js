import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import ElementUI from 'element-ui';
import Vue from 'vue';

window['tal-common'] = {
  'vue-router': VueRouter,
  'vuex': Vuex,
  'axios': axios,
  'element-ui': ElementUI,
  'vue': Vue
}
