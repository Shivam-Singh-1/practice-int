"""
Document Text Extraction Script — Revised
Reads all .docx files from source/ and extracts Q&A pairs by detecting:
  - Heading 2 paragraphs as question markers (e.g., "01. What is an AI Agent...")
  - Normal paragraphs after the heading as the answer body
Outputs structured JSON chunks into extracted_chunks/ directory.
"""

import os
import json
import re
from docx import Document


SOURCE_DIR = os.path.join(os.path.dirname(__file__), '..', 'source')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'extracted_chunks')

# Files to skip (not actual Q&A topic banks)
SKIP_FILES = {
    'Interview_Question_Bank_Manifest.csv',
    'Interview_Question_Bank_Master_Index.docx',
}


def slugify(name: str) -> str:
    """Convert a filename into a URL-friendly slug."""
    slug = os.path.splitext(name)[0]
    slug = slug.replace(' ', '_')
    slug = re.sub(r'[^a-zA-Z0-9_]', '', slug)
    return slug.lower()


def extract_qa_pairs(filepath: str) -> list[dict]:
    """
    Extract question-answer pairs from a .docx file.
    
    Document structure detected:
      - Heading 2: Question text (e.g., "01. What is an AI Agent...")
      - Normal (bold): Source reference line (skipped from answer body)
      - Normal (non-bold): Answer content paragraphs
      - Next Heading 2: Marks the start of a new question
    
    Returns a list of dicts with 'question' and 'answer' keys.
    """
    doc = Document(filepath)
    qa_pairs = []
    current_question = None
    current_answer_lines = []
    past_toc = False

    # Pattern to strip leading numbering like "01. ", "1. ", "02. " etc.
    numbering_pattern = re.compile(r'^\d+\.\s*')

    def flush_qa():
        """Save the current Q&A pair if we have one."""
        nonlocal current_question, current_answer_lines
        if current_question is not None:
            # Clean up answer: remove trailing empty lines
            while current_answer_lines and not current_answer_lines[-1].strip():
                current_answer_lines.pop()
            
            answer_text = '\n'.join(current_answer_lines).strip()
            if answer_text:
                qa_pairs.append({
                    'question': current_question.strip(),
                    'answer': answer_text,
                })
            current_question = None
            current_answer_lines = []

    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        style_name = paragraph.style.name if paragraph.style else ''

        # Look for the "Questions & source answers" heading to mark end of TOC
        if not past_toc:
            if style_name == 'Heading 1' and 'source answers' in text.lower():
                past_toc = True
            continue

        if not text:
            # Preserve blank lines within answers for formatting
            if current_question is not None:
                current_answer_lines.append('')
            continue

        # Heading 2 = new question
        if style_name == 'Heading 2':
            flush_qa()
            # Strip leading numbering (e.g., "01. " -> "")
            question_text = numbering_pattern.sub('', text).strip()
            current_question = question_text if question_text else text
            continue

        # If we're inside a question's answer section
        if current_question is not None:
            # Check if this is a source reference line (bold, starts with "Answer from source" or "Source answer")
            has_bold = any(run.bold for run in paragraph.runs if run.text.strip())
            is_source_ref = has_bold and (
                text.lower().startswith('answer from source') or
                text.lower().startswith('source answer')
            )
            
            if is_source_ref:
                # Skip source reference lines — they are metadata, not content
                continue
            
            # Append to answer
            current_answer_lines.append(text)

    # Flush the last Q&A pair
    flush_qa()

    return qa_pairs


def chunk_qa_pairs(qa_pairs: list[dict], chunk_size: int = 6) -> list[list[dict]]:
    """Split Q&A pairs into chunks of chunk_size for manageable processing."""
    chunks = []
    for i in range(0, len(qa_pairs), chunk_size):
        chunks.append(qa_pairs[i:i + chunk_size])
    return chunks


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    source_path = os.path.abspath(SOURCE_DIR)
    print(f"Scanning source directory: {source_path}")

    docx_files = [
        f for f in os.listdir(source_path)
        if f.endswith('.docx') and f not in SKIP_FILES
    ]
    docx_files.sort()

    print(f"Found {len(docx_files)} topic files to process:\n")

    summary = []

    for filename in docx_files:
        filepath = os.path.join(source_path, filename)
        slug = slugify(filename)
        topic_name = os.path.splitext(filename)[0].replace('_', ' ')

        print(f"  Processing: {filename}")

        qa_pairs = extract_qa_pairs(filepath)
        print(f"    -> Extracted {len(qa_pairs)} Q&A pairs")

        if not qa_pairs:
            print(f"    -> WARNING: No Q&A pairs found. Skipping.")
            continue

        # Create topic output directory
        topic_dir = os.path.join(OUTPUT_DIR, slug)
        os.makedirs(topic_dir, exist_ok=True)

        # Split into chunks and save
        chunks = chunk_qa_pairs(qa_pairs, chunk_size=6)
        print(f"    -> Split into {len(chunks)} chunks")

        for chunk_idx, chunk in enumerate(chunks):
            chunk_file = os.path.join(topic_dir, f"chunk_{chunk_idx + 1:02d}.json")
            chunk_data = {
                'topicSlug': slug,
                'topicName': topic_name,
                'sourceFile': filename,
                'chunkIndex': chunk_idx + 1,
                'totalChunks': len(chunks),
                'qaPairs': chunk,
            }
            with open(chunk_file, 'w', encoding='utf-8') as f:
                json.dump(chunk_data, f, ensure_ascii=False, indent=2)

        summary.append({
            'filename': filename,
            'slug': slug,
            'topicName': topic_name,
            'totalQAPairs': len(qa_pairs),
            'totalChunks': len(chunks),
        })

    # Save extraction summary
    summary_file = os.path.join(OUTPUT_DIR, '_extraction_summary.json')
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    print(f"\n{'=' * 60}")
    print("EXTRACTION COMPLETE")
    print(f"{'=' * 60}")
    for item in summary:
        print(f"  {item['topicName']}: {item['totalQAPairs']} Q&As -> {item['totalChunks']} chunks")
    print(f"\nTotal topics: {len(summary)}")
    total_qs = sum(item['totalQAPairs'] for item in summary)
    print(f"Total Q&A pairs extracted: {total_qs}")
    print(f"Output directory: {os.path.abspath(OUTPUT_DIR)}")


if __name__ == '__main__':
    main()
