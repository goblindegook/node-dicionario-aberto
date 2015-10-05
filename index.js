'use strict';

var assign  = require('lodash.assign');
var isEmpty = require('lodash.isempty');
var pick    = require('lodash.pick');
var request = require('request-promise');

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
    return request.get({
      baseUrl: this.baseUrl,
      uri:     word
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
    var qs = pick(options, ['prefix', 'suffix', 'like']);

    if (isEmpty(qs)) {
      throw new Error('Missing search operator. Allowed: prefix, suffix, like.');
    }

    return request.get({
      baseUrl: this.baseUrl,
      uri:     '',
      qs:      qs
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
