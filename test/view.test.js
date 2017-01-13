/* global suite, test */
var assert = require('assert');
var view = require('../view');

// Simple mock of OutputChannel for this test
var oc = {
  content: '',
  clear: function () { this.content = '' },
  appendLine: function (line) { this.content += (line + '\n'); },
  show: function () { } // Noop
};

suite('View', function () {
  test('can render a table with header and a single item', function () {
    var expected = '';
    expected += '+--------------------------------------------------------------+\n';
    expected += '| Size         | 20 bytes                                      |\n';
    expected += '+--------------------------------------------------------------+\n';
    view(oc, [{
      header: 'Size',
      content: '20 bytes'
    }]);
    assert.equal(oc.content, expected);
  });
  test('can render a table with many items', function () {
    var expected = '';
    expected += '+--------------------------------------------------------------+\n';
    expected += '| Size         | 20 bytes                                      |\n';
    expected += '|--------------------------------------------------------------|\n';
    expected += '| Gzipped      | 35 bytes                                      |\n';
    expected += '|--------------------------------------------------------------|\n';
    expected += '| Mime type    | text/plain                                    |\n';
    expected += '|--------------------------------------------------------------|\n';
    expected += '| Created      | October 11th 2016, 10:54:22                   |\n';
    expected += '|--------------------------------------------------------------|\n';
    expected += '| Changed      | January 13th 2017, 09:59:17                   |\n';
    expected += '+--------------------------------------------------------------+\n';
    view(oc, [
      {
        header: 'Size',
        content: '20 bytes'
      },
      {
        header: 'Gzipped',
        content: '35 bytes'
      },
      {
        header: 'Mime type',
        content: 'text/plain'
      },
      {
        header: 'Created',
        content: 'October 11th 2016, 10:54:22'
      },
      {
        header: 'Changed',
        content: 'January 13th 2017, 09:59:17'
      }
    ]);
    assert.equal(oc.content, expected);
  });
});
