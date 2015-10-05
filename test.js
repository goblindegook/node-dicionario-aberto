'use strict';

import test from 'ava';
import sinon from 'sinon';
import request from 'request-promise';
import dicionarioAberto from '.';

test('Has default URL', t => {
  const DicionarioAberto = dicionarioAberto();
  console.log(DicionarioAberto);
  t.is(DicionarioAberto.baseUrl, 'http://dicionario-aberto.net/search-json');
  t.end();
});

test('Allows custom URL', t => {
  const DicionarioAberto = dicionarioAberto({baseUrl: 'http://custom/search'});
  t.is(DicionarioAberto.baseUrl, 'http://custom/search');
  t.end();
});

test.serial('Requests definitions', async t => {
  const DicionarioAberto = dicionarioAberto();
  const response = {entry: 'mocked response'};
  sinon.stub(request, 'get').returns(response);
  const result = await DicionarioAberto.define('palavra');
  t.same(result, response);
  request.get.restore();
  t.end();
});

test.serial('Throws error when definition not found', async t => {
  const DicionarioAberto = dicionarioAberto();
  sinon.stub(request, 'get').throws(new Error('not found'));
  t.throws(() => DicionarioAberto.define('non-existent'));
  request.get.restore();
  t.end();
});

test.serial('Performs prefix searches', async t => {
  const DicionarioAberto = dicionarioAberto();
  const response = ['a', 'ab', 'abc'];
  sinon.stub(request, 'get').returns(response);
  const result = await DicionarioAberto.search({prefix: 'a'});
  t.same(result, response);
  request.get.restore();
  t.end();
});

test.serial('Performs suffix searches', async t => {
  const DicionarioAberto = dicionarioAberto();
  const response = ['xyz', 'yz', 'z'];
  sinon.stub(request, 'get').returns(response);
  const result = await DicionarioAberto.search({suffix: 'a'});
  t.same(result, response);
  request.get.restore();
  t.end();
});

test.serial('Performs prefix and suffix searches', async t => {
  const DicionarioAberto = dicionarioAberto();
  const response = ['abcxyz', 'abyz', 'az'];
  sinon.stub(request, 'get').returns(response);
  const result = await DicionarioAberto.search({prefix: 'a', suffix: 'z'});
  t.same(result, response);
  request.get.restore();
  t.end();
});

test.serial('Performs similarity searches', async t => {
  const DicionarioAberto = dicionarioAberto();
  const response = ['a', 'b', 'c'];
  sinon.stub(request, 'get').returns(response);
  const result = await DicionarioAberto.search({like: 'a'});
  t.same(result, response);
  request.get.restore();
  t.end();
});

test('Throws error on missing search operators', t => {
  const DicionarioAberto = dicionarioAberto();
  t.throws(() => DicionarioAberto.search());
  t.end();
});
