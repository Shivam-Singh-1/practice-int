// Switching and Layer 2 Networking — Questions 133-168
// Source: Network Engineer Detailed Interview Answers
// Total questions: 30

const switching_layer2_DATA = {
  topicId: "switching_layer2",
  topicName: "Switching & Layer 2 Networking",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_sw-001",
      difficulty: "Easy",
      mcqQuestion: `What is a VLAN (Virtual LAN)?`,
      options: [
        "A physical cable connecting two switches.",
        "A logical Layer 2 broadcast domain configured on switching infrastructure, letting one physical network carry separated groups of devices.",
        "A type of IP address used for multicast communication.",
        "A routing protocol used between autonomous systems."
      ],
      correctIndex: 1,
      mcqExplanation: `A VLAN is a logical broadcast domain on switches. It segments traffic, reduces unnecessary broadcasts, and supports security policies. Communication between VLANs requires Layer 3 routing.`,
      originalDocQuestion: `What is a VLAN?`,
      originalDocAnswer: `A Virtual LAN is a logical Layer 2 broadcast domain configured on switching infrastructure. VLANs let one physical switching network carry separated groups of devices.`,
    },
    {
      id: "net_sw-002",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between an access port and a trunk port?`,
      options: [
        "Access ports carry multiple VLANs with tags; trunk ports carry one untagged VLAN.",
        "An access port carries one VLAN for an endpoint (untagged frames); a trunk carries multiple VLANs using 802.1Q tags between switches.",
        "Access ports are physical ports; trunk ports are virtual ports.",
        "There is no difference — both terms describe the same port type."
      ],
      correctIndex: 1,
      mcqExplanation: `Access port = one VLAN, untagged frames, connects endpoints. Trunk port = multiple VLANs, 802.1Q tagged frames, connects switches/routers. A trunk can be up while one specific VLAN is missing.`,
      originalDocQuestion: `What is the difference between an access port and a trunk port?`,
      originalDocAnswer: `An access port normally carries one VLAN for an endpoint and sends/receives untagged frames. A trunk carries multiple VLANs, usually using 802.1Q tags, between switches or other network devices.`,
    },
    {
      id: "net_sw-003",
      difficulty: "Medium",
      mcqQuestion: `What is IEEE 802.1Q?`,
      options: [
        "A wireless networking standard for Wi-Fi.",
        "A standard that defines VLAN tagging for Ethernet frames, allowing many VLANs to share one trunk link.",
        "A security protocol for encrypting Layer 2 frames.",
        "A spanning tree protocol version."
      ],
      correctIndex: 1,
      mcqExplanation: `802.1Q defines VLAN tagging. A 4-byte tag is inserted into the Ethernet frame identifying the VLAN and including priority fields. This allows multiple VLANs to share a single trunk link.`,
      originalDocQuestion: `What is IEEE 802.1Q?`,
      originalDocAnswer: `802.1Q defines VLAN tagging for Ethernet frames. A tag identifies the VLAN and includes priority-related fields, allowing many VLANs to share one trunk link.`,
    },
    {
      id: "net_sw-004",
      difficulty: "Medium",
      mcqQuestion: `What is the native VLAN on an 802.1Q trunk?`,
      options: [
        "The VLAN that carries all management traffic exclusively.",
        "The VLAN whose frames are sent untagged on a trunk. The native VLAN must match on both ends to avoid misclassification.",
        "The VLAN with the highest priority on the trunk.",
        "A special VLAN that cannot carry any user traffic."
      ],
      correctIndex: 1,
      mcqExplanation: `The native VLAN's frames travel untagged on an 802.1Q trunk. If native VLANs don't match on both ends, frames get misclassified — a security issue (VLAN hopping) and a troubleshooting pitfall.`,
      originalDocQuestion: `What is the native VLAN on an 802.1Q trunk?`,
      originalDocAnswer: `The native VLAN is the VLAN whose frames are sent untagged on a typical 802.1Q trunk. Native VLAN configuration should match on both ends to avoid misclassification and security issues.`,
    },
    {
      id: "net_sw-005",
      difficulty: "Easy",
      mcqQuestion: `Can devices in different VLANs communicate directly through Layer 2 switching?`,
      options: [
        "Yes — switches can forward frames between any VLANs.",
        "No — they need a Layer 3 router or multilayer switch to route packets between the VLAN IP networks.",
        "Yes — if they share the same subnet mask.",
        "Yes — if the native VLAN is configured correctly."
      ],
      correctIndex: 1,
      mcqExplanation: `Layer 2 switches forward within VLANs only. Inter-VLAN traffic requires a Layer 3 device (router, multilayer switch) to route between the IP subnets assigned to each VLAN.`,
      originalDocQuestion: `Can devices in different VLANs communicate directly?`,
      originalDocAnswer: `Not through ordinary Layer 2 switching alone. They need a Layer 3 router or multilayer switch to route packets between the VLAN IP networks.`,
    },
    {
      id: "net_sw-006",
      difficulty: "Medium",
      mcqQuestion: `What is inter-VLAN routing?`,
      options: [
        "A Layer 2 feature that forwards frames between VLANs without routing.",
        "Layer 3 forwarding between IP subnets assigned to different VLANs, implemented via router subinterfaces, per-VLAN interfaces, or a multilayer switch.",
        "A STP feature that blocks traffic between VLANs.",
        "A DHCP feature that assigns different IP ranges to each VLAN."
      ],
      correctIndex: 1,
      mcqExplanation: `Inter-VLAN routing = Layer 3 forwarding between VLAN subnets. Methods: router-on-a-stick (subinterfaces on a trunk), dedicated router interfaces per VLAN, or multilayer switch with SVI interfaces.`,
      originalDocQuestion: `What is inter-VLAN routing?`,
      originalDocAnswer: `Inter-VLAN routing is Layer 3 forwarding between IP subnets assigned to different VLANs. It can be implemented with router subinterfaces, one router interface per VLAN, or a multilayer switch.`,
    },
    {
      id: "net_sw-007",
      difficulty: "Medium",
      mcqQuestion: `What is a router-on-a-stick configuration?`,
      options: [
        "A router with multiple physical interfaces, one per VLAN.",
        "A single physical router interface connecting to a switch trunk, with multiple logical subinterfaces, each assigned a VLAN tag and gateway IP.",
        "A switch configured to act as both a router and a firewall.",
        "A redundant router setup using VRRP or HSRP."
      ],
      correctIndex: 1,
      mcqExplanation: `Router-on-a-stick: one physical interface → trunk link → multiple subinterfaces, each with an 802.1Q VLAN tag and IP gateway. The router routes between subinterfaces for inter-VLAN traffic.`,
      originalDocQuestion: `How can a router-on-a-stick configuration enable inter-VLAN communication?`,
      originalDocAnswer: `A single physical router interface connects to a switch trunk and has multiple logical subinterfaces, each assigned a VLAN tag and gateway IP. The router routes packets between those subinterfaces.`,
    },
    {
      id: "net_sw-008",
      difficulty: "Medium",
      mcqQuestion: `What is a MAC address table?`,
      options: [
        "A table that maps IP addresses to routes on a router.",
        "A table that maps learned MAC addresses to switch ports and VLANs, used to forward unicast frames efficiently.",
        "A table that stores firewall rules for Layer 2 traffic.",
        "A table that tracks DHCP leases on a server."
      ],
      correctIndex: 1,
      mcqExplanation: `The MAC address table maps MAC addresses to ports/VLANs. Switches use it to forward known unicast frames to the correct port instead of flooding. Entries are learned from source MACs and age out.`,
      originalDocQuestion: `What is a MAC address table?`,
      originalDocAnswer: `A MAC address table maps learned MAC addresses to switch ports and VLANs. The switch uses this information to forward unicast frames efficiently rather than flooding every frame.`,
    },
    {
      id: "net_sw-009",
      difficulty: "Medium",
      mcqQuestion: `What is a Layer 2 switching loop, and why is it dangerous?`,
      options: [
        "A loop where IP packets are routed in circles. It's harmless because TTL prevents infinite circulation.",
        "A loop where Ethernet frames circulate indefinitely because frames have no hop limit like IP TTL, causing broadcast storms and unstable MAC learning.",
        "A loop created by misconfigured VLANs that only affects management traffic.",
        "A loop that occurs only in wireless networks."
      ],
      correctIndex: 1,
      mcqExplanation: `Ethernet frames have no TTL/hop limit, so a loop causes frames to circulate indefinitely. Broadcasts multiply, creating a broadcast storm that wastes bandwidth and can make an entire VLAN unusable.`,
      originalDocQuestion: `What is a Layer 2 switching loop?`,
      originalDocAnswer: `A Layer 2 loop occurs when redundant paths allow Ethernet frames to circulate indefinitely. Broadcasts and unknown unicasts can multiply, causing a broadcast storm and unstable MAC learning.`,
    },
    {
      id: "net_sw-010",
      difficulty: "Medium",
      mcqQuestion: `What is STP (Spanning Tree Protocol), and why is it needed?`,
      options: [
        "STP is a routing protocol that finds the shortest path between routers.",
        "STP detects redundant Layer 2 paths and blocks selected ports to create a loop-free logical topology while preserving redundancy.",
        "STP encrypts Layer 2 frames to prevent eavesdropping.",
        "STP assigns VLANs to ports automatically."
      ],
      correctIndex: 1,
      mcqExplanation: `STP prevents Layer 2 loops by electing a root bridge, calculating preferred paths, and blocking redundant ports. It preserves physical redundancy while maintaining a loop-free forwarding topology.`,
      originalDocQuestion: `What is STP, and why is it needed?`,
      originalDocAnswer: `Spanning Tree Protocol detects redundant Layer 2 paths and blocks selected ports to create a loop-free logical topology. It preserves redundancy while preventing loops.`,
    },
    {
      id: "net_sw-011",
      difficulty: "Medium",
      mcqQuestion: `How does STP prevent loops?`,
      options: [
        "By disabling all but one switch port in the network.",
        "Switches exchange BPDUs, elect a root bridge, calculate preferred paths, and place redundant ports into blocking/discarding states.",
        "By limiting the number of VLANs to one per switch.",
        "By converting all links to half-duplex mode."
      ],
      correctIndex: 1,
      mcqExplanation: `STP process: exchange BPDUs → elect root bridge (lowest Bridge ID) → calculate best paths to root → assign port roles (root/designated) → block redundant ports. Recalculates when topology changes.`,
      originalDocQuestion: `How does the Spanning Tree Protocol prevent loops?`,
      originalDocAnswer: `Switches exchange BPDUs, elect a root bridge, calculate preferred paths to the root, and place redundant ports into blocking/discarding states.`,
    },
    {
      id: "net_sw-012",
      difficulty: "Medium",
      mcqQuestion: `What is a root bridge in STP?`,
      options: [
        "The switch with the most ports in the network.",
        "The logical reference point for STP path calculations; other switches choose their best path toward it based on Bridge IDs and path costs.",
        "Any switch that has PortFast enabled on all ports.",
        "The switch that was powered on first."
      ],
      correctIndex: 1,
      mcqExplanation: `The root bridge is the STP reference point. The switch with the lowest Bridge ID (priority + MAC) wins the election. Administrators normally set the intended root priority deliberately.`,
      originalDocQuestion: `What is a root bridge?`,
      originalDocAnswer: `The root bridge is the logical reference point for STP path calculations. Other switches choose their best path toward it, based on bridge IDs and path costs.`,
    },
    {
      id: "net_sw-013",
      difficulty: "Medium",
      mcqQuestion: `How is the STP root bridge elected?`,
      options: [
        "By the switch with the highest MAC address.",
        "By the switch with the lowest Bridge ID (priority + MAC address). Administrators normally set the intended root priority.",
        "By manual administrator selection — STP cannot elect automatically.",
        "By the switch with the most trunk links."
      ],
      correctIndex: 1,
      mcqExplanation: `Root election: lowest Bridge ID wins. Bridge ID = priority (configurable, includes VLAN/system ID extension) + MAC address. Set priority intentionally to control which switch becomes root.`,
      originalDocQuestion: `How is the STP root bridge elected?`,
      originalDocAnswer: `The switch with the lowest Bridge ID wins. Bridge ID combines bridge priority and MAC address; administrators normally set the intended root priority deliberately.`,
    },
    {
      id: "net_sw-014",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between STP, RSTP, and MSTP?`,
      options: [
        "They are all the same protocol with different vendor names.",
        "STP (802.1D) converges slowly; RSTP (802.1w) speeds up convergence with improved handshakes; MSTP maps multiple VLANs to spanning-tree instances for scalability.",
        "STP is for LANs; RSTP is for WANs; MSTP is for the Internet.",
        "STP uses OSPF; RSTP uses BGP; MSTP uses RIP."
      ],
      correctIndex: 1,
      mcqExplanation: `Classic STP (802.1D): slower convergence. RSTP (802.1w): faster convergence with improved port roles and handshakes. MSTP: maps multiple VLANs to STP instances, improving scalability in multi-VLAN environments.`,
      originalDocQuestion: `What is the difference between STP, RSTP, and MSTP?`,
      originalDocAnswer: `Classic STP (802.1D) converges relatively slowly. RSTP (802.1w) speeds up transition using improved port roles and handshakes. MSTP maps multiple VLANs to spanning-tree instances to improve scalability.`,
    },
    {
      id: "net_sw-015",
      difficulty: "Medium",
      mcqQuestion: `What is PortFast, and where should it be used?`,
      options: [
        "A feature that increases the speed of a switch port. Use it everywhere.",
        "A feature that allows an edge port to move rapidly to forwarding state. Use it only on end-device ports, not on switch-to-switch links.",
        "A feature that disables STP on all switch ports.",
        "A feature that enables VLAN trunking on access ports."
      ],
      correctIndex: 1,
      mcqExplanation: `PortFast skips STP listening/learning states, moving immediately to forwarding. Use only on edge ports (PCs, servers, printers) — never on switch-to-switch links, as it could cause loops.`,
      originalDocQuestion: `What is PortFast, and where should it be used?`,
      originalDocAnswer: `PortFast allows an edge port to move rapidly to forwarding instead of waiting through normal spanning-tree transitions. Use it on end-device ports, not on ordinary switch-to-switch links.`,
    },
    {
      id: "net_sw-016",
      difficulty: "Medium",
      mcqQuestion: `What is BPDU Guard?`,
      options: [
        "A feature that encrypts BPDU packets for security.",
        "A feature that disables or protects an edge port if it receives a spanning-tree BPDU, indicating a switch was connected where an endpoint was expected.",
        "A feature that increases the priority of BPDUs on trunk links.",
        "A feature that forwards BPDUs between VLANs."
      ],
      correctIndex: 1,
      mcqExplanation: `BPDU Guard shuts down an edge port (typically a PortFast port) if it receives a BPDU. This indicates a switch was connected where an endpoint was expected, helping prevent accidental loops.`,
      originalDocQuestion: `What is BPDU Guard?`,
      originalDocAnswer: `BPDU Guard disables or protects an edge port if it receives a spanning-tree BPDU, which can indicate that a switch was connected where an endpoint was expected. It helps prevent accidental loops.`,
    },
    {
      id: "net_sw-017",
      difficulty: "Medium",
      mcqQuestion: `What is EtherChannel?`,
      options: [
        "A protocol for encrypting Ethernet frames.",
        "A technology that bundles multiple physical Ethernet links into one logical link, providing aggregate capacity across multiple flows and improved resilience.",
        "A VLAN tagging protocol that replaces 802.1Q.",
        "A routing protocol used between switches."
      ],
      correctIndex: 1,
      mcqExplanation: `EtherChannel bundles physical links into one logical link. Aggregate capacity across multiple flows, redundancy when a member fails. Traffic distributed by hash — a single flow stays on one member link.`,
      originalDocQuestion: `What is EtherChannel?`,
      originalDocAnswer: `EtherChannel bundles multiple physical Ethernet links into one logical link. It provides aggregate capacity across multiple flows and can improve resilience when one member link fails.`,
    },
    {
      id: "net_sw-018",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between LACP and PAgP?`,
      options: [
        "LACP is a Cisco-proprietary protocol; PAgP is the IEEE standard.",
        "LACP is an IEEE open standard (802.1AX) for link aggregation; PAgP is Cisco-proprietary. Devices must use compatible protocols.",
        "Both are identical protocols from different vendors.",
        "LACP is for wireless links; PAgP is for wired links."
      ],
      correctIndex: 1,
      mcqExplanation: `LACP = IEEE 802.1AX (open standard). PAgP = Cisco proprietary. Both coordinate member links for aggregation, but devices must use the same protocol. LACP is preferred for multi-vendor environments.`,
      originalDocQuestion: `What is the difference between LACP and PAgP?`,
      originalDocAnswer: `LACP is an IEEE open standard (802.1AX) for link aggregation. PAgP is Cisco-proprietary. Both help coordinate member links, but devices must use compatible protocols and settings.`,
    },
    {
      id: "net_sw-019",
      difficulty: "Hard",
      mcqQuestion: `Four physical links are bundled in an EtherChannel. Why might one TCP flow still use only one link?`,
      options: [
        "Because EtherChannel randomly distributes individual packets across all links.",
        "Because the bundle uses a flow hash to keep packets in order. A single flow maps to one member, so one flow cannot automatically use four times the bandwidth.",
        "Because EtherChannel only works with UDP, not TCP.",
        "Because the switch disables three links and uses only one at a time."
      ],
      correctIndex: 1,
      mcqExplanation: `EtherChannel uses a hash of flow fields (src/dst MAC, IP, ports) to assign flows to member links. This keeps packets in order but means a single flow uses only one link. Aggregate capacity benefits multiple concurrent flows.`,
      originalDocQuestion: `Four physical links are bundled in an EtherChannel. Why might one TCP flow still use only one link?`,
      originalDocAnswer: `The bundle commonly uses a flow hash to keep packets in order. A single flow maps to one member, so aggregate capacity is most useful across multiple flows.`,
    },
    {
      id: "net_sw-020",
      difficulty: "Hard",
      mcqQuestion: `Devices in the same VLAN on one switch can communicate, but devices in the same VLAN on another switch cannot. What would you check?`,
      options: [
        "Only the IP addresses on both switches.",
        "The inter-switch link state, trunk mode, VLAN allowed list, VLAN existence on both switches, native VLAN consistency, STP state, and MAC learning.",
        "Only the DNS configuration on both switches.",
        "Only the default gateway on the second switch."
      ],
      correctIndex: 1,
      mcqExplanation: `Check: inter-switch link up? → trunk mode correct? → VLAN in allowed list on both sides? → VLAN exists/active on both switches? → native VLAN consistent? → STP not blocking? → MAC learning normal? → port-security rules?`,
      originalDocQuestion: `Devices in the same VLAN on one switch can communicate, but devices in the same VLAN on another switch cannot. What would you check?`,
      originalDocAnswer: `Check the inter-switch link state, trunk mode, VLAN allowed list, VLAN existence on both switches, native VLAN consistency, STP state, MAC learning, and any port-security rules.`,
    },
    {
      id: "net_sw-021",
      difficulty: "Hard",
      mcqQuestion: `A trunk is up, but traffic for one VLAN is not passing. What could be wrong?`,
      options: [
        "The trunk automatically carries all VLANs, so this cannot happen.",
        "The VLAN may be missing, pruned, excluded from the allowed VLAN list, blocked by STP, or mapped incorrectly at an endpoint.",
        "The trunk cable must be replaced because VLANs cannot be filtered.",
        "The VLAN MTU is too large for the trunk link."
      ],
      correctIndex: 1,
      mcqExplanation: `A trunk can be up while a specific VLAN is missing. Check: VLAN exists on both switches → in the trunk allowed-VLAN list → not pruned → STP not blocking → tagging/native VLAN consistent → VLAN interface/gateway configured.`,
      originalDocQuestion: `A trunk is up, but traffic for one VLAN is not passing. What could be wrong?`,
      originalDocAnswer: `The VLAN may be missing, pruned or excluded from the allowed VLAN list, blocked by STP, tagged unexpectedly, or mapped incorrectly at an endpoint.`,
    },
    {
      id: "net_sw-022",
      difficulty: "Hard",
      mcqQuestion: `Why can enabling PortFast on a switch-to-switch link be dangerous?`,
      options: [
        "PortFast has no effect on switch-to-switch links.",
        "PortFast skips STP transitions. On a switch-to-switch link, a loop can start forwarding before STP converges, causing a broadcast storm.",
        "PortFast reduces the link speed on inter-switch connections.",
        "PortFast encrypts frames, which other switches cannot decrypt."
      ],
      correctIndex: 1,
      mcqExplanation: `PortFast bypasses STP's listening/learning states. On an inter-switch link, this means the port forwards immediately, potentially creating a loop before STP can detect and block it. Use PortFast only on edge ports.`,
      originalDocQuestion: `Why can enabling PortFast on an inappropriate switch-to-switch link be dangerous?`,
      originalDocAnswer: `PortFast skips normal spanning-tree delay on an edge port. If that port connects to another switch, a loop can begin forwarding before STP converges.`,
    },
    {
      id: "net_sw-023",
      difficulty: "Hard",
      mcqQuestion: `A network experiences broadcast storms after someone connects a cable. How would you investigate?`,
      options: [
        "Reboot all switches simultaneously to clear the problem.",
        "Look for rapidly rising broadcast counters, MAC flapping, saturated links, and STP topology changes. Identify the looped segment, isolate the suspected link, and verify STP.",
        "Increase the bandwidth on all trunk links to absorb the extra traffic.",
        "Disable all VLANs to stop the broadcasts."
      ],
      correctIndex: 1,
      mcqExplanation: `Broadcast storm investigation: check broadcast counters → MAC flapping logs → STP topology changes → switch port logs → identify the new cable/loop → safely shut the suspected port → verify STP health → restore redundancy carefully.`,
      originalDocQuestion: `A network experiences broadcast storms after someone connects a cable. How would you investigate?`,
      originalDocAnswer: `Look for rapidly rising broadcast counters, MAC flapping, saturated links, and STP topology changes. Identify the looped segment, safely shut or isolate the suspected link, verify STP and restore redundancy carefully.`,
    },
    {
      id: "net_sw-024",
      difficulty: "Medium",
      mcqQuestion: `What is a multilayer switch?`,
      options: [
        "A switch that only operates at Layer 1, repeating electrical signals.",
        "A switch that combines Layer 2 switching with Layer 3 routing capabilities, able to switch within VLANs and route between VLAN interfaces.",
        "A switch that operates exclusively at Layer 7 for application inspection.",
        "A switch that requires an external router for all inter-VLAN traffic."
      ],
      correctIndex: 1,
      mcqExplanation: `A multilayer switch combines L2 switching (MAC-based forwarding within VLANs) with L3 routing (IP-based forwarding between VLANs) at high speed, often using SVIs (Switch Virtual Interfaces) as VLAN gateways.`,
      originalDocQuestion: `What is a multilayer switch?`,
      originalDocAnswer: `A multilayer switch combines Layer 2 switching with Layer 3 routing capabilities. It can switch within VLANs and route between VLAN interfaces at high speed.`,
    },
    {
      id: "net_sw-025",
      difficulty: "Medium",
      mcqQuestion: `What happens when two switches have different native VLAN configurations on a trunk?`,
      options: [
        "Nothing — native VLAN mismatch has no impact.",
        "Untagged frames may be assigned to different VLANs at each end, causing traffic leakage, misdelivery, or connectivity problems.",
        "The trunk automatically negotiates a common native VLAN.",
        "Both switches will shut down the trunk port immediately."
      ],
      correctIndex: 1,
      mcqExplanation: `Native VLAN mismatch = untagged frames classified into different VLANs at each end → traffic leakage, misdelivery, potential VLAN hopping security issue. Always configure native VLAN consistently.`,
      originalDocQuestion: `What happens when two switches have different native VLAN configurations?`,
      originalDocAnswer: `Untagged frames may be assigned to different VLANs at each end, causing traffic leakage, misdelivery, or connectivity problems.`,
    },
    {
      id: "net_sw-026",
      difficulty: "Medium",
      mcqQuestion: `How does MAC address table aging work on a switch?`,
      options: [
        "MAC entries are permanent and never expire.",
        "Dynamic MAC entries expire after an inactivity timer. The switch relearns an address when it sees a new frame with that source MAC.",
        "MAC entries are deleted only when the switch is rebooted.",
        "MAC entries age out based on the IP TTL of the last packet."
      ],
      correctIndex: 1,
      mcqExplanation: `Dynamic MAC entries have an aging timer (typically 300 seconds). After inactivity, the entry expires and is removed. The switch relearns the address when it sees a new frame from that source. This handles device moves and disconnects.`,
      originalDocQuestion: `How does a switch handle MAC address table aging?`,
      originalDocAnswer: `Dynamic MAC entries expire after an inactivity timer. The switch relearns an address when it sees a frame with that source MAC; aging removes stale mappings after devices move or disappear.`,
    },
    {
      id: "net_sw-027",
      difficulty: "Easy",
      mcqQuestion: `Why do organizations use VLANs?`,
      options: [
        "VLANs increase the physical speed of network connections.",
        "VLANs separate broadcast domains, reduce unnecessary broadcast traffic, organize devices by function, and support segmentation and security policies.",
        "VLANs replace the need for IP addresses.",
        "VLANs are only used for wireless network management."
      ],
      correctIndex: 1,
      mcqExplanation: `VLANs provide: broadcast domain separation, reduced broadcast overhead, logical grouping by function/department, security segmentation, and easier network management. Inter-VLAN traffic requires L3 routing.`,
      originalDocQuestion: `Why do organizations use VLANs?`,
      originalDocAnswer: `VLANs separate broadcast domains, reduce unnecessary broadcast traffic, organize devices by function, and support segmentation and security policies. Communication between VLANs requires Layer 3 routing.`,
    },
    {
      id: "net_sw-028",
      difficulty: "Medium",
      mcqQuestion: `What are root ports and designated ports in STP?`,
      options: [
        "Root ports send BPDUs; designated ports receive BPDUs.",
        "A root port provides a non-root switch's best path to the root bridge; a designated port forwards for a LAN segment. Other redundant ports are blocked.",
        "Root ports are always in blocking state; designated ports are always forwarding.",
        "Root ports are on the root bridge; designated ports are on non-root switches."
      ],
      correctIndex: 1,
      mcqExplanation: `Root port: best path from a non-root switch toward the root bridge (one per non-root switch). Designated port: selected to forward traffic for a LAN segment. Other redundant ports are blocked/discarding.`,
      originalDocQuestion: `What are root ports and designated ports?`,
      originalDocAnswer: `A root port is a non-root switch port providing its best path toward the root bridge. A designated port is selected to forward for a LAN segment; other redundant ports may be blocked.`,
    },
    {
      id: "net_sw-029",
      difficulty: "Medium",
      mcqQuestion: `Why use EtherChannel instead of simply connecting several cables between switches?`,
      options: [
        "Multiple parallel cables are always better because STP will use all of them.",
        "Bundling avoids a Layer 2 loop while allowing multiple links as one logical interface. Without aggregation, STP may block redundant links.",
        "EtherChannel is slower but more reliable than individual cables.",
        "Individual cables provide more bandwidth than EtherChannel."
      ],
      correctIndex: 1,
      mcqExplanation: `Without EtherChannel, parallel links create loops that STP blocks (wasting capacity). EtherChannel bundles them into one logical link — no loop, all links active, aggregate capacity for multiple flows.`,
      originalDocQuestion: `Why use EtherChannel instead of simply connecting several cables between switches?`,
      originalDocAnswer: `Bundling links avoids a Layer 2 loop while allowing multiple links to be used as one logical interface. Without aggregation or spanning-tree control, parallel links can create loops or STP may block redundant links.`,
    },
    {
      id: "net_sw-030",
      difficulty: "Medium",
      mcqQuestion: `What is MAC address flooding as a security attack?`,
      options: [
        "A normal switch behavior where unknown unicast frames are forwarded to all ports.",
        "An attack that overwhelms a switch's MAC address table with fake entries, forcing the switch to flood all traffic — effectively turning it into a hub.",
        "A feature that allows a switch to learn MAC addresses faster.",
        "A technique used by STP to detect loops."
      ],
      correctIndex: 1,
      mcqExplanation: `A MAC flooding attack fills the switch's MAC table with fake entries. Once full, the switch cannot learn legitimate MACs and floods all unknown unicast traffic out all ports — an attacker can then sniff all traffic. Port security mitigates this.`,
      originalDocQuestion: `What is MAC address flooding?`,
      originalDocAnswer: `The term can describe an attack that overwhelms a switch's MAC table, causing excessive flooding; switches often have port-security protections to mitigate this.`,
    },
  ],
};
