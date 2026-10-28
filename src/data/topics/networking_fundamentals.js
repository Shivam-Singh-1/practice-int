// Networking Fundamentals — Questions 1-22
// Source: Network Engineer Detailed Interview Answers
// Total questions: 22

const networking_fundamentals_DATA = {
  topicId: "networking_fundamentals",
  topicName: "Networking Fundamentals",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_fund-001",
      difficulty: "Easy",
      mcqQuestion: `What is a computer network, and why do we need one?`,
      options: [
        "A computer network connects devices so they can exchange data and share services such as files, applications, printers, and internet access.",
        "A computer network is a single cable connecting two computers for power sharing.",
        "A computer network is software that encrypts all data on a hard drive.",
        "A computer network is a type of operating system used to manage servers."
      ],
      correctIndex: 0,
      mcqExplanation: `A computer network connects devices for data exchange and shared services. It also supports centralized management, security controls, redundancy, and inter-system communication — not just Internet connectivity.`,
      originalDocQuestion: `What is a computer network, and why do we need one?`,
      originalDocAnswer: `A computer network connects devices so they can exchange data and share services such as files, applications, printers, and internet access. Networks also support centralized management, security controls, redundancy, and communication between systems. A simple example is a laptop opening a website: Wi-Fi carries frames locally, IP routes packets beyond the local subnet, TCP or QUIC carries the transport stream, and HTTP defines the application request.`,
    },
    {
      id: "net_fund-002",
      difficulty: "Medium",
      mcqQuestion: `What is the OSI model? How many layers does it have?`,
      options: [
        "A four-layer model: Link, Internet, Transport, and Application.",
        "A seven-layer reference model: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
        "A five-layer model used exclusively by Cisco routers.",
        "A three-layer model: Hardware, Software, and User Interface."
      ],
      correctIndex: 1,
      mcqExplanation: `The OSI model is a seven-layer reference model that organizes protocols and troubleshooting by layer. From bottom to top: Physical, Data Link, Network, Transport, Session, Presentation, and Application.`,
      originalDocQuestion: `What is the OSI model? Explain all seven layers.`,
      originalDocAnswer: `The OSI model is a seven-layer reference model: Physical (signals and media), Data Link (frames and MAC addresses), Network (IP and routing), Transport (TCP/UDP and ports), Session (dialog management), Presentation (formats, compression, encryption), and Application (services used by applications). It helps organize protocols and troubleshoot by layer.`,
    },
    {
      id: "net_fund-003",
      difficulty: "Medium",
      mcqQuestion: `What is the TCP/IP model, and how many layers does it have?`,
      options: [
        "A seven-layer model identical to OSI but with different naming.",
        "A two-layer model: Hardware and Software.",
        "A common four-layer model: Link, Internet, Transport, and Application.",
        "A five-layer model: Physical, Data Link, Network, Transport, and Application."
      ],
      correctIndex: 2,
      mcqExplanation: `The TCP/IP model has four layers: Link (local delivery), Internet (IP addressing and routing), Transport (TCP/UDP), and Application (HTTP, DNS, SSH, SMTP, etc.). It combines several OSI functions into fewer layers.`,
      originalDocQuestion: `What is the TCP/IP model? Explain its layers.`,
      originalDocAnswer: `The common four-layer TCP/IP model contains Link, Internet, Transport, and Application. Link handles local delivery, Internet handles IP addressing and routing, Transport provides TCP/UDP communication, and Application includes protocols such as HTTP, DNS, SSH, and SMTP.`,
    },
    {
      id: "net_fund-004",
      difficulty: "Medium",
      mcqQuestion: `What is the key difference between the OSI and TCP/IP models?`,
      options: [
        "OSI is used in production while TCP/IP is purely theoretical.",
        "OSI has four layers while TCP/IP has seven layers.",
        "OSI is a seven-layer conceptual reference model; TCP/IP is the practical protocol suite with four layers that combines some OSI functions.",
        "There is no difference; they are identical models with different names."
      ],
      correctIndex: 2,
      mcqExplanation: `OSI is a seven-layer conceptual reference useful for teaching and troubleshooting, while TCP/IP is the practical four-layer suite used by modern Internet networks. TCP/IP combines session, presentation, and application into a single Application layer.`,
      originalDocQuestion: `What is the difference between the OSI and TCP/IP models?`,
      originalDocAnswer: `OSI is a seven-layer conceptual reference model; TCP/IP is the practical protocol suite used by modern networks and is commonly shown with four layers. TCP/IP combines some OSI functions, such as session and presentation, into its Application layer.`,
    },
    {
      id: "net_fund-005",
      difficulty: "Easy",
      mcqQuestion: `Which OSI layer is responsible for routing?`,
      options: [
        "Layer 1 — Physical layer.",
        "Layer 2 — Data Link layer.",
        "Layer 3 — Network layer.",
        "Layer 4 — Transport layer."
      ],
      correctIndex: 2,
      mcqExplanation: `Routing is a Layer 3 (Network layer) function. Routers examine destination IP addresses and a routing table to select the next hop or outgoing interface. The router usually decrements the IP TTL and updates the link-layer encapsulation at each hop.`,
      originalDocQuestion: `Which OSI layer is responsible for routing?`,
      originalDocAnswer: `Routing is a Layer 3, or Network layer, function. Routers examine destination IP addresses and a routing table to select the next hop or outgoing interface.`,
    },
    {
      id: "net_fund-006",
      difficulty: "Easy",
      mcqQuestion: `Which OSI layer is responsible for logical addressing (such as IP addresses)?`,
      options: [
        "Layer 2 — Data Link layer using MAC addresses.",
        "Layer 4 — Transport layer using port numbers.",
        "Layer 3 — Network layer using IPv4 and IPv6 addresses.",
        "Layer 7 — Application layer using hostnames."
      ],
      correctIndex: 2,
      mcqExplanation: `The Network layer (Layer 3) uses logical addresses such as IPv4 and IPv6. These are hierarchical, allowing route aggregation, unlike flat MAC addresses used only for local-link delivery at Layer 2.`,
      originalDocQuestion: `Which OSI layer is responsible for logical addressing?`,
      originalDocAnswer: `The Network layer (Layer 3) uses logical addresses such as IPv4 and IPv6 addresses. These identify endpoints across networks, unlike MAC addresses, which are used for delivery on a local link.`,
    },
    {
      id: "net_fund-007",
      difficulty: "Medium",
      mcqQuestion: `At which layers do switches, routers, hubs, and firewalls primarily operate?`,
      options: [
        "Hub: Layer 3; Switch: Layer 1; Router: Layer 2; Firewall: Layer 7 only.",
        "Hub: Layer 1; Switch: Layer 2; Router: Layer 3; Firewall: multiple layers depending on type.",
        "All devices operate at Layer 3 since they all handle IP packets.",
        "Hub: Layer 2; Switch: Layer 3; Router: Layer 4; Firewall: Layer 1."
      ],
      correctIndex: 1,
      mcqExplanation: `A hub repeats signals at Layer 1; a switch forwards frames at Layer 2 using MAC addresses; a router forwards IP packets at Layer 3. Firewalls can operate across layers — basic packet filters use IPs/ports, while application-aware firewalls inspect up to Layer 7.`,
      originalDocQuestion: `At which layer do switches, routers, hubs, and firewalls primarily operate?`,
      originalDocAnswer: `A traditional hub works at Layer 1; a bridge and a Layer 2 switch work at Layer 2; a router works at Layer 3. Firewalls can operate at several layers: basic packet filters use IPs and ports, while application-aware firewalls inspect higher-layer traffic.`,
    },
    {
      id: "net_fund-008",
      difficulty: "Medium",
      mcqQuestion: `What is encapsulation and decapsulation in networking?`,
      options: [
        "Encapsulation encrypts data at each layer; decapsulation decrypts it.",
        "Encapsulation adds protocol headers/trailers as data moves down the stack; decapsulation removes them in reverse order at the receiver.",
        "Encapsulation converts analog signals to digital; decapsulation reverses it.",
        "Encapsulation compresses packets for faster transmission; decapsulation decompresses them."
      ],
      correctIndex: 1,
      mcqExplanation: `Encapsulation wraps data with protocol information as it moves down the stack: application message → TCP segment → IP packet → Ethernet frame. Decapsulation strips those headers/trailers in reverse order at the receiving end.`,
      originalDocQuestion: `What is encapsulation and decapsulation?`,
      originalDocAnswer: `Encapsulation adds protocol information as data moves down the network stack: an application message becomes a transport segment/datagram, an IP packet, and a link-layer frame. Decapsulation removes those headers in reverse order at the receiver.`,
    },
    {
      id: "net_fund-009",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a frame, packet, segment, and bit?`,
      options: [
        "They are all interchangeable terms for the same data unit.",
        "Bits are Layer 1 signals; frames are Layer 2 units; packets are Layer 3 IP units; segments are Layer 4 TCP units.",
        "Frames are the largest unit; bits are the smallest application-layer message.",
        "Packets are Layer 2 units; frames are Layer 3 units; segments are physical signals."
      ],
      correctIndex: 1,
      mcqExplanation: `Each layer has its own protocol data unit: bits at Physical (L1), frames at Data Link (L2), packets at Network (L3), and TCP segments at Transport (L4). UDP data is usually called a datagram. Each layer wraps data from above.`,
      originalDocQuestion: `What is the difference between a frame, packet, segment, and bit?`,
      originalDocAnswer: `Bits are physical signals; a frame is a Layer 2 unit; a packet is a Layer 3 IP unit; and a TCP segment is a Layer 4 TCP unit. UDP data is usually called a datagram. Each layer wraps the data from the layer above.`,
    },
    {
      id: "net_fund-010",
      difficulty: "Easy",
      mcqQuestion: `What is a protocol in networking?`,
      options: [
        "A physical cable standard used to connect devices.",
        "A hardware component inside a router.",
        "An agreed set of rules for communication, including message format, meaning, sequencing, and error handling.",
        "A type of encryption algorithm used for securing data."
      ],
      correctIndex: 2,
      mcqExplanation: `A protocol defines syntax (message arrangement), semantics (field meanings), and rules for sequencing and responses. Examples include Ethernet, IP, TCP, DNS, and HTTP.`,
      originalDocQuestion: `What is a protocol?`,
      originalDocAnswer: `A protocol is an agreed set of rules for communication, including message format, meaning, sequencing, and error handling. Examples include Ethernet, IP, TCP, DNS, and HTTP.`,
    },
    {
      id: "net_fund-011",
      difficulty: "Hard",
      mcqQuestion: `What is the difference between a service, a protocol, and an interface in the context of layered network architecture?`,
      options: [
        "A service is the hardware, a protocol is the software, and an interface is the cable.",
        "A service describes what a layer offers; a protocol describes how peers communicate; an interface defines how a layer accesses the service.",
        "All three terms mean the same thing — the rules for data transfer.",
        "A service is a DNS record; a protocol is an IP address; an interface is a port number."
      ],
      correctIndex: 1,
      mcqExplanation: `The service is the capability offered (what), the protocol is the agreed conversation between peers (how peers talk), and the interface is how a local layer accesses that capability (local access point).`,
      originalDocQuestion: `What is the difference between a service, protocol, and interface?`,
      originalDocAnswer: `A service describes what one layer offers to another; a protocol describes how peer entities communicate; and an interface defines how a layer or component accesses that service. The terms are related but describe different viewpoints.`,
    },
    {
      id: "net_fund-012",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between connection-oriented and connectionless communication?`,
      options: [
        "Connection-oriented uses wireless; connectionless uses wired cables.",
        "Connection-oriented means data is encrypted; connectionless means data is unencrypted.",
        "Connection-oriented establishes state before exchanging data (like TCP); connectionless sends independent datagrams without a connection (like UDP).",
        "Connection-oriented is faster because it skips handshakes; connectionless is slower due to acknowledgments."
      ],
      correctIndex: 2,
      mcqExplanation: `Connection-oriented communication (TCP) establishes state and tracks delivery. Connectionless communication (UDP) sends independent datagrams with no built-in delivery guarantee. Neither term alone guarantees application success or failure.`,
      originalDocQuestion: `What is the difference between connection-oriented and connectionless communication?`,
      originalDocAnswer: `Connection-oriented communication establishes state before exchanging data and usually tracks delivery, as TCP does. Connectionless communication sends independent datagrams without a transport connection, as UDP does; it has less built-in overhead but no delivery guarantee.`,
    },
    {
      id: "net_fund-013",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a MAC address and an IP address?`,
      options: [
        "MAC addresses route traffic across the Internet; IP addresses identify local devices.",
        "A MAC address identifies a network interface on a local Layer 2 network; an IP address identifies a logical endpoint for routing between networks.",
        "MAC addresses are 128-bit logical addresses; IP addresses are 48-bit hardware addresses.",
        "MAC addresses and IP addresses are identical but used on different operating systems."
      ],
      correctIndex: 1,
      mcqExplanation: `MAC addresses are link-local — they deliver frames on the current link and change at each routed hop. IP addresses are logical and preserved end-to-end in ordinary routing, enabling traffic to move between different networks.`,
      originalDocQuestion: `What is the difference between a MAC address and an IP address?`,
      originalDocAnswer: `A MAC address identifies a network interface on a local Layer 2 network, while an IP address identifies a logical endpoint for routing between networks. Routers forward IP packets but generally replace the Layer 2 frame header at each hop.`,
    },
    {
      id: "net_fund-014",
      difficulty: "Medium",
      mcqQuestion: `Why does a network need both MAC addresses and IP addresses?`,
      options: [
        "Both are needed because MAC addresses handle encryption and IP addresses handle compression.",
        "IP addresses allow scalable routing across networks; MAC addresses deliver frames over the current local link. ARP/ND maps the next-hop IP to a link-layer address.",
        "MAC addresses are used for IPv6 only; IP addresses are used for IPv4 only.",
        "They are redundant — modern networks only need IP addresses."
      ],
      correctIndex: 1,
      mcqExplanation: `IP provides hierarchical, scalable routing between networks. MAC provides local link delivery. ARP (IPv4) or Neighbor Discovery (IPv6) maps the next-hop IP to a link-layer address on that segment. A host does not need to know a remote server's MAC across the Internet.`,
      originalDocQuestion: `Why does a network need both MAC addresses and IP addresses?`,
      originalDocAnswer: `IP addresses allow scalable, hierarchical routing across networks. MAC addresses deliver a frame over the current local link. ARP for IPv4 or Neighbor Discovery for IPv6 maps a next-hop IP address to a link-layer address on that link.`,
    },
    {
      id: "net_fund-015",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a port number and an IP address?`,
      options: [
        "A port number identifies a physical switch port; an IP address identifies a VLAN.",
        "An IP address identifies a host or interface at the network layer; a port identifies an application endpoint on that host at the transport layer.",
        "Port numbers are used only by routers; IP addresses are used only by switches.",
        "An IP address is a 16-bit value; a port number is a 32-bit value."
      ],
      correctIndex: 1,
      mcqExplanation: `An IP address identifies a host/interface at Layer 3; a port identifies an application endpoint at Layer 4. Together (protocol + src IP + src port + dst IP + dst port), they identify a TCP or UDP flow, allowing many clients to connect to one server simultaneously.`,
      originalDocQuestion: `What is the difference between a port number and an IP address?`,
      originalDocAnswer: `An IP address identifies a host or interface at the network layer; a port identifies an application endpoint on that host at the transport layer. Together, source/destination IPs and ports help identify a TCP or UDP flow.`,
    },
    {
      id: "net_fund-016",
      difficulty: "Hard",
      mcqQuestion: `What happens when you enter a website URL into your browser and press Enter?`,
      options: [
        "The browser sends a UDP broadcast to all servers on the Internet until one responds.",
        "The browser directly connects to the website's MAC address using ARP across the Internet.",
        "The browser parses the URL, resolves the hostname via DNS, establishes a TCP connection (or QUIC for HTTP/3), negotiates TLS for HTTPS, sends an HTTP request, and processes the response.",
        "The browser converts the URL into a MAC address and sends an Ethernet frame directly to the web server."
      ],
      correctIndex: 2,
      mcqExplanation: `The ordered sequence: URL parsing → cache/DNS lookup → route and neighbor lookup → transport connection (TCP or QUIC) → TLS for HTTPS → HTTP request/response → browser rendering. HTTP/3 uses QUIC over UDP, so not every modern website uses TCP.`,
      originalDocQuestion: `What happens when you enter a website URL into your browser and press Enter?`,
      originalDocAnswer: `The browser parses the URL, resolves the hostname using DNS if needed, chooses a route, establishes a TCP connection (or uses QUIC for HTTP/3), negotiates TLS for HTTPS, sends an HTTP request, and processes the response. Caches, proxies, redirects, and existing connections may change the exact steps.`,
    },
    {
      id: "net_fund-017",
      difficulty: "Hard",
      mcqQuestion: `At which layers do encryption, compression, and error detection commonly occur?`,
      options: [
        "Encryption occurs only at the Physical layer; compression only at Transport; error detection only at Application.",
        "All three functions occur exclusively at the Presentation layer (Layer 6).",
        "It depends on the protocol — TLS encrypts above TCP, applications may compress data, Ethernet uses FCS for error detection, and TCP has checksums. No single OSI layer owns all forms.",
        "Error detection occurs only at Layer 1 using voltage levels; encryption and compression are not network functions."
      ],
      correctIndex: 2,
      mcqExplanation: `These functions exist at multiple layers. TLS commonly encrypts above TCP; applications may compress their own data; Ethernet uses FCS for frame error detection; TCP checksums detect certain corruptions end-to-end. Error detection does not automatically mean error correction.`,
      originalDocQuestion: `At which layers do encryption, compression, and error detection commonly occur?`,
      originalDocAnswer: `It depends on the protocol. TLS commonly encrypts application traffic above TCP; applications may compress their own data; Ethernet uses a frame check sequence for error detection; and TCP has a checksum for its segment. No single OSI layer owns every form of these functions.`,
    },
    {
      id: "net_fund-018",
      difficulty: "Hard",
      mcqQuestion: `What is the difference between a control plane, data plane, and management plane?`,
      options: [
        "Control plane forwards packets; data plane learns routes; management plane handles encryption.",
        "The control plane learns routes and makes forwarding decisions; the data plane forwards packets using installed state; the management plane provides administration and monitoring.",
        "All three planes are identical and interchangeable terms for packet forwarding.",
        "The control plane is physical hardware; the data plane is software; the management plane is the user interface."
      ],
      correctIndex: 1,
      mcqExplanation: `Control plane: decides where traffic should go (route learning). Data plane: moves packets at forwarding speed using installed state. Management plane: lets operators configure and observe devices (SSH, APIs, SNMP). A control-plane fault can affect new routes while existing data-plane forwarding may continue.`,
      originalDocQuestion: `What is the difference between a control plane, data plane, and management plane?`,
      originalDocAnswer: `The control plane learns routes and makes forwarding decisions; the data plane forwards packets using the installed forwarding information; the management plane provides administration and monitoring, for example through SSH, APIs, or SNMP.`,
    },
    {
      id: "net_fund-019",
      difficulty: "Medium",
      mcqQuestion: `What is MTU, and how does it affect packet transmission?`,
      options: [
        "MTU is the Maximum Transfer Utility, a tool for measuring bandwidth.",
        "MTU is the largest Layer 3 packet a link can carry without fragmentation. Mismatches can cause fragmentation, drops, or stalled large transfers.",
        "MTU stands for Multi-Threaded Unit and refers to CPU processing of packets.",
        "MTU is a routing protocol that replaces OSPF in modern networks."
      ],
      correctIndex: 1,
      mcqExplanation: `MTU (Maximum Transmission Unit) is the largest IP packet a link can carry. Common Ethernet IP MTU is 1500 bytes. Tunnels reduce effective MTU. If Path MTU Discovery ICMP messages are blocked, small requests may work while larger transfers stall.`,
      originalDocQuestion: `What is MTU, and how does it affect packet transmission?`,
      originalDocAnswer: `MTU is the largest Layer 3 packet a link can carry without fragmentation at that layer. A mismatch can cause fragmentation, drops, or stalled large transfers, especially when Path MTU Discovery is blocked or broken.`,
    },
    {
      id: "net_fund-020",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between bandwidth, throughput, latency, and jitter?`,
      options: [
        "They all measure the same thing — the speed of a network connection.",
        "Bandwidth is a link's nominal capacity; throughput is actual data rate achieved; latency is travel time; jitter is variation in delay.",
        "Bandwidth is latency measured in bytes; throughput is jitter measured in seconds.",
        "Latency is the total capacity of a link; bandwidth is the time delay."
      ],
      correctIndex: 1,
      mcqExplanation: `Bandwidth = nominal capacity (lane capacity), throughput = actual achieved rate (actual car flow), latency = time for data to travel (journey time), jitter = variation in delay (journey time variation). A high-bandwidth link can still have high latency, jitter, or loss.`,
      originalDocQuestion: `What is the difference between bandwidth, throughput, latency, and jitter?`,
      originalDocAnswer: `Bandwidth is a link's nominal capacity; throughput is the data rate actually achieved; latency is the time taken for data to travel; and jitter is variation in delay. A high-bandwidth link can still have high latency, jitter, or loss.`,
    },
    {
      id: "net_fund-021",
      difficulty: "Medium",
      mcqQuestion: `Can a network have high bandwidth but poor performance? Explain.`,
      options: [
        "No — high bandwidth always guarantees good performance.",
        "Yes — but only if the cables are physically damaged.",
        "Yes — congestion, packet loss, retransmissions, long propagation delay, DNS issues, CPU limits, or inefficient applications can hurt performance despite high link capacity.",
        "No — bandwidth and performance are the same metric."
      ],
      correctIndex: 2,
      mcqExplanation: `A 10 Gbps link can still perform poorly if packets queue, are dropped and retransmitted, take a long path, or are delayed by DNS, TLS setup, server CPU, or application processing. Always measure the actual symptom.`,
      originalDocQuestion: `Can a network have high bandwidth but poor performance? Explain.`,
      originalDocAnswer: `Yes. Congestion, packet loss, retransmissions, long propagation delay, bad DNS, CPU limits, inefficient application behavior, or queueing can hurt performance even when a link has high capacity. Measure the actual symptom instead of assuming bandwidth is the cause.`,
    },
    {
      id: "net_fund-022",
      difficulty: "Medium",
      mcqQuestion: `If the physical layer is working (link light is on), why might communication between two devices still fail?`,
      options: [
        "If the physical layer works, all other layers are guaranteed to work.",
        "A link light only suggests a physical link. Communication may still fail due to VLAN mismatch, incorrect IP/subnet/gateway, ARP failure, missing routes, firewall rules, DNS errors, or faulty services.",
        "Physical layer working means the devices are in the same VLAN automatically.",
        "Link lights only indicate power supply status, not network connectivity."
      ],
      correctIndex: 1,
      mcqExplanation: `A link light confirms carrier/physical link, not full configuration or service health. Use a layered checklist: link/carrier → VLAN/switch → IP/mask/neighbor → gateway/routes → ACL/firewall/NAT → TCP/UDP port → DNS → application.`,
      originalDocQuestion: `If the physical layer is working, why might communication between two devices still fail?`,
      originalDocAnswer: `A link light only suggests a physical link. Communication may still fail because of VLAN mismatch, incorrect IP/subnet/gateway, ARP failure, missing routes, ACL/firewall rules, DNS errors, a closed application port, or a faulty service.`,
    },
  ],
};
