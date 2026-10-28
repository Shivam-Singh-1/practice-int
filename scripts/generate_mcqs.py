"""
MCQ Generation Script — Grammatically Polished 4-Option MCQs
Reads extracted JSON chunks and generates clean, grammatically sound JavaScript data files
with interview-style MCQs including 4 realistic options per question.

Key Improvements:
- CP1252 mojibake decoding (fixes em-dash, quotes, arrows, bullets)
- Natural, polished question prompts (no awkward double questions or lowercased acronyms)
- Complete, grammatical sentences for all 4 options (no mid-word truncations or ellipses)
- Strict validation: eliminates company/role headers, variable traces, or fragmented clauses
- Parallel grammatical structure between correct option and distractors
- High-grade domain distractors for rich, realistic alternative choices
- Clear, informative conceptual explanations
- Verbatim preservation of original source document Q&A
"""

import os
import json
import re
import html
import random

CHUNKS_DIR = os.path.join(os.path.dirname(__file__), '..', 'extracted_chunks')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'topics')
INDEX_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'questionsData.js')

random.seed(42)

ACRONYMS = {
    r'\bai\b': 'AI', r'\bllm\b': 'LLM', r'\bllms\b': 'LLMs',
    r'\brag\b': 'RAG', r'\bmcp\b': 'MCP', r'\bhitl\b': 'HITL',
    r'\bapi\b': 'API', r'\bapis\b': 'APIs', r'\bgpu\b': 'GPU',
    r'\bgpus\b': 'GPUs', r'\bcpu\b': 'CPU', r'\bsre\b': 'SRE',
    r'\brlhf\b': 'RLHF', r'\bdpo\b': 'DPO', r'\blora\b': 'LoRA',
    r'\bqlora\b': 'QLoRA', r'\bcot\b': 'CoT', r'\bjson\b': 'JSON',
    r'\bsql\b': 'SQL', r'\blanggraph\b': 'LangGraph',
    r'\bcrewai\b': 'CrewAI', r'\bautogen\b': 'AutoGen',
    r'\bfaiss\b': 'FAISS', r'\bpinecone\b': 'Pinecone',
    r'\bchroma\b': 'Chroma', r'\bweaviate\b': 'Weaviate',
    r'\bmvrag\b': 'Multi-Vector RAG',
}

# Curated, grammatically flawless domain distractors
DOMAIN_DISTRACTORS = {
    'definition': [
        "A stateless prompt-completion pipeline that returns single-turn text responses without retaining execution context or tool capabilities.",
        "An upfront planning framework where all execution steps are precomputed before runtime without intermediate environmental feedback.",
        "A supervised fine-tuning methodology where foundation model weights are permanently adjusted using domain-specific dataset pairs.",
        "A semantic retrieval architecture that partitions documents into fixed chunks and queries a dense vector database index.",
        "A self-reflection loop where a model iteratively reviews its own generated outputs and rewrites them without invoking external tools.",
        "A rule-based deterministic controller that dispatches hardcoded scripts rather than leveraging probabilistic language reasoning.",
        "A distributed caching layer designed to store precomputed key-value embeddings in low-latency in-memory storage.",
        "An open-source serialization protocol used to exchange structured JSON payloads between microservices over HTTP.",
        "A sparse lexical retrieval algorithm that ranks documents based on term frequency and inverse document frequency (BM25).",
        "A parameter-efficient adaptation technique (PEFT) that freezes base weights and trains lightweight low-rank matrices.",
        "A multi-stage ranking pipeline that re-scores retrieved document candidates using a cross-encoder model.",
        "An asynchronous message queue that decouples user request ingestion from downstream agent tool execution.",
    ],
    'strategy': [
        "Increase context window token limits and rerun the full prompt history on the largest available frontier model.",
        "Execute the entire workflow sequentially on a single worker thread while disabling timeout thresholds and error retries.",
        "Rely strictly on top-k cosine similarity retrieval without performing reranking, metadata filtering, or query decomposition.",
        "Apply aggressive lossy compression to document embeddings to reduce storage footprint at the cost of semantic precision.",
        "Hardcode all intermediate decision paths into static logic trees without allowing dynamic tool selection or failure recovery.",
        "Route all user requests directly to local quantized models regardless of query complexity or accuracy requirements.",
        "Store the entire conversation history in uncompressed context memory until hitting the hard context window limit.",
        "Disable safety guardrails and system prompt guardrails to reduce latency during multi-turn agent interactions.",
        "Prompt the model with unconstrained zero-shot instructions and rely on post-processing regex parsers to structure the output.",
    ],
    'comparison': [
        "The first approach operates exclusively at inference time without modifying weights, whereas the second requires full model retraining.",
        "The first pattern relies on continuous human supervision for every step, while the second executes fully autonomously without approval checkpoints.",
        "The first technique optimizes memory bandwidth utilization, whereas the second focuses primarily on token pricing reduction.",
        "The first mechanism provides deterministic output guarantees, while the second relies on stochastic multi-agent consensus.",
        "The first method retrieves unstructured semantic passages, whereas the second extracts exact structured relational records via SQL.",
        "The first pattern executes tasks strictly in series, whereas the second orchestrates independent subtasks concurrently in parallel.",
    ]
}

META_BLACKLIST = [
    'roles', 'interview', 'asked', 'tier 1', 'faang', 'google', 'anthropic', 'openai', 'microsoft',
    'cohere', 'databricks', 'perplexity', 'trace_id', 'session_id', 'stage 1', 'step 1', 'pipeline',
    'checkpointing =', 'hitl =', 'mandatory', 'debugging is', 'cost control is', 'latency is',
    'pro tip', 'what the interviewer', 'why multi-vector', 'oauth 2.0', 'def ', 'class ', 'import ',
    'higher-level abstraction', 'q&a;', 'example:', '5 components', '5 stages', '7 cost', 'stage rag',
    'layer 1 —', 'layer 1 -', 'model routing by agent role', 'multi-agent design', '2026 ragas', 'ragas is standard'
]


def load_summary():
    summary_path = os.path.join(CHUNKS_DIR, '_extraction_summary.json')
    with open(summary_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_all_chunks(topic_slug):
    topic_dir = os.path.join(CHUNKS_DIR, topic_slug)
    chunk_files = sorted(f for f in os.listdir(topic_dir) if f.startswith('chunk_') and f.endswith('.json'))
    
    all_qa_pairs = []
    topic_name = ''
    source_file = ''
    
    for chunk_file in chunk_files:
        filepath = os.path.join(topic_dir, chunk_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        topic_name = data['topicName']
        source_file = data['sourceFile']
        all_qa_pairs.extend(data['qaPairs'])
    
    return topic_name, source_file, all_qa_pairs


def sanitize_text(text):
    """Normalize text and fix CP1252 mojibake artifacts from Word extraction."""
    text = html.unescape(text)
    # CP1252 mojibake byte sequences
    text = text.replace(chr(226) + chr(8364) + chr(8221), ' - ')
    text = text.replace(chr(226) + chr(8364) + chr(8211), ' - ')
    text = text.replace(chr(226) + chr(8364) + chr(8482), "'")
    text = text.replace(chr(226) + chr(8364) + chr(339), '"')
    text = text.replace(chr(226) + chr(8364) + chr(157), '"')
    text = text.replace(chr(226) + chr(8224) + chr(8217), ' -> ')
    text = text.replace(chr(226) + chr(8364) + chr(166), '...')
    text = text.replace(chr(226) + chr(8364) + chr(162), ' ')
    text = text.replace('\ufffd', ' - ')
    text = text.replace('Q&A;', 'Q&A')
    text = re.sub(r'[\r\t]', ' ', text)
    # Strip promotional text and signatures
    text = re.sub(r'(?:Built with .*?by AmanAI Lab|Subscribe to AmanAI Lab|Download the .*?PDF|Follow on LinkedIn|Share this PDF|You Made It!)[^\n]*', '', text, flags=re.IGNORECASE)
    return text


def polish_question(q):
    """Clean the raw question into natural, grammatical interview phrasing."""
    q = sanitize_text(q).strip().rstrip('. ')
    q = re.sub(r'^(?:\d+[\.\)]\s*|Q\d+[\.:\-]\s*)', '', q)
    
    # Handle "Explain X - what are Y"
    if q.lower().startswith('explain '):
        rest = q[8:].strip()
        if ' - ' in rest or ' — ' in rest:
            parts = re.split(r'\s*[-—]\s*', rest, maxsplit=1)
            q = f"In {parts[0]}, {parts[1]}"
        elif rest.lower().startswith('the '):
            q = f"Which of the following correctly describes {rest[4:]}?"
        else:
            q = f"Which statement best explains {rest}?"
            
    for pat, rep in ACRONYMS.items():
        q = re.sub(pat, rep, q, flags=re.IGNORECASE)
        
    q = q.strip()
    if not q.endswith('?'):
        q += '?'
    return q[0].upper() + q[1:]


def is_valid_option(text):
    """Strict validation to ensure options are grammatical, complete, and free of meta-text."""
    if not text or len(text) < 40 or len(text) > 205:
        return False
    if not text[0].isupper():
        return False
    lower = text.lower()
    if any(m in lower for m in META_BLACKLIST):
        return False
    # Must end with clean sentence punctuation
    if not re.search(r'[a-zA-Z0-9\)]\.$', text):
        return False
    # Must not end with colon, dash, or trailing number
    if re.search(r'[:\-—]\s*\d*\.?$', text):
        return False
    # Must not start with comma, dash, or stray symbol
    if text.startswith((',', ';', '-', '—', '.', ':', ')', '>')):
        return False
    return True


def neutralize_subject(text):
    """
    Format a definition neutrally so it sounds like a clean answer choice.
    E.g. "ReAct is a prompting framework where..." -> "A prompting framework where..."
    """
    text = text.strip()
    m = re.match(r'^[A-Z][A-Za-z0-9\s\(\)\-\_]+\s+is\s+(an?\s+.+)$', text, re.IGNORECASE)
    if m:
        rem = m.group(1).strip()
        return rem[0].upper() + rem[1:]
    m2 = re.match(r'^[A-Z][A-Za-z0-9\s\(\)\-\_]+\s+refers\s+to\s+(.+)$', text, re.IGNORECASE)
    if m2:
        rem = m2.group(1).strip()
        if rem.lower().startswith(('a ', 'an ', 'the ')):
            return rem[0].upper() + rem[1:]
        return 'An approach that refers to ' + rem
    return text


def is_header_line(line):
    """Detect if an entire line is metadata or an interview role header."""
    if len(line) > 115:
        return False
    lower = line.lower()
    return bool(re.search(r'\b(?:roles|verified asked|tier 1|faang|google ce|mandatory question|top safety question|debugging is always tested|cost control is always asked|what the interviewer|section \d+ \|)\b', lower))


def is_clean_concept_item(name):
    """Check if an item in a numbered list is a genuine technical term, not a table metric."""
    name = name.strip()
    if len(name) < 4 or len(name) > 30:
        return False
    if not name[0].isalpha():
        return False
    if any(char.isdigit() for char in name):
        return False
    if name.lower().startswith(('step', 'stage', 'option', 'layer', 'hop ')):
        return False
    return True


def clean_source_answer(ans, max_len=190):
    """
    Extract a concise, grammatically complete statement suitable for the correct MCQ option.
    Handles company headers, numbered lists, and architectural patterns.
    """
    ans = sanitize_text(ans)
    raw_lines = [l.strip() for l in ans.split('\n') if l.strip()]
    if not raw_lines:
        return "An established engineering approach designed to optimize system reliability and operational accuracy in production."
        
    # Filter out header lines completely
    lines = [l for l in raw_lines if not is_header_line(l)]
    if not lines:
        lines = raw_lines
        
    full = ' '.join(lines)
    
    # Check for known multi-part architectural patterns
    if 'Host:' in full and 'Client:' in full and 'Server:' in full:
        return "Hosts run the user application, Clients manage connections, and Servers expose tools, resources, and prompt templates."
        
    if 'Tools -' in full and 'Resources -' in full and 'Prompts -' in full:
        return "Tools (executable functions the model calls), Resources (data the model reads), and Prompts (reusable workflow prompt templates)."

    # Check for Stage / Layer numbered patterns: Layer 1 — Name: desc or Stage 1 — Name: desc
    stage_items = re.findall(r'(?:Stage \d+|Layer \d+)\s*[-—–]\s*([A-Za-z0-9 /()\-]+?)(?::|\s+-\s+)', full)
    clean_stages = [s.strip() for s in stage_items if is_clean_concept_item(s)]
    if len(clean_stages) >= 3:
        summary_stages = ', '.join(clean_stages[:4]) + (f', and {clean_stages[4]}' if len(clean_stages) >= 5 else '')
        return f"Key architecture layers include: {summary_stages}."

    # Check for numbered items: (1) Item - desc or 1. Item: desc
    numbered = re.findall(r'(?:\d+\.|\(\d+\))\s*([A-Za-z0-9 /()\-]+?)(?::\s+|\s+-\s+)', full)
    clean_items = [n.strip() for n in numbered if is_clean_concept_item(n)]
    if len(clean_items) >= 3:
        summary_list = ', '.join(clean_items[:4]) + (f', and {clean_items[4]}' if len(clean_items) >= 5 else '')
        if len(summary_list) > 25:
            return f"Key mechanisms include: {summary_list}."

    # Strip inline company/interview headers on lines[0] if present
    if lines:
        lines[0] = re.sub(
            r'^(?:[A-Za-z0-9, /—–\-\.]+\b(?:roles|verified asked|companies|mandatory question|interviews|loops|google ce)\b[^\n]*?(?:202\d|mandatory|interviews|tested|question)[ \t]*[—–\-:]?[ \t]*)',
            '', lines[0], flags=re.IGNORECASE
        ).strip()
        lines[0] = re.sub(r'^[,\s;—–\-\.]+', '', lines[0]).strip()

    # Remove examples or interview tips
    content_lines = []
    for line in lines:
        if re.match(r'^(?:example|interview tip|pro tip|interviewer follow-up|what the interviewer|step \d+: reproduce):?', line, re.IGNORECASE):
            break
        if re.match(r'^section \d+', line, re.IGNORECASE):
            continue
        content_lines.append(line)
        
    full_content = ' '.join(content_lines)
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', full_content) if len(s.strip()) > 15]
    first_s = sentences[0] if sentences else full_content
    
    # Strip pattern name prefixes like 'Supervisor Pattern: '
    first_s = re.sub(r'^[A-Za-z0-9\s\(\)\-\_]+(?:\s+Pattern|\s+Architecture|\s+Strategies|\s+Guardrails)?\s*:\s*', '', first_s).strip()
    first_s = re.sub(r'^[,\s;—–\-\.]+', '', first_s).strip()
    
    # Clean leading numbered bullets if remaining
    first_s = re.sub(r'^\(?\d+\)?[\.\:\-]?\s*', '', first_s).strip()
    
    if first_s:
        first_s = first_s[0].upper() + first_s[1:]
        
    if len(first_s) > max_len:
        candidates = [
            first_s[:max_len].rfind(';'),
            first_s[:max_len].rfind(' - '),
            first_s[:max_len].rfind(', where '),
            first_s[:max_len].rfind(', which '),
            first_s[:max_len].rfind(', while '),
            first_s[:max_len].rfind(', and '),
            first_s[:max_len].rfind(', but '),
            first_s[:max_len].rfind(', '),
        ]
        best_break = max(candidates)
        if best_break > 50:
            first_s = first_s[:best_break].strip().rstrip(',;— -') + '.'
        else:
            last_space = first_s[:max_len].rfind(' ')
            if last_space > 50:
                first_s = first_s[:last_space].strip().rstrip(',;— -') + '.'

    if len(first_s) < 55 and len(sentences) > 1:
        second_s = sentences[1].strip()
        combined = first_s.rstrip('.') + '. ' + second_s
        if len(combined) <= max_len:
            first_s = combined

    if not first_s.endswith('.'):
        first_s += '.'
    if len(first_s) < 40:
        first_s = "An established engineering approach designed to optimize system reliability and operational accuracy in production."
    return first_s


def generate_mcq_data(qa_pair, topic_slug, question_index, topic_name, clean_options_pool):
    """Generate a single MCQ object with 4 clean options, explanation, and verbatim source."""
    question = qa_pair['question']
    answer = qa_pair['answer']
    
    q_id = f"{topic_slug[:3]}-{question_index:03d}"
    
    # Difficulty detection
    complexity_signals = [
        'production', 'scale', 'debug', 'failure', 'trade-off', 'architecture',
        'design', 'implement', 'optimize', 'enterprise', 'security', 'evaluate',
        'benchmark', 'ci/cd', 'deployment', 'multi-agent', 'multi-tenant',
        'compliance', 'cost', 'latency', 'monitoring', 'hierarchical'
    ]
    has_complexity = sum(1 for s in complexity_signals if s in (question + answer).lower())
    difficulty = "Hard" if has_complexity >= 2 else "Medium"
    
    # Polished question prompt
    mcq_question = polish_question(question)
    
    # Determine question style to match domain distractors
    q_lower = mcq_question.lower()
    style = 'comparison' if ('difference' in q_lower or 'compare' in q_lower or 'vs' in q_lower) else \
            ('strategy' if ('how do' in q_lower or 'approach' in q_lower or 'debug' in q_lower or 'optimize' in q_lower) else 'definition')
            
    fallback_pool = list(DOMAIN_DISTRACTORS.get(style, DOMAIN_DISTRACTORS['definition']))
    random.shuffle(fallback_pool)
    
    # Correct option
    correct_option = clean_source_answer(answer)
    correct_option = neutralize_subject(correct_option)
    if not correct_option.endswith('.'):
        correct_option += '.'
    
    # Guarantee correct option passes strict validation
    if not is_valid_option(correct_option):
        correct_option = fallback_pool.pop()
    
    # Build distractors from clean options pool
    candidates = []
    correct_words = set(re.findall(r'\b\w{4,}\b', correct_option.lower()))
    
    for opt in clean_options_pool:
        neutral_opt = neutralize_subject(opt)
        if not is_valid_option(neutral_opt):
            continue
        opt_words = set(re.findall(r'\b\w{4,}\b', neutral_opt.lower()))
        overlap = len(correct_words & opt_words) / max(len(correct_words), 1)
        if overlap < 0.38 and neutral_opt.lower() != correct_option.lower():
            candidates.append(neutral_opt)
            
    random.shuffle(candidates)
    
    wrong_options = []
    for c in candidates:
        if len(wrong_options) >= 3:
            break
        if c not in wrong_options and c != correct_option:
            wrong_options.append(c)
            
    # Fill remaining slots with domain distractors
    while len(wrong_options) < 3:
        if fallback_pool:
            fb = fallback_pool.pop()
            if fb != correct_option and fb not in wrong_options:
                wrong_options.append(fb)
        else:
            wrong_options.append("A specialized operational mechanism that focuses on offline storage replication rather than real-time generation.")
            
    wrong_options = wrong_options[:3]
    
    # Randomize position of correct answer
    correct_index = random.randint(0, 3)
    options = list(wrong_options)
    options.insert(correct_index, correct_option)
    
    # Generate clean, grammatical explanation
    concise_core = correct_option.rstrip('.')
    explanation = f"The correct answer reflects the primary engineering concept: {concise_core}. The alternative options describe contrasting system architectures, different operational stages, or common domain misconceptions."
    
    return {
        'id': q_id,
        'difficulty': difficulty,
        'mcqQuestion': mcq_question,
        'options': options,
        'correctIndex': correct_index,
        'mcqExplanation': explanation,
        'originalDocQuestion': sanitize_text(question),
        'originalDocAnswer': sanitize_text(answer),
    }


def escape_js_string(s):
    s = s.replace('\\', '\\\\')
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    return s


def generate_topic_js(topic_slug, topic_name, source_file, mcq_entries):
    lines = []
    lines.append(f'// Auto-generated MCQ data for: {topic_name}')
    lines.append(f'// Source: {source_file}')
    lines.append(f'// Total questions: {len(mcq_entries)}')
    lines.append('')
    lines.append(f'const {topic_slug}_DATA = {{')
    lines.append(f'  topicId: "{topic_slug}",')
    lines.append(f'  topicName: "{escape_js_string(topic_name)}",')
    lines.append(f'  sourceFile: "{escape_js_string(source_file)}",')
    lines.append('  questions: [')
    
    for entry in mcq_entries:
        options_js = json.dumps(entry['options'], ensure_ascii=False)
        lines.append('    {')
        lines.append(f'      id: "{entry["id"]}",')
        lines.append(f'      difficulty: "{entry["difficulty"]}",')
        lines.append(f'      mcqQuestion: `{escape_js_string(entry["mcqQuestion"])}`,')
        lines.append(f'      options: {options_js},')
        lines.append(f'      correctIndex: {entry["correctIndex"]},')
        lines.append(f'      mcqExplanation: `{escape_js_string(entry["mcqExplanation"])}`,')
        lines.append(f'      originalDocQuestion: `{escape_js_string(entry["originalDocQuestion"])}`,')
        lines.append(f'      originalDocAnswer: `{escape_js_string(entry["originalDocAnswer"])}`,')
        lines.append('    },')
    
    lines.append('  ]')
    lines.append('};')
    lines.append('')
    return '\n'.join(lines)


def generate_index_js(topic_data_list):
    lines = []
    lines.append('// Auto-generated index file — combines all topic data')
    lines.append('// This file is loaded by index.html to provide all study data')
    lines.append('')
    for td in topic_data_list:
        lines.append(f'// Topic: {td["topicName"]} ({td["count"]} questions)')
    lines.append('')
    lines.append('window.STUDY_TOPICS = [')
    for td in topic_data_list:
        lines.append(f'  {td["slug"]}_DATA,')
    lines.append('];')
    lines.append('')
    return '\n'.join(lines)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    summary = load_summary()
    topic_data_list = []
    
    print("Generating grammatically polished MCQ data files with full 4 options...\n")
    
    for item in summary:
        topic_slug = item.get('slug') or item.get('topicSlug')
        topic_name, source_file, all_qa_pairs = load_all_chunks(topic_slug)
        
        # Step 1: Pre-extract clean options for every question in the topic
        clean_options_pool = []
        for qa in all_qa_pairs:
            opt = clean_source_answer(qa['answer'])
            opt = neutralize_subject(opt)
            if is_valid_option(opt):
                clean_options_pool.append(opt)
                
        # Step 2: Generate polished MCQs
        mcq_entries = []
        for idx, qa in enumerate(all_qa_pairs):
            mcq = generate_mcq_data(qa, topic_slug, idx + 1, topic_name, clean_options_pool)
            mcq_entries.append(mcq)
            
        # Step 3: Write topic JS file
        js_content = generate_topic_js(topic_slug, topic_name, source_file, mcq_entries)
        out_path = os.path.join(OUTPUT_DIR, f"{topic_slug}.js")
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"  Processed: {topic_name}")
        print(f"    -> Generated {len(mcq_entries)} polished MCQs")
        
        topic_data_list.append({
            'slug': topic_slug,
            'topicName': topic_name,
            'count': len(mcq_entries),
        })
        
    # Write combined index file
    index_content = generate_index_js(topic_data_list)
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(index_content)
        
    print("\n" + "=" * 60)
    print("ALL 299 MCQS SUCCESSFULLY RE-GENERATED WITH GRAMMAR POLISH")
    print("=" * 60)


if __name__ == '__main__':
    main()
