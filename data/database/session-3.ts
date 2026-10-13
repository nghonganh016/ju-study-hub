import type { Chapter } from "@/types/quiz";

export const session3: Chapter = {
  "id": "session-3",
  "title": "Session 3: Introduction to Query Optimization",
  "description": "58 câu hỏi đã duyệt về query optimization, EXPLAIN ANALYZE và các chiến lược join.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s3-q001",
      "prompt": "Which component validates SQL syntax and table names?",
      "options": [
        {
          "id": "a",
          "text": "Parser"
        },
        {
          "id": "b",
          "text": "Rewriter"
        },
        {
          "id": "c",
          "text": "Optimizer"
        },
        {
          "id": "d",
          "text": "Executor"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The Parser checks syntax and validates identifiers against the system catalog.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        }
      ]
    },
    {
      "id": "db-s3-q002",
      "prompt": "A query references a view. Which phase expands it into its underlying query?",
      "options": [
        {
          "id": "a",
          "text": "Parser"
        },
        {
          "id": "b",
          "text": "Buffer manager"
        },
        {
          "id": "c",
          "text": "Rewriter"
        },
        {
          "id": "d",
          "text": "Executor"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The Rewriter handles rules and view expansion before planning.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        }
      ]
    },
    {
      "id": "db-s3-q003",
      "prompt": "What is the principal task of the cost-based Optimizer?",
      "options": [
        {
          "id": "a",
          "text": "Run physical joins"
        },
        {
          "id": "b",
          "text": "Commit transactions"
        },
        {
          "id": "c",
          "text": "Check SQL grammar"
        },
        {
          "id": "d",
          "text": "Select a low-estimated-cost execution plan"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The planner compares candidate execution plans using statistical cost estimates.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        }
      ]
    },
    {
      "id": "db-s3-q004",
      "prompt": "Which stage physically scans tables and returns the result rows?",
      "options": [
        {
          "id": "a",
          "text": "Optimizer"
        },
        {
          "id": "b",
          "text": "Executor"
        },
        {
          "id": "c",
          "text": "Rewriter"
        },
        {
          "id": "d",
          "text": "Parser"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The Executor carries out scans, joins and sorts in the selected plan.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        }
      ]
    },
    {
      "id": "db-s3-q005",
      "prompt": "Which sequence describes the query lifecycle presented in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Parser → Executor → Optimizer → Rewriter"
        },
        {
          "id": "b",
          "text": "Rewriter → Optimizer → Parser → Executor"
        },
        {
          "id": "c",
          "text": "Parser → Rewriter → Optimizer → Executor"
        },
        {
          "id": "d",
          "text": "Optimizer → Parser → Executor → Rewriter"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Validation precedes rewriting, planning and physical execution.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        }
      ]
    },
    {
      "id": "db-s3-q006",
      "prompt": "Why might the plan selected by the Optimizer perform poorly?",
      "options": [
        {
          "id": "a",
          "text": "Table statistics are outdated"
        },
        {
          "id": "b",
          "text": "The Rewriter sorts every table"
        },
        {
          "id": "c",
          "text": "A view cannot be optimized"
        },
        {
          "id": "d",
          "text": "EXPLAIN disables indexes"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Inaccurate statistics can lead to incorrect row estimates and poor plan choices.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 42,
          "slideNumber": 39,
          "slideTitle": "Summary"
        }
      ]
    },
    {
      "id": "db-s3-q007",
      "prompt": "Which catalog information does the lecture associate with the Optimizer's row estimates?",
      "options": [
        {
          "id": "a",
          "text": "pg_roles"
        },
        {
          "id": "b",
          "text": "pg_class only"
        },
        {
          "id": "c",
          "text": "pg_locks"
        },
        {
          "id": "d",
          "text": "pg_stats"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture explicitly identifies pg_stats as the basis for cost estimates.",
      "source": "/references/database-session-3-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "How Postgres Processes a Query"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 42,
          "slideNumber": 39,
          "slideTitle": "Summary"
        }
      ]
    },
    {
      "id": "db-s3-q008",
      "prompt": "What distinguishes EXPLAIN ANALYZE from ordinary EXPLAIN?",
      "options": [
        {
          "id": "a",
          "text": "It creates a missing index"
        },
        {
          "id": "b",
          "text": "It executes the query and reports actual measurements"
        },
        {
          "id": "c",
          "text": "It always changes the join order"
        },
        {
          "id": "d",
          "text": "It disables cost estimates"
        }
      ],
      "correctOptionId": "b",
      "explanation": "ANALYZE executes the statement and reports actual timings and rows.",
      "source": "/references/database-session-3-slides.pdf#page=6",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "\"X-Raying\" Queries with EXPLAIN ANALYZE"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Mastering EXPLAIN Parameters"
        }
      ]
    },
    {
      "id": "db-s3-q009",
      "prompt": "Why should EXPLAIN ANALYZE be used carefully with an UPDATE?",
      "options": [
        {
          "id": "a",
          "text": "It always commits a new index"
        },
        {
          "id": "b",
          "text": "It runs without any transaction support"
        },
        {
          "id": "c",
          "text": "It actually executes the UPDATE"
        },
        {
          "id": "d",
          "text": "It never produces a plan"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The analyzed statement is executed, so changes may occur; the slide advises using a transaction.",
      "source": "/references/database-session-3-slides.pdf#page=7",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Mastering EXPLAIN Parameters"
        }
      ]
    },
    {
      "id": "db-s3-q010",
      "prompt": "Which EXPLAIN option shows output columns and schema-qualified names?",
      "options": [
        {
          "id": "a",
          "text": "VERBOSE"
        },
        {
          "id": "b",
          "text": "BUFFERS"
        },
        {
          "id": "c",
          "text": "ANALYZE"
        },
        {
          "id": "d",
          "text": "COSTS"
        }
      ],
      "correctOptionId": "a",
      "explanation": "VERBOSE adds plan details such as Output and schema-qualified names.",
      "source": "/references/database-session-3-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "Mastering EXPLAIN Parameters"
        }
      ]
    },
    {
      "id": "db-s3-q011",
      "prompt": "Which option provides estimated startup and total cost?",
      "options": [
        {
          "id": "a",
          "text": "VERBOSE"
        },
        {
          "id": "b",
          "text": "SETTINGS"
        },
        {
          "id": "c",
          "text": "BUFFERS"
        },
        {
          "id": "d",
          "text": "COSTS"
        }
      ],
      "correctOptionId": "d",
      "explanation": "COSTS reports estimated startup and total work.",
      "source": "/references/database-session-3-slides.pdf#page=7",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Mastering EXPLAIN Parameters"
        }
      ]
    },
    {
      "id": "db-s3-q012",
      "prompt": "Which option exposes shared hit and disk read counts?",
      "options": [
        {
          "id": "a",
          "text": "BUFFERS"
        },
        {
          "id": "b",
          "text": "VERBOSE"
        },
        {
          "id": "c",
          "text": "ANALYZE"
        },
        {
          "id": "d",
          "text": "COSTS"
        }
      ],
      "correctOptionId": "a",
      "explanation": "BUFFERS reports buffer accesses, including shared hits and reads.",
      "source": "/references/database-session-3-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "Mastering EXPLAIN Parameters"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 12,
          "slideNumber": 11,
          "slideTitle": "The Buffer Strategy: I/O Efficiency"
        }
      ]
    },
    {
      "id": "db-s3-q013",
      "prompt": "What do the two figures in cost=0.00..100.50 represent?",
      "options": [
        {
          "id": "a",
          "text": "Startup and total estimated cost"
        },
        {
          "id": "b",
          "text": "Rows kept and rows rejected"
        },
        {
          "id": "c",
          "text": "Minimum and maximum milliseconds"
        },
        {
          "id": "d",
          "text": "Buffer hits and reads"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The first figure is startup cost; the second is total estimated cost.",
      "source": "/references/database-session-3-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "Case Study 1: The Sequential Scan"
        }
      ]
    },
    {
      "id": "db-s3-q014",
      "prompt": "In Seq Scan ... rows=51 width=384, what does width=384 estimate?",
      "options": [
        {
          "id": "a",
          "text": "Query milliseconds"
        },
        {
          "id": "b",
          "text": "Average bytes per row"
        },
        {
          "id": "c",
          "text": "Rows removed by filter"
        },
        {
          "id": "d",
          "text": "Pages scanned"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Width estimates the average bytes per output row.",
      "source": "/references/database-session-3-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "Case Study 1: The Sequential Scan"
        }
      ]
    },
    {
      "id": "db-s3-q015",
      "prompt": "For a plan node with actual time=0.009..0.567, what are these figures?",
      "options": [
        {
          "id": "a",
          "text": "CPU cost and I/O cost"
        },
        {
          "id": "b",
          "text": "First-row and completion times in milliseconds"
        },
        {
          "id": "c",
          "text": "Planning and execution cost units"
        },
        {
          "id": "d",
          "text": "Minimum and maximum row counts"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The two actual-time figures describe time to first row and to return all rows.",
      "source": "/references/database-session-3-slides.pdf#page=10",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 10,
          "slideNumber": 9,
          "slideTitle": "Execution Stats: Theory vs. Reality"
        }
      ]
    },
    {
      "id": "db-s3-q016",
      "prompt": "A plan node reports loops=3. What does this indicate?",
      "options": [
        {
          "id": "a",
          "text": "Three output columns"
        },
        {
          "id": "b",
          "text": "Three disk pages"
        },
        {
          "id": "c",
          "text": "The node executed three times"
        },
        {
          "id": "d",
          "text": "Three distinct indexes"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Loops counts how often that plan node executes.",
      "source": "/references/database-session-3-slides.pdf#page=10",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 10,
          "slideNumber": 9,
          "slideTitle": "Execution Stats: Theory vs. Reality"
        }
      ]
    },
    {
      "id": "db-s3-q017",
      "prompt": "A Seq Scan reports rows=51 and Rows Removed by Filter: 949, with one loop. How many rows were checked?",
      "options": [
        {
          "id": "a",
          "text": "898"
        },
        {
          "id": "b",
          "text": "51"
        },
        {
          "id": "c",
          "text": "949"
        },
        {
          "id": "d",
          "text": "1000"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The scan inspected 51 qualifying plus 949 rejected rows.",
      "source": "/references/database-session-3-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 11,
          "slideNumber": 10,
          "slideTitle": "Execution Stats: Theory vs. Reality"
        }
      ]
    },
    {
      "id": "db-s3-q018",
      "prompt": "What does Buffers: shared hit=88 mean in the lecture's example?",
      "options": [
        {
          "id": "a",
          "text": "88 indexes were scanned"
        },
        {
          "id": "b",
          "text": "88 block accesses were served from shared buffers"
        },
        {
          "id": "c",
          "text": "88 rows were filtered"
        },
        {
          "id": "d",
          "text": "88 blocks were necessarily read from disk"
        }
      ],
      "correctOptionId": "b",
      "explanation": "A shared hit means the requested block was already in the shared buffer pool.",
      "source": "/references/database-session-3-slides.pdf#page=12",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 12,
          "slideNumber": 11,
          "slideTitle": "The Buffer Strategy: I/O Efficiency"
        }
      ]
    },
    {
      "id": "db-s3-q019",
      "prompt": "What does Planning Time measure?",
      "options": [
        {
          "id": "a",
          "text": "Time spent returning rows"
        },
        {
          "id": "b",
          "text": "Time needed for table creation"
        },
        {
          "id": "c",
          "text": "Time spent finding an execution plan"
        },
        {
          "id": "d",
          "text": "Time spent writing result files"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Planning Time measures plan selection rather than data retrieval.",
      "source": "/references/database-session-3-slides.pdf#page=13",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 13,
          "slideNumber": 12,
          "slideTitle": "The Buffer Strategy: I/O Efficiency"
        }
      ]
    },
    {
      "id": "db-s3-q020",
      "prompt": "Which metric should be compared with actual rows to judge estimate accuracy?",
      "options": [
        {
          "id": "a",
          "text": "Width"
        },
        {
          "id": "b",
          "text": "Estimated rows"
        },
        {
          "id": "c",
          "text": "Planning time"
        },
        {
          "id": "d",
          "text": "Shared hit"
        }
      ],
      "correctOptionId": "b",
      "explanation": "A gap between estimated rows and actual rows suggests inaccurate estimates.",
      "source": "/references/database-session-3-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 14,
          "slideNumber": 13,
          "slideTitle": "Reference Table for Indexing Strategy"
        }
      ]
    },
    {
      "id": "db-s3-q021",
      "prompt": "Before an index exists on replacement_cost, which access method appears in the lecture's film example?",
      "options": [
        {
          "id": "a",
          "text": "Hash Join"
        },
        {
          "id": "b",
          "text": "Index Only Scan"
        },
        {
          "id": "c",
          "text": "Bitmap Index Scan"
        },
        {
          "id": "d",
          "text": "Seq Scan"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The example initially uses Seq Scan to inspect the non-indexed column.",
      "source": "/references/database-session-3-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "Case Study 1: The Sequential Scan"
        }
      ]
    },
    {
      "id": "db-s3-q022",
      "prompt": "What is the first step in the lecture's two-stage bitmap access path?",
      "options": [
        {
          "id": "a",
          "text": "Fetch every heap row"
        },
        {
          "id": "b",
          "text": "Bitmap Index Scan to identify matching locations"
        },
        {
          "id": "c",
          "text": "Sort the entire film table"
        },
        {
          "id": "d",
          "text": "Build a join hash table"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The Bitmap Index Scan finds matching locations before heap retrieval.",
      "source": "/references/database-session-3-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 15,
          "slideNumber": 14,
          "slideTitle": "Case Study 2: Index Scan"
        }
      ]
    },
    {
      "id": "db-s3-q023",
      "prompt": "What is the primary output of a Bitmap Index Scan in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A set of joined tuples"
        },
        {
          "id": "b",
          "text": "A sorted copy of the heap"
        },
        {
          "id": "c",
          "text": "A bitmap marking pages to visit"
        },
        {
          "id": "d",
          "text": "A permanently stored index"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Its bitmap guides subsequent heap-page retrieval.",
      "source": "/references/database-session-3-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 15,
          "slideNumber": 14,
          "slideTitle": "Case Study 2: Index Scan"
        }
      ]
    },
    {
      "id": "db-s3-q024",
      "prompt": "What does the Bitmap Heap Scan do after the index phase?",
      "options": [
        {
          "id": "a",
          "text": "Rewrites the query tree"
        },
        {
          "id": "b",
          "text": "Rebuilds the index"
        },
        {
          "id": "c",
          "text": "Visits heap pages indicated by the bitmap"
        },
        {
          "id": "d",
          "text": "Hashes the customer table"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The heap scan fetches the relevant pages rather than the entire table.",
      "source": "/references/database-session-3-slides.pdf#page=16",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 16,
          "slideNumber": 15,
          "slideTitle": "The Result of Indexing: Bitmap Heap Scan"
        }
      ]
    },
    {
      "id": "db-s3-q025",
      "prompt": "In the bitmap plan, what does Heap Blocks (exact=39) indicate?",
      "options": [
        {
          "id": "a",
          "text": "39 rows passed the filter"
        },
        {
          "id": "b",
          "text": "39 milliseconds were spent planning"
        },
        {
          "id": "c",
          "text": "39 exact heap blocks were accessed"
        },
        {
          "id": "d",
          "text": "39 indexes were built"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Exact identifies heap blocks visited by the bitmap heap phase.",
      "source": "/references/database-session-3-slides.pdf#page=16",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 16,
          "slideNumber": 15,
          "slideTitle": "The Result of Indexing: Bitmap Heap Scan"
        }
      ]
    },
    {
      "id": "db-s3-q026",
      "prompt": "Why may bitmap access beat repeated regular index lookups for medium-sized results?",
      "options": [
        {
          "id": "a",
          "text": "It never uses a buffer pool"
        },
        {
          "id": "b",
          "text": "It stores the result permanently"
        },
        {
          "id": "c",
          "text": "It avoids all data reads"
        },
        {
          "id": "d",
          "text": "It groups heap-page visits to reduce random I/O"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Ordering page retrieval can reduce random-access overhead.",
      "source": "/references/database-session-3-slides.pdf#page=16",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 16,
          "slideNumber": 15,
          "slideTitle": "The Result of Indexing: Bitmap Heap Scan"
        }
      ]
    },
    {
      "id": "db-s3-q027",
      "prompt": "The lecture compares execution times 0.591 ms and 0.116 ms. Which conclusion is supported for that example?",
      "options": [
        {
          "id": "a",
          "text": "The first plan read no rows"
        },
        {
          "id": "b",
          "text": "Indexing is always slower"
        },
        {
          "id": "c",
          "text": "The bitmap plan was about five times faster"
        },
        {
          "id": "d",
          "text": "Performance is unchanged"
        }
      ],
      "correctOptionId": "c",
      "explanation": "0.591 divided by 0.116 is approximately 5.1 for the reported run.",
      "source": "/references/database-session-3-slides.pdf#page=17",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 17,
          "slideNumber": 16,
          "slideTitle": "Before vs. After: The Verdict"
        }
      ]
    },
    {
      "id": "db-s3-q028",
      "prompt": "In the example, what happens to Rows Removed by Filter after the bitmap access path is selected?",
      "options": [
        {
          "id": "a",
          "text": "It rises from 0 to 949"
        },
        {
          "id": "b",
          "text": "It remains 949"
        },
        {
          "id": "c",
          "text": "It equals 51"
        },
        {
          "id": "d",
          "text": "It falls from 949 to 0"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture's comparison reports zero rows removed for its indexed plan.",
      "source": "/references/database-session-3-slides.pdf#page=17",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 17,
          "slideNumber": 16,
          "slideTitle": "Before vs. After: The Verdict"
        }
      ]
    },
    {
      "id": "db-s3-q029",
      "prompt": "Which factors does the lecture say influence the physical join choice?",
      "options": [
        {
          "id": "a",
          "text": "Table size, indexes and work_mem"
        },
        {
          "id": "b",
          "text": "Only the table names"
        },
        {
          "id": "c",
          "text": "Only the number of output aliases"
        },
        {
          "id": "d",
          "text": "Only the SELECT column order"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The planner considers sizes, index access and available memory.",
      "source": "/references/database-session-3-slides.pdf#page=19",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 19,
          "slideNumber": 17,
          "slideTitle": "Why Join Algorithms Matter?"
        }
      ]
    },
    {
      "id": "db-s3-q030",
      "prompt": "For a simple unindexed Nested Loop Join, how many inner rows may be compared across N outer and M inner rows?",
      "options": [
        {
          "id": "a",
          "text": "N × M"
        },
        {
          "id": "b",
          "text": "N + M"
        },
        {
          "id": "c",
          "text": "N / M"
        },
        {
          "id": "d",
          "text": "log(N + M)"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Each outer row can scan all M inner rows, giving O(N × M).",
      "source": "/references/database-session-3-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 20,
          "slideNumber": 18,
          "slideTitle": "Nested Loop Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 21,
          "slideNumber": 19,
          "slideTitle": "The Core Mechanics of Nested Loop Join"
        }
      ]
    },
    {
      "id": "db-s3-q031",
      "prompt": "In a Nested Loop plan, what is the outer table?",
      "options": [
        {
          "id": "a",
          "text": "The table always listed first in SQL"
        },
        {
          "id": "b",
          "text": "The table always containing more rows"
        },
        {
          "id": "c",
          "text": "The driving input scanned once"
        },
        {
          "id": "d",
          "text": "The table with the primary key"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The outer side drives repeated inner lookups.",
      "source": "/references/database-session-3-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 21,
          "slideNumber": 19,
          "slideTitle": "The Core Mechanics of Nested Loop Join"
        }
      ]
    },
    {
      "id": "db-s3-q032",
      "prompt": "Why is a small filtered outer input attractive for Nested Loop?",
      "options": [
        {
          "id": "a",
          "text": "It forces both tables to sort"
        },
        {
          "id": "b",
          "text": "It limits the number of inner lookups"
        },
        {
          "id": "c",
          "text": "It increases hash-table size"
        },
        {
          "id": "d",
          "text": "It removes the join predicate"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Fewer outer rows mean fewer executions of the inner access path.",
      "source": "/references/database-session-3-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 22,
          "slideNumber": 20,
          "slideTitle": "Who is Outer? Who is Inner?"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "The Planner's Math (Simplified)"
        }
      ]
    },
    {
      "id": "db-s3-q033",
      "prompt": "What makes an inner input especially efficient for a Nested Loop?",
      "options": [
        {
          "id": "a",
          "text": "An unindexed wide column"
        },
        {
          "id": "b",
          "text": "A larger inner Seq Scan"
        },
        {
          "id": "c",
          "text": "An unrelated ORDER BY"
        },
        {
          "id": "d",
          "text": "An index on the inner join key"
        }
      ],
      "correctOptionId": "d",
      "explanation": "An indexed lookup avoids repeatedly scanning the whole inner table.",
      "source": "/references/database-session-3-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 20,
          "slideNumber": 18,
          "slideTitle": "Nested Loop Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 22,
          "slideNumber": 20,
          "slideTitle": "Who is Outer? Who is Inner?"
        }
      ]
    },
    {
      "id": "db-s3-q034",
      "prompt": "Given Costouter=8, Rowsouter=5 and Costinner=2, what is the simplified total Nested Loop cost?",
      "options": [
        {
          "id": "a",
          "text": "18"
        },
        {
          "id": "b",
          "text": "40"
        },
        {
          "id": "c",
          "text": "80"
        },
        {
          "id": "d",
          "text": "10"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Using 8 + (5 × 2), the estimated cost is 18 units.",
      "source": "/references/database-session-3-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "The Planner's Math (Simplified)"
        }
      ]
    },
    {
      "id": "db-s3-q035",
      "prompt": "If Rowsouter grows from 5 to 500 with the other simplified cost terms fixed, what happens?",
      "options": [
        {
          "id": "a",
          "text": "The join automatically becomes invalid"
        },
        {
          "id": "b",
          "text": "Only startup cost changes"
        },
        {
          "id": "c",
          "text": "The repeated inner-scan contribution grows 100-fold"
        },
        {
          "id": "d",
          "text": "Cost stays constant"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The multiplicative term depends directly on outer row count.",
      "source": "/references/database-session-3-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "The Planner's Math (Simplified)"
        }
      ]
    },
    {
      "id": "db-s3-q036",
      "prompt": "For customer JOIN rental WHERE customer_id=1, why is Nested Loop plausible?",
      "options": [
        {
          "id": "a",
          "text": "The customer filter yields a very small driving input"
        },
        {
          "id": "b",
          "text": "Both tables must be sorted"
        },
        {
          "id": "c",
          "text": "Hashing is required for equality"
        },
        {
          "id": "d",
          "text": "The output is always empty"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The selective customer predicate makes the outer side very small.",
      "source": "/references/database-session-3-slides.pdf#page=24",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Lab Exercise 1: Triggering Nested Loop Join"
        }
      ]
    },
    {
      "id": "db-s3-q037",
      "prompt": "In the lecture's filtered customer lab, why might the inner scan show loops=1?",
      "options": [
        {
          "id": "a",
          "text": "Only one outer customer row drives the inner lookup"
        },
        {
          "id": "b",
          "text": "The entire rental table has one row"
        },
        {
          "id": "c",
          "text": "The optimizer skips the join"
        },
        {
          "id": "d",
          "text": "The query creates one index"
        }
      ],
      "correctOptionId": "a",
      "explanation": "One outer row triggers one execution of the inner node.",
      "source": "/references/database-session-3-slides.pdf#page=24",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Lab Exercise 1: Triggering Nested Loop Join"
        }
      ]
    },
    {
      "id": "db-s3-q038",
      "prompt": "What is the first phase of a Hash Join?",
      "options": [
        {
          "id": "a",
          "text": "Build a hash table from the smaller input"
        },
        {
          "id": "b",
          "text": "Repeatedly scan the inner table for each row"
        },
        {
          "id": "c",
          "text": "Sort both tables by the join key"
        },
        {
          "id": "d",
          "text": "Merge two sorted streams"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The build phase hashes one input into an in-memory table.",
      "source": "/references/database-session-3-slides.pdf#page=25",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 25,
          "slideNumber": 23,
          "slideTitle": "Hash Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 26,
          "slideNumber": 24,
          "slideTitle": "The Anatomy of Hash Join (The 2-Phase Strategy)"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 27,
          "slideNumber": 25,
          "slideTitle": "Hash Join Pseudocode"
        }
      ]
    },
    {
      "id": "db-s3-q039",
      "prompt": "What happens in the Hash Join probe phase?",
      "options": [
        {
          "id": "a",
          "text": "The database creates a B-tree"
        },
        {
          "id": "b",
          "text": "Rows are grouped with GROUP BY"
        },
        {
          "id": "c",
          "text": "The parser expands all views"
        },
        {
          "id": "d",
          "text": "Rows from the other input look up matching hash keys"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The other input is scanned and its join keys are probed in the hash table.",
      "source": "/references/database-session-3-slides.pdf#page=26",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 26,
          "slideNumber": 24,
          "slideTitle": "The Anatomy of Hash Join (The 2-Phase Strategy)"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 27,
          "slideNumber": 25,
          "slideTitle": "Hash Join Pseudocode"
        }
      ]
    },
    {
      "id": "db-s3-q040",
      "prompt": "Which join predicate suits the lecture's Hash Join mechanism?",
      "options": [
        {
          "id": "a",
          "text": "a.price > b.price"
        },
        {
          "id": "b",
          "text": "a.customer_id = b.customer_id"
        },
        {
          "id": "c",
          "text": "a.name LIKE b.prefix"
        },
        {
          "id": "d",
          "text": "a.price BETWEEN b.lo AND b.hi"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture's Hash Join is based on equality conditions.",
      "source": "/references/database-session-3-slides.pdf#page=25",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 25,
          "slideNumber": 23,
          "slideTitle": "Hash Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 29,
          "slideNumber": 27,
          "slideTitle": "Constraints & The work_mem Lifeblood"
        }
      ]
    },
    {
      "id": "db-s3-q041",
      "prompt": "Which input is normally hashed for a memory-efficient Hash Join?",
      "options": [
        {
          "id": "a",
          "text": "The final joined output"
        },
        {
          "id": "b",
          "text": "The smaller input"
        },
        {
          "id": "c",
          "text": "The input written first in SQL"
        },
        {
          "id": "d",
          "text": "The larger input regardless of size"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Building from the smaller input limits memory usage.",
      "source": "/references/database-session-3-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 28,
          "slideNumber": 26,
          "slideTitle": "Picking Inner vs. Outer (The Golden Rule)"
        }
      ]
    },
    {
      "id": "db-s3-q042",
      "prompt": "An execution plan contains Hash → Seq Scan on language. What role does language play?",
      "options": [
        {
          "id": "a",
          "text": "Building the hash table"
        },
        {
          "id": "b",
          "text": "Sorting output"
        },
        {
          "id": "c",
          "text": "Probing the hash table"
        },
        {
          "id": "d",
          "text": "Filtering the final projection"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The scan under Hash supplies rows for the build side.",
      "source": "/references/database-session-3-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 28,
          "slideNumber": 26,
          "slideTitle": "Picking Inner vs. Outer (The Golden Rule)"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 31,
          "slideNumber": 29,
          "slideTitle": "Lab Exercise 2: Triggering Hash Join"
        }
      ]
    },
    {
      "id": "db-s3-q043",
      "prompt": "What does Batches: 1 suggest for the illustrated Hash Join?",
      "options": [
        {
          "id": "a",
          "text": "One row was returned"
        },
        {
          "id": "b",
          "text": "Hash data fit in one in-memory batch"
        },
        {
          "id": "c",
          "text": "No join condition exists"
        },
        {
          "id": "d",
          "text": "There were no rows"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide contrasts one in-memory batch with multi-batch disk spilling.",
      "source": "/references/database-session-3-slides.pdf#page=29",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 29,
          "slideNumber": 27,
          "slideTitle": "Constraints & The work_mem Lifeblood"
        }
      ]
    },
    {
      "id": "db-s3-q044",
      "prompt": "What is the likely consequence when a Hash Join has Batches: 8?",
      "options": [
        {
          "id": "a",
          "text": "The query becomes a Merge Join automatically"
        },
        {
          "id": "b",
          "text": "No I/O is possible"
        },
        {
          "id": "c",
          "text": "The index is rebuilt"
        },
        {
          "id": "d",
          "text": "Extra disk I/O can slow the join"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Multiple batches signal disk-based partitioning/spilling.",
      "source": "/references/database-session-3-slides.pdf#page=29",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 29,
          "slideNumber": 27,
          "slideTitle": "Constraints & The work_mem Lifeblood"
        }
      ]
    },
    {
      "id": "db-s3-q045",
      "prompt": "Why does work_mem matter for Hash Join?",
      "options": [
        {
          "id": "a",
          "text": "It specifies the SQL parsing order"
        },
        {
          "id": "b",
          "text": "It stores SQL view definitions"
        },
        {
          "id": "c",
          "text": "It counts transaction commits"
        },
        {
          "id": "d",
          "text": "It constrains memory available for the hash operation"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Insufficient work_mem can lead to a disk spill.",
      "source": "/references/database-session-3-slides.pdf#page=25",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 25,
          "slideNumber": 23,
          "slideTitle": "Hash Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 29,
          "slideNumber": 27,
          "slideTitle": "Constraints & The work_mem Lifeblood"
        }
      ]
    },
    {
      "id": "db-s3-q046",
      "prompt": "Which situation most favors Hash Join according to the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A range predicate without equality"
        },
        {
          "id": "b",
          "text": "Already sorted huge inputs with a required ordered output"
        },
        {
          "id": "c",
          "text": "Large unsorted tables joined on equality without useful indexes"
        },
        {
          "id": "d",
          "text": "Tiny filtered data with an indexed lookup"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Hash Join avoids repeated scans and expensive presorting in this scenario.",
      "source": "/references/database-session-3-slides.pdf#page=30",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 30,
          "slideNumber": 28,
          "slideTitle": "When does the Optimizer choose Hash Join?"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 38,
          "slideNumber": 36,
          "slideTitle": "Summary: Comparison of Join Strategies"
        }
      ]
    },
    {
      "id": "db-s3-q047",
      "prompt": "What is the central prerequisite for the merge phase of a Merge Join?",
      "options": [
        {
          "id": "a",
          "text": "One outer row only"
        },
        {
          "id": "b",
          "text": "Inputs ordered by the join key"
        },
        {
          "id": "c",
          "text": "A hash table of every row"
        },
        {
          "id": "d",
          "text": "An index on every selected column"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Merge Join compares streams sorted on the join key.",
      "source": "/references/database-session-3-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 32,
          "slideNumber": 30,
          "slideTitle": "Merge Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 33,
          "slideNumber": 31,
          "slideTitle": "The Anatomy of Merge Join (The Zipper Approach)"
        }
      ]
    },
    {
      "id": "db-s3-q048",
      "prompt": "When two current join keys differ in a Merge Join, which pointer moves?",
      "options": [
        {
          "id": "a",
          "text": "The pointer on the smaller key"
        },
        {
          "id": "b",
          "text": "Always the pointer on the larger key"
        },
        {
          "id": "c",
          "text": "Always both pointers"
        },
        {
          "id": "d",
          "text": "Neither pointer"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Advancing the smaller key aligns the two ordered streams.",
      "source": "/references/database-session-3-slides.pdf#page=33",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 33,
          "slideNumber": 31,
          "slideTitle": "The Anatomy of Merge Join (The Zipper Approach)"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 34,
          "slideNumber": 32,
          "slideTitle": "Merge Join Pseudocode"
        }
      ]
    },
    {
      "id": "db-s3-q049",
      "prompt": "Assuming both inputs are already sorted, what is the lecture's ideal Merge Join complexity?",
      "options": [
        {
          "id": "a",
          "text": "O(N × M)"
        },
        {
          "id": "b",
          "text": "O(log N × log M)"
        },
        {
          "id": "c",
          "text": "O(N + M)"
        },
        {
          "id": "d",
          "text": "O(N² + M²)"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The two ordered inputs can be traversed linearly, excluding sorting.",
      "source": "/references/database-session-3-slides.pdf#page=33",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 33,
          "slideNumber": 31,
          "slideTitle": "The Anatomy of Merge Join (The Zipper Approach)"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 38,
          "slideNumber": 36,
          "slideTitle": "Summary: Comparison of Join Strategies"
        }
      ]
    },
    {
      "id": "db-s3-q050",
      "prompt": "When sorted join inputs are obtained via suitable B-tree indexes, which expense may be avoided?",
      "options": [
        {
          "id": "a",
          "text": "All join comparisons"
        },
        {
          "id": "b",
          "text": "An explicit sort before the merge"
        },
        {
          "id": "c",
          "text": "All table access"
        },
        {
          "id": "d",
          "text": "Query planning"
        }
      ],
      "correctOptionId": "b",
      "explanation": "An index-ordered scan can supply the sequence needed by Merge Join.",
      "source": "/references/database-session-3-slides.pdf#page=35",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 35,
          "slideNumber": 33,
          "slideTitle": "The Hidden Cost: Where does the Sort come from?"
        }
      ]
    },
    {
      "id": "db-s3-q051",
      "prompt": "Without index-ordered inputs, what costly operation may appear before Merge Join?",
      "options": [
        {
          "id": "a",
          "text": "Bitmap Index Scan only"
        },
        {
          "id": "b",
          "text": "Sort nodes with O(N log N) work"
        },
        {
          "id": "c",
          "text": "A new table definition"
        },
        {
          "id": "d",
          "text": "A transaction rollback"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Explicit sorting adds preprocessing overhead.",
      "source": "/references/database-session-3-slides.pdf#page=35",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 35,
          "slideNumber": 33,
          "slideTitle": "The Hidden Cost: Where does the Sort come from?"
        }
      ]
    },
    {
      "id": "db-s3-q052",
      "prompt": "Why is Merge Join attractive for huge sorted inputs exceeding RAM?",
      "options": [
        {
          "id": "a",
          "text": "It requires loading all rows into one hash table"
        },
        {
          "id": "b",
          "text": "It eliminates the join condition"
        },
        {
          "id": "c",
          "text": "It always needs repeated inner scans"
        },
        {
          "id": "d",
          "text": "It can stream ordered inputs with modest memory"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The merge phase streams sorted data without building a full in-memory hash table.",
      "source": "/references/database-session-3-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 32,
          "slideNumber": 30,
          "slideTitle": "Merge Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 36,
          "slideNumber": 34,
          "slideTitle": "When does the Optimizer choose Merge Join?"
        }
      ]
    },
    {
      "id": "db-s3-q053",
      "prompt": "A query requires output ordered by its join key. Which benefit can favor Merge Join?",
      "options": [
        {
          "id": "a",
          "text": "It never checks equality"
        },
        {
          "id": "b",
          "text": "It must execute as a Seq Scan"
        },
        {
          "id": "c",
          "text": "Its output follows the merge key order"
        },
        {
          "id": "d",
          "text": "It always uses less CPU than every alternative"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The merge process can naturally maintain the desired key ordering.",
      "source": "/references/database-session-3-slides.pdf#page=36",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 36,
          "slideNumber": 34,
          "slideTitle": "When does the Optimizer choose Merge Join?"
        }
      ]
    },
    {
      "id": "db-s3-q054",
      "prompt": "Why does the lab run SET enable_hashjoin = off and SET enable_nestedloop = off?",
      "options": [
        {
          "id": "a",
          "text": "To remove all indexes from disk"
        },
        {
          "id": "b",
          "text": "To encourage a Merge Join for demonstration"
        },
        {
          "id": "c",
          "text": "To change the join predicate to BETWEEN"
        },
        {
          "id": "d",
          "text": "To disable SQL parsing"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Disabling competing join strategies helps demonstrate Merge Join.",
      "source": "/references/database-session-3-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 32,
          "slideNumber": 30,
          "slideTitle": "Merge Join"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 37,
          "slideNumber": 35,
          "slideTitle": "Lab Exercise 3: Triggering Merge Join"
        }
      ]
    },
    {
      "id": "db-s3-q055",
      "prompt": "What is the purpose of RESET enable_hashjoin and RESET enable_nestedloop after the demonstration?",
      "options": [
        {
          "id": "a",
          "text": "To restore the previous planner settings"
        },
        {
          "id": "b",
          "text": "To remove EXPLAIN output"
        },
        {
          "id": "c",
          "text": "To erase table statistics"
        },
        {
          "id": "d",
          "text": "To force a persistent Merge Join"
        }
      ],
      "correctOptionId": "a",
      "explanation": "RESET restores the affected planner options.",
      "source": "/references/database-session-3-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 32,
          "slideNumber": 30,
          "slideTitle": "Merge Join"
        }
      ]
    },
    {
      "id": "db-s3-q056",
      "prompt": "In the lab, why compare plans before and after running ANALYZE on tables?",
      "options": [
        {
          "id": "a",
          "text": "ANALYZE removes all filters"
        },
        {
          "id": "b",
          "text": "ANALYZE recompiles SQL functions"
        },
        {
          "id": "c",
          "text": "Refreshed statistics may change cost estimates and plan choice"
        },
        {
          "id": "d",
          "text": "ANALYZE always forces an index"
        }
      ],
      "correctOptionId": "c",
      "explanation": "ANALYZE updates planner statistics, potentially influencing the selected path.",
      "source": "/references/database-session-3-slides.pdf#page=41",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 41,
          "slideNumber": 38,
          "slideTitle": "Hands-on Lab: Optimizing dvdrental"
        },
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 42,
          "slideNumber": 39,
          "slideTitle": "Summary"
        }
      ]
    },
    {
      "id": "db-s3-q057",
      "prompt": "A filtered rental query returns five rows but Nested Loop is not chosen. What is the correct conclusion?",
      "options": [
        {
          "id": "a",
          "text": "Hash Join requires at least 1000 outer rows"
        },
        {
          "id": "b",
          "text": "The optimizer ignores estimated costs"
        },
        {
          "id": "c",
          "text": "Nested Loop is prohibited for rental tables"
        },
        {
          "id": "d",
          "text": "Outer cardinality alone does not determine total join cost"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture invites comparison of small outer cardinality with inner lookup cost and table size.",
      "source": "/references/database-session-3-slides.pdf#page=39",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 39,
          "slideNumber": 37,
          "slideTitle": "Brain Teaser: Will this be a Nested Loop Join?"
        }
      ]
    },
    {
      "id": "db-s3-q058",
      "prompt": "What is the point of comparing enable_indexscan off versus on in the final lab?",
      "options": [
        {
          "id": "a",
          "text": "To alter the film table schema"
        },
        {
          "id": "b",
          "text": "To test trigger execution"
        },
        {
          "id": "c",
          "text": "To validate referential constraints"
        },
        {
          "id": "d",
          "text": "To observe how scan settings change estimated plans and performance"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lab changes planner preferences and compares EXPLAIN measurements.",
      "source": "/references/database-session-3-slides.pdf#page=41",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvancedDatabase3.pdf",
          "pdfPage": 41,
          "slideNumber": 38,
          "slideTitle": "Hands-on Lab: Optimizing dvdrental"
        }
      ]
    }
  ]
};
