import type { Chapter } from "@/types/quiz";

export const session9: Chapter = {
  "id": "session-9",
  "title": "Session 9: NoSQL I: Document Stores with MongoDB",
  "description": "62 câu hỏi về NoSQL, document model, schema design và MongoDB queries.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s9-q001",
      "prompt": "Which combination best explains why the lecture introduces document stores?",
      "options": [
        {
          "id": "a",
          "text": "Relational engines cannot store JSON and do not support indexes."
        },
        {
          "id": "b",
          "text": "Frequent schema changes, object–relational mismatch, difficult distributed JOINs, and varied data."
        },
        {
          "id": "c",
          "text": "All relational transactions must be serialized, preventing any concurrent work."
        },
        {
          "id": "d",
          "text": "SQL cannot represent relationships between actors and films."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide identifies rigid schemas, reconstructing application objects via JOINs, scaling multi-table operations, and semi-structured inputs as pain points.",
      "source": "/references/database-session-9-slides.pdf#page=6",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "1.1 Pain Points of the Relational Model"
        }
      ]
    },
    {
      "id": "db-s9-q002",
      "prompt": "Why does the lecture connect the document model to sharding?",
      "options": [
        {
          "id": "a",
          "text": "Document models guarantee cross-shard foreign keys."
        },
        {
          "id": "b",
          "text": "Sharding makes multi-table JOINs free but forces schema changes."
        },
        {
          "id": "c",
          "text": "Embedding frequently accessed related data can reduce expensive cross-shard JOINs."
        },
        {
          "id": "d",
          "text": "Documents automatically place every related entity on the same shard."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The recap motivates document storage by asking whether data can be organized to avoid frequent JOINs when distributed.",
      "source": "/references/database-session-9-slides.pdf#page=4",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 4,
          "slideNumber": 4,
          "slideTitle": "Recap: Where are we?"
        }
      ]
    },
    {
      "id": "db-s9-q003",
      "prompt": "Which pairing correctly identifies a NoSQL family and its typical data unit?",
      "options": [
        {
          "id": "a",
          "text": "Graph — nodes and relationships."
        },
        {
          "id": "b",
          "text": "Wide-column — binary embedding vectors."
        },
        {
          "id": "c",
          "text": "Key–value — JSON-like documents only."
        },
        {
          "id": "d",
          "text": "Document — one fixed relational row."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The family table maps graph databases to nodes/relationships, key–value to keys and values, and document stores to JSON-like documents.",
      "source": "/references/database-session-9-slides.pdf#page=7",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 NoSQL = “Not Only SQL”"
        }
      ]
    },
    {
      "id": "db-s9-q004",
      "prompt": "A service uses PostgreSQL for orders, Redis for cache entries, and MongoDB for variable product metadata. What lecture concept best describes this?",
      "options": [
        {
          "id": "a",
          "text": "Schema-on-write"
        },
        {
          "id": "b",
          "text": "Single-model persistence"
        },
        {
          "id": "c",
          "text": "Horizontal partitioning"
        },
        {
          "id": "d",
          "text": "Polyglot persistence"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Polyglot persistence uses different databases for the access patterns each serves best.",
      "source": "/references/database-session-9-slides.pdf#page=7",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 NoSQL = “Not Only SQL”"
        }
      ]
    },
    {
      "id": "db-s9-q005",
      "prompt": "Which statement about MongoDB transactions matches the slide?",
      "options": [
        {
          "id": "a",
          "text": "Every write to multiple documents is automatically atomic without a transaction."
        },
        {
          "id": "b",
          "text": "Writes to one document are atomic, and multi-document ACID transactions are supported but costlier."
        },
        {
          "id": "c",
          "text": "MongoDB cannot use ACID transactions in any version."
        },
        {
          "id": "d",
          "text": "MongoDB supports atomicity only if every document has an ObjectId key."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The ACID vs. BASE slide notes single-document atomicity and multi-document ACID transaction support from version 4.0, with extra cost.",
      "source": "/references/database-session-9-slides.pdf#page=8",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "1.3 ACID vs. BASE"
        }
      ]
    },
    {
      "id": "db-s9-q006",
      "prompt": "In the lecture, what does BASE emphasize?",
      "options": [
        {
          "id": "a",
          "text": "Blocking writes until every replica has identical values."
        },
        {
          "id": "b",
          "text": "Binary storage, automatic sharding, extensibility."
        },
        {
          "id": "c",
          "text": "Basically Available, Soft state, Eventually consistent."
        },
        {
          "id": "d",
          "text": "Backups, Atomicity, Serialization, Encryption."
        }
      ],
      "correctOptionId": "c",
      "explanation": "BASE expands to Basically Available, Soft state, Eventually consistent; replicas may converge over time.",
      "source": "/references/database-session-9-slides.pdf#page=8",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "1.3 ACID vs. BASE"
        }
      ]
    },
    {
      "id": "db-s9-q007",
      "prompt": "An ML experiment records variable hyperparameter sets, metrics, and raw API JSON. Which relational-model pain point is most relevant?",
      "options": [
        {
          "id": "a",
          "text": "Semi-structured records have variable shapes that fit awkwardly into fixed tables."
        },
        {
          "id": "b",
          "text": "Every ML experiment requires a graph traversal across sharded replicas."
        },
        {
          "id": "c",
          "text": "PostgreSQL forbids text and numeric fields in the same table."
        },
        {
          "id": "d",
          "text": "The only way to store JSON is to serialize it to disk outside any database."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide explicitly names model configurations, experiment metadata, LLM histories, and raw JSON as semi-structured data.",
      "source": "/references/database-session-9-slides.pdf#page=6",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "1.1 Pain Points of the Relational Model"
        }
      ]
    },
    {
      "id": "db-s9-q008",
      "prompt": "Which statement best captures the meaning of “Not Only SQL” in this lecture?",
      "options": [
        {
          "id": "a",
          "text": "It requires replacing relational storage completely."
        },
        {
          "id": "b",
          "text": "It refers exclusively to MongoDB and Redis."
        },
        {
          "id": "c",
          "text": "It means every NoSQL system has the same query model."
        },
        {
          "id": "d",
          "text": "It describes multiple non-relational families optimized for different access patterns."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide defines several distinct NoSQL families and stresses that NoSQL does not replace SQL.",
      "source": "/references/database-session-9-slides.pdf#page=7",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 NoSQL = “Not Only SQL”"
        }
      ]
    },
    {
      "id": "db-s9-q009",
      "prompt": "A developer claims, “NoSQL databases have no transactions.” Which response is supported by the slide?",
      "options": [
        {
          "id": "a",
          "text": "Correct; transactions are possible only with traditional tables."
        },
        {
          "id": "b",
          "text": "Incorrect; MongoDB can provide atomic single-document writes and multi-document transactions."
        },
        {
          "id": "c",
          "text": "Correct except when the database uses BSON instead of JSON."
        },
        {
          "id": "d",
          "text": "Incorrect only because BASE and ACID are identical guarantees."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide labels this claim outdated, distinguishing single-document atomicity and slower multi-document transactions.",
      "source": "/references/database-session-9-slides.pdf#page=8",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 8,
          "slideNumber": 7,
          "slideTitle": "1.3 ACID vs. BASE"
        }
      ]
    },
    {
      "id": "db-s9-q010",
      "prompt": "Which option correctly names the family used for embedding vectors in the lecture table?",
      "options": [
        {
          "id": "a",
          "text": "Wide-column (Cassandra)"
        },
        {
          "id": "b",
          "text": "Graph (Neo4j)"
        },
        {
          "id": "c",
          "text": "Vector (Pinecone, Milvus, pgvector)"
        },
        {
          "id": "d",
          "text": "Key–value (Redis)"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The NoSQL family table lists a vector family whose data unit is embedding vectors.",
      "source": "/references/database-session-9-slides.pdf#page=7",
      "topic": "Why NoSQL?",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "1.2 NoSQL = “Not Only SQL”"
        }
      ]
    },
    {
      "id": "db-s9-q011",
      "prompt": "Which MongoDB concept corresponds most closely to a PostgreSQL table?",
      "options": [
        {
          "id": "a",
          "text": "Collection"
        },
        {
          "id": "b",
          "text": "Field"
        },
        {
          "id": "c",
          "text": "Document"
        },
        {
          "id": "d",
          "text": "ObjectId"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The vocabulary table maps PostgreSQL table to MongoDB collection.",
      "source": "/references/database-session-9-slides.pdf#page=10",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "2.1 Vocabulary: SQL vs. MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q012",
      "prompt": "Which mapping best describes the PostgreSQL row and primary-key counterparts in MongoDB?",
      "options": [
        {
          "id": "a",
          "text": "Row → collection; primary key → \\$group."
        },
        {
          "id": "b",
          "text": "Row → field; primary key → schema validator."
        },
        {
          "id": "c",
          "text": "Row → index; primary key → \\$lookup."
        },
        {
          "id": "d",
          "text": "Row → document; primary key → _id."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The SQL-to-MongoDB vocabulary comparison maps row to document and primary key to unique _id.",
      "source": "/references/database-session-9-slides.pdf#page=10",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "2.1 Vocabulary: SQL vs. MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q013",
      "prompt": "Which field in the example film document is an array of sub-documents rather than an array of scalars?",
      "options": [
        {
          "id": "a",
          "text": "rating"
        },
        {
          "id": "b",
          "text": "actors"
        },
        {
          "id": "c",
          "text": "special_features"
        },
        {
          "id": "d",
          "text": "rental_rate"
        }
      ],
      "correctOptionId": "b",
      "explanation": "actors contains objects with actor_id and name, whereas special_features contains strings.",
      "source": "/references/database-session-9-slides.pdf#page=11",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "2.2 Anatomy of a Document"
        }
      ]
    },
    {
      "id": "db-s9-q014",
      "prompt": "Why does MongoDB use BSON instead of plain JSON for stored documents, according to the slide?",
      "options": [
        {
          "id": "a",
          "text": "It removes the need for any document identifier."
        },
        {
          "id": "b",
          "text": "It limits fields to strings and booleans."
        },
        {
          "id": "c",
          "text": "It uses a binary representation with extra types such as Date, ObjectId, and Decimal128."
        },
        {
          "id": "d",
          "text": "It enforces foreign keys between embedded sub-documents."
        }
      ],
      "correctOptionId": "c",
      "explanation": "BSON is described as Binary JSON with additional supported types including Date, ObjectId, Decimal128, and int32/int64.",
      "source": "/references/database-session-9-slides.pdf#page=11",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "2.2 Anatomy of a Document"
        }
      ]
    },
    {
      "id": "db-s9-q015",
      "prompt": "Which proposed document violates the size limit specified in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "A single BSON document of 18 MB."
        },
        {
          "id": "b",
          "text": "A collection containing 18 MB across thousands of documents."
        },
        {
          "id": "c",
          "text": "A BSON document of 4 MB with an embedded array."
        },
        {
          "id": "d",
          "text": "An individual BSON document of 12 MB."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide states a maximum BSON document size of 16 MB; this is a per-document limit.",
      "source": "/references/database-session-9-slides.pdf#page=11",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "2.2 Anatomy of a Document"
        }
      ]
    },
    {
      "id": "db-s9-q016",
      "prompt": "What is the main read-time advantage of the slide’s embedded film document over the five-table relational representation?",
      "options": [
        {
          "id": "a",
          "text": "It eliminates the need for indexes on title."
        },
        {
          "id": "b",
          "text": "It automatically synchronizes actors across every film."
        },
        {
          "id": "c",
          "text": "It guarantees that actors have unique names."
        },
        {
          "id": "d",
          "text": "A single findOne can return the complete object without four JOINs."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The case study contrasts four SQL JOINs and regrouping with one MongoDB document already shaped for the app.",
      "source": "/references/database-session-9-slides.pdf#page=12",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2.3 One Film: 5 Tables vs. 1 Document"
        }
      ]
    },
    {
      "id": "db-s9-q017",
      "prompt": "What write-time problem can appear when actor names are embedded in multiple film documents?",
      "options": [
        {
          "id": "a",
          "text": "Every actor must have a separate ObjectId collection."
        },
        {
          "id": "b",
          "text": "A name change may require updating many film documents."
        },
        {
          "id": "c",
          "text": "A single-document update cannot modify nested objects."
        },
        {
          "id": "d",
          "text": "Embedding turns every film query into a cross-shard JOIN."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Embedding copies actor information into each film and introduces duplication/update maintenance.",
      "source": "/references/database-session-9-slides.pdf#page=12",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "2.3 One Film: 5 Tables vs. 1 Document"
        }
      ]
    },
    {
      "id": "db-s9-q018",
      "prompt": "Which conclusion about “schema-less” is most accurate?",
      "options": [
        {
          "id": "a",
          "text": "MongoDB rejects documents with different field sets by default."
        },
        {
          "id": "b",
          "text": "MongoDB never checks field types even when validators exist."
        },
        {
          "id": "c",
          "text": "Documents can have different shapes; application logic or optional validation still enforces expectations."
        },
        {
          "id": "d",
          "text": "The schema is always generated from the first inserted document."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide distinguishes schema-on-read from absence of all schema and shows optional \\$jsonSchema validation.",
      "source": "/references/database-session-9-slides.pdf#page=13",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2.4 Schema-less ̸= No Schema"
        }
      ]
    },
    {
      "id": "db-s9-q019",
      "prompt": "A typo stores “titel” instead of “title” in one film document. Which approach shown in the slide would directly prevent such missing required title fields?",
      "options": [
        {
          "id": "a",
          "text": "Configure \\$jsonSchema to require the title field."
        },
        {
          "id": "b",
          "text": "Switch the _id type from integer to ObjectId."
        },
        {
          "id": "c",
          "text": "Add a compound index on length and rating."
        },
        {
          "id": "d",
          "text": "Use \\$lookup whenever a film is inserted."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The sample validator uses required: [\"title\"] to enforce presence of the expected field.",
      "source": "/references/database-session-9-slides.pdf#page=13",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 13,
          "slideNumber": 11,
          "slideTitle": "2.4 Schema-less ̸= No Schema"
        }
      ]
    },
    {
      "id": "db-s9-q020",
      "prompt": "Which statement correctly describes a MongoDB ObjectId?",
      "options": [
        {
          "id": "a",
          "text": "A 16-byte key supplied by a centralized serial counter."
        },
        {
          "id": "b",
          "text": "A random UUIDv4 with no timestamp component."
        },
        {
          "id": "c",
          "text": "A 12-byte server-assigned sequence requiring a round-trip."
        },
        {
          "id": "d",
          "text": "A 12-byte identifier with timestamp, process-random bytes, and a counter."
        }
      ],
      "correctOptionId": "d",
      "explanation": "ObjectId is 12 bytes: 4-byte timestamp, 5-byte random component, 3-byte counter; it can be generated client-side.",
      "source": "/references/database-session-9-slides.pdf#page=14",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "2.5 The _id Field and ObjectId"
        }
      ]
    },
    {
      "id": "db-s9-q021",
      "prompt": "What is the approximate benefit of client-generated ObjectIds for distributed workloads?",
      "options": [
        {
          "id": "a",
          "text": "All documents on separate shards receive contiguous integer keys."
        },
        {
          "id": "b",
          "text": "Identifiers can be generated without contacting a central counter."
        },
        {
          "id": "c",
          "text": "Identifiers permanently encode their physical shard location."
        },
        {
          "id": "d",
          "text": "ObjectIds guarantee global chronological ordering across all clients."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide emphasizes generating identifiers on the client, avoiding a central sequence, and only roughly sorting by creation time.",
      "source": "/references/database-session-9-slides.pdf#page=14",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 14,
          "slideNumber": 12,
          "slideTitle": "2.5 The _id Field and ObjectId"
        }
      ]
    },
    {
      "id": "db-s9-q022",
      "prompt": "According to the slide’s rule of thumb, which architecture is favored for an application whose data is mostly relational with a few flexible attributes?",
      "options": [
        {
          "id": "a",
          "text": "Store every entity in MongoDB with a separate referenced collection."
        },
        {
          "id": "b",
          "text": "Store only plain SQL tables and reject JSON input."
        },
        {
          "id": "c",
          "text": "Keep PostgreSQL and use JSONB for the flexible fields."
        },
        {
          "id": "d",
          "text": "Replace SQL joins with MongoDB aggregation for every request."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lecture recommends PostgreSQL plus JSONB if roughly 90% of the data is relational.",
      "source": "/references/database-session-9-slides.pdf#page=15",
      "topic": "The document model",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 15,
          "slideNumber": 13,
          "slideTitle": "2.6 PostgreSQL JSONB vs. MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q023",
      "prompt": "What should drive document schema design according to the lecture’s golden rule?",
      "options": [
        {
          "id": "a",
          "text": "The queries and screens that access data together."
        },
        {
          "id": "b",
          "text": "The largest possible number of normalized entity tables."
        },
        {
          "id": "c",
          "text": "The current number of database replicas."
        },
        {
          "id": "d",
          "text": "The alphabetical order of document field names."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The golden rule is to store data together when accessed together and design around access patterns.",
      "source": "/references/database-session-9-slides.pdf#page=17",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "3.1 The Golden Rule"
        }
      ]
    },
    {
      "id": "db-s9-q024",
      "prompt": "Which relationship is the clearest candidate for embedding?",
      "options": [
        {
          "id": "a",
          "text": "One customer with millions of historical rentals."
        },
        {
          "id": "b",
          "text": "One sensor with readings recorded each second indefinitely."
        },
        {
          "id": "c",
          "text": "One actor reused in thousands of frequently updated catalogs."
        },
        {
          "id": "d",
          "text": "One customer with one address routinely read with the profile."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Embedding is appropriate for bounded, dependent information read with its parent, such as a customer address.",
      "source": "/references/database-session-9-slides.pdf#page=18",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "3.2 Embedding (Nesting)"
        }
      ]
    },
    {
      "id": "db-s9-q025",
      "prompt": "Which relationship is best handled by referencing?",
      "options": [
        {
          "id": "a",
          "text": "A film with five special features read with every film page."
        },
        {
          "id": "b",
          "text": "A customer with an unbounded history of rentals queried independently."
        },
        {
          "id": "c",
          "text": "An order containing one fixed shipping address."
        },
        {
          "id": "d",
          "text": "A profile containing three shipping addresses."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Referencing suits independently accessed or unbounded child records, including customer rentals.",
      "source": "/references/database-session-9-slides.pdf#page=19",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "3.3 Referencing (Linking)"
        }
      ]
    },
    {
      "id": "db-s9-q026",
      "prompt": "What integrity drawback of a simple MongoDB reference is identified in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "Each referenced child is automatically copied into the parent."
        },
        {
          "id": "b",
          "text": "References force synchronous cross-shard transactions."
        },
        {
          "id": "c",
          "text": "A reference can point to a non-existent _id because there is no built-in foreign-key check."
        },
        {
          "id": "d",
          "text": "All references must be strings rather than numbers."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The example permits a customer_id that has no corresponding customer; it does not enforce relational foreign keys.",
      "source": "/references/database-session-9-slides.pdf#page=19",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "3.3 Referencing (Linking)"
        }
      ]
    },
    {
      "id": "db-s9-q027",
      "prompt": "A product has 50,000 reviews, but its page displays only the newest three. Which pattern from the slide fits best?",
      "options": [
        {
          "id": "a",
          "text": "Keep full reviews in a separate collection and embed the newest three in the product."
        },
        {
          "id": "b",
          "text": "Embed every review in the product to maximize single-document atomicity."
        },
        {
          "id": "c",
          "text": "Save the reviews as comma-separated strings in product metadata."
        },
        {
          "id": "d",
          "text": "Put each product in its own database to avoid all lookups."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The decision guide and suggested lab answers recommend the Subset pattern: reference all reviews and embed a bounded recent subset.",
      "source": "/references/database-session-9-slides.pdf#page=20",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "3.4 Decision Guide"
        }
      ]
    },
    {
      "id": "db-s9-q028",
      "prompt": "Students enroll in multiple courses, and each course has many students. Which representation does the decision guide suggest?",
      "options": [
        {
          "id": "a",
          "text": "A single enormous student document for the entire university."
        },
        {
          "id": "b",
          "text": "Every course as an embedded object in a central singleton document."
        },
        {
          "id": "c",
          "text": "Automatic SQL foreign keys in both collections."
        },
        {
          "id": "d",
          "text": "Arrays of related _ids on one or both sides."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The many-to-many row recommends storing arrays of identifiers on one or both sides.",
      "source": "/references/database-session-9-slides.pdf#page=20",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "3.4 Decision Guide"
        }
      ]
    },
    {
      "id": "db-s9-q029",
      "prompt": "In the dvdrental redesign, which three collections remain after reducing fifteen SQL tables?",
      "options": [
        {
          "id": "a",
          "text": "actors, categories, payments"
        },
        {
          "id": "b",
          "text": "films, rentals, customers"
        },
        {
          "id": "c",
          "text": "films, film_actor, addresses"
        },
        {
          "id": "d",
          "text": "customers, stores, categories"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The case study retains films, rentals and customers; related low-cardinality data is embedded.",
      "source": "/references/database-session-9-slides.pdf#page=21",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.5 Case Study: dvdrental in MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q030",
      "prompt": "Why are film and customer links retained inside rental documents rather than embedding all rentals in customers?",
      "options": [
        {
          "id": "a",
          "text": "The rental_date field cannot be stored in an embedded object."
        },
        {
          "id": "b",
          "text": "Every rental belongs to multiple customers at once."
        },
        {
          "id": "c",
          "text": "Customer rental histories can grow without bound."
        },
        {
          "id": "d",
          "text": "MongoDB has a restriction against nesting arrays inside customers."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide states that customers can have unbounded rental histories, so rental records reference films and customers.",
      "source": "/references/database-session-9-slides.pdf#page=21",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "3.5 Case Study: dvdrental in MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q031",
      "prompt": "Why is an ever-growing rentals array inside a customer considered an anti-pattern?",
      "options": [
        {
          "id": "a",
          "text": "The parent continually grows, increasing update cost and risking the 16 MB limit."
        },
        {
          "id": "b",
          "text": "MongoDB cannot query any nested arrays by field name."
        },
        {
          "id": "c",
          "text": "An array prevents use of a unique _id on the parent."
        },
        {
          "id": "d",
          "text": "An array automatically becomes a separate collection."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The anti-pattern slide warns that unbounded arrays enlarge documents and eventually hit the size cap.",
      "source": "/references/database-session-9-slides.pdf#page=22",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.6 Anti-Patterns to Avoid"
        }
      ]
    },
    {
      "id": "db-s9-q032",
      "prompt": "A widely shared product price changes daily. Why may duplicating it across one million documents be harmful?",
      "options": [
        {
          "id": "a",
          "text": "MongoDB indexes cannot include numeric prices."
        },
        {
          "id": "b",
          "text": "Frequent price changes always force a schema migration."
        },
        {
          "id": "c",
          "text": "It guarantees that all copies update atomically without a transaction."
        },
        {
          "id": "d",
          "text": "Keeping many copies synchronized creates an expensive update burden."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide calls embedding hot, shared data an anti-pattern due to widespread updates.",
      "source": "/references/database-session-9-slides.pdf#page=22",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.6 Anti-Patterns to Avoid"
        }
      ]
    },
    {
      "id": "db-s9-q033",
      "prompt": "An LLM conversation usually contains 20 messages and the application always loads the whole thread. What does the suggested answer recommend?",
      "options": [
        {
          "id": "a",
          "text": "Store every message as a distinct document no matter how short the conversation."
        },
        {
          "id": "b",
          "text": "Embed messages in the conversation; bucket very long threads."
        },
        {
          "id": "c",
          "text": "Create a relational junction table between each token and the conversation."
        },
        {
          "id": "d",
          "text": "Store all users’ conversations in a single shared document."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The suggested answers embed a bounded group of messages read together, with bucketing for very long chats.",
      "source": "/references/database-session-9-slides.pdf#page=24",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "3.8 Think–Pair–Share: Suggested Answers"
        }
      ]
    },
    {
      "id": "db-s9-q034",
      "prompt": "An IoT sensor produces one reading per second for years. Which design best matches the suggested answer?",
      "options": [
        {
          "id": "a",
          "text": "Embed every reading in the sensor document indefinitely."
        },
        {
          "id": "b",
          "text": "Overwrite the most recent sensor value and discard historical data."
        },
        {
          "id": "c",
          "text": "Keep readings as children in separate documents or time buckets."
        },
        {
          "id": "d",
          "text": "Use a MongoDB validator to raise the document size limit."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lab recommends references from child readings or hourly buckets, never an unbounded parent array.",
      "source": "/references/database-session-9-slides.pdf#page=24",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 24,
          "slideNumber": 21,
          "slideTitle": "3.8 Think–Pair–Share: Suggested Answers"
        }
      ]
    },
    {
      "id": "db-s9-q035",
      "prompt": "An application’s most frequent request needs \\$lookup across two collections. What does the anti-pattern slide suggest reviewing?",
      "options": [
        {
          "id": "a",
          "text": "Whether the model should embed more data for that common access path."
        },
        {
          "id": "b",
          "text": "Whether an ObjectId should be replaced with a UUIDv4 everywhere."
        },
        {
          "id": "c",
          "text": "Whether each user should receive a new database instance."
        },
        {
          "id": "d",
          "text": "Whether to disable every index on foreign fields."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide explicitly says to reconsider document design when the hottest query frequently needs \\$lookup.",
      "source": "/references/database-session-9-slides.pdf#page=22",
      "topic": "Schema design: embed or reference",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "3.6 Anti-Patterns to Avoid"
        }
      ]
    },
    {
      "id": "db-s9-q036",
      "prompt": "Which MongoDB expression is equivalent to filtering films where rating equals \"PG\"?",
      "options": [
        {
          "id": "a",
          "text": "db.films.aggregate({ rating: \"PG\" })"
        },
        {
          "id": "b",
          "text": "db.films.find({ rating: \"PG\" })"
        },
        {
          "id": "c",
          "text": "db.films.find({ \\$group: \"PG\" })"
        },
        {
          "id": "d",
          "text": "db.films.updateOne({ rating: \"PG\" })"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The CRUD comparison maps SELECT ... WHERE rating=PG to find({ rating: \"PG\" }).",
      "source": "/references/database-session-9-slides.pdf#page=26",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "4.1 CRUD at a Glance"
        }
      ]
    },
    {
      "id": "db-s9-q037",
      "prompt": "How should the query return film titles without returning _id?",
      "options": [
        {
          "id": "a",
          "text": "{ title: -1, _id: 1 }"
        },
        {
          "id": "b",
          "text": "{ title: true, _id: true }"
        },
        {
          "id": "c",
          "text": "{ title: 0, _id: 0 }"
        },
        {
          "id": "d",
          "text": "{ title: 1, _id: 0 }"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The projection example includes title with 1 and excludes _id with 0.",
      "source": "/references/database-session-9-slides.pdf#page=26",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 26,
          "slideNumber": 22,
          "slideTitle": "4.1 CRUD at a Glance"
        }
      ]
    },
    {
      "id": "db-s9-q038",
      "prompt": "Which find filter selects PG-13 films longer than 120 minutes?",
      "options": [
        {
          "id": "a",
          "text": "{ rating: \"PG-13\", length: { \\$gt: 120 } }"
        },
        {
          "id": "b",
          "text": "{ rating: \"PG-13\", length: { \\$lt: 120 } }"
        },
        {
          "id": "c",
          "text": "{ rating: [\"PG-13\"], length: { \\$gte: 0 } }"
        },
        {
          "id": "d",
          "text": "{ \\$or: [{ rating: \"PG-13\" }, { length: { \\$gt: 120 } }] }"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Separate filter fields are ANDed; \\$gt selects lengths strictly greater than 120.",
      "source": "/references/database-session-9-slides.pdf#page=27",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.2 find(): Filters, Nested Fields and Arrays"
        }
      ]
    },
    {
      "id": "db-s9-q039",
      "prompt": "Which filter correctly selects customers whose embedded address has country equal to Japan?",
      "options": [
        {
          "id": "a",
          "text": "{ address: \"Japan\" }"
        },
        {
          "id": "b",
          "text": "{ country: { address: \"Japan\" } }"
        },
        {
          "id": "c",
          "text": "{ \"address.country\": \"Japan\" }"
        },
        {
          "id": "d",
          "text": "{ \\$lookup: { country: \"Japan\" } }"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Dot notation targets nested fields, and the dotted key is quoted in the slide.",
      "source": "/references/database-session-9-slides.pdf#page=27",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.2 find(): Filters, Nested Fields and Arrays"
        }
      ]
    },
    {
      "id": "db-s9-q040",
      "prompt": "What does db.films.find({ \"actors.name\": \"Jayne Nolte\" }) match?",
      "options": [
        {
          "id": "a",
          "text": "Only films with exactly one actor and no other actor fields."
        },
        {
          "id": "b",
          "text": "Films where at least one embedded actor has that name."
        },
        {
          "id": "c",
          "text": "Documents whose entire actors array equals the string."
        },
        {
          "id": "d",
          "text": "Actor documents from a separate actors collection only."
        }
      ],
      "correctOptionId": "b",
      "explanation": "MongoDB can match a field within an array of embedded sub-documents without \\$unwind or a JOIN.",
      "source": "/references/database-session-9-slides.pdf#page=27",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.2 find(): Filters, Nested Fields and Arrays"
        }
      ]
    },
    {
      "id": "db-s9-q041",
      "prompt": "Which operator expresses rating being either G or PG?",
      "options": [
        {
          "id": "a",
          "text": "{ rating: { \\$gt: [\"G\", \"PG\"] } }"
        },
        {
          "id": "b",
          "text": "{ rating: { \\$and: [\"G\", \"PG\"] } }"
        },
        {
          "id": "c",
          "text": "{ rating: { \\$exists: [\"G\", \"PG\"] } }"
        },
        {
          "id": "d",
          "text": "{ rating: { \\$in: [\"G\", \"PG\"] } }"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide uses \\$in to test membership in a given list of rating values.",
      "source": "/references/database-session-9-slides.pdf#page=27",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 27,
          "slideNumber": 23,
          "slideTitle": "4.2 find(): Filters, Nested Fields and Arrays"
        }
      ]
    },
    {
      "id": "db-s9-q042",
      "prompt": "What happens when updateOne applies \\$set, \\$push, and \\$inc to one matching document?",
      "options": [
        {
          "id": "a",
          "text": "Those modifications to the document are applied atomically together."
        },
        {
          "id": "b",
          "text": "Each operator always creates an independent multi-document transaction."
        },
        {
          "id": "c",
          "text": "Only the first modifier runs; the remaining modifiers are ignored."
        },
        {
          "id": "d",
          "text": "The document is replaced completely with only modified fields."
        }
      ],
      "correctOptionId": "a",
      "explanation": "MongoDB provides all-or-nothing atomicity for updates to a single document.",
      "source": "/references/database-session-9-slides.pdf#page=28",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "4.3 Updates Are Atomic per Document"
        }
      ]
    },
    {
      "id": "db-s9-q043",
      "prompt": "Which update operator removes a matching element from an existing array?",
      "options": [
        {
          "id": "a",
          "text": "\\$inc"
        },
        {
          "id": "b",
          "text": "\\$set"
        },
        {
          "id": "c",
          "text": "\\$pull"
        },
        {
          "id": "d",
          "text": "\\$project"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The update slide states that \\$pull removes array elements; \\$push appends them.",
      "source": "/references/database-session-9-slides.pdf#page=28",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 28,
          "slideNumber": 24,
          "slideTitle": "4.3 Updates Are Atomic per Document"
        }
      ]
    },
    {
      "id": "db-s9-q044",
      "prompt": "Which sequence correctly filters, aggregates, orders, and limits documents in a pipeline?",
      "options": [
        {
          "id": "a",
          "text": "\\$project → \\$lookup → \\$unwind → \\$match"
        },
        {
          "id": "b",
          "text": "\\$match → \\$group → \\$sort → \\$limit"
        },
        {
          "id": "c",
          "text": "\\$group → \\$limit → \\$match → \\$lookup"
        },
        {
          "id": "d",
          "text": "\\$limit → \\$sort → \\$match → \\$group"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The basic pipeline depicts collection → \\$match → \\$group → \\$sort → \\$limit, with filtering before heavy stages.",
      "source": "/references/database-session-9-slides.pdf#page=29",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.4 The Aggregation Pipeline"
        }
      ]
    },
    {
      "id": "db-s9-q045",
      "prompt": "Which stage is the closest analogue to SQL GROUP BY?",
      "options": [
        {
          "id": "a",
          "text": "\\$unwind"
        },
        {
          "id": "b",
          "text": "\\$lookup"
        },
        {
          "id": "c",
          "text": "\\$project"
        },
        {
          "id": "d",
          "text": "\\$group"
        }
      ],
      "correctOptionId": "d",
      "explanation": "\\$group groups documents and computes aggregates such as \\$sum, \\$avg and \\$max.",
      "source": "/references/database-session-9-slides.pdf#page=29",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 29,
          "slideNumber": 25,
          "slideTitle": "4.4 The Aggregation Pipeline"
        }
      ]
    },
    {
      "id": "db-s9-q046",
      "prompt": "In an aggregation expression, what is the difference between \"\\$amount\" and \"amount\"?",
      "options": [
        {
          "id": "a",
          "text": "\"\\$amount\" reads the amount field; \"amount\" is a literal string."
        },
        {
          "id": "b",
          "text": "Both always refer to the amount field."
        },
        {
          "id": "c",
          "text": "\"amount\" reads the field; \"\\$amount\" is a literal string."
        },
        {
          "id": "d",
          "text": "Both are invalid inside \\$sum."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The top-spenders example explicitly distinguishes field-path expressions using \\$ from string literals.",
      "source": "/references/database-session-9-slides.pdf#page=30",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "4.5 Pipeline Example: Top Spenders"
        }
      ]
    },
    {
      "id": "db-s9-q047",
      "prompt": "What role does \\$match play when it follows a \\$group and filters an aggregate count?",
      "options": [
        {
          "id": "a",
          "text": "It changes each grouped document back into its original rows."
        },
        {
          "id": "b",
          "text": "It generates a new grouping key."
        },
        {
          "id": "c",
          "text": "It acts like HAVING on grouped results."
        },
        {
          "id": "d",
          "text": "It automatically joins the grouped output to customers."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The pipeline example uses \\$match after \\$group to implement HAVING COUNT(*) >= 5.",
      "source": "/references/database-session-9-slides.pdf#page=30",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 30,
          "slideNumber": 26,
          "slideTitle": "4.5 Pipeline Example: Top Spenders"
        }
      ]
    },
    {
      "id": "db-s9-q048",
      "prompt": "A \\$lookup stage does not find a matching film for one rental. What happens to its output field?",
      "options": [
        {
          "id": "a",
          "text": "The input rental is always removed automatically."
        },
        {
          "id": "b",
          "text": "The output field contains an empty array."
        },
        {
          "id": "c",
          "text": "The output field contains a SQL NULL instead of an array."
        },
        {
          "id": "d",
          "text": "The stage raises a foreign-key violation."
        }
      ],
      "correctOptionId": "b",
      "explanation": "\\$lookup behaves like a left outer join and emits an array, which is empty when nothing matches.",
      "source": "/references/database-session-9-slides.pdf#page=31",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 31,
          "slideNumber": 27,
          "slideTitle": "4.6 $lookup: the “JOIN” of MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q049",
      "prompt": "Which \\$lookup attribute denotes the matching field in the other collection?",
      "options": [
        {
          "id": "a",
          "text": "as"
        },
        {
          "id": "b",
          "text": "localField"
        },
        {
          "id": "c",
          "text": "from"
        },
        {
          "id": "d",
          "text": "foreignField"
        }
      ],
      "correctOptionId": "d",
      "explanation": "foreignField identifies the match key in the foreign collection; localField names the input key.",
      "source": "/references/database-session-9-slides.pdf#page=31",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 31,
          "slideNumber": 27,
          "slideTitle": "4.6 $lookup: the “JOIN” of MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q050",
      "prompt": "An explain plan changes from COLLSCAN to FETCH with an IXSCAN input after creating an index. What does this indicate?",
      "options": [
        {
          "id": "a",
          "text": "The query now uses an index to find candidates and fetches matching documents."
        },
        {
          "id": "b",
          "text": "The collection is permanently sorted in memory."
        },
        {
          "id": "c",
          "text": "The query has stopped reading documents and returns only index definitions."
        },
        {
          "id": "d",
          "text": "The optimizer has disabled all document filtering."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The indexing slide compares COLLSCAN with IXSCAN plus FETCH after createIndex on customer_id.",
      "source": "/references/database-session-9-slides.pdf#page=32",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 32,
          "slideNumber": 28,
          "slideTitle": "4.7 Indexes and explain()"
        }
      ]
    },
    {
      "id": "db-s9-q051",
      "prompt": "Why does an index on an array field become a multikey index?",
      "options": [
        {
          "id": "a",
          "text": "It creates a separate collection for each array element."
        },
        {
          "id": "b",
          "text": "It only supports single values, forcing arrays to be rejected."
        },
        {
          "id": "c",
          "text": "It can add an index entry for each array element."
        },
        {
          "id": "d",
          "text": "It compresses every array into one unsearchable binary value."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The slide explains that a multikey index on arrays has entries for individual elements.",
      "source": "/references/database-session-9-slides.pdf#page=32",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 32,
          "slideNumber": 28,
          "slideTitle": "4.7 Indexes and explain()"
        }
      ]
    },
    {
      "id": "db-s9-q052",
      "prompt": "Which workload does the lecture present as a relatively poor fit for MongoDB?",
      "options": [
        {
          "id": "a",
          "text": "Product catalogs with varying attributes."
        },
        {
          "id": "b",
          "text": "Banking ledgers requiring multi-entity transactions and strict integrity."
        },
        {
          "id": "c",
          "text": "LLM conversations stored as bounded documents."
        },
        {
          "id": "d",
          "text": "ML experiment metadata with variable fields."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The good-fit/poor-fit table lists banking ledgers with multi-entity transactions and strict integrity as poor fits.",
      "source": "/references/database-session-9-slides.pdf#page=33",
      "topic": "MongoDB querying and aggregation",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 33,
          "slideNumber": 29,
          "slideTitle": "4.8 When to Choose MongoDB"
        }
      ]
    },
    {
      "id": "db-s9-q053",
      "prompt": "Which restriction applies specifically to the Mongo Playground environment described in the lab?",
      "options": [
        {
          "id": "a",
          "text": "It supports unlimited documents and persists all updates between runs."
        },
        {
          "id": "b",
          "text": "It requires MongoDB Atlas credentials for every query."
        },
        {
          "id": "c",
          "text": "It only supports SQL SELECT statements."
        },
        {
          "id": "d",
          "text": "It does not support chaining .sort() or .limit() after find(); use aggregate stages."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The Playground lab notes supported operations and says to replace chained find sorting/limits with aggregate stages.",
      "source": "/references/database-session-9-slides.pdf#page=35",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 35,
          "slideNumber": 30,
          "slideTitle": "5.1 Lab Setup: Mongo Playground (no installation)"
        }
      ]
    },
    {
      "id": "db-s9-q054",
      "prompt": "What is the document count of the rentals collection in the provided lab slice?",
      "options": [
        {
          "id": "a",
          "text": "48"
        },
        {
          "id": "b",
          "text": "52"
        },
        {
          "id": "c",
          "text": "599"
        },
        {
          "id": "d",
          "text": "16,044"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The sample dataset table lists 48 rentals, 52 films, and 8 customers. 16,044 is the full dataset rental count.",
      "source": "/references/database-session-9-slides.pdf#page=36",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 36,
          "slideNumber": 31,
          "slideTitle": "5.2 The Lab Dataset (a slice of dvdrental)"
        }
      ]
    },
    {
      "id": "db-s9-q055",
      "prompt": "According to the lab solution, which pair of customers lives in the United States?",
      "options": [
        {
          "id": "a",
          "text": "Mary Smith and Linda Williams"
        },
        {
          "id": "b",
          "text": "Jennifer Davis and Mary Smith"
        },
        {
          "id": "c",
          "text": "Patricia Johnson and Jennifer Davis"
        },
        {
          "id": "d",
          "text": "Linda Williams and Patricia Johnson"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The worked solution identifies Patricia Johnson (San Bernardino) and Jennifer Davis (Laredo).",
      "source": "/references/database-session-9-slides.pdf#page=38",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 38,
          "slideNumber": 33,
          "slideTitle": "5.4 Part A: Solutions"
        }
      ]
    },
    {
      "id": "db-s9-q056",
      "prompt": "Why does the lab sort category counts with { n: -1, _id: 1 } instead of only { n: -1 }?",
      "options": [
        {
          "id": "a",
          "text": "To combine every category into one total."
        },
        {
          "id": "b",
          "text": "To break count ties consistently using the category key."
        },
        {
          "id": "c",
          "text": "To sort counts ascending and names descending."
        },
        {
          "id": "d",
          "text": "To preserve the physical insertion order of all films."
        }
      ],
      "correctOptionId": "b",
      "explanation": "L4 sorts descending by count and ascending by category _id; the slide notes tied categories at five films.",
      "source": "/references/database-session-9-slides.pdf#page=40",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 40,
          "slideNumber": 35,
          "slideTitle": "5.6 Part B: Solutions (L4–L5)"
        }
      ]
    },
    {
      "id": "db-s9-q057",
      "prompt": "Which three customers have the highest totals in the provided lab results?",
      "options": [
        {
          "id": "a",
          "text": "Customers 1, 2, 3 in that order."
        },
        {
          "id": "b",
          "text": "Customers 6, 2, 1 in that order."
        },
        {
          "id": "c",
          "text": "Customers 3, 1, 2 in that order."
        },
        {
          "id": "d",
          "text": "Customers 3, 2, 1 in that order."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The L5 solution gives customer 3 = 35.94, customer 2 = 29.94, and customer 1 = 27.94.",
      "source": "/references/database-session-9-slides.pdf#page=40",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 40,
          "slideNumber": 35,
          "slideTitle": "5.6 Part B: Solutions (L4–L5)"
        }
      ]
    },
    {
      "id": "db-s9-q058",
      "prompt": "Why does the lab use \\$round on total rental payments?",
      "options": [
        {
          "id": "a",
          "text": "Binary floating-point values can display small representation errors, so totals are rounded to two decimals."
        },
        {
          "id": "b",
          "text": "MongoDB aggregation cannot add decimal values without rounding each input."
        },
        {
          "id": "c",
          "text": "Rounding is needed to satisfy a required document _id type."
        },
        {
          "id": "d",
          "text": "Rounding automatically turns each result into a Decimal128 value."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide shows a binary-double artifact such as 12.940000000000001 and separately recommends Decimal128 for money.",
      "source": "/references/database-session-9-slides.pdf#page=40",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 40,
          "slideNumber": 35,
          "slideTitle": "5.6 Part B: Solutions (L4–L5)"
        }
      ]
    },
    {
      "id": "db-s9-q059",
      "prompt": "Why is \\$lookup placed after \\$limit in the customer top-spenders solution?",
      "options": [
        {
          "id": "a",
          "text": "To avoid computing \\$sum across all 48 rentals."
        },
        {
          "id": "b",
          "text": "Because \\$lookup cannot operate before \\$sort in MongoDB."
        },
        {
          "id": "c",
          "text": "To join only the top three grouped customers instead of all grouped entries."
        },
        {
          "id": "d",
          "text": "Because \\$unwind must always be the first aggregation stage."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The worked solution reduces the input to three top customers before \\$lookup, lowering join work.",
      "source": "/references/database-session-9-slides.pdf#page=41",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 41,
          "slideNumber": 36,
          "slideTitle": "5.7 Part B: Solutions (L6–L7)"
        }
      ]
    },
    {
      "id": "db-s9-q060",
      "prompt": "In the lab update, which combination changes film 1’s rental_rate and appends \"Commentaries\" to special_features?",
      "options": [
        {
          "id": "a",
          "text": "{ \\$inc: { rental_rate: 1.99 }, \\$pull: { special_features: \"Commentaries\" } }"
        },
        {
          "id": "b",
          "text": "{ \\$set: { rental_rate: 1.99 }, \\$push: { special_features: \"Commentaries\" } }"
        },
        {
          "id": "c",
          "text": "{ \\$push: { rental_rate: 1.99 }, \\$set: { special_features: \"Commentaries\" } }"
        },
        {
          "id": "d",
          "text": "{ \\$unset: { rental_rate: 1.99 }, \\$add: { special_features: \"Commentaries\" } }"
        }
      ],
      "correctOptionId": "b",
      "explanation": "\\$set assigns the new rental_rate; \\$push appends the feature to the array in one update.",
      "source": "/references/database-session-9-slides.pdf#page=41",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 41,
          "slideNumber": 36,
          "slideTitle": "5.7 Part B: Solutions (L6–L7)"
        }
      ]
    },
    {
      "id": "db-s9-q061",
      "prompt": "Two actors share the name “Susan Davis.” What should an aggregation use to distinguish their film counts?",
      "options": [
        {
          "id": "a",
          "text": "Group by the literal string \"Susan Davis\"."
        },
        {
          "id": "b",
          "text": "Group by the film category rather than actor."
        },
        {
          "id": "c",
          "text": "Group by actors.name only, then count all films together."
        },
        {
          "id": "d",
          "text": "Group by each actor’s actor_id rather than their shared name."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Self-practice E3 asks students to compare grouping by actors.name versus actors.actor_id; identifiers distinguish people with the same name.",
      "source": "/references/database-session-9-slides.pdf#page=42",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 42,
          "slideNumber": 37,
          "slideTitle": "5.8 Self-Practice (20 min)"
        }
      ]
    },
    {
      "id": "db-s9-q062",
      "prompt": "To list films that were never rented, which pattern does the self-practice hint suggest?",
      "options": [
        {
          "id": "a",
          "text": "Start from films, \\$lookup rentals, then test the matches with \\$size."
        },
        {
          "id": "b",
          "text": "Start from rentals and use \\$inc to reconstruct unseen films."
        },
        {
          "id": "c",
          "text": "Search customers for films with missing address fields."
        },
        {
          "id": "d",
          "text": "Update each film with a rental count and delete zero-count records."
        }
      ],
      "correctOptionId": "a",
      "explanation": "E2 explicitly suggests a lookup from films to rentals followed by a \\$size test for no matches.",
      "source": "/references/database-session-9-slides.pdf#page=42",
      "topic": "Hands-on lab and applied MQL",
      "sources": [
        {
          "kind": "lecture",
          "file": "DB9_MongoDB.pdf",
          "pdfPage": 42,
          "slideNumber": 37,
          "slideTitle": "5.8 Self-Practice (20 min)"
        }
      ]
    }
  ]
};
