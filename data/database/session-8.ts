import type { Chapter } from "@/types/quiz";

export const session8: Chapter = {
  "id": "session-8",
  "title": "Session 8: Distributed Databases and the CAP Theorem",
  "description": "63 câu hỏi về distributed databases, replication, sharding và CAP theorem.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s8-q001",
      "prompt": "What limitation of the single-node PostgreSQL setup motivates distributed databases in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Single nodes cannot enforce ACID properties."
        },
        {
          "id": "b",
          "text": "Hardware failure or excessive demand can disrupt the whole service."
        },
        {
          "id": "c",
          "text": "A single instance cannot create B-Tree indexes."
        },
        {
          "id": "d",
          "text": "Single-node databases cannot store AI features."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The recap raises SSD failure and one million simultaneous requests as single-machine risks.",
      "source": "/references/database-session-8-slides.pdf#page=4",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 4,
          "slideNumber": 4,
          "slideTitle": "Recap: Where are we?"
        }
      ]
    },
    {
      "id": "db-s8-q002",
      "prompt": "A team adds CPU cores and RAM to its existing database server without introducing other nodes. Which strategy is this?",
      "options": [
        {
          "id": "a",
          "text": "Horizontal scaling"
        },
        {
          "id": "b",
          "text": "Database sharding"
        },
        {
          "id": "c",
          "text": "Vertical scaling"
        },
        {
          "id": "d",
          "text": "Read replication"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Scale-up adds resources to an existing server rather than adding servers.",
      "source": "/references/database-session-8-slides.pdf#page=6",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "1.1 Vertical Scaling (Scale-Up)"
        }
      ]
    },
    {
      "id": "db-s8-q003",
      "prompt": "Which combination is identified as a drawback of vertical scaling?",
      "options": [
        {
          "id": "a",
          "text": "Hardware ceiling and a remaining single point of failure"
        },
        {
          "id": "b",
          "text": "Additional cross-shard joins and resharding"
        },
        {
          "id": "c",
          "text": "Replica lag and replica read-only errors"
        },
        {
          "id": "d",
          "text": "Complex routing among hundreds of nodes"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Scale-up faces physical hardware limits and does not eliminate the single point of failure.",
      "source": "/references/database-session-8-slides.pdf#page=6",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "1.1 Vertical Scaling (Scale-Up)"
        }
      ]
    },
    {
      "id": "db-s8-q004",
      "prompt": "Which change best illustrates horizontal scaling?",
      "options": [
        {
          "id": "a",
          "text": "Replacing a disk with a larger SSD"
        },
        {
          "id": "b",
          "text": "Increasing RAM on the primary"
        },
        {
          "id": "c",
          "text": "Changing the isolation level"
        },
        {
          "id": "d",
          "text": "Adding standard servers that operate as one logical service"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Scale-out connects multiple commodity servers to act as a logical unit.",
      "source": "/references/database-session-8-slides.pdf#page=7",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 Horizontal Scaling (Scale-Out)"
        }
      ]
    },
    {
      "id": "db-s8-q005",
      "prompt": "Which benefit of horizontal scaling is especially relevant when one server unexpectedly fails?",
      "options": [
        {
          "id": "a",
          "text": "All requests must wait for the failed node to recover."
        },
        {
          "id": "b",
          "text": "Other nodes can continue serving the workload."
        },
        {
          "id": "c",
          "text": "Transactions automatically become Serializable."
        },
        {
          "id": "d",
          "text": "The system no longer requires network communication."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture associates scale-out with high availability through multiple nodes.",
      "source": "/references/database-session-8-slides.pdf#page=7",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 Horizontal Scaling (Scale-Out)"
        }
      ]
    },
    {
      "id": "db-s8-q006",
      "prompt": "A single-server service goes offline whenever its operating system must reboot for security patches. Which problem does this illustrate?",
      "options": [
        {
          "id": "a",
          "text": "A hash collision"
        },
        {
          "id": "b",
          "text": "A cross-shard transaction"
        },
        {
          "id": "c",
          "text": "A single point of failure"
        },
        {
          "id": "d",
          "text": "Eventual consistency"
        }
      ],
      "correctOptionId": "c",
      "explanation": "A single node creates maintenance downtime as well as hardware and software failure exposure.",
      "source": "/references/database-session-8-slides.pdf#page=8",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "1.3 Single Point of Failure (SPOF)"
        }
      ]
    },
    {
      "id": "db-s8-q007",
      "prompt": "Compared with scale-up, what additional operational cost is emphasized for scale-out?",
      "options": [
        {
          "id": "a",
          "text": "Increased network and coordination complexity"
        },
        {
          "id": "b",
          "text": "A strict limit imposed by one motherboard"
        },
        {
          "id": "c",
          "text": "An inability to use inexpensive servers"
        },
        {
          "id": "d",
          "text": "The need to store everything on one disk"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The comparison table notes that horizontal scaling has greater complexity because of network overhead.",
      "source": "/references/database-session-8-slides.pdf#page=9",
      "topic": "Why distributed?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "1.4 Vertical vs. Horizontal: Summary"
        }
      ]
    },
    {
      "id": "db-s8-q008",
      "prompt": "In database replication, what is copied between servers?",
      "options": [
        {
          "id": "a",
          "text": "Only SQL execution plans"
        },
        {
          "id": "b",
          "text": "Only user authentication settings"
        },
        {
          "id": "c",
          "text": "Distinct nonoverlapping subsets of rows"
        },
        {
          "id": "d",
          "text": "Copies of database information maintained on different machines"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Replication maintains multiple copies of data on different physical servers.",
      "source": "/references/database-session-8-slides.pdf#page=11",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "2.1 What is Database Replication?"
        }
      ]
    },
    {
      "id": "db-s8-q009",
      "prompt": "Which pair of objectives motivates replication in the slides?",
      "options": [
        {
          "id": "a",
          "text": "Removing all indexes and eliminating transactions"
        },
        {
          "id": "b",
          "text": "Improving fault tolerance and read performance"
        },
        {
          "id": "c",
          "text": "Avoiding schemas and preventing any network failure"
        },
        {
          "id": "d",
          "text": "Reducing database size through horizontal partitioning"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture lists reliability/fault tolerance and read performance as motivations.",
      "source": "/references/database-session-8-slides.pdf#page=11",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "2.1 What is Database Replication?"
        }
      ]
    },
    {
      "id": "db-s8-q010",
      "prompt": "In the primary-replica model presented, which node normally accepts INSERT, UPDATE, and DELETE?",
      "options": [
        {
          "id": "a",
          "text": "The primary"
        },
        {
          "id": "b",
          "text": "Any read-only replica"
        },
        {
          "id": "c",
          "text": "Only the newest replica"
        },
        {
          "id": "d",
          "text": "A dedicated backup server disconnected from the cluster"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The primary is the write-capable source of truth; replicas serve reads and synchronize.",
      "source": "/references/database-session-8-slides.pdf#page=12",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2.2 Master-Slave (Primary-Replica) Model"
        }
      ]
    },
    {
      "id": "db-s8-q011",
      "prompt": "What role do replicas play in the lecture’s primary-replica architecture?",
      "options": [
        {
          "id": "a",
          "text": "Assign unique subsets of user IDs"
        },
        {
          "id": "b",
          "text": "Commit independent authoritative writes"
        },
        {
          "id": "c",
          "text": "Serve reads and synchronize changes from the primary"
        },
        {
          "id": "d",
          "text": "Replace all write-ahead logging"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Replicas are synchronized read-serving nodes.",
      "source": "/references/database-session-8-slides.pdf#page=12",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2.2 Master-Slave (Primary-Replica) Model"
        }
      ]
    },
    {
      "id": "db-s8-q012",
      "prompt": "A recommendation API has approximately 100 reads per write. What is the lecture’s proposed way to reduce primary load?",
      "options": [
        {
          "id": "a",
          "text": "Execute all reads within a single write transaction."
        },
        {
          "id": "b",
          "text": "Send all feature lookups to the primary."
        },
        {
          "id": "c",
          "text": "Shard the schema into separate databases on the same server."
        },
        {
          "id": "d",
          "text": "Distribute SELECT queries over multiple read replicas."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Read-scale architecture distributes SELECT operations among replicas so the primary can focus on writes.",
      "source": "/references/database-session-8-slides.pdf#page=13",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2.3 Read-Scale Architecture"
        }
      ]
    },
    {
      "id": "db-s8-q013",
      "prompt": "Why are read replicas useful during model inference?",
      "options": [
        {
          "id": "a",
          "text": "They guarantee that each feature vector is globally unique."
        },
        {
          "id": "b",
          "text": "They can serve feature-vector retrieval requests."
        },
        {
          "id": "c",
          "text": "They eliminate the need for all database indexes."
        },
        {
          "id": "d",
          "text": "They automatically synchronize model weights."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The AI inference use case in the slide fetches feature vectors through replicas.",
      "source": "/references/database-session-8-slides.pdf#page=13",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2.3 Read-Scale Architecture"
        }
      ]
    },
    {
      "id": "db-s8-q014",
      "prompt": "When does the primary acknowledge a commit under the synchronous replication model described in the slides?",
      "options": [
        {
          "id": "a",
          "text": "Before producing any WAL records"
        },
        {
          "id": "b",
          "text": "Immediately after receiving a client query"
        },
        {
          "id": "c",
          "text": "After receiving the required replica confirmation"
        },
        {
          "id": "d",
          "text": "Only after every replica has been restarted"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Synchronous replication requires a replica acknowledgement before commit completion.",
      "source": "/references/database-session-8-slides.pdf#page=14",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "2.4 Synchronous Replication"
        }
      ]
    },
    {
      "id": "db-s8-q015",
      "prompt": "What failure risk is highlighted for synchronous replication if the required replica is unavailable?",
      "options": [
        {
          "id": "a",
          "text": "Writes may be blocked while the primary waits for confirmation."
        },
        {
          "id": "b",
          "text": "Previously committed rows are automatically deleted."
        },
        {
          "id": "c",
          "text": "The primary silently switches to sharding."
        },
        {
          "id": "d",
          "text": "Read-only queries on the primary become illegal."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The trade-off described is increased write latency and potential write unavailability.",
      "source": "/references/database-session-8-slides.pdf#page=14",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "2.4 Synchronous Replication"
        }
      ]
    },
    {
      "id": "db-s8-q016",
      "prompt": "In asynchronous replication, what may happen before a replica receives the latest update?",
      "options": [
        {
          "id": "a",
          "text": "The replica must reject every SELECT."
        },
        {
          "id": "b",
          "text": "The primary waits for all replicas to confirm."
        },
        {
          "id": "c",
          "text": "The cluster changes its sharding key."
        },
        {
          "id": "d",
          "text": "The primary successfully commits locally."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Asynchronous replication commits first and ships changes to replicas afterward.",
      "source": "/references/database-session-8-slides.pdf#page=15",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "2.5 Asynchronous Replication (Postgres Default)"
        }
      ]
    },
    {
      "id": "db-s8-q017",
      "prompt": "An asynchronous primary crashes just after committing, before sending its newest change. What risk follows?",
      "options": [
        {
          "id": "a",
          "text": "The last commit must already be on all replicas."
        },
        {
          "id": "b",
          "text": "The newest committed change may be missing from replicas."
        },
        {
          "id": "c",
          "text": "All replica reads become serializable."
        },
        {
          "id": "d",
          "text": "The primary automatically rolls back all earlier commits."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide identifies data-loss risk if the primary fails before propagation.",
      "source": "/references/database-session-8-slides.pdf#page=15",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "2.5 Asynchronous Replication (Postgres Default)"
        }
      ]
    },
    {
      "id": "db-s8-q018",
      "prompt": "A replica briefly returns an older customer balance while the primary has the new balance. Which replication trade-off does this show?",
      "options": [
        {
          "id": "a",
          "text": "A local partitioning error"
        },
        {
          "id": "b",
          "text": "A SQL parser malfunction"
        },
        {
          "id": "c",
          "text": "Replication lag under asynchronous propagation"
        },
        {
          "id": "d",
          "text": "A guaranteed two-phase commit failure"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Asynchronous replicas can temporarily lag behind the primary.",
      "source": "/references/database-session-8-slides.pdf#page=15",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "2.5 Asynchronous Replication (Postgres Default)"
        }
      ]
    },
    {
      "id": "db-s8-q019",
      "prompt": "What is failover in a primary-replica cluster?",
      "options": [
        {
          "id": "a",
          "text": "Promoting a replica to become the new writable primary"
        },
        {
          "id": "b",
          "text": "Moving every row to a newly selected shard"
        },
        {
          "id": "c",
          "text": "Increasing the RAM on the failed node"
        },
        {
          "id": "d",
          "text": "Restarting all nodes in a fixed round-robin order"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Failover replaces a failed primary by promoting a replica.",
      "source": "/references/database-session-8-slides.pdf#page=16",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 16,
          "slideNumber": 14,
          "slideTitle": "2.6 Failover: What happens when Master dies?"
        }
      ]
    },
    {
      "id": "db-s8-q020",
      "prompt": "Which sequence follows the failover workflow described in the slides?",
      "options": [
        {
          "id": "a",
          "text": "Promotion → detection → election → reconfiguration"
        },
        {
          "id": "b",
          "text": "Election → reconfiguration → detection → promotion"
        },
        {
          "id": "c",
          "text": "Reconfiguration → promotion → election → detection"
        },
        {
          "id": "d",
          "text": "Detection → election → promotion → reconfiguration"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The four listed steps occur in that order.",
      "source": "/references/database-session-8-slides.pdf#page=16",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 16,
          "slideNumber": 14,
          "slideTitle": "2.6 Failover: What happens when Master dies?"
        }
      ]
    },
    {
      "id": "db-s8-q021",
      "prompt": "Which tools are explicitly mentioned as options for automating PostgreSQL failover?",
      "options": [
        {
          "id": "a",
          "text": "pgAdmin and psql"
        },
        {
          "id": "b",
          "text": "Patroni and Repmgr"
        },
        {
          "id": "c",
          "text": "Docker and SQLAlchemy"
        },
        {
          "id": "d",
          "text": "HBase and CouchDB"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Patroni and Repmgr appear in the failover slide.",
      "source": "/references/database-session-8-slides.pdf#page=16",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 16,
          "slideNumber": 14,
          "slideTitle": "2.6 Failover: What happens when Master dies?"
        }
      ]
    },
    {
      "id": "db-s8-q022",
      "prompt": "For large AI training jobs, what deployment choice is recommended in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Perform every bulk read against the writable primary."
        },
        {
          "id": "b",
          "text": "Disable replication to maximize concurrency."
        },
        {
          "id": "c",
          "text": "Read large datasets from read replicas to reduce pressure on production."
        },
        {
          "id": "d",
          "text": "Place all training features on a single unreplicated node."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Training data can be read from replicas to avoid stressing the production primary.",
      "source": "/references/database-session-8-slides.pdf#page=17",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 17,
          "slideNumber": 15,
          "slideTitle": "2.7 Use Case: AI Training vs. Inference"
        }
      ]
    },
    {
      "id": "db-s8-q023",
      "prompt": "Why might a global inference service deploy replicas in multiple geographic regions?",
      "options": [
        {
          "id": "a",
          "text": "To reduce data-access latency near users"
        },
        {
          "id": "b",
          "text": "To force all writes to cross every region"
        },
        {
          "id": "c",
          "text": "To avoid using network links"
        },
        {
          "id": "d",
          "text": "To make row identifiers sequential"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Geographic replication is used to reduce latency for local inference users.",
      "source": "/references/database-session-8-slides.pdf#page=17",
      "topic": "Replication",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 17,
          "slideNumber": 15,
          "slideTitle": "2.7 Use Case: AI Training vs. Inference"
        }
      ]
    },
    {
      "id": "db-s8-q024",
      "prompt": "Which statement correctly distinguishes sharding from replication?",
      "options": [
        {
          "id": "a",
          "text": "Sharding copies every row to every node; replication splits rows."
        },
        {
          "id": "b",
          "text": "Both strategies necessarily keep identical data on every node."
        },
        {
          "id": "c",
          "text": "Sharding affects only indexes, while replication affects tables."
        },
        {
          "id": "d",
          "text": "Sharding distributes different subsets; replication maintains copies."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Shards hold unique subsets of a logical dataset, unlike replicas that maintain copies.",
      "source": "/references/database-session-8-slides.pdf#page=19",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "3.1 What is Sharding?"
        }
      ]
    },
    {
      "id": "db-s8-q025",
      "prompt": "A dataset of ten billion rows is split into ten data subsets on different servers. Which concept best matches the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Synchronous replication"
        },
        {
          "id": "b",
          "text": "Database sharding"
        },
        {
          "id": "c",
          "text": "Vertical scaling"
        },
        {
          "id": "d",
          "text": "Materialized views"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide presents the ten-billion-row example as a use case for sharding.",
      "source": "/references/database-session-8-slides.pdf#page=19",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "3.1 What is Sharding?"
        }
      ]
    },
    {
      "id": "db-s8-q026",
      "prompt": "A table is divided into smaller tables, but all partitions remain in the same PostgreSQL instance. What is this called?",
      "options": [
        {
          "id": "a",
          "text": "Local horizontal partitioning"
        },
        {
          "id": "b",
          "text": "Distributed sharding"
        },
        {
          "id": "c",
          "text": "Read replication"
        },
        {
          "id": "d",
          "text": "Cross-region failover"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Local horizontal partitioning operates within one database instance; sharding distributes pieces across nodes.",
      "source": "/references/database-session-8-slides.pdf#page=20",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "3.2 Sharding vs. Horizontal Partitioning"
        }
      ]
    },
    {
      "id": "db-s8-q027",
      "prompt": "Compared with local horizontal partitioning, what capability is added by sharding?",
      "options": [
        {
          "id": "a",
          "text": "Automatic foreign keys across all servers"
        },
        {
          "id": "b",
          "text": "Guaranteed zero-latency joins"
        },
        {
          "id": "c",
          "text": "Scaling CPU and RAM resources across multiple machines"
        },
        {
          "id": "d",
          "text": "A requirement that each server has identical rows"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Sharding can distribute work and data over multiple physical servers.",
      "source": "/references/database-session-8-slides.pdf#page=20",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "3.2 Sharding vs. Horizontal Partitioning"
        }
      ]
    },
    {
      "id": "db-s8-q028",
      "prompt": "What determines the destination shard for an individual record?",
      "options": [
        {
          "id": "a",
          "text": "The newest available replica"
        },
        {
          "id": "b",
          "text": "The transaction isolation level"
        },
        {
          "id": "c",
          "text": "The number of SELECT columns"
        },
        {
          "id": "d",
          "text": "The value and routing rule of the sharding key"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The sharding key is the column used to assign a row to a shard.",
      "source": "/references/database-session-8-slides.pdf#page=21",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.3 The Sharding Key"
        }
      ]
    },
    {
      "id": "db-s8-q029",
      "prompt": "New customer IDs grow sequentially, and the newest IDs always land on the last range shard. What risk is highlighted?",
      "options": [
        {
          "id": "a",
          "text": "The last shard cannot store indexes."
        },
        {
          "id": "b",
          "text": "That shard becomes a write hotspot."
        },
        {
          "id": "c",
          "text": "All shards receive exactly the same load."
        },
        {
          "id": "d",
          "text": "Every query automatically needs two-phase commit."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Range-based sharding can concentrate new users on one shard.",
      "source": "/references/database-session-8-slides.pdf#page=21",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.3 The Sharding Key"
        }
      ]
    },
    {
      "id": "db-s8-q030",
      "prompt": "Which formula illustrates hash-based shard assignment in the slides?",
      "options": [
        {
          "id": "a",
          "text": "hash(customer_id) % N"
        },
        {
          "id": "b",
          "text": "customer_id + N"
        },
        {
          "id": "c",
          "text": "MAX(customer_id) / replica_lag"
        },
        {
          "id": "d",
          "text": "SUM(customer_id) OVER (PARTITION BY N)"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide uses hash(customer_id) modulo number of shards to distribute rows.",
      "source": "/references/database-session-8-slides.pdf#page=21",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.3 The Sharding Key"
        }
      ]
    },
    {
      "id": "db-s8-q031",
      "prompt": "Why is choosing the wrong sharding key expensive to correct later?",
      "options": [
        {
          "id": "a",
          "text": "It forces synchronous replication forever."
        },
        {
          "id": "b",
          "text": "It makes every index unusable by definition."
        },
        {
          "id": "c",
          "text": "Changing placement may require resharding existing records."
        },
        {
          "id": "d",
          "text": "It permanently disables failover."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Correcting poor distribution can require a costly resharding process.",
      "source": "/references/database-session-8-slides.pdf#page=21",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.3 The Sharding Key"
        }
      ]
    },
    {
      "id": "db-s8-q032",
      "prompt": "Why should applications avoid frequent cross-shard joins when possible?",
      "options": [
        {
          "id": "a",
          "text": "A join becomes a full database backup."
        },
        {
          "id": "b",
          "text": "Cross-shard joins never return consistent rows."
        },
        {
          "id": "c",
          "text": "SQL does not support JOIN syntax in distributed systems."
        },
        {
          "id": "d",
          "text": "Combining data stored on different servers can be very slow."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide identifies expensive cross-shard joins as an important complexity cost.",
      "source": "/references/database-session-8-slides.pdf#page=22",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.4 The Cost of Sharding"
        }
      ]
    },
    {
      "id": "db-s8-q033",
      "prompt": "Which integrity problem is identified when related tables reside on separate shards?",
      "options": [
        {
          "id": "a",
          "text": "All local foreign keys stop working."
        },
        {
          "id": "b",
          "text": "Cross-shard foreign keys are usually not enforced by the DBMS."
        },
        {
          "id": "c",
          "text": "Every shard automatically gains duplicate primary keys."
        },
        {
          "id": "d",
          "text": "Indexes cannot reference any local column."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture notes that foreign-key constraints across shards are generally unsupported.",
      "source": "/references/database-session-8-slides.pdf#page=22",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.4 The Cost of Sharding"
        }
      ]
    },
    {
      "id": "db-s8-q034",
      "prompt": "What is identified as a mechanism for coordinating ACID transactions spanning shards?",
      "options": [
        {
          "id": "a",
          "text": "Two-phase commit"
        },
        {
          "id": "b",
          "text": "A simple read replica"
        },
        {
          "id": "c",
          "text": "A local B-Tree index"
        },
        {
          "id": "d",
          "text": "An HTTP cache"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture cites two-phase commit for distributed transactions and highlights its performance cost.",
      "source": "/references/database-session-8-slides.pdf#page=22",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.4 The Cost of Sharding"
        }
      ]
    },
    {
      "id": "db-s8-q035",
      "prompt": "A social network stores each user’s profile and associated activity on the same shard. What is the intended advantage?",
      "options": [
        {
          "id": "a",
          "text": "The primary never needs to commit writes."
        },
        {
          "id": "b",
          "text": "All users necessarily share one global shard."
        },
        {
          "id": "c",
          "text": "User-profile queries can access related data locally."
        },
        {
          "id": "d",
          "text": "The system no longer requires authentication."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Sharding by user_id co-locates a user’s data and speeds profile retrieval.",
      "source": "/references/database-session-8-slides.pdf#page=23",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "3.5 Sharding in the AI Lifecycle"
        }
      ]
    },
    {
      "id": "db-s8-q036",
      "prompt": "Which AI-oriented dataset is explicitly cited as a candidate for sharding?",
      "options": [
        {
          "id": "a",
          "text": "A single local configuration file"
        },
        {
          "id": "b",
          "text": "One SQL connection string"
        },
        {
          "id": "c",
          "text": "A small static lookup table"
        },
        {
          "id": "d",
          "text": "Billions of embeddings in a feature store"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Feature stores holding billions of vectors are a stated sharding example.",
      "source": "/references/database-session-8-slides.pdf#page=23",
      "topic": "Sharding",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "3.5 Sharding in the AI Lifecycle"
        }
      ]
    },
    {
      "id": "db-s8-q037",
      "prompt": "According to the lecture, what is the key CAP trade-off when a network partition occurs?",
      "options": [
        {
          "id": "a",
          "text": "Choose whether to keep ACID or SQL support."
        },
        {
          "id": "b",
          "text": "Choose between consistency and availability."
        },
        {
          "id": "c",
          "text": "Choose between indexing and replication."
        },
        {
          "id": "d",
          "text": "Choose between vertical and horizontal scaling."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The CAP constraint during partitions is the conflict between strong consistency and availability.",
      "source": "/references/database-session-8-slides.pdf#page=25",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "4.1 Introduction to CAP Theorem"
        }
      ]
    },
    {
      "id": "db-s8-q038",
      "prompt": "Who is credited in the lecture with proposing the CAP theorem in 2000?",
      "options": [
        {
          "id": "a",
          "text": "Eric Brewer"
        },
        {
          "id": "b",
          "text": "Edgar F. Codd"
        },
        {
          "id": "c",
          "text": "Jim Gray"
        },
        {
          "id": "d",
          "text": "Michael Stonebraker"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The introduction credits Eric Brewer in 2000.",
      "source": "/references/database-session-8-slides.pdf#page=25",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "4.1 Introduction to CAP Theorem"
        }
      ]
    },
    {
      "id": "db-s8-q039",
      "prompt": "Which outcome satisfies the lecture’s definition of strong consistency?",
      "options": [
        {
          "id": "a",
          "text": "Every read gets an answer, but it may be arbitrarily old."
        },
        {
          "id": "b",
          "text": "A read can return a newer value on one node and an older value on another."
        },
        {
          "id": "c",
          "text": "Each read returns the latest write or an error."
        },
        {
          "id": "d",
          "text": "Every write is acknowledged before any node stores it."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Strong consistency is defined as receiving the most recent write or an error.",
      "source": "/references/database-session-8-slides.pdf#page=26",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "4.2 C: Consistency (Strong)"
        }
      ]
    },
    {
      "id": "db-s8-q040",
      "prompt": "After a bank withdrawal is committed, a remote read is required to reflect the new balance or fail. Which CAP property is prioritized?",
      "options": [
        {
          "id": "a",
          "text": "Availability"
        },
        {
          "id": "b",
          "text": "Partition-free execution"
        },
        {
          "id": "c",
          "text": "Replica count"
        },
        {
          "id": "d",
          "text": "Consistency"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The bank-account analogy illustrates strong consistency across nodes.",
      "source": "/references/database-session-8-slides.pdf#page=26",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "4.2 C: Consistency (Strong)"
        }
      ]
    },
    {
      "id": "db-s8-q041",
      "prompt": "Which behavior is consistent with the lecture’s definition of availability?",
      "options": [
        {
          "id": "a",
          "text": "Every request gets a non-error response, potentially with stale data."
        },
        {
          "id": "b",
          "text": "Every response must contain the most recent value."
        },
        {
          "id": "c",
          "text": "The service may reject requests until all nodes synchronize."
        },
        {
          "id": "d",
          "text": "All nodes must commit the same write simultaneously."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Availability emphasizes a response to every request, even when replicas are out of sync.",
      "source": "/references/database-session-8-slides.pdf#page=27",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.3 A: Availability"
        }
      ]
    },
    {
      "id": "db-s8-q042",
      "prompt": "A feed still opens during a partition but shows an older Like count. Which guarantee is being favored?",
      "options": [
        {
          "id": "a",
          "text": "Strong consistency"
        },
        {
          "id": "b",
          "text": "Availability"
        },
        {
          "id": "c",
          "text": "Serializability"
        },
        {
          "id": "d",
          "text": "Zero-lag replication"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide’s social-feed analogy shows an available but potentially stale response.",
      "source": "/references/database-session-8-slides.pdf#page=27",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.3 A: Availability"
        }
      ]
    },
    {
      "id": "db-s8-q043",
      "prompt": "What does partition tolerance mean in the CAP theorem as defined in the slides?",
      "options": [
        {
          "id": "a",
          "text": "All servers must store unique subsets of rows."
        },
        {
          "id": "b",
          "text": "The database cannot operate without a primary."
        },
        {
          "id": "c",
          "text": "The system continues operating despite dropped or delayed messages between nodes."
        },
        {
          "id": "d",
          "text": "Network latency is guaranteed to be zero."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Partition tolerance concerns continued operation when communication between nodes is disrupted.",
      "source": "/references/database-session-8-slides.pdf#page=28",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "4.4 P : Partition Tolerance"
        }
      ]
    },
    {
      "id": "db-s8-q044",
      "prompt": "Why does the lecture treat partition tolerance as effectively mandatory for distributed systems?",
      "options": [
        {
          "id": "a",
          "text": "It improves the speed of every SQL join."
        },
        {
          "id": "b",
          "text": "It replaces all consistency constraints."
        },
        {
          "id": "c",
          "text": "It is a setting that users can turn off."
        },
        {
          "id": "d",
          "text": "Real networks can fail or split unexpectedly."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Partitions are treated as unavoidable network faults in real deployments.",
      "source": "/references/database-session-8-slides.pdf#page=28",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "4.4 P : Partition Tolerance"
        }
      ]
    },
    {
      "id": "db-s8-q045",
      "prompt": "A partition separates two replicas. One side rejects requests rather than risk serving inconsistent data. Which design priority does this best represent?",
      "options": [
        {
          "id": "a",
          "text": "CP"
        },
        {
          "id": "b",
          "text": "AP"
        },
        {
          "id": "c",
          "text": "CA irrespective of partition"
        },
        {
          "id": "d",
          "text": "Pure read scaling"
        }
      ],
      "correctOptionId": "a",
      "explanation": "In the lecture, CP preserves consistency during partitions by sacrificing availability for some requests.",
      "source": "/references/database-session-8-slides.pdf#page=29",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.5 Making the Choice: CP vs. AP"
        }
      ]
    },
    {
      "id": "db-s8-q046",
      "prompt": "During a network partition, both sides continue responding even though values may disagree. Which design priority is illustrated?",
      "options": [
        {
          "id": "a",
          "text": "Synchronous replication only"
        },
        {
          "id": "b",
          "text": "AP"
        },
        {
          "id": "c",
          "text": "CP"
        },
        {
          "id": "d",
          "text": "Serializable execution"
        }
      ],
      "correctOptionId": "b",
      "explanation": "AP maintains non-error responses but permits temporary inconsistency.",
      "source": "/references/database-session-8-slides.pdf#page=29",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.5 Making the Choice: CP vs. AP"
        }
      ]
    },
    {
      "id": "db-s8-q047",
      "prompt": "Which application is placed under CP use cases in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A social-media Like counter"
        },
        {
          "id": "b",
          "text": "A public comment cache"
        },
        {
          "id": "c",
          "text": "A stock-trading system"
        },
        {
          "id": "d",
          "text": "A feed of noncritical recommendations"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Banking, stock trading and medical records are examples in the CP column.",
      "source": "/references/database-session-8-slides.pdf#page=29",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.5 Making the Choice: CP vs. AP"
        }
      ]
    },
    {
      "id": "db-s8-q048",
      "prompt": "Which application is listed as an AP-oriented use case?",
      "options": [
        {
          "id": "a",
          "text": "Bank balance transfers"
        },
        {
          "id": "b",
          "text": "Trading account settlement"
        },
        {
          "id": "c",
          "text": "Medical patient records"
        },
        {
          "id": "d",
          "text": "Video comments and caching"
        }
      ],
      "correctOptionId": "d",
      "explanation": "YouTube comments, Facebook feeds, and caches appear under AP.",
      "source": "/references/database-session-8-slides.pdf#page=29",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.5 Making the Choice: CP vs. AP"
        }
      ]
    },
    {
      "id": "db-s8-q049",
      "prompt": "How is single-node PostgreSQL characterized in the lecture’s CAP mapping table?",
      "options": [
        {
          "id": "a",
          "text": "A CA-oriented relational system"
        },
        {
          "id": "b",
          "text": "An intrinsically AP distributed system"
        },
        {
          "id": "c",
          "text": "A CP system that never allows reads"
        },
        {
          "id": "d",
          "text": "A sharded NoSQL system"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The table labels PostgreSQL (Single Node) as CA / Pure ACID; this is a lecture classification of a non-distributed setup.",
      "source": "/references/database-session-8-slides.pdf#page=30",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "4.6 CAP Mapping of Popular Databases"
        }
      ]
    },
    {
      "id": "db-s8-q050",
      "prompt": "Which pair is placed in the AP category in the lecture’s database comparison?",
      "options": [
        {
          "id": "a",
          "text": "PostgreSQL and HBase"
        },
        {
          "id": "b",
          "text": "Cassandra and CouchDB"
        },
        {
          "id": "c",
          "text": "MongoDB and Redis"
        },
        {
          "id": "d",
          "text": "Redis and HBase"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The CAP-mapping table lists Cassandra and CouchDB under AP.",
      "source": "/references/database-session-8-slides.pdf#page=30",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "4.6 CAP Mapping of Popular Databases"
        }
      ]
    },
    {
      "id": "db-s8-q051",
      "prompt": "What qualification does the lecture provide about mapping database products to CAP categories?",
      "options": [
        {
          "id": "a",
          "text": "Every product permanently belongs to a single CAP class."
        },
        {
          "id": "b",
          "text": "CAP classification depends exclusively on SQL syntax."
        },
        {
          "id": "c",
          "text": "Configurations such as PostgreSQL replication can shift the consistency/availability trade-off."
        },
        {
          "id": "d",
          "text": "Replication settings never influence distributed behavior."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide notes that databases with replication can be tuned toward CP or AP depending on configuration.",
      "source": "/references/database-session-8-slides.pdf#page=30",
      "topic": "CAP theorem",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "4.6 CAP Mapping of Popular Databases"
        }
      ]
    },
    {
      "id": "db-s8-q052",
      "prompt": "In the dvdrental Docker lab, which port is assigned to the read-only replica?",
      "options": [
        {
          "id": "a",
          "text": "5432"
        },
        {
          "id": "b",
          "text": "3306"
        },
        {
          "id": "c",
          "text": "6379"
        },
        {
          "id": "d",
          "text": "5433"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lab assigns port 5432 to the primary and 5433 to the replica.",
      "source": "/references/database-session-8-slides.pdf#page=32",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "5.1 Lab Scenario: The dvdrental Cluster"
        }
      ]
    },
    {
      "id": "db-s8-q053",
      "prompt": "Which component is used to start the preconfigured primary-replica environment?",
      "options": [
        {
          "id": "a",
          "text": "A Docker Compose configuration"
        },
        {
          "id": "b",
          "text": "A PostgreSQL materialized view"
        },
        {
          "id": "c",
          "text": "A sharding-key trigger"
        },
        {
          "id": "d",
          "text": "A standalone machine-learning notebook"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lab uses Docker Compose to start nodes with streaming replication.",
      "source": "/references/database-session-8-slides.pdf#page=32",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "5.1 Lab Scenario: The dvdrental Cluster"
        }
      ]
    },
    {
      "id": "db-s8-q054",
      "prompt": "Where does the lab direct students to restore the dvdrental sample database?",
      "options": [
        {
          "id": "a",
          "text": "The replica before the primary"
        },
        {
          "id": "b",
          "text": "The primary node"
        },
        {
          "id": "c",
          "text": "Every application client"
        },
        {
          "id": "d",
          "text": "The Docker host outside PostgreSQL"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The specified restore command targets the primary database.",
      "source": "/references/database-session-8-slides.pdf#page=32",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "5.1 Lab Scenario: The dvdrental Cluster"
        }
      ]
    },
    {
      "id": "db-s8-q055",
      "prompt": "Which PostgreSQL configuration setting enables the WAL information needed for replica streaming in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "archive_mode = off"
        },
        {
          "id": "b",
          "text": "max_connections = 1"
        },
        {
          "id": "c",
          "text": "wal_level = replica"
        },
        {
          "id": "d",
          "text": "default_transaction_read_only = off"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The primary postgresql.conf slide explicitly sets wal_level = replica.",
      "source": "/references/database-session-8-slides.pdf#page=33",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "5.2 Behind the Scenes: Configuration"
        }
      ]
    },
    {
      "id": "db-s8-q056",
      "prompt": "What is the role of max_wal_senders = 10 in the lecture’s primary configuration?",
      "options": [
        {
          "id": "a",
          "text": "Limit SQL query results to ten rows"
        },
        {
          "id": "b",
          "text": "Create ten independent sharding keys"
        },
        {
          "id": "c",
          "text": "Reserve ten application users"
        },
        {
          "id": "d",
          "text": "Configure capacity for WAL-sending processes"
        }
      ],
      "correctOptionId": "d",
      "explanation": "max_wal_senders controls how many WAL sender processes may run.",
      "source": "/references/database-session-8-slides.pdf#page=33",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "5.2 Behind the Scenes: Configuration"
        }
      ]
    },
    {
      "id": "db-s8-q057",
      "prompt": "Which file contains the lab’s network authentication entry for a replication user?",
      "options": [
        {
          "id": "a",
          "text": "pg_hba.conf"
        },
        {
          "id": "b",
          "text": "pg_stat_statements"
        },
        {
          "id": "c",
          "text": "docker-compose.log"
        },
        {
          "id": "d",
          "text": "pg_indexes"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide places host replication replicator ... md5 in pg_hba.conf.",
      "source": "/references/database-session-8-slides.pdf#page=33",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "5.2 Behind the Scenes: Configuration"
        }
      ]
    },
    {
      "id": "db-s8-q058",
      "prompt": "How does the replica obtain changes from the primary in the lab’s streaming setup?",
      "options": [
        {
          "id": "a",
          "text": "By periodically copying query screenshots"
        },
        {
          "id": "b",
          "text": "By receiving and replaying streamed WAL records"
        },
        {
          "id": "c",
          "text": "By independently executing web-form SQL"
        },
        {
          "id": "d",
          "text": "By rebuilding all tables from CSV per request"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The primary streams WAL, which is replayed at the replica.",
      "source": "/references/database-session-8-slides.pdf#page=33",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "5.2 Behind the Scenes: Configuration"
        }
      ]
    },
    {
      "id": "db-s8-q059",
      "prompt": "After updating customer.active on the primary, what is the intended verification on the replica?",
      "options": [
        {
          "id": "a",
          "text": "Run pg_restore again before every read."
        },
        {
          "id": "b",
          "text": "Change the replica into a writable shard."
        },
        {
          "id": "c",
          "text": "Query the same customer and observe the propagated value."
        },
        {
          "id": "d",
          "text": "Delete the customer so both nodes match."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lab checks that the new active value can be read on the replica after replication.",
      "source": "/references/database-session-8-slides.pdf#page=34",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 34,
          "slideNumber": 29,
          "slideTitle": "5.3 Verification Task"
        }
      ]
    },
    {
      "id": "db-s8-q060",
      "prompt": "Why should DELETE FROM rental fail when executed on the read-only replica in the lab?",
      "options": [
        {
          "id": "a",
          "text": "The rental table has no primary key."
        },
        {
          "id": "b",
          "text": "Only SELECT queries can be parameterized."
        },
        {
          "id": "c",
          "text": "Cross-shard joins are unsupported."
        },
        {
          "id": "d",
          "text": "The replica rejects writes in a read-only transaction."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lab shows a cannot execute DELETE in a read-only transaction error.",
      "source": "/references/database-session-8-slides.pdf#page=34",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 34,
          "slideNumber": 29,
          "slideTitle": "5.3 Verification Task"
        }
      ]
    },
    {
      "id": "db-s8-q061",
      "prompt": "A project requires low write latency even if a replica is temporarily behind. Which option matches the lecture’s trade-off?",
      "options": [
        {
          "id": "a",
          "text": "Asynchronous replication, accepting possible lag"
        },
        {
          "id": "b",
          "text": "Synchronous replication, waiting for replica acknowledgement"
        },
        {
          "id": "c",
          "text": "A single-node setup with no redundancy"
        },
        {
          "id": "d",
          "text": "Two-phase commit over all read replicas"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Asynchronous mode favors fast commits but admits replication lag; synchronous waits for acknowledgement.",
      "source": "/references/database-session-8-slides.pdf#page=14",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "2.4 Synchronous Replication"
        }
      ]
    },
    {
      "id": "db-s8-q062",
      "prompt": "An application suffers uneven shard load because new IDs all fall into the highest range. Which alternative does the slide present for more even distribution?",
      "options": [
        {
          "id": "a",
          "text": "Replacing all replicas with one server"
        },
        {
          "id": "b",
          "text": "Hash-based assignment of customer IDs"
        },
        {
          "id": "c",
          "text": "Ordering every table by customer_id"
        },
        {
          "id": "d",
          "text": "Enabling synchronous replication everywhere"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Hash-based sharding is presented as a way to distribute keys more evenly than ranges.",
      "source": "/references/database-session-8-slides.pdf#page=21",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.3 The Sharding Key"
        }
      ]
    },
    {
      "id": "db-s8-q063",
      "prompt": "Which statement avoids a common misunderstanding of the CAP theorem?",
      "options": [
        {
          "id": "a",
          "text": "Every distributed system always chooses exactly two properties regardless of failures."
        },
        {
          "id": "b",
          "text": "A non-partitioned system must reject either all reads or all writes."
        },
        {
          "id": "c",
          "text": "When a partition occurs, maintaining strong consistency can require rejecting some requests."
        },
        {
          "id": "d",
          "text": "Partition tolerance means the network will never lose messages."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lecture specifically frames the C-versus-A choice in the presence of a network partition.",
      "source": "/references/database-session-8-slides.pdf#page=25",
      "topic": "Hands-on lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB8 (1).pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "4.1 Introduction to CAP Theorem"
        }
      ]
    }
  ]
};
