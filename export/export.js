/**
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/**
 * name     : export.js
 * version  : 2
 * updated  : 2015-08-05
 * license  : http://unlicense.org/ The Unlicense
 * git      : https://github.com/pffy/chrome-app-chinesefrequency
 *
 */


function exportAsCsv() {
  // .csv

  var outfile = app.prefix + '-export-' + generateFileId() + '.csv';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
      };
      writer.write(new Blob(['' + app.csvfile], { type: 'text/plain' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function exportAsTsv() {
  // convertCsvToTsv
  // .tsv

  if(!convertCsvToTsv()) {
    return ; // derp
  }

  var outfile = app.prefix + '-export-' + generateFileId() + '.tsv';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
      };
      writer.write(new Blob(['' + app.tsvfile], { type: 'text/plain' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function exportToAnkiSrs() {
  // convertRangeToSupermemoXml
  // .xml

  if(!convertRangeToSupermemoXml()) {
    return ; // derp
  }

  var outfile = app.prefix + '-export-anki-srs-' + generateFileId() + '.xml';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
      };
      writer.write(new Blob(['' + app.xmlfile], { type: 'text/xml' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function exportToMnemosyneSrs() {
  // convertRangeToWcu
  // .wcu

  if(!convertRangeToWcu()) {
    return ; // derp
  }

  var outfile = app.prefix + '-export-mnemosyne-srs-' + generateFileId() + '.wcu';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
      };
      writer.write(new Blob(['' + app.wcufile], { type: 'text/xml' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function exportToRepetitionsSrs() {
  // convertRangeToHzPyCsv
  // .txt

  if(!convertRangeToHzPyCsv()) {
    return ; // derp
  }

  var outfile = app.prefix + '-export-repetitions-srs-' + generateFileId() + '.txt';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
        console.info(e);
      };
      writer.write(new Blob(['' + app.hzpyfile], { type: 'text/plain' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function exportToMentalCaseSrs() {
  // convertRangeToHzPyCsv
  // .csv

  if(!convertRangeToHzPyCsv()) {
    return ; // derp
  }

  var outfile = app.prefix + '-export-mentalcase-srs-' + generateFileId() + '.csv';
  var fileOptions = { type: 'saveFile', suggestedName: outfile };

  chrome.fileSystem.chooseEntry(fileOptions, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = exportErrorHandler;
      writer.onwriteend = function(e) {
        console.info('done writing.');
      };
      writer.write(new Blob(['' + app.hzpyfile], { type: 'text/plain' }));
    }, exportErrorHandler);

    chrome.fileSystem.getDisplayPath(writableFileEntry, function (displayPath) {
      app.lastSavedPath = displayPath;
      setMessageBox('Conversion saved: ' + displayPath); // message ui
    });
  });
}

function convertCsvToTsv() {
  if(app.csvfile && app.csvfile.length) {
    app.tsvfile = replaceAll(',', '\t', app.csvfile);
    return true;
  }

  return false;
}

function convertRangeToHzPyCsv() {
  // hz,py
  if(app.datarange && app.datarange.length) {
    var r = app.datarange;
    var str = '';
    for(var i = 0; i < r.length; i++) {
      str += '\r\n' + r[i][0] + ',' + r[i][1];
    }
    str = str.trim();
    app.hzpyfile = str;
    return true;
  }

  return false;
}

function convertRangeToWcu() {

  if(app.datarange && app.datarange.length) {

    var r = app.datarange;

    var wcu = '';
    wcu += '<!-- Generated by Chinese Frequency App for Chrome (pffy.cloud.garganelli) -->';
    wcu += '\r\n' + '<!-- WCU export for Mnemosyne SRS -->';
    wcu += '\r\n' +'<?xml version="1.0" encoding="utf-8"?>';
    wcu += '\r\n' +'<CueCards Version="1">';

    for(var i = 0; i < r.length; i++) {
      wcu += '\r\n' + '  '
        + '<Card Question="' + r[i][0] + '" Answer="' + r[i][1] + '" History="" />';
    }

    wcu += '\r\n' +'</CueCards>';
    app.wcufile = wcu;
    return true;
  }

  return false;
}

function convertRangeToSupermemoXml() {

  if(app.datarange && app.datarange.length) {

    const BUMP = '  ';
    const TWO_BUMPS = BUMP + BUMP;
    const THREE_BUMPS = BUMP + BUMP + BUMP;

    var now = new Date();
    var dstr = now.toISOString();
    var id = dstr.replace(new RegExp('[-:.TZ]', 'g'), '');
    var y = dstr.substring(0,4);
    var m = dstr.substring(5,7);
    var d = dstr.substring(8,10);

    var dmy = d + '.' + m + '.' + y;

    var r = app.datarange;
    var xml = '';

    xml += '<!-- Generated by Chinese Frequency App for Chrome (pffy.cloud.garganelli) -->';
    xml += '\r\n' + '<!-- Supermemo 2008 XML export for Anki SRS -->';

    xml += '\r\n' + '<?xml version="1.0" standalone="yes"?>';
    xml += '\r\n' + '<SuperMemoCollection>';

    xml += '\r\n';
    xml += '\r\n' + BUMP + '<Count>' + r.length + '</Count>';

    for(var i = 0; i < r.length; i++) {

      xml += '\r\n';
      xml += '\r\n' + BUMP +  '<SuperMemoElement>';
      xml += '\r\n' + TWO_BUMPS + '<ID>pffy-xmlcard-id-' + id + '-' + (i + 1) +'</ID>';

      xml += '\r\n' + TWO_BUMPS + '<Content>';
      xml += '\r\n' + THREE_BUMPS + '<Question>' + r[i][0] + '</Question>';
      xml += '\r\n' + THREE_BUMPS+ '<Answer>' + r[i][1] + '</Answer>';
      xml += '\r\n' + TWO_BUMPS + '</Content>';

      xml += '\r\n' + TWO_BUMPS + '<LearningData>';
      xml += '\r\n' + THREE_BUMPS + '<Interval>1</Interval>';
      xml += '\r\n' + THREE_BUMPS + '<Repetitions>1</Repetitions>';
      xml += '\r\n' + THREE_BUMPS + '<Lapses>1</Lapses>';
      xml += '\r\n' + THREE_BUMPS + '<LastRepetition>' + dmy + '</LastRepetition>';
      xml += '\r\n' + THREE_BUMPS + '<AFactor>1.000</AFactor>';
      xml += '\r\n' + THREE_BUMPS + '<UFactor>1.000</UFactor>';
      xml += '\r\n' + TWO_BUMPS + '</LearningData>';
      xml += '\r\n' + BUMP +  '</SuperMemoElement>';
    }

    xml += '\r\n';
    xml += '\r\n' +'</SuperMemoCollection>';
    app.xmlfile = xml;
    return true;
  }

  return false;
}


// handles errors
function exportErrorHandler(err) {
  console.error(err);
}


function clearAppData() {

  app.tsvfile = '';
  app.csvfile = '';
  app.xmlfile = '';
  app.wcufile = '';

  app.datarange = '';
}

function setExportButtonsEnabled(enabled) {
  document.getElementById('savebtncsv').disabled = !enabled;
  document.getElementById('savebtntsv').disabled = !enabled;
  document.getElementById('savebtnxml').disabled = !enabled;
  document.getElementById('savebtnwcu').disabled = !enabled;
  document.getElementById('savebtnrep').disabled = !enabled;
  document.getElementById('savebtncase').disabled = !enabled;
}

function turnExportButtonsOff() {
  setExportButtonsEnabled(false);
}

function turnExportButtonsOn() {
  setExportButtonsEnabled(true);
}

// init

document.addEventListener('DOMContentLoaded', function () {

  turnExportButtonsOff();
  document.getElementById('savebtncsv').addEventListener('click', exportAsCsv);
  document.getElementById('savebtntsv').addEventListener('click', exportAsTsv);
  document.getElementById('savebtnxml').addEventListener('click', exportToAnkiSrs);
  document.getElementById('savebtnwcu').addEventListener('click', exportToMnemosyneSrs);
  document.getElementById('savebtnrep').addEventListener('click', exportToRepetitionsSrs);
  document.getElementById('savebtncase').addEventListener('click', exportToMentalCaseSrs);
  document.getElementById('clearbtn').addEventListener('click', clearAppData);
  document.getElementById('clearbtn').addEventListener('click', turnExportButtonsOff);

  console.log('exports are ready.');
});
