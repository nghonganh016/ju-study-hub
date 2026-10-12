import type { Chapter } from "@/types/quiz";

// 58 reviewed questions focused on lecture theory, SQL, and important notes.
// Retained question IDs and source links preserve continuity with the supplied file.
export const session1: Chapter = {
  "id": "session-1",
  "title": "Session 1: Advanced internals and programmability",
  "description": "58 câu hỏi tập trung vào lý thuyết, SQL và các note quan trọng trong slide: PostgreSQL, ARRAY, UUID, JSONB, views, materialized views, functions, procedures và triggers.",
  "revision": 2,
  "questions": [
    {
      "id": "db-s1-001",
      "prompt": "A plain INSERT supplies 'ABCDEFGHIJK' for a VARCHAR(10) column. What happens under PostgreSQL's strict type checking?",
      "options": [
        {
          "id": "a",
          "text": "A successful insert after the last character is removed."
        },
        {
          "id": "b",
          "text": "A successful insert after the column expands to VARCHAR(11)."
        },
        {
          "id": "c",
          "text": "An error is raised because the value does not match the column limit."
        },
        {
          "id": "d",
          "text": "A NULL value in that column with the rest of the row inserted."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Strict type checking: if data does not match the schema, PostgreSQL raises an ERROR. This follows the lecture's \"Fail fast, fail early\" approach. The example assumes a plain INSERT of an overlength non-space value, without an explicit truncating cast. The MySQL comparison refers to historically permissive configurations, not every SQL mode.",
      "source": "/references/database-session-1-slides.pdf#page=6",
      "topic": "Integrity",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "PostgreSQL vs. MySQL: Data Integrity"
        }
      ]
    },
    {
      "id": "db-s1-003",
      "prompt": "What does \"Object-Relational\" mean in PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "A relational engine that accepts only its built-in scalar data types."
        },
        {
          "id": "b",
          "text": "Users can define their own Data Types, Functions, and Index Types."
        },
        {
          "id": "c",
          "text": "A relational engine that creates a programming class for every inserted row."
        },
        {
          "id": "d",
          "text": "Relational tables replaced by objects that cannot be joined using SQL."
        }
      ],
      "correctOptionId": "b",
      "explanation": "PostgreSQL is Object-Relational: users can define their own Data Types, Functions, and Index Types. The database is an extensible platform, not just a storage box; relational tables and SQL remain supported.",
      "source": "/references/database-session-1-slides.pdf#page=7",
      "topic": "Extensibility",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Compliance and Extensibility"
        }
      ]
    },
    {
      "id": "db-s1-005",
      "prompt": "Which set contains examples of the rich PostgreSQL data types highlighted in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "TEXT, SMALLINT and TIMESTAMP."
        },
        {
          "id": "b",
          "text": "VARCHAR, INTEGER and DATE."
        },
        {
          "id": "c",
          "text": "BOOLEAN, NUMERIC and CHAR."
        },
        {
          "id": "d",
          "text": "JSONB, ARRAY and Range."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The comparison lists rich data types: JSONB, Array, Range, and Geometric. These extend the basic scalar types shown in the MySQL column.",
      "source": "/references/database-session-1-slides.pdf#page=8",
      "topic": "Advanced types",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "MySQL vs. PostgreSQL: A Direct Comparison"
        }
      ]
    },
    {
      "id": "db-s1-006",
      "prompt": "According to the lecture, why can MySQL's own SQL dialect make migrations harder?",
      "options": [
        {
          "id": "a",
          "text": "Review stored-object names only; SQL body syntax needs no changes."
        },
        {
          "id": "b",
          "text": "Review data values only; advanced type definitions transfer unchanged."
        },
        {
          "id": "c",
          "text": "SQL dialect differences require a review of syntax and database objects."
        },
        {
          "id": "d",
          "text": "Review connection settings only; both products use the same SQL dialect."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The SQL Standards slide states that MySQL follows its own dialect, making migrations harder. Shared support for SQL does not make advanced types or stored-object syntax identical.",
      "source": "/references/database-session-1-slides.pdf#page=6",
      "topic": "Migration",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "PostgreSQL vs. MySQL: Data Integrity"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Compliance and Extensibility"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "MySQL vs. PostgreSQL: A Direct Comparison"
        }
      ]
    },
    {
      "id": "db-s1-007",
      "prompt": "Which PostgreSQL mechanism is optimized for concurrent Read/Write?",
      "options": [
        {
          "id": "a",
          "text": "UUID generation."
        },
        {
          "id": "b",
          "text": "Dollar quoting."
        },
        {
          "id": "c",
          "text": "GIN."
        },
        {
          "id": "d",
          "text": "MVCC."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The comparison identifies MVCC as PostgreSQL's mechanism optimized for concurrent Read/Write. MVCC means Multi-Version Concurrency Control.",
      "source": "/references/database-session-1-slides.pdf#page=8",
      "topic": "Concurrency overview",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "MySQL vs. PostgreSQL: A Direct Comparison"
        }
      ]
    },
    {
      "id": "db-s1-015",
      "prompt": "In the dvdrental database, if we want to store multiple phone numbers for a staff member without creating a new table, which data type should we use?",
      "options": [
        {
          "id": "a",
          "text": "JSONB containing one scalar string."
        },
        {
          "id": "b",
          "text": "TIMESTAMP[]."
        },
        {
          "id": "c",
          "text": "UUID."
        },
        {
          "id": "d",
          "text": "TEXT[]."
        }
      ],
      "correctOptionId": "d",
      "explanation": "ARRAY is suitable for simple collections, such as small lists of tags or phone numbers. TEXT[] holds a collection of phone-number strings. Advantage: simpler queries without extra JOINs; disadvantage: harder to enforce referential integrity on elements.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY modeling",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "Final Review Quiz"
        }
      ]
    },
    {
      "id": "db-s1-016",
      "prompt": "Tags now have owners, descriptions and individual foreign-key relationships. Which design best addresses this change?",
      "options": [
        {
          "id": "a",
          "text": "A tag table and a film-tag association table."
        },
        {
          "id": "b",
          "text": "A TEXT[] containing IDs, with an ordinary foreign key on the entire array."
        },
        {
          "id": "c",
          "text": "A JSONB list of IDs that automatically validates each against the tag table."
        },
        {
          "id": "d",
          "text": "A VARCHAR list of IDs, relying on the column type to enforce references."
        }
      ],
      "correctOptionId": "a",
      "explanation": "A relational model gives each tag its own row and enforceable relationships. The lecture warns that referential integrity on array elements is harder.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY modeling",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-017",
      "prompt": "Which statement adds the tag column used in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "ALTER TABLE film ADD COLUMN tags TEXT ARRAY OF film;"
        },
        {
          "id": "b",
          "text": "ALTER TABLE film ADD COLUMN tags ARRAY(TEXT);"
        },
        {
          "id": "c",
          "text": "ALTER TABLE film ADD COLUMN tags JSONB[] OF TEXT;"
        },
        {
          "id": "d",
          "text": "ALTER TABLE film ADD COLUMN tags TEXT[];"
        }
      ],
      "correctOptionId": "d",
      "explanation": "TEXT[] declares an array whose elements have type text. The other proposed declarations are not the shown PostgreSQL syntax.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY syntax",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-018",
      "prompt": "Which assignment stores two separate text elements in a TEXT[] column?",
      "options": [
        {
          "id": "a",
          "text": "SET tags = ARRAY['Classic']"
        },
        {
          "id": "b",
          "text": "SET tags = ARRAY['Action']"
        },
        {
          "id": "c",
          "text": "SET tags = ARRAY['Action', 'Classic']"
        },
        {
          "id": "d",
          "text": "SET tags = ARRAY['Action,Classic']"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The first expression has two elements. A comma inside a single quoted string belongs to one element.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY syntax",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-019",
      "prompt": "Which predicate finds films whose tags array contains the exact element 'Action'?",
      "options": [
        {
          "id": "a",
          "text": "tags[1] = 'Action'"
        },
        {
          "id": "b",
          "text": "'Action' = ANY(tags)"
        },
        {
          "id": "c",
          "text": "'Action' = ALL(tags)"
        },
        {
          "id": "d",
          "text": "tags = ARRAY['Action']"
        }
      ],
      "correctOptionId": "b",
      "explanation": "ANY tests each element and succeeds on a match. ALL requires every element to match; whole-array equality and checking the first element are more restrictive.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY query",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-021",
      "prompt": "What is a disadvantage of using ARRAY for simple collections?",
      "options": [
        {
          "id": "a",
          "text": "Every array element is automatically a primary key."
        },
        {
          "id": "b",
          "text": "Every membership test requires a relational JOIN."
        },
        {
          "id": "c",
          "text": "Harder to enforce referential integrity on elements."
        },
        {
          "id": "d",
          "text": "Each array requires its own PostgreSQL server."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The ARRAY slide contrasts simpler queries without extra JOINs with the disadvantage: harder to enforce referential integrity on elements. Related entities needing their own foreign-key relationships are often better modeled with separate tables.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY modeling",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-022",
      "prompt": "Rows 1, 2 and 3 have tags ARRAY['Action','Classic'], ARRAY['Classic'] and ARRAY['Action'], respectively. Which IDs satisfy WHERE 'Action' = ANY(tags)?",
      "options": [
        {
          "id": "a",
          "text": "Only 1."
        },
        {
          "id": "b",
          "text": "Only 3."
        },
        {
          "id": "c",
          "text": "1 and 3."
        },
        {
          "id": "d",
          "text": "1, 2 and 3."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Both rows 1 and 3 contain the Action element. ANY does not require the array to contain only Action.",
      "source": "/references/database-session-1-slides.pdf#page=14",
      "topic": "ARRAY query",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "The ARRAY Data Type"
        }
      ]
    },
    {
      "id": "db-s1-023",
      "prompt": "How many bits are contained in a UUID?",
      "options": [
        {
          "id": "a",
          "text": "64 bits (8 bytes)."
        },
        {
          "id": "b",
          "text": "256 bits (32 bytes)."
        },
        {
          "id": "c",
          "text": "128 bits (16 bytes)."
        },
        {
          "id": "d",
          "text": "32 bits (4 bytes)."
        }
      ],
      "correctOptionId": "c",
      "explanation": "UUID means Universally Unique Identifier. The lecture describes globally unique 128-bit identifiers; 128 bits equals 16 bytes, excluding row and index overhead.",
      "source": "/references/database-session-1-slides.pdf#page=16",
      "topic": "UUID storage",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "UUID: Secure Distributed Identifiers"
        }
      ]
    },
    {
      "id": "db-s1-024",
      "prompt": "Why are UUIDs useful for Distributed Systems?",
      "options": [
        {
          "id": "a",
          "text": "They make a database primary-key constraint optional during later imports."
        },
        {
          "id": "b",
          "text": "They encode the complete creation order of every offline order by default."
        },
        {
          "id": "c",
          "text": "They coordinate the next sequential integer across the offline clients."
        },
        {
          "id": "d",
          "text": "You can generate a UUID on a mobile app without asking the server for the next ID."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Distributed Systems: a mobile app can generate a UUID without asking the server for the next ID. Independent clients do not have to coordinate a sequential counter. A primary-key constraint still enforces stored uniqueness.",
      "source": "/references/database-session-1-slides.pdf#page=15",
      "topic": "UUID generation",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "UUID (Universally Unique Identifier)"
        }
      ]
    },
    {
      "id": "db-s1-025",
      "prompt": "How do random UUIDs help reduce \"ID Enumeration\" compared with predictable Integer IDs?",
      "options": [
        {
          "id": "a",
          "text": "The UUID encrypts the order details stored in the database."
        },
        {
          "id": "b",
          "text": "The API can remove all authorization checks for order lookups."
        },
        {
          "id": "c",
          "text": "They make the next order ID harder to guess; access checks are still required."
        },
        {
          "id": "d",
          "text": "Knowing an order UUID grants permission to read that order."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Security: predictable Integer IDs (1, 2, 3...) allow ID Enumeration. Random UUIDs make sequential guessing harder, but identifier unpredictability does not replace authorization or ownership checks.",
      "source": "/references/database-session-1-slides.pdf#page=15",
      "topic": "UUID and security",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "UUID (Universally Unique Identifier)"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "UUID: Secure Distributed Identifiers"
        }
      ]
    },
    {
      "id": "db-s1-026",
      "prompt": "How do UUIDs help when merging two databases?",
      "options": [
        {
          "id": "a",
          "text": "Independent UUID generation greatly reduces the risk of conflicting IDs."
        },
        {
          "id": "b",
          "text": "A UUID primary key treats matching IDs as distinct when they come from different branches."
        },
        {
          "id": "c",
          "text": "The UUID type resolves any duplicate value by renaming one row during import."
        },
        {
          "id": "d",
          "text": "The UUID type stores the branch name and enforces uniqueness only within that branch."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Merging Data is one of the lecture's reasons for using UUIDs. Random UUID generation greatly reduces ID collision risk across independent databases. The slide's \"No ID conflicts\" wording is a practical motivation, not an absolute guarantee or automatic conflict-resolution rule.",
      "source": "/references/database-session-1-slides.pdf#page=15",
      "topic": "UUID merge",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "UUID (Universally Unique Identifier)"
        }
      ]
    },
    {
      "id": "db-s1-027",
      "prompt": "A table has order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(). An INSERT supplies only customer_id. What happens to order_id?",
      "options": [
        {
          "id": "a",
          "text": "The default applies only when the client sends an explicit NULL."
        },
        {
          "id": "b",
          "text": "The default runs when RETURNING reads the row, after insertion has finished."
        },
        {
          "id": "c",
          "text": "The primary-key constraint generates the UUID without using the default."
        },
        {
          "id": "d",
          "text": "The default generates a UUID for the inserted row."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Omitting a column lets its declared default run during insertion. PRIMARY KEY also disallows a stored NULL. Technical note: PostgreSQL 16 includes gen_random_uuid() in core; the uuid-ossp extension is not required for this function.",
      "source": "/references/database-session-1-slides.pdf#page=16",
      "topic": "UUID defaults",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "UUID: Secure Distributed Identifiers"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: UUID functions",
          "url": "https://www.postgresql.org/docs/16/functions-uuid.html",
          "section": "9.14"
        }
      ]
    },
    {
      "id": "db-s1-028",
      "prompt": "The same order_id definition is used, but the INSERT explicitly supplies NULL for order_id. What happens?",
      "options": [
        {
          "id": "a",
          "text": "NULL is accepted because UUID values are optional by definition."
        },
        {
          "id": "b",
          "text": "The insert fails the primary key's NOT NULL requirement."
        },
        {
          "id": "c",
          "text": "NULL is converted into a random integer primary key."
        },
        {
          "id": "d",
          "text": "The default replaces the explicit NULL automatically."
        }
      ],
      "correctOptionId": "b",
      "explanation": "A default applies to an omitted column or the DEFAULT keyword, not an explicitly supplied NULL. The primary key rejects NULL.",
      "source": "/references/database-session-1-slides.pdf#page=16",
      "topic": "UUID defaults",
      "difficulty": "hard",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "UUID: Secure Distributed Identifiers"
        }
      ]
    },
    {
      "id": "db-s1-029",
      "prompt": "Which clause lets the client obtain the generated order_id from the same INSERT statement?",
      "options": [
        {
          "id": "a",
          "text": "GROUP BY order_id."
        },
        {
          "id": "b",
          "text": "RETURNING order_id."
        },
        {
          "id": "c",
          "text": "ORDER BY order_id."
        },
        {
          "id": "d",
          "text": "REFERENCES order_id."
        }
      ],
      "correctOptionId": "b",
      "explanation": "RETURNING returns values from the inserted row, including defaults, without an extra lookup.",
      "source": "/references/database-session-1-slides.pdf#page=16",
      "topic": "UUID syntax",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "UUID: Secure Distributed Identifiers"
        }
      ]
    },
    {
      "id": "db-s1-031",
      "prompt": "Which data type is used for Storing Extra Metadata, such as resolution, fps, and hdr, in the film table?",
      "options": [
        {
          "id": "a",
          "text": "TEXT[] of attribute values."
        },
        {
          "id": "b",
          "text": "A UUID[] of attribute IDs."
        },
        {
          "id": "c",
          "text": "A single TEXT value with client-side parsing."
        },
        {
          "id": "d",
          "text": "JSONB."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture uses JSONB (Binary JSON) for Storing Extra Metadata containing technical specs such as resolution, fps, and hdr. These attributes can coexist with the film table's relational columns.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB modeling",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        }
      ]
    },
    {
      "id": "db-s1-032",
      "prompt": "Which statement matches the lecture's description of JSONB storage and processing?",
      "options": [
        {
          "id": "a",
          "text": "Normalizing into separate relational rows eliminates JSON parsing while preserving JSONB storage."
        },
        {
          "id": "b",
          "text": "Delaying JSON validation until SELECT reduces input cost but makes every read validate the document."
        },
        {
          "id": "c",
          "text": "It uses a decomposed binary format: slightly slower to write but much faster to process."
        },
        {
          "id": "d",
          "text": "Preserving the original JSON text saves input parsing but reparses it during each operation."
        }
      ],
      "correctOptionId": "c",
      "explanation": "JSONB stores JSON in a decomposed binary format. The lecture describes it as slightly slower to write but much faster to process, and highlights GIN Indexing. This is a general storage/processing trade-off, not a guarantee for every workload.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB storage",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: JSON types",
          "url": "https://www.postgresql.org/docs/16/datatype-json.html",
          "section": "8.14"
        }
      ]
    },
    {
      "id": "db-s1-033",
      "prompt": "stats is JSONB. Which predicate matches the slide's query for resolution 4K?",
      "options": [
        {
          "id": "a",
          "text": "stats ->> 'fps' = '4K'"
        },
        {
          "id": "b",
          "text": "stats ->> 'resolution' = '4K'"
        },
        {
          "id": "c",
          "text": "stats ->> 'hdr' = '4K'"
        },
        {
          "id": "d",
          "text": "stats ->> 'resolution' = 'HD'"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The ->> operator extracts the selected field as text; the correct key and comparison value are resolution and 4K.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB operators",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        }
      ]
    },
    {
      "id": "db-s1-034",
      "prompt": "For stats = '{\"resolution\":\"4K\",\"fps\":60}'::jsonb, what is the type returned by stats ->> 'fps'?",
      "options": [
        {
          "id": "a",
          "text": "TEXT."
        },
        {
          "id": "b",
          "text": "BOOLEAN."
        },
        {
          "id": "c",
          "text": "JSONB."
        },
        {
          "id": "d",
          "text": "INTEGER."
        }
      ],
      "correctOptionId": "a",
      "explanation": "->> returns text even when the stored JSON value is numeric. A numeric SQL comparison needs an appropriate cast.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB operators",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: JSON functions and operators",
          "url": "https://www.postgresql.org/docs/16/functions-json.html",
          "section": "9.16"
        }
      ]
    },
    {
      "id": "db-s1-035",
      "prompt": "fps is always a valid integer in this exercise. Which predicate performs a numeric test for fps greater than 30?",
      "options": [
        {
          "id": "a",
          "text": "stats ->> 'resolution' = '60'"
        },
        {
          "id": "b",
          "text": "(stats ->> 'fps')::integer > 30"
        },
        {
          "id": "c",
          "text": "(stats ->> 'fps')::integer = 30"
        },
        {
          "id": "d",
          "text": "stats ->> 'fps' > '30'"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Extracting text and casting to integer gives numeric comparison. A text comparison is lexicographic and can misorder values such as 100 and 30.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB query",
      "difficulty": "hard",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: JSON functions and operators",
          "url": "https://www.postgresql.org/docs/16/functions-json.html",
          "section": "9.16"
        }
      ]
    },
    {
      "id": "db-s1-036",
      "prompt": "Three rows have stats '{\"resolution\":\"4K\"}', '{\"resolution\":\"HD\"}' and '{}' respectively. Which rows pass WHERE stats ->> 'resolution' = '4K'?",
      "options": [
        {
          "id": "a",
          "text": "Only the first row."
        },
        {
          "id": "b",
          "text": "The first and second rows."
        },
        {
          "id": "c",
          "text": "The first and third rows."
        },
        {
          "id": "d",
          "text": "All three rows."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The first text value equals 4K. The missing field in the third row produces SQL NULL, which does not pass this WHERE condition.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB query",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: JSON functions and operators",
          "url": "https://www.postgresql.org/docs/16/functions-json.html",
          "section": "9.16"
        }
      ]
    },
    {
      "id": "db-s1-037",
      "prompt": "Which index method is highlighted in the lecture for indexing JSONB content?",
      "options": [
        {
          "id": "a",
          "text": "B-Tree only."
        },
        {
          "id": "b",
          "text": "Hash only."
        },
        {
          "id": "c",
          "text": "GIN."
        },
        {
          "id": "d",
          "text": "A refresh schedule."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide highlights GIN support for JSONB. Whether an index helps depends on the operator, expression and workload.",
      "source": "/references/database-session-1-slides.pdf#page=17",
      "topic": "JSONB indexing",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "JSONB (Binary JSON)"
        }
      ]
    },
    {
      "id": "db-s1-040",
      "prompt": "What does a Regular View (Virtual) store?",
      "options": [
        {
          "id": "a",
          "text": "Only the query definition."
        },
        {
          "id": "b",
          "text": "A result snapshot that is replaced only when a manual refresh runs."
        },
        {
          "id": "c",
          "text": "A copy of source rows synchronized by automatically created write triggers."
        },
        {
          "id": "d",
          "text": "A cached result set invalidated whenever a referenced base table changes."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Storage: a Regular View stores only the query definition. Execution: the underlying query is run when the view is referenced. A Materialized View stores the actual result set on disk.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "Views",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 20,
          "slideNumber": 16,
          "slideTitle": "Deep Dive: View vs. Materialized View"
        }
      ]
    },
    {
      "id": "db-s1-041",
      "prompt": "You have a complex query for a monthly report that takes 30 seconds to run. You do not need real-time data. Which PostgreSQL feature would you use?",
      "options": [
        {
          "id": "a",
          "text": "A materialized view with an explicit refresh policy."
        },
        {
          "id": "b",
          "text": "A UUID column replacing the report's aggregate."
        },
        {
          "id": "c",
          "text": "A BEFORE trigger returning NULL for all new rentals."
        },
        {
          "id": "d",
          "text": "A regular view with the same joins and no other change."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Materialized Views cache results to disk. They are ideal for complex reports that do not need real-time data. Stored results can become stale until REFRESH is called; faster reads come with storage and refresh work.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "Materialized views",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 20,
          "slideNumber": 16,
          "slideTitle": "Deep Dive: View vs. Materialized View"
        }
      ]
    },
    {
      "id": "db-s1-042",
      "prompt": "Which command recomputes the stored rows of film_stats_cached?",
      "options": [
        {
          "id": "a",
          "text": "REFRESH MATERIALIZED VIEW film_stats_cached;"
        },
        {
          "id": "b",
          "text": "SELECT * FROM film_stats_cached;"
        },
        {
          "id": "c",
          "text": "CREATE VIEW film_stats_cached AS SELECT * FROM film_stats;"
        },
        {
          "id": "d",
          "text": "CALL film_stats_cached();"
        }
      ],
      "correctOptionId": "a",
      "explanation": "REFRESH MATERIALIZED VIEW re-executes the defining query and replaces the stored result. SELECT only reads the existing result.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "Materialized views",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        }
      ]
    },
    {
      "id": "db-s1-043",
      "prompt": "A regular view and a materialized view each report 10 rentals. One more rental is committed, and no refresh occurs. In a new ordinary read, what counts should be expected?",
      "options": [
        {
          "id": "a",
          "text": "Regular view: 11; materialized view: 11."
        },
        {
          "id": "b",
          "text": "Regular view: 10; materialized view: 11."
        },
        {
          "id": "c",
          "text": "Regular view: 11; materialized view: 10."
        },
        {
          "id": "d",
          "text": "Regular view: 10; materialized view: 10."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The regular view computes against the data visible to its query; the materialized view retains its last stored result until refreshed.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "Materialized views",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 20,
          "slideNumber": 16,
          "slideTitle": "Deep Dive: View vs. Materialized View"
        }
      ]
    },
    {
      "id": "db-s1-044",
      "prompt": "According to the lecture, what is the main trade-off when using Materialized Views?",
      "options": [
        {
          "id": "a",
          "text": "Storage Size vs. Data Compression."
        },
        {
          "id": "b",
          "text": "Performance vs. Data Freshness."
        },
        {
          "id": "c",
          "text": "Query Modularity vs. Referential Integrity."
        },
        {
          "id": "d",
          "text": "SQL Standards Compliance vs. Extensibility."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide names the trade-off: Performance vs. Data Freshness. A Materialized View reads pre-computed data, but its result can become stale until REFRESH. It uses disk space but saves repeated CPU/time expenditure.",
      "source": "/references/database-session-1-slides.pdf#page=20",
      "topic": "Materialized views",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 20,
          "slideNumber": 16,
          "slideTitle": "Deep Dive: View vs. Materialized View"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 21,
          "slideNumber": 17,
          "slideTitle": "When to Refresh Materialized Views?"
        }
      ]
    },
    {
      "id": "db-s1-045",
      "prompt": "A dashboard showing \"Top Renting Customers\" is updated once an hour. Which refresh approach matches this use case?",
      "options": [
        {
          "id": "a",
          "text": "Refresh synchronously after each row-level write."
        },
        {
          "id": "b",
          "text": "Use a regular view configured to store one-hour snapshots."
        },
        {
          "id": "c",
          "text": "Scheduled (Cron Jobs)."
        },
        {
          "id": "d",
          "text": "Create the materialized view once and rely on SELECT to update it."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Scheduled (Cron Jobs): refresh every hour, every night, or every 15 minutes. The lecture's example is a \"Top Renting Customers\" dashboard updated once an hour. The schedule must actually run successfully; reads alone do not refresh the data.",
      "source": "/references/database-session-1-slides.pdf#page=21",
      "topic": "Refresh scheduling",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 21,
          "slideNumber": 17,
          "slideTitle": "When to Refresh Materialized Views?"
        }
      ]
    },
    {
      "id": "db-s1-047",
      "prompt": "What is the lecture's caution about calling REFRESH inside a trigger whenever the base table is modified?",
      "options": [
        {
          "id": "a",
          "text": "It automatically updates only the changed group, without running the defining query."
        },
        {
          "id": "b",
          "text": "It adds computation only to dashboard reads, leaving inserts unaffected."
        },
        {
          "id": "c",
          "text": "This can slow down every INSERT/UPDATE and defeat the performance purpose."
        },
        {
          "id": "d",
          "text": "It queues one asynchronous refresh per hour regardless of how many rows trigger it."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Trigger-Based (Advanced) refresh can slow down every INSERT/UPDATE and defeat the performance purpose. In particular, a FOR EACH ROW trigger can repeat the full refresh many times during a multi-row write.",
      "source": "/references/database-session-1-slides.pdf#page=21",
      "topic": "Refresh scheduling",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 21,
          "slideNumber": 17,
          "slideTitle": "When to Refresh Materialized Views?"
        }
      ]
    },
    {
      "id": "db-s1-048",
      "prompt": "Which statement creates a stored snapshot of the existing regular view film_stats?",
      "options": [
        {
          "id": "a",
          "text": "CREATE FUNCTION film_stats_cached() RETURNS trigger AS $$ BEGIN RETURN NULL; END; $$ LANGUAGE plpgsql;"
        },
        {
          "id": "b",
          "text": "SELECT * FROM film_stats;"
        },
        {
          "id": "c",
          "text": "CREATE MATERIALIZED VIEW film_stats_cached AS SELECT * FROM film_stats;"
        },
        {
          "id": "d",
          "text": "CREATE VIEW film_stats_cached AS SELECT * FROM film_stats;"
        }
      ],
      "correctOptionId": "c",
      "explanation": "CREATE MATERIALIZED VIEW stores the query result. CREATE VIEW stores only a definition; reading or declaring a trigger function creates no snapshot.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "View syntax",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        }
      ]
    },
    {
      "id": "db-s1-049",
      "prompt": "A manager requests the latest Monthly financial summaries only when needed. Which refresh approach matches this use case?",
      "options": [
        {
          "id": "a",
          "text": "Use a regular view and manually refresh its stored result before each report."
        },
        {
          "id": "b",
          "text": "On-Demand (Manual)."
        },
        {
          "id": "c",
          "text": "Create the materialized view once and rely on base-table updates to maintain it."
        },
        {
          "id": "d",
          "text": "Query the materialized view and rely on that SELECT to recompute its rows."
        }
      ],
      "correctOptionId": "b",
      "explanation": "On-Demand (Manual): refresh when an admin or manager needs the latest report. The lecture gives Monthly financial summaries as the example. Querying the Materialized View alone does not recompute its stored rows.",
      "source": "/references/database-session-1-slides.pdf#page=21",
      "topic": "Refresh scheduling",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 21,
          "slideNumber": 17,
          "slideTitle": "When to Refresh Materialized Views?"
        }
      ]
    },
    {
      "id": "db-s1-050",
      "prompt": "An inventory report needs current data visible to each new query, with no interval of stale cached results. Which object is appropriate?",
      "options": [
        {
          "id": "a",
          "text": "A stored report table loaded at the start of the month."
        },
        {
          "id": "b",
          "text": "A materialized view refreshed only during deployment."
        },
        {
          "id": "c",
          "text": "A Regular View (Virtual)."
        },
        {
          "id": "d",
          "text": "A materialized view refreshed every night."
        }
      ],
      "correctOptionId": "c",
      "explanation": "A Regular View runs its defining query when referenced. A Materialized View (Physical) reads stored results that can be stale or outdated until REFRESH. \"Up-to-date\" still means data visible to the querying transaction, not commits outside its snapshot.",
      "source": "/references/database-session-1-slides.pdf#page=19",
      "topic": "Views",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 19,
          "slideNumber": 15,
          "slideTitle": "Views vs. Materialized Views"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 20,
          "slideNumber": 16,
          "slideTitle": "Deep Dive: View vs. Materialized View"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: CREATE VIEW",
          "url": "https://www.postgresql.org/docs/16/sql-createview.html",
          "section": "Description"
        }
      ]
    },
    {
      "id": "db-s1-052",
      "prompt": "What is the purpose of Dollar Quoting ($$) in a PostgreSQL function definition?",
      "options": [
        {
          "id": "a",
          "text": "To declare that every variable in the body has type NUMERIC."
        },
        {
          "id": "b",
          "text": "To open and commit a SQL transaction around every statement in the body."
        },
        {
          "id": "c",
          "text": "To specify that the function returns a set rather than a scalar."
        },
        {
          "id": "d",
          "text": "To delimit a string literal containing the body, including internal quotes and semicolons."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Dollar Quoting ($$) delimits the function-body string, including its internal quotes and semicolons. It provides the cleaner syntax highlighted in the lecture without changing return types or controlling transactions. Technical note: dollar quoting is a PostgreSQL extension, not part of the SQL standard.",
      "source": "/references/database-session-1-slides.pdf#page=22",
      "topic": "Function syntax",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 22,
          "slideNumber": 18,
          "slideTitle": "Functions: MySQL vs. PostgreSQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Lexical structure",
          "url": "https://www.postgresql.org/docs/16/sql-syntax-lexical.html",
          "section": "4.1.2.4"
        }
      ]
    },
    {
      "id": "db-s1-053",
      "prompt": "Which placement follows the PL/pgSQL block structure shown in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Place every local variable after END and before the LANGUAGE clause."
        },
        {
          "id": "b",
          "text": "DECLARE variables, then BEGIN executable statements, then END."
        },
        {
          "id": "c",
          "text": "Place every local variable in the function argument list instead of DECLARE."
        },
        {
          "id": "d",
          "text": "BEGIN executable statements, then DECLARE local variables, then END."
        }
      ],
      "correctOptionId": "b",
      "explanation": "An optional DECLARE section precedes BEGIN. The executable section ends with END; the return type is specified outside the block.",
      "source": "/references/database-session-1-slides.pdf#page=22",
      "topic": "Function syntax",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 22,
          "slideNumber": 18,
          "slideTitle": "Functions: MySQL vs. PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s1-054",
      "prompt": "In CREATE FUNCTION get_fee(id INT) RETURNS NUMERIC ... LANGUAGE plpgsql, which element declares the output type?",
      "options": [
        {
          "id": "a",
          "text": "The dollar-quote delimiter."
        },
        {
          "id": "b",
          "text": "RETURNS NUMERIC."
        },
        {
          "id": "c",
          "text": "id INT."
        },
        {
          "id": "d",
          "text": "LANGUAGE plpgsql."
        }
      ],
      "correctOptionId": "b",
      "explanation": "RETURNS specifies the function result type; the argument declaration specifies input, and LANGUAGE chooses the implementation language.",
      "source": "/references/database-session-1-slides.pdf#page=22",
      "topic": "Function syntax",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 22,
          "slideNumber": 18,
          "slideTitle": "Functions: MySQL vs. PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s1-055",
      "prompt": "A scalar PL/pgSQL function has RETURNS NUMERIC and a local variable fee NUMERIC. Which statement returns that value to its caller?",
      "options": [
        {
          "id": "a",
          "text": "RETURN fee;"
        },
        {
          "id": "b",
          "text": "RETURN NEW;"
        },
        {
          "id": "c",
          "text": "DECLARE fee;"
        },
        {
          "id": "d",
          "text": "CALL fee;"
        }
      ],
      "correctOptionId": "a",
      "explanation": "A scalar function returns a compatible expression with RETURN. NEW is a special trigger variable, not an ordinary scalar-function result.",
      "source": "/references/database-session-1-slides.pdf#page=22",
      "topic": "Scalar functions",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 22,
          "slideNumber": 18,
          "slideTitle": "Functions: MySQL vs. PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s1-056",
      "prompt": "get_fee(integer) is a scalar function. Which statement invokes it to obtain a value?",
      "options": [
        {
          "id": "a",
          "text": "EXECUTE get_fee(1);"
        },
        {
          "id": "b",
          "text": "SELECT * FROM get_fee;"
        },
        {
          "id": "c",
          "text": "CALL get_fee(1);"
        },
        {
          "id": "d",
          "text": "SELECT get_fee(1);"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Functions can be called in SQL expressions using SELECT. CALL is the invocation form for procedures.",
      "source": "/references/database-session-1-slides.pdf#page=22",
      "topic": "Function invocation",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 22,
          "slideNumber": 18,
          "slideTitle": "Functions: MySQL vs. PostgreSQL"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 23,
          "slideNumber": 19,
          "slideTitle": "Why is Postgres More Powerful for Developers?"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: CALL",
          "url": "https://www.postgresql.org/docs/16/sql-call.html",
          "section": "Notes"
        }
      ]
    },
    {
      "id": "db-s1-057",
      "prompt": "A function declared RETURNS TABLE(customer_id INT, total NUMERIC) is used in another query. Which form treats its result as a relation?",
      "options": [
        {
          "id": "a",
          "text": "CALL customer_totals();"
        },
        {
          "id": "b",
          "text": "SELECT * FROM customer_totals();"
        },
        {
          "id": "c",
          "text": "CREATE TABLE customer_totals();"
        },
        {
          "id": "d",
          "text": "REFRESH MATERIALIZED VIEW customer_totals();"
        }
      ],
      "correctOptionId": "b",
      "explanation": "A table-valued function can appear in FROM and provide rows and columns that compose with the surrounding SQL.",
      "source": "/references/database-session-1-slides.pdf#page=23",
      "topic": "Table-valued functions",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 23,
          "slideNumber": 19,
          "slideTitle": "Why is Postgres More Powerful for Developers?"
        }
      ]
    },
    {
      "id": "db-s1-061",
      "prompt": "Which set of implementation languages is listed for PostgreSQL programmability in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "SQL only, with no additional implementation languages."
        },
        {
          "id": "b",
          "text": "PL/pgSQL and SQL only, with no Python, Perl, or C support."
        },
        {
          "id": "c",
          "text": "Python, Java, JavaScript, and Ruby instead of PL/pgSQL."
        },
        {
          "id": "d",
          "text": "PL/pgSQL, Python, Perl, and C."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The programmability comparison lists PL/pgSQL, Python, Perl, and C, compared with MySQL's limited SQL-based language. Availability of a particular implementation language depends on installed components and configuration.",
      "source": "/references/database-session-1-slides.pdf#page=29",
      "topic": "Procedural languages",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "Comparison: Postgres vs. MySQL Programmability"
        }
      ]
    },
    {
      "id": "db-s1-062",
      "prompt": "transfer_funds is a PostgreSQL procedure taking two account IDs and an amount. Which invocation is appropriate?",
      "options": [
        {
          "id": "a",
          "text": "EXECUTE FUNCTION transfer_funds(1, 2, 100);"
        },
        {
          "id": "b",
          "text": "CALL transfer_funds(1, 2, 100);"
        },
        {
          "id": "c",
          "text": "SELECT transfer_funds(1, 2, 100);"
        },
        {
          "id": "d",
          "text": "REFRESH transfer_funds(1, 2, 100);"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture uses CALL for procedures. SELECT evaluates functions, and EXECUTE FUNCTION is part of trigger binding syntax.",
      "source": "/references/database-session-1-slides.pdf#page=24",
      "topic": "Procedure invocation",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 24,
          "slideNumber": 20,
          "slideTitle": "Procedures: Transaction Control"
        }
      ]
    },
    {
      "id": "db-s1-063",
      "prompt": "Which PostgreSQL stored object supports internal COMMIT/ROLLBACK?",
      "options": [
        {
          "id": "a",
          "text": "A row-level trigger function."
        },
        {
          "id": "b",
          "text": "A procedure."
        },
        {
          "id": "c",
          "text": "A scalar function called by SELECT."
        },
        {
          "id": "d",
          "text": "A regular view."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Procedures support internal COMMIT/ROLLBACK; ordinary functions do not. Invoke a procedure with CALL. Technical note: transaction control requires an eligible invocation context; a CALL inside an explicit transaction block cannot execute internal COMMIT/ROLLBACK. COMMIT ends a transaction and is not a savepoint, despite the example's \"Save point\" comment.",
      "source": "/references/database-session-1-slides.pdf#page=24",
      "topic": "Procedure transactions",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 24,
          "slideNumber": 20,
          "slideTitle": "Procedures: Transaction Control"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: PL/pgSQL transaction management",
          "url": "https://www.postgresql.org/docs/16/plpgsql-transactions.html",
          "section": "43.8"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: CALL",
          "url": "https://www.postgresql.org/docs/16/sql-call.html",
          "section": "Notes"
        }
      ]
    },
    {
      "id": "db-s1-068",
      "prompt": "What is the main structural difference between creating a Trigger in MySQL versus PostgreSQL?",
      "options": [
        {
          "id": "a",
          "text": "Create a trigger with its entire PL/pgSQL body embedded in CREATE TRIGGER."
        },
        {
          "id": "b",
          "text": "Create a scalar function, then use CALL inside a table-bound trigger body."
        },
        {
          "id": "c",
          "text": "Create a procedure, then attach it using EXECUTE FUNCTION in CREATE TRIGGER."
        },
        {
          "id": "d",
          "text": "MySQL embeds the logic in the trigger; PostgreSQL defines a Trigger Function first, then the Trigger."
        }
      ],
      "correctOptionId": "d",
      "explanation": "MySQL is Tightly Coupled: logic is embedded inside the trigger. PostgreSQL is Decoupled/Modular: first define a standalone Trigger Function, then bind it to a table via a Trigger. This allows logic reuse.",
      "source": "/references/database-session-1-slides.pdf#page=25",
      "topic": "Trigger architecture",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "Triggers: Postgres vs. MySQL"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "Trigger Architecture: MySQL vs. PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s1-069",
      "prompt": "Which definition binds update_timestamp() to each updated customer row before it is stored?",
      "options": [
        {
          "id": "a",
          "text": "CREATE TRIGGER trg BEFORE UPDATE ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();"
        },
        {
          "id": "b",
          "text": "CREATE TRIGGER trg BEFORE UPDATE ON customer FOR EACH STATEMENT EXECUTE FUNCTION update_timestamp();"
        },
        {
          "id": "c",
          "text": "CREATE TRIGGER trg AFTER UPDATE ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();"
        },
        {
          "id": "d",
          "text": "CREATE TRIGGER trg BEFORE INSERT ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();"
        }
      ],
      "correctOptionId": "a",
      "explanation": "BEFORE UPDATE matches the event and allows the row to be modified; FOR EACH ROW supplies each updated row separately.",
      "source": "/references/database-session-1-slides.pdf#page=25",
      "topic": "Trigger syntax",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "Triggers: Postgres vs. MySQL"
        }
      ]
    },
    {
      "id": "db-s1-070",
      "prompt": "A BEFORE UPDATE row trigger runs NEW.last_update := NOW(); RETURN NEW;. Why does the updated timestamp persist?",
      "options": [
        {
          "id": "a",
          "text": "The trigger writes NEW back to the table only after the update has completed."
        },
        {
          "id": "b",
          "text": "The trigger returns the modified proposed row before the update is applied."
        },
        {
          "id": "c",
          "text": "The assignment to NEW changes the row even if the BEFORE trigger returns NULL."
        },
        {
          "id": "d",
          "text": "The assignment updates OLD, which PostgreSQL then stores as the new row."
        }
      ],
      "correctOptionId": "b",
      "explanation": "For a BEFORE row trigger, the returned NEW row is the row used by the update. No independent COMMIT is required.",
      "source": "/references/database-session-1-slides.pdf#page=25",
      "topic": "Trigger timing",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "Triggers: Postgres vs. MySQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-071",
      "prompt": "In an UPDATE row trigger, which variables hold the old data row and the new data row?",
      "options": [
        {
          "id": "a",
          "text": "OLD holds the old data row; NEW holds the new data row."
        },
        {
          "id": "b",
          "text": "OLD: values after the update; NEW: values before the update."
        },
        {
          "id": "c",
          "text": "OLD and NEW: both contain only the columns named in the SET clause."
        },
        {
          "id": "d",
          "text": "OLD and NEW: both are snapshots of the row before the update."
        }
      ],
      "correctOptionId": "a",
      "explanation": "NEW is a record variable holding the new data row for INSERT/UPDATE. OLD is a record variable holding the old data row for UPDATE/DELETE. An UPDATE row trigger has both records.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger variables",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        }
      ]
    },
    {
      "id": "db-s1-072",
      "prompt": "Which special trigger variable indicates the operation: INSERT, UPDATE, or DELETE?",
      "options": [
        {
          "id": "a",
          "text": "TG_OP."
        },
        {
          "id": "b",
          "text": "OLD."
        },
        {
          "id": "c",
          "text": "TG_TABLE_NAME."
        },
        {
          "id": "d",
          "text": "NEW."
        }
      ],
      "correctOptionId": "a",
      "explanation": "TG_OP indicates the operation that fired the trigger. The lecture lists INSERT, UPDATE, and DELETE; OLD and NEW hold row data rather than the operation name.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger variables",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        }
      ]
    },
    {
      "id": "db-s1-073",
      "prompt": "Which special trigger variable contains the name of the table that fired the trigger?",
      "options": [
        {
          "id": "a",
          "text": "OLD.table_name as an automatically added field."
        },
        {
          "id": "b",
          "text": "NEW.table_name as an automatically added field."
        },
        {
          "id": "c",
          "text": "TG_TABLE_NAME."
        },
        {
          "id": "d",
          "text": "TG_OP."
        }
      ],
      "correctOptionId": "c",
      "explanation": "TG_TABLE_NAME contains the name of the table that fired the trigger. It supplies table context to a standalone, reusable Trigger Function.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger variables",
      "difficulty": "easy",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        }
      ]
    },
    {
      "id": "db-s1-074",
      "prompt": "For a DELETE row trigger, which record normally contains the row being deleted?",
      "options": [
        {
          "id": "a",
          "text": "OLD."
        },
        {
          "id": "b",
          "text": "TG_OP."
        },
        {
          "id": "c",
          "text": "NEW."
        },
        {
          "id": "d",
          "text": "TG_TABLE_NAME."
        }
      ],
      "correctOptionId": "a",
      "explanation": "DELETE has an old row and no new row. NEW is available for INSERT/UPDATE row operations.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger variables",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-075",
      "prompt": "A BEFORE INSERT FOR EACH ROW trigger returns NULL for the current row without raising an exception. What happens?",
      "options": [
        {
          "id": "a",
          "text": "Every row from the INSERT statement is rolled back."
        },
        {
          "id": "b",
          "text": "The row is inserted and then deleted in a second transaction."
        },
        {
          "id": "c",
          "text": "The operation for the current row is cancelled; the insert is skipped."
        },
        {
          "id": "d",
          "text": "The row is inserted with NULL in every column."
        }
      ],
      "correctOptionId": "c",
      "explanation": "RETURN NULL cancels the operation for the current row in a BEFORE row trigger: skip the Insert/Update rather than storing a row of NULL values. Other rows can proceed if no error occurs. Technical note: AFTER row-trigger return values are ignored; returning NULL there does not cancel the stored row.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger filtering",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Handling Bad Data: MySQL vs. PostgreSQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-076",
      "prompt": "A row-level BEFORE INSERT trigger skips rows with negative amount by returning NULL, otherwise returning NEW. A single INSERT supplies amounts 10, -5 and 20, with no other failures. How many rows are inserted?",
      "options": [
        {
          "id": "a",
          "text": "3."
        },
        {
          "id": "b",
          "text": "1."
        },
        {
          "id": "c",
          "text": "2."
        },
        {
          "id": "d",
          "text": "0."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The negative row is skipped; the other two rows proceed. This differs from raising an exception for the invalid row.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger filtering",
      "difficulty": "hard",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Handling Bad Data: MySQL vs. PostgreSQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-077",
      "prompt": "A row-level AFTER INSERT trigger returns NULL without raising an exception or executing additional DML. What does that return value do?",
      "options": [
        {
          "id": "a",
          "text": "It changes all inserted columns to SQL NULL."
        },
        {
          "id": "b",
          "text": "It rolls back the current transaction automatically."
        },
        {
          "id": "c",
          "text": "It skips the row in the same way as a BEFORE INSERT return."
        },
        {
          "id": "d",
          "text": "It is ignored; it does not cancel the inserted row."
        }
      ],
      "correctOptionId": "d",
      "explanation": "AFTER row-trigger return values are ignored. The slide's cancellation rule applies to BEFORE row triggers, not every trigger timing.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger filtering",
      "difficulty": "hard",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-078",
      "prompt": "The same timestamp trigger function is attached to 50 tables. What condition is needed for its direct NEW.last_update assignment to work on each table?",
      "options": [
        {
          "id": "a",
          "text": "Each target table must share the exact same primary-key column name."
        },
        {
          "id": "b",
          "text": "Each target row must contain a compatible last_update column."
        },
        {
          "id": "c",
          "text": "Each binding must duplicate the function body for its own table."
        },
        {
          "id": "d",
          "text": "Each binding automatically creates last_update if that column is absent."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Reusability still depends on the fields the function accesses. A table without the expected column cannot support that assignment.",
      "source": "/references/database-session-1-slides.pdf#page=25",
      "topic": "Trigger reuse",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "Triggers: Postgres vs. MySQL"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "Trigger Architecture: MySQL vs. PostgreSQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    },
    {
      "id": "db-s1-079",
      "prompt": "How does PostgreSQL's Decoupled/Modular trigger architecture support DRY (Don't Repeat Yourself)?",
      "options": [
        {
          "id": "a",
          "text": "All table bindings must be replaced even when the function signature remains compatible."
        },
        {
          "id": "b",
          "text": "Each trigger binding contains a stored copy of the function body that updates independently."
        },
        {
          "id": "c",
          "text": "A change to the shared function applies only to triggers created after the change."
        },
        {
          "id": "d",
          "text": "The shared function can be updated centrally while table bindings continue using it."
        }
      ],
      "correctOptionId": "d",
      "explanation": "PostgreSQL keeps logic in Reusable Trigger Functions rather than duplicating it inside each trigger. A compatible change to the shared function updates the common rule while the table bindings continue using it. This supports DRY (Don't Repeat Yourself).",
      "source": "/references/database-session-1-slides.pdf#page=25",
      "topic": "Trigger maintenance",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 25,
          "slideNumber": 21,
          "slideTitle": "Triggers: Postgres vs. MySQL"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "Trigger Architecture: MySQL vs. PostgreSQL"
        }
      ]
    },
    {
      "id": "db-s1-080",
      "prompt": "Several applications insert into one table. Smart Filtering must skip only rows with a missing external identifier. Which design centralizes this rule in the database?",
      "options": [
        {
          "id": "a",
          "text": "A BEFORE INSERT row trigger that returns NEW for every row and expects NULL fields to skip rows."
        },
        {
          "id": "b",
          "text": "An AFTER INSERT row trigger that returns NULL for that condition and NEW otherwise."
        },
        {
          "id": "c",
          "text": "A BEFORE INSERT row trigger that returns NULL for that condition and NEW otherwise."
        },
        {
          "id": "d",
          "text": "A BEFORE INSERT statement trigger whose NULL result skips only invalid input rows."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Smart Filtering: you define exactly which rows to skip and which to fail. Logic is centralized in the DB for all applications. Use a BEFORE INSERT row trigger that returns NULL for rows to skip and NEW for rows to accept; AFTER return values do not cancel inserted rows.",
      "source": "/references/database-session-1-slides.pdf#page=27",
      "topic": "Trigger filtering",
      "difficulty": "medium",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "Understanding Special Trigger Variables"
        },
        {
          "kind": "lecture",
          "file": "AdvanceDB_1.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "Handling Bad Data: MySQL vs. PostgreSQL"
        },
        {
          "kind": "documentation",
          "title": "PostgreSQL 16: Trigger functions",
          "url": "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          "section": "43.10"
        }
      ]
    }
  ]
};
