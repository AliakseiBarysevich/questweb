// Data:

const answers = {
  // TODO(Baryska): Consider adding more response options e.g. uncapitalized versions of responses or responses with common typos.
  1: ["2021"],
  2: ["канатоходец", "канатоходцы", "Канатоходцы", "Канатоходец"],
  3: ["1Е2Д3Г4В5Б6А", "1Е 2Д 3Г 4В 5Б 6А", "1е2д3г4в5б6а"],
  4: ["Лев", "лев"],
  5: ["Эжен", "Делакруа", "Эжен Делакруа", "Делакруа Эжен", "эжен", "делакруа", "эжен делакруа", "делакруа эжен"],
  6: ["17"],
  7: ["Арколе", "Арколь", "арколе", "арколь"],
};

const onCorrectAnswerHTML = {
  1: `<p class="correct-answer-board__text">Поздравляем! Начало положено, вы&nbsp;разгадали первое из&nbsp;семи заданий.</p>`,
  2: `<p class="correct-answer-board__text">Отлично! Два задания из&nbsp;семи уже позади.</p>`,
  3: `<p class="correct-answer-board__text">Почти половина квеста уже пройдена! Три задания из&nbsp;семи покорились вам.</p>`,
  4: `<p class="correct-answer-board__text">Ого, вы&nbsp;ответили уже на&nbsp;четыре задания из&nbsp;семи! Осталось всего ничего.</p>`,
  5: `<p class="correct-answer-board__text">Пятое задание из&nbsp;семи тоже за&nbsp;вами, осталось всего два!</p>`,
  6: `<p class="correct-answer-board__text">Супер, вы&nbsp;ответили на&nbsp;шесть заданий из&nbsp;семи! Даже немного грустно, что осталось всего одно.</p>`,
  7: `<p class="correct-answer-board__text">Семь из&nbsp;семи, наши поздравления! Теперь можете получить свой бонус у&nbsp;администратора.</p>
      <p class="correct-answer-board__text">
          Надеемся, что вам понравилось! Если квест, действительно, пришёлся вам по&nbsp;душе или есть
          какие-то пожелания по&nbsp;нему, то&nbsp;будем признательны, если упомянете об&nbsp;этом
          в&nbsp;своих социальных сетях, отметив при этом нас&mdash; нам будет о-о-очень приятно! В&nbsp;любом
          случае, будем рады если подпишетесь на&nbsp;наши социальные сети, которые найдете внизу страницы
          <span>&#129303</span>
      </p>`
};

// Handlers for actions:

const handleResponse = (questionNumber, responseTextElementId) => {
  if (answers[questionNumber].includes(document.getElementById(responseTextElementId).value.trim())) {
    saveCorrectResponse(questionNumber);
    const totalCorrectResponses = getCurrentTotalCorrectResponses()
    renderResponseCorrectBlock(questionNumber, totalCorrectResponses);
  } else {
    renderResponseIncorrectBlock(questionNumber);
  }
};

const handleHint = (questionNumber) => {
  renderHintBlock(questionNumber);
};

// Renderers for elements:

const renderResponseCorrectBlock = (questionNumber, totalCorrect) => {
  hideAllBlocksForQuestion(questionNumber);
  document.getElementById("correct-answer-board-"+questionNumber).innerHTML = onCorrectAnswerHTML[totalCorrect];
  document.getElementById("correct-answer-board-"+questionNumber).style.display = "block";
};

const renderResponseIncorrectBlock = (questionNumber) => {
  hideAllBlocksForQuestion(questionNumber);
  document.getElementById("wrong-answer-board-"+questionNumber).style.display = "block";
};

const renderHintBlock = (questionNumber) => {
  hideAllBlocksForQuestion(questionNumber);
  document.getElementById("hint-board-"+questionNumber).style.display = "block";
};

const hideAllBlocksForQuestion = (questionNumber) => {
  document.getElementById("correct-answer-board-"+questionNumber).style.display = "none";
  document.getElementById("wrong-answer-board-"+questionNumber).style.display = "none";
  document.getElementById("hint-board-"+questionNumber).style.display = "none";
};

// Local storage (to keep the state between page reloads):

const renderOnLoadFromLocalStorage = () => {
  Object.keys(answers).forEach((answerKey) => {
    const wasRespondedAs = window.localStorage.getItem("puzzle-response-correct-"+answerKey);
    if (wasRespondedAs) {
      renderResponseCorrectBlock(answerKey, wasRespondedAs);
    }
  })
};

const saveCorrectResponse = (questionNumber) => {
  let respondedAs = getCurrentTotalCorrectResponses() + 1;
  if (window.localStorage.getItem("puzzle-response-correct-"+questionNumber)) {
    // This answer was already responded correctly.
    respondedAs -= 1;
  }
  window.localStorage.setItem("puzzle-response-correct-"+questionNumber, respondedAs.toString());
};

const getCurrentTotalCorrectResponses = () => {
  let totalCorrect = 0;
  Object.keys(answers).forEach((answerKey) => {
    if (window.localStorage.getItem("puzzle-response-correct-"+answerKey)) {
      totalCorrect += 1;
    }
  })
  return totalCorrect;
};
