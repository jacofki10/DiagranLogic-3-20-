import '@babel/polyfill';
import { result } from './answers';
import '../css/style.scss';

console.log(localStorage.getItem('dig'), localStorage.getItem('digDetail'));
const dig = Number(localStorage.getItem('dig') - 1);

document.getElementById('graph').classList.add(result[dig].ilustration);
document.getElementById('group9').innerHTML = result[dig].group9;
document.getElementById('catchCopy').innerHTML = result[dig].catchCopy;
document.getElementById('hakeikaisetsu').innerHTML = result[dig].hakeikaisetsu;
document.getElementById('kihonseikakusumari').innerHTML = result[dig].kihonseikakusumari;
document.getElementById('kunyunikeishon').innerHTML = result[dig].kunyunikeishon;
document.getElementById('renaikeiko').innerHTML = result[dig].renaikeiko;
document.getElementById('aishoii1').innerHTML = result[dig].aishoii1;
document.getElementById('aishoii2').innerHTML = result[dig].aishoii2;
document.getElementById('aishoii3').innerHTML = result[dig].aishoii3;
document.getElementById('aishowarui1').innerHTML = result[dig].aishowarui1;
document.getElementById('aishowarui2').innerHTML = result[dig].aishowarui2;
document.getElementById('aishowarui3').innerHTML = result[dig].aishowarui3;
