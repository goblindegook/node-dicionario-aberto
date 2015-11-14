'use strict'

import test from 'ava'
import nock from 'nock'
import fetch from 'isomorphic-fetch'
import dicionarioAberto from './'

test('Has default URL', t => {
  const dictionary = dicionarioAberto()
  t.is(dictionary.baseUrl, 'http://dicionario-aberto.net/search-json')
  t.end()
})

test('Allows custom URL', t => {
  const dictionary = dicionarioAberto({baseUrl: 'http://custom/search'})
  t.is(dictionary.baseUrl, 'http://custom/search')
  t.end()
})

test('Requests definitions', async t => {
  const dictionary = dicionarioAberto()
  const word       = 'palavra'
  const response   = {entry: 'mocked response'}

  nock(dictionary.baseUrl)
    .get('/' + word)
    .reply(200, response)

  const result = await dictionary.define(word)

  t.same(result, response)
  t.end()
})

test('Throws error when definition not found', async t => {
  const dictionary = dicionarioAberto()
  const word       = 'non-existent'

  nock(dictionary.baseUrl)
    .get('/' + word)
    .reply(404)

  await t.throws(dictionary.define(word))

  t.end()
})

test('Performs prefix searches', async t => {
  const dictionary = dicionarioAberto()
  const query      = {prefix: 'a'}
  const response   = {list: ['a', 'ab', 'abc'] }

    nock(dictionary.baseUrl)
      .get('')
      .query(query)
      .reply(200, response)

  const result = await dictionary.search(query)

  t.same(result, response)
  t.end()
})

test('Performs suffix searches', async t => {
  const dictionary = dicionarioAberto()
  const query      = {suffix: 'a'}
  const response   = {list: ['xyz', 'yz', 'z']}

  nock(dictionary.baseUrl)
    .get('')
    .query(query)
    .reply(200, response)

  const result = await dictionary.search(query)

  t.same(result, response)
  t.end()
})

test('Performs prefix and suffix searches', async t => {
  const dictionary = dicionarioAberto()
  const query      = {prefix: 'a', suffix: 'z'}
  const response   = {list: ['abcxyz', 'abyz', 'az']}

  nock(dictionary.baseUrl)
    .get('')
    .query(query)
    .reply(200, response)

  const result = await dictionary.search(query)

  t.same(result, response)
  t.end()
})

test('Performs similarity searches', async t => {
  const dictionary = dicionarioAberto()
  const query      = {like: 'a'}
  const response   = {list: ['a', 'b', 'c']}

  nock(dictionary.baseUrl)
    .get('')
    .query(query)
    .reply(200, response)

  const result = await dictionary.search(query)

  t.same(result, response)
  t.end()
})

test('Throws error on missing search operators', async t => {
  const dictionary = dicionarioAberto()
  await t.throws(dictionary.search())
  t.end()
})
