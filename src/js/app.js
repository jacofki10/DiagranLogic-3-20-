import '@babel/polyfill';
import { questions } from './questions';
import { nextQuestion } from './redirect';
import '../css/style.scss';

export const scoreData = { CP: 0, NP: 0, A: 0, FC: 0, AC: 0 };
const List = [];

// SHUFFLE QUESTIONS.JS //
function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
}
const finalQuestions = shuffle(questions);
console.log(finalQuestions);

// INPUT IT IN data_area //
let html = '';
for (let i = 0; i < finalQuestions.length; i += 1) {
        html += `<div id='question_${i + 1}' class='diagramData'>`;
        html += `<div class='no'>${i + 1}</div>`;
        html += `<div class='total_number'>${finalQuestions[i].questionNumber}</div>`;
        html += `<div class='type'>${finalQuestions[i].type}</div>`;
        html += `<div class='question'>${finalQuestions[i].question}</div>`;
        html += '</div>';
}
document.getElementById('data_area').innerHTML = html;

// SET THE NEXT  QUESTIONS IN THE QUIZ //
export const setupQuestion = no => {
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
};

// INIT QUIZ //
const init = () => {
        const myNodeList = document.querySelectorAll('.diagramData');
        [].forEach.call(myNodeList, function (element, index) {
                const Type = element.querySelector('.type').innerHTML;
                const Question = element.querySelector('.question').innerHTML;
                List[index + 1] = {
                        Type,
                        Question,
                };
        });

        setupQuestion(1);
};

// ON CLICK ACTION / /
const clickAnswer = (numbers, type, currentNo) => {
        if (scoreData[type] >= 8) return;
        scoreData[type] += numbers;
        console.log(`Question  ${currentNo} Answered  ${numbers}`, scoreData);
        nextQuestion(currentNo);
};
const buttons = document.querySelectorAll('#q_answer1, #q_answer2, #q_answer3');
for (const button of buttons) {
        button.addEventListener('click', function() {
                const currentNo = Number(this.dataset.no);
                const { type } = this.dataset;
                if (this.id === 'q_answer1') {
                        clickAnswer(2, type, currentNo);
                } else if (this.id === 'q_answer2') {
                        clickAnswer(1, type, currentNo);
                } else {
                        clickAnswer(0, type, currentNo);
                }
        });
}

// PROGUESS BAR INCREASE
let meterMargin = 22;
let progress = 0;
buttons.addEventListener('click', function() {
        progress += 5;
        meterMargin += 3.45;
        document.querySelector('#meter_area').style.marginLeft = `${meterMargin}%`;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
});

// IINSERT DATA IN RESULT.HTML
export const setResult = type => {
        localStorage.setItem('dig', type + 1);
        window.location.href = 'result.html';
};

init();
