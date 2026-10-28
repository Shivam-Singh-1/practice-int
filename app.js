/**
 * GenAI Interview Prep — MCQ Study App
 * 
 * Core application logic:
 * - Topic selection and rendering
 * - Interactive MCQ cards with immediate feedback
 * - Dual answer reveal (original doc verbatim + explanation)
 * - Score tracking via localStorage
 * - Search, filter (all/unanswered/incorrect/bookmarked), and review mode
 * - Mobile-responsive sidebar toggle
 */

(function () {
  'use strict';

  // =========================================
  // STATE
  // =========================================
  const topics = window.STUDY_TOPICS || [];
  let activeTopicId = null;
  let activeFilter = 'all';
  let searchQuery = '';
  let isReviewMode = false;

  // Topic icons mapping
  const TOPIC_ICONS = {
    // Networking Topics
    'networking_fundamentals': '🌐',
    'networking_devices': '🖧',
    'ip_addressing_subnetting': '🔢',
    'tcp_udp_services': '🔌',
    'switching_layer2': '🔀',
    'routing_ospf_bgp': '🛣️',
    'linux_networking': '🐧',
    'network_troubleshooting': '🔍',

    // GenAI Topics (for backwards compatibility)
    'ai_agents_interview_bank': '🤖',
    'ai_engineering_interview_bank': '⚙️',
    'agentic_ai_interview_bank': '🧬',
    'genai_fresher_fundamentals': '📚',
    'llm_interview_bank': '🧠',
    'production_genai_interview_bank': '🏭',
    'prompt_engineering_interview_bank': '✍️',
    'rag_interview_bank': '🔍',
  };

  // =========================================
  // LOCAL STORAGE HELPERS
  // =========================================
  const STORAGE_KEY = 'network-mcq-progress';

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // localStorage might be full or disabled — silently ignore
    }
  }

  function getQuestionState(questionId) {
    const progress = loadProgress();
    return progress[questionId] || null;
  }

  function setQuestionState(questionId, state) {
    const progress = loadProgress();
    progress[questionId] = state;
    saveProgress(progress);
  }

  function isBookmarked(questionId) {
    const progress = loadProgress();
    return progress[questionId]?.bookmarked || false;
  }

  function toggleBookmark(questionId) {
    const progress = loadProgress();
    if (!progress[questionId]) {
      progress[questionId] = { bookmarked: true };
    } else {
      progress[questionId].bookmarked = !progress[questionId].bookmarked;
    }
    saveProgress(progress);
    return progress[questionId].bookmarked;
  }

  function resetTopicProgress(topicId) {
    const progress = loadProgress();
    const topic = topics.find(t => t.topicId === topicId);
    if (!topic) return;

    topic.questions.forEach(q => {
      delete progress[q.id];
    });
    saveProgress(progress);
  }

  // =========================================
  // STATS COMPUTATION
  // =========================================
  function computeGlobalStats() {
    const progress = loadProgress();
    let total = 0;
    let answered = 0;
    let correct = 0;

    topics.forEach(topic => {
      topic.questions.forEach(q => {
        total++;
        const state = progress[q.id];
        if (state && state.answered) {
          answered++;
          if (state.correct) correct++;
        }
      });
    });

    return { total, answered, correct };
  }

  function computeTopicStats(topicId) {
    const progress = loadProgress();
    const topic = topics.find(t => t.topicId === topicId);
    if (!topic) return { total: 0, answered: 0, correct: 0 };

    let answered = 0;
    let correct = 0;

    topic.questions.forEach(q => {
      const state = progress[q.id];
      if (state && state.answered) {
        answered++;
        if (state.correct) correct++;
      }
    });

    return { total: topic.questions.length, answered, correct };
  }

  // =========================================
  // DOM REFERENCES
  // =========================================
  const topicListEl = document.getElementById('topic-list');
  const containerEl = document.getElementById('questions-container');
  const titleEl = document.getElementById('main-title');
  const questionCountEl = document.getElementById('question-count');
  const searchInputEl = document.getElementById('search-input');
  const welcomeEl = document.getElementById('welcome-state');
  const reviewToggleBtn = document.getElementById('review-toggle');
  const resetBtn = document.getElementById('reset-btn');
  const sidebarEl = document.getElementById('sidebar');
  const overlayEl = document.getElementById('sidebar-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const statTotalEl = document.getElementById('stat-total');
  const statAnsweredEl = document.getElementById('stat-answered');
  const statCorrectEl = document.getElementById('stat-correct');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const mainContentEl = document.querySelector('.main-content');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // =========================================
  // RENDER: GLOBAL STATS
  // =========================================
  function renderGlobalStats() {
    const stats = computeGlobalStats();
    statTotalEl.textContent = stats.total;
    statAnsweredEl.textContent = stats.answered;
    statCorrectEl.textContent = stats.correct;
  }

  // =========================================
  // RENDER: TOPIC SIDEBAR
  // =========================================
  function renderTopics() {
    topicListEl.innerHTML = '';

    topics.forEach(topic => {
      const stats = computeTopicStats(topic.topicId);
      const progressPercent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      const icon = TOPIC_ICONS[topic.topicId] || '📄';

      const btn = document.createElement('button');
      btn.className = 'topic-btn' + (topic.topicId === activeTopicId ? ' active' : '');
      btn.setAttribute('data-topic-id', topic.topicId);

      btn.innerHTML = `
        <div class="topic-icon">${icon}</div>
        <div class="topic-info">
          <span class="topic-name">${escapeHtml(topic.topicName)}</span>
          <div class="topic-meta">
            <span class="topic-count">${topic.questions.length} Qs</span>
            <div class="topic-progress">
              <div class="topic-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <span class="topic-score">${progressPercent}%</span>
          </div>
        </div>
      `;

      btn.addEventListener('click', () => {
        selectTopic(topic.topicId);
        closeSidebar();
      });

      topicListEl.appendChild(btn);
    });
  }

  // =========================================
  // RENDER: QUESTIONS
  // =========================================
  function selectTopic(topicId) {
    activeTopicId = topicId;
    isReviewMode = false;
    reviewToggleBtn.classList.remove('active');
    renderTopics();
    renderQuestions();
    renderGlobalStats();
    if (mainContentEl) {
      mainContentEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  function getFilteredQuestions(topic) {
    const progress = loadProgress();
    let questions = topic.questions;

    // Apply filter
    if (activeFilter === 'unanswered') {
      questions = questions.filter(q => {
        const state = progress[q.id];
        return !state || !state.answered;
      });
    } else if (activeFilter === 'incorrect') {
      questions = questions.filter(q => {
        const state = progress[q.id];
        return state && state.answered && !state.correct;
      });
    } else if (activeFilter === 'bookmarked') {
      questions = questions.filter(q => {
        const state = progress[q.id];
        return state && state.bookmarked;
      });
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      questions = questions.filter(q =>
        (q.mcqQuestion && q.mcqQuestion.toLowerCase().includes(query)) ||
        (q.originalDocQuestion && q.originalDocQuestion.toLowerCase().includes(query)) ||
        (q.originalDocAnswer && q.originalDocAnswer.toLowerCase().includes(query)) ||
        (q.mcqExplanation && q.mcqExplanation.toLowerCase().includes(query)) ||
        (q.options && q.options.some(opt => opt.toLowerCase().includes(query)))
      );
    }

    return questions;
  }

  function renderQuestions() {
    const topic = topics.find(t => t.topicId === activeTopicId);
    if (!topic) {
      containerEl.innerHTML = '';
      containerEl.appendChild(welcomeEl);
      welcomeEl.style.display = 'flex';
      titleEl.innerHTML = 'Select a Topic';
      questionCountEl.textContent = '';
      return;
    }

    welcomeEl.style.display = 'none';

    const filteredQuestions = getFilteredQuestions(topic);

    titleEl.innerHTML = escapeHtml(topic.topicName);
    questionCountEl.textContent = `${filteredQuestions.length} question${filteredQuestions.length !== 1 ? 's' : ''}`;

    containerEl.innerHTML = '';

    if (filteredQuestions.length === 0) {
      containerEl.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔎</div>
          <h3>No questions match</h3>
          <p>Try a different filter or search term.</p>
        </div>
      `;
      return;
    }

    if (isReviewMode) {
      renderReviewMode(filteredQuestions, topic);
      return;
    }

    filteredQuestions.forEach((q, idx) => {
      const card = createQuestionCard(q, idx, topic);
      containerEl.appendChild(card);
    });
  }

  function createQuestionCard(q, idx, topic) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.setAttribute('data-question-id', q.id);

    const progress = loadProgress();
    const savedState = progress[q.id];
    const isAnswered = Boolean(savedState && savedState.answered);
    const savedBookmarked = Boolean(savedState && savedState.bookmarked);
    const selectedIndex = isAnswered ? savedState.selectedIndex : null;

    const difficultyClass = q.difficulty === 'Hard' ? 'badge-hard' : 'badge-medium';
    const displayQuestion = q.mcqQuestion || q.originalDocQuestion;

    card.innerHTML = `
      <div class="question-card-header">
        <div class="question-badges">
          <span class="badge badge-number">Q${idx + 1}</span>
          <span class="badge ${difficultyClass}">${q.difficulty}</span>
        </div>
        <button class="bookmark-btn ${savedBookmarked ? 'bookmarked' : ''}" data-qid="${q.id}" aria-label="Bookmark">
          ${savedBookmarked ? '⭐' : '☆'}
        </button>
      </div>
      <div class="question-text">${escapeHtml(displayQuestion)}</div>
      <div class="options-list"></div>
      <div class="answer-section" style="${isAnswered ? 'display:block;' : 'display:none;'}">
        <div class="reveal-box explanation-box">
          <div class="reveal-label accent">
            💡 Answer Explanation
          </div>
          <div class="explanation-text">${escapeHtml(q.mcqExplanation || 'Explanation unavailable.')}</div>
        </div>
        <div class="reveal-box doc-box">
          <div class="reveal-label warm">
            📄 Original Document Verbatim Reference (${escapeHtml(topic.sourceFile)})
          </div>
          <div class="doc-question-heading">${escapeHtml(q.originalDocQuestion)}</div>
          <div class="doc-answer-text">${escapeHtml(q.originalDocAnswer)}</div>
        </div>
      </div>
    `;

    // Bookmark handler
    const bookmarkBtn = card.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isNowBookmarked = toggleBookmark(q.id);
      bookmarkBtn.className = 'bookmark-btn' + (isNowBookmarked ? ' bookmarked' : '');
      bookmarkBtn.innerHTML = isNowBookmarked ? '⭐' : '☆';

      // If currently filtering by bookmarked and we un-bookmarked, re-render
      if (activeFilter === 'bookmarked' && !isNowBookmarked) {
        renderQuestions();
      }
    });

    const optionsList = card.querySelector('.options-list');
    const answerSection = card.querySelector('.answer-section');
    const optionBtns = [];

    const options = (Array.isArray(q.options) && q.options.length > 0)
      ? q.options
      : [q.originalDocAnswer];

    options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';

      if (isAnswered) {
        btn.disabled = true;
        if (optIdx === selectedIndex) {
          btn.classList.add(savedState.correct ? 'correct' : 'wrong');
        } else if (optIdx === q.correctIndex && !savedState.correct) {
          btn.classList.add('unselected-correct');
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${OPTION_LETTERS[optIdx] || (optIdx + 1)}</span>
        <span>${escapeHtml(optText)}</span>
      `;

      btn.addEventListener('click', () => {
        const currentSaved = getQuestionState(q.id);
        if (currentSaved && currentSaved.answered) return;

        const isCorrect = (optIdx === q.correctIndex);

        // Mark as answered
        setQuestionState(q.id, {
          answered: true,
          selectedIndex: optIdx,
          correct: isCorrect,
          bookmarked: isBookmarked(q.id),
        });

        // Update button states
        optionBtns.forEach((otherBtn, oIdx) => {
          otherBtn.disabled = true;
          if (oIdx === optIdx) {
            otherBtn.classList.add(isCorrect ? 'correct' : 'wrong');
          } else if (oIdx === q.correctIndex && !isCorrect) {
            otherBtn.classList.add('unselected-correct');
          }
        });

        // Show answer reveal section
        answerSection.style.display = 'block';

        // Auto-scroll newly revealed explanation into view on mobile
        setTimeout(() => {
          const rect = answerSection.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.bottom > viewportHeight - 50) {
            answerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 80);

        renderGlobalStats();
        renderTopics();
      });

      optionBtns.push(btn);
      optionsList.appendChild(btn);
    });

    return card;
  }

  // =========================================
  // RENDER: REVIEW MODE
  // =========================================
  function renderReviewMode(questions, topic) {
    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'review-card';
      const correctOptionText = (q.options && q.options[q.correctIndex]) ? q.options[q.correctIndex] : q.originalDocAnswer;
      const letter = OPTION_LETTERS[q.correctIndex] || '✓';

      card.innerHTML = `
        <div class="review-question">
          <span class="review-num">Q${idx + 1}</span>
          <div style="flex:1;">
            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-xs);">
              ${escapeHtml(q.mcqQuestion || q.originalDocQuestion)}
            </div>
            <div style="font-size: 0.85rem; color: var(--accent-primary); margin-bottom: var(--space-sm);">
              Correct Answer (${letter}): <span style="color: var(--correct); font-weight: 600;">${escapeHtml(correctOptionText)}</span>
            </div>
          </div>
        </div>
        ${q.mcqExplanation ? `
          <div style="margin-bottom: var(--space-md); padding: var(--space-md); background: rgba(56, 189, 248, 0.05); border-left: 2px solid var(--accent-primary); border-radius: var(--radius-sm); font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <strong>Explanation:</strong> ${escapeHtml(q.mcqExplanation)}
          </div>
        ` : ''}
        <div class="review-answer">
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-warm); font-weight: 700; margin-bottom: var(--space-xs);">
            📄 Verbatim Reference (${escapeHtml(topic.sourceFile)})
          </div>
          <div>${escapeHtml(q.originalDocAnswer)}</div>
        </div>
      `;
      containerEl.appendChild(card);
    });
  }

  // =========================================
  // EVENT HANDLERS
  // =========================================

  // Search
  searchInputEl.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    if (activeTopicId) {
      renderQuestions();
    }
  });

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      if (activeTopicId) {
        renderQuestions();
      }
    });
  });

  // Review mode toggle
  reviewToggleBtn.addEventListener('click', () => {
    isReviewMode = !isReviewMode;
    reviewToggleBtn.classList.toggle('active', isReviewMode);
    if (activeTopicId) {
      renderQuestions();
    }
  });

  // Reset topic progress
  resetBtn.addEventListener('click', () => {
    if (!activeTopicId) return;
    const topic = topics.find(t => t.topicId === activeTopicId);
    if (!topic) return;

    const confirmed = confirm(`Reset all progress for "${topic.topicName}"?`);
    if (!confirmed) return;

    resetTopicProgress(activeTopicId);
    renderTopics();
    renderQuestions();
    renderGlobalStats();
  });

  // Mobile sidebar
  hamburgerBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('open');
    overlayEl.classList.toggle('visible');
  });

  overlayEl.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebarEl.classList.remove('open');
    overlayEl.classList.remove('visible');
  }

  // Scroll to top button handler
  if (scrollTopBtn && mainContentEl) {
    mainContentEl.addEventListener('scroll', () => {
      if (mainContentEl.scrollTop > 280) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      mainContentEl.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================
  // UTILITIES
  // =========================================
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // =========================================
  // INIT
  // =========================================
  function init() {
    renderGlobalStats();
    renderTopics();

    // Auto-select first topic if available
    if (topics.length > 0) {
      // Don't auto-select — show welcome state
    }
  }

  init();
})();
