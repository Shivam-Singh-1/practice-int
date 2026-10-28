// Routing, OSPF, and BGP — Questions 169-220
// Source: Network Engineer Detailed Interview Answers
// Total questions: 34

const routing_ospf_bgp_DATA = {
  topicId: "routing_ospf_bgp",
  topicName: "Routing, OSPF & BGP",
  sourceFile: "Network_Engineer_Interview_Answers.docx",
  questions: [
    {
      id: "net_rt-001",
      difficulty: "Easy",
      mcqQuestion: `What is routing?`,
      options: [
        "The process of forwarding Ethernet frames based on MAC addresses within a VLAN.",
        "The process of choosing a path for IP packets between networks using routing and forwarding tables.",
        "The process of encrypting data before transmission.",
        "The process of assigning IP addresses to hosts using DHCP."
      ],
      correctIndex: 1,
      mcqExplanation: `Routing selects a path for IP packets between networks. A router consults its routing/forwarding tables and sends packets to the appropriate next hop or outgoing interface.`,
      originalDocQuestion: `What is routing?`,
      originalDocAnswer: `Routing is the process of choosing a path for IP packets between networks. A router consults its routing and forwarding tables and sends each packet to the appropriate next hop or outgoing interface.`,
    },
    {
      id: "net_rt-002",
      difficulty: "Easy",
      mcqQuestion: `What is the difference between routing and switching?`,
      options: [
        "Routing and switching are the same operation performed at different speeds.",
        "Switching forwards frames within a Layer 2 domain using MAC addresses; routing forwards IP packets between networks using IP prefixes.",
        "Routing operates at Layer 2; switching operates at Layer 3.",
        "Switching uses IP addresses; routing uses MAC addresses."
      ],
      correctIndex: 1,
      mcqExplanation: `Switching = Layer 2, MAC-based, within a VLAN/broadcast domain. Routing = Layer 3, IP-prefix-based, between networks. Different layers, different address types, different scope.`,
      originalDocQuestion: `What is the difference between routing and switching?`,
      originalDocAnswer: `Switching forwards frames within a Layer 2 domain based mainly on MAC addresses. Routing forwards IP packets between networks based on destination IP prefixes.`,
    },
    {
      id: "net_rt-003",
      difficulty: "Medium",
      mcqQuestion: `What is a routing table?`,
      options: [
        "A table that stores MAC addresses and their associated switch ports.",
        "A table storing known destination prefixes with next hop, outgoing interface, metric, and route source information.",
        "A table that maps DNS names to IP addresses.",
        "A table that stores firewall rules for incoming traffic."
      ],
      correctIndex: 1,
      mcqExplanation: `The routing table stores destination prefixes + next hop, outgoing interface, metric, and route source. The forwarding plane uses selected routes to forward packets. A route can exist yet fail if next hop is unreachable.`,
      originalDocQuestion: `What is a routing table?`,
      originalDocAnswer: `A routing table stores known destination prefixes and information such as next hop, outgoing interface, metric, and route source. The forwarding plane uses selected routes to send packets.`,
    },
    {
      id: "net_rt-004",
      difficulty: "Medium",
      mcqQuestion: `What is longest-prefix matching?`,
      options: [
        "Choosing the route with the shortest prefix (largest network).",
        "Choosing the most specific route that matches the destination. For example, /24 is preferred over /16 for an address covered by both.",
        "Choosing the route learned most recently.",
        "Choosing the route with the lowest administrative distance regardless of prefix length."
      ],
      correctIndex: 1,
      mcqExplanation: `Longest-prefix matching selects the most specific matching route. /24 is more specific than /16, so if both match the destination, /24 wins. This ensures precise traffic steering.`,
      originalDocQuestion: `What is longest-prefix matching?`,
      originalDocAnswer: `Longest-prefix matching chooses the most specific route that matches the destination address. For example, /24 is preferred over /16 for a destination covered by both.`,
    },
    {
      id: "net_rt-005",
      difficulty: "Easy",
      mcqQuestion: `What is a static route?`,
      options: [
        "A route automatically learned from a dynamic routing protocol.",
        "A route manually configured by an administrator. It is simple but needs manual changes when topology changes.",
        "A route that changes automatically based on network conditions.",
        "A route that exists only in the ARP cache."
      ],
      correctIndex: 1,
      mcqExplanation: `Static routes are manually configured — simple and predictable, but don't adapt to topology changes without manual intervention or tracking/automation features.`,
      originalDocQuestion: `What is a static route?`,
      originalDocAnswer: `A static route is manually configured by an administrator instead of being learned dynamically. It is simple and predictable but needs manual changes when topology or reachability changes.`,
    },
    {
      id: "net_rt-006",
      difficulty: "Easy",
      mcqQuestion: `What is a default route?`,
      options: [
        "The route with the most specific prefix in the routing table.",
        "A route used when no more-specific route matches the destination. In IPv4 it is 0.0.0.0/0; in IPv6 it is ::/0.",
        "A route that only matches traffic to the local loopback address.",
        "A route automatically assigned by DHCP that cannot be changed."
      ],
      correctIndex: 1,
      mcqExplanation: `The default route (0.0.0.0/0 for IPv4, ::/0 for IPv6) matches everything. It's used as the "gateway of last resort" when no more-specific route exists for a destination.`,
      originalDocQuestion: `What is a default route?`,
      originalDocAnswer: `A default route is used when no more-specific route matches the destination. In IPv4 it is 0.0.0.0/0; in IPv6 it is ::/0.`,
    },
    {
      id: "net_rt-007",
      difficulty: "Medium",
      mcqQuestion: `What is administrative distance?`,
      options: [
        "The physical distance between two routers measured in meters.",
        "A vendor-specific preference used to choose between routes from different sources for the same prefix. Lower values are preferred.",
        "The hop count metric used by OSPF.",
        "The number of autonomous systems a BGP route has traversed."
      ],
      correctIndex: 1,
      mcqExplanation: `Administrative distance ranks route sources (not individual routes within a protocol). Lower = more preferred. For example: connected = 0, static = 1, OSPF = 110, BGP = 20 (eBGP). Values differ by platform.`,
      originalDocQuestion: `What is administrative distance?`,
      originalDocAnswer: `Administrative distance is a vendor-specific preference used to choose between routes learned from different sources for the same prefix. Lower values are generally preferred.`,
    },
    {
      id: "net_rt-008",
      difficulty: "Medium",
      mcqQuestion: `What is ECMP (Equal-Cost Multipath)?`,
      options: [
        "A feature that forces all traffic through a single best path.",
        "A feature that lets a router use multiple routes with equal preference and cost to the same destination, distributing traffic using a flow hash.",
        "A protocol that replaces OSPF for internal routing.",
        "A feature that duplicates packets across all available links."
      ],
      correctIndex: 1,
      mcqExplanation: `ECMP allows a router to install and use multiple equal-cost routes to the same destination. Traffic is distributed using a flow hash (not random packet distribution) to avoid reordering within a flow.`,
      originalDocQuestion: `What is equal-cost multipath routing, or ECMP?`,
      originalDocAnswer: `ECMP lets a router use multiple routes with equal preference and cost to the same destination. Traffic is commonly distributed using a flow hash to reduce reordering.`,
    },
    {
      id: "net_rt-009",
      difficulty: "Medium",
      mcqQuestion: `What happens when a router has no matching route for a destination?`,
      options: [
        "The router floods the packet to all interfaces.",
        "The router uses a default route if one exists; otherwise it drops the packet and may send an ICMP Destination Unreachable.",
        "The router converts the packet to a broadcast and sends it to all networks.",
        "The router holds the packet in a buffer indefinitely until a route appears."
      ],
      correctIndex: 1,
      mcqExplanation: `No matching route → use default route (if exists). No default route → drop packet → may send ICMP Destination Unreachable (subject to policy and rate limits).`,
      originalDocQuestion: `What happens when a router has no matching route?`,
      originalDocAnswer: `The router uses a default route if one exists. Otherwise it normally drops the packet and may send an ICMP Destination Unreachable message.`,
    },
    {
      id: "net_rt-010",
      difficulty: "Medium",
      mcqQuestion: `What is an asymmetric route?`,
      options: [
        "A route where both directions use the exact same path.",
        "A situation where packets in two directions use different network paths. This can break stateful firewalls but may be normal in some networks.",
        "A route with an unequal subnet mask on each end.",
        "A route that only works for TCP but not UDP traffic."
      ],
      correctIndex: 1,
      mcqExplanation: `Asymmetric routing = forward and return paths differ. Can be normal (BGP, multi-homed networks), but breaks stateful firewalls/NAT that expect to see both directions. Complicates troubleshooting.`,
      originalDocQuestion: `What is an asymmetric route?`,
      originalDocAnswer: `An asymmetric route means packets in the two directions use different network paths. This can be normal, but it can complicate troubleshooting and break systems that expect stateful inspection.`,
    },
    {
      id: "net_rt-011",
      difficulty: "Medium",
      mcqQuestion: `What is route redistribution?`,
      options: [
        "Advertising the same route to the same routing protocol multiple times.",
        "Importing routes from one routing protocol or source into another. Needs filtering and loop prevention because careless redistribution can create instability.",
        "Deleting all routes from a routing table.",
        "Converting static routes to dynamic routes automatically."
      ],
      correctIndex: 1,
      mcqExplanation: `Route redistribution imports routes between different protocols (e.g., OSPF into BGP). Requires careful filtering, tagging, and loop prevention — careless redistribution can create route feedback, loops, or suboptimal routing.`,
      originalDocQuestion: `What is route redistribution?`,
      originalDocAnswer: `Redistribution imports routes from one routing protocol or route source into another. It needs filtering, tagging, and loop prevention because careless redistribution can create route feedback or unstable path selection.`,
    },
    {
      id: "net_rt-012",
      difficulty: "Medium",
      mcqQuestion: `What is OSPF?`,
      options: [
        "A distance-vector routing protocol that uses hop count as its metric.",
        "A link-state interior gateway protocol used within an autonomous system, where routers exchange link-state information and calculate shortest paths.",
        "A path-vector protocol used for inter-domain routing on the Internet.",
        "A Layer 2 protocol for VLAN management."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF = Open Shortest Path First. Link-state IGP. Routers exchange LSAs, build a common topology database (LSDB), and independently calculate shortest paths using Dijkstra's SPF algorithm.`,
      originalDocQuestion: `What is OSPF?`,
      originalDocAnswer: `OSPF is a link-state interior gateway protocol used within an autonomous system. Routers exchange link-state information and independently calculate shortest paths using a common topology database.`,
    },
    {
      id: "net_rt-013",
      difficulty: "Medium",
      mcqQuestion: `How does OSPF discover neighbors?`,
      options: [
        "OSPF routers send TCP SYN packets on port 89 to discover neighbors.",
        "Routers send OSPF Hello packets on enabled interfaces and verify parameters like area, timers, network type, and authentication.",
        "OSPF uses ARP broadcasts to discover all devices on the network.",
        "OSPF neighbors must be manually configured — there is no automatic discovery."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF Hello packets are sent on enabled interfaces. Neighbors form when they match on: area, hello/dead timers, authentication, network type, and subnet. An MTU mismatch can stall adjacency at ExStart/Exchange.`,
      originalDocQuestion: `How does OSPF discover neighbors?`,
      originalDocAnswer: `Routers send OSPF Hello packets on enabled interfaces and verify parameters such as area, timers, network type, and authentication. Compatible routers form adjacencies and exchange link-state information.`,
    },
    {
      id: "net_rt-014",
      difficulty: "Medium",
      mcqQuestion: `What is an OSPF area, and what is the purpose of Area 0?`,
      options: [
        "An OSPF area is the entire autonomous system. Area 0 is optional.",
        "An area groups routers to limit topology scope and improve scalability. Area 0 is the backbone that connects all other areas.",
        "An OSPF area is a physical building. Area 0 is the server room.",
        "Areas are used only in BGP, not in OSPF."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF areas limit LSA flooding scope and improve scalability. Area 0 = backbone, connects all other areas through ABRs (Area Border Routers). Multi-area design must preserve backbone connectivity.`,
      originalDocQuestion: `What is an OSPF area?`,
      originalDocAnswer: `An OSPF area groups routers and links to limit the scope of topology information and improve scalability. Area 0 is the backbone, and other areas normally connect to it through area border routers.`,
    },
    {
      id: "net_rt-015",
      difficulty: "Medium",
      mcqQuestion: `What is the OSPF cost metric?`,
      options: [
        "The number of routers (hops) between source and destination.",
        "A configurable or bandwidth-derived value used to calculate path preference, with lower total cost preferred.",
        "The time in milliseconds for a packet to traverse a link.",
        "The monetary cost of the network link."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF cost is typically derived from interface bandwidth (reference bandwidth / interface bandwidth). Lower total cost = preferred path. Consistent reference bandwidth planning is important across the OSPF domain.`,
      originalDocQuestion: `What is the OSPF cost metric?`,
      originalDocAnswer: `OSPF cost is a configurable or bandwidth-derived value used to calculate path preference, with lower total cost generally preferred.`,
    },
    {
      id: "net_rt-016",
      difficulty: "Medium",
      mcqQuestion: `What algorithm does OSPF use to calculate the shortest path?`,
      options: [
        "Bellman-Ford algorithm.",
        "Dijkstra's Shortest Path First (SPF) algorithm.",
        "A* search algorithm.",
        "Round-robin selection."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF uses Dijkstra's SPF algorithm on the link-state database (LSDB). Each router independently runs SPF using the same LSDB to calculate its own shortest-path tree rooted at itself.`,
      originalDocQuestion: `What algorithm does OSPF use to calculate the shortest path?`,
      originalDocAnswer: `OSPF uses Dijkstra's Shortest Path First algorithm on the link-state database, using configured OSPF costs to calculate preferred paths.`,
    },
    {
      id: "net_rt-017",
      difficulty: "Hard",
      mcqQuestion: `Why might two OSPF routers fail to become neighbors?`,
      options: [
        "OSPF neighbors always form automatically if they share a physical link.",
        "Causes include area mismatch, hello/dead timer mismatch, authentication mismatch, MTU issues, duplicate router IDs, passive interfaces, or ACLs blocking OSPF.",
        "OSPF only fails when the physical cable is disconnected.",
        "OSPF neighbor formation depends only on matching IP addresses."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF adjacency failures: area mismatch, hello/dead timer mismatch, authentication mismatch, MTU mismatch (stuck in ExStart/Exchange), duplicate router IDs, passive interface, ACL blocking IP protocol 89, or incompatible network types.`,
      originalDocQuestion: `Why might two OSPF routers fail to become neighbors?`,
      originalDocAnswer: `Common causes include area mismatch, subnet or hello/dead timer mismatch, authentication mismatch, MTU issues, duplicate router IDs, passive interfaces, ACLs blocking OSPF, or incompatible network types.`,
    },
    {
      id: "net_rt-018",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between OSPF and RIP?`,
      options: [
        "OSPF uses hop count; RIP uses link-state cost.",
        "OSPF is link-state with cost metric and hierarchical areas; RIP is distance-vector with hop count (max 15). OSPF generally converges and scales better.",
        "RIP is newer and faster than OSPF.",
        "Both protocols are identical but made by different vendors."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF: link-state, cost metric, hierarchical areas, faster convergence, better scalability. RIP: distance-vector, hop count (max 15), flat, slower convergence, limited scale. OSPF is preferred for enterprise.`,
      originalDocQuestion: `What is the difference between OSPF and RIP?`,
      originalDocAnswer: `OSPF is link-state and uses a cost metric with hierarchical areas. RIP is distance-vector with hop count (max 15). OSPF generally converges and scales better in enterprise networks.`,
    },
    {
      id: "net_rt-019",
      difficulty: "Medium",
      mcqQuestion: `What is BGP?`,
      options: [
        "A link-state protocol used for internal routing within a single autonomous system.",
        "A path-vector routing protocol used to exchange reachability between autonomous systems, with policy playing a major role in route selection.",
        "A Layer 2 protocol for switch management.",
        "A DHCP extension for automatic IP addressing."
      ],
      correctIndex: 1,
      mcqExplanation: `BGP = Border Gateway Protocol. Path-vector protocol for inter-AS routing. Policy-driven (not just shortest path). Exchanges reachability info + path attributes. Uses TCP port 179 for sessions.`,
      originalDocQuestion: `What is BGP?`,
      originalDocAnswer: `BGP is the path-vector routing protocol used to exchange reachability between autonomous systems and in large routing domains. Policy plays a major role in selecting and advertising routes.`,
    },
    {
      id: "net_rt-020",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between eBGP and iBGP?`,
      options: [
        "eBGP and iBGP are the same — the 'e' and 'i' are just version numbers.",
        "eBGP exchanges routes between different autonomous systems; iBGP distributes BGP routes within the same AS. iBGP requires full mesh, route reflectors, or confederations.",
        "eBGP is encrypted; iBGP is unencrypted.",
        "eBGP uses UDP; iBGP uses TCP."
      ],
      correctIndex: 1,
      mcqExplanation: `eBGP: between different ASes (TTL=1 by default). iBGP: within the same AS. iBGP doesn't re-advertise routes learned from iBGP peers (split-horizon), requiring full mesh, route reflectors, or confederations.`,
      originalDocQuestion: `What is the difference between eBGP and iBGP?`,
      originalDocAnswer: `eBGP exchanges routes between different autonomous systems, while iBGP distributes BGP routes within the same AS. iBGP has additional advertisement rules commonly handled using full mesh, route reflectors, or confederations.`,
    },
    {
      id: "net_rt-021",
      difficulty: "Medium",
      mcqQuestion: `What is the BGP AS_PATH attribute?`,
      options: [
        "The IP address of the BGP neighbor.",
        "A list of autonomous systems through which a route advertisement has passed, helping prevent routing loops and influence route selection.",
        "The administrative distance assigned to BGP routes.",
        "The physical path a packet takes across the Internet."
      ],
      correctIndex: 1,
      mcqExplanation: `AS_PATH lists the sequence of ASes a route has traversed. It prevents loops (a router rejects routes containing its own AS) and influences selection (shorter AS_PATH is often preferred, but policy can override).`,
      originalDocQuestion: `What is the BGP AS_PATH attribute?`,
      originalDocAnswer: `AS_PATH lists autonomous systems through which a route advertisement has passed. It helps prevent routing loops and is one factor in route selection.`,
    },
    {
      id: "net_rt-022",
      difficulty: "Medium",
      mcqQuestion: `What is the BGP LOCAL_PREF attribute?`,
      options: [
        "A metric used to influence inbound traffic from external peers.",
        "An attribute expressing preference for routes within an AS. Higher values are preferred. It influences outbound path selection.",
        "The priority value used for root bridge election.",
        "The IP TTL value assigned to BGP packets."
      ],
      correctIndex: 1,
      mcqExplanation: `LOCAL_PREF = preference within the AS. Higher = more preferred. Influences outbound path selection (which exit point to use). Not advertised to eBGP peers — stays within the AS.`,
      originalDocQuestion: `What is the LOCAL_PREF attribute?`,
      originalDocAnswer: `LOCAL_PREF expresses preference for routes within an autonomous system. Higher values are generally preferred and it helps influence outbound path selection; it is not normally advertised to external BGP peers.`,
    },
    {
      id: "net_rt-023",
      difficulty: "Hard",
      mcqQuestion: `How does BGP choose the best route?`,
      options: [
        "BGP always chooses the route with the fewest hops.",
        "BGP uses an ordered decision process including local preference, AS_PATH length, origin, MED, eBGP/iBGP preference, IGP cost, and tie-breakers. Exact order varies by platform.",
        "BGP randomly selects from available routes.",
        "BGP always chooses the route with the highest MED value."
      ],
      correctIndex: 1,
      mcqExplanation: `BGP best-path selection (simplified): highest LOCAL_PREF → shortest AS_PATH → lowest origin type → lowest MED → eBGP over iBGP → lowest IGP cost to next hop → tie-breakers. Policy-driven, not just shortest path.`,
      originalDocQuestion: `How does BGP choose the best route?`,
      originalDocAnswer: `BGP uses an ordered decision process involving local preference, AS_PATH length, origin, MED, eBGP/iBGP preference, IGP cost to next hop, and tie-breakers; exact order can vary by platform.`,
    },
    {
      id: "net_rt-024",
      difficulty: "Medium",
      mcqQuestion: `Why is BGP called a path-vector protocol?`,
      options: [
        "Because it calculates the physical distance between routers.",
        "Because it advertises destination prefixes with path information (AS_PATH), allowing policy-based selection and inter-AS loop detection.",
        "Because it uses spanning-tree paths for loop prevention.",
        "Because it measures the latency of each path in milliseconds."
      ],
      correctIndex: 1,
      mcqExplanation: `BGP carries path information (AS_PATH sequence) with each route advertisement. This enables: loop detection (reject routes with own AS), policy decisions, and path-based route selection. Hence "path-vector."`,
      originalDocQuestion: `Why is BGP called a path-vector protocol?`,
      originalDocAnswer: `BGP advertises destination prefixes with path information, especially the AS_PATH sequence. This allows policy-based selection and helps detect inter-AS routing loops.`,
    },
    {
      id: "net_rt-025",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between BGP and OSPF?`,
      options: [
        "BGP and OSPF are both link-state protocols used within a single AS.",
        "OSPF is an interior link-state protocol using cost; BGP is a path-vector protocol for policy-based inter-domain routing that scales to large routing tables.",
        "OSPF is used on the Internet; BGP is used only inside organizations.",
        "BGP converges faster than OSPF in all scenarios."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF: interior, link-state, cost-based, within an AS. BGP: exterior (and large interior), path-vector, policy-driven, between ASes. Different purposes, different scales, different selection criteria.`,
      originalDocQuestion: `What is the difference between BGP and OSPF?`,
      originalDocAnswer: `OSPF is an interior link-state protocol that computes paths based on topology and cost. BGP is a path-vector protocol designed for policy-based inter-domain routing and can scale to very large routing tables.`,
    },
    {
      id: "net_rt-026",
      difficulty: "Hard",
      mcqQuestion: `A BGP session is Established, but no routes are being received. What could be wrong?`,
      options: [
        "An Established session guarantees routes are exchanged correctly.",
        "The peer may not advertise routes, policies may deny them, address families may not be activated, prefix filters may block them, or expected prefixes may not be in the peer's table.",
        "The BGP port (179) must be changed to resolve this issue.",
        "BGP sessions don't exchange routes — they only maintain keepalives."
      ],
      correctIndex: 1,
      mcqExplanation: `Established = peers can exchange BGP messages, not that useful routes flow. Check: peer advertising expected prefixes? → import/export policies allowing them? → correct address family activated? → prefix filters? → next-hop reachability?`,
      originalDocQuestion: `A BGP session is established, but no routes are being received. What could be wrong?`,
      originalDocAnswer: `The peer may not advertise routes, route policies may deny them, address families may not be activated, prefix filters may block them, or expected prefixes may not be in the peer's routing table.`,
    },
    {
      id: "net_rt-027",
      difficulty: "Hard",
      mcqQuestion: `OSPF reports a route as available, but traffic still goes through a different path. What would you investigate?`,
      options: [
        "Nothing — OSPF routes always take priority over all other routes.",
        "Check longest-prefix matches, route preference/administrative distance, OSPF costs, ECMP hashing, policy routing, VRFs, and the actual forwarding table.",
        "Restart the OSPF process on all routers.",
        "Disable BGP to force traffic through the OSPF path."
      ],
      correctIndex: 1,
      mcqExplanation: `Possible causes: a more-specific prefix from another source wins (longest-prefix match), lower AD route overrides OSPF, ECMP hash sends flow differently, policy routing/VRF selects another table, or forwarding table differs from routing table.`,
      originalDocQuestion: `OSPF reports a route as available, but traffic still goes through a different path. What would you investigate?`,
      originalDocAnswer: `Check longest-prefix matches, route preference/administrative distance, OSPF costs, ECMP hashing, policy routing, VRFs, and the actual forwarding table.`,
    },
    {
      id: "net_rt-028",
      difficulty: "Hard",
      mcqQuestion: `Two routers can ping their directly connected interface IPs, but their OSPF adjacency does not form. Why?`,
      options: [
        "If ping works, OSPF must also work.",
        "Basic IP reachability does not prove OSPF parameters are correct. Verify OSPF is enabled, area/timers/authentication match, network type, subnet, MTU, router IDs, and that IP protocol 89 is not filtered.",
        "OSPF requires BGP to be running first.",
        "OSPF only works over trunk links, not routed interfaces."
      ],
      correctIndex: 1,
      mcqExplanation: `Ping tests ICMP, not OSPF. OSPF adjacency requires: OSPF enabled on both interfaces, matching area, hello/dead timers, authentication, network type, subnet, MTU agreement, unique router IDs, and IP protocol 89 not blocked.`,
      originalDocQuestion: `Two routers can ping their directly connected interface IPs, but their OSPF adjacency does not form. Why?`,
      originalDocAnswer: `Basic IP reachability does not prove OSPF parameters or protocol traffic are correct. Verify OSPF is enabled, area, timers, authentication, network type, subnet, MTU, router IDs, and filtering.`,
    },
    {
      id: "net_rt-029",
      difficulty: "Medium",
      mcqQuestion: `What are the OSPF neighbor states from initial discovery to full adjacency?`,
      options: [
        "Only two states: Down and Full.",
        "Down, Attempt, Init, 2-Way, ExStart, Exchange, Loading, and Full.",
        "SYN, SYN-ACK, ACK, ESTABLISHED.",
        "Idle, Active, Established, Holddown."
      ],
      correctIndex: 1,
      mcqExplanation: `OSPF states: Down → Attempt (NBMA) → Init (Hello received) → 2-Way (bidirectional) → ExStart → Exchange → Loading → Full (synchronized LSDB). Stuck in ExStart/Exchange often indicates MTU mismatch.`,
      originalDocQuestion: `What are the different OSPF neighbor states?`,
      originalDocAnswer: `The common states are Down, Attempt, Init, 2-Way, ExStart, Exchange, Loading, and Full. DROther routers on broadcast networks may remain 2-Way with each other.`,
    },
    {
      id: "net_rt-030",
      difficulty: "Medium",
      mcqQuestion: `What is the role of LSAs in OSPF?`,
      options: [
        "LSAs encrypt routing updates between OSPF neighbors.",
        "Link-State Advertisements describe routers, links, networks, and reachability. Routers flood them within their scope to synchronize the LSDB.",
        "LSAs assign IP addresses to OSPF interfaces.",
        "LSAs are used only in BGP, not OSPF."
      ],
      correctIndex: 1,
      mcqExplanation: `LSAs (Link-State Advertisements) carry topology information: routers, links, networks, external routes. They are flooded within appropriate scope (area or domain) to keep all routers' LSDBs synchronized.`,
      originalDocQuestion: `What is the role of LSAs in OSPF?`,
      originalDocAnswer: `Link-State Advertisements describe routers, links, networks, and reachability. Routers flood appropriate LSAs within their scope to synchronize the link-state database.`,
    },
    {
      id: "net_rt-031",
      difficulty: "Medium",
      mcqQuestion: `What is the NEXT_HOP attribute in BGP?`,
      options: [
        "The IP address of the final destination.",
        "The next-hop IP address used to reach a BGP-advertised destination. If unreachable, the route may not be usable even when the session is Established.",
        "The MAC address of the next router.",
        "The TCP port number used by BGP."
      ],
      correctIndex: 1,
      mcqExplanation: `BGP NEXT_HOP identifies the IP to forward traffic to for a given prefix. Critical: if the next hop is not resolvable via IGP/connected routes, the BGP route won't be installed in the forwarding table.`,
      originalDocQuestion: `What is the NEXT_HOP attribute?`,
      originalDocAnswer: `NEXT_HOP identifies the next-hop IP address used to reach a BGP-advertised destination. If that next hop is not reachable, the route may not be usable even when the BGP session is established.`,
    },
    {
      id: "net_rt-032",
      difficulty: "Medium",
      mcqQuestion: `What is the difference between a next hop and an outgoing interface?`,
      options: [
        "They are the same thing — both refer to the destination IP.",
        "The next hop is the router address to send the packet to; the outgoing interface is the local interface used to reach that next hop.",
        "The next hop is the source address; the outgoing interface is the destination address.",
        "The outgoing interface determines the next hop, and they always have the same IP."
      ],
      correctIndex: 1,
      mcqExplanation: `Next hop = the IP address of the next router in the path. Outgoing interface = the local interface used to reach that next hop. A directly connected route may specify only an interface.`,
      originalDocQuestion: `What is the difference between a next hop and an outgoing interface?`,
      originalDocAnswer: `The next hop is the router address to which the packet should be sent; the outgoing interface is the local interface used to reach it. A directly connected route may specify only an interface.`,
    },
    {
      id: "net_rt-033",
      difficulty: "Hard",
      mcqQuestion: `Why might a BGP route exist in the routing table but still not be selected as the forwarding route?`,
      options: [
        "BGP routes are always used for forwarding once they appear in the routing table.",
        "A more-preferred source route may win, next-hop resolution may fail, policy may suppress it, or platform rules may prevent installation.",
        "BGP routes cannot exist in the routing table.",
        "BGP routes are only used when all OSPF routes are removed."
      ],
      correctIndex: 1,
      mcqExplanation: `A BGP route may lose to: a lower-AD route for the same prefix, unresolved next-hop, policy/filter suppression, VRF table selection, or platform-specific installation rules. Check BGP table → global RIB → FIB.`,
      originalDocQuestion: `Why might a BGP route exist in the routing table but still not be selected as the forwarding route?`,
      originalDocAnswer: `A route may lose to a more preferred source, fail next-hop resolution, be suppressed by policy, or not be installed due to conflicts or platform rules.`,
    },
    {
      id: "net_rt-034",
      difficulty: "Hard",
      mcqQuestion: `If a route has the longest prefix match, will it always be selected for forwarding?`,
      options: [
        "Yes — longest prefix match always wins regardless of any other condition.",
        "For forwarding, the most specific usable matching prefix normally wins, but the route must be installed, valid, with a resolved next hop, and not blocked by policy or VRF.",
        "No — the route with the shortest prefix is always preferred.",
        "Longest prefix match only applies to BGP, not to general IP routing."
      ],
      correctIndex: 1,
      mcqExplanation: `Longest-prefix match drives forwarding, but the route must be: installed in the forwarding table, next-hop resolvable, not suppressed by policy, and in the correct VRF/routing table context. A route that exists but is unusable won't forward traffic.`,
      originalDocQuestion: `If a route has the longest prefix match, will it always be selected?`,
      originalDocAnswer: `The most specific usable matching prefix normally wins for forwarding, but the route must be installed and valid; route selection, policy, VRF, or unresolved next hop can change the outcome.`,
    },
  ],
};
