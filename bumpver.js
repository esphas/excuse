
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto');

const infoPath = './info.json';
const scoopPath = './misc/excuse.json';

function makeScoop(data) {
  let scoop = JSON.parse(fs.readFileSync(scoopPath));
  let version = data['version'];
  scoop['version'] = version;
  let file = fs.readFileSync('./bin/excuse.ps1');
  let hash = crypto.createHash('sha256').update(file, 'utf8').digest('hex');
  scoop['hash'] = hash;
  let url = 'https://raw.githubusercontent.com/esphas/excuse/v' + version + '/bin/excuse.ps1';
  scoop['url'] = url;
  fs.writeFileSync(scoopPath, JSON.stringify(scoop, null, 2));
}

async function gitTag(version) {
  await exec('git add ' + infoPath);
  await exec('git add ' + scoopPath);
  await exec('git commit -m "bump version to v' + version + '"');
  await exec('git tag v' + version);
}

function main(type, extra) {
  let info = JSON.parse(fs.readFileSync(infoPath));
  let version = info['version'];
  let major, minor, patch;
  [major, minor, patch] = version.split('-')[0].split('.');
  function succ(str) {
    return (parseInt(str) + 1).toString();
  }
  switch (type) {
    case 'M': major = succ(major); break;
    case 'm': minor = succ(minor); break;
    case 'p': patch = succ(patch); break;
  }
  version = [major, minor, patch].join('.');
  if (extra != null) {
    version += '-' + extra;
  }
  let data = { version };
  makeScoop(data);
  fs.writeFileSync(infoPath, JSON.stringify(data, null, 2));
  gitTag(version);
}

let type = process.argv[2] || 'm';
let extra = process.argv[3];
main(type, extra);
