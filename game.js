const textElement = document.getElementById('game-text');
const choicesElement = document.getElementById('choices');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(node => node.id === textNodeIndex);
  textElement.innerText = textNode.text;
  choicesElement.innerHTML = '';
  textNode.options.forEach(option => {
    if (option.requiredState == null || option.requiredState(state)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.onclick = () => selectOption(option);
      choicesElement.appendChild(button);
    }
  });
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) return startGame();
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Tu es un jeune prince égyptien, futur pharaon. Le conseil royal attend ta première décision.",
    options: [
      {
        text: "Explorer la pyramide secrète",
        setState: { pyramide: true },
        nextText: 2
      },
      {
        text: "Consulter les anciens sages",
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: "Tu entres dans la pyramide. Un piège se déclenche !",
    options: [
      {
        text: "Esquiver et continuer",
        nextText: 4
      },
      {
        text: "Faire demi-tour",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "Les sages te donnent une carte menant au tombeau sacré.",
    options: [
      {
        text: "Suivre la carte",
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: "Tu trouves un artefact sacré. Tu es désormais digne d’être pharaon.",
    options: [
      {
        text: "Recommencer",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "Tu tombes dans un piège et ton règne s’arrête ici...",
    options: [
      {
        text: "Recommencer",
        nextText: -1
      }
    ]
  }
];

startGame();