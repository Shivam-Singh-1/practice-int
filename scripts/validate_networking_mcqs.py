import os
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r'c:\Users\ss671\OneDrive\Desktop\mcq app'
TOPICS_DIR = os.path.join(BASE_DIR, 'src', 'data', 'topics')

topic_files = [
    'networking_fundamentals.js',
    'networking_devices.js',
    'ip_addressing_subnetting.js',
    'tcp_udp_services.js',
    'switching_layer2.js',
    'routing_ospf_bgp.js',
    'linux_networking.js',
    'network_troubleshooting.js',
]

def validate_all():
    all_ids = set()
    total_q_count = 0
    errors = []

    print("=" * 60)
    print("VALIDATING NETWORKING MCQ QUESTION BANK")
    print("=" * 60)

    for tf in topic_files:
        path = os.path.join(TOPICS_DIR, tf)
        if not os.path.exists(path):
            errors.append(f"Missing file: {tf}")
            continue

        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract JS object using regex or node/python
        # Check topicId
        tid_m = re.search(r'topicId:\s*["\']([^"\']+)["\']', content)
        tname_m = re.search(r'topicName:\s*["\']([^"\']+)["\']', content)
        
        if not tid_m or not tname_m:
            errors.append(f"{tf}: Missing topicId or topicName")
            continue
            
        tid = tid_m.group(1)
        tname = tname_m.group(1)

        # Count questions
        q_ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
        q_difficulties = re.findall(r'difficulty:\s*["\']([^"\']+)["\']', content)
        q_correct_indices = re.findall(r'correctIndex:\s*(\d+)', content)
        
        # Check counts match
        count = len(q_ids)
        total_q_count += count
        
        if len(q_difficulties) != count:
            errors.append(f"{tf}: Question count ({count}) != difficulty count ({len(q_difficulties)})")
        if len(q_correct_indices) != count:
            errors.append(f"{tf}: Question count ({count}) != correctIndex count ({len(q_correct_indices)})")

        for idx_str in q_correct_indices:
            idx = int(idx_str)
            if idx not in (0, 1, 2, 3):
                errors.append(f"{tf}: Invalid correctIndex {idx}")

        for qid in q_ids:
            if qid in all_ids:
                errors.append(f"Duplicate question ID: {qid}")
            all_ids.add(qid)

        print(f"✓ {tname:38} | ID: {tid:24} | {count:3} questions")

    print("-" * 60)
    print(f"Total Questions Verified: {total_q_count}")
    print(f"Total Unique IDs:        {len(all_ids)}")

    if errors:
        print("\nERRORS ENCOUNTERED:")
        for err in errors:
            print(f"  ✗ {err}")
        return False
    else:
        print("\nALL TOPIC DATA VALIDATED SUCCESSFULLY! ZERO ERRORS.")
        return True

if __name__ == '__main__':
    validate_all()
