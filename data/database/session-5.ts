import type { Chapter } from "@/types/quiz";

export const session5: Chapter = {
  "id": "session-5",
  "title": "Session 5: Transactions & ACID Properties",
  "description": "56 câu hỏi đã duyệt về transactions, ACID, isolation, WAL và savepoints.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s5-q001",
      "prompt": "What is a database transaction in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A permanent copy of a table created before every SQL command."
        },
        {
          "id": "b",
          "text": "A database connection that can execute only one SQL statement."
        },
        {
          "id": "c",
          "text": "A logical unit of database processing treated as a single unit of work."
        },
        {
          "id": "d",
          "text": "A query plan that specifies the fastest execution order."
        }
      ],
      "correctOptionId": "c",
      "explanation": "A transaction groups one or more database operations into a logical unit; it can succeed as a unit or be rolled back.",
      "source": "/references/database-transactions-slides.pdf#page=6",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "What is a Database Transaction?"
        }
      ]
    },
    {
      "id": "db-s5-q002",
      "prompt": "A transfer deducts \\$100 from Alice and then credits \\$100 to Bob. The server crashes between the statements. What prevents a completed deduction without its matching credit?",
      "options": [
        {
          "id": "a",
          "text": "Running both updates as separate successful autocommit statements."
        },
        {
          "id": "b",
          "text": "Committing the debit before executing the credit."
        },
        {
          "id": "c",
          "text": "Executing both statements in one transaction and committing only after both succeed."
        },
        {
          "id": "d",
          "text": "Executing the credit after restarting without checking the first step."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The two balance updates form one logical transaction. If it does not commit, the changes are not partially preserved.",
      "source": "/references/database-transactions-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "The ”Horror Story”: Life Without Transactions"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "What is a Database Transaction?"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        }
      ]
    },
    {
      "id": "db-s5-q003",
      "prompt": "Which command explicitly starts a transaction block in PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "BEGIN;"
        },
        {
          "id": "b",
          "text": "SAVEPOINT start;"
        },
        {
          "id": "c",
          "text": "ROLLBACK;"
        },
        {
          "id": "d",
          "text": "COMMIT;"
        }
      ],
      "correctOptionId": "a",
      "explanation": "BEGIN establishes the boundary within which subsequent operations can be committed or rolled back together.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        }
      ]
    },
    {
      "id": "db-s5-q004",
      "prompt": "A valid UPDATE has run inside BEGIN, but COMMIT has not occurred. What does COMMIT normally accomplish?",
      "options": [
        {
          "id": "a",
          "text": "It finishes the transaction and makes its changes permanent."
        },
        {
          "id": "b",
          "text": "It undoes the UPDATE but keeps the transaction open."
        },
        {
          "id": "c",
          "text": "It only releases a savepoint while keeping BEGIN open."
        },
        {
          "id": "d",
          "text": "It creates a savepoint without ending the transaction."
        }
      ],
      "correctOptionId": "a",
      "explanation": "COMMIT is the success boundary of an explicit transaction: its changes become durable and available to other transactions according to visibility rules.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        }
      ]
    },
    {
      "id": "db-s5-q005",
      "prompt": "A transaction updates inventory and inserts an order. Both statements succeed, but the application issues ROLLBACK rather than COMMIT. What persists from those statements?",
      "options": [
        {
          "id": "a",
          "text": "Only the INSERT persists."
        },
        {
          "id": "b",
          "text": "Only the UPDATE persists."
        },
        {
          "id": "c",
          "text": "Neither change persists."
        },
        {
          "id": "d",
          "text": "Both changes persist because they executed successfully."
        }
      ],
      "correctOptionId": "c",
      "explanation": "ROLLBACK cancels all work in the transaction, even if individual statements executed without error.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        }
      ]
    },
    {
      "id": "db-s5-q006",
      "prompt": "With PostgreSQL autocommit enabled and no explicit BEGIN, what happens after one valid standalone UPDATE?",
      "options": [
        {
          "id": "a",
          "text": "It stays uncommitted until another UPDATE follows."
        },
        {
          "id": "b",
          "text": "It requires a SAVEPOINT to become permanent."
        },
        {
          "id": "c",
          "text": "It is automatically rolled back at session end."
        },
        {
          "id": "d",
          "text": "That statement is committed automatically."
        }
      ],
      "correctOptionId": "d",
      "explanation": "In the default autocommit mode, each successfully executed standalone statement is its own transaction.",
      "source": "/references/database-transactions-slides.pdf#page=10",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "Implicit vs. Explicit Transactions"
        }
      ]
    },
    {
      "id": "db-s5-q007",
      "prompt": "An e-commerce operation must update a stock count and write a matching paid order. Which approach best follows the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Let each statement autocommit separately."
        },
        {
          "id": "b",
          "text": "Perform the order INSERT only if the stock UPDATE has already committed."
        },
        {
          "id": "c",
          "text": "Wrap both operations in one explicit transaction."
        },
        {
          "id": "d",
          "text": "Run the operations in two unrelated database sessions."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The two changes describe one business action, so an explicit transaction avoids partial completion.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "Implicit vs. Explicit Transactions"
        }
      ]
    },
    {
      "id": "db-s5-q008",
      "prompt": "Why might one explicit transaction containing 1,000 INSERT statements be faster than 1,000 individual autocommit INSERTs?",
      "options": [
        {
          "id": "a",
          "text": "It permanently disables constraints on the inserted rows."
        },
        {
          "id": "b",
          "text": "It prevents PostgreSQL from writing any WAL records."
        },
        {
          "id": "c",
          "text": "It reduces the number of commit operations and associated WAL-flush overhead."
        },
        {
          "id": "d",
          "text": "It performs the INSERTs without recording any transaction boundaries."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Fewer commits can reduce repeated durability-related I/O overhead. The statements are not exempt from integrity checks.",
      "source": "/references/database-transactions-slides.pdf#page=10",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "Implicit vs. Explicit Transactions"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "The Trade-off: Throughput vs. ACID"
        }
      ]
    },
    {
      "id": "db-s5-q009",
      "prompt": "According to the lecture’s brief MVCC explanation, how are new row versions from an aborted transaction treated?",
      "options": [
        {
          "id": "a",
          "text": "They overwrite the older versions even though the transaction failed."
        },
        {
          "id": "b",
          "text": "They are ignored rather than becoming committed transaction effects."
        },
        {
          "id": "c",
          "text": "They are committed one by one before the transaction aborts."
        },
        {
          "id": "d",
          "text": "They automatically become visible to other sessions after the abort."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The Atomicity slide cites MVCC and the ability to disregard uncommitted new versions when a transaction is rolled back. This question does not require Session 6 locking mechanics.",
      "source": "/references/database-transactions-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        }
      ]
    },
    {
      "id": "db-s5-q010",
      "prompt": "During which transaction state are SQL operations being executed?",
      "options": [
        {
          "id": "a",
          "text": "Aborted."
        },
        {
          "id": "b",
          "text": "Committed."
        },
        {
          "id": "c",
          "text": "Partially Committed."
        },
        {
          "id": "d",
          "text": "Active."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Active is the initial execution state, before a success or failure transition.",
      "source": "/references/database-transactions-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "Transaction States: The Journey"
        }
      ]
    },
    {
      "id": "db-s5-q011",
      "prompt": "What does the Partially Committed state mean in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "The final statement has executed, but the work is not yet safely durable."
        },
        {
          "id": "b",
          "text": "Some successful statements have already become durable while the rest are pending."
        },
        {
          "id": "c",
          "text": "The transaction failed and is waiting for ROLLBACK."
        },
        {
          "id": "d",
          "text": "The server has committed locally but is waiting for another database to respond."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Partially Committed lies between finishing the final statement and securing the commit.",
      "source": "/references/database-transactions-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "Transaction States: The Journey"
        }
      ]
    },
    {
      "id": "db-s5-q012",
      "prompt": "Which sequence represents a successful transaction lifecycle?",
      "options": [
        {
          "id": "a",
          "text": "Active → Aborted → Committed."
        },
        {
          "id": "b",
          "text": "Active → Partially Committed → Committed."
        },
        {
          "id": "c",
          "text": "Committed → Active → Failed."
        },
        {
          "id": "d",
          "text": "Failed → Partially Committed → Committed."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide distinguishes the success path from the failure path (Active → Failed → Aborted).",
      "source": "/references/database-transactions-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "Transaction States: The Journey"
        }
      ]
    },
    {
      "id": "db-s5-q013",
      "prompt": "A transaction encounters an error and is restored to its pre-transaction state. What is its final state?",
      "options": [
        {
          "id": "a",
          "text": "Aborted."
        },
        {
          "id": "b",
          "text": "Active."
        },
        {
          "id": "c",
          "text": "Partially Committed."
        },
        {
          "id": "d",
          "text": "Committed."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Failed describes the error state; Aborted describes the outcome after the transaction is undone.",
      "source": "/references/database-transactions-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "Transaction States: The Journey"
        }
      ]
    },
    {
      "id": "db-s5-q014",
      "prompt": "Inside BEGIN, UPDATE A succeeds, UPDATE B violates a foreign key, UPDATE C is valid, and the client issues COMMIT without recovering the transaction. What is the result in PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "A and C are committed, while B is skipped."
        },
        {
          "id": "b",
          "text": "Only A is committed because B stopped execution."
        },
        {
          "id": "c",
          "text": "The transaction is rolled back; neither A nor C is committed."
        },
        {
          "id": "d",
          "text": "All three updates are saved once COMMIT is called."
        }
      ],
      "correctOptionId": "c",
      "explanation": "An error leaves a PostgreSQL transaction in the failed state. Later ordinary commands are rejected, and COMMIT cannot preserve the earlier work.",
      "source": "/references/database-transactions-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        }
      ]
    },
    {
      "id": "db-s5-q015",
      "prompt": "After an invalid UPDATE causes an explicit transaction to enter the failed state, which command from the lecture can end that unsuccessful block?",
      "options": [
        {
          "id": "a",
          "text": "SELECT 1;"
        },
        {
          "id": "b",
          "text": "ROLLBACK;"
        },
        {
          "id": "c",
          "text": "BEGIN;"
        },
        {
          "id": "d",
          "text": "UPDATE film SET rental_rate = 1;"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Without a usable savepoint, the transaction must be rolled back before ordinary database operations can resume.",
      "source": "/references/database-transactions-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        }
      ]
    },
    {
      "id": "db-s5-q016",
      "prompt": "In the failed-transaction example, why does the first valid change to G-rated film prices disappear?",
      "options": [
        {
          "id": "a",
          "text": "The first UPDATE was implicitly committed as soon as it finished."
        },
        {
          "id": "b",
          "text": "The transaction automatically created a new savepoint at its first UPDATE."
        },
        {
          "id": "c",
          "text": "The third UPDATE canceled the first by setting prices for a different film rating."
        },
        {
          "id": "d",
          "text": "The later foreign-key violation aborts the transaction containing that earlier change."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Atomicity is evaluated across the transaction rather than separately for each previously successful statement.",
      "source": "/references/database-transactions-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        }
      ]
    },
    {
      "id": "db-s5-q017",
      "prompt": "Which ACID property is described as “All or nothing”?",
      "options": [
        {
          "id": "a",
          "text": "Durability."
        },
        {
          "id": "b",
          "text": "Atomicity."
        },
        {
          "id": "c",
          "text": "Isolation."
        },
        {
          "id": "d",
          "text": "Consistency."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Atomicity prevents partial transaction effects when some steps fail.",
      "source": "/references/database-transactions-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ACID Properties"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        }
      ]
    },
    {
      "id": "db-s5-q018",
      "prompt": "Which ACID property requires a transaction to move the database between states that satisfy its defined rules?",
      "options": [
        {
          "id": "a",
          "text": "Isolation."
        },
        {
          "id": "b",
          "text": "Atomicity."
        },
        {
          "id": "c",
          "text": "Durability."
        },
        {
          "id": "d",
          "text": "Consistency."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Consistency concerns declared constraints and business rules, not just the completion of a statement.",
      "source": "/references/database-transactions-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ACID Properties"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Consistency: Maintaining the Rules"
        }
      ]
    },
    {
      "id": "db-s5-q019",
      "prompt": "A CHECK constraint requires film.replacement_cost >= 1.00. An UPDATE attempts to set replacement_cost = -5.00. Which property is being enforced by rejecting the update?",
      "options": [
        {
          "id": "a",
          "text": "Consistency."
        },
        {
          "id": "b",
          "text": "Durability."
        },
        {
          "id": "c",
          "text": "Isolation."
        },
        {
          "id": "d",
          "text": "Atomicity."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The CHECK rule rejects a value outside the database’s valid state.",
      "source": "/references/database-transactions-slides.pdf#page=17",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Consistency: Maintaining the Rules"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "Consistency: Enforcing Business Rules"
        }
      ]
    },
    {
      "id": "db-s5-q020",
      "prompt": "Which list contains only mechanisms explicitly identified as supporting database consistency in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Primary/foreign-key constraints, CHECK constraints, and triggers."
        },
        {
          "id": "b",
          "text": "Indexes, WAL flushes, and transaction state transitions."
        },
        {
          "id": "c",
          "text": "WAL records, buffer hits, and query plans."
        },
        {
          "id": "d",
          "text": "Transaction snapshots, ORDER BY, and SQL joins."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slides identify keys, CHECK rules and triggers as examples of integrity/business rules.",
      "source": "/references/database-transactions-slides.pdf#page=17",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Consistency: Maintaining the Rules"
        }
      ]
    },
    {
      "id": "db-s5-q021",
      "prompt": "Session A changes a film price but has not committed. A separate session reads the previous committed price. Which ACID property explains this behavior?",
      "options": [
        {
          "id": "a",
          "text": "Consistency."
        },
        {
          "id": "b",
          "text": "Isolation."
        },
        {
          "id": "c",
          "text": "Atomicity."
        },
        {
          "id": "d",
          "text": "Durability."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The second session does not see Session A’s uncommitted change in the lecture’s isolation demonstration.",
      "source": "/references/database-transactions-slides.pdf#page=12",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Live Lab Prep: Observing Isolation"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "Isolation: Working in Private"
        }
      ]
    },
    {
      "id": "db-s5-q022",
      "prompt": "Which ACID property guarantees that a committed change survives a power failure?",
      "options": [
        {
          "id": "a",
          "text": "Durability."
        },
        {
          "id": "b",
          "text": "Isolation."
        },
        {
          "id": "c",
          "text": "Consistency."
        },
        {
          "id": "d",
          "text": "Atomicity."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Durability preserves committed results through crashes; WAL is the mechanism emphasized in the lecture.",
      "source": "/references/database-transactions-slides.pdf#page=14",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ACID Properties"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q023",
      "prompt": "In the lecture’s double-spending scenario, transaction B must wait while transaction A updates the same account. Which ACID property is illustrated by this protection?",
      "options": [
        {
          "id": "a",
          "text": "Atomicity."
        },
        {
          "id": "b",
          "text": "Durability."
        },
        {
          "id": "c",
          "text": "Isolation."
        },
        {
          "id": "d",
          "text": "Consistency."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Isolation, supported by the locking behavior in this particular banking example, prevents concurrent actions from interfering.",
      "source": "/references/database-transactions-slides.pdf#page=26",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "Case Study: The Banking Standard"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Interactive: How ACID Saves the Bank"
        }
      ]
    },
    {
      "id": "db-s5-q024",
      "prompt": "A banking transfer must deduct money from one account and credit another. Which ACID property specifically requires those two effects to succeed together?",
      "options": [
        {
          "id": "a",
          "text": "Consistency."
        },
        {
          "id": "b",
          "text": "Atomicity."
        },
        {
          "id": "c",
          "text": "Isolation."
        },
        {
          "id": "d",
          "text": "Durability."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Both transfer legs form one indivisible business operation.",
      "source": "/references/database-transactions-slides.pdf#page=5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "The ”Horror Story”: Life Without Transactions"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Interactive: How ACID Saves the Bank"
        }
      ]
    },
    {
      "id": "db-s5-q025",
      "prompt": "An ML training pipeline reads changing data while parallel transactions are modifying the same database. Which ACID property is most directly relevant to avoiding inconsistent training reads?",
      "options": [
        {
          "id": "a",
          "text": "Durability."
        },
        {
          "id": "b",
          "text": "Consistency."
        },
        {
          "id": "c",
          "text": "Atomicity."
        },
        {
          "id": "d",
          "text": "Isolation."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture links isolation to stable reading behavior and reproducible data processing.",
      "source": "/references/database-transactions-slides.pdf#page=19",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "Isolation: Working in Private"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "Why should AI Engineers care about ACID?"
        }
      ]
    },
    {
      "id": "db-s5-q026",
      "prompt": "An AI service writes both model metadata and its associated audit record as one transaction. After the transaction commits, the server crashes. Which pair of ACID properties addresses both the completeness and persistence of this update?",
      "options": [
        {
          "id": "a",
          "text": "Isolation ensures both records commit together; Consistency replaces the need for recovery."
        },
        {
          "id": "b",
          "text": "Atomicity ensures both records commit together; Durability preserves that commit after a crash."
        },
        {
          "id": "c",
          "text": "Durability prevents incomplete multi-step work; Isolation removes committed WAL records."
        },
        {
          "id": "d",
          "text": "Consistency guarantees all physical data pages are written; Atomicity prevents power loss."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Atomicity governs the all-or-nothing relationship between the two records; Durability protects the completed commit from later system failure.",
      "source": "/references/database-transactions-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "ACID Summary Table"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "Why should AI Engineers care about ACID?"
        }
      ]
    },
    {
      "id": "db-s5-q027",
      "prompt": "A transaction attempts to insert a row with a foreign key that refers to no existing parent. Why should the operation fail?",
      "options": [
        {
          "id": "a",
          "text": "A valid transaction may ignore foreign keys until its next successful COMMIT."
        },
        {
          "id": "b",
          "text": "The transaction must respect the database’s referential-integrity rules."
        },
        {
          "id": "c",
          "text": "A completed INSERT automatically creates its missing parent row."
        },
        {
          "id": "d",
          "text": "A successful earlier statement overrides foreign-key checks for later statements."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Foreign keys are integrity constraints; a transaction does not override them.",
      "source": "/references/database-transactions-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Consistency: Maintaining the Rules"
        }
      ]
    },
    {
      "id": "db-s5-q028",
      "prompt": "What is the main problem with 1,000 separately committed operations when they are intended to form one indivisible data-processing batch?",
      "options": [
        {
          "id": "a",
          "text": "A failure can leave some operations committed and others incomplete."
        },
        {
          "id": "b",
          "text": "All successful INSERTs are undone together after the first later error."
        },
        {
          "id": "c",
          "text": "The database guarantees all 1,000 inserts are one atomic unit anyway."
        },
        {
          "id": "d",
          "text": "A partial batch automatically becomes a SAVEPOINT-controlled transaction."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Without one transaction boundary for the batch, earlier successful statements have already committed by the time a later one fails.",
      "source": "/references/database-transactions-slides.pdf#page=10",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "Implicit vs. Explicit Transactions"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "Why should AI Engineers care about ACID?"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "The Trade-off: Throughput vs. ACID"
        }
      ]
    },
    {
      "id": "db-s5-q029",
      "prompt": "A transaction fails after 99 successful updates but before its 100th update finishes. Which outcome is required by Atomicity?",
      "options": [
        {
          "id": "a",
          "text": "The 99 earlier updates are retained because each one was valid."
        },
        {
          "id": "b",
          "text": "Earlier changes persist if they were already written into the WAL."
        },
        {
          "id": "c",
          "text": "All 99 earlier updates in that uncommitted transaction must be undone."
        },
        {
          "id": "d",
          "text": "COMMIT can preserve the 99 successes even while the transaction remains failed."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Atomicity covers the whole logical unit: a partially completed uncommitted transaction must not leave persistent partial changes.",
      "source": "/references/database-transactions-slides.pdf#page=15",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "Atomicity in Crashes"
        }
      ]
    },
    {
      "id": "db-s5-q030",
      "prompt": "Which ordering goes from least to most restrictive among the four standard isolation levels listed in the slides?",
      "options": [
        {
          "id": "a",
          "text": "Serializable → Read Committed → Repeatable Read → Read Uncommitted."
        },
        {
          "id": "b",
          "text": "Read Committed → Read Uncommitted → Serializable → Repeatable Read."
        },
        {
          "id": "c",
          "text": "Repeatable Read → Read Uncommitted → Read Committed → Serializable."
        },
        {
          "id": "d",
          "text": "Read Uncommitted → Read Committed → Repeatable Read → Serializable."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide lists four levels in increasing strictness, ending with Serializable.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q031",
      "prompt": "What is the default isolation level discussed for PostgreSQL in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Read Committed."
        },
        {
          "id": "b",
          "text": "Read Uncommitted."
        },
        {
          "id": "c",
          "text": "Repeatable Read."
        },
        {
          "id": "d",
          "text": "Serializable."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture identifies Read Committed as the behavior used instead of Read Uncommitted in PostgreSQL.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q032",
      "prompt": "An application selects the READ UNCOMMITTED isolation level in PostgreSQL. Which effective behavior is described by the accompanying lecturer quiz?",
      "options": [
        {
          "id": "a",
          "text": "PostgreSQL exposes all uncommitted updates to every session."
        },
        {
          "id": "b",
          "text": "PostgreSQL converts it into Serializable."
        },
        {
          "id": "c",
          "text": "PostgreSQL rejects the isolation-level setting rather than treating it as Read Committed."
        },
        {
          "id": "d",
          "text": "PostgreSQL treats it like Read Committed, so uncommitted changes remain invisible."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The session slide says PostgreSQL does not support a distinct Read Uncommitted behavior; Quiz 4 clarifies that the accepted setting acts as Read Committed.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q033",
      "prompt": "Under Read Committed, T1 reads a film price of 4.99. T2 changes it to 0.99 and commits. T1 issues the same SELECT again after that commit. What can T1 see?",
      "options": [
        {
          "id": "a",
          "text": "4.99, because Read Committed fixes one snapshot for the whole transaction."
        },
        {
          "id": "b",
          "text": "An uncommitted intermediate value chosen by T2."
        },
        {
          "id": "c",
          "text": "0.99, because the second statement can see T2’s committed change."
        },
        {
          "id": "d",
          "text": "T1 must wait until T2 disconnects before any subsequent SELECT can run."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Read Committed evaluates committed visibility separately for each statement, which can produce two different results.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q034",
      "prompt": "Which visibility rule best characterizes Repeatable Read in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Each statement must read the latest uncommitted value."
        },
        {
          "id": "b",
          "text": "A new committed-data snapshot is selected independently for every statement."
        },
        {
          "id": "c",
          "text": "The transaction continues to use a consistent snapshot for its reads."
        },
        {
          "id": "d",
          "text": "It allows reads of data that other transactions have not committed."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Unlike Read Committed, Repeatable Read keeps the same snapshot across subsequent queries in the transaction.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q035",
      "prompt": "T1 is using Repeatable Read. It reads a balance, T2 later commits a different balance, and T1 repeats the read within the same transaction. Which expectation matches the lecture’s snapshot concept?",
      "options": [
        {
          "id": "a",
          "text": "T1 continues to read the value from its established transaction snapshot."
        },
        {
          "id": "b",
          "text": "T1 must see T2’s latest value immediately."
        },
        {
          "id": "c",
          "text": "T1 reads T2’s value before T2 commits."
        },
        {
          "id": "d",
          "text": "T1 can see only the changes that T2 made before its COMMIT."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Repeatable Read does not refresh its snapshot for each later statement as Read Committed does.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        }
      ]
    },
    {
      "id": "db-s5-q036",
      "prompt": "Which isolation level is defined as making transaction outcomes behave as if transactions ran one after another?",
      "options": [
        {
          "id": "a",
          "text": "Read Committed."
        },
        {
          "id": "b",
          "text": "Read Uncommitted."
        },
        {
          "id": "c",
          "text": "Repeatable Read."
        },
        {
          "id": "d",
          "text": "Serializable."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Serializable provides the strongest standard isolation guarantee in the session.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "The Trade-off: Throughput vs. ACID"
        }
      ]
    },
    {
      "id": "db-s5-q037",
      "prompt": "In the slide’s two-session film-price demonstration, Session A updates rental_rate to 9.99 without COMMIT. What should Session B’s ordinary SELECT return?",
      "options": [
        {
          "id": "a",
          "text": "The new 9.99 values despite the missing commit."
        },
        {
          "id": "b",
          "text": "No rows until Session A explicitly releases all its changes."
        },
        {
          "id": "c",
          "text": "The prior committed rental_rate values."
        },
        {
          "id": "d",
          "text": "The original prices only after waiting for Session A to end."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The sample demonstrates that a concurrent ordinary reader does not see the writer’s uncommitted modifications.",
      "source": "/references/database-transactions-slides.pdf#page=12",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Live Lab Prep: Observing Isolation"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "Isolation: Working in Private"
        }
      ]
    },
    {
      "id": "db-s5-q038",
      "prompt": "What does the lecture identify as a major performance consideration when choosing stricter isolation?",
      "options": [
        {
          "id": "a",
          "text": "Serializable automatically removes the need for transaction coordination."
        },
        {
          "id": "b",
          "text": "Stronger isolation can increase waiting or coordination overhead."
        },
        {
          "id": "c",
          "text": "Stricter isolation always reduces the time required to commit."
        },
        {
          "id": "d",
          "text": "Read Committed guarantees the same snapshot for every statement in a transaction."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The throughput discussion associates strong safety guarantees with coordination costs and potential latency.",
      "source": "/references/database-transactions-slides.pdf#page=20",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "The 4 Standard Isolation Levels"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "The Trade-off: Throughput vs. ACID"
        }
      ]
    },
    {
      "id": "db-s5-q039",
      "prompt": "What does WAL stand for in PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "Write-Ahead Logging."
        },
        {
          "id": "b",
          "text": "Write-After Loading."
        },
        {
          "id": "c",
          "text": "Window Aggregation Layer."
        },
        {
          "id": "d",
          "text": "Write-Allocated Locking."
        }
      ],
      "correctOptionId": "a",
      "explanation": "WAL is the transaction logging technique the lecture identifies as the basis for durability.",
      "source": "/references/database-transactions-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q040",
      "prompt": "In the WAL workflow, what must happen before PostgreSQL can report a durable COMMIT under the lecture’s stated setup?",
      "options": [
        {
          "id": "a",
          "text": "All main-table pages must be rewritten before logging begins."
        },
        {
          "id": "b",
          "text": "The database must discard the log file."
        },
        {
          "id": "c",
          "text": "The WAL records must be removed after the last statement finishes."
        },
        {
          "id": "d",
          "text": "The required WAL records must be flushed to disk."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture’s sequence is log the changes, flush the log, and then complete the commit.",
      "source": "/references/database-transactions-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q041",
      "prompt": "Why can WAL logging be faster than immediately updating all scattered table pages?",
      "options": [
        {
          "id": "a",
          "text": "WAL never writes anything to persistent storage."
        },
        {
          "id": "b",
          "text": "The WAL records can be appended sequentially instead of requiring scattered writes."
        },
        {
          "id": "c",
          "text": "Logging automatically removes the need to enforce constraints."
        },
        {
          "id": "d",
          "text": "Writing WAL bypasses the need to flush anything to durable storage."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Sequential I/O typically reduces seek/write overhead compared with random updates to many data pages.",
      "source": "/references/database-transactions-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q042",
      "prompt": "A transaction has committed successfully, but its modified main data pages have not all been written. The server loses power. Which explanation best supports recovery?",
      "options": [
        {
          "id": "a",
          "text": "Main data pages always reach disk before a COMMIT is reported."
        },
        {
          "id": "b",
          "text": "The engine must reconstruct all changes from application memory."
        },
        {
          "id": "c",
          "text": "The database discards all committed transactions after a restart."
        },
        {
          "id": "d",
          "text": "Durable WAL can be replayed to recover the committed effects."
        }
      ],
      "correctOptionId": "d",
      "explanation": "A WAL-backed commit does not require all dirty data pages to have been flushed first; recovery can replay recorded changes.",
      "source": "/references/database-transactions-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q043",
      "prompt": "At the time of a crash, transaction T1 had committed and transaction T2 had not. After recovery, which outcome follows Atomicity and Durability?",
      "options": [
        {
          "id": "a",
          "text": "T1 remains committed; T2’s uncommitted effects do not become committed."
        },
        {
          "id": "b",
          "text": "Both are committed because their SQL statements already ran."
        },
        {
          "id": "c",
          "text": "Both are lost because the operating system restarted."
        },
        {
          "id": "d",
          "text": "T2 is committed automatically before T1 is replayed."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Crash recovery preserves committed work while excluding incomplete transactions.",
      "source": "/references/database-transactions-slides.pdf#page=16",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "Atomicity in Crashes"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q044",
      "prompt": "Where does the session say PostgreSQL stores its write-ahead log records?",
      "options": [
        {
          "id": "a",
          "text": "In the pg_wal area."
        },
        {
          "id": "b",
          "text": "In the query optimizer’s pg_stats statistics."
        },
        {
          "id": "c",
          "text": "Only inside the application’s RAM."
        },
        {
          "id": "d",
          "text": "Only in the main table pages, without a separate log."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide names pg_wal as the area holding WAL records, which support crash recovery.",
      "source": "/references/database-transactions-slides.pdf#page=22",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 34,
          "slideNumber": 29,
          "slideTitle": "Durability: Where is the Log?"
        }
      ]
    },
    {
      "id": "db-s5-q045",
      "prompt": "Why does the slide distinguish a committed change from a Partially Committed transaction?",
      "options": [
        {
          "id": "a",
          "text": "The final SQL statement has completed, so durability is already guaranteed."
        },
        {
          "id": "b",
          "text": "The committed transaction has crossed the durability boundary."
        },
        {
          "id": "c",
          "text": "The only difference is whether the transaction ran one or several statements."
        },
        {
          "id": "d",
          "text": "Both states describe transactions whose errors have already been rolled back."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Executing the final statement is not identical to completing the durable commit.",
      "source": "/references/database-transactions-slides.pdf#page=9",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "Transaction States: The Journey"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        }
      ]
    },
    {
      "id": "db-s5-q046",
      "prompt": "Which trade-off is explicitly associated with strict durability in the session?",
      "options": [
        {
          "id": "a",
          "text": "Durability avoids disk I/O but increases the risk of losing a commit."
        },
        {
          "id": "b",
          "text": "Commit processing may incur latency while the WAL is made durable."
        },
        {
          "id": "c",
          "text": "Durability requires all data pages to be synchronously rewritten on each COMMIT."
        },
        {
          "id": "d",
          "text": "Durability removes the need for any disk writes."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Ensuring a durable log requires persistent I/O; the lecture contrasts this cost with higher throughput.",
      "source": "/references/database-transactions-slides.pdf#page=21",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "Durability: The ”No-Eraser” Rule"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Write-Ahead Logging (WAL)"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "The Trade-off: Throughput vs. ACID"
        }
      ]
    },
    {
      "id": "db-s5-q047",
      "prompt": "What does SAVEPOINT user_created do inside an open transaction?",
      "options": [
        {
          "id": "a",
          "text": "It commits all statements executed before that point."
        },
        {
          "id": "b",
          "text": "It finalizes all earlier changes without ending the outer transaction."
        },
        {
          "id": "c",
          "text": "It marks the start of a second autocommit transaction."
        },
        {
          "id": "d",
          "text": "It marks a position to which part of the transaction can later be rolled back."
        }
      ],
      "correctOptionId": "d",
      "explanation": "SAVEPOINT provides a named rollback target while keeping the surrounding transaction open.",
      "source": "/references/database-transactions-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        }
      ]
    },
    {
      "id": "db-s5-q048",
      "prompt": "A transaction inserts a customer, creates SAVEPOINT user_created, and then fails while inserting an optional offer. It executes ROLLBACK TO user_created and COMMIT. What is retained?",
      "options": [
        {
          "id": "a",
          "text": "Only the optional offer; the customer is removed."
        },
        {
          "id": "b",
          "text": "The customer insertion, assuming it was valid; the failed optional work is not retained."
        },
        {
          "id": "c",
          "text": "Neither operation, because a savepoint cannot recover from an error."
        },
        {
          "id": "d",
          "text": "Both operations, because a savepoint forces a COMMIT."
        }
      ],
      "correctOptionId": "b",
      "explanation": "ROLLBACK TO undoes work performed after the savepoint and allows the earlier work to be committed.",
      "source": "/references/database-transactions-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        }
      ]
    },
    {
      "id": "db-s5-q049",
      "prompt": "Why is ROLLBACK TO a valid savepoint useful after a statement error in PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "It makes the failed optional statement valid without changing its input."
        },
        {
          "id": "b",
          "text": "It commits only the changes performed before the failed statement."
        },
        {
          "id": "c",
          "text": "It can recover the transaction from the failed state while preserving earlier work."
        },
        {
          "id": "d",
          "text": "It ends the transaction and discards the earlier successful operations."
        }
      ],
      "correctOptionId": "c",
      "explanation": "A rollback to the existing savepoint clears the failed subtransaction and undoes later work, so the outer transaction can continue.",
      "source": "/references/database-transactions-slides.pdf#page=11",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        }
      ]
    },
    {
      "id": "db-s5-q050",
      "prompt": "What distinguishes a full ROLLBACK from ROLLBACK TO user_created?",
      "options": [
        {
          "id": "a",
          "text": "A full ROLLBACK cancels the whole transaction; ROLLBACK TO undoes work since the named savepoint."
        },
        {
          "id": "b",
          "text": "A full ROLLBACK cancels only the last statement; ROLLBACK TO preserves later work."
        },
        {
          "id": "c",
          "text": "ROLLBACK TO commits all earlier work immediately, while full ROLLBACK waits for COMMIT."
        },
        {
          "id": "d",
          "text": "Both commands always undo every change since BEGIN."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Savepoints support partial recovery within an otherwise still-open transaction.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        }
      ]
    },
    {
      "id": "db-s5-q051",
      "prompt": "In the DVD rental lab, UPDATE rental sets return_date, then INSERT payment fails because payment_date is an invalid date literal. No savepoint was created. What happens to the rental update if the transaction is ended?",
      "options": [
        {
          "id": "a",
          "text": "The return_date is committed because UPDATE ran first."
        },
        {
          "id": "b",
          "text": "The payment INSERT succeeds after PostgreSQL ignores the date."
        },
        {
          "id": "c",
          "text": "The attempted return_date update is not committed."
        },
        {
          "id": "d",
          "text": "The invalid payment value is stored as the current date."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lab intentionally makes the payment insert fail to verify the all-or-nothing rule for the transaction.",
      "source": "/references/database-transactions-slides.pdf#page=30",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 30,
          "slideNumber": 25,
          "slideTitle": "Lab 01: The Rental Refund Crisis"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 31,
          "slideNumber": 26,
          "slideTitle": "Exercise 1: Testing the ”All or Nothing”"
        }
      ]
    },
    {
      "id": "db-s5-q052",
      "prompt": "A staff-registration transaction successfully creates a new staff row, sets a savepoint, then fails while assigning a non-existent store_id. What should the application do to preserve the staff registration?",
      "options": [
        {
          "id": "a",
          "text": "COMMIT immediately and ignore the broken store assignment."
        },
        {
          "id": "b",
          "text": "ROLLBACK TO the savepoint, assign an existing store, then COMMIT."
        },
        {
          "id": "c",
          "text": "Issue a full ROLLBACK and then COMMIT the original staff insertion."
        },
        {
          "id": "d",
          "text": "Repeat the store UPDATE immediately, without clearing the failed state."
        }
      ],
      "correctOptionId": "b",
      "explanation": "This follows the precise aim of the “Flexible Staff Task” exercise: recover from the bad assignment while keeping valid earlier work.",
      "source": "/references/database-transactions-slides.pdf#page=33",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "Exercise 2: The ”Flexible” Staff Task"
        }
      ]
    },
    {
      "id": "db-s5-q053",
      "prompt": "A developer inserts a valid row, creates a savepoint, inserts another valid row, rolls back to that savepoint, then commits. Which rows from this transaction persist?",
      "options": [
        {
          "id": "a",
          "text": "Both inserted rows."
        },
        {
          "id": "b",
          "text": "Neither row, because ROLLBACK TO always aborts the whole transaction."
        },
        {
          "id": "c",
          "text": "Only the row inserted after the savepoint."
        },
        {
          "id": "d",
          "text": "Only the row inserted before the savepoint."
        }
      ],
      "correctOptionId": "d",
      "explanation": "ROLLBACK TO removes work following its marker even if that later work had no SQL error.",
      "source": "/references/database-transactions-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        }
      ]
    },
    {
      "id": "db-s5-q054",
      "prompt": "An inventory transaction performs UPDATE inventory and INSERT orders in one BEGIN...COMMIT block. The INSERT violates a constraint and no savepoint is present. What is the correct interpretation?",
      "options": [
        {
          "id": "a",
          "text": "The inventory decrease must remain while the order insert fails."
        },
        {
          "id": "b",
          "text": "The constraint violation automatically converts the transaction to autocommit."
        },
        {
          "id": "c",
          "text": "COMMIT preserves all statements that ran before the failed INSERT."
        },
        {
          "id": "d",
          "text": "The transaction cannot commit a partial inventory decrease."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The transaction boundary groups related inventory and order effects, so a failure invalidates the unit of work.",
      "source": "/references/database-transactions-slides.pdf#page=8",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 8,
          "slideNumber": 6,
          "slideTitle": "Controlling Transactions in Postgres"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Postgres-Specific: The ”In Failed Transaction” State"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Atomicity: The ”All or Nothing” Rule"
        }
      ]
    },
    {
      "id": "db-s5-q055",
      "prompt": "After the failed rental-refund lab has ended, which short SQL statement directly checks whether rental_id = 2 kept its earlier return_date?",
      "options": [
        {
          "id": "a",
          "text": "SELECT return_date FROM payment WHERE rental_id = 2;"
        },
        {
          "id": "b",
          "text": "UPDATE rental SET return_date = NOW() WHERE rental_id = 2;"
        },
        {
          "id": "c",
          "text": "SELECT return_date FROM rental WHERE rental_id = 2;"
        },
        {
          "id": "d",
          "text": "SELECT return_date FROM rental WHERE customer_id = 2;"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lab asks students to inspect the original rental record after rollback. The SELECT checks the intended row and column without modifying it.",
      "source": "/references/database-transactions-slides.pdf#page=31",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 31,
          "slideNumber": 26,
          "slideTitle": "Exercise 1: Testing the ”All or Nothing”"
        }
      ]
    },
    {
      "id": "db-s5-q056",
      "prompt": "A long transaction contains essential customer creation and a non-critical promotional offer operation that might fail. Which design most directly supports the lecture’s intended behavior?",
      "options": [
        {
          "id": "a",
          "text": "Commit the customer first and treat it as part of the same atomic transaction as the offer."
        },
        {
          "id": "b",
          "text": "Place the savepoint before essential customer creation and roll back to it on offer failure."
        },
        {
          "id": "c",
          "text": "Execute customer creation and offer insertion as independent autocommit statements."
        },
        {
          "id": "d",
          "text": "Create a savepoint after the essential step and roll back to it if the optional step fails."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture’s savepoint use case separates work that must be preserved from optional work that can be undone without aborting the whole transaction.",
      "source": "/references/database-transactions-slides.pdf#page=32",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 32,
          "slideNumber": 27,
          "slideTitle": "Savepoints: Partial Rollbacks"
        },
        {
          "kind": "lecture",
          "file": "DB5.pdf",
          "pdfPage": 33,
          "slideNumber": 28,
          "slideTitle": "Exercise 2: The ”Flexible” Staff Task"
        }
      ]
    }
  ]
};
