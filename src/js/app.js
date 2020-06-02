'use strict';
import { CP, NP, A, FC, AC } from './questions';
import { nextQuestion } from './redirect';
import '../css/style.scss';

export const MAX_QUESTION_NO = 20;
export const scoreData = [];
const MAX_TYPE_SCORE = 8;
const List = [];

// GET THE 20  RANDOM QUESTIONS AND INPUT IT IN data_area //
function randomSelect4(sounceArray) {
        const destinationArray = [];
        for (let i = 0; i < 4; i++) {
                rand(sounceArray, destinationArray);
        }
        return destinationArray;
}
function rand(sounceArray, destinationArray) {
        const ran = sounceArray[Math.floor(Math.random() * sounceArray.length)];
        if (destinationArray.indexOf(ran) == -1) destinationArray.push(ran);
        else rand(sounceArray, destinationArray);
}
const CPselected = randomSelect4(CP);
const NPselected = randomSelect4(NP);
const Aselected = randomSelect4(A);
const FCselected = randomSelect4(FC);
const ACselected = randomSelect4(AC);
const finalQuestions = CPselected.concat(NPselected, Aselected, FCselected, ACselected);
console.log(finalQuestions);

let html = '';
let number = 1;
for (let i = 0; i < finalQuestions.length; i += 1) {
        html += `<div id='question_${number}' class='diagramData'>`;
        html += `<div class='no'>${number++}</div>`;
        html += `<div class='total_number'>${finalQuestions[i].questionNumber}</div>`;
        html += `<div class='type'>${finalQuestions[i].type}</div>`;
        html += `<div class='question'>${finalQuestions[i].question}</div>`;
        html += '</div>';
}
document.getElementById('data_area').innerHTML = html;

// INIT QUIZ //
function init() {
        document.querySelectorAll('.diagramData').forEach(function (element, index) {
                const Type = element.querySelector(".type").innerHTML;
                const Question = element.querySelector(".question").innerHTML;
                List[index + 1] = {
                        Type,
                        Question
                };
                scoreData[Type] = 0;
        });
        setupQuestion(1);
}
// SET THE NEXT  QUESTIONS IN THE QUIZ //
export function setupQuestion(no) {
        document.getElementById('question').innerHTML = List[no].Question;
        document.querySelectorAll('a #q_answer1').innerHTML = List[no].Answer1;
        document.getElementById('q_answer1').setAttribute('data-type', List[no].Type);
        document.getElementById('q_answer1').setAttribute('data-no', no);
        document.querySelectorAll('a #q_answer2').innerHTML = List[no].Answer2;
        document.getElementById('q_answer2').setAttribute('data-type', List[no].Type);
        document.getElementById('q_answer2').setAttribute('data-no', no);
        document.querySelectorAll('a #q_answer3').innerHTML = List[no].Answer3;
        document.getElementById('q_answer3').setAttribute('data-type', List[no].Type);
        document.getElementById('q_answer3').setAttribute('data-no', no);
        document.querySelector('#q_progress_rest').textContent = no;
}

// ON CLICK ACTION / /
function clickAnswer( numbers, type, currentNo) {
        if (MAX_TYPE_SCORE <= scoreData[type]) {
                return;
        }
        scoreData[type] += numbers;
        console.log('Question', currentNo, 'Answered', numbers, scoreData);
        nextQuestion(currentNo);
}
const buttons = document.querySelectorAll('#q_answer1, #q_answer2, #q_answer3');
for (const button of buttons) {
        button.addEventListener('click', function () {
                const currentNo =  Number(this.dataset.no);
                const type = this.dataset.type;
                if (this.id === 'q_answer1') {
                        clickAnswer(2, type, currentNo);
                } else if (this.id === 'q_answer2') {
                        clickAnswer(1, type, currentNo);
                } else {
                        clickAnswer(0, type, currentNo);
                }
        })
}


// PROGUESS BAR INCREASE
let meterMargin = 22;
let progress = 0;
for (const button of buttons) {
        button.addEventListener('click', function () {
                progress = progress + 5;
                meterMargin = meterMargin + 3.45;
                document.querySelector('#meter_area').style.marginLeft = meterMargin + '%';
                document.querySelector('.progress-bar').style.width = progress + '%';
        })
}

// IINSERT DATA IN RESULT.HTML
export function setResult(type) {
        localStorage.setItem('dig', type + 1);
        window.location.href = 'result.html';
}


init();
