/* ==========================================================================
   JESTEM PATRIOTĄ - Główny Skrypt Aplikacji JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Sticky Navbar & Mobile Hamburger Menu --- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handler for navbar background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // Active Section Indicator on Scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }


    /* --- 2. Modals Dialog Handler (Symbole & Kuchnia) --- */
    const modalButtons = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open Symbol Modals
    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal && typeof targetModal.showModal === 'function') {
                targetModal.showModal();
            }
        });
    });

    // Close buttons for all modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if (modal) modal.close();
        });
    });

    // Close modal when clicking outside of modal content (backdrop)
    document.querySelectorAll('.modal-dialog').forEach(modal => {
        modal.addEventListener('click', (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });

    /* --- Dynamic Cuisine Modal --- */
    const cuisineCards = document.querySelectorAll('.cuisine-card');
    const cuisineModal = document.getElementById('cuisine-modal');

    const cuisineData = {
        pierogi: {
            title: "Tradycyjne Pierogi Polskie",
            tag: "Duma Kulinarna",
            img: "images/pierogi.jpg",
            desc: "Pierogi to najsłynniejsza wizytówka polskiej kuchni na świecie. Delikatne ciasto z mąki i wody kryje wyśmienite nadzienia: od klasycznych ruskich (twaróg z ziemniakami i cebulką), przez mięsne, po kapustę z leśnymi grzybami.",
            fact: "Choć pierogi znane były w Polsce już od XIII wieku (sprowadzone wg legendy przez św. Jacka Odrowąża), to właśnie nad Wisłą stały się potrawą kultową i symbolem narodowej gościnności.",
            ingredient: "Mąka pszenna, świeży twaróg, ugotowane ziemniaki, podsmażona złocista cebulka oraz majeranek."
        },
        zurek: {
            title: "Żur Staropolski w Chlebku",
            tag: "Staropolska Zupa",
            img: "images/zurek.jpg",
            desc: "Aromatyczna, gęsta zupa przygotowywana na zakwasie z mąki żytniej. Podawana tradycyjnie z parzoną białą kiełbasą, jajkiem na twardo oraz wędzonym boczkiem, często w wydrążonym bochnie chleba.",
            fact: "Żur jest jedną z najstarszych polskich zup. Słowo 'żur' pochodzi od dawnego niemieckiego 'sūr' (kwaśny), a potrawa od wieków gościła zarówno na szlacheckich dworach, jak i w wiejskich chatach.",
            ingredient: "Naturalny zakwas żytni, wywar na wędzonce, czosnek, majeranek, biała kiełbasa i chrzan."
        },
        bigos: {
            title: "Bigos Staropolski Królewski",
            tag: "Potrawa Szlachecka",
            img: "images/bigos.jpg",
            desc: "Legendarne danie z kiszonej i świeżej kapusty, duszonej powoli z wieloma rodzajami mięs, wędlin, suszonymi grzybami leśnymi, śliwkami oraz czerwonym winem.",
            fact: "Bigos opisywał sam Adam Mickiewicz w 'Panu Tadeuszu'. Tradycyjny bigos Im dłużej jest podgrzewany i odgrzewany przez kolejne dni, tym staje się smaczniejszy i bardziej aromatyczny!",
            ingredient: "Kiszona kapusta, leśne borowiki, suszone śliwki wędzone, jałowiec oraz zestaw pieczystych mięs."
        },
        schabowy: {
            title: "Kotlet Schabowy z Kapustą",
            tag: "Klasyk Niedzielny",
            img: "images/schabowy.jpg",
            desc: "Niezastąpiony element polskiego niedzielnego obiadu. Plaster schabu wieprzowego, rozbity i panierowany w mące, roztrzepanym jajku i bułce tartej, usmażony na złocisty kolor.",
            fact: "Pierwsze pisemne przepisy na kotlet schabowy pojawiły się w polskich książkach kucharskich w XIX wieku jako odmiana sznycla wiedeńskiego, szybko stając się potrawą narodową.",
            ingredient: "Schab wieprzowy z kością lub bez, domowa bułka tarta, smalec do smażenia oraz kapusta zasmażana z koperkiem."
        }
    };

    cuisineCards.forEach(card => {
        card.addEventListener('click', () => {
            const dishKey = card.getAttribute('data-dish');
            const dish = cuisineData[dishKey];
            if (dish && cuisineModal) {
                document.getElementById('cuisine-modal-title').textContent = dish.title;
                document.getElementById('cuisine-modal-tag').textContent = dish.tag;
                document.getElementById('cuisine-modal-img').src = dish.img;
                document.getElementById('cuisine-modal-desc').textContent = dish.desc;
                document.getElementById('cuisine-modal-fact').textContent = dish.fact;
                document.getElementById('cuisine-modal-ingredient').textContent = dish.ingredient;
                cuisineModal.showModal();
            }
        });
    });


    /* --- 3. Military Tab Switcher (Husaria vs Modern) --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });


    /* --- 4. Interactive Patriot Quiz Mini-Game --- */
    const questions = [
        {
            question: "W którym roku odbył się Chrzest Polski pod panowaniem Mieszka I?",
            options: ["966 ROK", "1000 ROK", "1410 ROK", "1918 ROK"],
            correct: 0,
            explanation: "Chrzest Mieszka I w 966 roku uważa się za symboliczny początek państwa polskiego i wejście w krąg kultury łacińskiej."
        },
        {
            question: "Jaki tytuł nosi oficjalny hymn państwowy Rzeczypospolitej Polskiej?",
            options: ["Rota", "Warszawianka", "Mazurek Dąbrowskiego", "Gaude Mater Polonia"],
            correct: 2,
            explanation: "Mazurek Dąbrowskiego (napisany w 1797 roku we Włoszech przez Józefa Wybickiego) jest oficjalnym hymnem od 1927 roku."
        },
        {
            question: "Który polski król dowodził słynną szarżą Husarii podczas Odsieczy Wiedeńskiej w 1683 r.?",
            options: ["Władysław II Jagiełło", "Jan III Sobieski", "Stefan Batory", "Kazimierz Wielki"],
            correct: 1,
            explanation: "Król Jan III Sobieski poprowadził szarżę 20 tysięcy jeźdźców, rozgramiając wojska osmańskie pod Wiedniem."
        },
        {
            question: "Co symbolizuje biały pas na fladze Rzeczypospolitej Polskiej?",
            options: ["Ogień i krew", "Czystość, szlachetność i pokój", "Złote łany zbóż", "Białe Orle skrzydła"],
            correct: 1,
            explanation: "Biel symbolizuje czystość, szlachetność oraz pokój, wywodząc się bezpośrednio z barwy Orła Białego."
        },
        {
            question: "Uchwalenie Konstytucji 3 Maja w 1791 r. uczyniło ją pierwszą taką ustawą w Europie i drugą na świecie po:",
            options: ["Konstytucji Francji", "Konstytucji USA", "Konstytucji Wielkiej Brytanii", "Konstytucji Szwajcarii"],
            correct: 1,
            explanation: "Konstytucja 3 Maja była pierwszą w Europie i drugą na świecie nowoczesną ustawą zasadniczą (po Konstytucji USA z 1787 r.)."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // Quiz DOM Elements
    const qNumEl = document.getElementById('current-q-num');
    const totalQNumEl = document.getElementById('total-q-num');
    const liveScoreEl = document.getElementById('live-score');
    const progressBarEl = document.getElementById('quiz-progress-bar');
    const questionTextEl = document.getElementById('quiz-question-text');
    const optionsContainerEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');

    const quizBodyEl = document.getElementById('quiz-body');
    const quizHeaderEl = document.getElementById('quiz-header');
    const quizResultEl = document.getElementById('quiz-result');

    const finalScoreEl = document.getElementById('final-score');
    const finalPercentEl = document.getElementById('final-percent');
    const rankTitleEl = document.getElementById('result-rank');
    const resultIconEl = document.getElementById('result-icon');
    const resultDescEl = document.getElementById('result-desc');
    const restartBtn = document.getElementById('quiz-restart-btn');

    function initQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        if (totalQNumEl) totalQNumEl.textContent = questions.length;
        if (quizResultEl) quizResultEl.classList.add('hidden');
        if (quizBodyEl) quizBodyEl.classList.remove('hidden');
        if (quizHeaderEl) quizHeaderEl.classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        answered = false;
        const currentQ = questions[currentQuestionIndex];

        if (qNumEl) qNumEl.textContent = currentQuestionIndex + 1;
        if (liveScoreEl) liveScoreEl.textContent = score;
        if (questionTextEl) questionTextEl.textContent = currentQ.question;
        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.className = 'quiz-feedback';
        }
        if (nextBtn) nextBtn.disabled = true;

        // Update progress bar width
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        if (progressBarEl) progressBarEl.style.width = `${progressPercent}%`;

        // Render Options
        if (optionsContainerEl) {
            optionsContainerEl.innerHTML = '';
            const optionKeys = ['A', 'B', 'C', 'D'];

            currentQ.options.forEach((optText, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'quiz-option';
                optBtn.innerHTML = `
                    <span class="quiz-option-key">${optionKeys[idx]}</span>
                    <span class="quiz-option-text">${optText}</span>
                `;

                optBtn.addEventListener('click', () => selectAnswer(idx, optBtn));
                optionsContainerEl.appendChild(optBtn);
            });
        }
    }

    function selectAnswer(selectedIdx, selectedBtn) {
        if (answered) return;
        answered = true;

        const currentQ = questions[currentQuestionIndex];
        const allOptionBtns = optionsContainerEl.querySelectorAll('.quiz-option');

        // Disable all option buttons
        allOptionBtns.forEach(btn => btn.setAttribute('disabled', 'true'));

        if (selectedIdx === currentQ.correct) {
            score++;
            if (liveScoreEl) liveScoreEl.textContent = score;
            selectedBtn.classList.add('correct');
            if (feedbackEl) {
                feedbackEl.textContent = `Brawo! Poprawna odpowiedź. ${currentQ.explanation}`;
                feedbackEl.className = 'quiz-feedback correct-text';
            }
        } else {
            selectedBtn.classList.add('incorrect');
            // Highlight the correct answer
            allOptionBtns[currentQ.correct].classList.add('correct');
            if (feedbackEl) {
                feedbackEl.textContent = `Błąd! ${currentQ.explanation}`;
                feedbackEl.className = 'quiz-feedback incorrect-text';
            }
        }

        if (nextBtn) nextBtn.disabled = false;
    }

    // Next Button Click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }

    // Show Results Screen
    function showResults() {
        if (quizBodyEl) quizBodyEl.classList.add('hidden');
        if (quizHeaderEl) quizHeaderEl.classList.add('hidden');
        if (quizResultEl) quizResultEl.classList.remove('hidden');

        const percentage = Math.round((score / questions.length) * 100);
        if (finalScoreEl) finalScoreEl.textContent = `${score}/${questions.length}`;
        if (finalPercentEl) finalPercentEl.textContent = `${percentage}%`;

        // Calculate Rank Title
        let rank = "Młody Adept";
        let icon = "📜";
        let desc = "Dobry początek! Warto zgłębić bogatą historię naszej Ojczyzny.";

        if (percentage === 100) {
            rank = "Mistrz Rzeczypospolitej";
            icon = "🏆";
            desc = "Genialny wynik! Twoja wiedza o Polsce, jej symbolach i historii jest absolutnie imponująca. Prawdziwy wzór Patriotyzmu!";
        } else if (percentage >= 80) {
            rank = "Strażnik Tradycji";
            icon = "⚔️";
            desc = "Wspaniały wynik! Doskonale znasz kluczowe karty historii i symboliki narodowej.";
        } else if (percentage >= 60) {
            rank = "Bohater Historii";
            icon = "🛡️";
            desc = "Bardzo dobry wynik! Posiadasz solidne fundamenty wiedzy o Polsce.";
        }

        if (rankTitleEl) rankTitleEl.textContent = rank;
        if (resultIconEl) resultIconEl.textContent = icon;
        if (resultDescEl) resultDescEl.textContent = desc;
    }

    // Restart Quiz
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            initQuiz();
        });
    }

    // Initialize Quiz on startup
    initQuiz();

});
