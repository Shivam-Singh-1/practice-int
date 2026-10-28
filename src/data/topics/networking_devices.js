// Networking Devices and Basic Concepts — Questions 23-42
// Source: Network Engineer Detailed Interview Answers
// Total questions: 20

const networking_devices_DATA = {
  topicId: "networking_devices",
  topicName: "Networking Devices & Basic Concepts",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_dev-001",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a hub, repeater, bridge, switch, and router?`,
      options: [
        "A repeater regenerates signals; a hub repeats bits to all ports; a bridge/switch forwards frames using MAC addresses; a router forwards IP packets between networks.",
        "All five devices perform the same function — they route IP packets between networks.",
        "A hub routes packets; a switch regenerates signals; a router forwards frames by MAC address.",
        "A repeater is a Layer 7 device; a hub is Layer 4; a bridge is Layer 1; a switch is Layer 5; a router is Layer 6."
      ],
      correctIndex: 0,
      mcqExplanation: `Each device operates at a different layer: repeater and hub at Layer 1, bridge and switch at Layer 2, router at Layer 3. A switch limits collision domains per port; a router separates broadcast domains.`,
      originalDocQuestion: `Explain the difference between a hub, repeater, bridge, switch, and router.`,
      originalDocAnswer: `A repeater regenerates signals; a hub repeats incoming bits to all ports; a bridge forwards frames using MAC addresses; a switch is a multiport bridge; and a router forwards IP packets between networks using routing information.`,
    },
    {
      id: "net_dev-002",
      difficulty: "Medium",
      mcqQuestion: `What is a collision domain?`,
      options: [
        "A network segment where all devices share the same IP address.",
        "A network segment where devices could contend for the same shared transmission medium. Each full-duplex switch port provides a separate collision domain.",
        "A VLAN configured with broadcast storm protection.",
        "The area covered by a single Wi-Fi access point's signal."
      ],
      correctIndex: 1,
      mcqExplanation: `Collision domains come from shared-media Ethernet. Modern full-duplex switched Ethernet should not experience ordinary collisions. Each full-duplex switch port is its own collision domain.`,
      originalDocQuestion: `What is a collision domain?`,
      originalDocAnswer: `A collision domain is a network segment where devices could contend for the same shared transmission medium. Each full-duplex switch port normally provides a separate collision domain, and collisions are not expected on a correctly operating full-duplex Ethernet link.`,
    },
    {
      id: "net_dev-003",
      difficulty: "Medium",
      mcqQuestion: `What is a broadcast domain?`,
      options: [
        "The set of devices that receive a Layer 2 broadcast. VLANs separate broadcast domains; routers do not forward ordinary Ethernet broadcasts between them.",
        "A domain name used for broadcasting DNS queries.",
        "The total bandwidth available on a switch uplink.",
        "A group of routers that share the same routing protocol."
      ],
      correctIndex: 0,
      mcqExplanation: `A broadcast domain is bounded by VLANs and routers. Excessive broadcasts consume bandwidth and host CPU. Routers do not forward ordinary Ethernet broadcasts between VLANs.`,
      originalDocQuestion: `What is a broadcast domain?`,
      originalDocAnswer: `A broadcast domain is the set of devices that receive a Layer 2 broadcast. VLANs normally separate broadcast domains; routers do not forward ordinary Ethernet broadcasts between them.`,
    },
    {
      id: "net_dev-004",
      difficulty: "Medium",
      mcqQuestion: `How does a switch learn MAC addresses?`,
      options: [
        "It sends broadcast queries to all connected devices asking for their MAC addresses.",
        "It examines the destination MAC of each frame and records it against the egress port.",
        "It examines the source MAC address of each incoming frame and records that address against the ingress port and VLAN.",
        "MAC addresses are manually configured on every switch port by the administrator."
      ],
      correctIndex: 2,
      mcqExplanation: `The switch learns from the source MAC on the ingress port — not from the destination field. Entries are scoped by VLAN and age out. MAC flapping (a MAC moving between ports) can indicate a loop or device movement.`,
      originalDocQuestion: `How does a switch learn MAC addresses?`,
      originalDocAnswer: `It examines the source MAC address of each incoming frame and records that address against the ingress port and VLAN in its MAC address table. It uses the destination MAC to decide where to forward the frame.`,
    },
    {
      id: "net_dev-005",
      difficulty: "Medium",
      mcqQuestion: `What happens when a switch receives a frame whose destination MAC address is unknown?`,
      options: [
        "The switch drops the frame silently.",
        "The switch sends an ARP request to the default gateway.",
        "The switch floods the frame out all eligible ports in the same VLAN, excluding the ingress port.",
        "The switch forwards it to the router for IP-based routing."
      ],
      correctIndex: 2,
      mcqExplanation: `Unknown-unicast flooding is normal when the destination has not been learned or has aged out. The switch floods the frame within the VLAN (excluding the ingress port) and learns the source MAC from the incoming frame.`,
      originalDocQuestion: `What happens when a switch receives a frame whose destination MAC address is unknown?`,
      originalDocAnswer: `The switch floods the frame out eligible ports in the same VLAN, excluding the ingress port. It learns the source MAC address from the incoming frame, and future traffic may be forwarded directly once the destination is learned.`,
    },
    {
      id: "net_dev-006",
      difficulty: "Easy",
      mcqQuestion: `What happens when a switch receives a frame with a broadcast destination MAC address (FF:FF:FF:FF:FF:FF)?`,
      options: [
        "The switch drops it because broadcast is not supported.",
        "The switch forwards it only to the default gateway.",
        "The switch forwards it to all eligible ports in the same VLAN except the ingress port.",
        "The switch converts it to a unicast frame and forwards it to one device."
      ],
      correctIndex: 2,
      mcqExplanation: `The Ethernet broadcast MAC (FF:FF:FF:FF:FF:FF) is flooded to all ports in the VLAN except the port it arrived on. ARP requests are a common example. Normal Layer 2 broadcasts are not routed between VLANs.`,
      originalDocQuestion: `What happens when a switch receives a frame with a broadcast destination MAC address?`,
      originalDocAnswer: `The switch forwards it to all eligible ports in the same VLAN except the port on which it arrived. Routers normally do not forward that Layer 2 broadcast into other networks.`,
    },
    {
      id: "net_dev-007",
      difficulty: "Medium",
      mcqQuestion: `What is ARP, and why is it required in IPv4?`,
      options: [
        "ARP resolves an IPv4 address to a MAC address on the local link, allowing the host to learn the MAC of the destination (if local) or the default gateway (if remote).",
        "ARP is a routing protocol that replaces OSPF in small networks.",
        "ARP encrypts IPv4 packets before transmission over the local network.",
        "ARP converts IPv4 addresses to IPv6 addresses for dual-stack networks."
      ],
      correctIndex: 0,
      mcqExplanation: `ARP resolves IPv4 to MAC on the local link. If the destination is in the local subnet, the host ARPs for it directly. If remote, it ARPs for the gateway's IP. This distinction is key for diagnosing incomplete ARP entries.`,
      originalDocQuestion: `What is ARP, and why is it required in IPv4?`,
      originalDocAnswer: `ARP resolves an IPv4 address to a MAC address on the local link. A host uses it to learn the MAC of the destination if local, or the MAC of its default gateway if the destination is remote.`,
    },
    {
      id: "net_dev-008",
      difficulty: "Easy",
      mcqQuestion: `What is a default gateway?`,
      options: [
        "A DNS server that resolves hostnames to IP addresses.",
        "The next-hop router a host uses when its routing table has no more-specific route for a destination.",
        "A firewall that blocks all incoming traffic by default.",
        "The fastest network interface on a multi-homed server."
      ],
      correctIndex: 1,
      mcqExplanation: `A default gateway is the next-hop router used when no more-specific route matches. It must be reachable on the host's local subnet. A wrong gateway allows local communication while breaking off-subnet traffic.`,
      originalDocQuestion: `What is a default gateway?`,
      originalDocAnswer: `A default gateway is the next-hop router a host uses when its routing table has no more-specific route for a destination. It must be reachable on an appropriate local network.`,
    },
    {
      id: "net_dev-009",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between unicast, broadcast, multicast, and anycast?`,
      options: [
        "Unicast and broadcast are the same; multicast and anycast are the same.",
        "Unicast targets one receiver; broadcast targets all hosts in an IPv4 domain; multicast targets group members; anycast advertises the same address from multiple locations.",
        "Broadcast targets one receiver; unicast targets all hosts; multicast is used only in IPv6; anycast does not exist.",
        "All four are types of routing protocols, not addressing methods."
      ],
      correctIndex: 1,
      mcqExplanation: `Unicast = one receiver. Broadcast = all hosts in an IPv4 broadcast domain. Multicast = group members. Anycast = same address from multiple locations; routing sends clients to one suitable instance (commonly used for DNS).`,
      originalDocQuestion: `What is the difference between unicast, broadcast, multicast, and anycast?`,
      originalDocAnswer: `Unicast targets one receiver; broadcast targets all hosts in an IPv4 broadcast domain; multicast targets members of a group; and anycast advertises the same address from multiple locations so routing can send a client to one suitable instance.`,
    },
    {
      id: "net_dev-010",
      difficulty: "Easy",
      mcqQuestion: `What is full-duplex versus half-duplex communication?`,
      options: [
        "Full-duplex uses two different protocols; half-duplex uses one.",
        "Full-duplex is wireless only; half-duplex is wired only.",
        "Full-duplex allows sending and receiving simultaneously; half-duplex allows both directions but not at the same time.",
        "Full-duplex is slower but more reliable; half-duplex is faster but less reliable."
      ],
      correctIndex: 2,
      mcqExplanation: `Full-duplex = send and receive at the same time. Half-duplex = communication in both directions, but not simultaneously. Speed/duplex mismatches at both ends can cause poor throughput and errors even when the link indicator stays on.`,
      originalDocQuestion: `What is full-duplex versus half-duplex communication?`,
      originalDocAnswer: `Full-duplex allows sending and receiving at the same time. Half-duplex allows communication in both directions but not simultaneously, so devices share access to the medium.`,
    },
    {
      id: "net_dev-011",
      difficulty: "Medium",
      mcqQuestion: `What is packet loss, and what causes it?`,
      options: [
        "Packet loss means packets arrive out of order but are all eventually delivered.",
        "Packet loss means packets sent at one point do not arrive at the expected next point. Causes include congestion, faulty links, policing, routing changes, or filtering.",
        "Packet loss only occurs on wireless networks, never on wired connections.",
        "Packet loss is when packets are duplicated and both copies arrive at the destination."
      ],
      correctIndex: 1,
      mcqExplanation: `Packet loss means packets sent do not arrive at the expected destination. Causes: congestion/queue overflow, faulty links, interface errors, policing, routing changes, overloaded CPUs, wireless interference, or filtering. Packet captures can detect retransmissions indicating loss.`,
      originalDocQuestion: `What is packet loss, and what causes it?`,
      originalDocAnswer: `Packet loss means packets sent at one point do not arrive at the expected next point. Causes include congestion/queue overflow, faulty links, interface errors, policing, routing changes, overloaded CPUs, wireless interference, or filtering.`,
    },
    {
      id: "net_dev-012",
      difficulty: "Easy",
      mcqQuestion: `What is the difference between a public IP address and a private IP address?`,
      options: [
        "Public and private IP addresses are identical — the terms are interchangeable.",
        "Public addresses are globally routable on the internet; private ranges (10/8, 172.16/12, 192.168/16) are intended for internal networks and are not routed on the public internet.",
        "Private addresses are faster because they bypass Internet routing.",
        "Public addresses are used inside LANs; private addresses are used on the Internet."
      ],
      correctIndex: 1,
      mcqExplanation: `Public addresses are globally routable. Private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are not routed on the public Internet. Organizations commonly use NAT to reach Internet services from private addresses.`,
      originalDocQuestion: `What is the difference between a public IP address and a private IP address?`,
      originalDocAnswer: `Public addresses are globally routable on the internet, subject to routing policy. Private IPv4 ranges are intended for internal networks and are not routed across the public internet; a network commonly uses NAT to reach internet services.`,
    },
    {
      id: "net_dev-013",
      difficulty: "Medium",
      mcqQuestion: `What are the private IPv4 address ranges defined by RFC 1918?`,
      options: [
        "192.0.0.0/8, 10.0.0.0/16, and 172.0.0.0/8.",
        "10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
        "127.0.0.0/8, 169.254.0.0/16, and 224.0.0.0/4.",
        "10.0.0.0/16, 172.0.0.0/12, and 192.168.0.0/24."
      ],
      correctIndex: 1,
      mcqExplanation: `RFC 1918 private ranges: 10.0.0.0/8 (10.0.0.0–10.255.255.255), 172.16.0.0/12 (172.16.0.0–172.31.255.255), and 192.168.0.0/16 (192.168.0.0–192.168.255.255). Note: 172 private range is 172.16–172.31, not the entire 172/8 block.`,
      originalDocQuestion: `What are the private IPv4 address ranges?`,
      originalDocAnswer: `The RFC 1918 ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Addresses from these ranges can be reused independently in different private networks.`,
    },
    {
      id: "net_dev-014",
      difficulty: "Easy",
      mcqQuestion: `Why can two different networks use the same private IP address range?`,
      options: [
        "Because private addresses are globally unique and never overlap.",
        "Because private addresses are not globally unique, so separate organizations can reuse them. If they need to interconnect, overlapping ranges require NAT or renumbering.",
        "Because routers automatically translate private addresses to unique public addresses.",
        "They cannot — using the same private range always causes conflicts."
      ],
      correctIndex: 1,
      mcqExplanation: `Private addresses are not globally unique. Reusing them is fine when networks remain separate. If overlapping private networks need to communicate (VPNs, mergers), routing ambiguity requires renumbering, NAT, or another design.`,
      originalDocQuestion: `Why can two different networks use the same private IP address range?`,
      originalDocAnswer: `Private addresses are not globally unique, so separate organizations can reuse them. If those networks need to interconnect, overlapping ranges may require renumbering, NAT, or another translation design.`,
    },
    {
      id: "net_dev-015",
      difficulty: "Easy",
      mcqQuestion: `What is loopback addressing?`,
      options: [
        "An address used to send traffic to a remote server for testing.",
        "Loopback sends traffic back to the local system. IPv4 uses 127.0.0.0/8 (usually 127.0.0.1); IPv6 uses ::1.",
        "A method of creating redundant network loops for high availability.",
        "An address range reserved for multicast group communication."
      ],
      correctIndex: 1,
      mcqExplanation: `The IPv4 loopback range is 127.0.0.0/8, with 127.0.0.1 commonly used as localhost. IPv6 loopback is ::1. Loopback traffic stays inside the local host — it does not test the physical NIC or remote connectivity.`,
      originalDocQuestion: `What is loopback addressing?`,
      originalDocAnswer: `Loopback sends traffic back to the local system rather than a physical network. IPv4 uses the 127.0.0.0/8 range, usually 127.0.0.1, and IPv6 uses ::1.`,
    },
    {
      id: "net_dev-016",
      difficulty: "Medium",
      mcqQuestion: `What are link-local addresses?`,
      options: [
        "Addresses that are routable across the entire Internet.",
        "Link-local addresses work only on the local link and are not normally routed. IPv4 uses 169.254.0.0/16; IPv6 uses FE80::/10.",
        "Static addresses assigned by an ISP for permanent Internet connectivity.",
        "Addresses used exclusively for DNS resolution."
      ],
      correctIndex: 1,
      mcqExplanation: `IPv4 link-local: 169.254.0.0/16 (APIPA, often signals DHCP failure). IPv6 link-local: fe80::/10. These are meaningful only on the local link and are not routed across routers.`,
      originalDocQuestion: `What are link-local addresses?`,
      originalDocAnswer: `Link-local addresses are intended to work only on the local link and are not normally routed. IPv4 commonly uses 169.254.0.0/16 for automatic link-local addressing; IPv6 uses FE80::/10.`,
    },
    {
      id: "net_dev-017",
      difficulty: "Easy",
      mcqQuestion: `What is the purpose of the IPv4 address 127.0.0.1?`,
      options: [
        "It is the default gateway for all networks.",
        "It is the IPv4 loopback address that tests local TCP/IP and services bound to loopback, but does not prove remote connectivity works.",
        "It is a public IP address assigned to Google's DNS server.",
        "It is a broadcast address that reaches all devices on the network."
      ],
      correctIndex: 1,
      mcqExplanation: `127.0.0.1 tests the local IP stack's loopback path — not the cable, switch port, gateway, or upstream route. A successful ping to 127.0.0.1 does not prove external network connectivity.`,
      originalDocQuestion: `What is the purpose of the IPv4 127.0.0.1 address?`,
      originalDocAnswer: `127.0.0.1 is the IPv4 loopback address. It tests local TCP/IP and services bound to loopback, but it does not prove the physical network, gateway, or remote connectivity works.`,
    },
    {
      id: "net_dev-018",
      difficulty: "Medium",
      mcqQuestion: `A computer has a valid IP address but cannot access the internet. Does that prove the network interface is working correctly?`,
      options: [
        "Yes — a valid IP address means the entire network stack is functional.",
        "No — the interface may have only a local address while the gateway, DNS, VLAN, firewall, routing, physical link quality, or upstream connection is broken.",
        "Yes — if the IP address is valid, all layers above it must also be working.",
        "No — but only because the DNS server might be misconfigured; all other layers are guaranteed to work."
      ],
      correctIndex: 1,
      mcqExplanation: `A valid IP proves only address configuration. The gateway, DNS, VLAN, firewall, routing, physical link quality, or upstream connection could still be broken. Verify each stage independently.`,
      originalDocQuestion: `A computer has a valid IP address but cannot access the internet. Does that prove the network interface is working correctly?`,
      originalDocAnswer: `No. The interface may have only a local address while the gateway, DNS, VLAN, firewall, routing, physical link quality, or upstream connection is broken. Verify each stage independently.`,
    },
    {
      id: "net_dev-019",
      difficulty: "Easy",
      mcqQuestion: `What is the Ethernet broadcast MAC address?`,
      options: [
        "00:00:00:00:00:00",
        "FF:FF:FF:FF:FF:FF",
        "01:00:5E:00:00:01",
        "AA:BB:CC:DD:EE:FF"
      ],
      correctIndex: 1,
      mcqExplanation: `FF:FF:FF:FF:FF:FF is the Ethernet broadcast MAC address. A frame with this destination is flooded to all ports in the VLAN. ARP requests commonly use this address.`,
      originalDocQuestion: `What happens when a switch receives a frame with a broadcast destination MAC address?`,
      originalDocAnswer: `The switch forwards it to all eligible ports in the same VLAN except the port on which it arrived. The Ethernet broadcast MAC is FF:FF:FF:FF:FF:FF.`,
    },
    {
      id: "net_dev-020",
      difficulty: "Medium",
      mcqQuestion: `If the destination IP is in a different subnet, what does a host ARP for?`,
      options: [
        "The host ARPs directly for the remote destination's MAC address.",
        "The host ARPs for its default gateway's IP to learn the gateway's MAC address.",
        "The host does not use ARP — it sends the packet directly to the router using the destination IP.",
        "The host broadcasts an ARP request to all subnets until the destination responds."
      ],
      correctIndex: 1,
      mcqExplanation: `When the destination is outside the local subnet, the host ARPs for its default gateway's IP to learn the gateway's MAC. The host then sends the frame with the gateway's MAC as the destination MAC and the remote IP as the destination IP.`,
      originalDocQuestion: `What is ARP, and why is it required in IPv4?`,
      originalDocAnswer: `ARP resolves an IPv4 address to a MAC address on the local link. If the destination is in the local subnet, the host ARPs for that destination IP. If it is remote, it ARPs for the gateway's IP.`,
    },
  ],
};
