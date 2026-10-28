"""
Deeper inspection - look at all paragraph styles and patterns beyond the TOC.
"""

import os
from docx import Document

SOURCE_DIR = os.path.join(os.path.dirname(__file__), '..', 'source')

def inspect_all_styles(filepath):
    """Print every paragraph with its style, looking for Q&A body content."""
    doc = Document(filepath)
    print(f"\n{'='*80}")
    print(f"FILE: {os.path.basename(filepath)}")
    print(f"Total paragraphs: {len(doc.paragraphs)}")
    print(f"{'='*80}")
    
    # Collect all unique styles
    styles = {}
    for para in doc.paragraphs:
        style = para.style.name if para.style else "None"
        styles[style] = styles.get(style, 0) + 1
    
    print("\nSTYLE DISTRIBUTION:")
    for style, count in sorted(styles.items(), key=lambda x: -x[1]):
        print(f"  {style}: {count}")
    
    # Print paragraphs from index 60 onward (past TOC)
    print(f"\n--- PARAGRAPHS AFTER TOC (60+) ---")
    for i, para in enumerate(doc.paragraphs[55:120], start=55):
        text = para.text.strip()
        if not text:
            continue
        style = para.style.name if para.style else "None"
        has_bold = any(run.bold for run in para.runs if run.text.strip())
        display_text = text[:200] + ('...' if len(text) > 200 else '')
        print(f"\n  [P{i}] Style='{style}' Bold={has_bold}")
        print(f"       {display_text}")

if __name__ == '__main__':
    source_path = os.path.abspath(SOURCE_DIR)
    filepath = os.path.join(source_path, 'AI_Agents_Interview_Bank.docx')
    inspect_all_styles(filepath)
