'use strict';

var Promise = require('bluebird');
var fetch   = require('isomorphic-fetch');
var assign  = require('lodash.assign');
var isEmpty = require('lodash.isempty');
var pick    = require('lodash.pick');
var qs      = require('querystring');

var DicionarioAberto = {
  /**
   * Root URL for the Dicionário Aberto API.
   * @type {String}
   */
  baseUrl: 'http://dicionario-aberto.net/search-json',

  /**
   * Define word.
   * @param  {String}  word Word to define.
   * @return {Promise}      Promise yielding the entry's definition object.
   */
  define: function(word) {
    return fetch(this.baseUrl + '/' + word)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
  },

  /**
   * Search for word entries.
   * @param  {Object}  options Search options, use one or more:
   *                           {String} prefix Search prefix.
   *                           {String} suffix Search suffix.
   *                           {String} like   Search similarity within a Levenshtein distance of 1.
   * @return {Promise}         Promise yielding an array of entry strings.
   */
  search: function(options) {
    var query = pick(options, ['prefix', 'suffix', 'like']);

    if (isEmpty(query)) {
      return new Promise(function () {
        throw new Error('Missing search operator. Allowed: prefix, suffix, like.');
      });
    }

    return fetch(this.baseUrl + '?' + qs.encode(query))
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
  }

};

/**
 * Factory function.
 * @param  {Object} options Instance property override.
 * @return {Object}         Dicionário Aberto client object.
 */
var dicionarioAberto = function dicionarioAberto(options) {
  return assign(Object.create(DicionarioAberto), options);
};

module.exports = dicionarioAberto;
