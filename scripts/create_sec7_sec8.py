# scripts/create_sec7_sec8.py
import json
import os
import random

random.seed(42)

# Load parsed raw questions from scratch
with open(r'C:\Users\ss671\.gemini\antigravity-ide\brain\2ec24fb6-391a-4a99-8a37-485cf17d5327\scratch\sec7_parsed.json', 'r', encoding='utf-8') as f:
    sec7_raw = {q['num']: q for q in json.load(f) if q['num'] >= 221}

with open(r'C:\Users\ss671\.gemini\antigravity-ide\brain\2ec24fb6-391a-4a99-8a37-485cf17d5327\scratch\sec8_parsed.json', 'r', encoding='utf-8') as f:
    sec8_raw = {q['num']: q for q in json.load(f) if q['num'] >= 279}

# Define Q&A data for Section 7: Linux Networking & System Admin (221 - 278)
sec7_curated = [
    {
        "num": 221,
        "difficulty": "Easy",
        "mcqQuestion": "What is Linux, and why is it commonly used on network servers?",
        "correct": "Linux is an open-source operating system with a mature networking stack, robust CLI utilities, modular kernel configuration, and broad hardware/container ecosystem support.",
        "distractors": [
            "Linux is a proprietary network operating system designed exclusively for optical backbone core routers.",
            "Linux is a specialized bare-metal microkernel that executes network device drivers in user space without kernel privileges.",
            "Linux is a desktop-only operating system that requires third-party commercial emulators to host TCP/IP daemons."
        ],
        "explanation": "Linux is open-source with a battle-tested networking stack, modular socket interfaces, namespaces, and deep automation support, making it the industry standard for production servers, routers, and network appliances."
    },
    {
        "num": 222,
        "difficulty": "Medium",
        "mcqQuestion": "What is the primary difference between a process and a thread in Linux?",
        "correct": "A process has its own isolated virtual address space and file descriptors, whereas threads within a process share memory and resources while executing independently.",
        "distractors": [
            "A process shares virtual memory with all other processes, while threads maintain completely isolated physical RAM partitions.",
            "Threads run exclusively in kernel mode, while parent processes run exclusively in user mode.",
            "A process can only execute on a single CPU core, while a thread automatically distributes across network clusters."
        ],
        "explanation": "Processes own their memory spaces, file descriptor tables, and environment variables. Threads share their parent process's memory space and heap, making them lighter weight but requiring mutexes/locks for state synchronization."
    },
    {
        "num": 223,
        "difficulty": "Medium",
        "mcqQuestion": "What is the difference between user mode (Ring 3) and kernel mode (Ring 0)?",
        "correct": "User mode restricts programs from directly accessing hardware and kernel memory; kernel mode runs core OS code with unconstrained hardware execution privileges.",
        "distractors": [
            "User mode executes directly on bare-metal CPU microcode, while kernel mode runs inside a virtualized bytecode sandbox.",
            "User mode is reserved for network socket transmission, while kernel mode handles file writing only.",
            "User mode and kernel mode have identical hardware privileges but execute at different clock frequencies."
        ],
        "explanation": "User mode prevents rogue or faulty user applications from crashing the system by blocking direct hardware access. Privileged operations must be mediated by the kernel via system calls."
    },
    {
        "num": 224,
        "difficulty": "Easy",
        "mcqQuestion": "What is a system call (syscall) in Linux?",
        "correct": "A controlled programmatic interface that allows user-space applications to request privileged kernel services like socket creation, I/O, and memory allocation.",
        "distractors": [
            "A shell script alias that executes external command-line binaries with sudo permissions.",
            "A hardware interrupt triggered exclusively by incoming physical Ethernet frame preambles.",
            "An asynchronous remote procedure call (RPC) exchanged between two distributed Linux nodes."
        ],
        "explanation": "System calls (e.g. socket(), read(), write(), clone()) provide the safe boundary transition between user-space code and privileged kernel-space operations."
    },
    {
        "num": 225,
        "difficulty": "Easy",
        "mcqQuestion": "Which commands are standard for viewing currently running processes in Linux?",
        "correct": "ps aux or ps -ef for a point-in-time snapshot, and top or htop for an interactive, live-updating view.",
        "distractors": [
            "ip route show and ip link show dev eth0.",
            "cat /etc/services and getent hosts.",
            "netstat -rn and ethtool -S."
        ],
        "explanation": "`ps` provides snapshot tabular listings with custom columns, while `top` and `htop` provide real-time CPU, memory, thread, and process activity monitoring."
    },
    {
        "num": 226,
        "difficulty": "Easy",
        "mcqQuestion": "Which utilities and interfaces are used to check CPU and memory utilization on a Linux server?",
        "correct": "top, htop, free -h, vmstat, and virtual filesystem counters in /proc/meminfo and /proc/cpuinfo.",
        "distractors": [
            "ethtool, traceroute, and /etc/resolv.conf.",
            "iptables -L, dig +trace, and journalctl -u dhcpd.",
            "route -n, arp -a, and /etc/hosts."
        ],
        "explanation": "`free -h` displays RAM and swap breakdown, `vmstat` reports virtual memory and context switches, and `top`/`htop` highlight per-process consumption."
    },
    {
        "num": 227,
        "difficulty": "Easy",
        "mcqQuestion": "What is the key functional difference between ps, top, and htop?",
        "correct": "ps provides a static snapshot of process states, top refreshes statistics dynamically in terminal, and htop adds an enhanced colorized, scrollable interactive UI.",
        "distractors": [
            "ps is used to monitor disk I/O, top monitors network sockets, and htop monitors GPU vRAM.",
            "ps requires root privileges to execute, while top and htop can only be run by unprivileged users.",
            "top terminates unresponsive processes automatically, while ps and htop only inspect memory leaks."
        ],
        "explanation": "Use `ps` when scripting, grepping, or inspecting specific process attributes once. Use `top`/`htop` when actively diagnosing fluctuating CPU/RAM spikes."
    },
    {
        "num": 228,
        "difficulty": "Medium",
        "mcqQuestion": "What are the respective primary purposes of grep, awk, sed, and cut in command-line log analysis?",
        "correct": "grep filters lines matching a pattern; awk processes column/field records; sed performs stream text transformation; cut extracts fixed delimited fields.",
        "distractors": [
            "grep compiles kernel modules; awk mounts filesystems; sed monitors sockets; cut divides network subnets.",
            "grep inspects packet headers; awk handles routing tables; sed configures DNS; cut terminates zombie processes.",
            "grep, awk, sed, and cut are deprecated aliases for modern iproute2 subcommands."
        ],
        "explanation": "These four Unix text manipulation tools are the cornerstone of shell pipelines for parsing system logs, configuration files, and network telemetry."
    },
    {
        "num": 229,
        "difficulty": "Medium",
        "mcqQuestion": "How do standard Linux file and directory permissions work?",
        "correct": "Permissions are defined for Owner, Group, and Others with Read (r=4), Write (w=2), and Execute (x=1) bits; on directories, execute (x) controls traversal.",
        "distractors": [
            "Permissions are assigned strictly by process PID and cannot be modified by the superuser.",
            "Read permission on a directory allows entering it; execute permission allows listing its file names.",
            "Write permission without read permission allows users to copy entire files to remote hosts."
        ],
        "explanation": "Permissions use 3 octal digits (e.g. 755: rwx for owner, rx for group/others). Note: directory 'x' (execute) permission is required to enter (`cd`) and traverse the directory."
    },
    {
        "num": 230,
        "difficulty": "Easy",
        "mcqQuestion": "What is the key security difference between using sudo and directly logging in as root?",
        "correct": "sudo grants granular, audited administrative privileges on a per-command basis, whereas a root login grants unrestricted session-wide privileges with greater blast radius.",
        "distractors": [
            "sudo bypasses all kernel security policies, while root login enforces SELinux and AppArmor.",
            "sudo operates in user space, while logging in as root converts the entire terminal into a hardware kernel ring.",
            "sudo cannot execute network configuration commands, while root can only execute shell scripts."
        ],
        "explanation": "`sudo` logs executed commands to secure audit logs (`/var/log/auth.log` or `secure`), supports the principle of least privilege, and prevents accidental system-wide damage."
    },
    {
        "num": 231,
        "difficulty": "Easy",
        "mcqQuestion": "Which systemctl commands are used to restart and check the runtime status of a service (e.g., networking)?",
        "correct": "sudo systemctl restart <service> to restart it, and systemctl status <service> to inspect runtime state, PID, and recent logs.",
        "distractors": [
            "service --reboot <service> and ps status <service>.",
            "ip link restart <service> and journalctl --kill <service>.",
            "chkconfig --restart <service> and top -u <service>."
        ],
        "explanation": "Modern Linux distributions use systemd. `systemctl status <service>` displays whether a service is active/running, failed, or inactive, alongside recent journal entries."
    },
    {
        "num": 232,
        "difficulty": "Easy",
        "mcqQuestion": "Where are system and authentication logs typically stored on Linux?",
        "correct": "Under /var/log/ (such as /var/log/syslog, /var/log/messages, and /var/log/auth.log / secure) or queried via journalctl.",
        "distractors": [
            "Under /etc/systemd/logs/ and /sys/kernel/debug/auth.",
            "Under /proc/klog and /dev/log_history.",
            "Under /home/root/logs/ and /usr/share/audit/."
        ],
        "explanation": "Standard log files reside in `/var/log/`. On systemd-journald systems, `journalctl -u <unit> -xe` provides unified, structured log querying."
    },
    {
        "num": 233,
        "difficulty": "Medium",
        "mcqQuestion": "What is the difference between a hard link and a soft (symbolic) link?",
        "correct": "A hard link shares the exact same underlying inode and data blocks as the original file; a soft link is a separate file containing a path reference to the target.",
        "distractors": [
            "A hard link can span across different filesystem partitions, whereas a symbolic link is strictly restricted to one volume.",
            "Deleting the original target file breaks all hard links, while soft links remain fully readable.",
            "Hard links can link directly to directories across network shares, whereas soft links only point to hardware devices."
        ],
        "explanation": "Hard links point directly to the same inode number (cannot cross filesystems or link directories). Soft links (`ln -s`) contain a text path; if the target is deleted, a soft link becomes orphaned/broken."
    },
    {
        "num": 234,
        "difficulty": "Easy",
        "mcqQuestion": "What does the command chmod +x script.sh accomplish?",
        "correct": "It adds execute permissions for the owner, group, and others, allowing the script to be run directly as an executable.",
        "distractors": [
            "It moves the script to /usr/local/bin and executes it as a background daemon.",
            "It signs the script with a cryptographically verified GPG kernel execution certificate.",
            "It encrypts the script contents with XOR obfuscation to prevent unauthorized reading."
        ],
        "explanation": "`chmod +x` enables the execute bit (+x). Combined with a valid shebang (e.g. `#!/bin/bash`), it enables the kernel execve() syscall to run the script directly."
    },
    {
        "num": 235,
        "difficulty": "Medium",
        "mcqQuestion": "How do you check available disk space and filesystem inode utilization in Linux?",
        "correct": "Run df -h to check disk block space, and df -i to inspect available inode count.",
        "distractors": [
            "Run fdisk -l for inode count and ls -lh for total disk block allocation.",
            "Run du -sh for inode capacity and ethtool -i for block usage.",
            "Run free -m for disk storage and vmstat -d for inode exhaustion."
        ],
        "explanation": "A filesystem can run out of space either by consuming all data blocks (`df -h`) or by exhausting all available inodes (`df -i`) through millions of tiny files."
    },
    {
        "num": 236,
        "difficulty": "Medium",
        "mcqQuestion": "What is a zombie process in Linux, and how does it occur?",
        "correct": "A process that has completed execution but remains in the process table because its parent has not yet read its exit status with wait().",
        "distractors": [
            "A malicious background daemon that hijacks TCP port 80 to launch distributed denial-of-service attacks.",
            "A process that has been paused with SIGSTOP and consumes 100% CPU cycles in a tight loop.",
            "A kernel thread that has crashed due to hardware RAM bit flips and cannot be restarted."
        ],
        "explanation": "Zombie processes (state 'Z' in ps) consume zero CPU and memory, but hold an entry in the PID process table. If the parent dies without wait(), init (PID 1) adopts and reaps them."
    },
    {
        "num": 237,
        "difficulty": "Medium",
        "mcqQuestion": "What is an orphan process in Linux?",
        "correct": "A running process whose parent process terminated before it; it is automatically adopted by PID 1 (init / systemd), which handles reaping when it exits.",
        "distractors": [
            "A process that has disconnected from all network interfaces and cannot communicate with remote hosts.",
            "A process that was executed without executable file permissions.",
            "A thread whose memory space was swapped out to physical NVMe swap partitions."
        ],
        "explanation": "When a parent process exits before its child, the child becomes an orphan. Linux kernel reparents it to PID 1 (systemd/init), which reaps it cleanly upon termination."
    },
    {
        "num": 238,
        "difficulty": "Easy",
        "mcqQuestion": "What is the purpose of the ip command, and what deprecated suite did it replace?",
        "correct": "The ip command from iproute2 manages interfaces, addresses, routing tables, and neighbors; it replaced deprecated net-tools (ifconfig, route, arp).",
        "distractors": [
            "The ip command configures DNS resolution records; it replaced the dig and nslookup utilities.",
            "The ip command manages systemd services; it replaced the service and chkconfig tools.",
            "The ip command manages firewall packet filters; it replaced iptables and nftables."
        ],
        "explanation": "`ip` leverages the modern Netlink kernel API. It consolidates `ifconfig` (ip link/addr), `route` (ip route), and `arp` (ip neigh) into a unified, powerful command suite."
    },
    {
        "num": 239,
        "difficulty": "Easy",
        "mcqQuestion": "Why is the ip command preferred over ifconfig on modern Linux servers?",
        "correct": "ip supports modern kernel networking features (multiple routing tables, policy routing, Netlink API, CIDR, VLANs, namespaces), whereas ifconfig is obsolete and unmaintained.",
        "distractors": [
            "ifconfig can only manage IPv6 addresses, whereas ip only manages IPv4 addresses.",
            "ifconfig runs in user space, while ip compiles directly into CPU microcode.",
            "ip is a graphical utility, whereas ifconfig is strictly terminal-based."
        ],
        "explanation": "`net-tools` (ifconfig) was frozen decades ago and does not support modern Linux features like policy routing rules (`ip rule`), multiple routing tables, or network namespaces."
    },
    {
        "num": 240,
        "difficulty": "Medium",
        "mcqQuestion": "What does ping test, and what does it NOT test?",
        "correct": "ping tests basic Layer 3 IP reachability and RTT using ICMP Echo; it does NOT test Layer 4 TCP/UDP ports, firewall state, or application-layer daemon health.",
        "distractors": [
            "ping verifies that the web server application is returning HTTP 200 OK responses.",
            "ping tests physical optical cable attenuation, but cannot detect IP subnet mismatches.",
            "ping verifies end-to-end TLS certificate expiration and cipher suite compatibility."
        ],
        "explanation": "An interview classic: A successful `ping` proves only that an ICMP path is open. It does NOT prove that TCP port 443 is listening, that the database is healthy, or that HTTP works."
    },
    {
        "num": 241,
        "difficulty": "Medium",
        "mcqQuestion": "What is the core difference between ping and traceroute?",
        "correct": "ping measures end-to-end reachability and round-trip latency to a single target; traceroute maps each intermediate Layer 3 hop along the path.",
        "distractors": [
            "ping tests Layer 2 Ethernet switches, while traceroute tests Layer 1 fiber splices.",
            "ping modifies routing tables on intermediate hops, while traceroute is strictly passive.",
            "ping requires root privileges on all traversed routers, while traceroute runs client-side only."
        ],
        "explanation": "`ping` provides a yes/no reachability and RTT metric. `traceroute` identifies the individual router hops traversed to pinpoint where latency or packet drops begin."
    },
    {
        "num": 242,
        "difficulty": "Medium",
        "mcqQuestion": "How does traceroute discover intermediate router hops along a network path?",
        "correct": "It sends probe packets with incrementally increasing IP TTL values (TTL=1, 2, 3...); each router drops the expired packet and responds with an ICMP Time Exceeded message.",
        "distractors": [
            "It queries the global BGP database via SNMP to download the exact live path topology.",
            "It attaches an unencrypted GPS telemetry coordinate to the Layer 2 Ethernet trailer.",
            "It sends high-priority OSPF LSA announcements that force intermediate routers to reply with their MAC addresses."
        ],
        "explanation": "When an IP packet's TTL decrements to 0, RFC 792 mandates that the router discard it and return an ICMP Type 11 (Time Exceeded) packet, revealing its IP address to traceroute."
    },
    {
        "num": 243,
        "difficulty": "Medium",
        "mcqQuestion": "Why might traceroute display asterisks (* * *) for certain intermediate hops while traffic still flows successfully?",
        "correct": "The intermediate router or firewall is configured to discard probes or rate-limit ICMP Time Exceeded generation, even though it forwards regular transit traffic normally.",
        "distractors": [
            "An asterisk indicates the router has completely crashed and all traffic is being dropped permanently.",
            "The router's routing table has exceeded 1,000,000 BGP routes and entered read-only mode.",
            "Asterisks signify that traceroute has switched from IPv4 addressing to IPv6 addressing."
        ],
        "explanation": "Routers deprioritize generating ICMP replies on their control plane to protect CPU resources. Asterisks at one hop do not indicate a failure if subsequent hops reply successfully."
    },
    {
        "num": 244,
        "difficulty": "Easy",
        "mcqQuestion": "What is the difference between netstat and ss in Linux socket monitoring?",
        "correct": "netstat parses slow /proc/net text files and is deprecated; ss interfaces directly with kernel Netlink socket infrastructure, making it vastly faster and more detailed.",
        "distractors": [
            "netstat is used only for UDP sockets, while ss is used strictly for SSH protocol connections.",
            "netstat inspects physical NIC transceivers, while ss monitors systemd service timers.",
            "netstat runs inside containers, while ss can only run on physical bare-metal hardware."
        ],
        "explanation": "On servers with tens of thousands of concurrent sockets, `netstat` can stall the kernel while reading `/proc/net/tcp`. `ss` uses Netlink to dump socket information in milliseconds."
    },
    {
        "num": 245,
        "difficulty": "Easy",
        "mcqQuestion": "Which commands show which process (and PID) is listening on a specific TCP port in Linux?",
        "correct": "sudo ss -ltnp or sudo lsof -iTCP:<port> -sTCP:LISTEN.",
        "distractors": [
            "ping -p <port> or ifconfig eth0 port <port>.",
            "ip route get <port> or dig @localhost -p <port>.",
            "traceroute -p <port> or ethtool -p <port>."
        ],
        "explanation": "In `ss -ltnp`: `-l` lists listening sockets, `-t` filters TCP, `-n` prevents DNS resolution (faster), and `-p` shows the process name and PID (requires sudo)."
    },
    {
        "num": 246,
        "difficulty": "Easy",
        "mcqQuestion": "How do you view all active ESTABLISHED TCP connections using ss?",
        "correct": "ss -tan state established (or ss -tan | grep ESTAB).",
        "distractors": [
            "ss -lup state listening.",
            "ip link show state active.",
            "iptables -t nat -L established."
        ],
        "explanation": "The command `ss -tan state established` queries the kernel directly for active connections in the ESTABLISHED state, displaying foreign IP/port and local IP/port."
    },
    {
        "num": 247,
        "difficulty": "Easy",
        "mcqQuestion": "What does tcpdump do on a Linux system?",
        "correct": "It captures, filters, and analyzes live raw network packets passing through a network interface in real time or writes them to a pcap file.",
        "distractors": [
            "It forcefully closes hanging TCP sockets to free up ephemeral ports.",
            "It configures static IP routes and default gateways in /etc/network/interfaces.",
            "It simulates denial-of-service traffic loads to benchmark web server performance."
        ],
        "explanation": "`tcpdump` is the premier CLI packet analysis tool. It uses libpcap and BPF (Berkeley Packet Filters) to capture and inspect Layer 2-4 headers and payloads."
    },
    {
        "num": 248,
        "difficulty": "Easy",
        "mcqQuestion": "Which tcpdump command captures traffic to or from IP address 10.0.0.5 on all interfaces without resolving hostnames?",
        "correct": "sudo tcpdump -ni any host 10.0.0.5",
        "distractors": [
            "sudo tcpdump -p 10.0.0.5 --all-ports",
            "sudo tcpdump -i eth0 route to 10.0.0.5",
            "sudo tcpdump -d 10.0.0.5 -s 0"
        ],
        "explanation": "`-n` avoids DNS lookups (crucial for performance), `-i any` listens on all active interfaces, and `host 10.0.0.5` matches both source and destination IP addresses."
    },
    {
        "num": 249,
        "difficulty": "Easy",
        "mcqQuestion": "Which tcpdump syntax captures HTTPS traffic (TCP port 443) on interface eth0?",
        "correct": "sudo tcpdump -ni eth0 tcp port 443",
        "distractors": [
            "sudo tcpdump -e eth0 ssl --decrypt",
            "sudo tcpdump -x eth0 udp port 443",
            "sudo tcpdump -i eth0 --filter https-only"
        ],
        "explanation": "`tcp port 443` is a BPF expression matching packets where the protocol is TCP and either the source or destination port equals 443."
    },
    {
        "num": 250,
        "difficulty": "Medium",
        "mcqQuestion": "How can you determine exactly which route, interface, and source IP Linux will use to reach destination 8.8.8.8?",
        "correct": "Run ip route get 8.8.8.8",
        "distractors": [
            "Run ping -c 1 8.8.8.8 | grep interface",
            "Run arp -a 8.8.8.8",
            "Run cat /etc/resolv.conf | grep 8.8.8.8"
        ],
        "explanation": "`ip route get <IP>` performs a live FIB (Forwarding Information Base) lookup, returning the exact outgoing interface, selected source IP (`src`), next-hop gateway, and MTU."
    },
    {
        "num": 251,
        "difficulty": "Medium",
        "mcqQuestion": "What is the ARP / neighbor table in Linux, and how do you view it using modern iproute2?",
        "correct": "It caches mappings between IPv4 addresses and Layer 2 MAC addresses for local subnet delivery; view it using ip neigh show.",
        "distractors": [
            "It stores DNS name-to-IP mappings; view it using ip dns show.",
            "It lists all logged-in SSH users; view it using ip auth show.",
            "It stores BGP peer advertisements; view it using ip bgp neighbors."
        ],
        "explanation": "`ip neigh show` displays neighbor IP addresses, device interfaces, MAC addresses, and states (REACHABLE, STALE, DELAY, INCOMPLETE, FAILED)."
    },
    {
        "num": 252,
        "difficulty": "Easy",
        "mcqQuestion": "How do you query a specific DNS resolver (e.g. 1.1.1.1) for the A record of example.com using dig?",
        "correct": "dig @1.1.1.1 example.com A",
        "distractors": [
            "dig --resolver 1.1.1.1 --query example.com",
            "nslookup -dns=1.1.1.1:example.com",
            "getent hosts example.com --server 1.1.1.1"
        ],
        "explanation": "In `dig`, the `@server` argument explicitly targets a specific DNS server, bypassing local caching daemons or `/etc/resolv.conf`."
    },
    {
        "num": 253,
        "difficulty": "Medium",
        "mcqQuestion": "What is the key difference between dig, nslookup, and getent hosts?",
        "correct": "dig and nslookup perform direct DNS protocol queries to nameservers; getent hosts tests system-wide NSS resolver behavior (consulting /etc/hosts, systemd-resolved, and DNS).",
        "distractors": [
            "dig tests HTTP proxies, nslookup tests DHCP servers, and getent hosts tests NTP clocks.",
            "dig is a Windows-only utility, while getent hosts is only available on BSD Unix.",
            "dig modifies the kernel DNS cache, while getent hosts inspects hardware MAC addresses."
        ],
        "explanation": "An essential troubleshooting distinction: An application resolving a hostname uses glibc NSS (`getent hosts`), which obeys `/etc/nsswitch.conf` and `/etc/hosts` first, whereas `dig` queries DNS directly."
    },
    {
        "num": 254,
        "difficulty": "Easy",
        "mcqQuestion": "What is the purpose of the /etc/hosts file in Linux?",
        "correct": "It provides a local static mapping of IP addresses to hostnames that takes precedence over DNS lookups by default in /etc/nsswitch.conf.",
        "distractors": [
            "It stores the public cryptographic host keys for incoming SSH connections.",
            "It configures static IP addresses and subnet masks for physical NIC interfaces.",
            "It lists all authorized network administrator usernames allowed to log in via PAM."
        ],
        "explanation": "Before DNS queries are dispatched, the system resolver typically checks `/etc/hosts` (due to `hosts: files dns` in nsswitch.conf). It is ideal for local overrides and test environments."
    },
    {
        "num": 255,
        "difficulty": "Easy",
        "mcqQuestion": "What is the primary role of the /etc/resolv.conf file?",
        "correct": "It specifies the IP addresses of DNS nameservers and local domain search paths used by the system resolver.",
        "distractors": [
            "It defines the default gateway IP address for static route failover.",
            "It sets the local server's fully qualified domain name (FQDN).",
            "It configures firewall port-forwarding rules for local daemon services."
        ],
        "explanation": "Entries such as `nameserver 8.8.8.8` and `search company.internal` define where glibc sends unresolved hostname queries. Note: it is frequently managed dynamically by systemd-resolved or NetworkManager."
    },
    {
        "num": 256,
        "difficulty": "Easy",
        "mcqQuestion": "What is the purpose of /etc/hostname in Linux?",
        "correct": "It stores the system's static configured hostname, which is set at boot time and displayed by the hostnamectl command.",
        "distractors": [
            "It lists all remote servers that are permitted to establish SSH sessions.",
            "It stores the hardware manufacturer's serial number and BIOS revision.",
            "It defines DNS alias CNAME records for the Apache HTTP server."
        ],
        "explanation": "`/etc/hostname` contains the system name. You can view or change it dynamically using `hostnamectl set-hostname <name>`."
    },
    {
        "num": 257,
        "difficulty": "Medium",
        "mcqQuestion": "Which commands check the physical link status, negotiated speed, and duplex of a Linux NIC?",
        "correct": "sudo ethtool eth0 (or ip link show eth0 to check carrier state and flags).",
        "distractors": [
            "ping -s 1500 eth0 and ss -tulpn.",
            "traceroute -i eth0 and cat /etc/resolv.conf.",
            "netstat -rn and dig @eth0."
        ],
        "explanation": "`ethtool <interface>` displays 'Speed: 10000Mb/s', 'Duplex: Full', 'Auto-negotiation: on', and 'Link detected: yes'."
    },
    {
        "num": 258,
        "difficulty": "Medium",
        "mcqQuestion": "What network diagnostics and configurations does ethtool perform?",
        "correct": "It queries and configures physical NIC parameters (speed, duplex, auto-negotiation), hardware offloads (TSO, GSO, checksum), driver versions, and low-level ring-buffer statistics.",
        "distractors": [
            "It configures BGP autonomous system numbers and OSPF neighbor dead intervals.",
            "It provisions IPv6 subnets and allocates DHCP address pools.",
            "It monitors user authentication attempts in /var/log/secure."
        ],
        "explanation": "`ethtool` is the standard tool for inspecting the Physical/Data Link layers of Ethernet hardware, offload engines, and transceiver optics."
    },
    {
        "num": 259,
        "difficulty": "Medium",
        "mcqQuestion": "What information does ip neigh provide, and why is it critical when troubleshooting local connectivity?",
        "correct": "It shows whether the host has resolved the MAC address of its default gateway or subnet peers; an INCOMPLETE or FAILED state proves Layer 2 ARP failure.",
        "distractors": [
            "It lists the geographic GPS coordinates of the neighboring cellular tower.",
            "It verifies that intermediate routers are not recalculating TCP window sizes.",
            "It tests whether remote SSH daemons have matching cryptographic host fingerprints."
        ],
        "explanation": "If `ip neigh` shows the default gateway in `INCOMPLETE` or `FAILED` state, outgoing IP packets cannot be encapsulated into Ethernet frames because ARP/ND resolution failed."
    },
    {
        "num": 260,
        "difficulty": "Medium",
        "mcqQuestion": "How do you inspect packet drops, framing errors, and overrun counters on Linux network interfaces?",
        "correct": "Run ip -s link show dev eth0 or sudo ethtool -S eth0.",
        "distractors": [
            "Run ping -v eth0 or cat /proc/partitions.",
            "Run ss -tan state drop or iptables -L -n -v.",
            "Run dig +stats eth0 or hostnamectl status."
        ],
        "explanation": "`ip -s link` displays RX/TX bytes, packets, errors, dropped, overrun, and carrier errors. `ethtool -S` displays granular hardware ASIC-level counters like CRC errors and ring-buffer exhaustions."
    },
    {
        "num": 261,
        "difficulty": "Hard",
        "mcqQuestion": "A Linux server can ping its local default gateway, but cannot reach external internet IP addresses. What should you investigate first?",
        "correct": "Verify the default route (0.0.0.0/0) in ip route, then check upstream gateway NAT configuration, firewall/ACL rules, and the return routing path.",
        "distractors": [
            "Replace the local motherboard network interface card immediately.",
            "Reboot the server into single-user mode to repair the root filesystem.",
            "Add static ARP entries for every external IP address on the internet into /etc/hosts."
        ],
        "explanation": "Pinging the gateway confirms Layer 1, 2, and local Layer 3 reachability. Failures beyond the gateway point to a missing/wrong default route, upstream router drop, lack of NAT (for private IPs), or return-path failure."
    },
    {
        "num": 262,
        "difficulty": "Medium",
        "mcqQuestion": "A server can ping 8.8.8.8 successfully but fails to connect to google.com. Which commands and files should you check?",
        "correct": "Check /etc/resolv.conf and /etc/nsswitch.conf, and test name resolution using dig, nslookup, or getent hosts.",
        "distractors": [
            "Check ethtool eth0 and replace the physical Ethernet patch cable.",
            "Check ip link set eth0 down and restart the kernel network subsystem.",
            "Check /etc/fstab and clean up inode usage with df -i."
        ],
        "explanation": "When IP ping succeeds but domain names fail, Layer 3 routing is functional but DNS resolution is broken. Inspect nameservers in `/etc/resolv.conf` and test direct resolution with `dig @nameserver google.com`."
    },
    {
        "num": 263,
        "difficulty": "Hard",
        "mcqQuestion": "A backend service is listening on port 8080, but remote clients cannot connect. What is the most common binding pitfall?",
        "correct": "The service is bound exclusively to the loopback interface (127.0.0.1:8080) instead of 0.0.0.0:8080 or the server's public IP address.",
        "distractors": [
            "The Linux kernel only supports TCP port numbers between 1 and 1024.",
            "The client is sending IPv4 frames while port 8080 is reserved strictly for UDP broadcast.",
            "The server has not installed the ethtool driver package."
        ],
        "explanation": "If `ss -ltnp` shows `127.0.0.1:8080`, the daemon will reject all packets arriving on physical interfaces. It must bind to `0.0.0.0:8080` (or `:::8080` for IPv6) to accept external connections."
    },
    {
        "num": 264,
        "difficulty": "Medium",
        "mcqQuestion": "A curl command to http://localhost:3000 works locally, but curl from an external machine times out. What are the two most probable root causes?",
        "correct": "The process is bound only to 127.0.0.1, or host/network firewall rules (nftables/iptables/cloud security groups) are dropping incoming traffic.",
        "distractors": [
            "The server's physical hard drive is full, preventing loopback socket creation.",
            "The external client forgot to configure its local /etc/hosts file with the server's MAC address.",
            "Linux servers cannot accept TCP connections from non-Linux client devices."
        ],
        "explanation": "Localhost success proves the service is running. External timeouts mean packets are either never arriving (host firewall, cloud security group, or routing) or the socket is not listening on external interfaces."
    },
    {
        "num": 265,
        "difficulty": "Hard",
        "mcqQuestion": "What does it mean when many TCP sockets on a Linux server are stuck in the CLOSE_WAIT state?",
        "correct": "The remote client sent a FIN and the local kernel acknowledged it, but the local application has failed to call close() on its socket descriptor.",
        "distractors": [
            "The network switch has dropped the TCP SYN-ACK packet during initial handshake.",
            "The remote client crashed and the server's physical NIC is waiting for optical re-synchronization.",
            "The kernel firewall is actively dropping incoming ICMP Echo Requests."
        ],
        "explanation": "`CLOSE_WAIT` is an application-level bug: The remote end closed the connection, but the local software (e.g. leaking connection pool) forgot to execute `close(sockfd)`."
    },
    {
        "num": 266,
        "difficulty": "Medium",
        "mcqQuestion": "Why might a high-traffic web server accumulate thousands of sockets in the TIME_WAIT state?",
        "correct": "The server initiated active connection termination (sending FIN first); TIME_WAIT (2MSL) is a normal TCP state designed to ensure delayed duplicate packets do not corrupt subsequent connections.",
        "distractors": [
            "TIME_WAIT indicates an active SYN flood denial-of-service attack that has crashed the kernel.",
            "TIME_WAIT means the server's routing table has run out of next-hop gateway entries.",
            "TIME_WAIT is an error state indicating that DNS queries have exceeded their TTL expiration."
        ],
        "explanation": "Whoever closes first enters `TIME_WAIT` for 2*MSL (typically 60 seconds). It is harmless unless local ephemeral port exhaustion occurs, which can be mitigated with HTTP keep-alive or connection reuse."
    },
    {
        "num": 267,
        "difficulty": "Hard",
        "mcqQuestion": "A Linux multi-homed server has two network interfaces (eth0 on 10.0.1.0/24 and eth1 on 10.0.2.0/24). How does the kernel decide which interface sends an outgoing packet?",
        "correct": "The kernel evaluates policy routing rules (ip rule) and the routing table (ip route), selecting the route with the longest prefix match and lowest metric.",
        "distractors": [
            "The kernel always alternates packets in round-robin fashion between eth0 and eth1.",
            "The kernel sends traffic out of whichever NIC has the lowest physical MAC address.",
            "The kernel transmits packets out of both interfaces simultaneously to ensure redundancy."
        ],
        "explanation": "Outbound egress decisions are made by FIB route lookup (`ip route get <dest>`), adhering to longest prefix match, metric, and any policy routing (`ip rule`) in place."
    },
    {
        "num": 268,
        "difficulty": "Medium",
        "mcqQuestion": "What happens if a Linux server's default gateway IP address is misconfigured to an unreachable host?",
        "correct": "Traffic to hosts on the local subnet continues to work normally, but all traffic to external remote subnets fails due to ARP/route failure.",
        "distractors": [
            "All network communication, including local subnet and loopback 127.0.0.1 traffic, immediately halts.",
            "The server automatically switches its network card from full-duplex to half-duplex mode.",
            "The Linux kernel panics and forces an automated server reboot."
        ],
        "explanation": "Local subnet traffic uses connected routes directly and resolves destination MACs via ARP without involving the gateway. Only off-subnet traffic requires the default gateway."
    },
    {
        "num": 269,
        "difficulty": "Medium",
        "mcqQuestion": "Why might ip link show display an interface with state UP while network communication still fails completely?",
        "correct": "Administrative UP only means the interface was enabled by the OS; physical carrier may be missing (NO-CARRIER), or VLAN tags, IP address, routing, or switch ports may be misconfigured.",
        "distractors": [
            "The interface state UP is only valid for wireless Wi-Fi cards and has no meaning for Ethernet.",
            "Administrative UP indicates that DNSSEC cryptographic keys have been revoked.",
            "The server's systemd journal has run out of disk space in /var/log/."
        ],
        "explanation": "An interface can be administratively UP while showing `<NO-CARRIER>` (unplugged cable), or be plugged in with carrier but lacking an IP address, wrong VLAN ID, or blocked by switchport port-security."
    },
    {
        "num": 270,
        "difficulty": "Medium",
        "mcqQuestion": "How can host firewall rules (iptables or nftables) disrupt network communication even when routing is 100% correct?",
        "correct": "Firewall chains (INPUT, OUTPUT, FORWARD) evaluate packet headers and can drop or reject packets based on interface, protocol, port, or connection tracking state (conntrack).",
        "distractors": [
            "Firewalls modify physical MAC addresses on the switch forwarding plane.",
            "Firewalls disable the CPU's memory management unit (MMU) when forwarding IP packets.",
            "Firewalls force all TCP connections to convert into unacknowledged UDP broadcasts."
        ],
        "explanation": "Even if `ip route` has the perfect path, if an iptables/nftables filter rule drops incoming SYN packets in the `INPUT` chain, connection establishment will silently fail."
    },
    {
        "num": 271,
        "difficulty": "Hard",
        "mcqQuestion": "If a Linux server's network interface accumulates a high rate of RX errors in ip -s link, what physical and link issues should be investigated?",
        "correct": "Check for bad physical cables, faulty transceivers/SFP modules, duplex/speed mismatches, dirty fiber connectors, or switch-port CRC errors.",
        "distractors": [
            "Check for missing DNS AAAA records in /etc/resolv.conf.",
            "Check for zombie processes in the system process table.",
            "Check for expired SSL/TLS certificates on the web server daemon."
        ],
        "explanation": "RX errors (CRC errors, frame alignment errors, runts) indicate signal corruption occurring at Layer 1 or Layer 2 between the switch port and the server's NIC."
    },
    {
        "num": 272,
        "difficulty": "Hard",
        "mcqQuestion": "What does a significant accumulation of RX dropped packets in ip -s link typically indicate on a busy server?",
        "correct": "The kernel or NIC ring buffers are overflowing because the system CPU cannot process incoming packets fast enough (softirq saturation or queue exhaustion).",
        "distractors": [
            "The router's BGP routing table has exceeded 65,535 routes.",
            "The client's web browser is rejecting gzip HTTP compression headers.",
            "The server's NTP clock has drifted by more than 1 millisecond."
        ],
        "explanation": "Dropped packets on receive (RX drops) without CRC errors usually mean software or ring-buffer starvation: the NIC received valid frames, but its DMA/kernel ring buffer ran out of descriptors."
    },
    {
        "num": 273,
        "difficulty": "Hard",
        "mcqQuestion": "What is policy routing (ip rule), and why is it used on multi-homed Linux systems?",
        "correct": "It allows routing decisions to be based on criteria other than destination IP (such as source IP address, incoming interface, or fwmark), directing traffic to custom routing tables.",
        "distractors": [
            "It automatically encrypts all outgoing HTTP packets with AES-256 GCM.",
            "It dynamically assigns DHCP addresses to external internet hosts.",
            "It restricts SSH logins to users who have sudo administrative privileges."
        ],
        "explanation": "Standard routing routes based only on destination IP. Policy routing (`ip rule add from 192.168.2.10 table 100`) ensures traffic responding from a secondary IP exits out of the matching secondary gateway."
    },
    {
        "num": 274,
        "difficulty": "Medium",
        "mcqQuestion": "A ping to a Linux server fails with 100% packet loss, but SSH (port 22) connects instantly. Is this a network failure?",
        "correct": "No. The network is functioning properly; intermediate firewalls or host iptables rules are simply dropping ICMP Echo Requests while allowing TCP port 22.",
        "distractors": [
            "Yes, this indicates catastrophic Layer 1 fiber attenuation that will crash the server.",
            "Yes, this proves the Linux server's kernel routing table has corrupted its default gateway.",
            "No, but it indicates that SSH is operating over Bluetooth rather than Ethernet."
        ],
        "explanation": "Never equate `ping` with service health. Many security policies explicitly drop ICMP for security hardening while permitting authorized application ports."
    },
    {
        "num": 275,
        "difficulty": "Medium",
        "mcqQuestion": "ping to a remote server succeeds with 0% loss, but an SSH connection to port 22 times out. What does this diagnose?",
        "correct": "Layer 3 IP connectivity is healthy, but TCP port 22 is either blocked by a firewall, dropped by an ACL, or the sshd service daemon is not running/listening.",
        "distractors": [
            "The physical Ethernet cable has been severed between the client and switch.",
            "The server's MAC address has expired and cannot be resolved by ARP.",
            "The client has configured an invalid subnet mask on its loopback interface."
        ],
        "explanation": "Since ICMP succeeds, IP routing, ARP, and physical links are intact. The issue is isolated to Layer 4 (firewall blocking TCP 22) or Layer 7 (sshd crashed or bound to wrong interface)."
    },
    {
        "num": 276,
        "difficulty": "Hard",
        "mcqQuestion": "A tcpdump capture shows outgoing TCP SYN packets from the client, but zero incoming SYN-ACK packets. What are the primary possibilities?",
        "correct": "SYN packets are blocked on the forward path, the destination server is down/not listening, or the server's SYN-ACK is blocked on the return path.",
        "distractors": [
            "The client has already established 65,536 simultaneous connections to the server.",
            "The server's DNS resolver returned an uncompressed BGP prefix.",
            "The client's physical network adapter does not support TCP checksum offloading."
        ],
        "explanation": "A missing SYN-ACK means either: 1) SYN never reached server, 2) Server dropped it (firewall/no listening socket), or 3) Server replied with SYN-ACK but it was dropped on the return path."
    },
    {
        "num": 277,
        "difficulty": "Hard",
        "mcqQuestion": "A server sends reply packets to a client, but the client never receives them. How should you investigate this asymmetric return-path failure?",
        "correct": "Capture packets at both client and server simultaneously, inspect the server's routing table (ip route get client_ip) and source address selection, and trace intermediate stateful firewalls.",
        "distractors": [
            "Force both client and server to reboot into single-user rescue mode.",
            "Clear the client's web browser cookies and restart the local display manager.",
            "Re-run traceroute from the client with default UDP probes only."
        ],
        "explanation": "Internet routing is asymmetric: the return path often traverses completely different routers and firewalls. If an intermediate stateful firewall sees reply traffic without having seen the SYN, it drops it."
    },
    {
        "num": 278,
        "difficulty": "Hard",
        "mcqQuestion": "You manually added a static route on a Linux server; network connectivity briefly succeeded, but then failed minutes later. What is the most probable cause?",
        "correct": "A dynamic routing protocol (OSPF/BGP), NetworkManager, or a DHCP lease renewal overwritten or removed the transient manual route.",
        "distractors": [
            "Static routes in Linux expire after 180 seconds by default according to RFC 791.",
            "The Linux kernel automatically converts all manual static routes into multicast groups.",
            "The physical Ethernet interface automatically changes its MAC address every 5 minutes."
        ],
        "explanation": "Commands like `ip route add` are non-persistent. If a dynamic daemon (BIRD, FRR, NetworkManager, dhclient) refreshes its table, it will purge or override unmanaged routes."
    }
]

# Define Q&A data for Section 8: Network Troubleshooting and Packet Analysis (279 - 294)
sec8_curated = [
    {
        "num": 279,
        "difficulty": "Medium",
        "mcqQuestion": "What is the recommended systematic methodology for troubleshooting a major network outage?",
        "correct": "Define scope/impact, collect timestamps and recent changes, test layer by layer, form a single hypothesis, test with a controlled change, and verify recovery.",
        "distractors": [
            "Immediately reboot all core switches and firewalls simultaneously without saving logs.",
            "Reconfigure all BGP autonomous system numbers to match upstream transit providers.",
            "Deploy arbitrary configuration tweaks across all routers until traffic starts flowing."
        ],
        "explanation": "Systematic troubleshooting follows an engineering workflow: Define scope -> Gather evidence -> Isolate layer -> Formulate single hypothesis -> Test -> Implement controlled fix -> Verify & document."
    },
    {
        "num": 280,
        "difficulty": "Easy",
        "mcqQuestion": "What is the fundamental difference between a symptom and a root cause in network troubleshooting?",
        "correct": "A symptom is the observable manifestation of an issue (e.g. packet loss, timeouts); a root cause is the underlying flaw (e.g. bad SFP, route loop) causing it.",
        "distractors": [
            "A symptom only occurs at Layer 7, while a root cause always occurs at Layer 1.",
            "A symptom is identified by network monitoring, while root causes can only be found by vendors.",
            "Symptoms and root causes are interchangeable terms in ITIL incident management."
        ],
        "explanation": "Treating symptoms (e.g. rebooting a server when memory runs low or increasing timeout thresholds) leaves the underlying defect active, guaranteeing recurrence."
    },
    {
        "num": 281,
        "difficulty": "Easy",
        "mcqQuestion": "What is the bottom-up troubleshooting approach?",
        "correct": "Starting at Layer 1 (Physical cabling, link lights), progressing sequentially upward through Layer 2 (VLANs, MAC), Layer 3 (IP, routing), to Layer 7 (Application).",
        "distractors": [
            "Starting with user interviews and terminating with fiber optic OTDR measurements.",
            "Starting at the core datacenter routers and working down to branch office switches.",
            "Starting at the application database queries and finishing with DNS records."
        ],
        "explanation": "Bottom-up is ideal when physical changes just occurred, cables were moved, or link lights are down. It systematically eliminates lower-layer physical dependencies first."
    },
    {
        "num": 282,
        "difficulty": "Easy",
        "mcqQuestion": "What is the top-down troubleshooting approach?",
        "correct": "Starting at Layer 7 (Application behavior, HTTP status codes, error messages) and working downward toward the physical layers only if application/transport tests fail.",
        "distractors": [
            "Starting at the highest rack unit in a server chassis and working down to the bottom rack unit.",
            "Analyzing satellite uplink telemetry before checking local Wi-Fi router power.",
            "Replacing core distribution switches before checking end-user desktop Ethernet cables."
        ],
        "explanation": "Top-down is highly effective when the physical network is known to be stable, users report specific application errors, or configuration changes were made to application software."
    },
    {
        "num": 283,
        "difficulty": "Medium",
        "mcqQuestion": "When is the divide-and-conquer troubleshooting approach most advantageous?",
        "correct": "When you can test a midpoint in the network path (such as a default gateway or distribution switch) to immediately eliminate half of the potential problem domain.",
        "distractors": [
            "When you have multiple engineers on call and assign each engineer a random device to reboot.",
            "When troubleshooting simplex wireless links that have no bidirectional return path.",
            "When a physical fiber cut has occurred inside an underground conduit."
        ],
        "explanation": "Starting at Layer 3 (pinging the default gateway from the client) immediately tells you: if gateway ping works, Layers 1-2 and local L3 are healthy, cutting the problem space in half."
    },
    {
        "num": 284,
        "difficulty": "Medium",
        "mcqQuestion": "How do you systematically determine whether an outage is isolated to one host, one VLAN, one rack, or the whole network?",
        "correct": "Compare affected and unaffected clients across failure domains (different hosts on same VLAN, different VLANs on same switch, different racks) to isolate the shared dependency.",
        "distractors": [
            "Send an all-hands email asking every employee if their internet connection feels sluggish.",
            "Run a traceroute to 127.0.0.1 on the affected server.",
            "Inspect the serial console log of the building's backup emergency diesel generator."
        ],
        "explanation": "Identifying the failure blast radius points directly to the failing component: 1 host = host NIC/config; 1 VLAN = VLAN trunk/DHCP pool; 1 rack = top-of-rack switch uplink; all = core/gateway/ISP."
    },
    {
        "num": 285,
        "difficulty": "Medium",
        "mcqQuestion": "How do you distinguish between a DNS resolution problem and an IP routing problem?",
        "correct": "Test name resolution separately with dig/nslookup, then test direct IP reachability using ping or curl to the numeric IP address.",
        "distractors": [
            "Inspect whether the server's Ethernet cable has an orange or green link LED.",
            "Check if the client operating system is running a 32-bit or 64-bit kernel.",
            "Restart the switch's Spanning Tree Protocol daemon and verify root bridge ID."
        ],
        "explanation": "If `curl http://93.184.216.34` succeeds but `curl http://example.com` fails, the network path is 100% fine and the problem is purely DNS name resolution."
    },
    {
        "num": 286,
        "difficulty": "Medium",
        "mcqQuestion": "How do you determine whether a connection failure is caused by the network or by the application itself?",
        "correct": "Verify TCP three-way handshake completion on the target port; if the TCP handshake succeeds but HTTP requests return 500 errors or hang, the application is at fault.",
        "distractors": [
            "If traceroute displays more than 3 hops, it is always an application error.",
            "If the ping latency is under 10ms, the application is guaranteed to be healthy.",
            "Applications cannot cause connection failures; all timeouts are caused by network cables."
        ],
        "explanation": "The network's job ends once the TCP connection is established and packets are delivered to the socket buffer. If TCP establishes but application responses fail, it is an application issue."
    },
    {
        "num": 287,
        "difficulty": "Easy",
        "mcqQuestion": "What is Wireshark, and what is its primary role in network engineering?",
        "correct": "A graphical packet analysis tool that decodes hundreds of network protocols, analyzes packet streams, filters traffic, and troubleshoots network anomalies.",
        "distractors": [
            "An intrusion prevention system (IPS) that actively injects TCP RST packets to kill malware.",
            "A DHCP server daemon used to automatically assign IP addresses in small enterprise offices.",
            "A cloud monitoring dashboard used to graph switch interface bandwidth utilization via SNMP."
        ],
        "explanation": "Wireshark provides deep packet inspection (DPI), visual protocol dissection, stream reconstruction, latency analysis, and expert warnings."
    },
    {
        "num": 288,
        "difficulty": "Easy",
        "mcqQuestion": "What is a network packet capture (pcap)?",
        "correct": "A recorded file containing intercepted Layer 2-7 packet headers and payloads captured at a specific observation point on a network interface.",
        "distractors": [
            "A screenshot of a network topology diagram saved in SVG format.",
            "A backup file containing Cisco IOS startup-configuration text commands.",
            "A database dump of all DNS queries cached in active RAM."
        ],
        "explanation": "A packet capture provides objective ground truth: the actual frames that entered or exited an interface, eliminating guesswork during complex troubleshooting."
    },
    {
        "num": 289,
        "difficulty": "Medium",
        "mcqQuestion": "What is a SPAN (Switched Port Analyzer) or mirror port on a network switch?",
        "correct": "A switch feature that copies network traffic from designated source ports/VLANs and forwards it to a dedicated monitoring port connected to an analyzer.",
        "distractors": [
            "A specialized fiber optic port used exclusively to connect redundant power supplies.",
            "A port configured to block all broadcast traffic using IEEE 802.1X authentication.",
            "A high-speed uplink port that only forwards tagged voice VLAN packets."
        ],
        "explanation": "SPAN replicates ingress and/or egress traffic from one or more ports to a destination monitoring port where Wireshark or an IDS is listening."
    },
    {
        "num": 290,
        "difficulty": "Medium",
        "mcqQuestion": "What is a physical network TAP (Test Access Point), and how does it differ from a switch SPAN port?",
        "correct": "A dedicated hardware device inserted inline into a physical cable that passively duplicates optical or copper signals without consuming switch CPU or dropping packets during congestion.",
        "distractors": [
            "A software script running inside Docker that captures localhost socket traffic.",
            "A firewall feature that drops TCP packets with invalid sequence numbers.",
            "A wireless antenna that intercepts 802.11 Wi-Fi management beacons."
        ],
        "explanation": "SPAN ports can drop packets under high switch load and alter frame timing. Physical TAPs passively split light/electricity with zero load on network switches, ensuring 100% capture fidelity."
    },
    {
        "num": 291,
        "difficulty": "Hard",
        "mcqQuestion": "What is a crucial technical difference between capturing traffic on a Linux host (tcpdump) versus capturing on an external switch mirror port?",
        "correct": "Host captures occur before hardware offloads on egress and after on ingress (showing oversized segments and false bad checksums); switch captures see actual on-the-wire frames.",
        "distractors": [
            "Host captures can only see IPv6 traffic, while switch captures can only see IPv4 traffic.",
            "Switch mirror captures decrypt TLS encryption automatically, while host captures cannot.",
            "Host captures modify the TTL field of all captured packets by incrementing it by 1."
        ],
        "explanation": "Due to TSO (TCP Segmentation Offload) and Checksum Offload, a host capture may show 64KB TCP segments and invalid checksums that the NIC hardware segments and calculates later before transmission."
    },
    {
        "num": 292,
        "difficulty": "Medium",
        "mcqQuestion": "In Wireshark, how do you identify a TCP handshake failure where the destination server is refusing the connection?",
        "correct": "The client sends a [SYN] packet, and the server immediately replies with a [RST, ACK] packet.",
        "distractors": [
            "The client sends a [FIN] packet, and the server replies with an ICMP Echo Reply.",
            "The client sends a [SYN] packet, and the server replies with a [PSH, ACK] containing data.",
            "The client sends an [ACK] packet, and the server terminates the physical link carrier."
        ],
        "explanation": "A `[RST, ACK]` from the server indicates the host received the SYN, but no application is listening on that port (or a firewall actively rejected it)."
    },
    {
        "num": 293,
        "difficulty": "Medium",
        "mcqQuestion": "How does Wireshark detect and label TCP retransmissions in a packet trace?",
        "correct": "It detects packets sharing identical sequence numbers with earlier segments in the same TCP stream, where the timestamp indicates retransmission after packet loss or delayed ACK.",
        "distractors": [
            "It queries the switch routing table using SNMP to verify if the frame was discarded.",
            "It checks whether the IP TTL has changed from an odd number to an even number.",
            "It looks for packets where the Layer 2 Ethernet CRC checksum is set to zero."
        ],
        "explanation": "Wireshark tracks TCP sequence numbers per stream. If it sees a segment with Sequence Number X and length Y that matches a previously observed sequence number, it flags `[TCP Retransmission]`."
    },
    {
        "num": 294,
        "difficulty": "Hard",
        "mcqQuestion": "How can packet captures in Wireshark reveal MTU mismatch or Path MTU Discovery (PMTUD) black hole issues?",
        "correct": "Look for packets with the Don't Fragment (DF) flag set followed by ICMP Type 3 Code 4 (Fragmentation Needed) messages, or repeated retransmissions of full-sized MSS packets while small packets succeed.",
        "distractors": [
            "Look for ARP requests that fail to resolve the MAC address of the DNS resolver.",
            "Look for TCP packets that have their SYN, FIN, and RST flags set simultaneously.",
            "Look for HTTP 404 Not Found error codes in the application layer payload."
        ],
        "explanation": "A classic PMTUD black hole occurs when large packets with DF=1 hit a router with smaller MTU (e.g. VPN tunnel), but ICMP 'Fragmentation Needed' replies are blocked by a firewall, causing large transfers to hang indefinitely."
    }
]

def format_topic_file(topic_id, topic_name, var_name, source_file, questions_data, prefix, raw_dict):
    out = []
    out.append(f"// {topic_name} — Questions")
    out.append(f"// Source: Network Engineer Detailed Interview Answers")
    out.append(f"// Total questions: {len(questions_data)}\n")
    out.append(f"const {var_name} = {{")
    out.append(f'  topicId: "{topic_id}",')
    out.append(f'  topicName: "{topic_name}",')
    out.append(f'  sourceFile: "{source_file}",')
    out.append("  questions: [")

    for i, q in enumerate(questions_data, start=1):
        qid = f"{prefix}-{i:03d}"
        qnum = q["num"]
        raw = raw_dict.get(qnum, {})
        orig_q = raw.get("title", q["mcqQuestion"])
        core = raw.get("core", "")
        det = raw.get("detailed", "")
        orig_ans = (core + " " + det).strip() if det else core

        # Prepare 4 options with randomized correctIndex
        correct_opt = q["correct"]
        distractors = q["distractors"][:3]
        all_options = [correct_opt] + distractors
        
        # Deterministic shuffle based on question index
        rng = random.Random(qnum * 101)
        indices = list(range(4))
        rng.shuffle(indices)
        
        shuffled_options = [None] * 4
        correct_idx = -1
        for orig_i, new_i in enumerate(indices):
            shuffled_options[new_i] = all_options[orig_i]
            if orig_i == 0:
                correct_idx = new_i

        out.append("    {")
        out.append(f'      id: "{qid}",')
        out.append(f'      difficulty: "{q["difficulty"]}",')
        
        # Escape backticks if any
        mcq_q = q["mcqQuestion"].replace('`', '\\`')
        out.append(f'      mcqQuestion: `{mcq_q}`,')
        out.append("      options: [")
        for opt in shuffled_options:
            escaped_opt = opt.replace('"', '\\"')
            out.append(f'        "{escaped_opt}",')
        out.append("      ],")
        out.append(f"      correctIndex: {correct_idx},")
        
        mcq_exp = q["explanation"].replace('`', '\\`')
        out.append(f'      mcqExplanation: `{mcq_exp}`,')
        
        orig_q_esc = orig_q.replace('`', '\\`')
        out.append(f'      originalDocQuestion: `{orig_q_esc}`,')
        
        orig_ans_esc = orig_ans.replace('`', '\\`')
        out.append(f'      originalDocAnswer: `{orig_ans_esc}`,')
        out.append("    },")

    out.append("  ],")
    out.append("};\n")
    return "\n".join(out)

# Generate Section 7 file
sec7_code = format_topic_file(
    topic_id="linux_networking",
    topic_name="Linux Networking & System Admin",
    var_name="linux_networking_DATA",
    source_file="Network_Engineer_Interview_Answers.docx",
    questions_data=sec7_curated,
    prefix="net_lnx",
    raw_dict=sec7_raw
)

sec7_path = r'c:\Users\ss671\OneDrive\Desktop\mcq app\src\data\topics\linux_networking.js'
with open(sec7_path, 'w', encoding='utf-8') as f:
    f.write(sec7_code)
print(f"Generated {sec7_path} ({len(sec7_curated)} questions)")

# Generate Section 8 file
sec8_code = format_topic_file(
    topic_id="network_troubleshooting",
    topic_name="Troubleshooting & Packet Analysis",
    var_name="network_troubleshooting_DATA",
    source_file="Network_Engineer_Interview_Answers.docx",
    questions_data=sec8_curated,
    prefix="net_trb",
    raw_dict=sec8_raw
)

sec8_path = r'c:\Users\ss671\OneDrive\Desktop\mcq app\src\data\topics\network_troubleshooting.js'
with open(sec8_path, 'w', encoding='utf-8') as f:
    f.write(sec8_code)
print(f"Generated {sec8_path} ({len(sec8_curated)} questions)")
