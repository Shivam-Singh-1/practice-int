// IP Addressing and Subnetting — Questions 43-78
// Source: Network Engineer Detailed Interview Answers
// Total questions: 36

const ip_addressing_subnetting_DATA = {
  topicId: "ip_addressing_subnetting",
  topicName: "IP Addressing & Subnetting",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_ip-001",
      difficulty: "Easy",
      mcqQuestion: `What is an IPv4 address, and how many bits does it contain?`,
      options: [
        "A 64-bit address written in hexadecimal groups.",
        "A 32-bit logical address written as four decimal octets, each ranging from 0 to 255.",
        "A 128-bit address used for local link communication.",
        "A 48-bit hardware address burned into a network interface card."
      ],
      correctIndex: 1,
      mcqExplanation: `IPv4 has 32 bits grouped into four 8-bit octets (each 0–255). In CIDR, the prefix length determines the boundary between network and host bits.`,
      originalDocQuestion: `What is an IPv4 address, and how many bits does it contain?`,
      originalDocAnswer: `An IPv4 address is a 32-bit logical address, written as four decimal octets such as 192.168.1.10. Each octet ranges from 0 to 255.`,
    },
    {
      id: "net_ip-002",
      difficulty: "Easy",
      mcqQuestion: `What is an IPv6 address, and how many bits does it use?`,
      options: [
        "A 32-bit address in decimal format, introduced to replace MAC addresses.",
        "A 64-bit address using binary notation.",
        "A 128-bit address written in hexadecimal groups, introduced to provide a vastly larger address space.",
        "A 48-bit address used for backward compatibility with IPv4."
      ],
      correctIndex: 2,
      mcqExplanation: `IPv6 uses 128-bit addresses written as eight hexadecimal groups. It permits zero compression with :: once in an address, uses Neighbor Discovery instead of ARP, and does not use IPv4-style broadcast.`,
      originalDocQuestion: `What is an IPv6 address, and why was IPv6 introduced?`,
      originalDocAnswer: `IPv6 uses 128-bit addresses written in hexadecimal groups. It was introduced mainly to provide a vastly larger address space, while also supporting features such as simpler header processing and standardized autoconfiguration.`,
    },
    {
      id: "net_ip-003",
      difficulty: "Easy",
      mcqQuestion: `What is CIDR notation?`,
      options: [
        "A notation that specifies the MAC address length in hexadecimal.",
        "A notation that appends a prefix length (like /24) to an IP address, telling how many leading bits identify the network.",
        "A notation used exclusively for IPv6 addresses.",
        "A notation that specifies the number of usable hosts directly."
      ],
      correctIndex: 1,
      mcqExplanation: `CIDR (Classless Inter-Domain Routing) appends a prefix length to an address (e.g., /24). The prefix tells how many leading bits are the network portion; remaining bits are for host addressing. A shorter prefix = larger block.`,
      originalDocQuestion: `What is CIDR notation?`,
      originalDocAnswer: `Classless Inter-Domain Routing notation appends a prefix length, such as /24, to an IP address. The prefix tells how many leading bits identify the network; remaining bits are available for host addressing.`,
    },
    {
      id: "net_ip-004",
      difficulty: "Easy",
      mcqQuestion: `What is a subnet mask?`,
      options: [
        "A mask that hides the MAC address from other devices on the network.",
        "A mask that marks network bits as 1 and host bits as 0. For example, 255.255.255.0 is /24.",
        "A filter applied at the application layer to block unwanted traffic.",
        "A mask that encrypts the IP header during transmission."
      ],
      correctIndex: 1,
      mcqExplanation: `A subnet mask has contiguous 1-bits for the network portion and 0-bits for the host portion. A /24 mask = 255.255.255.0 (24 one-bits). The mask is applied bitwise to identify the network portion.`,
      originalDocQuestion: `What is a subnet mask?`,
      originalDocAnswer: `A subnet mask marks network bits as 1 and host bits as 0. For example, 255.255.255.0 is /24, so the first 24 bits identify the network.`,
    },
    {
      id: "net_ip-005",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a network address and a broadcast address in an IPv4 subnet?`,
      options: [
        "The network address has all host bits set to 1; the broadcast address has all host bits set to 0.",
        "The network address has all host bits set to 0 and identifies the subnet; the broadcast address has all host bits set to 1 and targets all hosts on that subnet.",
        "They are the same address used for different purposes.",
        "The broadcast address is always 255.255.255.255 regardless of the subnet."
      ],
      correctIndex: 1,
      mcqExplanation: `For a conventional subnet: network address = all host bits 0 (identifies the subnet), broadcast address = all host bits 1 (targets all hosts). For example, in /24: 192.168.1.0 is network, 192.168.1.255 is broadcast.`,
      originalDocQuestion: `What is the difference between a network address and a broadcast address?`,
      originalDocAnswer: `For a conventional IPv4 subnet, the network address has all host bits set to 0 and identifies the subnet; the broadcast address has all host bits set to 1 and targets all hosts on that subnet.`,
    },
    {
      id: "net_ip-006",
      difficulty: "Medium",
      mcqQuestion: `What is a usable host address?`,
      options: [
        "Any address within the subnet, including network and broadcast addresses.",
        "An address that can be assigned to an interface. In traditional subnets, network and broadcast addresses are excluded. /31 and /32 are special cases.",
        "Only the first and last addresses in a subnet.",
        "An address that has been registered with the Internet Assigned Numbers Authority."
      ],
      correctIndex: 1,
      mcqExplanation: `For ordinary LANs, exclude the all-zero host value (network) and all-one host value (broadcast). /31 can use both addresses on point-to-point links (RFC 3021), and /32 is a single host route.`,
      originalDocQuestion: `What is a usable host address?`,
      originalDocAnswer: `A usable host address can normally be assigned to an interface within an IPv4 subnet. In traditional IPv4 subnets, the network and broadcast addresses are not assignable; /31 point-to-point and /32 host routes are special cases.`,
    },
    {
      id: "net_ip-007",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between classful and classless addressing?`,
      options: [
        "Classful uses variable prefix lengths; classless uses fixed A/B/C boundaries.",
        "Classful used fixed A/B/C network boundaries; classless uses variable prefix lengths (CIDR) for more efficient allocation.",
        "There is no difference — they are the same system with different names.",
        "Classful is used for IPv6; classless is used for IPv4."
      ],
      correctIndex: 1,
      mcqExplanation: `Classful addressing used fixed Class A (/8), B (/16), C (/24) boundaries — wasteful. Classless (CIDR) allows any prefix length, enabling efficient allocation and route aggregation. Modern networks use CIDR.`,
      originalDocQuestion: `What is the difference between classful and classless addressing?`,
      originalDocAnswer: `Classful addressing used fixed A/B/C network boundaries. Classless addressing uses variable prefix lengths, allowing more efficient allocation and route aggregation; modern IP networks use CIDR.`,
    },
    {
      id: "net_ip-008",
      difficulty: "Medium",
      mcqQuestion: `Why is classful addressing largely obsolete?`,
      options: [
        "Because it was only supported by IPv6, which replaced IPv4.",
        "Because fixed class boundaries often wasted addresses and limited flexibility. CIDR allows networks to use the prefix size they need.",
        "Because classful addressing was slower than classless due to hardware limitations.",
        "Because classful addressing required manual MAC address assignments."
      ],
      correctIndex: 1,
      mcqExplanation: `Fixed class boundaries create waste (e.g., a small network assigned a /16 wastes thousands of addresses). CIDR and VLSM allow the prefix to match the required host count more closely.`,
      originalDocQuestion: `Why is classful addressing largely obsolete?`,
      originalDocAnswer: `Fixed class boundaries often wasted addresses and limited flexibility. CIDR lets networks use the prefix size they actually need and allows routes to be summarized.`,
    },
    {
      id: "net_ip-009",
      difficulty: "Medium",
      mcqQuestion: `How many usable host addresses are available in a /24, /26, and /30 subnet?`,
      options: [
        "/24 = 256 usable, /26 = 64 usable, /30 = 4 usable.",
        "/24 = 254 usable, /26 = 62 usable, /30 = 2 usable.",
        "/24 = 128 usable, /26 = 32 usable, /30 = 1 usable.",
        "/24 = 252 usable, /26 = 60 usable, /30 = 0 usable."
      ],
      correctIndex: 1,
      mcqExplanation: `/24: 8 host bits → 256 total − 2 = 254 usable. /26: 6 host bits → 64 total − 2 = 62 usable. /30: 2 host bits → 4 total − 2 = 2 usable (common for point-to-point links).`,
      originalDocQuestion: `What is the purpose of the /24, /26, and /30 prefixes?`,
      originalDocAnswer: `/24 leaves 8 host bits (256 total, usually 254 usable); /26 leaves 6 bits (64 total, usually 62 usable); /30 leaves 2 bits (4 total, usually 2 usable). /30 is common in traditional point-to-point links.`,
    },
    {
      id: "net_ip-010",
      difficulty: "Medium",
      mcqQuestion: `What is VLSM (Variable Length Subnet Masking)?`,
      options: [
        "A method of assigning the same prefix length to all subnets in a network.",
        "A technique that lets different subnets use different prefix lengths within an address block, reducing waste.",
        "A proprietary Cisco feature for VLAN tagging.",
        "A protocol that dynamically changes subnet masks based on traffic load."
      ],
      correctIndex: 1,
      mcqExplanation: `VLSM allows different subnets to use different prefix lengths. Design largest-to-smallest: choose the smallest prefix supplying needed usable hosts, align each block properly, and ensure blocks don't overlap.`,
      originalDocQuestion: `What is VLSM?`,
      originalDocAnswer: `Variable Length Subnet Masking lets different subnets use different prefix lengths within an address block. It reduces waste by giving large and small networks appropriately sized subnets.`,
    },
    {
      id: "net_ip-011",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between subnetting and supernetting?`,
      options: [
        "Subnetting and supernetting are the same operation.",
        "Subnetting divides a larger network into smaller prefixes; supernetting combines contiguous networks into a larger summarized prefix.",
        "Subnetting combines networks; supernetting divides them.",
        "Subnetting is used for IPv4 only; supernetting is used for IPv6 only."
      ],
      correctIndex: 1,
      mcqExplanation: `Subnetting increases prefix length → smaller blocks. Supernetting decreases prefix length → aggregates contiguous aligned blocks. Invalid or overly broad summaries may attract packets for unreachable subnets.`,
      originalDocQuestion: `What is the difference between subnetting and supernetting?`,
      originalDocAnswer: `Subnetting divides a larger network into smaller prefixes. Supernetting combines contiguous networks into a larger summarized prefix when their address ranges align correctly.`,
    },
    {
      id: "net_ip-012",
      difficulty: "Easy",
      mcqQuestion: `For 192.168.1.10/24, what are the network address, broadcast address, and usable host range?`,
      options: [
        "Network: 192.168.1.10, Broadcast: 192.168.1.255, Range: .11–.254.",
        "Network: 192.168.1.0, Broadcast: 192.168.1.255, Range: .1–.254.",
        "Network: 192.168.0.0, Broadcast: 192.168.1.255, Range: .1–.254.",
        "Network: 192.168.1.0, Broadcast: 192.168.1.128, Range: .1–.127."
      ],
      correctIndex: 1,
      mcqExplanation: `/24 = 8 host bits, last octet is host part. Block size = 256 addresses. Network = .0, broadcast = .255, usable = .1 through .254.`,
      originalDocQuestion: `For 192.168.1.10/24, determine the network address, broadcast address, and usable host range.`,
      originalDocAnswer: `A /24 mask is 255.255.255.0. The network is 192.168.1.0, the broadcast is 192.168.1.255, and the conventional usable host range is 192.168.1.1–192.168.1.254.`,
    },
    {
      id: "net_ip-013",
      difficulty: "Medium",
      mcqQuestion: `For 192.168.1.130/26, what are the network and broadcast addresses?`,
      options: [
        "Network: 192.168.1.0, Broadcast: 192.168.1.255.",
        "Network: 192.168.1.128, Broadcast: 192.168.1.191.",
        "Network: 192.168.1.64, Broadcast: 192.168.1.127.",
        "Network: 192.168.1.192, Broadcast: 192.168.1.255."
      ],
      correctIndex: 1,
      mcqExplanation: `/26 mask = 255.255.255.192, block size = 256−192 = 64. Blocks: 0–63, 64–127, 128–191, 192–255. Address 130 falls in the 128–191 block. Network = .128, broadcast = .191, usable = .129–.190.`,
      originalDocQuestion: `For 192.168.1.130/26, determine the network and broadcast addresses.`,
      originalDocAnswer: `A /26 has blocks of 64 addresses: 0–63, 64–127, 128–191, 192–255. The network is 192.168.1.128, broadcast is 192.168.1.191, and usable range is .129–.190.`,
    },
    {
      id: "net_ip-014",
      difficulty: "Medium",
      mcqQuestion: `How many usable host addresses are available in a /25 subnet?`,
      options: [
        "64 usable hosts.",
        "128 usable hosts.",
        "126 usable hosts.",
        "127 usable hosts."
      ],
      correctIndex: 2,
      mcqExplanation: `/25 = 7 host bits. 2^7 = 128 total addresses. 128 − 2 = 126 conventional usable hosts. A common error is subtracting the prefix value itself.`,
      originalDocQuestion: `How many usable host addresses are available in a /25 subnet?`,
      originalDocAnswer: `A /25 leaves 7 host bits, giving 2^7 = 128 total addresses. In a typical IPv4 subnet, 126 are usable after excluding network and broadcast addresses.`,
    },
    {
      id: "net_ip-015",
      difficulty: "Easy",
      mcqQuestion: `How many usable host addresses are available in a /27 subnet?`,
      options: [
        "30 usable hosts.",
        "32 usable hosts.",
        "16 usable hosts.",
        "62 usable hosts."
      ],
      correctIndex: 0,
      mcqExplanation: `/27 = 5 host bits. 2^5 = 32 total. 32 − 2 = 30 usable. Mask = 255.255.255.224, block size = 32.`,
      originalDocQuestion: `How many usable host addresses are available in a /27 subnet?`,
      originalDocAnswer: `A /27 leaves 5 host bits: 2^5 = 32 total addresses, normally 30 usable host addresses.`,
    },
    {
      id: "net_ip-016",
      difficulty: "Easy",
      mcqQuestion: `How many usable host addresses are available in a /29 subnet?`,
      options: [
        "2 usable hosts.",
        "8 usable hosts.",
        "6 usable hosts.",
        "14 usable hosts."
      ],
      correctIndex: 2,
      mcqExplanation: `/29 = 3 host bits. 2^3 = 8 total. 8 − 2 = 6 usable. /29 blocks advance by 8 in the last octet (e.g., .0–.7, .8–.15).`,
      originalDocQuestion: `How many usable host addresses are available in a /29 subnet?`,
      originalDocAnswer: `A /29 leaves 3 host bits: 8 total addresses, normally 6 usable host addresses.`,
    },
    {
      id: "net_ip-017",
      difficulty: "Medium",
      mcqQuestion: `What subnet mask corresponds to /20?`,
      options: [
        "255.255.248.0",
        "255.255.240.0",
        "255.255.224.0",
        "255.255.252.0"
      ],
      correctIndex: 1,
      mcqExplanation: `/20 = 20 leading one-bits. Third octet: 4 bits of the third octet are network → 11110000 = 240. So /20 = 255.255.240.0. Block size in third octet = 256−240 = 16.`,
      originalDocQuestion: `What subnet mask corresponds to /20?`,
      originalDocAnswer: `The /20 mask is 255.255.240.0. It has 20 leading 1 bits, and the block size in the third octet is 16.`,
    },
    {
      id: "net_ip-018",
      difficulty: "Medium",
      mcqQuestion: `What subnet mask corresponds to /23?`,
      options: [
        "255.255.252.0",
        "255.255.254.0",
        "255.255.248.0",
        "255.255.255.0"
      ],
      correctIndex: 1,
      mcqExplanation: `/23 = 255.255.254.0. Third octet advances in blocks of 2, covering two consecutive /24 ranges. 512 total addresses, usually 510 usable.`,
      originalDocQuestion: `What subnet mask corresponds to /23?`,
      originalDocAnswer: `The /23 mask is 255.255.254.0. It spans two consecutive /24-sized ranges and provides 512 total addresses, normally 510 usable hosts.`,
    },
    {
      id: "net_ip-019",
      difficulty: "Medium",
      mcqQuestion: `You need at least 100 usable host addresses. What is the smallest prefix you should choose?`,
      options: [
        "/26 — provides 62 usable hosts.",
        "/25 — provides 126 usable hosts.",
        "/24 — provides 254 usable hosts.",
        "/27 — provides 30 usable hosts."
      ],
      correctIndex: 1,
      mcqExplanation: `Need 2^h − 2 ≥ 100. 7 host bits → 126 usable. 6 host bits → only 62. Therefore /25 (7 host bits) is the smallest prefix meeting the requirement.`,
      originalDocQuestion: `You need at least 100 usable host addresses. Which prefix should you choose?`,
      originalDocAnswer: `A /25 supports 126 conventional usable hosts, so it is the smallest common prefix that meets the requirement. A /26 provides only 62 usable hosts and is too small.`,
    },
    {
      id: "net_ip-020",
      difficulty: "Medium",
      mcqQuestion: `You need four equal subnets from a /24 network. What prefix should you use?`,
      options: [
        "/25 — creates 2 subnets.",
        "/26 — creates 4 subnets with 62 usable hosts each.",
        "/27 — creates 8 subnets.",
        "/28 — creates 16 subnets."
      ],
      correctIndex: 1,
      mcqExplanation: `4 equal subnets require 2 borrowed bits (2^2 = 4). /24 + 2 = /26. Each /26 has 64 total addresses, 62 conventional usable hosts.`,
      originalDocQuestion: `You need four subnets from a /24 network. What prefix could you use?`,
      originalDocAnswer: `Borrow two host bits to create 2^2 = 4 equal subnets, changing /24 to /26. Each subnet contains 64 addresses, usually 62 usable hosts.`,
    },
    {
      id: "net_ip-021",
      difficulty: "Hard",
      mcqQuestion: `You have 192.168.10.0/24 and need eight equal-sized subnets. What prefix and block size result?`,
      options: [
        "/26 with block size 64 — creates 4 subnets.",
        "/28 with block size 16 — creates 16 subnets.",
        "/27 with block size 32 — creates 8 subnets with 30 usable hosts each.",
        "/25 with block size 128 — creates 2 subnets."
      ],
      correctIndex: 2,
      mcqExplanation: `8 subnets = 3 borrowed bits (2^3 = 8). /24 + 3 = /27. Block size = 32. Network addresses: .0, .32, .64, .96, .128, .160, .192, .224. Each block has 30 usable hosts.`,
      originalDocQuestion: `You have 192.168.10.0/24 and need eight equal-sized subnets. Find the subnet ranges.`,
      originalDocAnswer: `Borrow 3 bits, producing eight /27 subnets. Their network addresses are 192.168.10.0, .32, .64, .96, .128, .160, .192, and .224; each block contains 32 addresses with 30 conventional usable hosts.`,
    },
    {
      id: "net_ip-022",
      difficulty: "Hard",
      mcqQuestion: `You have 10.0.0.0/16 and need subnets with at least 500 usable hosts each. What prefix should you select?`,
      options: [
        "/24 — provides 254 usable hosts (too few).",
        "/22 — provides 1022 usable hosts (more than needed).",
        "/23 — provides 510 usable hosts (smallest prefix meeting the requirement).",
        "/25 — provides 126 usable hosts (too few)."
      ],
      correctIndex: 2,
      mcqExplanation: `For 500 usable hosts: /24 = 254 (insufficient). /23 = 9 host bits = 512 total − 2 = 510 usable (meets requirement). /23 is the smallest conventional prefix that works.`,
      originalDocQuestion: `You have 10.0.0.0/16 and need subnets with at least 500 usable hosts each. What prefix would you select?`,
      originalDocAnswer: `A /23 leaves 9 host bits, giving 512 total and 510 conventional usable addresses. A /24 has only 254 usable, so /23 is the smallest suitable prefix.`,
    },
    {
      id: "net_ip-023",
      difficulty: "Medium",
      mcqQuestion: `What is the smallest IPv4 subnet that supports two usable host addresses?`,
      options: [
        "/32 — a single host route.",
        "/31 — uses both addresses on point-to-point links under RFC 3021.",
        "/30 — 4 total addresses, 2 usable (traditional answer). /31 can also work on point-to-point links.",
        "/29 — 8 total addresses, 6 usable."
      ],
      correctIndex: 2,
      mcqExplanation: `Traditionally, /30 is the smallest subnet with 2 usable host addresses (4 total − network − broadcast). RFC 3021 allows /31 on point-to-point links where both addresses are used as endpoints.`,
      originalDocQuestion: `What is the smallest IPv4 subnet that supports two usable host addresses?`,
      originalDocAnswer: `Traditionally, /30 is the smallest subnet with two usable host addresses. Point-to-point links may use /31 under RFC 3021, where both addresses can be used.`,
    },
    {
      id: "net_ip-024",
      difficulty: "Hard",
      mcqQuestion: `How would you divide a /24 network into subnets supporting 100, 50, 25, and 10 hosts using VLSM?`,
      options: [
        "Use /25, /26, /27, /28 respectively, allocating largest first and aligning each block properly.",
        "Use /26 for all four requirements since one size fits all.",
        "Use /24 for each requirement and create four overlapping subnets.",
        "Use /28, /27, /26, /25 — allocate smallest requirement first."
      ],
      correctIndex: 0,
      mcqExplanation: `VLSM, largest first: /25 for 100 (126 usable, 128 addresses), /26 for 50 (62 usable, 64 addresses), /27 for 25 (30 usable, 32 addresses), /28 for 10 (14 usable, 16 addresses). Total = 240 of 256 addresses. Align each at valid boundaries.`,
      originalDocQuestion: `How would you divide a /24 network into subnets supporting 100, 50, 25, and 10 hosts?`,
      originalDocAnswer: `Use VLSM, allocating largest needs first: /25 for 100 hosts (126 usable), /26 for 50 (62 usable), /27 for 25 (30 usable), and /28 for 10 (14 usable). Total = 240 addresses, fits in a /24 if properly aligned.`,
    },
    {
      id: "net_ip-025",
      difficulty: "Hard",
      mcqQuestion: `Given 172.16.5.77/28, what are the network address, broadcast address, and usable range?`,
      options: [
        "Network: 172.16.5.64, Broadcast: 172.16.5.79, Usable: .65–.78.",
        "Network: 172.16.5.48, Broadcast: 172.16.5.63, Usable: .49–.62.",
        "Network: 172.16.5.80, Broadcast: 172.16.5.95, Usable: .81–.94.",
        "Network: 172.16.5.0, Broadcast: 172.16.5.255, Usable: .1–.254."
      ],
      correctIndex: 0,
      mcqExplanation: `/28 mask = 255.255.255.240, block size = 16. Blocks: .48–.63, .64–.79, .80–.95. Address 77 falls in .64–.79. Network = .64, broadcast = .79, usable = .65–.78.`,
      originalDocQuestion: `Given 172.16.5.77/28, calculate the network address, broadcast address, and usable range.`,
      originalDocAnswer: `A /28 has 16-address blocks. Address 77 falls in 172.16.5.64–79. Network is .64, broadcast is .79, usable hosts are .65–.78.`,
    },
    {
      id: "net_ip-026",
      difficulty: "Hard",
      mcqQuestion: `Given 10.1.7.200/27, what are the network and broadcast addresses?`,
      options: [
        "Network: 10.1.7.192, Broadcast: 10.1.7.223.",
        "Network: 10.1.7.224, Broadcast: 10.1.7.255.",
        "Network: 10.1.7.160, Broadcast: 10.1.7.191.",
        "Network: 10.1.7.128, Broadcast: 10.1.7.159."
      ],
      correctIndex: 0,
      mcqExplanation: `/27 mask = 255.255.255.224, block size = 32. Blocks include .160–.191, .192–.223, .224–.255. Address 200 lies in .192–.223. Network = .192, broadcast = .223.`,
      originalDocQuestion: `Given 10.1.7.200/27, calculate the network address and broadcast address.`,
      originalDocAnswer: `A /27 has 32-address blocks. Address 200 falls in the 192–223 block. Network is 10.1.7.192, broadcast is 10.1.7.223; usable range is .193–.222.`,
    },
    {
      id: "net_ip-027",
      difficulty: "Medium",
      mcqQuestion: `Given 192.168.4.64/27, is 192.168.4.95 a host address or a broadcast address?`,
      options: [
        "It is a valid host address.",
        "It is the network address.",
        "It is the broadcast address for the .64/27 block.",
        "It is outside the .64/27 subnet."
      ],
      correctIndex: 2,
      mcqExplanation: `The /27 block starting at .64 spans .64–.95. Within that block, .64 = network (all host bits 0), .95 = broadcast (all host bits 1). So .95 is the broadcast address.`,
      originalDocQuestion: `Given 192.168.4.64/27, is 192.168.4.95 a host address or a broadcast address?`,
      originalDocAnswer: `It is the broadcast address. A /27 block beginning at .64 spans .64–.95, with .64 as network and .95 as broadcast.`,
    },
    {
      id: "net_ip-028",
      difficulty: "Medium",
      mcqQuestion: `Can two devices with the same IP address communicate correctly on the same LAN?`,
      options: [
        "Yes — switches handle duplicate IPs automatically.",
        "Not reliably. ARP can map the shared IP to either device's MAC, causing intermittent or misdirected traffic.",
        "Yes — as long as they have different MAC addresses.",
        "Yes — the router will load-balance between them."
      ],
      correctIndex: 1,
      mcqExplanation: `Duplicate IPv4 addresses cause competing ARP mappings. Switches may learn both MACs on different ports, creating intermittent connections. Fix by checking DHCP leases and static assignments.`,
      originalDocQuestion: `Can two devices with the same IP address communicate correctly on the same LAN?`,
      originalDocAnswer: `Not reliably. ARP can map the shared IP to either device MAC, causing intermittent or misdirected traffic. Find both devices, check DHCP leases/static assignments, and restore unique IP addressing.`,
    },
    {
      id: "net_ip-029",
      difficulty: "Easy",
      mcqQuestion: `Can two devices in different subnets communicate without a router?`,
      options: [
        "Yes — switches can forward traffic between any two subnets.",
        "Yes — as long as they are on the same physical cable.",
        "No — ordinary IP communication between different subnets requires a Layer 3 function such as a router or multilayer switch.",
        "Yes — ARP resolves addresses across subnets automatically."
      ],
      correctIndex: 2,
      mcqExplanation: `A Layer 2 switch forwards within VLANs but does not route between IP subnets. Inter-subnet communication requires a router, multilayer switch, or another Layer 3 mechanism.`,
      originalDocQuestion: `Can two devices in different subnets communicate without a router?`,
      originalDocAnswer: `Ordinary IP communication between different subnets requires a Layer 3 function, such as a router or multilayer switch.`,
    },
    {
      id: "net_ip-030",
      difficulty: "Hard",
      mcqQuestion: `Two computers have IPs 192.168.1.10/24 and 192.168.2.10/24 on the same switch. Can they communicate directly?`,
      options: [
        "Yes — they are on the same switch so the switch forwards frames between them.",
        "Yes — the switch will automatically create a route between the subnets.",
        "Normally no — each considers the other outside its /24, so both send traffic to a default gateway. A router must route between them.",
        "Yes — ARP will resolve across subnets when both are on the same switch."
      ],
      correctIndex: 2,
      mcqExplanation: `Each address is outside the other's /24 subnet. Hosts send traffic to their gateways rather than ARPing for each other. They can communicate only if a Layer 3 device routes between the subnets.`,
      originalDocQuestion: `Two computers have IP addresses 192.168.1.10/24 and 192.168.2.10/24. They are connected to the same switch. Can they communicate directly?`,
      originalDocAnswer: `Normally no. Each host considers the other outside its /24, so it sends traffic to a default gateway. A router or Layer 3 switch must route between the IP subnets.`,
    },
    {
      id: "net_ip-031",
      difficulty: "Hard",
      mcqQuestion: `Two computers have addresses in the same apparent network but different subnet masks. How can that cause problems?`,
      options: [
        "It cannot cause problems — subnet masks are informational only.",
        "Each host uses its own mask to decide between ARP and routing, so one may ARP directly while the other sends its reply to a gateway, causing asymmetric or failed communication.",
        "Different masks automatically trigger a DHCP renewal on both hosts.",
        "Different masks only affect DNS resolution, not IP connectivity."
      ],
      correctIndex: 1,
      mcqExplanation: `A mask mismatch changes local-vs-remote decisions. One host may consider the other local (ARP directly) while the peer treats it as remote (sends to gateway), creating an asymmetric path or dropped return traffic.`,
      originalDocQuestion: `Two computers have addresses in the same apparent network but different subnet masks. How can that cause asymmetric or failed communication?`,
      originalDocAnswer: `Each host uses its own mask to decide between ARP and routing. A host may address the peer directly while the peer sends its reply to a gateway, causing an asymmetric path or dropped return traffic.`,
    },
    {
      id: "net_ip-032",
      difficulty: "Hard",
      mcqQuestion: `Why might a host send traffic to its default gateway even though the destination is physically connected to the same switch?`,
      options: [
        "Because the switch is malfunctioning and not forwarding frames.",
        "Because the host bases locality on its route table and prefix length, not physical switch attachment. If the destination is outside the local prefix, it sends to the gateway.",
        "Because the host always uses the gateway for all traffic regardless of destination.",
        "Because hubs require all traffic to pass through the gateway."
      ],
      correctIndex: 1,
      mcqExplanation: `The host decides based on its routing table and prefix, not physical topology. If the destination doesn't match a connected route, the host forwards the frame to the gateway MAC, regardless of switch attachment.`,
      originalDocQuestion: `Why might a host send traffic to its default gateway even though the destination is physically connected to the same switch?`,
      originalDocAnswer: `The host bases locality on its route table and prefix length, not physical switch attachment. If the destination is outside the local prefix, it sends the frame to the gateway MAC.`,
    },
    {
      id: "net_ip-033",
      difficulty: "Hard",
      mcqQuestion: `What is a directed broadcast address, and why can directed broadcasts be dangerous?`,
      options: [
        "A directed broadcast is a normal unicast to a specific host. It is never dangerous.",
        "A directed broadcast targets all hosts in a remote subnet. Routers usually disable forwarding it because attackers can abuse it for amplification attacks (like Smurf attacks).",
        "A directed broadcast is the same as a multicast address.",
        "A directed broadcast is used only in IPv6 networks."
      ],
      correctIndex: 1,
      mcqExplanation: `A directed broadcast targets the broadcast address of a remote subnet. Forwarding it can multiply spoofed traffic toward many receivers (Smurf attack). Routers commonly disable forwarding to mitigate amplification.`,
      originalDocQuestion: `What is a directed broadcast address, and why can directed broadcasts be dangerous?`,
      originalDocAnswer: `An IPv4 directed broadcast targets all hosts in a remote subnet. Routers usually disable forwarding it because attackers can abuse it for amplification attacks such as Smurf attacks.`,
    },
    {
      id: "net_ip-034",
      difficulty: "Medium",
      mcqQuestion: `What is route aggregation or summarization?`,
      options: [
        "Advertising many specific routes instead of one summary to improve granularity.",
        "Advertising one larger prefix covering multiple contiguous networks instead of many specific routes, reducing routing table size.",
        "A method of encrypting routing updates between routers.",
        "A technique for assigning IP addresses dynamically using DHCP."
      ],
      correctIndex: 1,
      mcqExplanation: `Route summarization advertises one larger prefix covering multiple contiguous networks, shrinking routing tables and improving scalability. The summary must not attract traffic for unreachable destinations.`,
      originalDocQuestion: `What is route aggregation or summarization?`,
      originalDocAnswer: `Route summarization advertises one larger prefix covering multiple contiguous networks instead of many specific routes. It can shrink routing tables and improve scalability.`,
    },
    {
      id: "net_ip-035",
      difficulty: "Medium",
      mcqQuestion: `What is the /20 block size in the third octet?`,
      options: [
        "8",
        "32",
        "16",
        "64"
      ],
      correctIndex: 2,
      mcqExplanation: `/20 mask = 255.255.240.0. Third-octet mask value = 240. Block size = 256 − 240 = 16. Network boundaries occur at third-octet values 0, 16, 32, 48, etc.`,
      originalDocQuestion: `What subnet mask corresponds to /20?`,
      originalDocAnswer: `A /20 mask is 255.255.240.0. Since the third-octet mask value is 240, its block size is 256−240=16, so network boundaries occur at third-octet values 0, 16, 32, 48, etc.`,
    },
    {
      id: "net_ip-036",
      difficulty: "Medium",
      mcqQuestion: `What is the formula to calculate usable hosts in a standard IPv4 subnet?`,
      options: [
        "2^prefix_length − 2.",
        "2^(32 − prefix_length) − 2.",
        "2^(prefix_length) + 2.",
        "32 − prefix_length."
      ],
      correctIndex: 1,
      mcqExplanation: `Host bits = 32 − prefix_length. Total addresses = 2^host_bits. Usable hosts = 2^host_bits − 2 (subtracting network and broadcast addresses). For /24: 2^8 − 2 = 254.`,
      originalDocQuestion: `How many usable host addresses are available in a /25 subnet?`,
      originalDocAnswer: `A /25 leaves 7 host bits. 2^7 = 128 total addresses. 128 − 2 = 126 usable hosts. The formula is 2^(32 − prefix_length) − 2.`,
    },
  ],
};
