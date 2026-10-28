"""
Bundle all HTML, CSS, topic data, and JavaScript into a single standalone website.html file.
"""
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEV_INDEX = os.path.join(BASE_DIR, 'index.dev.html')
INDEX_HTML = DEV_INDEX if os.path.exists(DEV_INDEX) else os.path.join(BASE_DIR, 'index.html')
STYLES_CSS = os.path.join(BASE_DIR, 'styles.css')
APP_JS = os.path.join(BASE_DIR, 'app.js')
TOPICS_DIR = os.path.join(BASE_DIR, 'src', 'data', 'topics')
QUESTIONS_DATA_JS = os.path.join(BASE_DIR, 'src', 'data', 'questionsData.js')
OUTPUT_HTML = os.path.join(BASE_DIR, 'website.html')
OUTPUT_INDEX = os.path.join(BASE_DIR, 'index.html')

TOPIC_FILES = [
    'networking_fundamentals.js',
    'networking_devices.js',
    'ip_addressing_subnetting.js',
    'tcp_udp_services.js',
    'switching_layer2.js',
    'routing_ospf_bgp.js',
    'linux_networking.js',
    'network_troubleshooting.js',
]

def bundle():
    print("Bundling everything into a single standalone website.html...")

    # 1. Read CSS
    with open(STYLES_CSS, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # 2. Read Topic Data JS
    topic_data_parts = []
    for tf in TOPIC_FILES:
        tf_path = os.path.join(TOPICS_DIR, tf)
        if not os.path.exists(tf_path):
            print(f"Error: missing topic file {tf_path}", file=sys.stderr)
            sys.exit(1)
        with open(tf_path, 'r', encoding='utf-8') as f:
            topic_data_parts.append(f.read())

    # 3. Read index loader (questionsData.js)
    with open(QUESTIONS_DATA_JS, 'r', encoding='utf-8') as f:
        index_data_content = f.read()

    # 4. Read Application JS
    with open(APP_JS, 'r', encoding='utf-8') as f:
        app_js_content = f.read()

    # Combine all JS
    combined_js = "\n\n".join([
        "/* ========================================================================= */",
        "/* TOPIC DATA OBJECTS (252 QUESTIONS ACROSS 8 NETWORKING TOPICS)             */",
        "/* ========================================================================= */",
        *topic_data_parts,
        "/* ========================================================================= */",
        "/* DATA INDEX LOADER                                                         */",
        "/* ========================================================================= */",
        index_data_content,
        "/* ========================================================================= */",
        "/* APPLICATION LOGIC                                                         */",
        "/* ========================================================================= */",
        app_js_content,
    ])

    # 5. Read index.html shell
    with open(INDEX_HTML, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Replace <link rel="stylesheet" href="styles.css" /> with <style>...</style>
    style_tag = f"<style>\n{css_content}\n  </style>"
    html_content = html_content.replace(
        '<link rel="stylesheet" href="styles.css" />',
        style_tag
    )

    # Replace all script tags from topic scripts to app.js
    script_block_start = '  <!-- Load all topic data files -->'
    script_block_end = '  <script src="app.js"></script>'

    if script_block_start in html_content and script_block_end in html_content:
        start_idx = html_content.find(script_block_start)
        end_idx = html_content.find(script_block_end) + len(script_block_end)
        
        replacement = f"  <script>\n{combined_js}\n  </script>"
        html_content = html_content[:start_idx] + replacement + html_content[end_idx:]
    else:
        print("Warning: could not match standard script block markers, appending script tag.", file=sys.stderr)
        html_content = html_content.replace('</body>', f"  <script>\n{combined_js}\n  </script>\n</body>")

    # 6. Write to website.html and index.html
    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html_content)
    with open(OUTPUT_INDEX, 'w', encoding='utf-8') as f:
        f.write(html_content)

    file_size_kb = os.path.getsize(OUTPUT_INDEX) / 1024
    print(f"SUCCESS: Created standalone single-file website at: {OUTPUT_INDEX} and {OUTPUT_HTML}")
    print(f"File size: {file_size_kb:.1f} KB")

if __name__ == '__main__':
    bundle()
