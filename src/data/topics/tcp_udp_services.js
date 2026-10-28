// TCP, UDP, DNS, DHCP, NAT, and Application Services — Questions 79-132
// Source: Network Engineer Detailed Interview Answers
// Total questions: 36

const tcp_udp_services_DATA = {
  topicId: "tcp_udp_services",
  topicName: "TCP, UDP, DNS, DHCP, NAT & Services",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_tcp-001",
      difficulty: "Easy",
      mcqQuestion: `What is TCP?`,
      options: [
        "A connectionless protocol that sends independent datagrams without guarantees.",
        "A connection-oriented transport protocol providing an ordered byte stream, retransmission, flow control, and congestion control.",
        "A routing protocol used by routers to exchange link-state information.",
        "A Layer 2 protocol used for VLAN tagging on trunk links."
      ],
      correctIndex: 1,
      mcqExplanation: `TCP is connection-oriented, providing reliable, ordered byte-stream delivery with retransmission, flow control, and congestion control. Commonly used for web (HTTP), SSH, and database connections.`,
      originalDocQuestion: `What is TCP?`,
      originalDocAnswer: `TCP is a connection-oriented transport protocol that provides an ordered byte stream, retransmission, flow control, and congestion control. It is commonly used for web, SSH, and database connections.`,
    },
    {
      id: "net_tcp-002",
      difficulty: "Easy",
      mcqQuestion: `What is UDP?`,
      options: [
        "A connection-oriented protocol that guarantees ordered delivery.",
        "A connectionless transport protocol with small headers and datagram boundaries. It does not guarantee delivery, ordering, or retransmission.",
        "A network layer protocol that replaces IP in modern networks.",
        "A protocol used exclusively for email delivery."
      ],
      correctIndex: 1,
      mcqExplanation: `UDP supplies datagrams and port multiplexing but does not establish a connection, retransmit lost data, or order messages. Applications can add reliability features above UDP if needed.`,
      originalDocQuestion: `What is UDP?`,
      originalDocAnswer: `UDP is a connectionless transport protocol with small headers and datagram boundaries. It does not itself guarantee delivery, ordering, or retransmission, so applications add those features if needed.`,
    },
    {
      id: "net_tcp-003",
      difficulty: "Medium",
      mcqQuestion: `What are the key differences between TCP and UDP?`,
      options: [
        "TCP is faster because it skips connection setup; UDP is slower because it requires a handshake.",
        "TCP provides a reliable ordered byte stream with connection setup and congestion control; UDP sends independent datagrams with lower overhead and no built-in reliability.",
        "TCP is used only for video streaming; UDP is used only for file transfers.",
        "TCP and UDP are identical protocols with different names."
      ],
      correctIndex: 1,
      mcqExplanation: `TCP = reliable, ordered, connection-oriented with flow/congestion control. UDP = lightweight, connectionless datagrams without built-in reliability. The best choice depends on application needs, not just speed.`,
      originalDocQuestion: `Explain TCP versus UDP.`,
      originalDocAnswer: `TCP provides a reliable ordered byte stream with connection setup and congestion/flow control. UDP sends independent datagrams with lower protocol overhead and no built-in reliability. The best choice depends on application needs, not merely speed.`,
    },
    {
      id: "net_tcp-004",
      difficulty: "Medium",
      mcqQuestion: `What is the TCP three-way handshake?`,
      options: [
        "The server sends SYN, the client replies SYN-ACK, and the server sends ACK.",
        "The client sends ACK, the server replies SYN, and the client sends FIN.",
        "The client sends SYN, the server replies SYN-ACK, and the client sends ACK — synchronizing sequence numbers before data transfer.",
        "Both endpoints simultaneously send SYN packets and wait for a FIN."
      ],
      correctIndex: 2,
      mcqExplanation: `SYN → SYN-ACK → ACK. This exchange synchronizes initial sequence numbers and establishes TCP connection state. It also allows negotiation of options like MSS, window scaling, and SACK.`,
      originalDocQuestion: `What is the TCP three-way handshake?`,
      originalDocAnswer: `The client sends SYN, the server replies SYN-ACK, and the client sends ACK. The exchange synchronizes initial sequence numbers and establishes TCP connection state before data transfer.`,
    },
    {
      id: "net_tcp-005",
      difficulty: "Medium",
      mcqQuestion: `How does TCP connection termination typically work?`,
      options: [
        "One side sends RST and the connection terminates immediately without acknowledgment.",
        "A typical graceful close uses FIN and ACK exchanges in each direction because each direction closes separately. RST aborts instead of gracefully closing.",
        "Both sides simultaneously send FIN packets and the connection closes.",
        "TCP connections never close — they remain open indefinitely."
      ],
      correctIndex: 1,
      mcqExplanation: `Normal TCP close uses FIN/ACK exchanges in each direction (each side can finish independently). RST abruptly aborts the connection. Packet captures and socket states distinguish normal close, half-close, and resets.`,
      originalDocQuestion: `How does TCP connection termination work?`,
      originalDocAnswer: `A typical graceful close uses FIN and ACK exchanges in each direction because each direction of the byte stream closes separately. RST aborts a connection rather than performing a normal graceful shutdown.`,
    },
    {
      id: "net_tcp-006",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between TCP flow control and congestion control?`,
      options: [
        "They are the same mechanism — both protect the receiver.",
        "Flow control protects the receiver using the advertised receive window; congestion control protects the network by adjusting the sender's rate using algorithms and feedback.",
        "Flow control protects the network; congestion control protects the receiver.",
        "Flow control uses ICMP; congestion control uses ARP."
      ],
      correctIndex: 1,
      mcqExplanation: `Flow control = receiver protection (advertised window limits how much data sender can send without ACK). Congestion control = network protection (sender adjusts rate based on loss/delay signals). Both constrain data in flight.`,
      originalDocQuestion: `What is the difference between TCP flow control and congestion control?`,
      originalDocAnswer: `Flow control protects the receiver from being overwhelmed, using the advertised receive window. Congestion control protects the network from overload, adjusting the sender's rate using algorithms and feedback.`,
    },
    {
      id: "net_tcp-007",
      difficulty: "Medium",
      mcqQuestion: `What is the TCP receive window?`,
      options: [
        "The total number of TCP connections a server can handle simultaneously.",
        "The amount of data the receiver can accept without acknowledgment, based on available receive-buffer capacity. Window scaling allows larger windows.",
        "The time interval between TCP retransmissions.",
        "The maximum segment size (MSS) negotiated during the handshake."
      ],
      correctIndex: 1,
      mcqExplanation: `The receive window tells the sender how much additional data the receiver can accept. Window scaling extends the 16-bit field for larger windows. A larger buffer alone won't fix loss, congestion, or slow application reads.`,
      originalDocQuestion: `What is the TCP receive window?`,
      originalDocAnswer: `The receive window tells the sender how much additional data the receiver can accept without acknowledgment, based on available receive-buffer capacity. Window scaling permits larger windows.`,
    },
    {
      id: "net_tcp-008",
      difficulty: "Medium",
      mcqQuestion: `What is slow start in TCP?`,
      options: [
        "A mechanism where TCP starts with zero bandwidth and never increases.",
        "A phase where TCP begins with a small congestion window and increases it rapidly (roughly doubling each RTT) until a threshold or congestion signal.",
        "A feature that delays the first packet by 30 seconds for security checks.",
        "A setting that limits TCP to half-duplex mode during connection setup."
      ],
      correctIndex: 1,
      mcqExplanation: `Slow start begins with a small congestion window and increases rapidly (approximately doubles each round-trip) as ACKs arrive, until reaching a threshold or detecting congestion.`,
      originalDocQuestion: `What is slow start in TCP?`,
      originalDocAnswer: `Slow start begins with a relatively small congestion window and increases it rapidly as acknowledgments arrive, commonly doubling roughly each round-trip time until a threshold or congestion signal changes behavior.`,
    },
    {
      id: "net_tcp-009",
      difficulty: "Medium",
      mcqQuestion: `What is a TCP reset (RST)?`,
      options: [
        "A normal packet sent after every data transmission to confirm delivery.",
        "A packet that gracefully closes a TCP connection after all data is transferred.",
        "An abrupt signal that resets a TCP connection — often because a port is closed, an application aborts, or a middlebox rejects it.",
        "A special SYN packet used to restart the three-way handshake."
      ],
      correctIndex: 2,
      mcqExplanation: `RST abruptly resets a TCP connection. Causes include: closed port, application abort, middlebox rejection, or invalid state. The exact reason must be inferred from context and packet evidence.`,
      originalDocQuestion: `What is a TCP reset, or RST?`,
      originalDocAnswer: `RST abruptly resets a TCP connection, often because a port is closed, an application aborts a connection, or a middlebox rejects it.`,
    },
    {
      id: "net_tcp-010",
      difficulty: "Medium",
      mcqQuestion: `What is the TIME_WAIT state in TCP?`,
      options: [
        "A state where the server waits for the client to send the first SYN.",
        "A state that occurs on the endpoint that actively closes a TCP connection, ensuring delayed segments expire and allowing final ACK retransmission.",
        "A state indicating the connection has been reset by the remote peer.",
        "A state where TCP waits for DNS resolution before establishing a connection."
      ],
      correctIndex: 1,
      mcqExplanation: `TIME_WAIT occurs on the side that actively closes. It ensures delayed duplicate segments from the old connection expire and allows retransmission of the final ACK if needed. Many TIME_WAIT sockets are not inherently a problem.`,
      originalDocQuestion: `What is the TIME_WAIT state?`,
      originalDocAnswer: `TIME_WAIT normally occurs on the endpoint that actively closes a TCP connection. It helps ensure delayed duplicate segments expire and allows retransmission of the final ACK if necessary.`,
    },
    {
      id: "net_tcp-011",
      difficulty: "Hard",
      mcqQuestion: `What is the difference between LISTEN, ESTABLISHED, CLOSE_WAIT, and TIME_WAIT?`,
      options: [
        "LISTEN = data transfer; ESTABLISHED = waiting for connections; CLOSE_WAIT = active close; TIME_WAIT = passive close.",
        "LISTEN = waiting for incoming connections; ESTABLISHED = carrying data; CLOSE_WAIT = peer sent FIN but local app hasn't closed; TIME_WAIT = post-close waiting state.",
        "All four states indicate an active data transfer session.",
        "LISTEN = half-open attack; ESTABLISHED = handshake in progress; CLOSE_WAIT = connection refused; TIME_WAIT = timeout error."
      ],
      correctIndex: 1,
      mcqExplanation: `LISTEN: waiting for connections. ESTABLISHED: active data transfer. CLOSE_WAIT: peer sent FIN, local app hasn't closed its side (often indicates app resource issues). TIME_WAIT: post-close state for handling delayed segments.`,
      originalDocQuestion: `What is the difference between LISTEN, ESTABLISHED, CLOSE_WAIT, and TIME_WAIT?`,
      originalDocAnswer: `LISTEN waits for incoming connections; ESTABLISHED carries data; CLOSE_WAIT means the peer sent FIN and the local application has not closed its side; TIME_WAIT is a post-close waiting state.`,
    },
    {
      id: "net_tcp-012",
      difficulty: "Medium",
      mcqQuestion: `Why is UDP often used for real-time communication?`,
      options: [
        "Because UDP guarantees zero packet loss through built-in retransmission.",
        "Because UDP is encrypted by default, which is required for real-time applications.",
        "Because UDP avoids TCP's connection setup and retransmission delays, preserving individual datagrams. Real-time apps prefer timely delivery over late retransmissions.",
        "Because UDP provides ordered delivery which is essential for real-time audio."
      ],
      correctIndex: 2,
      mcqExplanation: `UDP avoids TCP overhead (handshake, retransmission delays) and preserves datagram boundaries. Real-time applications may prefer receiving new data on time rather than waiting for late retransmissions of old data.`,
      originalDocQuestion: `Why is UDP often used for real-time communication?`,
      originalDocAnswer: `UDP avoids TCP connection setup and transport retransmission delays, and preserves individual datagrams. Real-time applications may prefer timely delivery over late retransmissions.`,
    },
    {
      id: "net_tcp-013",
      difficulty: "Medium",
      mcqQuestion: `Can UDP provide reliable communication?`,
      options: [
        "No — UDP is fundamentally unreliable and nothing can change that.",
        "Yes — but only if you use UDP over IPv6.",
        "Yes, at the application layer. A protocol built over UDP can add sequence numbers, ACKs, retransmissions, ordering, and congestion control.",
        "Yes — UDP has a built-in reliability mode that is disabled by default."
      ],
      correctIndex: 2,
      mcqExplanation: `UDP itself provides no reliability guarantees, but applications can build reliable protocols on top of it (e.g., QUIC adds reliability, ordering, congestion control, and encryption over UDP).`,
      originalDocQuestion: `Can UDP provide reliable communication?`,
      originalDocAnswer: `Yes, at the application layer. A protocol built over UDP can add sequence numbers, acknowledgments, retransmissions, ordering, congestion control, and encryption; UDP itself does not supply these guarantees.`,
    },
    {
      id: "net_tcp-014",
      difficulty: "Easy",
      mcqQuestion: `What is DNS?`,
      options: [
        "A protocol that assigns IP addresses to hosts automatically.",
        "A distributed naming system that maps domain names to records such as IP addresses, mail servers, and service metadata.",
        "A Layer 2 protocol for VLAN tagging.",
        "A firewall rule that blocks malicious domain names."
      ],
      correctIndex: 1,
      mcqExplanation: `DNS is a distributed naming system that maps hostnames to IP addresses (A/AAAA records), mail servers (MX), name servers (NS), and more. It lets applications locate services without hard-coding numeric addresses.`,
      originalDocQuestion: `What is DNS?`,
      originalDocAnswer: `DNS is a distributed naming system that maps domain names to records such as IP addresses, mail servers, and service metadata. Applications use it to locate services without hard-coding numeric addresses.`,
    },
    {
      id: "net_tcp-015",
      difficulty: "Medium",
      mcqQuestion: `What is the DNS resolution process?`,
      options: [
        "The client directly contacts the root server, which returns the final IP address immediately.",
        "A stub resolver asks a recursive resolver. If no cached answer exists, the resolver follows the hierarchy through root, TLD, and authoritative servers, then returns and caches the answer.",
        "DNS resolution only works on local networks and cannot resolve Internet hostnames.",
        "The browser converts the hostname to an IP address using its built-in database without contacting any server."
      ],
      correctIndex: 1,
      mcqExplanation: `Stub resolver → recursive resolver → (if not cached) root → TLD → authoritative server → answer cached with TTL. The recursive resolver does the heavy lifting on behalf of the client.`,
      originalDocQuestion: `Explain the DNS resolution process.`,
      originalDocAnswer: `A stub resolver asks a recursive resolver. If no cached answer exists, the resolver follows the DNS hierarchy through root, top-level-domain, and authoritative servers, then returns and caches the answer according to its TTL.`,
    },
    {
      id: "net_tcp-016",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a recursive resolver and an authoritative DNS server?`,
      options: [
        "They are the same thing — both hold official DNS records.",
        "A recursive resolver finds answers on behalf of clients and caches them; an authoritative server holds the official DNS records for a zone.",
        "An authoritative server caches answers; a recursive resolver holds the official records.",
        "A recursive resolver only works with IPv6; an authoritative server only works with IPv4."
      ],
      correctIndex: 1,
      mcqExplanation: `Recursive resolver: finds answers for clients, caches results. Authoritative server: holds the official (authoritative) DNS records for its zones and answers queries for them.`,
      originalDocQuestion: `What is the difference between a recursive resolver and an authoritative DNS server?`,
      originalDocAnswer: `A recursive resolver finds answers on behalf of clients and caches them. An authoritative server holds the official DNS records for a zone and answers queries for that zone.`,
    },
    {
      id: "net_tcp-017",
      difficulty: "Medium",
      mcqQuestion: `What are A, AAAA, CNAME, MX, NS, and PTR records?`,
      options: [
        "A = IPv6, AAAA = IPv4, CNAME = canonical IP, MX = management exchange, NS = network security, PTR = port transfer.",
        "A = IPv4, AAAA = IPv6, CNAME = alias, MX = mail exchangers, NS = name servers, PTR = reverse lookup.",
        "All record types store the same information in different formats.",
        "A = authentication, AAAA = authorization, CNAME = certificate name, MX = master index, NS = network switch, PTR = protocol transfer."
      ],
      correctIndex: 1,
      mcqExplanation: `A: name → IPv4. AAAA: name → IPv6. CNAME: name alias → another name. MX: mail exchangers. NS: authoritative name servers. PTR: IP → name (reverse lookup). TXT: text data (SPF, DKIM, verification).`,
      originalDocQuestion: `What are A, AAAA, CNAME, MX, NS, PTR, and TXT records?`,
      originalDocAnswer: `A maps a name to IPv4; AAAA to IPv6; CNAME aliases one name to another; MX identifies mail exchangers; NS identifies name servers; PTR supports reverse lookup; TXT stores text for verification and email-security records.`,
    },
    {
      id: "net_tcp-018",
      difficulty: "Easy",
      mcqQuestion: `What is DHCP?`,
      options: [
        "A routing protocol that exchanges link-state advertisements between routers.",
        "A protocol that automatically provides clients with IP address, subnet mask, default gateway, DNS servers, and lease duration.",
        "A security protocol that encrypts all network traffic.",
        "A DNS record type used for mail exchange."
      ],
      correctIndex: 1,
      mcqExplanation: `DHCP automatically provides clients with network configuration (IP address, subnet mask, gateway, DNS servers, lease duration), reducing manual configuration errors.`,
      originalDocQuestion: `What is DHCP?`,
      originalDocAnswer: `DHCP automatically provides clients with configuration such as IP address, subnet mask, default gateway, DNS servers, and lease duration. It reduces manual configuration errors.`,
    },
    {
      id: "net_tcp-019",
      difficulty: "Medium",
      mcqQuestion: `What does DORA stand for in DHCP?`,
      options: [
        "Detect, Observe, Receive, Authenticate.",
        "Discover, Offer, Request, Acknowledge.",
        "Deny, Override, Redirect, Allow.",
        "Download, Open, Read, Apply."
      ],
      correctIndex: 1,
      mcqExplanation: `DORA: Discover (client finds servers), Offer (server proposes a lease), Request (client accepts an offer), Acknowledge (server confirms the lease with configuration details).`,
      originalDocQuestion: `Explain the DHCP DORA process.`,
      originalDocAnswer: `DORA stands for Discover, Offer, Request, Acknowledge. The client discovers available DHCP servers, receives an offer, requests a selected lease, and receives acknowledgment with its configuration.`,
    },
    {
      id: "net_tcp-020",
      difficulty: "Medium",
      mcqQuestion: `What is an APIPA address, and what does it indicate?`,
      options: [
        "A public IP address assigned by an ISP for Internet connectivity.",
        "An automatic private IPv4 link-local address (169.254.0.0/16) used when a host cannot obtain DHCP configuration, supporting only same-link communication.",
        "A multicast address used for OSPF hello packets.",
        "An IPv6 address used for DNS resolution."
      ],
      correctIndex: 1,
      mcqExplanation: `APIPA (169.254.0.0/16) is a self-assigned link-local address when DHCP fails. It supports only same-link communication, not routed Internet access. An APIPA address usually signals a DHCP problem.`,
      originalDocQuestion: `What is an APIPA address?`,
      originalDocAnswer: `APIPA is automatic private IPv4 link-local addressing, typically 169.254.0.0/16, used when a host cannot obtain DHCP configuration. It normally supports only same-link communication, not routed internet access.`,
    },
    {
      id: "net_tcp-021",
      difficulty: "Medium",
      mcqQuestion: `What is NAT (Network Address Translation)?`,
      options: [
        "A protocol that encrypts IP headers for secure transmission.",
        "A technology that rewrites IP addresses (and sometimes ports) as packets cross a device, commonly used to connect private IPv4 networks to public addressing.",
        "A routing protocol used between autonomous systems.",
        "A Layer 2 feature that translates MAC addresses between VLANs."
      ],
      correctIndex: 1,
      mcqExplanation: `NAT rewrites IP addresses/ports as packets cross a device. It conserves public IPv4 addresses and separates internal from external addressing. NAT is not the same as a firewall rule.`,
      originalDocQuestion: `What is NAT?`,
      originalDocAnswer: `Network Address Translation rewrites IP addresses and sometimes transport ports as packets cross a device. It is widely used to connect private IPv4 networks to public addressing and to publish selected internal services.`,
    },
    {
      id: "net_tcp-022",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between static NAT, dynamic NAT, and PAT?`,
      options: [
        "They are all the same — one private IP maps to one public IP.",
        "Static NAT = fixed 1:1 mapping; Dynamic NAT = pool-based assignment; PAT (NAT overload) = shares one/few public addresses using port translations.",
        "Static NAT uses IPv6; dynamic NAT uses IPv4; PAT uses both.",
        "Static NAT is used for outbound traffic; dynamic NAT is for inbound; PAT is unused."
      ],
      correctIndex: 1,
      mcqExplanation: `Static NAT: one private → one fixed public. Dynamic NAT: private → public from a pool. PAT (overload): many private → one/few public, distinguished by port numbers. PAT is the most common form.`,
      originalDocQuestion: `Explain static NAT, dynamic NAT, and PAT.`,
      originalDocAnswer: `Static NAT maps a private address to a fixed public address. Dynamic NAT assigns addresses from a pool. PAT, or NAT overload, shares one or a few public addresses by using transport port translations.`,
    },
    {
      id: "net_tcp-023",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between SNAT and DNAT?`,
      options: [
        "SNAT changes the destination address; DNAT changes the source address.",
        "SNAT changes the source address (often for outbound connections); DNAT changes the destination address (commonly for forwarding to internal servers).",
        "SNAT and DNAT are the same operation.",
        "SNAT is used for IPv6; DNAT is used for IPv4."
      ],
      correctIndex: 1,
      mcqExplanation: `SNAT (Source NAT): changes source address — typically for outbound connections from private to public. DNAT (Destination NAT): changes destination address — typically for inbound port forwarding to internal servers.`,
      originalDocQuestion: `What is the difference between SNAT and DNAT?`,
      originalDocAnswer: `SNAT changes the source address, often for outbound connections. DNAT changes the destination address, commonly to forward traffic from a public address/port to an internal server.`,
    },
    {
      id: "net_tcp-024",
      difficulty: "Easy",
      mcqQuestion: `What is port forwarding?`,
      options: [
        "A technique that forwards all traffic from one switch port to another.",
        "A DNAT rule that directs traffic arriving at a specified external IP and port to a chosen internal IP and port.",
        "A method of increasing the speed of a specific network port.",
        "A firewall feature that blocks all inbound traffic on specific ports."
      ],
      correctIndex: 1,
      mcqExplanation: `Port forwarding is a DNAT rule directing external traffic (specific IP:port) to an internal server. It should be limited to necessary services and protected by appropriate security rules.`,
      originalDocQuestion: `What is port forwarding?`,
      originalDocAnswer: `Port forwarding is a DNAT rule that directs traffic arriving at a specified external IP and port to a chosen internal IP and port.`,
    },
    {
      id: "net_tcp-025",
      difficulty: "Medium",
      mcqQuestion: `What are the default ports for DNS, HTTP, HTTPS, SSH, and DHCP?`,
      options: [
        "DNS: 80, HTTP: 53, HTTPS: 22, SSH: 443, DHCP: 25.",
        "DNS: 53, HTTP: 80, HTTPS: 443, SSH: 22, DHCP: 67(server)/68(client).",
        "DNS: 443, HTTP: 8080, HTTPS: 80, SSH: 23, DHCP: 161.",
        "All services use port 80 by default."
      ],
      correctIndex: 1,
      mcqExplanation: `Common defaults: DNS = 53 (TCP/UDP), HTTP = 80 (TCP), HTTPS = 443 (TCP, or QUIC/UDP for HTTP/3), SSH = 22 (TCP), DHCPv4 = 67 server/68 client (UDP). Also: Telnet 23, FTP 20/21, SMTP 25, NTP 123, SNMP 161/162.`,
      originalDocQuestion: `What are the default ports of DNS, DHCP, HTTP, HTTPS, SSH, Telnet, FTP, SMTP, NTP, and SNMP?`,
      originalDocAnswer: `DNS 53 TCP/UDP; DHCPv4 67/68 UDP; HTTP 80 TCP; HTTPS 443 TCP (HTTP/3 QUIC/UDP); SSH 22 TCP; Telnet 23 TCP; FTP 20/21 TCP; SMTP 25 TCP; NTP 123 UDP; SNMP 161/162 UDP.`,
    },
    {
      id: "net_tcp-026",
      difficulty: "Easy",
      mcqQuestion: `What is the difference between HTTP and HTTPS?`,
      options: [
        "HTTP is faster because HTTPS adds encryption overhead. HTTPS is only needed for banking sites.",
        "HTTP is the application protocol for web requests; HTTPS is HTTP carried over TLS, providing encryption, integrity, and server authentication.",
        "HTTP uses UDP; HTTPS uses TCP.",
        "HTTP and HTTPS are identical — the 'S' stands for 'Standard'."
      ],
      correctIndex: 1,
      mcqExplanation: `HTTP = web application protocol. HTTPS = HTTP over TLS, which provides encryption, integrity, and server authentication when certificates are properly validated.`,
      originalDocQuestion: `What is the difference between HTTP and HTTPS?`,
      originalDocAnswer: `HTTP is the application protocol for web requests. HTTPS is HTTP carried over TLS, which provides encryption, integrity, and server authentication when certificates are properly validated.`,
    },
    {
      id: "net_tcp-027",
      difficulty: "Medium",
      mcqQuestion: `What is an ephemeral port?`,
      options: [
        "A permanent port assigned to a well-known service like HTTP (port 80).",
        "A temporary client-side port selected by the OS for outbound connections.",
        "A port used exclusively by DHCP servers.",
        "A virtual port that exists only in VLANs."
      ],
      correctIndex: 1,
      mcqExplanation: `Ephemeral ports are temporary, short-lived ports chosen by the OS for the client side of outbound connections. The available range depends on the OS. They are part of the 5-tuple identifying each flow.`,
      originalDocQuestion: `What is an ephemeral port?`,
      originalDocAnswer: `An ephemeral port is a temporary client-side port selected by the operating system for outbound connections. The available range depends on the operating system and configuration.`,
    },
    {
      id: "net_tcp-028",
      difficulty: "Hard",
      mcqQuestion: `DNS works and ping resolves to an IP, but the website does not load. What could be wrong?`,
      options: [
        "Nothing — if DNS and ping work, the website must also work.",
        "The DNS server is returning an incorrect IP address.",
        "DNS resolution works, but the web service path may fail. Check TCP connectivity to port 80/443, proxy settings, TLS certificates, firewall rules, routing, server health, and application logs.",
        "The website only works with IPv6, and the host is using IPv4."
      ],
      correctIndex: 2,
      mcqExplanation: `Ping tests ICMP, not HTTP. DNS success only proves name resolution. The web path requires TCP 80/443 connectivity, valid TLS certificates, no blocking firewall rules, correct routing, and a healthy application.`,
      originalDocQuestion: `DNS works, and ping resolves to an IP, but the website does not load. What could be wrong?`,
      originalDocAnswer: `Name resolution works, but the web service path may not. Check TCP connectivity to port 80/443, proxy settings, TLS certificates, firewall rules, routing, server health, and application logs; ping alone does not test HTTP.`,
    },
    {
      id: "net_tcp-029",
      difficulty: "Medium",
      mcqQuestion: `Why might ping 8.8.8.8 work while ping google.com fails?`,
      options: [
        "Because 8.8.8.8 is a private IP address that doesn't require DNS.",
        "Because IP connectivity works but DNS resolution is failing or returning an unusable answer.",
        "Because google.com blocks all ICMP traffic.",
        "Because ping only works with IP addresses, never with hostnames."
      ],
      correctIndex: 1,
      mcqExplanation: `If ping by IP works but ping by hostname fails, the issue is likely DNS: resolver misconfiguration, unreachable DNS server, or stale cache. Check resolver configuration and test with dig/nslookup.`,
      originalDocQuestion: `Why might ping 8.8.8.8 work while ping google.com fails?`,
      originalDocAnswer: `IP connectivity may work while DNS resolution fails or returns an unusable answer. Check resolver configuration, dig/nslookup, DNS reachability, and local cache.`,
    },
    {
      id: "net_tcp-030",
      difficulty: "Medium",
      mcqQuestion: `What happens when a DHCP server becomes unavailable?`,
      options: [
        "All devices immediately lose their IP addresses and network connectivity.",
        "Existing clients may continue until leases expire. New clients may fail to get an address or use a link-local (APIPA) address.",
        "The switch automatically assigns IP addresses instead.",
        "DNS takes over the role of DHCP and assigns addresses."
      ],
      correctIndex: 1,
      mcqExplanation: `Existing clients continue with their current leases until expiry. New clients or those whose leases expire may fail to get addresses or self-assign link-local (APIPA) addresses. Redundant DHCP servers improve availability.`,
      originalDocQuestion: `What happens when a DHCP server becomes unavailable?`,
      originalDocAnswer: `Existing clients may continue working until their leases expire. New clients may fail to obtain an address or use a link-local address; redundant DHCP servers and relay configuration can improve availability.`,
    },
    {
      id: "net_tcp-031",
      difficulty: "Medium",
      mcqQuestion: `What is DNS caching, and how does TTL work?`,
      options: [
        "DNS caching stores DNS answers permanently and never refreshes them.",
        "DNS caching stores answers to reduce query load. TTL specifies how long an answer can be cached before a fresh query is needed.",
        "TTL stands for 'Total Transfer Length' and specifies packet size.",
        "DNS caching is a security feature that encrypts DNS responses."
      ],
      correctIndex: 1,
      mcqExplanation: `Resolvers and clients cache DNS answers to reduce latency and query load. TTL (Time to Live) specifies how long a cached answer remains valid. After TTL expires, a fresh query is made.`,
      originalDocQuestion: `What is DNS caching, and how does TTL work?`,
      originalDocAnswer: `Resolvers and clients cache DNS answers to reduce query load and latency. TTL specifies how long an answer can be cached before it should be queried again.`,
    },
    {
      id: "net_tcp-032",
      difficulty: "Hard",
      mcqQuestion: `Can a TCP connection be established even if the application is not functioning correctly?`,
      options: [
        "No — if the application is unhealthy, the TCP handshake will always fail.",
        "Yes — the TCP stack can complete the handshake even if the application is hung, misconfigured, or unable to serve requests.",
        "Yes — but only if the application explicitly allows it.",
        "No — TCP handshake and application health are always linked."
      ],
      correctIndex: 1,
      mcqExplanation: `The kernel's TCP stack completes the handshake independently of the application. An application can be hung, misconfigured, or broken while TCP SYN-ACK succeeds. Always verify with an application-level health check.`,
      originalDocQuestion: `Can a TCP connection be established even if the application is not functioning correctly?`,
      originalDocAnswer: `Yes. The TCP stack can complete the handshake even if the application is hung, misconfigured, or unable to serve requests. Verify an application-level health check or send a valid protocol request.`,
    },
    {
      id: "net_tcp-033",
      difficulty: "Hard",
      mcqQuestion: `If TCP guarantees reliable delivery, why can an application still receive incomplete or invalid data?`,
      options: [
        "TCP's reliability guarantee is broken in modern implementations.",
        "TCP guarantees ordered byte delivery while the connection is viable, but not that application messages are complete or semantically valid. Apps must define framing and validate content.",
        "TCP never guarantees reliable delivery — that's UDP's job.",
        "Applications always receive complete data because TCP handles message framing."
      ],
      correctIndex: 1,
      mcqExplanation: `TCP guarantees ordered delivery of bytes as long as the connection is viable. But it doesn't understand application message boundaries or validate content. Applications must define framing, validate data, handle disconnects, and verify transactions.`,
      originalDocQuestion: `If TCP guarantees reliable delivery, why can an application still receive incomplete or invalid data?`,
      originalDocAnswer: `TCP guarantees ordered delivery of bytes while the connection remains viable, not that the application protocol message is complete or semantically valid. Applications must define framing, validate content, handle disconnects, and verify transaction outcomes.`,
    },
    {
      id: "net_tcp-034",
      difficulty: "Medium",
      mcqQuestion: `What happens when a TCP SYN packet receives no response?`,
      options: [
        "The connection is established with default parameters.",
        "The client retransmits the SYN with increasing delays, eventually timing out. Causes include filtering, routing failure, or a down host.",
        "The client immediately switches to UDP.",
        "The server sends an ICMP error message and the client retries on a different port."
      ],
      correctIndex: 1,
      mcqExplanation: `No SYN-ACK → client retransmits SYN with exponential backoff → eventually times out. Possible causes: packet filtering, routing failure, host down, packet loss, or silent network policy dropping the SYN.`,
      originalDocQuestion: `What happens when a TCP SYN packet receives no response?`,
      originalDocAnswer: `The client generally retransmits the SYN with increasing delays. Eventually the connection attempt times out. The cause could be packet filtering, routing failure, a down host, packet loss, or a silent service/network policy.`,
    },
    {
      id: "net_tcp-035",
      difficulty: "Medium",
      mcqQuestion: `Why might flushing the DNS cache temporarily fix a connectivity problem?`,
      options: [
        "Because flushing the cache permanently fixes the underlying DNS misconfiguration.",
        "Because the cache may contain a stale or incorrect answer. Flushing forces a fresh lookup, but doesn't fix the root cause if the authoritative record or resolver is wrong.",
        "Because DNS caches are always corrupt and need regular flushing.",
        "Because flushing the cache resets the IP address of the host."
      ],
      correctIndex: 1,
      mcqExplanation: `A stale or incorrect cached DNS answer can cause connectivity issues. Flushing forces a fresh lookup from the resolver, which may return the correct current answer. But the root cause (wrong record, resolver issue, TTL policy) remains.`,
      originalDocQuestion: `Why might flushing the DNS cache temporarily fix a connectivity problem?`,
      originalDocAnswer: `The cache may contain a stale or incorrect DNS answer. Flushing forces a fresh lookup, but it does not fix the underlying cause if an authoritative record, resolver, or TTL policy remains wrong.`,
    },
    {
      id: "net_tcp-036",
      difficulty: "Hard",
      mcqQuestion: `What is TLS, and what does a TLS handshake accomplish at a high level?`,
      options: [
        "TLS is a routing protocol that selects the fastest path for encrypted traffic.",
        "The client and server negotiate parameters, authenticate the server via its certificate, establish shared session keys, and protect application data. Details vary by TLS version.",
        "TLS replaces TCP by providing a faster, unencrypted transport layer.",
        "TLS is a DNS security extension that prevents DNS spoofing."
      ],
      correctIndex: 1,
      mcqExplanation: `TLS handshake: negotiate protocol parameters → authenticate server (certificate) → establish shared session keys → protect application data with encryption and integrity. Exact steps vary by TLS version and resumption method.`,
      originalDocQuestion: `What is TLS, and how does a TLS handshake work at a high level?`,
      originalDocAnswer: `The client and server negotiate protocol parameters and cryptographic algorithms, authenticate the server using its certificate, establish shared session keys, and then protect application data.`,
    },
  ],
};
