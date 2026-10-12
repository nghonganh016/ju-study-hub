import type { Chapter } from "@/types/quiz";

// Question content and source metadata come from the supplied Session 1 file.
export const session1: Chapter = {
  id: "session-1",
  title: "Session 1: Advanced internals and programmability",
  description: "80 câu hỏi về PostgreSQL, thiết lập môi trường, ARRAY, UUID, JSONB, views, materialized views, functions, procedures và triggers; mỗi câu có giải thích và nguồn trang/slide.",
  revision: 1,
  questions: [
    {
      id: "db-s1-001",
      prompt: "A plain INSERT supplies an 11-character ASCII value for a VARCHAR(10) column in PostgreSQL. What should the developer expect?",
      options: [
        {
          id: "a",
          text: "A successful insert after the last character is removed.",
        },
        {
          id: "b",
          text: "A successful insert after the column expands to VARCHAR(11).",
        },
        {
          id: "c",
          text: "An error because the supplied value exceeds the column limit.",
        },
        {
          id: "d",
          text: "A NULL value in that column with the rest of the row inserted.",
        },
      ],
      correctOptionId: "c",
      explanation: "A plain INSERT of an overlength non-space value is rejected. This implements the lecture's strict checking; explicit casts have different truncation rules.",
      source: "/references/database-session-1-slides.pdf#page=6",
      topic: "Integrity",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 6,
          slideNumber: 5,
          slideTitle: "PostgreSQL vs. MySQL: Data Integrity",
        },
      ],
    },
    {
      id: "db-s1-002",
      prompt: "Why is silently truncating a customer identifier dangerous for an analytics pipeline?",
      options: [
        {
          id: "a",
          text: "The identifier gains a new data type after each insert.",
        },
        {
          id: "b",
          text: "The stored identifier necessarily becomes a globally unique key.",
        },
        {
          id: "c",
          text: "The database automatically records the removed characters elsewhere.",
        },
        {
          id: "d",
          text: "Different original identifiers can become the same stored identifier.",
        },
      ],
      correctOptionId: "d",
      explanation: "Truncation can merge distinct identifiers and damage joins or analysis. Rejecting the input exposes the problem before accepting incorrect data.",
      source: "/references/database-session-1-slides.pdf#page=6",
      topic: "Integrity",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 6,
          slideNumber: 5,
          slideTitle: "PostgreSQL vs. MySQL: Data Integrity",
        },
      ],
    },
    {
      id: "db-s1-003",
      prompt: "What does Object-Relational mean in the lecture's description of PostgreSQL?",
      options: [
        {
          id: "a",
          text: "A relational engine that accepts only its built-in scalar data types.",
        },
        {
          id: "b",
          text: "Relational tables combined with extensible types, functions and index methods.",
        },
        {
          id: "c",
          text: "A relational engine that creates a programming class for every inserted row.",
        },
        {
          id: "d",
          text: "Relational tables replaced by objects that cannot be joined using SQL.",
        },
      ],
      correctOptionId: "b",
      explanation: "Object-relational extensibility adds capabilities to the relational model; it does not remove tables, joins or SQL.",
      source: "/references/database-session-1-slides.pdf#page=7",
      topic: "Extensibility",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 7,
          slideNumber: 6,
          slideTitle: "Compliance and Extensibility",
        },
      ],
    },
    {
      id: "db-s1-004",
      prompt: "A team needs custom reusable calculations close to its relational data. Which lecture feature most directly supports this requirement?",
      options: [
        {
          id: "a",
          text: "Column defaults that execute the full calculation on every SELECT.",
        },
        {
          id: "b",
          text: "Materialized views that automatically execute procedural branches.",
        },
        {
          id: "c",
          text: "User-defined functions with supported procedural languages.",
        },
        {
          id: "d",
          text: "Regular views that accept arguments like stored routines.",
        },
      ],
      correctOptionId: "c",
      explanation: "PostgreSQL supports user-defined functions and multiple procedural languages. Some languages require installation or configuration.",
      source: "/references/database-session-1-slides.pdf#page=7",
      topic: "Extensibility",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 7,
          slideNumber: 6,
          slideTitle: "Compliance and Extensibility",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 29,
          slideNumber: 25,
          slideTitle: "Comparison: Postgres vs. MySQL Programmability",
        },
      ],
    },
    {
      id: "db-s1-005",
      prompt: "Which set contains three examples of the richer PostgreSQL types highlighted in the comparison slide?",
      options: [
        {
          id: "a",
          text: "TEXT, SMALLINT and TIMESTAMP.",
        },
        {
          id: "b",
          text: "VARCHAR, INTEGER and DATE.",
        },
        {
          id: "c",
          text: "BOOLEAN, NUMERIC and CHAR.",
        },
        {
          id: "d",
          text: "JSONB, ARRAY and Range.",
        },
      ],
      correctOptionId: "d",
      explanation: "The richer-type examples in slide 7 include JSONB, Array, Range and Geometric types. The other sets contain common scalar SQL types.",
      source: "/references/database-session-1-slides.pdf#page=8",
      topic: "Advanced types",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 8,
          slideNumber: 7,
          slideTitle: "MySQL vs. PostgreSQL: A Direct Comparison",
        },
      ],
    },
    {
      id: "db-s1-006",
      prompt: "A migration plan claims that PostgreSQL SQL can be copied into MySQL without review because both support SQL. What is the best response?",
      options: [
        {
          id: "a",
          text: "Review stored-object names only; SQL body syntax needs no changes.",
        },
        {
          id: "b",
          text: "Review data values only; advanced type definitions transfer unchanged.",
        },
        {
          id: "c",
          text: "Review dialects, types and stored-object syntax before migration.",
        },
        {
          id: "d",
          text: "Review connection settings only; both products use the same SQL dialect.",
        },
      ],
      correctOptionId: "c",
      explanation: "SQL support does not guarantee identical dialects, advanced types or programmability. The lecture explicitly compares these differences.",
      source: "/references/database-session-1-slides.pdf#page=6",
      topic: "Migration",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 6,
          slideNumber: 5,
          slideTitle: "PostgreSQL vs. MySQL: Data Integrity",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 7,
          slideNumber: 6,
          slideTitle: "Compliance and Extensibility",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 8,
          slideNumber: 7,
          slideTitle: "MySQL vs. PostgreSQL: A Direct Comparison",
        },
      ],
    },
    {
      id: "db-s1-007",
      prompt: "Which PostgreSQL mechanism is named in the lecture as supporting concurrent reads and writes through multiple row versions?",
      options: [
        {
          id: "a",
          text: "UUID generation.",
        },
        {
          id: "b",
          text: "Dollar quoting.",
        },
        {
          id: "c",
          text: "GIN.",
        },
        {
          id: "d",
          text: "MVCC.",
        },
      ],
      correctOptionId: "d",
      explanation: "Multi-Version Concurrency Control is the mechanism identified in the overview. GIN is an index method, while the other features serve different purposes.",
      source: "/references/database-session-1-slides.pdf#page=8",
      topic: "Concurrency overview",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 8,
          slideNumber: 7,
          slideTitle: "MySQL vs. PostgreSQL: A Direct Comparison",
        },
      ],
    },
    {
      id: "db-s1-008",
      prompt: "The slide contrasts PostgreSQL with historically permissive MySQL configurations. Which conclusion is justified?",
      options: [
        {
          id: "a",
          text: "Every MySQL configuration silently truncates all invalid values.",
        },
        {
          id: "b",
          text: "Input acceptance can depend on the engine and its configured validation rules.",
        },
        {
          id: "c",
          text: "PostgreSQL never accepts a value that requires any type conversion.",
        },
        {
          id: "d",
          text: "A migration can ignore validation because both products enforce identical rules.",
        },
      ],
      correctOptionId: "b",
      explanation: "The slide says MySQL might allow conversion or truncation in some modes. It should not be read as a claim that every MySQL configuration is permissive.",
      source: "/references/database-session-1-slides.pdf#page=6",
      topic: "Integrity",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 6,
          slideNumber: 5,
          slideTitle: "PostgreSQL vs. MySQL: Data Integrity",
        },
      ],
    },
    {
      id: "db-s1-009",
      prompt: "Which pairing correctly separates the database server from its administration interface?",
      options: [
        {
          id: "a",
          text: "pgAdmin 4: server; PostgreSQL engine: administration GUI.",
        },
        {
          id: "b",
          text: "PostgreSQL engine: server; pgAdmin 4: administration GUI.",
        },
        {
          id: "c",
          text: "pgAdmin 4: procedural language; PostgreSQL engine: client password.",
        },
        {
          id: "d",
          text: "PostgreSQL engine: archive format; pgAdmin 4: restore file.",
        },
      ],
      correctOptionId: "b",
      explanation: "The engine stores and processes data; pgAdmin is a graphical administration client.",
      source: "/references/database-session-1-slides.pdf#page=10",
      topic: "Environment",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 10,
          slideNumber: 8,
          slideTitle: "Installation Guide",
        },
      ],
    },
    {
      id: "db-s1-010",
      prompt: "A local connection uses the standard port shown in the installation slide. Which value is expected?",
      options: [
        {
          id: "a",
          text: "5430.",
        },
        {
          id: "b",
          text: "5433.",
        },
        {
          id: "c",
          text: "3306.",
        },
        {
          id: "d",
          text: "5432.",
        },
      ],
      correctOptionId: "d",
      explanation: "The lecture specifies PostgreSQL's default port as 5432. A particular installation may use a different configured port.",
      source: "/references/database-session-1-slides.pdf#page=10",
      topic: "Environment",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 10,
          slideNumber: 8,
          slideTitle: "Installation Guide",
        },
      ],
    },
    {
      id: "db-s1-011",
      prompt: "Which preparation matches the course's DVD Rental archive workflow?",
      options: [
        {
          id: "a",
          text: "Rename the ZIP to SQL and execute it as a function body.",
        },
        {
          id: "b",
          text: "Import the ZIP directly as one CSV table.",
        },
        {
          id: "c",
          text: "Extract the downloaded ZIP and restore the resulting TAR archive.",
        },
        {
          id: "d",
          text: "Run the TAR archive as SQL text in Query Tool.",
        },
      ],
      correctOptionId: "c",
      explanation: "The lecture uses a compressed download containing a dvdrental TAR backup, then pgAdmin's Restore action.",
      source: "/references/database-session-1-slides.pdf#page=11",
      topic: "Sample database",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 11,
          slideNumber: 9,
          slideTitle: "The Sample Database: DVD Rental",
        },
      ],
    },
    {
      id: "db-s1-012",
      prompt: "An empty dvdrental database has been created. Which pgAdmin action loads the provided dvdrental.tar backup?",
      options: [
        {
          id: "a",
          text: "Open Import/Export Data for one empty customer table.",
        },
        {
          id: "b",
          text: "Right-click dvdrental and choose Backup.",
        },
        {
          id: "c",
          text: "Open Query Tool and paste the binary archive contents.",
        },
        {
          id: "d",
          text: "Right-click dvdrental and choose Restore.",
        },
      ],
      correctOptionId: "d",
      explanation: "Restore targets the created database and reads the archive. Backup creates an archive; table import is a different workflow.",
      source: "/references/database-session-1-slides.pdf#page=12",
      topic: "Restore workflow",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 12,
          slideNumber: 10,
          slideTitle: "How to Import Data (pgAdmin 4)",
        },
      ],
    },
    {
      id: "db-s1-013",
      prompt: "The Restore button is disabled in the lecture's setup scenario. Which setting should be checked first according to the troubleshooting note?",
      options: [
        {
          id: "a",
          text: "The Binary Path pointing to the PostgreSQL bin directory.",
        },
        {
          id: "b",
          text: "The name of the target database created before opening Restore.",
        },
        {
          id: "c",
          text: "The archive compression setting used during the earlier download.",
        },
        {
          id: "d",
          text: "The file filter hiding the TAR archive in the selection dialog.",
        },
      ],
      correctOptionId: "a",
      explanation: "The slide directs students to configure pgAdmin's Binary Path to the PostgreSQL bin folder.",
      source: "/references/database-session-1-slides.pdf#page=12",
      topic: "Restore troubleshooting",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 12,
          slideNumber: 10,
          slideTitle: "How to Import Data (pgAdmin 4)",
        },
      ],
    },
    {
      id: "db-s1-014",
      prompt: "Why is DVD Rental suitable for this session's hands-on work?",
      options: [
        {
          id: "a",
          text: "Its related business tables support joins, views and triggers.",
        },
        {
          id: "b",
          text: "Its tables can be restored by treating the TAR backup as SQL text.",
        },
        {
          id: "c",
          text: "Its archive is intended to create one wide table without relationships.",
        },
        {
          id: "d",
          text: "Its rental history is already stored entirely as refreshable reports.",
        },
      ],
      correctOptionId: "a",
      explanation: "The sample models rental-store processes across 15 related tables, making it useful for the programmable objects taught in the session.",
      source: "/references/database-session-1-slides.pdf#page=11",
      topic: "Sample database",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 11,
          slideNumber: 9,
          slideTitle: "The Sample Database: DVD Rental",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 12,
          slideNumber: 10,
          slideTitle: "How to Import Data (pgAdmin 4)",
        },
      ],
    },
    {
      id: "db-s1-015",
      prompt: "A film has a short list of free-form display tags. No independent tag entity or foreign key is needed. Which type follows the lecture's recommendation?",
      options: [
        {
          id: "a",
          text: "JSONB containing one scalar string.",
        },
        {
          id: "b",
          text: "TIMESTAMP[].",
        },
        {
          id: "c",
          text: "UUID.",
        },
        {
          id: "d",
          text: "TEXT[].",
        },
      ],
      correctOptionId: "d",
      explanation: "A text array is suitable for a small simple list of strings. The type must match the elements, so TIMESTAMP[] is unsuitable.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY modeling",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-016",
      prompt: "Tags now have owners, descriptions and individual foreign-key relationships. Which design best addresses this change?",
      options: [
        {
          id: "a",
          text: "A tag table and a film-tag association table.",
        },
        {
          id: "b",
          text: "A TEXT[] containing IDs, with an ordinary foreign key on the entire array.",
        },
        {
          id: "c",
          text: "A JSONB list of IDs that automatically validates each against the tag table.",
        },
        {
          id: "d",
          text: "A VARCHAR list of IDs, relying on the column type to enforce references.",
        },
      ],
      correctOptionId: "a",
      explanation: "A relational model gives each tag its own row and enforceable relationships. The lecture warns that referential integrity on array elements is harder.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY modeling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-017",
      prompt: "Which statement adds the tag column used in the lecture?",
      options: [
        {
          id: "a",
          text: "ALTER TABLE film ADD COLUMN tags TEXT ARRAY OF film;",
        },
        {
          id: "b",
          text: "ALTER TABLE film ADD COLUMN tags ARRAY(TEXT);",
        },
        {
          id: "c",
          text: "ALTER TABLE film ADD COLUMN tags JSONB[] OF TEXT;",
        },
        {
          id: "d",
          text: "ALTER TABLE film ADD COLUMN tags TEXT[];",
        },
      ],
      correctOptionId: "d",
      explanation: "TEXT[] declares an array whose elements have type text. The other proposed declarations are not the shown PostgreSQL syntax.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY syntax",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-018",
      prompt: "Which assignment stores two separate text elements in a TEXT[] column?",
      options: [
        {
          id: "a",
          text: "SET tags = ARRAY['Classic']",
        },
        {
          id: "b",
          text: "SET tags = ARRAY['Action']",
        },
        {
          id: "c",
          text: "SET tags = ARRAY['Action', 'Classic']",
        },
        {
          id: "d",
          text: "SET tags = ARRAY['Action,Classic']",
        },
      ],
      correctOptionId: "c",
      explanation: "The first expression has two elements. A comma inside a single quoted string belongs to one element.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY syntax",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-019",
      prompt: "Which predicate finds films whose tags array contains the exact element 'Action'?",
      options: [
        {
          id: "a",
          text: "tags[1] = 'Action'",
        },
        {
          id: "b",
          text: "'Action' = ANY(tags)",
        },
        {
          id: "c",
          text: "'Action' = ALL(tags)",
        },
        {
          id: "d",
          text: "tags = ARRAY['Action']",
        },
      ],
      correctOptionId: "b",
      explanation: "ANY tests each element and succeeds on a match. ALL requires every element to match; whole-array equality and checking the first element are more restrictive.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY query",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-020",
      prompt: "Given tags = ARRAY['Classic','Action'], which result follows from SELECT 'Action' = ANY(tags), 'Action' = ALL(tags);?",
      options: [
        {
          id: "a",
          text: "(false, true).",
        },
        {
          id: "b",
          text: "(true, true).",
        },
        {
          id: "c",
          text: "(true, false).",
        },
        {
          id: "d",
          text: "(false, false).",
        },
      ],
      correctOptionId: "c",
      explanation: "Action matches at least one element, but Classic prevents the ALL condition from being true.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY query",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-021",
      prompt: "Which is the clearest cost of using ARRAY for a collection of referenced entities?",
      options: [
        {
          id: "a",
          text: "Every array element is automatically a primary key.",
        },
        {
          id: "b",
          text: "Every membership test requires a relational JOIN.",
        },
        {
          id: "c",
          text: "Element-level referential integrity is harder to enforce.",
        },
        {
          id: "d",
          text: "Each array requires its own PostgreSQL server.",
        },
      ],
      correctOptionId: "c",
      explanation: "Arrays can simplify small collections and avoid joins, but ordinary element-level foreign-key enforcement is a modeling drawback.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY modeling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-022",
      prompt: "Rows 1, 2 and 3 have tags ARRAY['Action','Classic'], ARRAY['Classic'] and ARRAY['Action'], respectively. Which IDs satisfy WHERE 'Action' = ANY(tags)?",
      options: [
        {
          id: "a",
          text: "Only 1.",
        },
        {
          id: "b",
          text: "Only 3.",
        },
        {
          id: "c",
          text: "1 and 3.",
        },
        {
          id: "d",
          text: "1, 2 and 3.",
        },
      ],
      correctOptionId: "c",
      explanation: "Both rows 1 and 3 contain the Action element. ANY does not require the array to contain only Action.",
      source: "/references/database-session-1-slides.pdf#page=14",
      topic: "ARRAY query",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 14,
          slideNumber: 11,
          slideTitle: "The ARRAY Data Type",
        },
      ],
    },
    {
      id: "db-s1-023",
      prompt: "What is the size of a UUID value, excluding row and index overhead?",
      options: [
        {
          id: "a",
          text: "64 bits (8 bytes).",
        },
        {
          id: "b",
          text: "256 bits (32 bytes).",
        },
        {
          id: "c",
          text: "128 bits (16 bytes).",
        },
        {
          id: "d",
          text: "32 bits (4 bytes).",
        },
      ],
      correctOptionId: "c",
      explanation: "The lecture describes UUID as a 128-bit identifier. The longer textual representation is different from its stored value size.",
      source: "/references/database-session-1-slides.pdf#page=16",
      topic: "UUID storage",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
      ],
    },
    {
      id: "db-s1-024",
      prompt: "Two offline mobile clients create new order IDs before connecting to the server. What is the main reason to consider UUIDs?",
      options: [
        {
          id: "a",
          text: "They make a database primary-key constraint optional during later imports.",
        },
        {
          id: "b",
          text: "They encode the complete creation order of every offline order by default.",
        },
        {
          id: "c",
          text: "They coordinate the next sequential integer across the offline clients.",
        },
        {
          id: "d",
          text: "They support decentralized ID generation without requesting the next counter value.",
        },
      ],
      correctOptionId: "d",
      explanation: "UUIDs are useful when independent systems generate identifiers. A primary-key constraint still protects stored uniqueness.",
      source: "/references/database-session-1-slides.pdf#page=15",
      topic: "UUID generation",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 15,
          slideNumber: 12,
          slideTitle: "UUID (Universally Unique Identifier)",
        },
      ],
    },
    {
      id: "db-s1-025",
      prompt: "An API changes order IDs from sequential integers to random UUIDs. What security conclusion is valid?",
      options: [
        {
          id: "a",
          text: "The UUID encrypts the order details stored in the database.",
        },
        {
          id: "b",
          text: "The API can remove all authorization checks for order lookups.",
        },
        {
          id: "c",
          text: "Guessing sequential IDs is harder, but ownership checks are still required.",
        },
        {
          id: "d",
          text: "Knowing an order UUID grants permission to read that order.",
        },
      ],
      correctOptionId: "c",
      explanation: "UUIDs reduce predictable enumeration; identifier unpredictability is not an authorization mechanism.",
      source: "/references/database-session-1-slides.pdf#page=15",
      topic: "UUID and security",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 15,
          slideNumber: 12,
          slideTitle: "UUID (Universally Unique Identifier)",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
      ],
    },
    {
      id: "db-s1-026",
      prompt: "Two branches both used integer order_id = 1 for different orders. Why might random UUIDs reduce future merge conflicts?",
      options: [
        {
          id: "a",
          text: "Independent generators are very unlikely to issue the same random identifier.",
        },
        {
          id: "b",
          text: "A UUID primary key treats matching IDs as distinct when they come from different branches.",
        },
        {
          id: "c",
          text: "The UUID type resolves any duplicate value by renaming one row during import.",
        },
        {
          id: "d",
          text: "The UUID type stores the branch name and enforces uniqueness only within that branch.",
        },
      ],
      correctOptionId: "a",
      explanation: "Decentralized random generation greatly lowers collision risk. UUIDs do not automatically reconcile imported duplicates or business conflicts.",
      source: "/references/database-session-1-slides.pdf#page=15",
      topic: "UUID merge",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 15,
          slideNumber: 12,
          slideTitle: "UUID (Universally Unique Identifier)",
        },
      ],
    },
    {
      id: "db-s1-027",
      prompt: "A table has order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(). An INSERT supplies only customer_id. What happens to order_id?",
      options: [
        {
          id: "a",
          text: "The default applies only when the client sends an explicit NULL.",
        },
        {
          id: "b",
          text: "The default runs when RETURNING reads the row, after insertion has finished.",
        },
        {
          id: "c",
          text: "The primary-key constraint generates the UUID without using the default.",
        },
        {
          id: "d",
          text: "The default generates a UUID for the inserted row.",
        },
      ],
      correctOptionId: "d",
      explanation: "Omitting a column lets its declared default run during insertion. PRIMARY KEY also disallows a stored NULL.",
      source: "/references/database-session-1-slides.pdf#page=16",
      topic: "UUID defaults",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
      ],
    },
    {
      id: "db-s1-028",
      prompt: "The same order_id definition is used, but the INSERT explicitly supplies NULL for order_id. What happens?",
      options: [
        {
          id: "a",
          text: "NULL is accepted because UUID values are optional by definition.",
        },
        {
          id: "b",
          text: "The insert fails the primary key's NOT NULL requirement.",
        },
        {
          id: "c",
          text: "NULL is converted into a random integer primary key.",
        },
        {
          id: "d",
          text: "The default replaces the explicit NULL automatically.",
        },
      ],
      correctOptionId: "b",
      explanation: "A default applies to an omitted column or the DEFAULT keyword, not an explicitly supplied NULL. The primary key rejects NULL.",
      source: "/references/database-session-1-slides.pdf#page=16",
      topic: "UUID defaults",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
      ],
    },
    {
      id: "db-s1-029",
      prompt: "Which clause lets the client obtain the generated order_id from the same INSERT statement?",
      options: [
        {
          id: "a",
          text: "GROUP BY order_id.",
        },
        {
          id: "b",
          text: "RETURNING order_id.",
        },
        {
          id: "c",
          text: "ORDER BY order_id.",
        },
        {
          id: "d",
          text: "REFERENCES order_id.",
        },
      ],
      correctOptionId: "b",
      explanation: "RETURNING returns values from the inserted row, including defaults, without an extra lookup.",
      source: "/references/database-session-1-slides.pdf#page=16",
      topic: "UUID syntax",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
      ],
    },
    {
      id: "db-s1-030",
      prompt: "On PostgreSQL 16, which statement about gen_random_uuid() corrects an unnecessary step in the slide's example?",
      options: [
        {
          id: "a",
          text: "It is a pgAdmin client command rather than a server function.",
        },
        {
          id: "b",
          text: "It is available in core PostgreSQL; uuid-ossp is not required for this function.",
        },
        {
          id: "c",
          text: "It returns INTEGER unless uuid-ossp changes its return type.",
        },
        {
          id: "d",
          text: "It is available only after enabling the uuid-ossp extension.",
        },
      ],
      correctOptionId: "b",
      explanation: "PostgreSQL 16 includes gen_random_uuid(), which returns a random version-4 UUID. uuid-ossp provides additional UUID algorithms.",
      source: "/references/database-session-1-slides.pdf#page=16",
      topic: "UUID generation",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 16,
          slideNumber: 13,
          slideTitle: "UUID: Secure Distributed Identifiers",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: UUID functions",
          url: "https://www.postgresql.org/docs/16/functions-uuid.html",
          section: "9.14",
        },
      ],
    },
    {
      id: "db-s1-031",
      prompt: "Films have optional technical attributes such as resolution, fps and hdr. Which type best matches the lecture's metadata example?",
      options: [
        {
          id: "a",
          text: "TEXT[] of attribute values.",
        },
        {
          id: "b",
          text: "A UUID[] of attribute IDs.",
        },
        {
          id: "c",
          text: "A single TEXT value with client-side parsing.",
        },
        {
          id: "d",
          text: "JSONB.",
        },
      ],
      correctOptionId: "d",
      explanation: "JSONB can store structured metadata with values of different JSON types while the film remains a relational row.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB modeling",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
      ],
    },
    {
      id: "db-s1-032",
      prompt: "What storage and processing trade-off does the lecture associate with JSONB?",
      options: [
        {
          id: "a",
          text: "Normalizing into separate relational rows eliminates JSON parsing while preserving JSONB storage.",
        },
        {
          id: "b",
          text: "Delaying JSON validation until SELECT reduces input cost but makes every read validate the document.",
        },
        {
          id: "c",
          text: "Parsing into a decomposed representation adds input work but helps repeated processing.",
        },
        {
          id: "d",
          text: "Preserving the original JSON text saves input parsing but reparses it during each operation.",
        },
      ],
      correctOptionId: "c",
      explanation: "JSONB uses a decomposed binary representation. The lecture's faster-processing claim is a general trade-off, not a guarantee for every query.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB storage",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: JSON types",
          url: "https://www.postgresql.org/docs/16/datatype-json.html",
          section: "8.14",
        },
      ],
    },
    {
      id: "db-s1-033",
      prompt: "stats is JSONB. Which predicate matches the slide's query for resolution 4K?",
      options: [
        {
          id: "a",
          text: "stats ->> 'fps' = '4K'",
        },
        {
          id: "b",
          text: "stats ->> 'resolution' = '4K'",
        },
        {
          id: "c",
          text: "stats ->> 'hdr' = '4K'",
        },
        {
          id: "d",
          text: "stats ->> 'resolution' = 'HD'",
        },
      ],
      correctOptionId: "b",
      explanation: "The ->> operator extracts the selected field as text; the correct key and comparison value are resolution and 4K.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB operators",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
      ],
    },
    {
      id: "db-s1-034",
      prompt: "For stats = '{\"resolution\":\"4K\",\"fps\":60}'::jsonb, what is the type returned by stats ->> 'fps'?",
      options: [
        {
          id: "a",
          text: "TEXT.",
        },
        {
          id: "b",
          text: "BOOLEAN.",
        },
        {
          id: "c",
          text: "JSONB.",
        },
        {
          id: "d",
          text: "INTEGER.",
        },
      ],
      correctOptionId: "a",
      explanation: "->> returns text even when the stored JSON value is numeric. A numeric SQL comparison needs an appropriate cast.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB operators",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: JSON functions and operators",
          url: "https://www.postgresql.org/docs/16/functions-json.html",
          section: "9.16",
        },
      ],
    },
    {
      id: "db-s1-035",
      prompt: "fps is always a valid integer in this exercise. Which predicate performs a numeric test for fps greater than 30?",
      options: [
        {
          id: "a",
          text: "stats ->> 'resolution' = '60'",
        },
        {
          id: "b",
          text: "(stats ->> 'fps')::integer > 30",
        },
        {
          id: "c",
          text: "(stats ->> 'fps')::integer = 30",
        },
        {
          id: "d",
          text: "stats ->> 'fps' > '30'",
        },
      ],
      correctOptionId: "b",
      explanation: "Extracting text and casting to integer gives numeric comparison. A text comparison is lexicographic and can misorder values such as 100 and 30.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB query",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: JSON functions and operators",
          url: "https://www.postgresql.org/docs/16/functions-json.html",
          section: "9.16",
        },
      ],
    },
    {
      id: "db-s1-036",
      prompt: "Three rows have stats '{\"resolution\":\"4K\"}', '{\"resolution\":\"HD\"}' and '{}' respectively. Which rows pass WHERE stats ->> 'resolution' = '4K'?",
      options: [
        {
          id: "a",
          text: "Only the first row.",
        },
        {
          id: "b",
          text: "The first and second rows.",
        },
        {
          id: "c",
          text: "The first and third rows.",
        },
        {
          id: "d",
          text: "All three rows.",
        },
      ],
      correctOptionId: "a",
      explanation: "The first text value equals 4K. The missing field in the third row produces SQL NULL, which does not pass this WHERE condition.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB query",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: JSON functions and operators",
          url: "https://www.postgresql.org/docs/16/functions-json.html",
          section: "9.16",
        },
      ],
    },
    {
      id: "db-s1-037",
      prompt: "Which index method is highlighted in the lecture for indexing JSONB content?",
      options: [
        {
          id: "a",
          text: "B-Tree only.",
        },
        {
          id: "b",
          text: "Hash only.",
        },
        {
          id: "c",
          text: "GIN.",
        },
        {
          id: "d",
          text: "A refresh schedule.",
        },
      ],
      correctOptionId: "c",
      explanation: "The slide highlights GIN support for JSONB. Whether an index helps depends on the operator, expression and workload.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB indexing",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
      ],
    },
    {
      id: "db-s1-038",
      prompt: "A developer adds a generic GIN index on stats, then expects every stats ->> field comparison to become an index lookup. What is the best assessment?",
      options: [
        {
          id: "a",
          text: "GIN indexes automatically rewrite every text-extraction expression.",
        },
        {
          id: "b",
          text: "GIN prevents the use of a WHERE clause on JSONB columns.",
        },
        {
          id: "c",
          text: "GIN makes JSONB contents refresh only when a cron job runs.",
        },
        {
          id: "d",
          text: "The index must match a supported operator or expression; this is not guaranteed.",
        },
      ],
      correctOptionId: "d",
      explanation: "A generic JSONB GIN index supports particular JSONB operators. A ->> equality may instead need a matching expression index; GIN support is not universal.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB indexing",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: JSON types",
          url: "https://www.postgresql.org/docs/16/datatype-json.html",
          section: "8.14",
        },
      ],
    },
    {
      id: "db-s1-039",
      prompt: "Which schema combines conventional integrity rules with flexible technical metadata?",
      options: [
        {
          id: "a",
          text: "One JSONB document per film, relying on JSONB itself to enforce all customer references.",
        },
        {
          id: "b",
          text: "A JSONB column for every film identifier, with UUID defaults automatically validating its keys.",
        },
        {
          id: "c",
          text: "A TEXT[] of field values, relying on each position to enforce the declared JSON value types.",
        },
        {
          id: "d",
          text: "Relational film identifiers and relationships, with a JSONB stats column.",
        },
      ],
      correctOptionId: "d",
      explanation: "The lecture adds JSONB to film rather than replacing the relational schema. Flexible attributes can coexist with typed keys and relationships.",
      source: "/references/database-session-1-slides.pdf#page=17",
      topic: "JSONB modeling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 17,
          slideNumber: 14,
          slideTitle: "JSONB (Binary JSON)",
        },
      ],
    },
    {
      id: "db-s1-040",
      prompt: "What does a regular PostgreSQL view store as its defining database object?",
      options: [
        {
          id: "a",
          text: "A query definition rather than a persistent copy of its result rows.",
        },
        {
          id: "b",
          text: "A result snapshot that is replaced only when a manual refresh runs.",
        },
        {
          id: "c",
          text: "A copy of source rows synchronized by automatically created write triggers.",
        },
        {
          id: "d",
          text: "A cached result set invalidated whenever a referenced base table changes.",
        },
      ],
      correctOptionId: "a",
      explanation: "A regular view stores a definition and evaluates the underlying query when referenced. It does not cache its result set like a materialized view.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "Views",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
      ],
    },
    {
      id: "db-s1-041",
      prompt: "A complex monthly rental report takes 30 seconds and can tolerate delayed updates. Which design best matches the lecture?",
      options: [
        {
          id: "a",
          text: "A materialized view with an explicit refresh policy.",
        },
        {
          id: "b",
          text: "A UUID column replacing the report's aggregate.",
        },
        {
          id: "c",
          text: "A BEFORE trigger returning NULL for all new rentals.",
        },
        {
          id: "d",
          text: "A regular view with the same joins and no other change.",
        },
      ],
      correctOptionId: "a",
      explanation: "A materialized view stores precomputed results, trading freshness and refresh work for faster report reads.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "Materialized views",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
      ],
    },
    {
      id: "db-s1-042",
      prompt: "Which command recomputes the stored rows of film_stats_cached?",
      options: [
        {
          id: "a",
          text: "REFRESH MATERIALIZED VIEW film_stats_cached;",
        },
        {
          id: "b",
          text: "SELECT * FROM film_stats_cached;",
        },
        {
          id: "c",
          text: "CREATE VIEW film_stats_cached AS SELECT * FROM film_stats;",
        },
        {
          id: "d",
          text: "CALL film_stats_cached();",
        },
      ],
      correctOptionId: "a",
      explanation: "REFRESH MATERIALIZED VIEW re-executes the defining query and replaces the stored result. SELECT only reads the existing result.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "Materialized views",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
      ],
    },
    {
      id: "db-s1-043",
      prompt: "A regular view and a materialized view each report 10 rentals. One more rental is committed, and no refresh occurs. In a new ordinary read, what counts should be expected?",
      options: [
        {
          id: "a",
          text: "Regular view: 11; materialized view: 11.",
        },
        {
          id: "b",
          text: "Regular view: 10; materialized view: 11.",
        },
        {
          id: "c",
          text: "Regular view: 11; materialized view: 10.",
        },
        {
          id: "d",
          text: "Regular view: 10; materialized view: 10.",
        },
      ],
      correctOptionId: "c",
      explanation: "The regular view computes against the data visible to its query; the materialized view retains its last stored result until refreshed.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "Materialized views",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
      ],
    },
    {
      id: "db-s1-044",
      prompt: "Which resource trade-off best describes a materialized view used for repeated reports?",
      options: [
        {
          id: "a",
          text: "A full source-table copy in exchange for always seeing the newest committed rows.",
        },
        {
          id: "b",
          text: "More storage and refresh work in exchange for less repeated query computation.",
        },
        {
          id: "c",
          text: "Automatic incremental write maintenance in exchange for eliminating all refresh work.",
        },
        {
          id: "d",
          text: "Less storage in exchange for rerunning the defining aggregate on every read.",
        },
      ],
      correctOptionId: "b",
      explanation: "Materialized views consume disk space and must be maintained through refreshes, but repeated reads can reuse stored computations.",
      source: "/references/database-session-1-slides.pdf#page=20",
      topic: "Materialized views",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
      ],
    },
    {
      id: "db-s1-045",
      prompt: "A dashboard tolerates roughly hourly updates. Which policy most directly matches the lecture's use case?",
      options: [
        {
          id: "a",
          text: "Refresh synchronously after each row-level write.",
        },
        {
          id: "b",
          text: "Use a regular view configured to store one-hour snapshots.",
        },
        {
          id: "c",
          text: "Schedule a refresh every hour.",
        },
        {
          id: "d",
          text: "Create the materialized view once and rely on SELECT to update it.",
        },
      ],
      correctOptionId: "c",
      explanation: "The slide gives hourly refresh of top-customer dashboards as a scheduled use case. The schedule and completion time must be monitored in practice.",
      source: "/references/database-session-1-slides.pdf#page=21",
      topic: "Refresh scheduling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
      ],
    },
    {
      id: "db-s1-046",
      prompt: "A materialized view is refreshed successfully at 09:00, 10:00 and 11:00. A rental committed at 09:01 is included in the next refresh. For about how long is it absent from the cached report?",
      options: [
        {
          id: "a",
          text: "1 minute.",
        },
        {
          id: "b",
          text: "60 seconds.",
        },
        {
          id: "c",
          text: "59 minutes.",
        },
        {
          id: "d",
          text: "119 minutes.",
        },
      ],
      correctOptionId: "c",
      explanation: "The next completed refresh is 10:00, so the example's lag is 59 minutes. This assumes the stated refreshes succeed and complete at those times.",
      source: "/references/database-session-1-slides.pdf#page=21",
      topic: "Refresh scheduling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
      ],
    },
    {
      id: "db-s1-047",
      prompt: "Why can REFRESH inside a FOR EACH ROW write trigger harm a high-volume rental workload?",
      options: [
        {
          id: "a",
          text: "It automatically updates only the changed group, without running the defining query.",
        },
        {
          id: "b",
          text: "It adds computation only to dashboard reads, leaving inserts unaffected.",
        },
        {
          id: "c",
          text: "It can repeatedly recompute the report during the write path.",
        },
        {
          id: "d",
          text: "It queues one asynchronous refresh per hour regardless of how many rows trigger it.",
        },
      ],
      correctOptionId: "c",
      explanation: "The lecture cautions that trigger-based refresh can slow inserts and updates. Repeating a costly full refresh for many rows can defeat the intended benefit.",
      source: "/references/database-session-1-slides.pdf#page=21",
      topic: "Refresh scheduling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
      ],
    },
    {
      id: "db-s1-048",
      prompt: "Which statement creates a stored snapshot of the existing regular view film_stats?",
      options: [
        {
          id: "a",
          text: "CREATE FUNCTION film_stats_cached() RETURNS trigger AS $$ BEGIN RETURN NULL; END; $$ LANGUAGE plpgsql;",
        },
        {
          id: "b",
          text: "SELECT * FROM film_stats;",
        },
        {
          id: "c",
          text: "CREATE MATERIALIZED VIEW film_stats_cached AS SELECT * FROM film_stats;",
        },
        {
          id: "d",
          text: "CREATE VIEW film_stats_cached AS SELECT * FROM film_stats;",
        },
      ],
      correctOptionId: "c",
      explanation: "CREATE MATERIALIZED VIEW stores the query result. CREATE VIEW stores only a definition; reading or declaring a trigger function creates no snapshot.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "View syntax",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
      ],
    },
    {
      id: "db-s1-049",
      prompt: "A monthly summary is requested only when a manager asks for the latest report. Which policy best matches that usage?",
      options: [
        {
          id: "a",
          text: "Use a regular view and manually refresh its stored result before each report.",
        },
        {
          id: "b",
          text: "Refresh on demand before serving the requested current summary.",
        },
        {
          id: "c",
          text: "Create the materialized view once and rely on base-table updates to maintain it.",
        },
        {
          id: "d",
          text: "Query the materialized view and rely on that SELECT to recompute its rows.",
        },
      ],
      correctOptionId: "b",
      explanation: "Manual refresh is appropriate for infrequent on-demand reports. Reads alone do not refresh a materialized view.",
      source: "/references/database-session-1-slides.pdf#page=21",
      topic: "Refresh scheduling",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
      ],
    },
    {
      id: "db-s1-050",
      prompt: "An inventory screen must reflect base-table changes visible to each new query, with no cache refresh interval. Which object directly meets this requirement?",
      options: [
        {
          id: "a",
          text: "A stored report table loaded at the start of the month.",
        },
        {
          id: "b",
          text: "A materialized view refreshed only during deployment.",
        },
        {
          id: "c",
          text: "A regular view over the current inventory tables.",
        },
        {
          id: "d",
          text: "A materialized view refreshed every night.",
        },
      ],
      correctOptionId: "c",
      explanation: "A regular view evaluates the query rather than reading a stale stored snapshot. Its visibility is still governed by the querying transaction.",
      source: "/references/database-session-1-slides.pdf#page=19",
      topic: "Views",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 19,
          slideNumber: 15,
          slideTitle: "Views vs. Materialized Views",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: CREATE VIEW",
          url: "https://www.postgresql.org/docs/16/sql-createview.html",
          section: "Description",
        },
      ],
    },
    {
      id: "db-s1-051",
      prompt: "An analyst refreshes a materialized view, then new base rows are committed before the analyst reads it. Which statement is correct?",
      options: [
        {
          id: "a",
          text: "It reflects its refresh snapshot, not necessarily the later commits.",
        },
        {
          id: "b",
          text: "The base inserts cannot commit until that view is next read.",
        },
        {
          id: "c",
          text: "Its SELECT automatically includes every commit after the refresh.",
        },
        {
          id: "d",
          text: "The regular view definition is replaced by the new base rows.",
        },
      ],
      correctOptionId: "a",
      explanation: "Materialization captures the results visible during refresh. Subsequent base changes do not maintain the stored rows automatically.",
      source: "/references/database-session-1-slides.pdf#page=20",
      topic: "Materialized views",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 20,
          slideNumber: 16,
          slideTitle: "Deep Dive: View vs. Materialized View",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 21,
          slideNumber: 17,
          slideTitle: "When to Refresh Materialized Views?",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: REFRESH MATERIALIZED VIEW",
          url: "https://www.postgresql.org/docs/16/sql-refreshmaterializedview.html",
          section: "Description",
        },
      ],
    },
    {
      id: "db-s1-052",
      prompt: "What is the main role of $$ ... $$ around the PL/pgSQL function body?",
      options: [
        {
          id: "a",
          text: "To declare that every variable in the body has type NUMERIC.",
        },
        {
          id: "b",
          text: "To open and commit a SQL transaction around every statement in the body.",
        },
        {
          id: "c",
          text: "To specify that the function returns a set rather than a scalar.",
        },
        {
          id: "d",
          text: "To delimit a string literal containing the body, including internal quotes and semicolons.",
        },
      ],
      correctOptionId: "d",
      explanation: "Dollar quoting represents the function-body string conveniently. It does not control transactions or set the return type.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function syntax",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Lexical structure",
          url: "https://www.postgresql.org/docs/16/sql-syntax-lexical.html",
          section: "4.1.2.4",
        },
      ],
    },
    {
      id: "db-s1-053",
      prompt: "Which placement follows the PL/pgSQL block structure shown in the lecture?",
      options: [
        {
          id: "a",
          text: "Place every local variable after END and before the LANGUAGE clause.",
        },
        {
          id: "b",
          text: "DECLARE variables, then BEGIN executable statements, then END.",
        },
        {
          id: "c",
          text: "Place every local variable in the function argument list instead of DECLARE.",
        },
        {
          id: "d",
          text: "BEGIN executable statements, then DECLARE local variables, then END.",
        },
      ],
      correctOptionId: "b",
      explanation: "An optional DECLARE section precedes BEGIN. The executable section ends with END; the return type is specified outside the block.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function syntax",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
      ],
    },
    {
      id: "db-s1-054",
      prompt: "In CREATE FUNCTION get_fee(id INT) RETURNS NUMERIC ... LANGUAGE plpgsql, which element declares the output type?",
      options: [
        {
          id: "a",
          text: "The dollar-quote delimiter.",
        },
        {
          id: "b",
          text: "RETURNS NUMERIC.",
        },
        {
          id: "c",
          text: "id INT.",
        },
        {
          id: "d",
          text: "LANGUAGE plpgsql.",
        },
      ],
      correctOptionId: "b",
      explanation: "RETURNS specifies the function result type; the argument declaration specifies input, and LANGUAGE chooses the implementation language.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function syntax",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
      ],
    },
    {
      id: "db-s1-055",
      prompt: "A scalar PL/pgSQL function has RETURNS NUMERIC and a local variable fee NUMERIC. Which statement returns that value to its caller?",
      options: [
        {
          id: "a",
          text: "RETURN fee;",
        },
        {
          id: "b",
          text: "RETURN NEW;",
        },
        {
          id: "c",
          text: "DECLARE fee;",
        },
        {
          id: "d",
          text: "CALL fee;",
        },
      ],
      correctOptionId: "a",
      explanation: "A scalar function returns a compatible expression with RETURN. NEW is a special trigger variable, not an ordinary scalar-function result.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Scalar functions",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
      ],
    },
    {
      id: "db-s1-056",
      prompt: "get_fee(integer) is a scalar function. Which statement invokes it to obtain a value?",
      options: [
        {
          id: "a",
          text: "EXECUTE get_fee(1);",
        },
        {
          id: "b",
          text: "SELECT * FROM get_fee;",
        },
        {
          id: "c",
          text: "CALL get_fee(1);",
        },
        {
          id: "d",
          text: "SELECT get_fee(1);",
        },
      ],
      correctOptionId: "d",
      explanation: "Functions can be called in SQL expressions using SELECT. CALL is the invocation form for procedures.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function invocation",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 23,
          slideNumber: 19,
          slideTitle: "Why is Postgres More Powerful for Developers?",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: CALL",
          url: "https://www.postgresql.org/docs/16/sql-call.html",
          section: "Notes",
        },
      ],
    },
    {
      id: "db-s1-057",
      prompt: "A function declared RETURNS TABLE(customer_id INT, total NUMERIC) is used in another query. Which form treats its result as a relation?",
      options: [
        {
          id: "a",
          text: "CALL customer_totals();",
        },
        {
          id: "b",
          text: "SELECT * FROM customer_totals();",
        },
        {
          id: "c",
          text: "CREATE TABLE customer_totals();",
        },
        {
          id: "d",
          text: "REFRESH MATERIALIZED VIEW customer_totals();",
        },
      ],
      correctOptionId: "b",
      explanation: "A table-valued function can appear in FROM and provide rows and columns that compose with the surrounding SQL.",
      source: "/references/database-session-1-slides.pdf#page=23",
      topic: "Table-valued functions",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 23,
          slideNumber: 19,
          slideTitle: "Why is Postgres More Powerful for Developers?",
        },
      ],
    },
    {
      id: "db-s1-058",
      prompt: "What benefit does a table-valued function provide over copying its query into every consumer?",
      options: [
        {
          id: "a",
          text: "A parameterized result cache that refreshes itself whenever the source tables change.",
        },
        {
          id: "b",
          text: "A routine that automatically commits each returned row as a separate transaction.",
        },
        {
          id: "c",
          text: "A reusable query that must run separately and cannot appear in a FROM clause.",
        },
        {
          id: "d",
          text: "Reusable parameterized row-producing logic that can compose with SQL queries.",
        },
      ],
      correctOptionId: "d",
      explanation: "Table-valued functions improve modularity and reuse. Returning rows does not imply caching or automatic transaction control.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Table-valued functions",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 23,
          slideNumber: 19,
          slideTitle: "Why is Postgres More Powerful for Developers?",
        },
      ],
    },
    {
      id: "db-s1-059",
      prompt: "A function body contains RETURN 'O''Brien'; and several semicolons. Why can dollar quoting make the CREATE FUNCTION statement easier to write?",
      options: [
        {
          id: "a",
          text: "Dollar quoting removes all dialect differences between PostgreSQL and MySQL function bodies.",
        },
        {
          id: "b",
          text: "Dollar quoting replaces the need to quote text values inside the executable body.",
        },
        {
          id: "c",
          text: "The body's quotes and semicolons can remain inside one delimited body string.",
        },
        {
          id: "d",
          text: "Dollar quoting changes the client delimiter so PostgreSQL ignores every internal semicolon.",
        },
      ],
      correctOptionId: "c",
      explanation: "Dollar quoting avoids escaping the whole body as an outer single-quoted literal. Inner SQL literals still follow their own quoting rules.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function quoting",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 23,
          slideNumber: 19,
          slideTitle: "Why is Postgres More Powerful for Developers?",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Lexical structure",
          url: "https://www.postgresql.org/docs/16/sql-syntax-lexical.html",
          section: "4.1.2.4",
        },
      ],
    },
    {
      id: "db-s1-060",
      prompt: "Which statement corrects the slide's description of dollar quoting as SQL-standard syntax?",
      options: [
        {
          id: "a",
          text: "Dollar quoting is mandatory SQL-standard syntax for all stored functions.",
        },
        {
          id: "b",
          text: "Dollar quoting is a pgAdmin-only delimiter command.",
        },
        {
          id: "c",
          text: "Dollar quoting is a PostgreSQL extension for writing string constants.",
        },
        {
          id: "d",
          text: "Dollar quoting is the SQL-standard way to delimit table identifiers.",
        },
      ],
      correctOptionId: "c",
      explanation: "The official manual explicitly says dollar quoting is not part of the SQL standard. Its practical benefit in PostgreSQL remains valid.",
      source: "/references/database-session-1-slides.pdf#page=23",
      topic: "Function quoting",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 23,
          slideNumber: 19,
          slideTitle: "Why is Postgres More Powerful for Developers?",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Lexical structure",
          url: "https://www.postgresql.org/docs/16/sql-syntax-lexical.html",
          section: "4.1.2.4",
        },
      ],
    },
    {
      id: "db-s1-061",
      prompt: "Which statement correctly interprets the lecture's list PL/pgSQL, Python, Perl and C?",
      options: [
        {
          id: "a",
          text: "They are return-type declarations that determine the columns produced by a function.",
        },
        {
          id: "b",
          text: "They are all available in every installation without any additional language components.",
        },
        {
          id: "c",
          text: "They are client languages that pgAdmin executes instead of storing logic in the server.",
        },
        {
          id: "d",
          text: "They illustrate supported implementation options, subject to installation and configuration.",
        },
      ],
      correctOptionId: "d",
      explanation: "PostgreSQL programmability supports several languages. A particular language may require components or extensions before it can be used.",
      source: "/references/database-session-1-slides.pdf#page=29",
      topic: "Procedural languages",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 29,
          slideNumber: 25,
          slideTitle: "Comparison: Postgres vs. MySQL Programmability",
        },
      ],
    },
    {
      id: "db-s1-062",
      prompt: "transfer_funds is a PostgreSQL procedure taking two account IDs and an amount. Which invocation is appropriate?",
      options: [
        {
          id: "a",
          text: "EXECUTE FUNCTION transfer_funds(1, 2, 100);",
        },
        {
          id: "b",
          text: "CALL transfer_funds(1, 2, 100);",
        },
        {
          id: "c",
          text: "SELECT transfer_funds(1, 2, 100);",
        },
        {
          id: "d",
          text: "REFRESH transfer_funds(1, 2, 100);",
        },
      ],
      correctOptionId: "b",
      explanation: "The lecture uses CALL for procedures. SELECT evaluates functions, and EXECUTE FUNCTION is part of trigger binding syntax.",
      source: "/references/database-session-1-slides.pdf#page=24",
      topic: "Procedure invocation",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
      ],
    },
    {
      id: "db-s1-063",
      prompt: "A routine must commit batches internally and will be invoked in a permitted top-level context. Which PostgreSQL object directly supports this capability?",
      options: [
        {
          id: "a",
          text: "A row-level trigger function.",
        },
        {
          id: "b",
          text: "A procedure.",
        },
        {
          id: "c",
          text: "A scalar function called by SELECT.",
        },
        {
          id: "d",
          text: "A regular view.",
        },
      ],
      correctOptionId: "b",
      explanation: "Procedures invoked in an eligible CALL context can perform transaction control. Ordinary functions and trigger functions cannot commit independently.",
      source: "/references/database-session-1-slides.pdf#page=24",
      topic: "Procedure transactions",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: PL/pgSQL transaction management",
          url: "https://www.postgresql.org/docs/16/plpgsql-transactions.html",
          section: "43.8",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: CALL",
          url: "https://www.postgresql.org/docs/16/sql-call.html",
          section: "Notes",
        },
      ],
    },
    {
      id: "db-s1-064",
      prompt: "A procedure contains COMMIT. It is invoked as BEGIN; CALL batch_job(); COMMIT;. What is the important restriction?",
      options: [
        {
          id: "a",
          text: "The internal COMMIT is always allowed because CALL is used.",
        },
        {
          id: "b",
          text: "The outer BEGIN automatically removes the procedure's COMMIT statement.",
        },
        {
          id: "c",
          text: "Its internal COMMIT is not allowed when CALL is inside that explicit transaction block.",
        },
        {
          id: "d",
          text: "Its internal COMMIT commits only the procedure variables, not the transaction.",
        },
      ],
      correctOptionId: "c",
      explanation: "CALL inside an explicit transaction block cannot execute transaction control in the called procedure. The lecture's support statement needs this invocation condition.",
      source: "/references/database-session-1-slides.pdf#page=24",
      topic: "Procedure transactions",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: CALL",
          url: "https://www.postgresql.org/docs/16/sql-call.html",
          section: "Notes",
        },
      ],
    },
    {
      id: "db-s1-065",
      prompt: "The procedure slide labels an internal COMMIT as a Save point. What is the correct interpretation?",
      options: [
        {
          id: "a",
          text: "COMMIT ends only the nearest PL/pgSQL IF block.",
        },
        {
          id: "b",
          text: "COMMIT discards variable assignments but leaves writes uncommitted.",
        },
        {
          id: "c",
          text: "COMMIT creates a point that ROLLBACK TO can later undo.",
        },
        {
          id: "d",
          text: "COMMIT ends the current transaction; it is not a rollback savepoint.",
        },
      ],
      correctOptionId: "d",
      explanation: "COMMIT finalizes a transaction. Calling it a savepoint is misleading; a savepoint is a different transaction concept.",
      source: "/references/database-session-1-slides.pdf#page=24",
      topic: "Procedure transactions",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: PL/pgSQL transaction management",
          url: "https://www.postgresql.org/docs/16/plpgsql-transactions.html",
          section: "43.8",
        },
      ],
    },
    {
      id: "db-s1-066",
      prompt: "A developer puts COMMIT inside a function invoked through SELECT. Which redesign follows the session's distinction?",
      options: [
        {
          id: "a",
          text: "Let the caller manage the transaction, or use a procedure in an eligible CALL context.",
        },
        {
          id: "b",
          text: "Keep the function and replace SELECT with a materialized-view refresh.",
        },
        {
          id: "c",
          text: "Keep the function and rename the dollar-quote delimiter to $commit$.",
        },
        {
          id: "d",
          text: "Keep the function and add RETURNS NUMERIC before COMMIT.",
        },
      ],
      correctOptionId: "a",
      explanation: "Changing return type or quoting does not grant transaction-control capability. Use caller-owned transactions or the appropriate procedure context.",
      source: "/references/database-session-1-slides.pdf#page=22",
      topic: "Function versus procedure",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 22,
          slideNumber: 18,
          slideTitle: "Functions: MySQL vs. PostgreSQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: PL/pgSQL transaction management",
          url: "https://www.postgresql.org/docs/16/plpgsql-transactions.html",
          section: "43.8",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: CALL",
          url: "https://www.postgresql.org/docs/16/sql-call.html",
          section: "Notes",
        },
      ],
    },
    {
      id: "db-s1-067",
      prompt: "A valid top-level procedure writes batch A, commits it, writes batch B, then rolls batch B back. What remains committed?",
      options: [
        {
          id: "a",
          text: "Batch A only.",
        },
        {
          id: "b",
          text: "Batch B only.",
        },
        {
          id: "c",
          text: "Neither batch.",
        },
        {
          id: "d",
          text: "Both batches.",
        },
      ],
      correctOptionId: "a",
      explanation: "The first COMMIT makes batch A durable as its own completed transaction. A later rollback affects the subsequent transaction, not the already committed batch.",
      source: "/references/database-session-1-slides.pdf#page=24",
      topic: "Procedure transactions",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 24,
          slideNumber: 20,
          slideTitle: "Procedures: Transaction Control",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: PL/pgSQL transaction management",
          url: "https://www.postgresql.org/docs/16/plpgsql-transactions.html",
          section: "43.8",
        },
      ],
    },
    {
      id: "db-s1-068",
      prompt: "Which creation order reflects PostgreSQL's reusable trigger architecture?",
      options: [
        {
          id: "a",
          text: "Create a trigger with its entire PL/pgSQL body embedded in CREATE TRIGGER.",
        },
        {
          id: "b",
          text: "Create a scalar function, then use CALL inside a table-bound trigger body.",
        },
        {
          id: "c",
          text: "Create a procedure, then attach it using EXECUTE FUNCTION in CREATE TRIGGER.",
        },
        {
          id: "d",
          text: "Create a RETURNS trigger function, then bind it with CREATE TRIGGER.",
        },
      ],
      correctOptionId: "d",
      explanation: "PostgreSQL separates the trigger function containing logic from each trigger object that binds it to a table and event.",
      source: "/references/database-session-1-slides.pdf#page=25",
      topic: "Trigger architecture",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 25,
          slideNumber: 21,
          slideTitle: "Triggers: Postgres vs. MySQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 26,
          slideNumber: 22,
          slideTitle: "Trigger Architecture: MySQL vs. PostgreSQL",
        },
      ],
    },
    {
      id: "db-s1-069",
      prompt: "Which definition binds update_timestamp() to each updated customer row before it is stored?",
      options: [
        {
          id: "a",
          text: "CREATE TRIGGER trg BEFORE UPDATE ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();",
        },
        {
          id: "b",
          text: "CREATE TRIGGER trg BEFORE UPDATE ON customer FOR EACH STATEMENT EXECUTE FUNCTION update_timestamp();",
        },
        {
          id: "c",
          text: "CREATE TRIGGER trg AFTER UPDATE ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();",
        },
        {
          id: "d",
          text: "CREATE TRIGGER trg BEFORE INSERT ON customer FOR EACH ROW EXECUTE FUNCTION update_timestamp();",
        },
      ],
      correctOptionId: "a",
      explanation: "BEFORE UPDATE matches the event and allows the row to be modified; FOR EACH ROW supplies each updated row separately.",
      source: "/references/database-session-1-slides.pdf#page=25",
      topic: "Trigger syntax",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 25,
          slideNumber: 21,
          slideTitle: "Triggers: Postgres vs. MySQL",
        },
      ],
    },
    {
      id: "db-s1-070",
      prompt: "A BEFORE UPDATE row trigger runs NEW.last_update := NOW(); RETURN NEW;. Why does the updated timestamp persist?",
      options: [
        {
          id: "a",
          text: "The trigger writes NEW back to the table only after the update has completed.",
        },
        {
          id: "b",
          text: "The trigger returns the modified proposed row before the update is applied.",
        },
        {
          id: "c",
          text: "The assignment to NEW changes the row even if the BEFORE trigger returns NULL.",
        },
        {
          id: "d",
          text: "The assignment updates OLD, which PostgreSQL then stores as the new row.",
        },
      ],
      correctOptionId: "b",
      explanation: "For a BEFORE row trigger, the returned NEW row is the row used by the update. No independent COMMIT is required.",
      source: "/references/database-session-1-slides.pdf#page=25",
      topic: "Trigger timing",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 25,
          slideNumber: 21,
          slideTitle: "Triggers: Postgres vs. MySQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-071",
      prompt: "In an UPDATE row trigger, which pairing is correct?",
      options: [
        {
          id: "a",
          text: "OLD: values before the update; NEW: proposed values after the update.",
        },
        {
          id: "b",
          text: "OLD: values after the update; NEW: values before the update.",
        },
        {
          id: "c",
          text: "OLD and NEW: both contain only the columns named in the SET clause.",
        },
        {
          id: "d",
          text: "OLD and NEW: both are snapshots of the row before the update.",
        },
      ],
      correctOptionId: "a",
      explanation: "OLD and NEW are row records describing the previous and new row values for UPDATE.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger variables",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
      ],
    },
    {
      id: "db-s1-072",
      prompt: "A generic audit trigger must know whether it was invoked by INSERT, UPDATE or DELETE. Which variable provides this operation name?",
      options: [
        {
          id: "a",
          text: "TG_OP.",
        },
        {
          id: "b",
          text: "OLD.",
        },
        {
          id: "c",
          text: "TG_TABLE_NAME.",
        },
        {
          id: "d",
          text: "NEW.",
        },
      ],
      correctOptionId: "a",
      explanation: "TG_OP identifies the triggering operation. TG_TABLE_NAME identifies the table, while NEW and OLD hold row data.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger variables",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
      ],
    },
    {
      id: "db-s1-073",
      prompt: "A reusable audit function is attached to customer and staff. Which variable identifies the table that invoked it?",
      options: [
        {
          id: "a",
          text: "OLD.table_name as an automatically added field.",
        },
        {
          id: "b",
          text: "NEW.table_name as an automatically added field.",
        },
        {
          id: "c",
          text: "TG_TABLE_NAME.",
        },
        {
          id: "d",
          text: "TG_OP.",
        },
      ],
      correctOptionId: "c",
      explanation: "TG_TABLE_NAME provides the trigger's table context without requiring a table_name data column.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger variables",
      difficulty: "easy",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
      ],
    },
    {
      id: "db-s1-074",
      prompt: "For a DELETE row trigger, which record normally contains the row being deleted?",
      options: [
        {
          id: "a",
          text: "OLD.",
        },
        {
          id: "b",
          text: "TG_OP.",
        },
        {
          id: "c",
          text: "NEW.",
        },
        {
          id: "d",
          text: "TG_TABLE_NAME.",
        },
      ],
      correctOptionId: "a",
      explanation: "DELETE has an old row and no new row. NEW is available for INSERT/UPDATE row operations.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger variables",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-075",
      prompt: "A BEFORE INSERT FOR EACH ROW trigger returns NULL for one incoming row. No exception is raised. What happens to that row?",
      options: [
        {
          id: "a",
          text: "Every row from the INSERT statement is rolled back.",
        },
        {
          id: "b",
          text: "The row is inserted and then deleted in a second transaction.",
        },
        {
          id: "c",
          text: "That row's insertion is skipped.",
        },
        {
          id: "d",
          text: "The row is inserted with NULL in every column.",
        },
      ],
      correctOptionId: "c",
      explanation: "A NULL result from a BEFORE row trigger skips the current row operation; it is not an exception that automatically rejects the whole statement.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger filtering",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 28,
          slideNumber: 24,
          slideTitle: "Handling Bad Data: MySQL vs. PostgreSQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-076",
      prompt: "A row-level BEFORE INSERT trigger skips rows with negative amount by returning NULL, otherwise returning NEW. A single INSERT supplies amounts 10, -5 and 20, with no other failures. How many rows are inserted?",
      options: [
        {
          id: "a",
          text: "3.",
        },
        {
          id: "b",
          text: "1.",
        },
        {
          id: "c",
          text: "2.",
        },
        {
          id: "d",
          text: "0.",
        },
      ],
      correctOptionId: "c",
      explanation: "The negative row is skipped; the other two rows proceed. This differs from raising an exception for the invalid row.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger filtering",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 28,
          slideNumber: 24,
          slideTitle: "Handling Bad Data: MySQL vs. PostgreSQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-077",
      prompt: "A row-level AFTER INSERT trigger returns NULL without raising an exception or executing additional DML. What does that return value do?",
      options: [
        {
          id: "a",
          text: "It changes all inserted columns to SQL NULL.",
        },
        {
          id: "b",
          text: "It rolls back the current transaction automatically.",
        },
        {
          id: "c",
          text: "It skips the row in the same way as a BEFORE INSERT return.",
        },
        {
          id: "d",
          text: "It is ignored; it does not cancel the inserted row.",
        },
      ],
      correctOptionId: "d",
      explanation: "AFTER row-trigger return values are ignored. The slide's cancellation rule applies to BEFORE row triggers, not every trigger timing.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger filtering",
      difficulty: "hard",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-078",
      prompt: "The same timestamp trigger function is attached to 50 tables. What condition is needed for its direct NEW.last_update assignment to work on each table?",
      options: [
        {
          id: "a",
          text: "Each target table must share the exact same primary-key column name.",
        },
        {
          id: "b",
          text: "Each target row must contain a compatible last_update column.",
        },
        {
          id: "c",
          text: "Each binding must duplicate the function body for its own table.",
        },
        {
          id: "d",
          text: "Each binding automatically creates last_update if that column is absent.",
        },
      ],
      correctOptionId: "b",
      explanation: "Reusability still depends on the fields the function accesses. A table without the expected column cannot support that assignment.",
      source: "/references/database-session-1-slides.pdf#page=25",
      topic: "Trigger reuse",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 25,
          slideNumber: 21,
          slideTitle: "Triggers: Postgres vs. MySQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 26,
          slideNumber: 22,
          slideTitle: "Trigger Architecture: MySQL vs. PostgreSQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
    {
      id: "db-s1-079",
      prompt: "Why is separating a trigger function from trigger bindings useful when the timestamp rule changes?",
      options: [
        {
          id: "a",
          text: "All table bindings must be replaced even when the function signature remains compatible.",
        },
        {
          id: "b",
          text: "Each trigger binding contains a stored copy of the function body that updates independently.",
        },
        {
          id: "c",
          text: "A change to the shared function applies only to triggers created after the change.",
        },
        {
          id: "d",
          text: "The shared function can be updated centrally while table bindings continue using it.",
        },
      ],
      correctOptionId: "d",
      explanation: "A compatible CREATE OR REPLACE FUNCTION update can change shared logic without rewriting each trigger binding. This supports the DRY principle.",
      source: "/references/database-session-1-slides.pdf#page=25",
      topic: "Trigger maintenance",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 25,
          slideNumber: 21,
          slideTitle: "Triggers: Postgres vs. MySQL",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 26,
          slideNumber: 22,
          slideTitle: "Trigger Architecture: MySQL vs. PostgreSQL",
        },
      ],
    },
    {
      id: "db-s1-080",
      prompt: "Several applications insert into one table. The business rule says skip only the current row if its required external identifier is missing, without raising an error. Which design directly centralizes that behavior?",
      options: [
        {
          id: "a",
          text: "A BEFORE INSERT row trigger that returns NEW for every row and expects NULL fields to skip rows.",
        },
        {
          id: "b",
          text: "An AFTER INSERT row trigger that returns NULL for that condition and NEW otherwise.",
        },
        {
          id: "c",
          text: "A BEFORE INSERT row trigger that returns NULL for that condition and NEW otherwise.",
        },
        {
          id: "d",
          text: "A BEFORE INSERT statement trigger whose NULL result skips only invalid input rows.",
        },
      ],
      correctOptionId: "c",
      explanation: "A BEFORE row trigger centralizes selective filtering for inserts reaching the table. AFTER return values do not cancel inserts; views do not implement this write rule.",
      source: "/references/database-session-1-slides.pdf#page=27",
      topic: "Trigger filtering",
      difficulty: "medium",
      sources: [
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 27,
          slideNumber: 23,
          slideTitle: "Understanding Special Trigger Variables",
        },
        {
          kind: "lecture",
          file: "AdvanceDB_1.pdf",
          pdfPage: 28,
          slideNumber: 24,
          slideTitle: "Handling Bad Data: MySQL vs. PostgreSQL",
        },
        {
          kind: "documentation",
          title: "PostgreSQL 16: Trigger functions",
          url: "https://www.postgresql.org/docs/16/plpgsql-trigger.html",
          section: "43.10",
        },
      ],
    },
  ],
};
