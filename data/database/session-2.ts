import type { Chapter } from "@/types/quiz";

// Reviewed question bank; changed prompts/options use new IDs to protect saved answers.
export const session2: Chapter = {
  "id": "session-2",
  "title": "Session 2: Physical storage & indexing strategies",
  "description": "57 câu hỏi đã duyệt về lưu trữ vật lý và chiến lược lập chỉ mục.",
  "revision": 2,
  "questions": [
    {
      "id": "db-s2-original-02",
      "prompt": "According to the lecture, what is the full physical storage hierarchy?",
      "options": [
        {
          "id": "a",
          "text": "Database cluster → relation → database → page."
        },
        {
          "id": "b",
          "text": "Database cluster → database → relation → page."
        },
        {
          "id": "c",
          "text": "Database → relation → page → database cluster."
        },
        {
          "id": "d",
          "text": "Page → relation → database → database cluster."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The cluster contains databases, each contains relations, and a relation consists of physical pages.",
      "source": "/references/database-session-2-slides.pdf#page=7",
      "topic": "Original quiz · Storage hierarchy"
    },
    {
      "id": "db-s2-original-04-reviewed",
      "prompt": "What is the default PostgreSQL data page size in a conventional build?",
      "options": [
        {
          "id": "a",
          "text": "4 KB per page, as used in some other storage designs."
        },
        {
          "id": "b",
          "text": "16 KB per page, as in some configurations of other DBMS engines."
        },
        {
          "id": "c",
          "text": "32 KB per page, four times the PostgreSQL slide default."
        },
        {
          "id": "d",
          "text": "8 KB per page, the default Page (Block) size in this lecture."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture specifies 8 KB as the default PostgreSQL Page (Block) size, the basic I/O unit.",
      "source": "/references/database-session-2-slides.pdf#page=9",
      "topic": "Original quiz · Page anatomy"
    },
    {
      "id": "db-s2-original-07-reviewed",
      "prompt": "In an ordinary PostgreSQL heap page, where is unused free space?",
      "options": [
        {
          "id": "a",
          "text": "Between Item Pointers and Tuples inside the Page."
        },
        {
          "id": "b",
          "text": "Between Page Header and Item Pointers at the page beginning."
        },
        {
          "id": "c",
          "text": "Inside the Page Header beside free-space metadata."
        },
        {
          "id": "d",
          "text": "Inside the tuple area, after the last stored row."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The pointer array and heap tuples approach each other as the page fills; the gap is available insertion space.",
      "source": "/references/database-session-2-slides.pdf#page=10",
      "topic": "Original quiz · Page anatomy"
    },
    {
      "id": "db-s2-original-08",
      "prompt": "Which characteristic most accurately describes a B-Tree index?",
      "options": [
        {
          "id": "a",
          "text": "It hashes each key and loses support for ordered comparisons."
        },
        {
          "id": "b",
          "text": "It stores the entire clustered heap in each internal branch."
        },
        {
          "id": "c",
          "text": "It supports equality predicates but not range predicates."
        },
        {
          "id": "d",
          "text": "It is balanced, with leaf pages at a uniform tree depth."
        }
      ],
      "correctOptionId": "d",
      "explanation": "A balanced B-Tree efficiently navigates sorted keys and supports equality, ordered predicates and range scans.",
      "source": "/references/database-session-2-slides.pdf#page=15",
      "topic": "Original quiz · B-Tree"
    },
    {
      "id": "db-s2-original-09-reviewed",
      "prompt": "What is the core limitation of a Hash index versus a B-Tree?",
      "options": [
        {
          "id": "a",
          "text": "It cannot use equality comparisons on TEXT columns."
        },
        {
          "id": "b",
          "text": "It must use a greater tree height than a B-Tree at all sizes."
        },
        {
          "id": "c",
          "text": "It supports equality lookups but not ordered range queries."
        },
        {
          "id": "d",
          "text": "It must reorganize the Heap File for each insert."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Hash indexes use hashed keys for equality operators; ordered range comparisons require a different index method.",
      "source": "/references/database-session-2-slides.pdf#page=17",
      "topic": "Original quiz · Hash index"
    },
    {
      "id": "db-s2-original-10",
      "prompt": "For which workload is GiST a natural indexing framework?",
      "options": [
        {
          "id": "a",
          "text": "Only integer equality tests on primary-key sequences."
        },
        {
          "id": "b",
          "text": "Spatial relationships and supported nearest-neighbor operators."
        },
        {
          "id": "c",
          "text": "Physically clustering heap tuples by insertion time."
        },
        {
          "id": "d",
          "text": "Compressing oversized PDF values into TOAST chunks."
        }
      ],
      "correctOptionId": "b",
      "explanation": "GiST supports extensible search strategies for geometric and related data through appropriate operator classes.",
      "source": "/references/database-session-2-slides.pdf#page=18",
      "topic": "Original quiz · GiST"
    },
    {
      "id": "db-s2-original-11",
      "prompt": "Which structure physically stores unordered PostgreSQL table tuples?",
      "options": [
        {
          "id": "a",
          "text": "A heap file with pages holding row versions."
        },
        {
          "id": "b",
          "text": "A unique B-Tree where every leaf stores full rows."
        },
        {
          "id": "c",
          "text": "A Hash index partitioned by primary key."
        },
        {
          "id": "d",
          "text": "A materialized view automatically ordered by ID."
        }
      ],
      "correctOptionId": "a",
      "explanation": "A standard PostgreSQL relation uses heap storage and allows tuples in free locations rather than continuously sorting them.",
      "source": "/references/database-session-2-slides.pdf#page=8",
      "topic": "Original quiz · Heap and MVCC"
    },
    {
      "id": "db-s2-original-12",
      "prompt": "A PostgreSQL TID has the format (block number, offset). What does that mean?",
      "options": [
        {
          "id": "a",
          "text": "The relation's primary-key value and associated database port."
        },
        {
          "id": "b",
          "text": "The transaction's creation time and number of failed updates."
        },
        {
          "id": "c",
          "text": "The index type and ordinal number of its root page."
        },
        {
          "id": "d",
          "text": "A tuple's page and item-pointer position within the heap."
        }
      ],
      "correctOptionId": "d",
      "explanation": "TIDs locate physical tuple versions rather than durable logical identities.",
      "source": "/references/database-session-2-slides.pdf#page=11",
      "topic": "Original quiz · Heap and TID"
    },
    {
      "id": "db-s2-original-16",
      "prompt": "What default approximate tuple-size target appears in the slide's TOAST explanation?",
      "options": [
        {
          "id": "a",
          "text": "Exactly 8 KB, with no compression below page size."
        },
        {
          "id": "b",
          "text": "Exactly 1 MB, which is the mandatory TOAST limit."
        },
        {
          "id": "c",
          "text": "Exactly 4 KB, fixed for all PostgreSQL builds."
        },
        {
          "id": "d",
          "text": "About 2 KB, with actual decisions depending on configuration."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The TOAST slide gives 2 KB as the approximate size at which PostgreSQL starts compressing and, if needed, moving large values to a TOAST table.",
      "source": "/references/database-session-2-slides.pdf#page=12",
      "topic": "Original quiz · TOAST"
    },
    {
      "id": "db-s2-original-18",
      "prompt": "When an MVCC-updated row receives a new value, what happens in heap storage?",
      "options": [
        {
          "id": "a",
          "text": "The prior tuple is overwritten and immediately loses all snapshot visibility."
        },
        {
          "id": "b",
          "text": "A new tuple version is created instead of blindly overwriting the previous one."
        },
        {
          "id": "c",
          "text": "PostgreSQL deletes the whole table page and recreates its index."
        },
        {
          "id": "d",
          "text": "The update becomes a new database in the same server cluster."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Multiple row versions underpin MVCC; earlier versions may remain visible to suitable transactions until reclamation.",
      "source": "/references/database-session-2-slides.pdf#page=8",
      "topic": "Original quiz · Heap and MVCC"
    },
    {
      "id": "db-s2-original-19",
      "prompt": "What bulk-loading sequence is recommended in the lecture when operationally safe?",
      "options": [
        {
          "id": "a",
          "text": "Build secondary indexes after loading the large data batch."
        },
        {
          "id": "b",
          "text": "Add a new secondary index after every imported tuple."
        },
        {
          "id": "c",
          "text": "Run CLUSTER for every INSERT before creating any table."
        },
        {
          "id": "d",
          "text": "Disable all integrity constraints permanently for the database."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Loading first and creating secondary indexes afterward avoids repeated maintenance during large imports; do not casually drop essential production constraints.",
      "source": "/references/database-session-2-slides.pdf#page=22",
      "topic": "Original quiz · Bulk loading"
    },
    {
      "id": "db-s2-original-22",
      "prompt": "According to the index-maintenance slides, what can contribute to index bloat?",
      "options": [
        {
          "id": "a",
          "text": "Choosing a B-Tree instead of Hash by itself."
        },
        {
          "id": "b",
          "text": "Dead index entries persisting after row updates or deletions."
        },
        {
          "id": "c",
          "text": "Enabling TOAST compression for large text values."
        },
        {
          "id": "d",
          "text": "Returning fewer rows than expected from a SELECT."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The maintenance slide explains that UPDATE and DELETE activity can leave dead entries and contribute to index bloat, which VACUUM helps clean.",
      "source": "/references/database-session-2-slides.pdf#page=22",
      "topic": "Original quiz · Index maintenance"
    },
    {
      "id": "db-s2-original-23",
      "prompt": "Which use case best fits a Generalized Inverted Index (GIN)?",
      "options": [
        {
          "id": "a",
          "text": "Mapping JSONB/array components to potentially many matching rows."
        },
        {
          "id": "b",
          "text": "Returning rows by a conventional numeric sort key only."
        },
        {
          "id": "c",
          "text": "Physically moving all heap tuples to primary-key order."
        },
        {
          "id": "d",
          "text": "Locating one tuple through an individual transaction number."
        }
      ],
      "correctOptionId": "a",
      "explanation": "GIN maps searchable component keys to matching posting lists and suits multivalued content.",
      "source": "/references/database-session-2-slides.pdf#page=19",
      "topic": "Original quiz · GIN"
    },
    {
      "id": "db-s2-original-24",
      "prompt": "Why should AI pipelines care about data movement from disk?",
      "options": [
        {
          "id": "a",
          "text": "Every disk read is faster than equivalent RAM access by several orders."
        },
        {
          "id": "b",
          "text": "Storing vectors in columns automatically eliminates all disk I/O."
        },
        {
          "id": "c",
          "text": "Page-level locality is irrelevant once a model has been trained."
        },
        {
          "id": "d",
          "text": "Disk access can be orders of magnitude slower than RAM and leave compute units waiting."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Poor layout and oversized reads can make storage I/O the bottleneck even if the model's computation is fast.",
      "source": "/references/database-session-2-slides.pdf#page=5",
      "topic": "Original quiz · Storage and I/O"
    },
    {
      "id": "db-s2-original-25",
      "prompt": "What best compares conventional PostgreSQL heap indexing with InnoDB's clustered primary index?",
      "options": [
        {
          "id": "a",
          "text": "Both databases always store all table tuples in secondary-index leaves."
        },
        {
          "id": "b",
          "text": "PostgreSQL keeps the heap automatically ordered by primary-key value."
        },
        {
          "id": "c",
          "text": "PostgreSQL stores heap tuples separately and index entries point to TIDs."
        },
        {
          "id": "d",
          "text": "InnoDB primary-key leaves store only TIDs into an unordered heap."
        }
      ],
      "correctOptionId": "c",
      "explanation": "InnoDB's clustered primary index holds row data in leaves; PostgreSQL normally uses separate heap tuples and nonclustered indexes.",
      "source": "/references/database-session-2-slides.pdf#page=20",
      "topic": "Original quiz · Clustered vs nonclustered"
    },
    {
      "id": "db-s2-002",
      "prompt": "A PostgreSQL cluster hosts app_db, analytics_db, and ai_db. What is a plausible effect of a heavy analytics scan?",
      "options": [
        {
          "id": "a",
          "text": "The scan may compete with the other databases for shared memory and disk I/O."
        },
        {
          "id": "b",
          "text": "Each database has a completely isolated CPU and buffer pool."
        },
        {
          "id": "c",
          "text": "A scan can access only CPU cycles reserved for its own database."
        },
        {
          "id": "d",
          "text": "The scan automatically converts the entire cluster to read-only mode."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Databases in a cluster share server resources; resource contention can affect otherwise unrelated workloads.",
      "source": "/references/database-session-2-slides.pdf#page=7",
      "topic": "Storage hierarchy"
    },
    {
      "id": "db-s2-006",
      "prompt": "What does a line pointer in a heap page primarily identify?",
      "options": [
        {
          "id": "a",
          "text": "The offset and status information for an item on that page."
        },
        {
          "id": "b",
          "text": "The primary key of a row in an external index."
        },
        {
          "id": "c",
          "text": "The file path containing an entire database."
        },
        {
          "id": "d",
          "text": "The foreign-key relationship for a tuple."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture describes four-byte Item Pointers that locate tuples within a Page.",
      "source": "/references/database-session-2-slides.pdf#page=10",
      "topic": "Page anatomy"
    },
    {
      "id": "db-s2-008-reviewed",
      "prompt": "Why should ctid not be used as a permanent identifier for a business record?",
      "options": [
        {
          "id": "a",
          "text": "The ctid is always identical across every table in a cluster."
        },
        {
          "id": "b",
          "text": "PostgreSQL never assigns ctid values to ordinary heap rows."
        },
        {
          "id": "c",
          "text": "Updates and table rewrites can change a tuple's physical location."
        },
        {
          "id": "d",
          "text": "The ctid stores a fixed UUID rather than a disk address."
        }
      ],
      "correctOptionId": "c",
      "explanation": "A ctid identifies a physical location. MVCC can create a new tuple version on UPDATE, so a permanent business identifier should not depend on this location.",
      "source": "/references/database-session-2-slides.pdf#page=11",
      "topic": "Heap and TID"
    },
    {
      "id": "db-s2-011",
      "prompt": "Why can heavy UPDATE and DELETE activity inflate a heap table?",
      "options": [
        {
          "id": "a",
          "text": "Updates automatically double the size of every 8 KB page."
        },
        {
          "id": "b",
          "text": "All deleted tuples become permanent primary-key index entries."
        },
        {
          "id": "c",
          "text": "PostgreSQL stores each row in a separate operating-system file."
        },
        {
          "id": "d",
          "text": "Dead tuple versions and fragmented space may accumulate before cleanup."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Repeated UPDATE and DELETE activity creates obsolete row versions, contributing to fragmentation and bloat before cleanup.",
      "source": "/references/database-session-2-slides.pdf#page=8",
      "topic": "Heap and MVCC"
    },
    {
      "id": "db-s2-014-reviewed",
      "prompt": "A table stores a 1 MB document in a text-like column. What is a likely storage approach?",
      "options": [
        {
          "id": "a",
          "text": "PostgreSQL can compress eligible data and store oversized attributes outside the main heap row."
        },
        {
          "id": "b",
          "text": "PostgreSQL expands the default Page size to fit the document in one Page."
        },
        {
          "id": "c",
          "text": "The document must be split manually into several ordinary application rows."
        },
        {
          "id": "d",
          "text": "A B-Tree index directly replaces TOAST for storing a megabyte document."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture describes compressing large attributes and storing them in a separate TOAST table if necessary, leaving a pointer in the original row.",
      "source": "/references/database-session-2-slides.pdf#page=12",
      "topic": "TOAST"
    },
    {
      "id": "db-s2-016",
      "prompt": "Which trade-off is associated with creating an additional ordinary index?",
      "options": [
        {
          "id": "a",
          "text": "Faster inserts because no index pages need to be changed."
        },
        {
          "id": "b",
          "text": "Guaranteed faster execution for every query on the table."
        },
        {
          "id": "c",
          "text": "Faster eligible lookups at the cost of space and write maintenance."
        },
        {
          "id": "d",
          "text": "Less disk usage because the index replaces the heap file."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Indexes accelerate some reads but consume storage and must be maintained as data changes.",
      "source": "/references/database-session-2-slides.pdf#page=14",
      "topic": "Index fundamentals"
    },
    {
      "id": "db-s2-017",
      "prompt": "Which query is a natural candidate for a B-Tree index on price?",
      "options": [
        {
          "id": "a",
          "text": "SELECT * FROM products WHERE metadata @> '{\"tag\":\"sale\"}';"
        },
        {
          "id": "b",
          "text": "SELECT * FROM products WHERE price BETWEEN 100 AND 200;"
        },
        {
          "id": "c",
          "text": "SELECT * FROM locations WHERE coordinates && search_box;"
        },
        {
          "id": "d",
          "text": "SELECT * FROM documents WHERE tokens @@ text_query;"
        }
      ],
      "correctOptionId": "b",
      "explanation": "B-Tree supports ordered comparison predicates including equality, ranges and sorted output; JSON, spatial and text operators often use specialized indexes.",
      "source": "/references/database-session-2-slides.pdf#page=15",
      "topic": "B-Tree"
    },
    {
      "id": "db-s2-018",
      "prompt": "What is the usual B-Tree search sequence for an indexed heap lookup?",
      "options": [
        {
          "id": "a",
          "text": "Root → internal pages → leaf containing TID → heap tuple."
        },
        {
          "id": "b",
          "text": "Heap page → root → buffer pool → WAL record."
        },
        {
          "id": "c",
          "text": "Hash bucket → JSON token → root → tuple."
        },
        {
          "id": "d",
          "text": "TOAST chunk → leaf → database directory → heap."
        }
      ],
      "correctOptionId": "a",
      "explanation": "B-Tree navigation follows separator keys to a leaf and ordinarily retrieves a heap tuple through the stored TID.",
      "source": "/references/database-session-2-slides.pdf#page=16",
      "topic": "B-Tree"
    },
    {
      "id": "db-s2-020",
      "prompt": "A query filters email = 'x@example.com' and then sorts by price. What is true of an index only on email?",
      "options": [
        {
          "id": "a",
          "text": "It automatically sorts the output by every column in the table."
        },
        {
          "id": "b",
          "text": "It cannot be considered because email stores text rather than integers."
        },
        {
          "id": "c",
          "text": "It may help the equality lookup but does not inherently satisfy ORDER BY price."
        },
        {
          "id": "d",
          "text": "It always produces an index-only scan with no heap visibility checks."
        }
      ],
      "correctOptionId": "c",
      "explanation": "An index on email helps locate matching emails, but ORDER BY price refers to a different column and is not automatically satisfied by email ordering.",
      "source": "/references/database-session-2-slides.pdf#page=15",
      "topic": "B-Tree"
    },
    {
      "id": "db-s2-021",
      "prompt": "What does a PostgreSQL Hash index fundamentally use to organize searches?",
      "options": [
        {
          "id": "a",
          "text": "Lexicographically ordered leaf nodes for range scans."
        },
        {
          "id": "b",
          "text": "Hash values assigned to buckets for equality comparisons."
        },
        {
          "id": "c",
          "text": "Geometric bounding boxes for nearest-neighbor traversal."
        },
        {
          "id": "d",
          "text": "An inverted posting list for each JSON document token."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Hash indexes are designed for equality predicates based on hash values and do not supply ordered range traversal.",
      "source": "/references/database-session-2-slides.pdf#page=17",
      "topic": "Hash index"
    },
    {
      "id": "db-s2-024-reviewed",
      "prompt": "What does it mean that GiST can support lossy indexing?",
      "options": [
        {
          "id": "a",
          "text": "GiST always stores full heap tuples in every internal node."
        },
        {
          "id": "b",
          "text": "GiST cannot handle any spatial predicate exactly."
        },
        {
          "id": "c",
          "text": "Some indexed representations are lossy and may return candidates requiring verification."
        },
        {
          "id": "d",
          "text": "All GiST indexes use UUID hashes for query ordering."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Lossy representations can admit candidate matches that require checking against the actual data. The lecture introduces this as a GiST capability without requiring implementation details.",
      "source": "/references/database-session-2-slides.pdf#page=18",
      "topic": "GiST"
    },
    {
      "id": "db-s2-026",
      "prompt": "Which SQL creates a GIN index over a JSONB metadata column?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_meta ON events USING GIN (metadata);"
        },
        {
          "id": "b",
          "text": "CREATE INDEX idx_meta ON events USING HASH (metadata);"
        },
        {
          "id": "c",
          "text": "CLUSTER events USING GIN (metadata);"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_meta ON events INCLUDE (metadata);"
        }
      ],
      "correctOptionId": "a",
      "explanation": "GIN is specified with USING GIN; the index supports JSONB operators depending on the chosen operator class.",
      "source": "/references/database-session-2-slides.pdf#page=19",
      "topic": "GIN"
    },
    {
      "id": "db-s2-027",
      "prompt": "For a GIN-indexed JSONB column, which filter matches the containment use case from the slide?",
      "options": [
        {
          "id": "a",
          "text": "WHERE metadata BETWEEN 'a' AND 'z'"
        },
        {
          "id": "b",
          "text": "WHERE metadata LIKE 'active%'"
        },
        {
          "id": "c",
          "text": "WHERE metadata IS DISTINCT FROM 12"
        },
        {
          "id": "d",
          "text": "WHERE metadata @> '{\"status\":\"active\"}'"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The JSONB @> operator asks whether the left document contains the specified right-hand structure.",
      "source": "/references/database-session-2-slides.pdf#page=19",
      "topic": "GIN"
    },
    {
      "id": "db-s2-029-reviewed",
      "prompt": "A PostgreSQL table already has three indexes. What is generally permitted?",
      "options": [
        {
          "id": "a",
          "text": "The third index must be removed before another index can be created."
        },
        {
          "id": "b",
          "text": "More indexes are possible, with additional disk and write-maintenance costs."
        },
        {
          "id": "c",
          "text": "The heap must be permanently ordered by the newest index."
        },
        {
          "id": "d",
          "text": "Creating a fourth index implicitly replaces the first index."
        }
      ],
      "correctOptionId": "b",
      "explanation": "PostgreSQL stores table rows in a heap and permits multiple non-clustered indexes; each costs disk space and write maintenance.",
      "source": "/references/database-session-2-slides.pdf#page=20",
      "topic": "Clustered vs nonclustered"
    },
    {
      "id": "db-s2-030",
      "prompt": "What does CLUSTER film USING idx_film_title do?",
      "options": [
        {
          "id": "a",
          "text": "Physically rewrites the heap in the order of the selected index at that time."
        },
        {
          "id": "b",
          "text": "Enables automatic heap reordering after every new INSERT."
        },
        {
          "id": "c",
          "text": "Converts idx_film_title into a permanent unique constraint."
        },
        {
          "id": "d",
          "text": "Changes the table into a permanently index-organized B-Tree."
        }
      ],
      "correctOptionId": "a",
      "explanation": "PostgreSQL CLUSTER is a one-time heap reorganization, not an always-maintained clustered-index structure.",
      "source": "/references/database-session-2-slides.pdf#page=21",
      "topic": "CLUSTER"
    },
    {
      "id": "db-s2-031",
      "prompt": "What is expected after many new inserts into a previously CLUSTERed table?",
      "options": [
        {
          "id": "a",
          "text": "Future inserts are guaranteed to preserve the existing sorted order."
        },
        {
          "id": "b",
          "text": "The heap automatically rejects any row not in the original range."
        },
        {
          "id": "c",
          "text": "The selected index no longer works for lookups until CLUSTER runs again."
        },
        {
          "id": "d",
          "text": "Physical ordering can deteriorate and clustering may need to be repeated."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The CLUSTER slide states that physical reordering is one-time, and new INSERT operations gradually disrupt the ordering.",
      "source": "/references/database-session-2-slides.pdf#page=21",
      "topic": "CLUSTER"
    },
    {
      "id": "db-s2-033",
      "prompt": "Which maintenance command routinely helps reclaim reusable space associated with dead tuples?",
      "options": [
        {
          "id": "a",
          "text": "DROP DATABASE keeps all indexes while deleting dead row versions."
        },
        {
          "id": "b",
          "text": "VACUUM helps clean dead tuples and reusable heap/index space."
        },
        {
          "id": "c",
          "text": "SELECT COUNT(*) physically compacts every index in the relation."
        },
        {
          "id": "d",
          "text": "SET enable_seqscan = off reclaims deleted tuples from heap pages."
        }
      ],
      "correctOptionId": "b",
      "explanation": "VACUUM is introduced as the mechanism for reclaiming space from dead tuples in Heap Files and indexes.",
      "source": "/references/database-session-2-slides.pdf#page=22",
      "topic": "Index maintenance"
    },
    {
      "id": "db-s2-034-reviewed",
      "prompt": "Which maintenance operation is listed for addressing an index that has grown too large?",
      "options": [
        {
          "id": "a",
          "text": "REINDEX rebuilds the index from table contents."
        },
        {
          "id": "b",
          "text": "ANALYZE always rewrites the entire index from scratch."
        },
        {
          "id": "c",
          "text": "CHECKPOINT merges all live and dead index records into heap."
        },
        {
          "id": "d",
          "text": "ORDER BY permanently compacts every leaf page of the index."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The best-practices slide recommends REINDEX or VACUUM FULL when bloat becomes excessive. REINDEX is the operation that rebuilds an index; this question asks only for that distinction.",
      "source": "/references/database-session-2-slides.pdf#page=30",
      "topic": "Index maintenance"
    },
    {
      "id": "db-s2-036-reviewed",
      "prompt": "A table has 10 million rows but only 10,000 pending orders. What is the partial-index advantage?",
      "options": [
        {
          "id": "a",
          "text": "A Partial Index physically reorders all 10 million rows."
        },
        {
          "id": "b",
          "text": "It eliminates the need to specify a WHERE clause at query time."
        },
        {
          "id": "c",
          "text": "It keeps entries for the qualifying pending subset rather than every row."
        },
        {
          "id": "d",
          "text": "It stores pending rows outside the table as a separate database."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Partial indexes cover a defined subset; the slide's illustrative comparison is 10,000 vs 10 million entries.",
      "source": "/references/database-session-2-slides.pdf#page=24",
      "topic": "Partial index"
    },
    {
      "id": "db-s2-037-reviewed",
      "prompt": "Which definition correctly indexes only active unreturned rentals?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_active ON rental (inventory_id) ORDER BY return_date IS NULL;"
        },
        {
          "id": "b",
          "text": "CREATE INDEX idx_active ON rental (inventory_id) WHERE return_date IS NULL;"
        },
        {
          "id": "c",
          "text": "CREATE INDEX idx_active ON rental USING HASH (inventory_id) WHERE return_date IS NOT NULL;"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_active ON rental (return_date) WHERE inventory_id IS NULL;"
        }
      ],
      "correctOptionId": "b",
      "explanation": "A partial B-Tree is declared by a normal CREATE INDEX with a predicate after the key-column list.",
      "source": "/references/database-session-2-slides.pdf#page=24",
      "topic": "Partial index"
    },
    {
      "id": "db-s2-038-reviewed",
      "prompt": "For a partial index defined with WHERE status = 'pending', which query explicitly includes the same status condition?",
      "options": [
        {
          "id": "a",
          "text": "SELECT * FROM orders WHERE status = 'pending' AND customer_id = 7;"
        },
        {
          "id": "b",
          "text": "SELECT * FROM orders WHERE status = 'shipped' AND customer_id = 7;"
        },
        {
          "id": "c",
          "text": "SELECT * FROM orders WHERE customer_id = 7;"
        },
        {
          "id": "d",
          "text": "SELECT * FROM orders WHERE status IS NOT NULL;"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture says that the query WHERE condition must match the partial-index predicate. The pending filter is explicitly present only in option A; this makes the indexed subset relevant, not index usage guaranteed.",
      "source": "/references/database-session-2-slides.pdf#page=25",
      "topic": "Partial index"
    },
    {
      "id": "db-s2-040",
      "prompt": "Given 10,000 indexed rows from 10 million total, what fraction is indexed?",
      "options": [
        {
          "id": "a",
          "text": "1% of all rows."
        },
        {
          "id": "b",
          "text": "0.01% of all rows."
        },
        {
          "id": "c",
          "text": "0.1% of all rows."
        },
        {
          "id": "d",
          "text": "10% of all rows."
        }
      ],
      "correctOptionId": "c",
      "explanation": "10,000 / 10,000,000 = 0.001 = 0.1%; this approximates the fraction of rows contributing partial-index entries.",
      "source": "/references/database-session-2-slides.pdf#page=25",
      "topic": "Partial index practice"
    },
    {
      "id": "db-s2-041",
      "prompt": "An index grows by 81,920 bytes. Under an 8 KB page-size assumption, how many pages is that?",
      "options": [
        {
          "id": "a",
          "text": "8 pages at 10,240 bytes per page."
        },
        {
          "id": "b",
          "text": "10 pages at 8,192 bytes per page."
        },
        {
          "id": "c",
          "text": "16 pages at 5,120 bytes per page."
        },
        {
          "id": "d",
          "text": "20 pages at 4,096 bytes per page."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Under the stated 8 KB page assumption, 8 KB = 8192 bytes; 81920 / 8192 = 10 pages.",
      "source": "/references/database-session-2-slides.pdf#page=28",
      "topic": "Storage practice"
    },
    {
      "id": "db-s2-043",
      "prompt": "An index is defined on (last_name, first_name). Which lookup naturally follows the leading-key rule?",
      "options": [
        {
          "id": "a",
          "text": "WHERE first_name = 'An' with no other condition"
        },
        {
          "id": "b",
          "text": "WHERE salary > 1000 with no name condition"
        },
        {
          "id": "c",
          "text": "WHERE lower(first_name) = 'an' alone"
        },
        {
          "id": "d",
          "text": "WHERE last_name = 'Nguyen' AND first_name = 'An'"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The B-Tree is ordered first by last_name and then first_name; combining both leading keys yields a useful search interval.",
      "source": "/references/database-session-2-slides.pdf#page=26",
      "topic": "Multicolumn index"
    },
    {
      "id": "db-s2-044",
      "prompt": "Which query can generally exploit the leftmost prefix of (last_name, first_name)?",
      "options": [
        {
          "id": "a",
          "text": "WHERE first_name = 'Binh'"
        },
        {
          "id": "b",
          "text": "WHERE city = 'Hanoi'"
        },
        {
          "id": "c",
          "text": "WHERE last_name = 'Tran'"
        },
        {
          "id": "d",
          "text": "WHERE length(first_name) > 2"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lecture’s Leading Column Rule says the index is useful for last_name alone or both names; a first_name-only filter does not follow the leading key.",
      "source": "/references/database-session-2-slides.pdf#page=26",
      "topic": "Multicolumn index"
    },
    {
      "id": "db-s2-046-reviewed",
      "prompt": "Which SQL creates a covering index with an included, non-key column?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_order ON orders (customer_id) INCLUDE (total);"
        },
        {
          "id": "b",
          "text": "CREATE INDEX idx_order ON orders (total) INCLUDE (customer_id);"
        },
        {
          "id": "c",
          "text": "CREATE INDEX idx_order ON orders (customer_id, total);"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_order ON orders (customer_id) WHERE total IS NOT NULL;"
        }
      ],
      "correctOptionId": "a",
      "explanation": "INCLUDE is introduced as storing extra data in index leaves to support Index Only Scan without requiring those columns as the index search keys.",
      "source": "/references/database-session-2-slides.pdf#page=30",
      "topic": "Covering index"
    },
    {
      "id": "db-s2-047-reviewed",
      "prompt": "What is the purpose of INCLUDE in a covering index?",
      "options": [
        {
          "id": "a",
          "text": "It forces the entire PostgreSQL heap to follow the included column order."
        },
        {
          "id": "b",
          "text": "It disables all MVCC visibility checks for the relation."
        },
        {
          "id": "c",
          "text": "It guarantees faster queries even if all table pages fit in RAM."
        },
        {
          "id": "d",
          "text": "A query may obtain selected columns from the index without fetching heap column values."
        }
      ],
      "correctOptionId": "d",
      "explanation": "INCLUDE stores extra columns in index leaves to make a covered Index Only Scan possible, helping avoid accesses to the Heap File when the plan can use it.",
      "source": "/references/database-session-2-slides.pdf#page=30",
      "topic": "Covering index"
    },
    {
      "id": "db-s2-049",
      "prompt": "What is the basic distinction between pg_table_size and pg_indexes_size?",
      "options": [
        {
          "id": "a",
          "text": "Both report only the number of currently visible SQL rows."
        },
        {
          "id": "b",
          "text": "The first measures table-associated storage; the second measures its indexes."
        },
        {
          "id": "c",
          "text": "The first returns CPU cost while the second returns disk latency."
        },
        {
          "id": "d",
          "text": "Both always produce the same size for each indexed relation."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The table-size lab distinguishes pg_table_size (table-associated data) and pg_indexes_size (indexes), with pg_total_relation_size measuring their combined footprint.",
      "source": "/references/database-session-2-slides.pdf#page=27",
      "topic": "Size diagnostics"
    },
    {
      "id": "db-s2-050",
      "prompt": "Which PostgreSQL expression directly reports total index bytes for the payment relation?",
      "options": [
        {
          "id": "a",
          "text": "SELECT pg_indexes_size('payment');"
        },
        {
          "id": "b",
          "text": "SELECT pg_table_size('payment');"
        },
        {
          "id": "c",
          "text": "SELECT pg_relation_size('payment_date');"
        },
        {
          "id": "d",
          "text": "SELECT pg_size_pretty('payment');"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Lab 2 uses pg_indexes_size on payment to measure total index storage. pg_size_pretty can format its byte count.",
      "source": "/references/database-session-2-slides.pdf#page=28",
      "topic": "Size diagnostics"
    },
    {
      "id": "db-s2-051-reviewed",
      "prompt": "If pg_indexes_size('payment') rises after CREATE INDEX, what is the strongest conclusion?",
      "options": [
        {
          "id": "a",
          "text": "All SELECT statements are now forced to choose the new index."
        },
        {
          "id": "b",
          "text": "The table must have reduced its heap storage by exactly the added bytes."
        },
        {
          "id": "c",
          "text": "The count of logical rows must have risen as the index was created."
        },
        {
          "id": "d",
          "text": "The indexes now consume more disk space, by the before/after difference."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Creating an index allocates index pages; before/after sizes indicate storage overhead, not a guaranteed planner decision.",
      "source": "/references/database-session-2-slides.pdf#page=28",
      "topic": "Size diagnostics"
    },
    {
      "id": "db-s2-052",
      "prompt": "The marketing team repeatedly filters replacement_cost > 25. Which partial index matches the stated workload?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost < 25;"
        },
        {
          "id": "b",
          "text": "CREATE INDEX idx_expensive ON film (title) WHERE title IS NULL;"
        },
        {
          "id": "c",
          "text": "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost > 25;"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_expensive ON film USING HASH (replacement_cost);"
        }
      ],
      "correctOptionId": "c",
      "explanation": "An index restricted to cost > 25 covers the target expensive-film subset and supports that predicate when the optimizer chooses it.",
      "source": "/references/database-session-2-slides.pdf#page=29",
      "topic": "Partial index practice"
    },
    {
      "id": "db-s2-053-reviewed",
      "prompt": "A query reads most rows in a small table even though an index exists. Which access strategy may still be reasonable?",
      "options": [
        {
          "id": "a",
          "text": "An index scan is mandatory whenever any index exists."
        },
        {
          "id": "b",
          "text": "A sequential scan because visiting a few heap pages may be cheaper."
        },
        {
          "id": "c",
          "text": "An index-only scan even if the selected columns are not indexed."
        },
        {
          "id": "d",
          "text": "A CLUSTER rewrite before evaluating the SELECT statement."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The slide contrasts an index with a Sequential Scan and emphasizes the overhead of extra page accesses. When nearly all rows are required, scanning the table can be reasonable; an index does not guarantee its use.",
      "source": "/references/database-session-2-slides.pdf#page=14",
      "topic": "Index selection"
    },
    {
      "id": "db-s2-055",
      "prompt": "Which index is best matched to a login email that must be unique?",
      "options": [
        {
          "id": "a",
          "text": "A GiST index over geographical coordinates."
        },
        {
          "id": "b",
          "text": "A GIN index over JSON metadata tokens."
        },
        {
          "id": "c",
          "text": "A nonunique Hash index on an unrelated status."
        },
        {
          "id": "d",
          "text": "A UNIQUE B-Tree index on the email column."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The Index Selection Cheat Sheet recommends a unique B-Tree for a unique login email, combining equality lookup with duplicate prevention.",
      "source": "/references/database-session-2-slides.pdf#page=31",
      "topic": "Index selection"
    },
    {
      "id": "db-s2-057",
      "prompt": "A workload repeatedly tests ARRAY membership and JSONB containment. Which indexing family is most appropriate?",
      "options": [
        {
          "id": "a",
          "text": "Hash, because buckets retain array element ordering."
        },
        {
          "id": "b",
          "text": "GIN, using suitable operator classes for the indexed data."
        },
        {
          "id": "c",
          "text": "B-Tree on the number of items in each array only."
        },
        {
          "id": "d",
          "text": "CLUSTER, because it automatically tokenizes JSONB documents."
        }
      ],
      "correctOptionId": "b",
      "explanation": "GIN maps component values to posting lists of matching rows and supports appropriate array/JSONB searches.",
      "source": "/references/database-session-2-slides.pdf#page=31",
      "topic": "Index selection"
    },
    {
      "id": "db-s2-058-reviewed",
      "prompt": "Which statement best characterizes the Index Only Scan benefit introduced in the slide?",
      "options": [
        {
          "id": "a",
          "text": "It may return selected values from index leaves instead of fetching those values from the Heap File."
        },
        {
          "id": "b",
          "text": "It physically orders the Heap File by an included non-key column."
        },
        {
          "id": "c",
          "text": "It removes the need for separate index storage on disk."
        },
        {
          "id": "d",
          "text": "It requires creating a Hash index for every included column."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide states that a covering index uses INCLUDE to provide additional data in index leaves and may avoid visiting the heap. It does not promise that every query will use an Index Only Scan.",
      "source": "/references/database-session-2-slides.pdf#page=30",
      "topic": "Covering index"
    },
    {
      "id": "db-s2-060",
      "prompt": "In a benchmark, an index occupies 220 MB while a partial index for the same target subset occupies 0.5 MB. What is the approximate size ratio?",
      "options": [
        {
          "id": "a",
          "text": "The full index is about 44 times the partial index."
        },
        {
          "id": "b",
          "text": "The full index is about 2,200 times the partial index."
        },
        {
          "id": "c",
          "text": "The full index is about 440 times the partial index."
        },
        {
          "id": "d",
          "text": "The full index is about 22 times the partial index."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Using the slide's approximate figures, 220 / 0.5 = 440; real sizes depend on data and page overhead.",
      "source": "/references/database-session-2-slides.pdf#page=25",
      "topic": "Partial index practice"
    },
    {
      "id": "db-s2-061",
      "prompt": "If a hypothetical index contains 3 levels rather than scanning all 1 million rows, what is the appropriate conclusion?",
      "options": [
        {
          "id": "a",
          "text": "The entire query always completes with precisely three disk reads."
        },
        {
          "id": "b",
          "text": "A lookup follows a small number of tree levels, but heap I/O may still be needed."
        },
        {
          "id": "c",
          "text": "The index stores exactly one million bytes in three pages."
        },
        {
          "id": "d",
          "text": "The database always examines only three logical table rows."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The B-Tree slide describes root-to-leaf traversal via a small number of levels, followed by a heap lookup using the TID.",
      "source": "/references/database-session-2-slides.pdf#page=16",
      "topic": "B-Tree practice"
    },
    {
      "id": "db-s2-063",
      "prompt": "What SQL syntax creates a conventional B-Tree index on replacement_cost?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_cost IN film VALUES (replacement_cost);"
        },
        {
          "id": "b",
          "text": "ADD INDEX idx_cost FROM film BY replacement_cost;"
        },
        {
          "id": "c",
          "text": "CLUSTER INDEX idx_cost ON film WHERE replacement_cost;"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_cost ON film (replacement_cost);"
        }
      ],
      "correctOptionId": "d",
      "explanation": "In PostgreSQL the default CREATE INDEX access method is B-Tree unless another method is specified.",
      "source": "/references/database-session-2-slides.pdf#page=21",
      "topic": "B-Tree practice"
    },
    {
      "id": "db-s2-064",
      "prompt": "In the table-size diagnostic query, what is the purpose of ORDER BY pg_total_relation_size(fed.oid) DESC?",
      "options": [
        {
          "id": "a",
          "text": "List relation names alphabetically within the public schema."
        },
        {
          "id": "b",
          "text": "Display the largest total relation footprints first."
        },
        {
          "id": "c",
          "text": "Return only relations without any indexes."
        },
        {
          "id": "d",
          "text": "Sort rows by the count of tuples stored in each relation."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lab orders public ordinary-table relations by total storage descending to identify large and index-heavy tables.",
      "source": "/references/database-session-2-slides.pdf#page=27",
      "topic": "Lab 1"
    },
    {
      "id": "db-s2-065",
      "prompt": "Which SQL correctly measures the on-disk size of one named index, idx_expensive_films?",
      "options": [
        {
          "id": "a",
          "text": "SELECT pg_relation_size('idx_expensive_films');"
        },
        {
          "id": "b",
          "text": "SELECT pg_table_size('replacement_cost');"
        },
        {
          "id": "c",
          "text": "SELECT pg_indexes_size('replacement_cost');"
        },
        {
          "id": "d",
          "text": "SELECT pg_total_relation_size('film.title');"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Lab 3 asks for the size of the specific partial index. pg_relation_size on that index name gives its relation size, unlike pg_indexes_size which totals a table’s indexes.",
      "source": "/references/database-session-2-slides.pdf#page=29",
      "topic": "Lab 3"
    },
    {
      "id": "db-s2-066",
      "prompt": "For a B-Tree multicolumn index on staff(last_name, first_name), what is the primary key-ordering rule from the slide?",
      "options": [
        {
          "id": "a",
          "text": "The tree is ordered by first_name and then last_name."
        },
        {
          "id": "b",
          "text": "Columns are ordered by their data types, regardless of the index definition."
        },
        {
          "id": "c",
          "text": "The tree is ordered by last_name first and then first_name."
        },
        {
          "id": "d",
          "text": "Neither key participates in sorted index entries."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Index entries are sorted by the first listed column, then the second within equal first-column values; that is why the leading column matters.",
      "source": "/references/database-session-2-slides.pdf#page=26",
      "topic": "Multicolumn index"
    },
    {
      "id": "db-s2-067",
      "prompt": "According to Lab 2, which CREATE INDEX statement is used to study index-size growth on payment?",
      "options": [
        {
          "id": "a",
          "text": "CREATE INDEX idx_payment_date_long ON payment (payment_date);"
        },
        {
          "id": "b",
          "text": "CREATE INDEX idx_payment_date_long ON payment (amount, payment_date);"
        },
        {
          "id": "c",
          "text": "CREATE INDEX idx_payment_date_long ON payment (customer_id, payment_date);"
        },
        {
          "id": "d",
          "text": "CREATE INDEX idx_payment_date_long ON payment (payment_date, amount, customer_id);"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The exact Lab 2 index uses three payment columns. Students compare pg_indexes_size before and after creating it.",
      "source": "/references/database-session-2-slides.pdf#page=28",
      "topic": "Lab 2"
    }
  ]
};
