document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ЛОГИКА ИНТЕРАКТИВНЫХ ТАБОВ (Intel / AMD)
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            const targetEl = document.getElementById(targetTab);
            if(targetEl) targetEl.classList.add('active');
        });
    });

    // ==========================================
    // 2. ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА ЧАТА ПОДДЕРЖКИ
    // ==========================================
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const badge = document.querySelector('.badge-dot');

    if (chatTrigger && chatWindow && chatClose) {
        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            if (badge) badge.style.display = 'none'; // Скрываем уведомление
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('open');
        });
    }

    // ==========================================
    // 3. АЛГОРИТМ ЧАТ-БОТА (ДИАЛОГОВЫЙ КВИЗ)
    // ==========================================
    const quizData = [
        {
            question: "Какая задача для твоего ПК в абсолютном приоритете?",
            options: [
                { text: "Рендеринг 3D, монтаж видео и вычисления", score: "heavy" },
                { text: "Максимальный FPS в современных играх", score: "gaming" },
                { text: "Стабильный баланс: учеба, веб и несложные игры", score: "balance" },
                { text: "Экономия: сборка для работы и старых тайтлов", score: "budget" }
            ]
        },
        {
            question: "Как часто ты планируешь делать апгрейд процессора?",
            options: [
                { text: "Куплю один раз топ и забуду лет на 5-7", score: "heavy" },
                { text: "Хочу менять только CPU в том же сокете через 2-3 года", score: "balance" },
                { text: "Готов менять всё, ради лучшего игрового железа", score: "gaming" },
                { text: "Главное, чтобы плата и память стоили копейки сейчас", score: "budget" }
            ]
        },
        {
            question: "Какая техническая фишка для тебя важнее?",
            options: [
                { text: "Огромное количество ядер и потоков под работу", score: "heavy" },
                { text: "Технология 3D V-Cache для дикого буста в играх", score: "gaming" },
                { text: "Долговечный сокет с поддержкой новых поколений CPU", score: "balance" },
                { text: "Народная архитектура без лишнего маркетинга", score: "budget" }
            ]
        }
    ];

    const resultsData = {
        heavy: {
            title: "Intel Core i9 / Ryzen 9",
            desc: "Флагманы многопоточности. Идеальны для тяжелого софта, рендеринга и стримов без каких-либо ограничений."
        },
        gaming: {
            title: "AMD Ryzen X3D серии",
            desc: "Короли игрового фреймрейта. Дополнительный 3D-кэш полностью нивелирует любые просадки в играх."
        },
        balance: {
            title: "AMD Ryzen 5 / 7 (AM4/AM5)",
            desc: "Прагматичный народный выбор. Долговечные платформы с легким и дешевым апгрейдом на годы вперед."
        },
        budget: {
            title: "Intel Core i5 / i3 последних серий",
            desc: "Классика для стабильных домашних ПК. Отличная производительность в работе и средних играх без переплат."
        }
    };

    let currentQuestionIdx = 0;
    const scores = { heavy: 0, gaming: 0, balance: 0, budget: 0 };

    const qBlock = document.getElementById('quiz-chat-core');
    const rBlock = document.getElementById('quiz-result');
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQEl = document.getElementById('current-q');

    function launchQuiz() {
        currentQuestionIdx = 0;
        for (let key in scores) scores[key] = 0;
        if(rBlock) rBlock.style.display = 'none';
        if(qBlock) qBlock.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        if (!qText || !optionsContainer || !currentQEl || !quizData[currentQuestionIdx]) return;
        
        const currentQuestion = quizData[currentQuestionIdx];
        currentQEl.textContent = currentQuestionIdx + 1;
        qText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-opt-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => handleAnswer(opt.score));
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(scoreKey) {
        scores[scoreKey]++;
        currentQuestionIdx++;

        if (currentQuestionIdx < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        if (!qBlock || !rBlock) return;
        
        // ОШИБКА ИСПРАВЛЕНА ТУТ: убрано лишнее .style
        qBlock.style.display = 'none';
        rBlock.style.display = 'block';

        let winner = 'balance';
        let maxScore = -1;
        for (let key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                winner = key;
            }
        }

        document.getElementById('result-title').textContent = resultsData[winner].title;
        document.getElementById('result-desc').textContent = resultsData[winner].desc;
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', launchQuiz);
    }
    
    if (qBlock && rBlock) {
        launchQuiz();
    }
});
