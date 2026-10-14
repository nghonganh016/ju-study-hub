import type { Chapter } from "@/types/quiz";

export const session6: Chapter = {
  "id": "session-6",
  "title": "Session 6: Concurrency Control",
  "description": "50 câu hỏi đã duyệt về concurrency control, locking, deadlock và MVCC.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s6-q001",
      "prompt": "Why is executing every transaction serially unsuitable for a high-traffic e-commerce system?",
      "options": [
        {
          "id": "a",
          "text": "It eliminates transaction durability"
        },
        {
          "id": "b",
          "text": "It creates a throughput bottleneck"
        },
        {
          "id": "c",
          "text": "It prevents SQL queries from using indexes"
        },
        {
          "id": "d",
          "text": "It requires every transaction to roll back"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Serial execution minimizes conflicts but limits the number of requests processed concurrently.",
      "source": "/references/database-concurrency-control-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "The Paradox of Perfection (ACID)"
        }
      ]
    },
    {
      "id": "db-s6-q002",
      "prompt": "What is the primary purpose of concurrency control?",
      "options": [
        {
          "id": "a",
          "text": "To guarantee that each query uses a B-tree"
        },
        {
          "id": "b",
          "text": "To eliminate all waiting time"
        },
        {
          "id": "c",
          "text": "To replace transactions with independent statements"
        },
        {
          "id": "d",
          "text": "To balance isolation and throughput"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Concurrency control balances concurrent performance against interference between transactions.",
      "source": "/references/database-concurrency-control-slides.pdf#page=6",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "The Trade-off: Throughput vs. Isolation"
        }
      ]
    },
    {
      "id": "db-s6-q003",
      "prompt": "Which outcome is most likely when throughput is increased through unrestricted parallel execution?",
      "options": [
        {
          "id": "a",
          "text": "More risk of concurrency errors"
        },
        {
          "id": "b",
          "text": "Automatic serialization of all operations"
        },
        {
          "id": "c",
          "text": "Elimination of write conflicts"
        },
        {
          "id": "d",
          "text": "Guaranteed zero blocking and zero errors"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Unprotected interleaving can introduce dirty, non-repeatable, and phantom reads.",
      "source": "/references/database-concurrency-control-slides.pdf#page=6",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "The Trade-off: Throughput vs. Isolation"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "What happens without strict control?"
        }
      ]
    },
    {
      "id": "db-s6-q004",
      "prompt": "Which statement accurately characterizes a dirty read?",
      "options": [
        {
          "id": "a",
          "text": "A transaction reads another transaction's uncommitted change"
        },
        {
          "id": "b",
          "text": "A transaction rereads its own committed update"
        },
        {
          "id": "c",
          "text": "A transaction sees a newly committed matching row"
        },
        {
          "id": "d",
          "text": "A transaction reads the same row twice with different committed values"
        }
      ],
      "correctOptionId": "a",
      "explanation": "A dirty read involves data written by another transaction before that transaction commits.",
      "source": "/references/database-concurrency-control-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "1. Dirty Read - Concept"
        }
      ]
    },
    {
      "id": "db-s6-q005",
      "prompt": "T1 changes a balance from 50 to 100 without committing. T2 reads 100, and then T1 rolls back. What did T2 experience?",
      "options": [
        {
          "id": "a",
          "text": "Phantom read"
        },
        {
          "id": "b",
          "text": "Deadlock"
        },
        {
          "id": "c",
          "text": "Dirty read"
        },
        {
          "id": "d",
          "text": "Non-repeatable read"
        }
      ],
      "correctOptionId": "c",
      "explanation": "T2 read a value that was never committed and was later discarded.",
      "source": "/references/database-concurrency-control-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "1. Dirty Read - Concept"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "1. Dirty Read - Timeline"
        }
      ]
    },
    {
      "id": "db-s6-q006",
      "prompt": "Why can a dirty read cause incorrect inventory decisions?",
      "options": [
        {
          "id": "a",
          "text": "An index is always missing"
        },
        {
          "id": "b",
          "text": "It guarantees that inventory is current"
        },
        {
          "id": "c",
          "text": "It forces all transactions to commit"
        },
        {
          "id": "d",
          "text": "It may use a stock quantity that will be rolled back"
        }
      ],
      "correctOptionId": "d",
      "explanation": "A reader can act on temporary stock values that disappear after rollback.",
      "source": "/references/database-concurrency-control-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "1. Dirty Read - Real-world Consequence"
        }
      ]
    },
    {
      "id": "db-s6-q007",
      "prompt": "Which event produces a non-repeatable read in the lecture timeline?",
      "options": [
        {
          "id": "a",
          "text": "T2 inserts a new matching row"
        },
        {
          "id": "b",
          "text": "T2 holds an uncommitted update"
        },
        {
          "id": "c",
          "text": "T2 updates an existing row and commits between T1's two reads"
        },
        {
          "id": "d",
          "text": "T1 issues the same SELECT twice without intervening writes"
        }
      ],
      "correctOptionId": "c",
      "explanation": "A committed update changes the result of rereading an existing row.",
      "source": "/references/database-concurrency-control-slides.pdf#page=12",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2. Non-repeatable Read - Concept"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2. Non-repeatable Read - Timeline"
        }
      ]
    },
    {
      "id": "db-s6-q008",
      "prompt": "A transaction reads balance 50. Another transaction changes it to 100 and commits. The first reads balance 100. Identify the phenomenon.",
      "options": [
        {
          "id": "a",
          "text": "Dirty read"
        },
        {
          "id": "b",
          "text": "Phantom read"
        },
        {
          "id": "c",
          "text": "Deadlock"
        },
        {
          "id": "d",
          "text": "Non-repeatable read"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The same existing row yields a different committed value at the second read.",
      "source": "/references/database-concurrency-control-slides.pdf#page=12",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2. Non-repeatable Read - Concept"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2. Non-repeatable Read - Timeline"
        }
      ]
    },
    {
      "id": "db-s6-q009",
      "prompt": "How does a phantom read differ from a non-repeatable read in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A phantom affects a matching set through INSERT/DELETE; a non-repeatable read affects an existing row through UPDATE"
        },
        {
          "id": "b",
          "text": "A phantom always involves uncommitted changes"
        },
        {
          "id": "c",
          "text": "A phantom can occur only after a system crash"
        },
        {
          "id": "d",
          "text": "A non-repeatable read requires a deadlock"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide distinguishes changes in matching row membership from updates to a specific row.",
      "source": "/references/database-concurrency-control-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "3. Phantom Read - Concept"
        }
      ]
    },
    {
      "id": "db-s6-q010",
      "prompt": "T1 runs SELECT COUNT(*) FROM users WHERE age > 18 two times. Between them, T2 inserts a user aged 20 and commits. T1 gets 10, then 11. What is this?",
      "options": [
        {
          "id": "a",
          "text": "A lost update, because T2 overwrote a value that T1 wrote"
        },
        {
          "id": "b",
          "text": "A dirty read, because T1 saw data that T2 had not committed"
        },
        {
          "id": "c",
          "text": "A non-repeatable read, because one existing row was updated"
        },
        {
          "id": "d",
          "text": "A phantom read, since the set of matching rows has changed"
        }
      ],
      "correctOptionId": "d",
      "explanation": "T2 inserts a row that meets T1's predicate, changing the matching set.",
      "source": "/references/database-concurrency-control-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "3. Phantom Read - Timeline"
        }
      ]
    },
    {
      "id": "db-s6-q011",
      "prompt": "T1 counts 8 rows with age > 18. T2 inserts a user aged 16 and commits. Assuming no other changes, what does T1 count on its second read?",
      "options": [
        {
          "id": "a",
          "text": "9 because all inserts cause phantoms"
        },
        {
          "id": "b",
          "text": "8 because the inserted row does not satisfy the predicate"
        },
        {
          "id": "c",
          "text": "7 because existing rows are removed"
        },
        {
          "id": "d",
          "text": "The query must fail due to a deadlock"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The new row does not satisfy age > 18, so the matching set is unchanged.",
      "source": "/references/database-concurrency-control-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "3. Phantom Read - Concept"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "3. Phantom Read - Timeline"
        }
      ]
    },
    {
      "id": "db-s6-q012",
      "prompt": "T2 deletes one row satisfying T1's WHERE condition and commits between T1's repeated searches. What can happen?",
      "options": [
        {
          "id": "a",
          "text": "A phantom disappearance"
        },
        {
          "id": "b",
          "text": "A dirty read by definition"
        },
        {
          "id": "c",
          "text": "An automatic rollback of T1"
        },
        {
          "id": "d",
          "text": "An X-lock conversion in every session"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide includes DELETE as a cause of phantom reads.",
      "source": "/references/database-concurrency-control-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "3. Phantom Read - Concept"
        }
      ]
    },
    {
      "id": "db-s6-q013",
      "prompt": "What does 'pessimistic' mean in the locking mechanism described in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Transactions never wait"
        },
        {
          "id": "b",
          "text": "A transaction requests a lock before accessing protected data"
        },
        {
          "id": "c",
          "text": "All reads are permanently stored"
        },
        {
          "id": "d",
          "text": "The optimizer predicts that a transaction will fail"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The DBMS acquires locks before access and blocks on incompatible requests.",
      "source": "/references/database-concurrency-control-slides.pdf#page=18",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "What is Locking?"
        }
      ]
    },
    {
      "id": "db-s6-q014",
      "prompt": "What happens when a requested lock conflicts with an existing lock?",
      "options": [
        {
          "id": "a",
          "text": "The requesting transaction waits"
        },
        {
          "id": "b",
          "text": "The current holder must immediately abort"
        },
        {
          "id": "c",
          "text": "Both locks are granted without checking"
        },
        {
          "id": "d",
          "text": "The requested SQL statement is automatically committed"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Locking grants compatible requests; incompatible requests are blocked until release.",
      "source": "/references/database-concurrency-control-slides.pdf#page=18",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "What is Locking?"
        }
      ]
    },
    {
      "id": "db-s6-q015",
      "prompt": "Which statement matches the lecture's Shared Lock model?",
      "options": [
        {
          "id": "a",
          "text": "Only one reader can hold it"
        },
        {
          "id": "b",
          "text": "It is reserved for INSERT statements"
        },
        {
          "id": "c",
          "text": "It grants every writer immediate access"
        },
        {
          "id": "d",
          "text": "It permits multiple readers to hold it on the same item"
        }
      ],
      "correctOptionId": "d",
      "explanation": "S-locks are compatible with other S-locks.",
      "source": "/references/database-concurrency-control-slides.pdf#page=19",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "Shared Lock (S-Lock)"
        }
      ]
    },
    {
      "id": "db-s6-q016",
      "prompt": "Which operation is associated with an Exclusive Lock in the lecture's traditional lock model?",
      "options": [
        {
          "id": "a",
          "text": "SELECT used only for reporting"
        },
        {
          "id": "b",
          "text": "A read-only count"
        },
        {
          "id": "c",
          "text": "UPDATE of the protected item"
        },
        {
          "id": "d",
          "text": "Reading a cached result"
        }
      ],
      "correctOptionId": "c",
      "explanation": "X-locks are used for writes such as UPDATE, INSERT, and DELETE.",
      "source": "/references/database-concurrency-control-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "Exclusive Lock (X-Lock)"
        }
      ]
    },
    {
      "id": "db-s6-q017",
      "prompt": "T1 holds a Shared lock on a row. T2 then asks for a Shared lock and T3 asks for an Exclusive lock on the same row. What happens?",
      "options": [
        {
          "id": "a",
          "text": "T2 gets its lock at once, but T3 must wait for the S-lock to end"
        },
        {
          "id": "b",
          "text": "T2 and T3 both have to wait, since only one lock may exist on a row"
        },
        {
          "id": "c",
          "text": "T2 must wait for T1, while T3 gets its lock because writes go first"
        },
        {
          "id": "d",
          "text": "T2 and T3 both get their locks, since reads and writes do not clash"
        }
      ],
      "correctOptionId": "a",
      "explanation": "In the lecture compatibility matrix, S and S are compatible, but S and X conflict.",
      "source": "/references/database-concurrency-control-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "The Lock Compatibility Matrix"
        }
      ]
    },
    {
      "id": "db-s6-q018",
      "prompt": "Which two lock requests can coexist on the same data item in the slide's matrix?",
      "options": [
        {
          "id": "a",
          "text": "Two X-locks"
        },
        {
          "id": "b",
          "text": "One S-lock and one X-lock"
        },
        {
          "id": "c",
          "text": "Two S-locks"
        },
        {
          "id": "d",
          "text": "Any pair of locks"
        }
      ],
      "correctOptionId": "c",
      "explanation": "S/S is the only granted pair in the matrix.",
      "source": "/references/database-concurrency-control-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "The Lock Compatibility Matrix"
        }
      ]
    },
    {
      "id": "db-s6-q019",
      "prompt": "T1 currently holds an X-lock on a data item. What does the lecture's compatibility matrix say about T2's S-lock request?",
      "options": [
        {
          "id": "a",
          "text": "It succeeds immediately"
        },
        {
          "id": "b",
          "text": "It is converted to an X-lock"
        },
        {
          "id": "c",
          "text": "It bypasses the compatibility check"
        },
        {
          "id": "d",
          "text": "It must wait"
        }
      ],
      "correctOptionId": "d",
      "explanation": "S/X requests conflict in the traditional pessimistic model presented.",
      "source": "/references/database-concurrency-control-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "The Lock Compatibility Matrix"
        }
      ]
    },
    {
      "id": "db-s6-q020",
      "prompt": "Why does row-level locking have higher overhead than table-level locking?",
      "options": [
        {
          "id": "a",
          "text": "Row locks are only allowed at the Serializable isolation level"
        },
        {
          "id": "b",
          "text": "The DBMS must create and track many more lock objects at once"
        },
        {
          "id": "c",
          "text": "Every row lock must be written to the WAL before a query runs"
        },
        {
          "id": "d",
          "text": "Row locks block the whole table, so other users retry often"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Smaller lock granularity permits more concurrent operations but increases lock management overhead.",
      "source": "/references/database-concurrency-control-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lock Granularity"
        }
      ]
    },
    {
      "id": "db-s6-q021",
      "prompt": "Two transactions update different rows of the same table. Which lock granularity is better suited to allowing both to proceed?",
      "options": [
        {
          "id": "a",
          "text": "Table-level locks"
        },
        {
          "id": "b",
          "text": "Database-wide locks"
        },
        {
          "id": "c",
          "text": "Row-level locks"
        },
        {
          "id": "d",
          "text": "A single global X-lock"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Row-level granularity allows concurrent updates to different rows.",
      "source": "/references/database-concurrency-control-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lock Granularity"
        }
      ]
    },
    {
      "id": "db-s6-q022",
      "prompt": "Which is a major disadvantage of locking an entire table?",
      "options": [
        {
          "id": "a",
          "text": "Each row requires a separate lock object"
        },
        {
          "id": "b",
          "text": "It prevents all SQL parsing"
        },
        {
          "id": "c",
          "text": "It can block unrelated work on different rows"
        },
        {
          "id": "d",
          "text": "It always triggers a deadlock immediately"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Table locks have low management overhead but substantially restrict concurrency.",
      "source": "/references/database-concurrency-control-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lock Granularity"
        }
      ]
    },
    {
      "id": "db-s6-q023",
      "prompt": "When is SELECT ... FOR UPDATE especially useful?",
      "options": [
        {
          "id": "a",
          "text": "When application logic reads a value, computes a decision, and later updates the same row"
        },
        {
          "id": "b",
          "text": "When a SELECT must ignore its WHERE clause"
        },
        {
          "id": "c",
          "text": "When a database query must skip transaction boundaries"
        },
        {
          "id": "d",
          "text": "When a report needs to include uncommitted changes"
        }
      ],
      "correctOptionId": "a",
      "explanation": "It protects the interval between reading a row and updating it.",
      "source": "/references/database-concurrency-control-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Practical Locking: SELECT ... FOR UPDATE"
        }
      ]
    },
    {
      "id": "db-s6-q024",
      "prompt": "An app reads a balance, computes a new value in Python, then runs UPDATE. Why should the first query use SELECT ... FOR UPDATE?",
      "options": [
        {
          "id": "a",
          "text": "It lets other sessions see the new value before the COMMIT happens"
        },
        {
          "id": "b",
          "text": "It locks the row when read, so nobody changes it before the UPDATE"
        },
        {
          "id": "c",
          "text": "It switches the transaction to Serializable until the very end of it"
        },
        {
          "id": "d",
          "text": "It makes the SELECT faster, because the row is put into the cache"
        }
      ],
      "correctOptionId": "b",
      "explanation": "FOR UPDATE acquires a row lock proactively to close the read-then-write race window.",
      "source": "/references/database-concurrency-control-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Practical Locking: SELECT ... FOR UPDATE"
        }
      ]
    },
    {
      "id": "db-s6-q025",
      "prompt": "Which command sequence matches the slide's proactive locking pattern?",
      "options": [
        {
          "id": "a",
          "text": "COMMIT; SELECT ... FOR UPDATE; UPDATE"
        },
        {
          "id": "b",
          "text": "UPDATE; COMMIT; BEGIN"
        },
        {
          "id": "c",
          "text": "BEGIN; SELECT ... FOR UPDATE; UPDATE; COMMIT"
        },
        {
          "id": "d",
          "text": "ROLLBACK; UPDATE; SELECT ... FOR UPDATE"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The row is locked inside a transaction before the application computes and writes a new value.",
      "source": "/references/database-concurrency-control-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Practical Locking: SELECT ... FOR UPDATE"
        }
      ]
    },
    {
      "id": "db-s6-q026",
      "prompt": "Which situation describes starvation rather than deadlock?",
      "options": [
        {
          "id": "a",
          "text": "A transaction runs out of memory while it holds too many row locks"
        },
        {
          "id": "b",
          "text": "Two transactions wait for each other in a cycle and neither can go on"
        },
        {
          "id": "c",
          "text": "The DBMS rolls back one transaction in order to break a circular wait"
        },
        {
          "id": "d",
          "text": "A writer keeps waiting because readers keep getting S-locks first"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Starvation describes indefinite waiting caused by repeatedly postponed access, without requiring a wait cycle.",
      "source": "/references/database-concurrency-control-slides.pdf#page=24",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "Starvation & The Ultimate Side Effect"
        }
      ]
    },
    {
      "id": "db-s6-q027",
      "prompt": "What defines a deadlock?",
      "options": [
        {
          "id": "a",
          "text": "One transaction waits briefly for a writer"
        },
        {
          "id": "b",
          "text": "Two or more transactions form a circular lock-wait dependency"
        },
        {
          "id": "c",
          "text": "A SELECT scans the same table more than once"
        },
        {
          "id": "d",
          "text": "A transaction is automatically committed after a timeout"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Each transaction in the cycle needs a lock held by another participant and cannot proceed.",
      "source": "/references/database-concurrency-control-slides.pdf#page=26",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "What is a Deadlock?"
        }
      ]
    },
    {
      "id": "db-s6-q028",
      "prompt": "T1 holds a lock on row A and needs row B. T2 holds row B and needs row A. What is the result if neither releases its lock?",
      "options": [
        {
          "id": "a",
          "text": "Phantom read"
        },
        {
          "id": "b",
          "text": "Dirty read"
        },
        {
          "id": "c",
          "text": "A successful serial schedule"
        },
        {
          "id": "d",
          "text": "Deadlock"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The transactions form a circular wait.",
      "source": "/references/database-concurrency-control-slides.pdf#page=26",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "What is a Deadlock?"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Classic Scenario: The Cross-Transfer"
        }
      ]
    },
    {
      "id": "db-s6-q029",
      "prompt": "What does an edge T1 → T2 represent in a wait-for graph?",
      "options": [
        {
          "id": "a",
          "text": "T1 has committed before T2"
        },
        {
          "id": "b",
          "text": "T2 must wait for T1's SELECT output"
        },
        {
          "id": "c",
          "text": "T1 requests a lock held by T2"
        },
        {
          "id": "d",
          "text": "T1 and T2 are in different databases"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Directed edges point from the waiting transaction to the current lock holder.",
      "source": "/references/database-concurrency-control-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Wait-for Graph (WFG)"
        }
      ]
    },
    {
      "id": "db-s6-q030",
      "prompt": "Which graph feature indicates deadlock?",
      "options": [
        {
          "id": "a",
          "text": "Any node with one incoming edge"
        },
        {
          "id": "b",
          "text": "A directed cycle"
        },
        {
          "id": "c",
          "text": "More than three active transactions"
        },
        {
          "id": "d",
          "text": "A node without outgoing edges"
        }
      ],
      "correctOptionId": "b",
      "explanation": "A directed cycle indicates circular waiting.",
      "source": "/references/database-concurrency-control-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Wait-for Graph (WFG)"
        }
      ]
    },
    {
      "id": "db-s6-q031",
      "prompt": "A wait-for graph contains T1 → T2 and T2 → T3, but T3 waits for no transaction. What follows?",
      "options": [
        {
          "id": "a",
          "text": "A cycle definitely exists"
        },
        {
          "id": "b",
          "text": "T1 must be aborted immediately"
        },
        {
          "id": "c",
          "text": "T3 must be rolled back"
        },
        {
          "id": "d",
          "text": "No deadlock cycle exists in the given graph"
        }
      ],
      "correctOptionId": "d",
      "explanation": "A chain of waiting without an edge returning to an earlier node does not form a cycle.",
      "source": "/references/database-concurrency-control-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Wait-for Graph (WFG)"
        }
      ]
    },
    {
      "id": "db-s6-q032",
      "prompt": "Why does PostgreSQL wait for deadlock_timeout (about 1 second) before running deadlock detection?",
      "options": [
        {
          "id": "a",
          "text": "The wait gives the user time to cancel one of the transactions"
        },
        {
          "id": "b",
          "text": "Most lock waits end quickly, so checking at once would waste CPU"
        },
        {
          "id": "c",
          "text": "The victim needs one second to write its changes to the WAL first"
        },
        {
          "id": "d",
          "text": "Deadlocks can only be seen after the lock table is saved to disk"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Delaying cycle detection avoids the expense for brief, ordinary waits.",
      "source": "/references/database-concurrency-control-slides.pdf#page=29",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "Deadlock Handling in PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s6-q033",
      "prompt": "What happens after PostgreSQL detects a circular wait?",
      "options": [
        {
          "id": "a",
          "text": "It commits every participant"
        },
        {
          "id": "b",
          "text": "It disables all locks for the table"
        },
        {
          "id": "c",
          "text": "It aborts a victim transaction to break the cycle"
        },
        {
          "id": "d",
          "text": "It keeps the deadlock forever"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Rollback of one participant releases locks so surviving transactions can proceed.",
      "source": "/references/database-concurrency-control-slides.pdf#page=29",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "Deadlock Handling in PostgreSQL"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "Victim Selection"
        }
      ]
    },
    {
      "id": "db-s6-q034",
      "prompt": "Which message may reach an application whose transaction is chosen as a deadlock victim?",
      "options": [
        {
          "id": "a",
          "text": "Index missing"
        },
        {
          "id": "b",
          "text": "Deadlock detected"
        },
        {
          "id": "c",
          "text": "Materialized view refreshed"
        },
        {
          "id": "d",
          "text": "Table automatically clustered"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide shows PostgreSQL returning ERROR: deadlock detected.",
      "source": "/references/database-concurrency-control-slides.pdf#page=30",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "Victim Selection"
        }
      ]
    },
    {
      "id": "db-s6-q035",
      "prompt": "A wait-for graph has edges T1 → T2, T2 → T3, T3 → T1, and T4 → T1. Which transaction must the DBMS choose its victim from to break the cycle?",
      "options": [
        {
          "id": "a",
          "text": "T4 only"
        },
        {
          "id": "b",
          "text": "All four necessarily"
        },
        {
          "id": "c",
          "text": "One of T1, T2, or T3"
        },
        {
          "id": "d",
          "text": "A transaction not shown in the graph"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The cycle consists of T1, T2, and T3; aborting a participant breaks that cycle.",
      "source": "/references/database-concurrency-control-slides.pdf#page=28",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Wait-for Graph (WFG)"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "Deadlock Handling in PostgreSQL"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "Victim Selection"
        }
      ]
    },
    {
      "id": "db-s6-q036",
      "prompt": "Why does always updating the row with id = 1 before id = 2 prevent the cross-transfer deadlock?",
      "options": [
        {
          "id": "a",
          "text": "Lower ids use shared locks, so they never conflict with other writers"
        },
        {
          "id": "b",
          "text": "Ordered updates run at the Serializable level, which has no lock wait"
        },
        {
          "id": "c",
          "text": "All transactions ask for locks in the same order, so no cycle forms"
        },
        {
          "id": "d",
          "text": "Postgres frees the first row lock before the second one is requested"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Consistent lock order prevents circular waiting.",
      "source": "/references/database-concurrency-control-slides.pdf#page=31",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 31,
          "slideNumber": 27,
          "slideTitle": "Best Practices for AI / Backend Engineers"
        }
      ]
    },
    {
      "id": "db-s6-q037",
      "prompt": "Which development practice reduces the chance of deadlocks?",
      "options": [
        {
          "id": "a",
          "text": "Keeping a transaction open while calling an external API"
        },
        {
          "id": "b",
          "text": "Locking related rows in inconsistent orders"
        },
        {
          "id": "c",
          "text": "Leaving uncommitted writes open during AI training"
        },
        {
          "id": "d",
          "text": "Keeping transactions short"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Short transactions release locks sooner and reduce conflict windows.",
      "source": "/references/database-concurrency-control-slides.pdf#page=31",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 31,
          "slideNumber": 27,
          "slideTitle": "Best Practices for AI / Backend Engineers"
        }
      ]
    },
    {
      "id": "db-s6-q038",
      "prompt": "What is the purpose of proactive locking when rows will be updated later?",
      "options": [
        {
          "id": "a",
          "text": "Force the optimizer to choose a Hash Join"
        },
        {
          "id": "b",
          "text": "Make writes bypass transaction isolation"
        },
        {
          "id": "c",
          "text": "Let other writers overwrite the row temporarily"
        },
        {
          "id": "d",
          "text": "Acquire required locks before dependent application logic"
        }
      ],
      "correctOptionId": "d",
      "explanation": "SELECT ... FOR UPDATE secures the read-then-write interval.",
      "source": "/references/database-concurrency-control-slides.pdf#page=23",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Practical Locking: SELECT ... FOR UPDATE"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 31,
          "slideNumber": 27,
          "slideTitle": "Best Practices for AI / Backend Engineers"
        }
      ]
    },
    {
      "id": "db-s6-q039",
      "prompt": "How does MVCC in PostgreSQL let readers and writers avoid blocking each other?",
      "options": [
        {
          "id": "a",
          "text": "The writer makes a new row version; readers see an old snapshot"
        },
        {
          "id": "b",
          "text": "The reader takes an X-lock first, so the writer queues up behind it"
        },
        {
          "id": "c",
          "text": "The writer changes the row in place and readers retry after a delay"
        },
        {
          "id": "d",
          "text": "Readers read the row from the WAL file instead of from the table"
        }
      ],
      "correctOptionId": "a",
      "explanation": "MVCC offers snapshot-based reads while writers create new row versions.",
      "source": "/references/database-concurrency-control-slides.pdf#page=34",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 34,
          "slideNumber": 29,
          "slideTitle": "Is there a better way? (Enter MVCC)"
        }
      ]
    },
    {
      "id": "db-s6-q040",
      "prompt": "What does MVCC stand for?",
      "options": [
        {
          "id": "a",
          "text": "Multi-Value Commit Check"
        },
        {
          "id": "b",
          "text": "Multiple Virtual Client Connections"
        },
        {
          "id": "c",
          "text": "Multi-Version Concurrency Control"
        },
        {
          "id": "d",
          "text": "Memory-Verified Concurrency Check"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The term in the lecture names PostgreSQL's row-versioning approach to concurrency.",
      "source": "/references/database-concurrency-control-slides.pdf#page=34",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 34,
          "slideNumber": 29,
          "slideTitle": "Is there a better way? (Enter MVCC)"
        }
      ]
    },
    {
      "id": "db-s6-q041",
      "prompt": "In Lab 1, Session A updates film_id = 1 but does not commit. Session B tries updating the same row. What happens first?",
      "options": [
        {
          "id": "a",
          "text": "Session B's UPDATE blocks until A releases its row lock"
        },
        {
          "id": "b",
          "text": "Session B silently overwrites A's update"
        },
        {
          "id": "c",
          "text": "Both sessions commit immediately"
        },
        {
          "id": "d",
          "text": "Session A is automatically rolled back"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Concurrent UPDATEs to the same row conflict; Session B waits for A.",
      "source": "/references/database-concurrency-control-slides.pdf#page=35",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 35,
          "slideNumber": 30,
          "slideTitle": "Lab 1: Experiencing Blocking (Row-Level Lock)"
        }
      ]
    },
    {
      "id": "db-s6-q042",
      "prompt": "In Lab 1, what makes Session B's waiting UPDATE able to proceed?",
      "options": [
        {
          "id": "a",
          "text": "Running EXPLAIN"
        },
        {
          "id": "b",
          "text": "Session A committing and releasing its lock"
        },
        {
          "id": "c",
          "text": "Adding an index"
        },
        {
          "id": "d",
          "text": "Starting a third reader session"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The blocked writer proceeds after A releases its lock on commit.",
      "source": "/references/database-concurrency-control-slides.pdf#page=35",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 35,
          "slideNumber": 30,
          "slideTitle": "Lab 1: Experiencing Blocking (Row-Level Lock)"
        }
      ]
    },
    {
      "id": "db-s6-q043",
      "prompt": "In Lab 2 (default Read Committed), Session A reads rental_rate = 4.99, Session B updates it to 0.99 and commits, then A reads 0.99. Why?",
      "options": [
        {
          "id": "a",
          "text": "In Read Committed, each statement sees data committed before it"
        },
        {
          "id": "b",
          "text": "A's first read was cached, and the cache expired between both reads"
        },
        {
          "id": "c",
          "text": "A read B's change before it was committed, which is a dirty read here"
        },
        {
          "id": "d",
          "text": "A holds an X-lock on the row, so it reads B's private copy of the row"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lab illustrates that a later statement can observe a newly committed value.",
      "source": "/references/database-concurrency-control-slides.pdf#page=36",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 36,
          "slideNumber": 31,
          "slideTitle": "Lab 2: Replicating Non-repeatable Read"
        }
      ]
    },
    {
      "id": "db-s6-q044",
      "prompt": "In Lab 3, Session A updates film 100 and then requests film 200; Session B updates film 200 and then requests film 100. What is the essential problem?",
      "options": [
        {
          "id": "a",
          "text": "Both statements modify unrelated columns"
        },
        {
          "id": "b",
          "text": "Each transaction waits for a row held by the other"
        },
        {
          "id": "c",
          "text": "The films lack a primary key"
        },
        {
          "id": "d",
          "text": "Each transaction runs a read-only SELECT"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The reversed update order creates a cycle of row-lock dependencies.",
      "source": "/references/database-concurrency-control-slides.pdf#page=37",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 37,
          "slideNumber": 32,
          "slideTitle": "Lab 3: Creating a Deadlock"
        }
      ]
    },
    {
      "id": "db-s6-q045",
      "prompt": "In Lab 3, PostgreSQL rolls back one session after detecting deadlock. What should the other session then be able to do?",
      "options": [
        {
          "id": "a",
          "text": "Read the victim's uncommitted changes"
        },
        {
          "id": "b",
          "text": "Proceed after the victim releases locks"
        },
        {
          "id": "c",
          "text": "Permanently disable constraints"
        },
        {
          "id": "d",
          "text": "Automatically skip its remaining updates"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Rolling back a victim breaks the cycle and frees its held locks.",
      "source": "/references/database-concurrency-control-slides.pdf#page=37",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 37,
          "slideNumber": 32,
          "slideTitle": "Lab 3: Creating a Deadlock"
        }
      ]
    },
    {
      "id": "db-s6-q046",
      "prompt": "In Lab 4, Session B tries SELECT * FROM inventory WHERE inventory_id = 10 FOR UPDATE while Session A holds that row lock. What happens?",
      "options": [
        {
          "id": "a",
          "text": "Session B immediately inserts a rental"
        },
        {
          "id": "b",
          "text": "Session B reads A's uncommitted rental"
        },
        {
          "id": "c",
          "text": "Session B blocks until A releases the lock"
        },
        {
          "id": "d",
          "text": "Session B is forced into autocommit"
        }
      ],
      "correctOptionId": "c",
      "explanation": "FOR UPDATE requests a conflicting lock and blocks while another transaction holds it.",
      "source": "/references/database-concurrency-control-slides.pdf#page=38",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 38,
          "slideNumber": 33,
          "slideTitle": "Lab 4: Preventing Race Conditions (FOR UPDATE)"
        }
      ]
    },
    {
      "id": "db-s6-q047",
      "prompt": "Why should the second customer recheck availability after a blocked FOR UPDATE finishes?",
      "options": [
        {
          "id": "a",
          "text": "To detect that the first customer has already rented the same DVD"
        },
        {
          "id": "b",
          "text": "To turn the SELECT into a materialized view"
        },
        {
          "id": "c",
          "text": "To guarantee the primary key changes"
        },
        {
          "id": "d",
          "text": "To avoid creating a row-level lock"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Once unblocked, application logic must inspect current availability before attempting the rental.",
      "source": "/references/database-concurrency-control-slides.pdf#page=38",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 38,
          "slideNumber": 33,
          "slideTitle": "Lab 4: Preventing Race Conditions (FOR UPDATE)"
        }
      ]
    },
    {
      "id": "db-s6-q048",
      "prompt": "A developer proposes removing every lock to maximize throughput. Which lecture principle challenges this proposal?",
      "options": [
        {
          "id": "a",
          "text": "Indexes require more storage"
        },
        {
          "id": "b",
          "text": "Unrestricted concurrency can produce data anomalies"
        },
        {
          "id": "c",
          "text": "B-tree nodes must be sorted"
        },
        {
          "id": "d",
          "text": "SQL parsing cannot work concurrently"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Concurrency control must preserve isolation rather than optimize raw throughput alone.",
      "source": "/references/database-concurrency-control-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "The Paradox of Perfection (ACID)"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "The Trade-off: Throughput vs. Isolation"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "What happens without strict control?"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "The Big Picture: Cause and Effect"
        }
      ]
    },
    {
      "id": "db-s6-q049",
      "prompt": "What is the principal side effect introduced by pessimistic locking?",
      "options": [
        {
          "id": "a",
          "text": "It disables transactions"
        },
        {
          "id": "b",
          "text": "Waiting can form deadlocks"
        },
        {
          "id": "c",
          "text": "It makes data immutable"
        },
        {
          "id": "d",
          "text": "It requires sharding"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Lock acquisition can lead to circular waits when lock orders conflict.",
      "source": "/references/database-concurrency-control-slides.pdf#page=24",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "Starvation & The Ultimate Side Effect"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "The Big Picture: Cause and Effect"
        }
      ]
    },
    {
      "id": "db-s6-q050",
      "prompt": "What is the best explanation for why unrelated writers may proceed simultaneously under row-level locking?",
      "options": [
        {
          "id": "a",
          "text": "Different rows can be locked independently"
        },
        {
          "id": "b",
          "text": "All X-locks are mutually compatible"
        },
        {
          "id": "c",
          "text": "COMMIT is unnecessary"
        },
        {
          "id": "d",
          "text": "The same row has no version history"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Fine-grained locks isolate only the affected rows instead of the entire table.",
      "source": "/references/database-concurrency-control-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lock Granularity"
        },
        {
          "kind": "lecture",
          "file": "ConcurrencyControl.pdf",
          "pdfPage": 35,
          "slideNumber": 30,
          "slideTitle": "Lab 1: Experiencing Blocking (Row-Level Lock)"
        }
      ]
    }
  ]
};
