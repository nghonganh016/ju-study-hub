import type { Chapter } from "@/types/quiz";

export const session7: Chapter = {
  "id": "session-7",
  "title": "Session 7: Advanced SQL Injection & Role-Based Access Control (RBAC)",
  "description": "49 câu hỏi về SQL Injection, RBAC, quyền truy cập và Row-Level Security.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s7-q001",
      "prompt": "Which description of an RLS policy in PostgreSQL is most accurate?",
      "options": [
        {
          "id": "a",
          "text": "A trigger that copies allowed rows into a separate private table"
        },
        {
          "id": "b",
          "text": "A rule in the app code that removes rows after the query returns"
        },
        {
          "id": "c",
          "text": "A filter condition the database adds to queries automatically"
        },
        {
          "id": "d",
          "text": "A view that each developer must call instead of the base table"
        }
      ],
      "correctOptionId": "c",
      "explanation": "A policy acts like a silent WHERE clause that the engine adds to every query from the affected roles, so no application code has to change.",
      "source": "/references/database-session-7-slides.pdf#page=23",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "How RLS Works: Policies"
        }
      ]
    },
    {
      "id": "db-s7-q002",
      "prompt": "Why do prepared statements stop SQL Injection?",
      "options": [
        {
          "id": "a",
          "text": "The database removes all quote characters from the input"
        },
        {
          "id": "b",
          "text": "The query structure is fixed before the user values arrive"
        },
        {
          "id": "c",
          "text": "The query runs with superuser rights, so no errors can occur"
        },
        {
          "id": "d",
          "text": "The user input is encrypted before it is sent to the server"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The SQL template is parsed first and the query tree is locked. Values sent later are treated only as literal data, so they cannot change the logic of the query.",
      "source": "/references/database-session-7-slides.pdf#page=13",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 13,
          "slideNumber": 12,
          "slideTitle": "Bulletproof Prevention: Prepared Statements"
        }
      ]
    },
    {
      "id": "db-s7-q003",
      "prompt": "One RLS policy on rental uses the condition staff_id = (SELECT staff_id FROM staff WHERE username = current_user). Why does this single policy show Mike only his rentals and Jon only his rentals?",
      "options": [
        {
          "id": "a",
          "text": "The application adds a WHERE clause for each user before it sends the query"
        },
        {
          "id": "b",
          "text": "The policy is rebuilt by the DBA each time a different staff member logs in"
        },
        {
          "id": "c",
          "text": "current_user is read per session, so each user gets a different filter"
        },
        {
          "id": "d",
          "text": "Postgres makes one copy of the rental table for every member of store_clerk"
        }
      ],
      "correctOptionId": "c",
      "explanation": "current_user returns the role of the current database session, so the same policy expression produces a different filter for each logged-in user. No application code or extra policies are needed.",
      "source": "/references/database-session-7-slides.pdf#page=24",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Setting up RLS in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q004",
      "prompt": "The DVD store website hides all SQL error messages. An attacker sends customer_id=5 AND 1=1 and then customer_id=5 AND 1=2. In this Boolean-based blind SQLi, what signal does the attacker rely on?",
      "options": [
        {
          "id": "a",
          "text": "A copy of the database backup left on the server"
        },
        {
          "id": "b",
          "text": "Detailed SQL error messages printed on the web page"
        },
        {
          "id": "c",
          "text": "Differences in the page content for TRUE vs FALSE"
        },
        {
          "id": "d",
          "text": "The exact time the server takes to send a reply"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Boolean-based blind SQLi asks TRUE/FALSE questions and reads the answer from how the page changes (profile loads vs. profile disappears). No error messages are needed.",
      "source": "/references/database-session-7-slides.pdf#page=9",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "Advanced: Blind SQL Injection (Boolean-based)"
        }
      ]
    },
    {
      "id": "db-s7-q005",
      "prompt": "In modern PostgreSQL (since 8.1), what is the relationship between a \"user\" and a \"group\"?",
      "options": [
        {
          "id": "a",
          "text": "Groups can log in, but users can only receive privileges"
        },
        {
          "id": "b",
          "text": "Both are roles; a user is simply a role with LOGIN"
        },
        {
          "id": "c",
          "text": "Users are stored in tables; groups are stored in files"
        },
        {
          "id": "d",
          "text": "They are separate objects that cannot be linked together"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Users and groups were merged into one concept: ROLE. A role with LOGIN acts as a user; a role without LOGIN that other roles are members of acts as a group.",
      "source": "/references/database-session-7-slides.pdf#page=17",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 17,
          "slideNumber": 15,
          "slideTitle": "Users vs. Roles in PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s7-q006",
      "prompt": "Which command is equivalent to CREATE USER alice WITH PASSWORD 'x';?",
      "options": [
        {
          "id": "a",
          "text": "CREATE ROLE alice WITH NOLOGIN PASSWORD 'x';"
        },
        {
          "id": "b",
          "text": "CREATE ROLE alice WITH LOGIN PASSWORD 'x';"
        },
        {
          "id": "c",
          "text": "CREATE GROUP alice WITH INHERIT PASSWORD 'x';"
        },
        {
          "id": "d",
          "text": "CREATE ROLE alice WITH SUPERUSER PASSWORD 'x';"
        }
      ],
      "correctOptionId": "b",
      "explanation": "CREATE USER is the same as CREATE ROLE, except that LOGIN is added by default.",
      "source": "/references/database-session-7-slides.pdf#page=17",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 17,
          "slideNumber": 15,
          "slideTitle": "Users vs. Roles in PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s7-q007",
      "prompt": "RLS is enabled on rental, with a policy that applies only to store_clerk. The DBA connects as postgres (superuser) and runs SELECT COUNT(*) FROM rental;. What happens?",
      "options": [
        {
          "id": "a",
          "text": "It fails, because RLS blocks every role except store_clerk"
        },
        {
          "id": "b",
          "text": "It counts all rows, because superusers always bypass RLS"
        },
        {
          "id": "c",
          "text": "It returns only the rows whose staff_id is equal to 1"
        },
        {
          "id": "d",
          "text": "It returns zero rows, because postgres has no matching policy"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Superusers (and roles with BYPASSRLS) always bypass row-level security, so the count includes every row. This is another reason why apps must never connect as postgres.",
      "source": "/references/database-session-7-slides.pdf#page=22",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 22,
          "slideNumber": 20,
          "slideTitle": "The Ultimate Weapon: Row-Level Security (RLS)"
        }
      ]
    },
    {
      "id": "db-s7-q008",
      "prompt": "Which statement best describes Second-Order SQL Injection?",
      "options": [
        {
          "id": "a",
          "text": "The attacker uses two different users to log in at once"
        },
        {
          "id": "b",
          "text": "The attack is sent twice to make sure that the server accepts it"
        },
        {
          "id": "c",
          "text": "The payload runs at once in the first query that reads it"
        },
        {
          "id": "d",
          "text": "The payload is stored first and runs later in another query"
        }
      ],
      "correctOptionId": "d",
      "explanation": "In second-order SQLi the payload is stored safely first (e.g. as a last name), then executed later when another part of the system reads it and concatenates it into a new query.",
      "source": "/references/database-session-7-slides.pdf#page=11",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 11,
          "slideNumber": 10,
          "slideTitle": "Second-Order SQLi (The ”Time Bomb”)"
        }
      ]
    },
    {
      "id": "db-s7-q009",
      "prompt": "What is the root cause of SQL Injection?",
      "options": [
        {
          "id": "a",
          "text": "The tables do not have primary keys or indexes"
        },
        {
          "id": "b",
          "text": "The database engine has a bug in its own SQL parser"
        },
        {
          "id": "c",
          "text": "User input is mixed into SQL code as plain text"
        },
        {
          "id": "d",
          "text": "The server runs an outdated PostgreSQL version"
        }
      ],
      "correctOptionId": "c",
      "explanation": "SQL Injection is an application-level flaw: raw user input is concatenated into the SQL string, so the engine cannot tell data apart from code.",
      "source": "/references/database-session-7-slides.pdf#page=7",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "The Core Issue of SQL Injection"
        }
      ]
    },
    {
      "id": "db-s7-q010",
      "prompt": "In which situation would an attacker choose time-based blind SQLi (for example, using pg_sleep(10)) instead of Boolean-based blind SQLi?",
      "options": [
        {
          "id": "a",
          "text": "When the page looks the same for TRUE and FALSE"
        },
        {
          "id": "b",
          "text": "When the attacker already knows the admin password"
        },
        {
          "id": "c",
          "text": "When the website shows full SQL errors to visitors"
        },
        {
          "id": "d",
          "text": "When the database uses the Serializable isolation level"
        }
      ],
      "correctOptionId": "a",
      "explanation": "When the page is identical for TRUE and FALSE, there is no visual clue. The attacker then uses response time as the signal: a 10-second delay means the condition was TRUE.",
      "source": "/references/database-session-7-slides.pdf#page=10",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 10,
          "slideNumber": 9,
          "slideTitle": "Advanced: Time-based Blind SQLi"
        }
      ]
    },
    {
      "id": "db-s7-q011",
      "prompt": "An AI pre-processing script reads actor names from the actor table and builds an UPDATE statement with a Python f-string. Which statement is true?",
      "options": [
        {
          "id": "a",
          "text": "Data from your own tables is safe because it was checked on insert"
        },
        {
          "id": "b",
          "text": "Only data from web forms needs parameters, not data from tables"
        },
        {
          "id": "c",
          "text": "f-strings are safe in Python because they escape quotes by default"
        },
        {
          "id": "d",
          "text": "Data from your own tables can still carry an injection payload"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Golden rule: never fully trust data, even from your own tables. A stored value can carry a payload that runs when it is concatenated into a new query (second-order SQLi). f-strings do no escaping.",
      "source": "/references/database-session-7-slides.pdf#page=12",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 12,
          "slideNumber": 11,
          "slideTitle": "Second-Order SQLi in AI Pipelines"
        }
      ]
    },
    {
      "id": "db-s7-q012",
      "prompt": "The store_clerk role was never granted DELETE on rental. A DBA then runs: REVOKE DELETE ON rental FROM store_clerk; What is the effect of this command?",
      "options": [
        {
          "id": "a",
          "text": "It blocks DELETE even when a member gets DELETE in another way"
        },
        {
          "id": "b",
          "text": "It raises an error, so the rest of the script stops running"
        },
        {
          "id": "c",
          "text": "It has no effect, since PostgreSQL has no explicit deny rule"
        },
        {
          "id": "d",
          "text": "It removes the store_clerk role from all of its member users"
        }
      ],
      "correctOptionId": "c",
      "explanation": "PostgreSQL privileges are additive; there is no \"deny\" entry. REVOKE only removes a privilege that was granted. If it was never granted, nothing changes, and a member could still get DELETE through a direct grant or another role.",
      "source": "/references/database-session-7-slides.pdf#page=20",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 20,
          "slideNumber": 18,
          "slideTitle": "GRANT and REVOKE Privileges"
        }
      ]
    },
    {
      "id": "db-s7-q013",
      "prompt": "According to the Principle of Least Privilege, why is it dangerous to connect a web app or AI pipeline using the postgres account?",
      "options": [
        {
          "id": "a",
          "text": "The postgres account cannot run SELECT on normal tables"
        },
        {
          "id": "b",
          "text": "The postgres account is not allowed to use prepared statements"
        },
        {
          "id": "c",
          "text": "Superuser connections are slower than normal connections"
        },
        {
          "id": "d",
          "text": "A single SQL injection gives the attacker full control"
        }
      ],
      "correctOptionId": "d",
      "explanation": "If the app connects as a superuser, any SQL Injection inherits superuser power: the attacker can drop databases, read local files or even run OS commands.",
      "source": "/references/database-session-7-slides.pdf#page=16",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 16,
          "slideNumber": 14,
          "slideTitle": "The Principle of Least Privilege (PoLP)"
        }
      ]
    },
    {
      "id": "db-s7-q014",
      "prompt": "Which limitation of traditional RBAC does Row-Level Security solve?",
      "options": [
        {
          "id": "a",
          "text": "RBAC cannot control INSERT, only SELECT and DELETE commands"
        },
        {
          "id": "b",
          "text": "RBAC only works when the app uses an ORM such as SQLAlchemy"
        },
        {
          "id": "c",
          "text": "RBAC cannot give the same privilege to more than one user at once"
        },
        {
          "id": "d",
          "text": "RBAC controls table access, not which rows a user can see"
        }
      ],
      "correctOptionId": "d",
      "explanation": "RBAC works at the table level (can this user access the table?). RLS answers a finer question: which specific rows can this user access?",
      "source": "/references/database-session-7-slides.pdf#page=21",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 21,
          "slideNumber": 19,
          "slideTitle": "The Limitation of Traditional RBAC"
        }
      ]
    },
    {
      "id": "db-s7-q015",
      "prompt": "A DBA runs ALTER TABLE rental ENABLE ROW LEVEL SECURITY; but forgets to create any policy. store_clerk still has SELECT on rental. What does a normal (non-owner) member of store_clerk get from SELECT * FROM rental;?",
      "options": [
        {
          "id": "a",
          "text": "Only rows where staff_id is NULL, as a safe default value"
        },
        {
          "id": "b",
          "text": "All rows, because RLS only starts working once a policy exists"
        },
        {
          "id": "c",
          "text": "No rows, because RLS denies access when no policy matches"
        },
        {
          "id": "d",
          "text": "An error, because a table with RLS must have a policy first"
        }
      ],
      "correctOptionId": "c",
      "explanation": "When RLS is enabled and no policy applies, PostgreSQL uses a default-deny rule: no rows are visible, and no error is raised.",
      "source": "/references/database-session-7-slides.pdf#page=23",
      "topic": "Original Quiz 5",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "How RLS Works: Policies"
        }
      ]
    },
    {
      "id": "db-s7-q016",
      "prompt": "Under PostgreSQL's default isolation level, which anomaly may still occur between two reads in the same transaction?",
      "options": [
        {
          "id": "a",
          "text": "Dirty reads of uncommitted updates"
        },
        {
          "id": "b",
          "text": "Non-repeatable reads after another transaction commits"
        },
        {
          "id": "c",
          "text": "Uncommitted data becoming durable"
        },
        {
          "id": "d",
          "text": "All transactions appearing serial"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Read Committed prevents dirty reads but permits non-repeatable reads, as the recap states.",
      "source": "/references/database-session-7-slides.pdf#page=4",
      "topic": "Isolation recap",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 4,
          "slideNumber": 4,
          "slideTitle": "Recap: Isolation Levels & Concurrency"
        }
      ]
    },
    {
      "id": "db-s7-q017",
      "prompt": "An attacker changes labels in an AI training table before a model is retrained. Which risk is illustrated?",
      "options": [
        {
          "id": "a",
          "text": "Index fragmentation"
        },
        {
          "id": "b",
          "text": "Transaction deadlock"
        },
        {
          "id": "c",
          "text": "Data poisoning"
        },
        {
          "id": "d",
          "text": "Query-plan instability"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Manipulated training labels can contaminate the data used to train the model.",
      "source": "/references/database-session-7-slides.pdf#page=5",
      "topic": "AI security",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 5,
          "slideNumber": 5,
          "slideTitle": "Why should AI Engineers care about DB Security?"
        }
      ]
    },
    {
      "id": "db-s7-q018",
      "prompt": "In the slide's vulnerable staff-login example, what is the combined purpose of OR 1=1 and the SQL comment marker?",
      "options": [
        {
          "id": "a",
          "text": "Force the predicate true and comment out the password condition"
        },
        {
          "id": "b",
          "text": "Encrypt the username and escape the password"
        },
        {
          "id": "c",
          "text": "Create a new staff role and revoke its password"
        },
        {
          "id": "d",
          "text": "Delay execution and trigger an error message"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The tautology makes the condition true, and the comment suppresses the remaining password predicate.",
      "source": "/references/database-session-7-slides.pdf#page=8",
      "topic": "Classic SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "Classic SQL Injection (Bypassing Staff Login)"
        }
      ]
    },
    {
      "id": "db-s7-q019",
      "prompt": "What role does the single quote in an injected username play in the vulnerable login query?",
      "options": [
        {
          "id": "a",
          "text": "It grants SELECT on staff"
        },
        {
          "id": "b",
          "text": "It requests an implicit transaction"
        },
        {
          "id": "c",
          "text": "It invokes a PostgreSQL function"
        },
        {
          "id": "d",
          "text": "It closes the surrounding SQL string literal"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The quote escapes the intended data string, allowing subsequent input to be interpreted as SQL syntax.",
      "source": "/references/database-session-7-slides.pdf#page=8",
      "topic": "Classic SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "Classic SQL Injection (Bypassing Staff Login)"
        }
      ]
    },
    {
      "id": "db-s7-q020",
      "prompt": "A page loads when an injected condition is TRUE and disappears when FALSE. What could an attacker infer by repeatedly changing a substring test?",
      "options": [
        {
          "id": "a",
          "text": "The database engine's physical index layout"
        },
        {
          "id": "b",
          "text": "Secret text one character at a time"
        },
        {
          "id": "c",
          "text": "The duration of database checkpoints"
        },
        {
          "id": "d",
          "text": "The number of open transactions"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide shows substring(version(),1,1) as an example of character-by-character inference.",
      "source": "/references/database-session-7-slides.pdf#page=9",
      "topic": "Boolean blind SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 9,
          "slideNumber": 8,
          "slideTitle": "Advanced: Blind SQL Injection (Boolean-based)"
        }
      ]
    },
    {
      "id": "db-s7-q021",
      "prompt": "A site returns identical page content for TRUE and FALSE. Which observation can still carry information about an injected condition?",
      "options": [
        {
          "id": "a",
          "text": "Whether an index is visible in pgAdmin"
        },
        {
          "id": "b",
          "text": "Whether a trigger definition was updated"
        },
        {
          "id": "c",
          "text": "A reproducible response-time delay"
        },
        {
          "id": "d",
          "text": "A change to the application's CSS"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Time-based blind SQLi uses conditional delay as a side channel when content gives no clue.",
      "source": "/references/database-session-7-slides.pdf#page=10",
      "topic": "Time-based blind SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 10,
          "slideNumber": 9,
          "slideTitle": "Advanced: Time-based Blind SQLi"
        }
      ]
    },
    {
      "id": "db-s7-q022",
      "prompt": "In the lecture example, what is the purpose of testing current_user in a conditional delay?",
      "options": [
        {
          "id": "a",
          "text": "To discover the database role used by the connection"
        },
        {
          "id": "b",
          "text": "To change the active user's password"
        },
        {
          "id": "c",
          "text": "To grant access to the payment table"
        },
        {
          "id": "d",
          "text": "To list every role in the cluster"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The example conditions the delay on whether current_user is postgres, revealing the connection role through timing.",
      "source": "/references/database-session-7-slides.pdf#page=10",
      "topic": "Time-based blind SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 10,
          "slideNumber": 9,
          "slideTitle": "Advanced: Time-based Blind SQLi"
        }
      ]
    },
    {
      "id": "db-s7-q023",
      "prompt": "A malicious surname is stored safely but later appended to a reporting query. At which stage does the SQL Injection vulnerability become exploitable?",
      "options": [
        {
          "id": "a",
          "text": "When an index is created for surname"
        },
        {
          "id": "b",
          "text": "When the string is inserted using safe parameters"
        },
        {
          "id": "c",
          "text": "When the database takes a backup"
        },
        {
          "id": "d",
          "text": "When the reporting query mixes the stored value into SQL text"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Second-order SQLi arises when previously stored content is later treated as executable SQL.",
      "source": "/references/database-session-7-slides.pdf#page=11",
      "topic": "Second-order SQLi",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 11,
          "slideNumber": 10,
          "slideTitle": "Second-Order SQLi (The ”Time Bomb”)"
        }
      ]
    },
    {
      "id": "db-s7-q024",
      "prompt": "An AI pipeline reads actor names from a trusted-looking database table. Which coding change best addresses the lecture's second-order SQLi risk?",
      "options": [
        {
          "id": "a",
          "text": "Use a larger VARCHAR field"
        },
        {
          "id": "b",
          "text": "Build an UPDATE with f-string formatting"
        },
        {
          "id": "c",
          "text": "Bind actor names as query parameters when issuing UPDATE"
        },
        {
          "id": "d",
          "text": "Disable all indexes on the actor table"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Stored strings are not inherently safe; parameter binding prevents actor names from modifying the UPDATE statement structure.",
      "source": "/references/database-session-7-slides.pdf#page=12",
      "topic": "AI pipeline",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 12,
          "slideNumber": 11,
          "slideTitle": "Second-Order SQLi in AI Pipelines"
        }
      ]
    },
    {
      "id": "db-s7-q025",
      "prompt": "In PREPARE staff_login(text, text), what do \\$1 and \\$2 represent?",
      "options": [
        {
          "id": "a",
          "text": "Column positions in the staff table"
        },
        {
          "id": "b",
          "text": "Parameter placeholders populated at execution time"
        },
        {
          "id": "c",
          "text": "The first two rows returned by the query"
        },
        {
          "id": "d",
          "text": "Two role identifiers granted LOGIN"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The prepared query uses placeholders for username and password, with values bound later at EXECUTE.",
      "source": "/references/database-session-7-slides.pdf#page=13",
      "topic": "Prepared statements",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 13,
          "slideNumber": 12,
          "slideTitle": "Bulletproof Prevention: Prepared Statements"
        }
      ]
    },
    {
      "id": "db-s7-q026",
      "prompt": "A malicious username contains quote characters and OR 1=1, but is sent as a bound parameter. What happens to the query's intended predicate?",
      "options": [
        {
          "id": "a",
          "text": "It is replaced with an always-true expression"
        },
        {
          "id": "b",
          "text": "It becomes a new SQL comment"
        },
        {
          "id": "c",
          "text": "It is executed as an independent statement"
        },
        {
          "id": "d",
          "text": "It remains unchanged because the payload is treated as data"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The prepared statement's SQL structure is fixed; the payload is treated as a literal username value.",
      "source": "/references/database-session-7-slides.pdf#page=13",
      "topic": "Prepared statements",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 13,
          "slideNumber": 12,
          "slideTitle": "Bulletproof Prevention: Prepared Statements"
        }
      ]
    },
    {
      "id": "db-s7-q027",
      "prompt": "A search endpoint expects customer_id to be an integer. Which additional application-layer control matches the slide's guidance?",
      "options": [
        {
          "id": "a",
          "text": "Validate that customer_id has an integer type before querying"
        },
        {
          "id": "b",
          "text": "Grant the application SUPERUSER temporarily"
        },
        {
          "id": "c",
          "text": "Use string concatenation only for numeric inputs"
        },
        {
          "id": "d",
          "text": "Allow all customer_id values and rely on hidden errors"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Input validation should enforce integer types for customer_id in addition to parameterized queries.",
      "source": "/references/database-session-7-slides.pdf#page=14",
      "topic": "Defense in depth",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 14,
          "slideNumber": 13,
          "slideTitle": "Defense in Depth: Application Layer"
        }
      ]
    },
    {
      "id": "db-s7-q028",
      "prompt": "Which combination most closely reflects the defense-in-depth approach in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Only remove database error messages"
        },
        {
          "id": "b",
          "text": "Only assign a password to the postgres role"
        },
        {
          "id": "c",
          "text": "Use parameterized queries, input validation, and least-privilege connections"
        },
        {
          "id": "d",
          "text": "Make all tables read-only for the database owner"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide combines ORM/prepared statement use, validation, and least privilege rather than relying on a single layer.",
      "source": "/references/database-session-7-slides.pdf#page=14",
      "topic": "Defense in depth",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 14,
          "slideNumber": 13,
          "slideTitle": "Defense in Depth: Application Layer"
        }
      ]
    },
    {
      "id": "db-s7-q029",
      "prompt": "An inference service only reads feature records. Under PoLP, which account configuration is most appropriate?",
      "options": [
        {
          "id": "a",
          "text": "A superuser account so queries never fail"
        },
        {
          "id": "b",
          "text": "A restricted role with only the required read privileges"
        },
        {
          "id": "c",
          "text": "A role with CREATE ROLE and DROP permissions"
        },
        {
          "id": "d",
          "text": "A table owner account with unrestricted write access"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The Principle of Least Privilege requires only the minimum access needed for the service to function.",
      "source": "/references/database-session-7-slides.pdf#page=16",
      "topic": "Least privilege",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 16,
          "slideNumber": 14,
          "slideTitle": "The Principle of Least Privilege (PoLP)"
        }
      ]
    },
    {
      "id": "db-s7-q030",
      "prompt": "What is the immediate effect of CREATE ROLE data_analyst; as written in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "It creates a role without LOGIN by default"
        },
        {
          "id": "b",
          "text": "It creates a role that can log in automatically"
        },
        {
          "id": "c",
          "text": "It creates a database named data_analyst"
        },
        {
          "id": "d",
          "text": "It grants SELECT on all public tables"
        }
      ],
      "correctOptionId": "a",
      "explanation": "CREATE ROLE defaults to NOLOGIN, so the example acts as a group-style role.",
      "source": "/references/database-session-7-slides.pdf#page=17",
      "topic": "Role basics",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 17,
          "slideNumber": 15,
          "slideTitle": "Users vs. Roles in PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s7-q031",
      "prompt": "Why does RBAC usually assign privileges to group roles before users?",
      "options": [
        {
          "id": "a",
          "text": "It automatically turns RLS off"
        },
        {
          "id": "b",
          "text": "It replaces the need for table grants"
        },
        {
          "id": "c",
          "text": "It forces all users to share one password"
        },
        {
          "id": "d",
          "text": "It centralizes permission management for multiple users"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Permissions can be granted once to the role and reused via membership by Mike, Jon, and others.",
      "source": "/references/database-session-7-slides.pdf#page=18",
      "topic": "RBAC design",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 18,
          "slideNumber": 16,
          "slideTitle": "Role-Based Access Control (RBAC)"
        }
      ]
    },
    {
      "id": "db-s7-q032",
      "prompt": "Which command adds jon to the existing store_clerk role?",
      "options": [
        {
          "id": "a",
          "text": "GRANT jon TO store_clerk;"
        },
        {
          "id": "b",
          "text": "GRANT store_clerk TO jon;"
        },
        {
          "id": "c",
          "text": "ALTER ROLE store_clerk OWNER TO jon;"
        },
        {
          "id": "d",
          "text": "CREATE USER store_clerk FOR jon;"
        }
      ],
      "correctOptionId": "b",
      "explanation": "GRANT store_clerk TO jon assigns membership in the group role to Jon.",
      "source": "/references/database-session-7-slides.pdf#page=19",
      "topic": "Role membership",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 19,
          "slideNumber": 17,
          "slideTitle": "Managing Roles in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q033",
      "prompt": "A DBA wants to remove Jon's membership in store_clerk without deleting either role. Which command matches the lecture?",
      "options": [
        {
          "id": "a",
          "text": "DROP ROLE jon;"
        },
        {
          "id": "b",
          "text": "REVOKE jon FROM store_clerk;"
        },
        {
          "id": "c",
          "text": "REVOKE store_clerk FROM jon;"
        },
        {
          "id": "d",
          "text": "DROP OWNED BY store_clerk;"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Role membership is removed by revoking the granted group role from the member.",
      "source": "/references/database-session-7-slides.pdf#page=19",
      "topic": "Role membership",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 19,
          "slideNumber": 17,
          "slideTitle": "Managing Roles in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q034",
      "prompt": "Which SQL command grants clerks permission to read film records without allowing film changes?",
      "options": [
        {
          "id": "a",
          "text": "GRANT SELECT ON film TO store_clerk;"
        },
        {
          "id": "b",
          "text": "GRANT INSERT ON film TO store_clerk;"
        },
        {
          "id": "c",
          "text": "GRANT UPDATE ON film TO store_clerk;"
        },
        {
          "id": "d",
          "text": "GRANT ALL ON film TO store_clerk;"
        }
      ],
      "correctOptionId": "a",
      "explanation": "SELECT permits reading; INSERT and UPDATE change data, while ALL grants broader permissions.",
      "source": "/references/database-session-7-slides.pdf#page=20",
      "topic": "Table privileges",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 20,
          "slideNumber": 18,
          "slideTitle": "GRANT and REVOKE Privileges"
        }
      ]
    },
    {
      "id": "db-s7-q035",
      "prompt": "According to the lecture's RBAC setup, which privilege set is granted on rental to store_clerk?",
      "options": [
        {
          "id": "a",
          "text": "SELECT and DELETE"
        },
        {
          "id": "b",
          "text": "INSERT and DELETE"
        },
        {
          "id": "c",
          "text": "UPDATE and DELETE"
        },
        {
          "id": "d",
          "text": "SELECT, INSERT, and UPDATE"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The rental grant includes SELECT, INSERT, UPDATE, while DELETE is not granted.",
      "source": "/references/database-session-7-slides.pdf#page=20",
      "topic": "Table privileges",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 20,
          "slideNumber": 18,
          "slideTitle": "GRANT and REVOKE Privileges"
        }
      ]
    },
    {
      "id": "db-s7-q036",
      "prompt": "Mike and Jon both inherit SELECT ON rental from store_clerk. Without RLS, what is the relevant privacy problem?",
      "options": [
        {
          "id": "a",
          "text": "Only the role creator can query rental"
        },
        {
          "id": "b",
          "text": "Each clerk can read rentals belonging to the other clerk"
        },
        {
          "id": "c",
          "text": "Membership revokes SELECT from both users"
        },
        {
          "id": "d",
          "text": "The database copies rental into separate tables"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Table-level RBAC permits access to the table, not different subsets of its rows.",
      "source": "/references/database-session-7-slides.pdf#page=21",
      "topic": "RBAC limitation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 21,
          "slideNumber": 19,
          "slideTitle": "The Limitation of Traditional RBAC"
        }
      ]
    },
    {
      "id": "db-s7-q037",
      "prompt": "Why is RLS especially useful for a multi-tenant application sharing one table?",
      "options": [
        {
          "id": "a",
          "text": "It eliminates every need for application authentication"
        },
        {
          "id": "b",
          "text": "It guarantees queries use index scans"
        },
        {
          "id": "c",
          "text": "It restricts which rows each tenant's role can access"
        },
        {
          "id": "d",
          "text": "It encrypts every row with a different key"
        }
      ],
      "correctOptionId": "c",
      "explanation": "RLS applies database-enforced row filters so tenants can share tables while maintaining data isolation.",
      "source": "/references/database-session-7-slides.pdf#page=22",
      "topic": "RLS use cases",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 22,
          "slideNumber": 20,
          "slideTitle": "The Ultimate Weapon: Row-Level Security (RLS)"
        }
      ]
    },
    {
      "id": "db-s7-q038",
      "prompt": "Which sequence correctly implements the basic two-step RLS approach?",
      "options": [
        {
          "id": "a",
          "text": "Enable RLS on a table, then create a policy for permitted rows"
        },
        {
          "id": "b",
          "text": "Create an index, then update the table's owner"
        },
        {
          "id": "c",
          "text": "Create separate tables per user, then hide the originals"
        },
        {
          "id": "d",
          "text": "Revoke LOGIN from every user, then enable autocommit"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture first enables row-level security and then defines a policy that controls visibility.",
      "source": "/references/database-session-7-slides.pdf#page=23",
      "topic": "RLS setup",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 23,
          "slideNumber": 21,
          "slideTitle": "How RLS Works: Policies"
        }
      ]
    },
    {
      "id": "db-s7-q039",
      "prompt": "In CREATE POLICY ... FOR ALL TO store_clerk USING (...), which clause identifies the roles covered by the policy?",
      "options": [
        {
          "id": "a",
          "text": "USING"
        },
        {
          "id": "b",
          "text": "FOR ALL"
        },
        {
          "id": "c",
          "text": "ON rental"
        },
        {
          "id": "d",
          "text": "TO store_clerk"
        }
      ],
      "correctOptionId": "d",
      "explanation": "TO selects the role or roles to which the policy applies; USING provides the row filter.",
      "source": "/references/database-session-7-slides.pdf#page=24",
      "topic": "RLS syntax",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Setting up RLS in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q040",
      "prompt": "What does FOR ALL signify in the slide's rental policy definition?",
      "options": [
        {
          "id": "a",
          "text": "The policy ignores row filters"
        },
        {
          "id": "b",
          "text": "The policy targets all four command categories named in the slide"
        },
        {
          "id": "c",
          "text": "The policy grants ALL table privileges"
        },
        {
          "id": "d",
          "text": "The policy applies to every database in the cluster"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide explicitly explains FOR ALL as applying to SELECT, INSERT, UPDATE, and DELETE policy behavior.",
      "source": "/references/database-session-7-slides.pdf#page=24",
      "topic": "RLS syntax",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Setting up RLS in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q041",
      "prompt": "Which condition is used in the rental policy to match a row to the currently active staff role?",
      "options": [
        {
          "id": "a",
          "text": "rental_id = current_user"
        },
        {
          "id": "b",
          "text": "customer_id = current_user"
        },
        {
          "id": "c",
          "text": "staff_id = (SELECT staff_id FROM staff WHERE username = current_user)"
        },
        {
          "id": "d",
          "text": "staff_id IS NOT NULL"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The policy looks up the staff_id for the current database role and compares it with each rental row's staff_id.",
      "source": "/references/database-session-7-slides.pdf#page=24",
      "topic": "RLS syntax",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 24,
          "slideNumber": 22,
          "slideTitle": "Setting up RLS in dvdrental"
        }
      ]
    },
    {
      "id": "db-s7-q042",
      "prompt": "After SET ROLE mike, why can SELECT * FROM rental return Mike's records without a manual WHERE clause?",
      "options": [
        {
          "id": "a",
          "text": "The database applies the matching RLS policy automatically"
        },
        {
          "id": "b",
          "text": "SET ROLE physically deletes Jon's rows"
        },
        {
          "id": "c",
          "text": "PostgreSQL creates a materialized view for Mike"
        },
        {
          "id": "d",
          "text": "The application adds a special staff filter"
        }
      ],
      "correctOptionId": "a",
      "explanation": "PostgreSQL automatically enforces the policy condition when the query runs in Mike's role context.",
      "source": "/references/database-session-7-slides.pdf#page=25",
      "topic": "Testing RLS",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 25,
          "slideNumber": 23,
          "slideTitle": "Testing the RLS Policy"
        }
      ]
    },
    {
      "id": "db-s7-q043",
      "prompt": "In Lab 1, which table permissions should cashier_role have on payment?",
      "options": [
        {
          "id": "a",
          "text": "SELECT only"
        },
        {
          "id": "b",
          "text": "INSERT and UPDATE only"
        },
        {
          "id": "c",
          "text": "SELECT, UPDATE, and DELETE"
        },
        {
          "id": "d",
          "text": "SELECT and INSERT"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Lab 1 requires SELECT and INSERT on payment; UPDATE and DELETE are not part of this grant.",
      "source": "/references/database-session-7-slides.pdf#page=28",
      "topic": "RBAC lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 28,
          "slideNumber": 25,
          "slideTitle": "Lab 1: Implementing RBAC (Task)"
        }
      ]
    },
    {
      "id": "db-s7-q044",
      "prompt": "Which statement grants cashier_role read access to both film and staff in the lecture's solution?",
      "options": [
        {
          "id": "a",
          "text": "GRANT SELECT ON payment TO cashier_role;"
        },
        {
          "id": "b",
          "text": "GRANT SELECT ON film, staff TO cashier_role;"
        },
        {
          "id": "c",
          "text": "GRANT SELECT ON DATABASE dvdrental TO cashier_role;"
        },
        {
          "id": "d",
          "text": "GRANT ALL ON film, staff TO cashier_role;"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lab's solution grants SELECT on both named tables in one command.",
      "source": "/references/database-session-7-slides.pdf#page=29",
      "topic": "RBAC lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 29,
          "slideNumber": 26,
          "slideTitle": "Lab 1: Implementing RBAC (Solution)"
        }
      ]
    },
    {
      "id": "db-s7-q045",
      "prompt": "In the payment isolation lab, which table is the target of ENABLE ROW LEVEL SECURITY?",
      "options": [
        {
          "id": "a",
          "text": "staff"
        },
        {
          "id": "b",
          "text": "rental"
        },
        {
          "id": "c",
          "text": "payment"
        },
        {
          "id": "d",
          "text": "film"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Lab 2 enables RLS on the payment table to restrict each cashier's payment visibility.",
      "source": "/references/database-session-7-slides.pdf#page=30",
      "topic": "RLS lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 30,
          "slideNumber": 27,
          "slideTitle": "Lab 2: Implementing RLS (Task)"
        }
      ]
    },
    {
      "id": "db-s7-q046",
      "prompt": "Which RLS command scope is used for isolate_cashier_payments in the solution?",
      "options": [
        {
          "id": "a",
          "text": "FOR SELECT TO cashier_role"
        },
        {
          "id": "b",
          "text": "FOR ALL TO PUBLIC"
        },
        {
          "id": "c",
          "text": "FOR UPDATE TO store_manager"
        },
        {
          "id": "d",
          "text": "FOR INSERT TO postgres"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The solution creates a SELECT policy that applies to cashier_role specifically.",
      "source": "/references/database-session-7-slides.pdf#page=31",
      "topic": "RLS lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 31,
          "slideNumber": 28,
          "slideTitle": "Lab 2: Implementing RLS (Solution)"
        }
      ]
    },
    {
      "id": "db-s7-q047",
      "prompt": "According to the Lab 2 solution, which output pair corresponds to SELECT COUNT(*) FROM payment under SET ROLE mike and SET ROLE jon?",
      "options": [
        {
          "id": "a",
          "text": "Mike: 7304; Jon: 7292"
        },
        {
          "id": "b",
          "text": "Mike: 8000; Jon: 8000"
        },
        {
          "id": "c",
          "text": "Mike: 0; Jon: 0"
        },
        {
          "id": "d",
          "text": "Mike: 7292; Jon: 7304"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide reports 7292 visible payments for Mike and 7304 for Jon after switching roles.",
      "source": "/references/database-session-7-slides.pdf#page=31",
      "topic": "RLS lab",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 31,
          "slideNumber": 28,
          "slideTitle": "Lab 2: Implementing RLS (Solution)"
        }
      ]
    },
    {
      "id": "db-s7-q048",
      "prompt": "Which set best represents the three database-security pillars emphasized at the end of Session 7?",
      "options": [
        {
          "id": "a",
          "text": "Indexing, sharding, and replication"
        },
        {
          "id": "b",
          "text": "Prevent SQLi, enforce least privilege, and isolate rows with RLS"
        },
        {
          "id": "c",
          "text": "Autocommit, write-ahead logging, and vacuum"
        },
        {
          "id": "d",
          "text": "Partitioning, hashing, and sorting"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The final takeaways bring together SQLi prevention, RBAC/least privilege, and RLS.",
      "source": "/references/database-session-7-slides.pdf#page=32",
      "topic": "Security summary",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 32,
          "slideNumber": 29,
          "slideTitle": "Key Takeaways"
        }
      ]
    },
    {
      "id": "db-s7-q049",
      "prompt": "A student deploys an AI model backed by PostgreSQL. Which implementation choice best applies the session's project guidance?",
      "options": [
        {
          "id": "a",
          "text": "Connect with postgres to simplify administration"
        },
        {
          "id": "b",
          "text": "Keep all features in a publicly writable table"
        },
        {
          "id": "c",
          "text": "Use a restricted application role and parameterized database access"
        },
        {
          "id": "d",
          "text": "Disable all user roles and manage security in CSS"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The project integration slide promotes applying database security practices in a real AI application rather than relying on a superuser connection.",
      "source": "/references/database-session-7-slides.pdf#page=33",
      "topic": "Project integration",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB7.pdf",
          "pdfPage": 33,
          "slideNumber": 30,
          "slideTitle": "Homework & Final Project Integration"
        }
      ]
    }
  ]
};
