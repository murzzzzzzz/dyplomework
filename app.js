document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный статус у всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Добавляем класс нажатой кнопке
            button.classList.add('active');

            // Показываем нужный блок по data-атрибуту
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
                // --- КОД ИНТЕРАКТИВНОГО ТЕСТА ---
    const quizData = [
        {
            question: "Какая задача для твоего ПК в абсолютном приоритете?",
            options: [
                { text: "Рендеринг 3D, монтаж тяжелого видео и сложные вычисления", score: "heavy" },
                { text: "Максимальный FPS в современных играх и киберспорте", score: "gaming" },
                { text: "Стабильный баланс: учеба, браузер, несложные игры и чтобы надолго", score: "balance" },
                { text: "Экономия бюджета: тихая сборка для работы и старых игр", score: "budget" }
            ]
        },
        {
            question: "Как часто ты планируешь делать апгрейд процессора?",
            options: [
                { text: "Куплю один раз топовую платформу, менять ничего не буду лет 5-7", score: "heavy" },
                { text: "Хочу иметь возможность через 2-3 года просто переставить процессор в ту же плату", score: "balance" },
                { text: "Готов менять платформу целиком, если выйдет ультимативное игровое решение", score: "gaming" },
                { text: "Главное, чтобы материнка и память стоили копейки прямо сейчас", score: "budget" }
            ]
        },
        {
            question: "Какая архитектурная особенность процессора тебя привлекает больше?",
            options: [
                { text: "Огромное количество ядер и многопоточность для жестких задач", score: "heavy" },
                { text: "Увеличенный 3D V-Cache (L3 кэш), дающий дикий буст в играх", score: "gaming" },
                { text: "Долговечный сокет, который инженеры будут поддерживать годами", score: "balance" },
                { text: "Проверенная временем народная архитектура без переплат за маркетинг", score: "budget" }
            ]
        }
    ];

    const resultsData = {
        heavy: {
            title: "Intel Core i9 / AMD Ryzen 9 (Многоядерные Монстры)",
            desc: "Ты не привык идти на компромиссы. Твой выбор — ультимативные многоядерные флагманы. Исторически этот класс CPU развивался для тяжелых рабочих станций, но сегодня они доступны обычному пользователю для рендеринга и стриминга без малейших задержек."
        },
        gaming: {
            title: "AMD Ryzen X3D (Короли Гейминга)",
            desc: "Твой приоритет — чистая производительность в играх. Процессоры с технологией 3D V-Cache совершили исторический переворот в игровой индустрии, доказав, что огромный объем быстрой кэш-памяти третьего уровня важнее для FPS, чем бездумное наращивание тактовой частоты."
        },
        balance: {
            title: "AMD Ryzen 5 / 7 (Экосистема AM4 / AM5)",
            desc: "Ты выбираешь самый прагматичный путь в истории hardware — долговечные платформы с заделом на будущее. Процессоры этого класса предлагают идеальный баланс производительности на рубль и позволяют легко обновиться через пару лет без покупки новой материнской платы."
        },
        budget: {
            title: "Intel Core i5 / Core i3 (Народная Классика)",
            desc: "Твой выбор — проверенная временем стабильность. Исторически линейки уровня Core i5 становились основой для 80% домашних ПК во всем мире. Они предлагают отличную производительность в повседневных задачах и играх без необходимости переплачивать за дорогие системы охлаждения."
        }
    };

    let currentQuestionIdx = 0;
    const scores = { heavy: 0, gaming: 0, balance: 0, budget: 0 };

    const qBlock = document.getElementById('quiz-questions');
    const rBlock = document.getElementById('quiz-result');
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQEl = document.getElementById('current-q');

    function launchQuiz() {
        currentQuestionIdx = 0;
        for (let key in scores) scores[key] = 0;
        rBlock.style.display = 'none';
        qBlock.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIdx];
        currentQEl.textContent = currentQuestionIdx + 1;
        qText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
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
        qBlock.style.display = 'none';
        rBlock.style.display = 'block';

        // Находим категорию с максимальным количеством баллов
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

    document.getElementById('restart-btn').addEventListener('click', launchQuiz);
    
    // Запуск квиза при загрузке страницы
    launchQuiz();

        });
    });
});

