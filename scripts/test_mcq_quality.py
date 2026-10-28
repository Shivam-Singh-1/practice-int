"""
Test script to inspect generated MCQ quality and grammar across topics.
"""
import os
import json
import re
import sys
import random

sys.stdout.reconfigure(encoding='utf-8')

CHUNKS_DIR = os.path.join(os.path.dirname(__file__), '..', 'extracted_chunks')

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

def sanitize(text):
    text = text.replace('\ufffd', '—')
    text = re.sub(r'[\r\t]', ' ', text)
    # Remove promos and signatures
    text = re.sub(r'(?:Built with .*?by AmanAI Lab|Subscribe to AmanAI Lab|Download the .*?PDF|Follow on LinkedIn|Share this PDF|You Made It!)[^\n]*', '', text, flags=re.IGNORECASE)
    return text

def polish_question(q):
    q = sanitize(q).strip().rstrip('. ')
    q = re.sub(r'^(?:\d+[\.\)]\s*|Q\d+[\.:\-]\s*)', '', q)
    
    # Handle "Explain X - what are Y"
    if q.lower().startswith('explain '):
        rest = q[8:].strip()
        if ' - ' in rest or ' — ' in rest:
            parts = re.split(r'\s*[-—]\s*', rest, maxsplit=1)
            q = f"In {parts[0]}, {parts[1]}"
        elif rest.lower().startswith('the '):
            q = f"How does {rest[4:]} function?" if not rest.endswith('?') else f"How does {rest[4:]}"
        else:
            q = f"Which statement best explains {rest}?"
            
    for pat, rep in ACRONYMS.items():
        q = re.sub(pat, rep, q, flags=re.IGNORECASE)
        
    q = q.strip()
    if not q.endswith('?'):
        q += '?'
    return q[0].upper() + q[1:]

def clean_answer_body(ans):
    ans = sanitize(ans)
    lines = [l.strip() for l in ans.split('\n') if l.strip()]
    content_lines = []
    
    for i, line in enumerate(lines):
        # Stop at examples or tips
        if re.match(r'^(?:example|interview tip|pro tip|interviewer follow-up|what the interviewer|step \d+: reproduce):?', line, re.IGNORECASE):
            break
            
        # Strip header line
        if i == 0 or (i == 1 and len(content_lines) == 0):
            if re.search(r'(?:roles|verified asked|companies —|mandatory question|production debugging|real operational question|latency is always probed|cost control is always asked|eval is \d{4})', line, re.IGNORECASE):
                m = re.search(r'(?:asked \d{4}|roles\s*[-—:]?|mandatory question\s*[-—:]?|question \d{4}\s*[-—:]?|tested[ \t]*[-—:]?)\s+([A-Z].*)', line)
                if m:
                    content_lines.append(m.group(1).strip())
                continue
                
        if re.match(r'^section \d+', line, re.IGNORECASE):
            continue
            
        content_lines.append(line)
        
    text = ' '.join(content_lines)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_clean_option(ans, max_len=190):
    body = clean_answer_body(ans)
    if not body:
        body = sanitize(ans).split('\n')[0].strip()
        
    # Check for multi-part items like Host: ... Client: ... Server: ...
    if 'Host:' in body and 'Client:' in body and 'Server:' in body:
        return "Hosts run the user application, Clients manage connections, and Servers expose tools, resources, and prompt templates."
        
    if 'Tools -' in body and 'Resources -' in body and 'Prompts -' in body:
        return "Tools (executable functions the model calls), Resources (data the model reads), and Prompts (reusable workflow prompt templates)."
        
    # Remove leading bullets or numbering
    body = re.sub(r'^(?:[-*•]\s*|\(?\d+\)?[\.\:\-]?\s*)', '', body).strip()
    
    # Split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', body)
    first_s = sentences[0].strip() if sentences else body
    
    # If first sentence is good length
    if 50 <= len(first_s) <= max_len:
        if not first_s.endswith('.'): first_s += '.'
        return first_s
        
    if len(first_s) > max_len:
        # Break at logical clause
        candidates = [
            first_s[:max_len].rfind(';'),
            first_s[:max_len].rfind(' — '),
            first_s[:max_len].rfind(' - '),
            first_s[:max_len].rfind(', where '),
            first_s[:max_len].rfind(', which '),
            first_s[:max_len].rfind(', while '),
            first_s[:max_len].rfind(', and '),
            first_s[:max_len].rfind(', but '),
            first_s[:max_len].rfind(', '),
        ]
        best_break = max(candidates)
        if best_break > 60:
            return first_s[:best_break].strip().rstrip(',;— -') + '.'
        last_space = first_s[:max_len].rfind(' ')
        if last_space > 60:
            return first_s[:last_space].strip().rstrip(',;— -') + '.'
            
    # If first sentence is short, combine with second
    if len(sentences) > 1:
        combined = first_s + ' ' + sentences[1].strip()
        if len(combined) <= max_len:
            if not combined.endswith('.'): combined += '.'
            return combined
            
    if not first_s.endswith('.'): first_s += '.'
    return first_s

# Test across topics
for slug in ['ai_agents_interview_bank', 'rag_interview_bank']:
    topic_dir = os.path.join(CHUNKS_DIR, slug)
    if not os.path.exists(topic_dir): continue
    chunk_files = sorted(f for f in os.listdir(topic_dir) if f.startswith('chunk_'))
    print(f"=== TOPIC: {slug} ===")
    with open(os.path.join(topic_dir, chunk_files[0]), 'r', encoding='utf-8') as f:
        data = json.load(f)
    for q in data['qaPairs'][:3]:
        print("QUESTION:", polish_question(q['question']))
        print("OPTION:  ", extract_clean_option(q['answer']))
        print()
